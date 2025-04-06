import { Metadata } from "next";
import { DashboardShell } from "../components/dashboard/dashboard-shell";
import { DashboardHeader } from "../components/dashboard/dashboard-header";
import NewFarmerClient from "../components/dashboard/NewFarmerClient";


export const metadata: Metadata = {
  title: "New Farmer Dashboard | AgroEdge",
  description: "Dashboard with personalized crop recommendations for new farmers."
};

export default function NewFarmerDashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Welcome to your Personalized Dashboard" text="Based on your farm detaisl, we've prepared recommendations to help you get started." className ="p-5 text-center"/>
      <NewFarmerClient />
    </DashboardShell>
  )
}