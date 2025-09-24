// src/components/kolam/KolamPost.tsx

import { KolamPostType } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, MessageCircle, Send, MoreHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface KolamPostProps {
    post: KolamPostType;
}

export const KolamPost = ({ post }: KolamPostProps) => {
    return (
        <Card className="w-full max-w-xl mx-auto border-border/60 shadow-sm">
            {/* --- HEADER (No Changes) --- */}
            <CardHeader className="flex flex-row items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={post.user.avatarUrl} alt={post.user.name} />
                        <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-semibold text-foreground">{post.user.name}</p>
                        <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </CardHeader>

            {/* --- CONTENT (Caption Moved Here) --- */}
            <CardContent className="p-0">
                <p className="px-4 pb-3 text-sm text-foreground">{post.caption}</p>
                <img
                    src={post.imageUrl}
                    alt={`Kolam by ${post.user.name}`}
                    className="w-full h-auto object-cover"
                />
            </CardContent>

            {/* --- FOOTER (Simplified) --- */}
            <CardFooter className="flex flex-col items-start p-2 space-y-2">
                {/* Likes and Comments Count */}
                <div className="flex items-center justify-between w-full px-2 py-1 text-sm text-muted-foreground">
                    <span>{post.likes.toLocaleString()} likes</span>
                    <span>{post.commentCount} comments</span>
                </div>

                <Separator />

                {/* Action Buttons */}
                <div className="grid grid-cols-3 w-full">
                    <Button variant="ghost" className="flex items-center gap-2">
                        <Heart className="h-5 w-5" /> Like
                    </Button>
                    <Button variant="ghost" className="flex items-center gap-2">
                        <MessageCircle className="h-5 w-5" /> Comment
                    </Button>
                    <Button variant="ghost" className="flex items-center gap-2">
                        <Send className="h-5 w-5" /> Share
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};