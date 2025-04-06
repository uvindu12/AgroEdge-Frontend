import type { Metadata } from "next"
import CommunityHub from "./community-hub"

export const metadata: Metadata = {
  title: "Farmers Community Hub",
  description: "Connect with farmers, share knowledge, and solve problems together",
}

export default function CommunityPage() {
  return <CommunityHub />
}

