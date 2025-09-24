// src/components/kolam/FeedSidebar.tsx

import { mockSuggestedUsers } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const FeedSidebar = () => {
    return (
        <div className="sticky top-24 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Suggested for You</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {mockSuggestedUsers.map((user) => (
                            <div key={user.id} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">{user.name}</p>
                                        <p className="text-xs text-muted-foreground">@{user.username}</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">
                                    Follow
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};