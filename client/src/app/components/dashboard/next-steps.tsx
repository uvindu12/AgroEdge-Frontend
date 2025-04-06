import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Calendar, FileText, Tractor, User } from "lucide-react";


interface NextStepsProps {
  className? : string;
}

export function NextSteps ({ className }: NextStepsProps) {
  const nextSteps = [
    {icon: Calendar, title: "Create a Crop Calendar", description: "Plan your planting schedule", action: "Create Calender", href: "#"},

    {icon:Tractor, title: "Start a Growing Session", description: "Track your crop progress", action: " Start Session", href:"/activities"},

    {icon: User, title: "Connect with Mentore", description: "Get guidance from experts", action: "Find Mentors", href: "#"},

    {icon: FileText, title: "Download Resources", description: "Access guides and best practices", action: "View Resources", href: "#"},
  ];

  return (
    <Card className ={cn("", className)}>
      <CardHeader>
        <CardTitle>Next Steps</CardTitle>
        <CardDescription>Recommended actions to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <div className ="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {nextSteps.map((step, index) => (
            <Card key={index} className ="border-none shadow-none">
              <CardContent className ="p-4">
                <div className ="mb-4 flex h-10 4-10 items-center justify-center rounded-full bg-green-200">
                  <step.icon className ="h-5 w-5 text-green-900"/>
                </div>
                <h3 className = "mb-1 text-base font-medium">{step.title}</h3>
                <p className =" mb-4 text-sm text-muted-foreground">{step.description}</p>
                <Button className="bg-green-50 hover:bg-green-500 hover:text-green-50" variant ="outline" size="sm" asChild>
                  <a href={step.href}>
                    {step.action}
                    <ArrowRight className ="ml-1 h-4 w-4"/>
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}