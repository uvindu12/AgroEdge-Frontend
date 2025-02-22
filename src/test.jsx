"use client";

import { Sparkles } from "lucide-react";
import { GlowingEffect } from "../src/components/ui/glowing-effect";

export default function GlowingEffectDemoSecond() {
  return (
    // Added container div with centering classes
    <div className="h-96 w-full flex items-center justify-center">
      
        <GridItem
          area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
          //icon={<Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />}
          title="Our Mission"
          description="Our mission in AgroEdge is to enable farmers through the means of innovation, data synthesis, and steady supportive materials which aim to maximise overall output and profitability. We aim to achieve smart farming for a sustainable future through presenting the resources yielded insights and an interconnected farming system. We plan to develop more sustainable, profitable knowledge-based farming industry through insights, sharing, and connecting global farmers."
        />
      
    </div>
  );
}

const GridItem = ({ area, icon, title, description }) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2.5xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-[300px] w-[920px] flex-col items-center justify-center gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
  <div className="space-y-3 text-center">
    <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-black dark:text-white">
      {title}
    </h3>
    <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] md:text-base/[1.375rem] text-gray-500 dark:text-neutral-400">
      {description}
    </h2>
  </div>
</div>

      </div>
    </li>
  );
};