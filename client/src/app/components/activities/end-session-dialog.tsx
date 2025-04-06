// components/activities/end-session-dialog.tsx
"use client";

import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import api from "@/lib/api";

interface EndSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionId: string;
  onSessionEnded?: () => void; // Callback to notify parent
}

export function EndSessionDialog({ open, onOpenChange, sessionId, onSessionEnded }: EndSessionDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actualHarvest, setActualHarvest] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Make API call to end the session
      await api.patch(`/sessions/${sessionId}/end`, {
        actual_harvest: parseFloat(actualHarvest),
      });

      // Notify the parent component that the session has ended
      if (onSessionEnded) {
        onSessionEnded();
      }

      // Close the dialog
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error ending session:", error);
      setError(error.response?.data?.message || "Failed to end session. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>End Crop Session</DialogTitle>
          <DialogDescription>
            Please provide the actual harvest amount to end this session.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-3 bg-red-50 text-red-800 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="actual_harvest">Actual Harvest (kg)</Label>
              <Input
                id="actual_harvest"
                type="number"
                value={actualHarvest}
                onChange={(e) => setActualHarvest(e.target.value)}
                required
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button className ="bg-green-500 hover:bg-green-300 hover:font-bold hover:text-green-800" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Ending Session...
                </>
              ) : (
                "End Session"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}