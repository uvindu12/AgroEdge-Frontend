"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { Reaction } from "./types";

interface ReactionPickerProps {
  messageId: string;
  currentUserId: string;
  reactions: Reaction[];
  onReact: (messageId: string, userId: string, emoji: string) => void;
}

export default function ReactionPicker({
  messageId,
  currentUserId,
  reactions,
  onReact,
}: ReactionPickerProps) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Available emojis
  const emojis = ["👍", "❤️", "😂", "😮", "😢", "👏"];

  // Group reactions by emoji
  const reactionCounts = reactions.reduce(
    (acc, reaction) => {
      acc[reaction.emoji] = (acc[reaction.emoji] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Check if current user has reacted with any emoji
  const userReactions = reactions
    .filter((reaction) => reaction.userId === currentUserId)
    .map((reaction) => reaction.emoji);

  // Handle clicking outside to close popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-center space-x-1">
          {Object.entries(reactionCounts).length > 0 ? (
            Object.entries(reactionCounts).map(([emoji, count]) => (
              <Button
                key={emoji}
                variant="ghost"
                size="sm"
                className={`h-8 px-2 text-gray-600 ${
                  userReactions.includes(emoji) ? "bg-[#DCFCE7]" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onReact(messageId, currentUserId, emoji);
                }}
              >
                <span className="mr-1">{emoji}</span>
                {count}
              </Button>
            ))
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-muted-foreground"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
            >
              <span className="mr-1">😀</span>
              React
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-muted-foreground"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          >
            +
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" ref={popoverRef}>
        <div className="flex flex-wrap gap-2 max-w-[200px]">
          {emojis.map((emoji) => (
            <Button
              key={emoji}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => {
                onReact(messageId, currentUserId, emoji);
                setOpen(false);
              }}
            >
              {emoji}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}