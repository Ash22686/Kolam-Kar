// src/lib/mock-data.ts

export interface KolamPostType {
  id: string;
  user: {
    name: string;
    username: string;
    avatarUrl: string;
  };
  imageUrl: string;
  caption: string;
  likes: number;
  commentCount: number;
  timestamp: string;
}

export const mockPosts: KolamPostType[] = [
  {
    id: "post1",
    user: {
      name: "Priya Sharma",
      username: "priya_kolamart",
      avatarUrl: "https://i.pravatar.cc/150?u=priya",
    },
    imageUrl:
      "https://d1msew97rp2nin.cloudfront.net/prodin/phool/plpimages/design-for-diwali-rangoli-1728453297509-c4b5e00c-ba41-4bfd-a465-bc79a4fcf708.webp",
    caption:
      "My latest creation, a 'Sikku Kolam' for the festival season. Loved working with these intricate lines!",
    likes: 125,
    commentCount: 12,
    timestamp: "2 hours ago",
  },
  {
    id: "post2",
    user: {
      name: "Arjun Verma",
      username: "rangoli_master_arjun",
      avatarUrl: "https://i.pravatar.cc/150?u=arjun",
    },
    imageUrl:
      "https://www.royalentice.com/cdn/shop/files/WhatsAppImage2023-09-19at5.18.12PM.jpg?v=1695125538",
    caption:
      "A simple, elegant dot-grid kolam to brighten up the morning. What do you think?",
    likes: 340,
    commentCount: 45,
    timestamp: "8 hours ago",
  },
  {
    id: "post3",
    user: {
      name: "Ananya Reddy",
      username: "ananya_designs",
      avatarUrl: "https://i.pravatar.cc/150?u=ananya",
    },
    imageUrl:
      "https://www.royalentice.com/cdn/shop/files/WhatsAppImage2023-09-28at10.36.49PM.jpg?v=1696170297",
    caption:
      "Experimenting with colors today! Generated this with KolamKar's AI and added my own touch.",
    likes: 562,
    commentCount: 88,
    timestamp: "1 day ago",
  },
];


export interface SuggestedUserType {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
}

export const mockSuggestedUsers: SuggestedUserType[] = [
  {
    id: "user1",
    name: "Meera Patel",
    username: "meera_creates",
    avatarUrl: "https://i.pravatar.cc/150?u=meera",
  },
  {
    id: "user2",
    name: "Rohan Das",
    username: "rohan_rangoli",
    avatarUrl: "https://i.pravatar.cc/150?u=rohan",
  },
  {
    id: "user3",
    name: "Saanvi Rao",
    username: "saanvi_art",
    avatarUrl: "https://i.pravatar.cc/150?u=saanvi",
  },
  {
    id: "user4",
    name: "Vikram Singh",
    username: "vikram_designs",
    avatarUrl: "https://i.pravatar.cc/150?u=vikram",
  },
];