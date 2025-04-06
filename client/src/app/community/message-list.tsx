"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { Message, User } from "./types";

interface MessageListProps {
  messages: Message[];
  users: User[];
  onSelectMessage: (message: Message) => void;
  selectedMessageId?: number;
  onNewMessage: () => void;
}

export default function MessageList({
  messages,
  users,
  onSelectMessage,
  selectedMessageId,
  onNewMessage,
}: MessageListProps) {
  // Group messages by user_id
  const groupedMessages = messages.reduce(
    (acc, message) => {
      const existingGroup = acc.find((group) => group.user_id === message.user_id);
      if (existingGroup) {
        // Update the group if this message is more recent
        if (new Date(message.created_at) > new Date(existingGroup.created_at)) {
          existingGroup.content = message.content;
          existingGroup.created_at = message.created_at;
          existingGroup.image_data = message.image_data;
          existingGroup.reactions = message.reactions;
          existingGroup.replies = message.replies || [];
        }
        existingGroup.messageCount++;
      } else {
        // Create a new group
        acc.push({
          ...message,
          replies: message.replies || [],
          messageCount: 1,
        });
      }
      return acc;
    },
    [] as (Message & { messageCount: number })[]
  );

  // Sort groups by most recent message
  const sortedGroups = groupedMessages.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Group reactions by emoji for display
  const getReactionSummary = (reactions: Message["reactions"]) => {
    const emojiCounts = reactions.reduce(
      (acc, reaction) => {
        acc[reaction.emoji] = (acc[reaction.emoji] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return Object.entries(emojiCounts)
      .slice(0, 2) // Show only first 2 emoji types
      .map(([emoji, count]) => `${emoji} ${count}`)
      .join(" ");
  };

  return (
    <div className="h-full overflow-auto">
      {sortedGroups.map((message) => {
        const user = users.find((u) => u.id === message.user_id);
        return (
          <div
            key={message.id}
            className={`flex items-start p-3 rounded-md cursor-pointer hover:bg-[#DCFCE7]/50 ${
              selectedMessageId === message.id ? "bg-[#DCFCE7]/50" : ""
            }`}
            onClick={() => onSelectMessage(message)}
          >
            <Avatar className="h-10 w-10 mr-3 flex-shrink-0">
              <img
                src={user?.avatarUrl || "/placeholder.svg?height=40&width=40"}
                alt={user?.name || "User"}
              />
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm truncate">{user?.name || "Unknown User"}</h3>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {new Date(message.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{message.content}</p>
              <div className="flex items-center mt-1 space-x-2">
                {message.reactions.length > 0 && (
                  <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full">
                    {getReactionSummary(message.reactions)}
                  </span>
                )}
                {message.replies && message.replies.length > 0 && (
                  <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full">
                    💬 {message.replies.length}
                  </span>
                )}
                {message.messageCount > 1 && (
                  <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full">
                    {message.messageCount} messages
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
      {messages.length === 0 && (
        <div className="p-4 text-center text-muted-foreground">
          No messages found. Start a conversation!
        </div>
      )}
    </div>
  );
}