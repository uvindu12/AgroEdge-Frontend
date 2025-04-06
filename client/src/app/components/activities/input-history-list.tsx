// components/activities/input-history-list.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, ChevronLeft, ChevronRight, Sprout, Droplet, Users, AlertTriangle } from "lucide-react";
import api from "@/lib/api";

interface Input {
  id: string;
  date: string;
  type: string;
  details: any;
}

interface InputHistoryListProps {
  sessionId: string;
}

export function InputHistoryList({ sessionId }: InputHistoryListProps) {
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [inputs, setInputs] = useState<Input[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  // Fetch input history from the backend
  const fetchInputHistory = async () => {
    setLoading(true);
    try {
      const [fertilizerResponse, pesticideResponse, irrigationResponse, laborResponse] = await Promise.all([
        api.get(`/fertilizer-inputs?session_id=${sessionId}`),
        api.get(`/pesticide-inputs?session_id=${sessionId}`),
        api.get(`/irrigation-inputs?session_id=${sessionId}`),
        api.get(`/labor-inputs?session_id=${sessionId}`),
      ]);

      const fertilizerInputs = fertilizerResponse.data.fertilizer_inputs.map((input: any) => ({
        id: input.id.toString(),
        date: input.application_date,
        type: "fertilizer",
        details: {
          fertilizer_type: input.fertilizer_type,
          application_method: input.application_method,
          quantity: input.quantity,
          cost: input.cost,
        },
      }));

      const pesticideInputs = pesticideResponse.data.pesticide_inputs.map((input: any) => ({
        id: input.id.toString(),
        date: input.application_date,
        type: "pesticide",
        details: {
          pesticide_type: input.pesticide_type,
          quantity: input.quantity,
          cost: input.cost,
        },
      }));

      const irrigationInputs = irrigationResponse.data.irrigation_inputs.map((input: any) => ({
        id: input.id.toString(),
        date: input.irrigation_date,
        type: "irrigation",
        details: {
          water_source: input.water_source,
          irrigation_method: input.irrigation_method,
          water_usage: input.water_usage,
          cost: input.cost,
        },
      }));

      const laborInputs = laborResponse.data.labor_inputs.map((input: any) => ({
        id: input.id.toString(),
        date: input.labor_date,
        type: "labor",
        details: {
          labor_hours: input.labor_hours,
          wages_per_day: input.wages_per_day,
        },
      }));

      // Combine and sort inputs by date (descending)
      const allInputs = [...fertilizerInputs, ...pesticideInputs, ...irrigationInputs, ...laborInputs].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setInputs(allInputs);
    } catch (error) {
      console.error("Error fetching input history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInputHistory();
  }, [sessionId]);

  // Filter inputs based on selected filter
  const filteredInputs = filter === "all" ? inputs : inputs.filter((input) => input.type === filter);

  // Calculate pagination
  const totalPages = Math.ceil(filteredInputs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInputs = filteredInputs.slice(startIndex, startIndex + itemsPerPage);

  const getInputIcon = (type: string) => {
    switch (type) {
      case "fertilizer":
        return <Sprout className="h-4 w-4 text-green-500" />;
      case "pesticide":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "irrigation":
        return <Droplet className="h-4 w-4 text-blue-500" />;
      case "labor":
        return <Users className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const renderInputDetails = (input: Input) => {
    const { type, details } = input;

    switch (type) {
      case "fertilizer":
        return (
          <>
            <div>
              <strong>Type:</strong> {details.fertilizer_type}
            </div>
            <div>
              <strong>Quantity:</strong> {details.quantity} kg
            </div>
            <div>
              <strong>Method:</strong> {details.application_method}
            </div>
            <div>
              <strong>Cost:</strong> Rs. {details.cost}
            </div>
          </>
        );
      case "pesticide":
        return (
          <>
            <div>
              <strong>Type:</strong> {details.pesticide_type}
            </div>
            <div>
              <strong>Quantity:</strong> {details.quantity} kg
            </div>
            <div>
              <strong>Cost:</strong> Rs. {details.cost}
            </div>
          </>
        );
      case "irrigation":
        return (
          <>
            <div>
              <strong>Source:</strong> {details.water_source}
            </div>
            <div>
              <strong>Method:</strong> {details.irrigation_method}
            </div>
            <div>
              <strong>Usage:</strong> {details.water_usage} liters
            </div>
            <div>
              <strong>Cost:</strong> Rs. {details.cost}
            </div>
          </>
        );
      case "labor":
        return (
          <>
            <div>
              <strong>Hours:</strong> {details.labor_hours}
            </div>
            <div>
              <strong>Wages:</strong> Rs. {details.wages_per_day}
            </div>
          </>
        );
      default:
        return <div>No details available</div>;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Input History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500">Loading input history...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Input History</CardTitle>
            <CardDescription>Record of all your farming activities</CardDescription>
          </div>
          <div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activities</SelectItem>
                <SelectItem value="fertilizer">Fertilizer</SelectItem>
                <SelectItem value="pesticide">Pesticide</SelectItem>
                <SelectItem value="irrigation">Irrigation</SelectItem>
                <SelectItem value="labor">Labor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredInputs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No input history found</p>
          </div>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedInputs.map((input) => (
                    <TableRow key={input.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          {new Date(input.date).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getInputIcon(input.type)}
                          <span className="capitalize">{input.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm space-y-1">{renderInputDetails(input)}</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredInputs.length)} of{" "}
                  {filteredInputs.length} entries
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}