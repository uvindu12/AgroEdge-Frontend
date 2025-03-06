"use client";

import React, { useState } from "react";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { cn } from "./lib/utils";
import { GlowingEffect } from "./components/ui/glowing-effect";

export default function GlowingEffectDemoSecond() {
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');

    const formData = new FormData(e.target);
    formData.append("access_key", "dba475b2-72b9-4175-9684-ee51428373c2");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      
      const data = await res.json();
      
      if (data.success) {
        setSubmitStatus('success');
        console.log("Success", data);
        e.target.reset();
      } else {
        setSubmitStatus('error');
        console.error("Submission failed", data);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div id="contact" className="min-h-[600px] w-full flex flex-col items-center mb-8 justify-center pb-6">
      <h3 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-neutral-200">Contact Us</h3>
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        content={
          <div className="flex w-full gap-8">
            <div className="w-1/2 flex items-center justify-center">
              <div className="w-full h-full rounded-xl overflow-hidden">
                <img 
                  src="src/images/contactus-Photoroom.png" 
                  alt="Contact" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="w-1/2">
              <div className="w-full rounded-none md:rounded-2xl p-4 md:p-8 bg-white dark:bg-black">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                  Get in Touch With Us!
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                  Have a question or want to collaborate? Reach out – let's create
                  sustainable farming solutions together!
                </p>

                <form className="my-6" onSubmit={handleSubmit}>
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <LabelInputContainer>
                      <Label htmlFor="firstname">First name</Label>
                      <Input id="firstname" name="firstname" placeholder="John" type="text" required />
                    </LabelInputContainer>
                    <LabelInputContainer>
                      <Label htmlFor="lastname">Last name</Label>
                      <Input id="lastname" name="lastname" placeholder="Doe" type="text" required />
                    </LabelInputContainer>
                  </div>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" placeholder="johndoe@gmail.com" type="email" required />
                  </LabelInputContainer>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Your message here..."
                      className="w-full p-2 border border-neutral-300 rounded-md dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
                      required
                    />
                  </LabelInputContainer>

                  <button
                    className={`bg-gradient-to-br relative group/btn from-green-400 dark:from-zinc-900 dark:to-zinc-900 to-green-800 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] ${
                      submitStatus === 'submitting' ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                  >
                    {submitStatus === 'submitting' ? 'Sending...' : 'Send Message'} &rarr;
                  </button>

                  {submitStatus === 'success' && (
                    <p className="mt-4 text-green-600 text-center">Message sent successfully!</p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="mt-4 text-red-600 text-center">Failed to send message. Please try again.</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

const GridItem = ({ area, content }) => {
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
        <div className="relative flex h-auto w-[1200px] flex-col items-center justify-center gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          {content}
        </div>
      </div>
    </li>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};