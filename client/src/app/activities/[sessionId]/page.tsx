"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Calendar, Leaf, AlertTriangle, Sprout } from "lucide-react";

import { InputHistoryList } from "@/app/components/activities/input-history-list";
import { EndSessionDialog } from "@/app/components/activities/end-session-dialog";
import api from "@/lib/api";
import { DailyInputForm } from "@/app/components/activities/daily-input-from";

type Session = {
  id: string;
  cropType: string;
  variety: string;
  startDate: string;
  expectedHarvestDate?: string;
  farmSize: string;
  district: string;
  expectedHarvest: string;
  seedSource: string;
  seedQuantity: string;
  seedCost: string;
  soilType: string;
  soilPh: string;
  lastUpdated?: string;
  progress?: number;
  status: "active" | "completed";
  finalScore?: number;
  kpis?: {
    [key: string]: {
      score: number;
      weight: number;
      weighted_contribution: number;
    };
  };
  recommendations?: string[];
};

export default function SessionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;
  const [isEndSessionDialogOpen, setIsEndSessionDialogOpen] = useState(false);
  const [sessionData, setSessionData] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(sessionData)
  }, [sessionData]);

  // Fetch session data from the backend
  // const fetchSessionData = async () => {
  //   setLoading(true);
  //   try {
  //     const sessionResponse = await api.get(`/sessions/${sessionId}`);
  //     const session = sessionResponse.data.session;

  //     const transformedSession: Session = {
  //       id: session.id.toString(),
  //       cropType: session.crop_type,
  //       variety: session.veg_variety,
  //       startDate: session.start_date,
  //       expectedHarvestDate: new Date(session.start_date).setDate(
  //         new Date(session.start_date).getDate() + 70
  //       ),
  //       farmSize: `${session.farm_size} acres`,
  //       district: session.district,
  //       expectedHarvest: `${session.expected_harvest} kg`,
  //       seedSource: session.seed_source,
  //       seedQuantity: `${session.seed_quantity} kg`,
  //       seedCost: session.seed_cost.toString(),
  //       soilType: session.soil_type || "N/A",
  //       soilPh: session.soil_ph ? session.soil_ph.toString() : "N/A",
  //       lastUpdated: new Date().toISOString().split("T")[0],
  //       progress: Math.min(
  //         100,
  //         Math.round(
  //           ((new Date().getTime() - new Date(session.start_date).getTime()) /
  //             (1000 * 60 * 60 * 24)) /
  //             70
  //         ) * 100
  //       ),
  //       status: session.is_active ? "active" : "completed",
  //     };

  //     if (!session.is_active) {
  //       const kpiResponse = await api.get(`/api/kpi/${sessionId}`);
  //       const kpiData = kpiResponse.data;

  //       transformedSession.finalScore = kpiData.final_score;
  //       transformedSession.kpis = kpiData.kpis;
  //       transformedSession.recommendations = kpiData.recommendations;
  //     }

  //     setSessionData(transformedSession);
  //   } catch (error) {
  //     console.error("Error fetching session data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchSessionData = async () => {
    setLoading(true);
    try {
      console.log("Fetching session data for sessionId:", sessionId);
      const sessionResponse = await api.get(`/sessions/${sessionId}`);
      console.log("Session response:", sessionResponse.data);
  
      const session = sessionResponse.data.session;
      if (!session) {
        console.error("No session data returned from backend");
        setSessionData(null);
        return;
      }
  
      const transformedSession: Session = {
        id: session.id.toString(),
        cropType: session.crop_type,
        variety: session.veg_variety,
        startDate: session.start_date,
        expectedHarvestDate: new Date(session.start_date).setDate(
          new Date(session.start_date).getDate() + 70
        ),
        farmSize: `${session.farm_size} acres`,
        district: session.district,
        expectedHarvest: `${session.expected_harvest} kg`,
        seedSource: session.seed_source,
        seedQuantity: `${session.seed_quantity} kg`,
        seedCost: session.seed_cost.toString(),
        soilType: session.soil_type || "N/A",
        soilPh: session.soil_ph ? session.soil_ph.toString() : "N/A",
        lastUpdated: new Date().toISOString().split("T")[0],
        progress: Math.min(
          100,
          Math.round(
            ((new Date().getTime() - new Date(session.start_date).getTime()) /
              (1000 * 60 * 60 * 24)) /
              70
          ) * 100
        ),
        status: session.is_active ? "active" : "completed",
      };

      console.log(!session.is_active)
  
      if (!session.is_active) {
        console.log("Fetching KPI data for sessionId:", sessionId);
        const kpiResponse = await api.get(`kpi/report/${sessionId}`);
        console.log("KPI response:", kpiResponse.data);
  
        const kpiData = kpiResponse.data;
        transformedSession.finalScore = kpiData.final_score;
        transformedSession.kpis = kpiData.kpis;
        transformedSession.recommendations = kpiData.recommendations;
      }
  
      setSessionData(transformedSession);
    } catch (error) {
      console.error("Error fetching session data:", error);
      if (error?.response) {
        console.error("Response data:", error?.response.data);
        console.error("Response status:", error.response.status);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionData();
  }, [sessionId]);

  const handleSessionEnded = () => {
    fetchSessionData();
    router.push("/activities");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-8">
        <p className="text-center text-gray-500">Loading session details...</p>
      </div>
    );
  }

  if (!sessionData) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-8">
        <p className="text-center text-red-500">Session not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Link href="/activities">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold">
                {sessionData.cropType} - {sessionData.variety}
              </h1>
              <Badge
                className={
                  sessionData.status === "active"
                    ? "bg-green-100 text-green-800 border-green-200"
                    : "bg-gray-100 text-gray-800 border-gray-200"
                }
              >
                {sessionData.status === "active" ? "Active" : "Completed"}
              </Badge>
            </div>
            <p className="text-gray-500 mt-1">
              Session started on {new Date(sessionData.startDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {sessionData.status === "active" && (
          <div className="flex flex-col-2 sm:flex-row gap-3">
            <Button
              className="bg-green-500 hover:bg-green-300 hover:font-bold hover:text-green-800 text-green-50"
              variant="outline"
              onClick={() => setIsEndSessionDialogOpen(true)}
            >
              End Session
            </Button>
            <Link href={`/activities/${sessionId}`}>
              <Button
                className="bg-green-500 hover:bg-green-300 hover:font-bold hover:text-green-800 text-green-50"
                variant="outline"
              >
                View Report
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="w-full bg-green-100">
              <TabsTrigger
                value="overview"
                className="flex-1 data-[state=active]:bg-green-400 data-[state=active]:shadow-sm"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="daily-input"
                className="flex-1 data-[state=active]:bg-green-400 data-[state=active]:shadow-sm"
              >
                Daily Input
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="flex-1 data-[state=active]:bg-green-400 data-[state=active]:shadow-sm"
              >
                Input History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Session Overview</CardTitle>
                  <CardDescription>Details about your current crop session</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Progress</h3>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Progress</span>
                        <span>{sessionData.progress}%</span>
                      </div>
                      <Progress value={sessionData.progress} className="h-2 bg-green-100" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Started: {new Date(sessionData.startDate).toLocaleDateString()}</span>
                        <span>
                          Expected Harvest:{" "}
                          {sessionData.expectedHarvestDate
                            ? new Date(sessionData.expectedHarvestDate).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Farm Details</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Farm Size:</span>
                            <span>{sessionData.farmSize}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">District:</span>
                            <span>{sessionData.district}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Crop Details</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Crop Type:</span>
                            <span>{sessionData.cropType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Variety:</span>
                            <span>{sessionData.variety}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Expected Harvest:</span>
                            <span>{sessionData.expectedHarvest}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Seed Details</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Seed Source:</span>
                            <span>{sessionData.seedSource}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Seed Quantity:</span>
                            <span>{sessionData.seedQuantity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Seed Cost:</span>
                            <span>Rs. {sessionData.seedCost}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Soil Details</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Soil Type:</span>
                            <span>{sessionData.soilType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Soil pH:</span>
                            <span>{sessionData.soilPh}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="daily-input">
              <DailyInputForm sessionId={sessionId} />
            </TabsContent>

            <TabsContent value="history">
              <InputHistoryList sessionId={sessionId} />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Session Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium">Days Active</span>
                    </div>
                    <p className="text-2xl font-bold mt-1">
                      {Math.round(
                        (new Date().getTime() - new Date(sessionData.startDate).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium">Farm Size</span>
                    </div>
                    <p className="text-2xl font-bold mt-1">{sessionData.farmSize}</p>
                  </div>
                </div>

                {sessionData.status === "completed" && sessionData.finalScore && (
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Sprout className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium">Final Score</span>
                    </div>
                    <p className="text-2xl font-bold mt-1">{sessionData.finalScore.toFixed(2)}</p>
                  </div>
                )}

                {sessionData.status === "completed" && sessionData.kpis && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">KPI Breakdown</h3>
                    <div className="space-y-2">
                      {Object.entries(sessionData.kpis).map(([kpiName, kpiDetails]) => (
                        <div key={kpiName} className="flex items-start gap-2 p-2 bg-gray-50 rounded-md">
                          <Leaf className="h-4 w-4 text-green-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">{kpiName}</p>
                            <p className="text-xs text-gray-500">Score: {kpiDetails.score.toFixed(2)}</p>
                            <p className="text-xs text-gray-500">Weight: {kpiDetails.weight.toFixed(1)}%</p>
                            <p className="text-xs text-gray-500">
                              Contribution: {kpiDetails.weighted_contribution.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {sessionData.status === "completed" && sessionData.recommendations && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Recommendations</h3>
                    {sessionData.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-yellow-50 rounded-md">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                        <p className="text-sm text-gray-700">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <EndSessionDialog
        open={isEndSessionDialogOpen}
        onOpenChange={setIsEndSessionDialogOpen}
        sessionId={sessionId}
        onSessionEnded={handleSessionEnded}
      />
    </div>
  );
}