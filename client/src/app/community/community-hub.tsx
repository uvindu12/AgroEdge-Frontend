"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Search, Send, MessageSquareReply, ImageIcon, ArrowLeft, PaperclipIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import MessageList from "./message-list";
import UserProfile from "./user-profile";
import ReactionPicker from "./reaction-picker";
import type { Message, User, Reply } from "./types";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CommunityHub() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  // Fetch initial data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current user
        const userResponse = await fetch("http://localhost:5003/api/profile");
        if (!userResponse.ok) throw new Error("Failed to fetch user profile");
        const userData: User = await userResponse.json();
        setCurrentUser(userData);

        // Fetch all users
        const usersResponse = await fetch("http://localhost:5003/api/users");
        if (!usersResponse.ok) throw new Error("Failed to fetch users");
        const usersData: User[] = await usersResponse.json();
        setUsers(usersData);

        // Fetch all messages
        const messagesResponse = await fetch("http://localhost:5003/api/messages");
        if (!messagesResponse.ok) throw new Error("Failed to fetch messages");
        const messagesData: Message[] = await messagesResponse.json();
        // Initialize replies as an empty array if undefined
        const initializedMessages = messagesData.map((msg) => ({
          ...msg,
          replies: msg.replies || [],
        }));
        setMessages(initializedMessages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Set up Socket.IO connection
  useEffect(() => {
    socketRef.current = io("http://localhost:5003");

    socketRef.current.on("connect", () => {
      console.log("Connected to Socket.IO server");
      socketRef.current?.emit("join", "community-hub");
    });

    socketRef.current.on("newMessage", (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, { ...newMessage, replies: newMessage.replies || [] }]);
    });

    socketRef.current.on("newReply", (newReply: Reply) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === newReply.message_id
            ? { ...msg, replies: [...(msg.replies || []), newReply] }
            : msg
        )
      );
      if (selectedMessage?.id === newReply.message_id) {
        setSelectedMessage((prev) =>
          prev ? { ...prev, replies: [...(prev.replies || []), newReply] } : prev
        );
      }
    });

    socketRef.current.on("reactionUpdated", ({ messageId, userId, emoji, added }) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) => {
          if (msg.id === messageId) {
            if (added) {
              return { ...msg, reactions: [...msg.reactions, { userId, emoji }] };
            } else {
              return {
                ...msg,
                reactions: msg.reactions.filter(
                  (r) => !(r.userId === userId && r.emoji === emoji)
                ),
              };
            }
          }
          return msg;
        })
      );
    });

    socketRef.current.on("replyReactionUpdated", ({ messageId, replyId, userId, emoji, added }) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) => {
          if (msg.id === messageId) {
            return {
              ...msg,
              replies: (msg.replies || []).map((reply) => {
                if (reply.id === replyId) {
                  if (added) {
                    return { ...reply, reactions: [...reply.reactions, { userId, emoji }] };
                  } else {
                    return {
                      ...reply,
                      reactions: reply.reactions.filter(
                        (r) => !(r.userId === userId && r.emoji === emoji)
                      ),
                    };
                  }
                }
                return reply;
              }),
            };
          }
          return msg;
        })
      );
      if (selectedMessage?.id === messageId) {
        setSelectedMessage((prev) =>
          prev
            ? {
                ...prev,
                replies: (prev.replies || []).map((reply) => {
                  if (reply.id === replyId) {
                    if (added) {
                      return { ...reply, reactions: [...reply.reactions, { userId, emoji }] };
                    } else {
                      return {
                        ...reply,
                        reactions: reply.reactions.filter(
                          (r) => !(r.userId === userId && r.emoji === emoji)
                        ),
                      };
                    }
                  }
                  return reply;
                }),
              }
            : prev
        );
      }
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [selectedMessage]);

  // Fetch replies when a message is selected
  useEffect(() => {
    if (selectedMessage) {
      const fetchReplies = async () => {
        try {
          const response = await fetch(
            `http://localhost:5003/api/messages/${selectedMessage.id}/replies`
          );
          if (!response.ok) throw new Error("Failed to fetch replies");
          const repliesData: Reply[] = await response.json();
          setSelectedMessage((prev) => (prev ? { ...prev, replies: repliesData } : prev));
        } catch (error) {
          console.error("Error fetching replies:", error);
        }
      };
      fetchReplies();
    }
  }, [selectedMessage?.id]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() && !selectedImage) return;
    if (!currentUser) return;

    let imageBase64: string | null = null;
    if (selectedImage) {
      try {
        const formData = new FormData();
        formData.append("image", selectedImage);
        const response = await fetch("http://localhost:5003/api/messages/upload-image", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        });
        if (!response.ok) throw new Error("Failed to upload image");
        const data = await response.json();
        imageBase64 = data.imageBase64;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    const messageData = {
      userId: currentUser.id,
      content: newMessage,
      imageBase64,
    };

    if (selectedMessage) {
      socketRef.current?.emit("sendReply", {
        messageId: selectedMessage.id,
        userId: currentUser.id,
        content: newMessage,
        imageBase64,
      });
    } else {
      socketRef.current?.emit("sendMessage", messageData);
    }

    setNewMessage("");
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReaction = (messageId: string, userId: string, emoji: string) => {
    socketRef.current?.emit("reactToMessage", { messageId, userId, emoji });
  };

  const handleReplyReaction = (messageId: string, replyId: string, userId: string, emoji: string) => {
    socketRef.current?.emit("reactToReply", { messageId, replyId, userId, emoji });
  };

  const filteredMessages = messages.filter((msg) =>
    msg.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!currentUser) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Left Sidebar - Message List */}
      <div className="w-80 border-r border-border flex flex-col h-full overflow-hidden bg-white">
        <div className="p-4 border-b border-border flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-auto">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2024-12-16_12-10-17.jpg-sqX5JjjAB0MybjJE7vyGzBVF0OPvNv.jpeg"
                alt="Agro Edge Logo"
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
          <Avatar className="h-8 w-8">
            <img
              src={currentUser?.avatarUrl || "/placeholder.svg?height=32&width=32"}
              alt={currentUser?.name}
            />
          </Avatar>
        </div>

        <div className="p-4 border-b border-border flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Messages"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-grow overflow-auto">
          <MessageList
            messages={filteredMessages}
            users={users}
            onSelectMessage={setSelectedMessage}
            selectedMessageId={selectedMessage?.id}
            onNewMessage={() => setSelectedMessage(null)}
          />
        </div>

        <div className="p-6 border-t border-border flex-shrink-0">
          <Button
            className="w-full bg-[#22C55E] hover:bg-[#22C55E]/90 text-white"
            onClick={() => setSelectedMessage(null)}
          >
            + New Message
          </Button>
        </div>
      </div>

      {/* Main Content - Chat */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="p-4 border-b border-border flex-shrink-0 bg-white sticky top-0 z-10">
          <div className="flex items-center">
            {selectedMessage && (
              <Button
                variant="ghost"
                size="icon"
                className="mr-2"
                onClick={() => setSelectedMessage(null)}
                aria-label="Back to community hub"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div className={`${!selectedMessage ? "text-center w-full" : ""}`}>
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedMessage
                  ? `${users.find((u) => u.id === selectedMessage.user_id)?.name}'s message`
                  : "Farmers Community Hub"}
              </h2>
              {!selectedMessage && (
                <>
                  <p className="text-sm text-gray-600">
                    Share your farming experiences and get advice from other farmers
                  </p>
                  <div className="mt-2 flex justify-center">
                    <div className="h-1 w-16 bg-[#22C55E] rounded-full"></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <ScrollArea className="flex-grow overflow-auto">
          <div className="p-4">
            {selectedMessage ? (
              <div className="space-y-4">
                <div
                  className={`flex ${
                    selectedMessage.user_id === currentUser.id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div className="flex items-start max-w-[70%]">
                    {selectedMessage.user_id !== currentUser.id && (
                      <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                        <img
                          src={
                            users.find((u) => u.id === selectedMessage.user_id)?.avatarUrl ||
                            "/placeholder.svg?height=32&width=32"
                          }
                          alt={users.find((u) => u.id === selectedMessage.user_id)?.name}
                        />
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg p-3 ${
                        selectedMessage.user_id === currentUser.id
                          ? "bg-[#22C55E] text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      <p>{selectedMessage.content}</p>
                      {selectedMessage.image_data && (
                        <div className="mt-2">
                          <img
                            src={`data:image/jpeg;base64,${selectedMessage.image_data}`}
                            alt="Attached image"
                            className="rounded-md max-h-60 w-auto"
                          />
                        </div>
                      )}
                      <div className="text-xs mt-1 opacity-70">
                        {new Date(selectedMessage.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                    {selectedMessage.user_id === currentUser.id && (
                      <Avatar className="h-8 w-8 ml-2 mt-1 flex-shrink-0">
                        <img
                          src={currentUser.avatarUrl || "/placeholder.svg?height=32&width=32"}
                          alt={currentUser.name}
                        />
                      </Avatar>
                    )}
                  </div>
                </div>

                <div className="ml-10">
                  <ReactionPicker
                    messageId={selectedMessage.id.toString()}
                    currentUserId={currentUser.id}
                    reactions={selectedMessage.reactions}
                    onReact={handleReaction}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Replies</h3>
                  {selectedMessage.replies && selectedMessage.replies.length > 0 ? (
                    selectedMessage.replies.map((reply) => (
                      <div key={reply.id} className="space-y-2">
                        <div
                          className={`flex ${
                            reply.user_id === currentUser.id ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div className="flex items-start max-w-[70%]">
                            {reply.user_id !== currentUser.id && (
                              <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                                <img
                                  src={
                                    users.find((u) => u.id === reply.user_id)?.avatarUrl ||
                                    "/placeholder.svg?height=32&width=32"
                                  }
                                  alt={reply.username}
                                />
                              </Avatar>
                            )}
                            <div
                              className={`rounded-lg p-3 ${
                                reply.user_id === currentUser.id
                                  ? "bg-[#22C55E] text-white"
                                  : "bg-gray-100"
                              }`}
                            >
                              <p>{reply.content}</p>
                              {reply.image_data && (
                                <div className="mt-2">
                                  <img
                                    src={`data:image/jpeg;base64,${reply.image_data}`}
                                    alt="Attached image"
                                    className="rounded-md max-h-60 w-auto"
                                  />
                                </div>
                              )}
                              <div className="text-xs mt-1 opacity-70">
                                {new Date(reply.created_at).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                            </div>
                            {reply.user_id === currentUser.id && (
                              <Avatar className="h-8 w-8 ml-2 mt-1 flex-shrink-0">
                                <img
                                  src={currentUser.avatarUrl || "/placeholder.svg?height=32&width=32"}
                                  alt={currentUser.name}
                                />
                              </Avatar>
                            )}
                          </div>
                        </div>
                        <div className="ml-10">
                          <ReactionPicker
                            messageId={reply.id.toString()}
                            currentUserId={currentUser.id}
                            reactions={reply.reactions}
                            onReact={(replyId, userId, emoji) =>
                              handleReplyReaction(selectedMessage.id.toString(), replyId, userId, emoji)
                            }
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No replies yet. Be the first to reply!</p>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <div className="space-y-6">
                {/* Render messages directly (oldest first, newest last) */}
                {filteredMessages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    <div
                      className={`flex ${
                        message.user_id === currentUser.id ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div className="flex items-start max-w-[70%]">
                        {message.user_id !== currentUser.id && (
                          <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                            <img
                              src={
                                users.find((u) => u.id === message.user_id)?.avatarUrl ||
                                "/placeholder.svg?height=32&width=32"
                              }
                              alt={users.find((u) => u.id === message.user_id)?.name}
                            />
                          </Avatar>
                        )}
                        <div
                          className={`rounded-lg p-3 ${
                            message.user_id === currentUser.id
                              ? "bg-[#22C55E] text-white"
                              : "bg-gray-100"
                          }`}
                        >
                          <p>{message.content}</p>
                          {message.image_data && (
                            <div className="mt-2">
                              <img
                                src={`data:image/jpeg;base64,${message.image_data}`}
                                alt="Attached image"
                                className="rounded-md max-h-60 w-auto"
                              />
                            </div>
                          )}
                          <div className="text-xs mt-1 opacity-70">
                            {new Date(message.created_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                        {message.user_id === currentUser.id && (
                          <Avatar className="h-8 w-8 ml-2 mt-1 flex-shrink-0">
                            <img
                              src={currentUser.avatarUrl || "/placeholder.svg?height=32&width=32"}
                              alt={currentUser.name}
                            />
                          </Avatar>
                        )}
                      </div>
                    </div>

                    <div className="ml-10">
                      <ReactionPicker
                        messageId={message.id.toString()}
                        currentUserId={currentUser.id}
                        reactions={message.reactions}
                        onReact={handleReaction}
                      />
                    </div>

                    <div className="flex items-center space-x-2 ml-10">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-muted-foreground"
                        onClick={() => setSelectedMessage(message)}
                      >
                        <MessageSquareReply className="h-4 w-4 mr-1" />
                        {message.replies && message.replies.length > 0 && message.replies.length}
                      </Button>
                    </div>

                    {message.replies && message.replies.length > 0 && (
                      <div className="ml-12 pl-4 border-l-2 border-muted">
                        <Button
                          variant="link"
                          size="sm"
                          className="h-6 p-0 text-muted-foreground"
                          onClick={() => setSelectedMessage(message)}
                        >
                          View {message.replies.length}{" "}
                          {message.replies.length === 1 ? "reply" : "replies"}
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border flex-shrink-0">
          <div className="flex items-center space-x-2 bg-[#DCFCE7]/50 rounded-lg p-2">
            <Textarea
              placeholder={
                selectedMessage
                  ? `Reply to ${users.find((u) => u.id === selectedMessage.user_id)?.name}...`
                  : "Type your message..."
              }
              className="min-h-[20px] max-h-[200px] bg-transparent border-0 focus-visible:ring-0 resize-none p-2"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full"
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
                <input
                  type="file"
                  id="image-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <PaperclipIcon className="h-5 w-5 text-muted-foreground" />
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </Button>
              <Button
                size="icon"
                className="h-9 w-9 rounded-full bg-[#22C55E] hover:bg-[#22C55E]/90 text-white"
                onClick={handleSendMessage}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
          {imagePreview && (
            <div className="mt-2 relative inline-block">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Preview"
                className="h-20 w-auto rounded-md"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                onClick={() => {
                  setSelectedImage(null);
                  setImagePreview(null);
                }}
              >
                ×
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - User Profile */}
      <div className="w-80 border-l border-border hidden lg:flex flex-col h-full overflow-hidden bg-white">
        <UserProfile
          user={
            selectedMessage
              ? users.find((u) => u.id === selectedMessage.user_id) || currentUser
              : currentUser
          }
        />
      </div>
    </div>
  );
}