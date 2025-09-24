// frontend/src/pages/Feed.tsx
import { useEffect, useState } from 'react';
import { KolamPost } from '@/components/kolam/KolamPost';
import { CreatePost } from '@/components/kolam/CreatePost';
import { FeedSidebar } from '@/components/kolam/FeedSidebar';
import { Layout } from '@/components/Layout';
import { getPostsAPI } from '@/lib/api'; // Import our API function

// Update the type to match the backend model
interface PostUser {
    _id: string;
    name: string;
    username: string;
    avatarUrl?: string;
}

export interface KolamPostType {
    _id: string;
    caption: string;
    imageUrl: string;
    user: PostUser;
    likes: string[];
    createdAt: string;
}

const Feed = () => {
    const [posts, setPosts] = useState<KolamPostType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                const response = await getPostsAPI();
                setPosts(response.data);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch posts:', err);
                setError('Could not load the feed. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <Layout>
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 pt-24 sm:pt-28">
                <main className="lg:col-span-2">
                    <div className="w-full max-w-xl mx-auto flex flex-col space-y-6">
                        <CreatePost />
                        {isLoading && <p>Loading feed...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                        {!isLoading && !error && posts.map((post) => (
                            // Make sure your KolamPost component can handle the new data structure
                            <KolamPost key={post._id} post={post} />
                        ))}
                    </div>
                </main>
                <aside className="hidden lg:block lg:col-span-1">
                    <FeedSidebar />
                </aside>
            </div>
        </Layout>
    );
};

export default Feed;