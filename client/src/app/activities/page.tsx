// activities/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, Filter, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { NewSessionDialog } from "../components/activities/new-session-dialog";
import { SessionList } from "../components/activities/session-list";
import api from "@/lib/api";

type Session = {
  id: string;
  cropType: string;
  variety: string;
  startDate: string;
  expectedHarvestDate?: string;
  endDate?: string;
  farmSize: string;
  district: string;
  lastUpdated?: string;
  progress?: number;
  profit?: number;
  roi?: number;
  status: "active" | "completed";
};

export default function ActivitiesPage() {
  const [isNewSessionDialogOpen, setIsNewSessionDialogOpen] = useState(false);
  const [activeSessions, setActiveSessions] = useState<Session[]>([]);
  const [completedSessions, setCompletedSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch sessions from the backend
  const fetchSessions = async () => {
    setLoading(true);
    try {
      // Fetch active sessions
      const activeResponse = await api.get("/sessions/active");
      const activeData = activeResponse.data.sessions.map((session: any) => ({
        id: session.id.toString(),
        cropType: session.crop_type,
        variety: session.veg_variety,
        startDate: session.start_date,
        expectedHarvestDate: new Date(session.start_date).setDate(
          new Date(session.start_date).getDate() + 70
        ), // Estimate expected harvest date (70 days after start)
        farmSize: `${session.farm_size} acres`,
        district: session.district,
        lastUpdated: new Date().toISOString().split("T")[0], // For now, use current date
        progress: Math.min(
          100,
          Math.round(
            ((new Date().getTime() - new Date(session.start_date).getTime()) /
              (1000 * 60 * 60 * 24)) /
              70
          ) * 100
        ), // Calculate progress based on 70-day duration
        status: "active" as const,
      }));
      setActiveSessions(activeData);

      // Fetch all sessions and filter for completed ones
      const allResponse = await api.get("/sessions");
      const completedData = allResponse.data.sessions
        .filter((session: any) => !session.is_active)
        .map((session: any) => ({
          id: session.id.toString(),
          cropType: session.crop_type,
          variety: session.veg_variety,
          startDate: session.start_date,
          endDate: session.end_date,
          farmSize: `${session.farm_size} acres`,
          district: session.district,
          profit: session.actual_harvest
            ? Math.round(
                session.actual_harvest * 120 - // Assume selling price of Rs. 120/kg
                  (session.seed_cost +
                    (session.irrigation_cost || 0) +
                    (session.labor_wages || 0))
              )
            : 0,
          roi: session.actual_harvest
            ? Math.round(
                ((session.actual_harvest * 120 -
                  (session.seed_cost +
                    (session.irrigation_cost || 0) +
                    (session.labor_wages || 0))) /
                  (session.seed_cost +
                    (session.irrigation_cost || 0) +
                    (session.labor_wages || 0))) *
                  100
              )
            : 0,
          status: "completed" as const,
        }));
      setCompletedSessions(completedData);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch sessions on component mount
  useEffect(() => {
    fetchSessions();
  }, []);

  // Handle session creation (called by NewSessionDialog)
  const handleSessionCreated = () => {
    fetchSessions(); // Refresh the session list
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Crop Activities</h1>
          <p className="text-gray-500 mt-1">Manage your crop sessions and track daily inputs</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            className="bg-green-500 hover:bg-green-300 hover:text-green-900"
            onClick={() => setIsNewSessionDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" /> Start New Session
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading sessions...</p>
        </div>
      ) : (
        <Tabs defaultValue="active" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="active" className="flex gap-2 items-center">
                <Clock className="h-4 w-4" />
                <span>Active Sessions</span>
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex gap-2 items-center">
                <CheckCircle className="h-4 w-4" />
                <span>Completed Sessions</span>
              </TabsTrigger>
            </TabsList>

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
          </div>

          <TabsContent value="active" className="space-y-4">
            <SessionList status="active" sessions={activeSessions} />
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <SessionList status="completed" sessions={completedSessions} />
          </TabsContent>
        </Tabs>
      )}

      <NewSessionDialog
        open={isNewSessionDialogOpen}
        onOpenChange={setIsNewSessionDialogOpen}
        onSessionCreated={handleSessionCreated}
      />
    </div>
  );
}