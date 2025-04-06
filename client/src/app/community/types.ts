export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    messageCount: number;
    joinDate: string;
  }
  
  export interface Reaction {
    userId: string;
    emoji: string;
  }
  
  export interface Message {
    id: number;
    user_id: string;
    content: string;
    created_at: string;
    image_data?: string | null;
    replies?: Reply[]; // Make replies optional
    reactions: Reaction[];
  }
  
  export interface Reply {
    id: number;
    message_id: number;
    user_id: string;
    content: string;
    created_at: string;
    image_data?: string | null;
    reactions: Reaction[];
    username: string;
    profile_picture?: string | null;
  }