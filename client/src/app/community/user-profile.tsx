import type { User } from "./types";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Clock, ShieldUser } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UserProfileProps {
  user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
  const tags = ["Leeks", "Carrot", "Sustainable", "Organic"]; // Hardcoded for now since not in DB

  return (
    <>
      <div className="p-6 text-center flex-shrink-0 border-b border-border">
        <Avatar className="h-24 w-24 mx-auto mb-4">
          <img
            src="/images/farmer.jpg"
            alt={user.name}
            className="object-cover"
          />
        </Avatar>
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-muted-foreground">NuwaraEliya, SL</p> {/* Hardcoded since not in DB */}

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              className="bg-[#DCFCE7] text-green-500 hover:bg-[#DCFCE7]/80 border-[#22C55E]/20"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <ScrollArea className="flex-grow overflow-auto">
        <div className="p-6">
          <h3 className="font-medium mb-4">Farmer Information</h3>

          <div className="space-y-4">
            <div className="flex items-center">
              <ShieldUser className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{user.name}</span>
            </div>

            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{user.email}</span>
            </div>

            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{user.messageCount} messages</span>
            </div>

            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">
                Member since {new Date(user.joinDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  );
}