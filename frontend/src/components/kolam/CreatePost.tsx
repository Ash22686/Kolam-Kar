// frontend/src/components/kolam/CreatePost.tsx
import { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, Image as ImageIcon } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { createPostAPI } from '@/lib/api';

// 1. Import the useToast hook
import { useToast } from "@/components/ui/use-toast";

export const CreatePost = () => {
    // 2. Initialize the toast function
    const { toast } = useToast();

    const [caption, setCaption] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        if (!imageFile) {
            // 3. Replace the validation alert with a destructive toast
            toast({
                title: "Image Required",
                description: "Please select an image to post.",
                variant: "destructive",
            });
            return;
        }

        const formData = new FormData();
        formData.append('caption', caption);
        formData.append('image', imageFile);

        try {
            await createPostAPI(formData);

            // 4. (Recommended) Add a success toast
            toast({
                title: "Success!",
                description: "Your Kolam has been posted.",
            });

            // Reset form
            setCaption('');
            setImageFile(null);
            setPreviewUrl(null);

            // Optional: Delay refresh to let the user see the toast
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
            console.error('Failed to create post:', error);
            // 5. Replace the error alert with a destructive toast
            toast({
                title: "Upload Failed",
                description: "Failed to create post. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <Card className="w-full shadow-sm">
            <CardContent className="p-4">
                <div className="flex w-full space-x-3">
                    <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" alt="You" />
                        <AvatarFallback className="gradient-sacred text-white"><User className="h-5 w-5" /></AvatarFallback>
                    </Avatar>
                    <Textarea
                        placeholder="Share your latest Kolam creation..."
                        className="flex-1 resize-none border-none focus-visible:ring-0 shadow-none text-base"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />
                </div>

                {previewUrl && (
                    <div className="mt-4 pl-12">
                        <img src={previewUrl} alt="Preview" className="max-h-40 rounded-md" />
                    </div>
                )}
            </CardContent>

            <Separator />

            <div className="flex justify-between items-center p-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                    <Button variant="ghost" className="flex items-center gap-2 rounded-lg hover:bg-muted" onClick={() => fileInputRef.current?.click()}>
                        <ImageIcon className="h-5 w-5 text-green-500" /> <span className="font-semibold text-foreground/80">Photo</span>
                    </Button>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                    {/* ... other buttons can remain static or be implemented later ... */}
                </div>

                <Button onClick={handleSubmit} className="gradient-lotus text-white border-0 shadow-lotus">Post</Button>
            </div>
        </Card>
    );
};