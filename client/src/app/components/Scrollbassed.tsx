import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";



export function ScrollBasedVelocityDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden m-10 ">
      <VelocityScroll>Empowering <span className="text-green-500">Farmer</span>  with Real - Time Insights</VelocityScroll>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
