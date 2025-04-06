// app/farmer-report/[sessionId]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaRegIdCard } from "react-icons/fa6";
import { LuCircleUserRound } from "react-icons/lu";
import { TbReportAnalytics } from "react-icons/tb";
import { HiHome } from "react-icons/hi2";
import { HiDownload, HiOutlineCurrencyDollar } from "react-icons/hi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

interface Criterion {
  criterion: string;
  score: number;
  weight: number;
  weightContribution: number;
}

interface FarmerReport {
  farmerName: string;
  farmerId: string;
  finalScore: number;
  criteria: Criterion[];
  recommendations: string[];
}

export default function FarmerReport() {
  const [report, setReport] = useState<FarmerReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { sessionId } = useParams(); // Get sessionId from the URL

  // Fetch the report data when the component mounts
  useEffect(() => {
    const fetchReport = async () => {
      if (!sessionId) {
        setError("Session ID is missing");
        setLoading(false);
        setTimeout(() => {
          router.push("/activities");
        }, 2000);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Unauthorized: No token found");
        }

        const response = await axios.get(`http://localhost:5000/api/kpi/report/${sessionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response)

        setReport(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || "An error occurred while fetching the report");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [sessionId, router]);

  // Function to handle downloading the report as PDF
  const handleDownloadReport = () => {
    console.log("Downloading report...");
    const reportElement = document.querySelector(
      ".relative.flex.flex-col.p-4"
    ) as HTMLElement;

    if (!reportElement) {
      console.error("Report element not found");
      return;
    }

    html2canvas(reportElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      height: reportElement.scrollHeight,
      windowHeight: reportElement.scrollHeight,
    })
      .then((canvas) => {
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const imgData = canvas.toDataURL("image/png");

        let heightLeft = imgHeight;
        let position = 0;
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        const filename = `${report?.farmerName}_${report?.farmerId}_Report.pdf`;
        pdf.save(filename);

        console.log("Report downloaded successfully");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  // Function to handle route to prices page
  const handlePrices = () => {
    router.push("/price");
    console.log("Redirecting to prices page...");
  };

  // Function to handle returning to home
  const handleReturnHome = () => {
    router.push("/");
    console.log("Returning to home...");
  };

  if (loading) {
    return (
      <div className="w-full p-6 bg-white">
        <div className="text-center">
          <p>Loading report...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="w-full p-6 bg-white">
        <div className="text-center text-red-500">
          <p>{error || "No report data available"}</p>
          {error === "Session ID is missing" && <p>Redirecting to home page...</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-white">
      <div className="relative h-full p-2 border rounded-2xl md:rounded-3xl md:p-3">
        <div className="absolute inset-0 border-2 border-green-300 opacity-50 rounded-2xl" />

        <div className="relative flex flex-col p-4 overflow-hidden border shadow-lg rounded-xl sm:p-6 md:p-8 lg:p-10">
          {/* Notice about temporary report */}
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg text-yellow-800">
            <p>
              <strong>Note:</strong> This report is temporary and will expire if you refresh the page. Please download the report to save it.
            </p>
          </div>

          {/* Header Section */}
          <div className="mb-8 text-center">
            <h1 className="font-sans text-2xl font-bold tracking-tight text-black sm:text-3xl md:text-4xl">
              Farmer Performance Report by <span className="text-green-400">AgroEdge...</span>
            </h1>
            <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-3">
              <div className="flex items-center justify-center gap-4 p-4 transition-colors duration-300 border border-green-300 rounded-lg group bg-gray-50 hover:bg-green-300 hover:text-white">
                <LuCircleUserRound className="w-8 h-8 text-green-400 transition-colors duration-300 group-hover:text-white" />
                <div className="text-center">
                  <h3 className="text-lg font-medium">Farmer Name</h3>
                  <p className="text-xl font-semibold">{report.farmerName}</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 p-4 transition-colors duration-300 border border-green-300 rounded-lg group bg-gray-50 hover:bg-green-300 hover:text-white">
                <FaRegIdCard className="w-8 h-8 text-green-400 transition-colors duration-300 group-hover:text-white" />
                <div className="text-center">
                  <h3 className="text-lg font-medium">Farmer ID</h3>
                  <p className="text-xl font-semibold">{report.farmerId}</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 p-4 transition-colors duration-300 border border-green-300 rounded-lg group bg-gray-50 hover:bg-green-300 hover:text-white">
                <TbReportAnalytics className="w-8 h-8 text-green-400 transition-colors duration-300 group-hover:text-white" />
                <div className="text-center">
                  <h3 className="text-lg font-medium">Final Score</h3>
                  <p className="text-xl font-semibold">{report.finalScore}/100</p>
                </div>
              </div>
            </div>
          </div>

          {/* Criteria Table */}
          <div className="mb-8">
            <h2 className="mt-8 mb-6 text-xl font-semibold text-black">Performance Criteria</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-green-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left border">Criterion</th>
                    <th className="p-3 text-center border">Score (0-100)</th>
                    <th className="p-3 text-center border">Weight (%)</th>
                    <th className="p-3 text-center border">Weight Contribution</th>
                  </tr>
                </thead>
                <tbody>
                  {report.criteria.map((criterion, index) => (
                    <tr
                      key={index}
                      className="border hover:bg-gray-50 dark:hover:bg-green-300"
                    >
                      <td className="p-3 border">{criterion.criterion}</td>
                      <td className="p-3 text-center border">{criterion.score}</td>
                      <td className="p-3 text-center border">{criterion.weight}%</td>
                      <td className="p-3 text-center border">{criterion.weightContribution.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommendations Section */}
          <div>
            <h2 className="mt-8 mb-6 text-xl font-semibold">
              Recommendations from Team <span className="text-green-400">AgroEdge...</span>
            </h2>
            <ul className="pl-5 space-y-2 list-disc">
              {report.recommendations.map((recommendation, index) => (
                <li key={index} className="text-gray-500">
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>

          {/* Button container */}
          <div className="absolute bottom-0 right-0 flex pb-4 pr-4 space-x-4">
            <button
              onClick={handleDownloadReport}
              className="flex items-center px-4 py-2 text-black transition-colors duration-300 bg-white border border-green-400 rounded-md hover:bg-green-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <HiDownload className="w-5 h-5 mr-2" />
              Download Report
            </button>

            <button
              onClick={handlePrices}
              className="flex items-center px-4 py-2 text-black transition-colors duration-300 bg-white border border-indigo-300 rounded-md hover:bg-indigo-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <HiOutlineCurrencyDollar className="w-5 h-5 mr-2" />
              See vegetable prices
            </button>
            <button
              onClick={handleReturnHome}
              className="flex items-center px-4 py-2 text-black transition-colors duration-300 bg-white border border-blue-400 rounded-md hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <HiHome className="w-5 h-5 mr-2" />
              Return Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}