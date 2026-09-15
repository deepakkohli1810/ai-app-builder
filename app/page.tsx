"use client" ;



import { HoleBackground } from "@/components/animate-ui/components/backgrounds/hole";
import { BlueTitle, GrayTitle, SectionHeading, SectionLable } from "@/components/resuables";
import { Badge } from "@/components/ui/badge";
import {
  Button,
  buttonVariants,
} from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {PricingTable, SignInButton, useAuth} from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FEATURES, PLACEHOLDERS, STEPS, SUGGESTIONS } from "@/lib/data";
import { ArrowRight, ChevronRight, Section } from "lucide-react";

export default function Home() {
  const {isSignedIn} = useAuth();
  const router = useRouter() ;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [prompt, setPrompt] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(()=>{
    if(isFocused || prompt ) return ; 
    const t = setInterval(()=>{
      setPlaceholderIndex((i)=> (i + 1) % PLACEHOLDERS.length)
    }, 3000);
    return ()=> clearInterval(t); 
  }, [isFocused , prompt]) ; 

  useEffect(()=>{
    const el = textareaRef.current ;
    if(!el) return ;
    el.style.height = "auto" ;
    el.style.height = Math.min(el.scrollHeight , 200 ) + "px";
  }, [prompt]) ; 
  
  const handleSubmit = () => {
    if (!prompt.trim() || !isSignedIn  ) return;
    router.push(`/workspace?prompt=${encodeURIComponent(prompt.trim())}`);
    
    }

  // Submit on Enter key press , allow shift + Enter for new line/
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {  
    if (e.key ==="Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(); 
    }
  }


  const handleSuggestion = (s: string) => {
    setPrompt(s);
    textareaRef.current?.focus();
  }
  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-white/20">
      <section className="relative  flex flex-col items-center overflow-hidden px-4 pb-40 pt-40 text-center">
        <HoleBackground
          strokeColor="rgba(255, 255 , 255 ,0.05)"
          className="absolute inset-0 h-full w-full "
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.5 ) 50%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.5 ) 50%, transparent 100%)",
          }}
        />
        <Badge
          variant={"outline"}
          className=" p-4 gap-2 backdrop-blur-sm "
        >
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 " />
          Powered by Gemini 3.5 Flash
        </Badge>
        <h1 className="mx-auto max-w-3xl text-balance font-serif text-5xl leading-tight tracking-tight sm:text-5xl lg:text-7xl z-10">
          <GrayTitle>Forge your dream </GrayTitle>
          <br />
          <BlueTitle>from a single prompt. </BlueTitle>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-white/40 z-10">
          Describe what you want to build. AI writes the
          code , picks the packages , and renders a live
          preview all inside your browser.
        </p>

        {/* Prompt Box */}
        <div className="relative mx-auto mt-12 w-full max-w-2xl ">
          <div
            className={cn(
              "rounded-2xl border bg-[#111111] duration-200 ",
              isFocused ?
                "border-white/20 ring-1 ring-white/8"
              : "border-white/8",
            )}
          >
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              rows={1}
              className="w-full resize-none bg-transparent px-5 pb-4 pt-5 text-sm 
               placeholder:text-white/40 focus:outline-none sm:text-base sm:leading-6"
              style={{ minHeight: 56, maxHeight: 200 }}
              placeholder={PLACEHOLDERS[placeholderIndex]}
            />

            <div
              className="flex items-center justify-between border-t border-white/6 
              px-4 py-2.5"
            >
              <span className="text-sm text-white/20 ">
                Press ⏎ to generate Shift + ⏎ for new line
              </span>
              {isSignedIn ?
                <Button
                  onClick={handleSubmit}
                  disabled={!prompt.trim()}
                  className="h-8 rounded-full px-5 font-semibold"
                  variant={
                    prompt.trim() ? "default" : "secondary"
                  }
                >
                  Generate
                </Button>
              : <SignInButton mode="modal">
                  {/* The div is the single child Clerk is looking for */}
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleSubmit}
                      type="button"
                      className="h-8 rounded-full bg-white px-5 font-semibold"
                    >
                      Generate
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </SignInButton>
              }
            </div>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2 ">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSuggestion(s)}
                className="rounded-full border border-white/8 bg-white/4 px-3 py-1.5 
              text-xs text-white/40 hover:border-white/15 hover:bg-white/8 hover:text-white/70"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-10 text-sm text-white/20">
          No Credit is required. 10 free generations on sign
          up
        </p>
      </section>
      <section className="py-20 px-4 ">
        <div className="max-w-7xl mx-auto">
          {/* Browser Chrome */}
          <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-800">
            {/* Browser Header */}
            <div className="bg-gray-900 px-4 py-3 flex items-center gap-4">
              {/* Traffic Light Dots */}
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              {/* URL Bar */}
              <div className="flex-1 bg-gray-800 rounded-lg px-4 py-1.5 text-sm text-gray-400">
                forge-ai-workspace.app
              </div>
            </div>

            {/* Split Panel Layout */}
            <div className="grid grid-cols-2 h-[600px] bg-gray-950">
              {/* Left Panel - Chat */}
              <div className="border-r border-gray-800 flex flex-col">
                {/* Chat Messages */}
                <div className="flex-1 p-6 space-y-4 overflow-hidden">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="bg-gray-700 rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%]">
                      <p className="text-gray-100 text-sm">
                        Build me a task tracker
                      </p>
                    </div>
                  </div>

                  {/* AI Response 1 */}
                  <div className="flex justify-start">
                    <div className="bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 max-w-[80%]">
                      <p className="text-gray-300 text-sm">
                        I'll create a kanban board with
                        three columns: Todo, In Progress,
                        and Done. Each column will support
                        drag-and-drop cards with task
                        details.
                      </p>
                    </div>
                  </div>

                  {/* AI Response 2 with Typing Indicator */}
                  <div className="flex justify-start">
                    <div className="bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 max-w-[80%]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-800">
                  <div className="bg-gray-800 rounded-lg px-4 py-3 flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 bg-transparent text-gray-300 text-sm outline-none"
                      readOnly
                    />
                    <button className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Panel - Code/Preview */}
              <div className="flex flex-col">
                {/* Tabs */}
                <div className="flex border-b border-gray-800 bg-gray-900">
                  <button className="px-6 py-3 text-sm font-medium text-gray-100 bg-gray-800 border-b-2 border-blue-500">
                    Preview
                  </button>
                  <button className="px-6 py-3 text-sm font-medium text-gray-400 hover:text-gray-200">
                    Code
                  </button>
                  <button className="px-6 py-3 text-sm font-medium text-gray-400 hover:text-gray-200">
                    Console
                  </button>
                </div>

                {/* Kanban Board */}
                <div className="flex-1 p-6">
                  <div className="grid grid-cols-2 gap-4 h-full">
                    {/* Todo Column */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-gray-300 mb-4">
                        Todo
                      </h3>
                      <div className="bg-gray-800 rounded-lg p-4 space-y-2">
                        <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4 space-y-2">
                        <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                        <div className="h-3 bg-gray-700 rounded w-1/3"></div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4 space-y-2">
                        <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                      </div>
                    </div>

                    {/* In Progress Column */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-gray-300 mb-4">
                        In Progress
                      </h3>
                      <div className="bg-gray-800 rounded-lg p-4 space-y-2">
                        <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4 space-y-2">
                        <div className="h-3 bg-gray-700 rounded w-2/2"></div>
                      </div>
                    </div>

                    {/* Done Column */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-gray-300 mb-4">
                        Done
                      </h3>
                      <div className="bg-gray-800 rounded-lg p-4 space-y-2">
                        <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4 space-y-2">
                        <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                        <div className="h-3 bg-gray-700 rounded w-1/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-32">
        <div className="max-w-6xl mx-auto mb-14 text-center">
          <SectionLable>Everything you need</SectionLable>
          <h1 className="mx-auto max-w-3xl text-balance font-serif text-5xl leading-tight tracking-tight sm:text-5xl lg:text-7xl z-10">
            <GrayTitle>From prompt </GrayTitle>
            <br />
            <BlueTitle>to production . </BlueTitle>
          </h1>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/6 bg-white/6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, label, desc }) => {
            return (
              <div
                key={label}
                className="group bg-[#0a0a0a] p-7 hover:bg-[#0f0f0f] transition-colors duration-200"
              >
                {/* 1. Icon Container (Fixed size, only holds the icon) */}
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/4 group-hover:border-white/15 group-hover:bg-white/8 transition-colors duration-200">
                  <Icon className="h-4 w-4 text-white/60 group-hover:text-blue-400/70" />
                </div>

                {/* 2. Text Container (Sits below the icon, free to expand) */}
                <h3 className="mb-2 text-sm font-semibold text-white">
                  {label}
                </h3>
                <p className="text-sm leading-relaxed text-white/40">
                  {desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-4 pb-32">
        <div className="max-w-5xl mx-auto mb-14 text-center">
          <SectionLable>How it works</SectionLable>
          <h1 className="mx-auto max-w-3xl text-balance font-serif text-5xl leading-tight tracking-tight sm:text-5xl lg:text-7xl z-10">
            <GrayTitle>Four steps </GrayTitle>
            <br />
            <BlueTitle>to a working app. </BlueTitle>
          </h1>
        </div>

        <div className="mx-auto max-w-3xl">
          {STEPS.map((step, i) => (
            <div key={step.number} className="flex gap-6">
              <div className="flex flex-col items-center mt-1">
                <div className=" flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/4">
                  <span className=" font-mono text-xs font-semibold text-white/50 ">
                    {step.number}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="mt-2 h-full w-px bg-white/6 " />
                )}
              </div>
              <div className="pb-10 pt-1.5">
                <p className="mb-1.5 text-sm font-semibold sm:text-base ">
                  {step.label}
                </p>

                <p className="text-sm leading-relaxed text-white/40">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pb-32">
        <div className="max-w-5xl mx-auto mb-14 text-center">
          <SectionLable>Simple pricing </SectionLable>
          <h1 className="mx-auto max-w-3xl text-balance font-serif text-5xl leading-tight tracking-tight sm:text-5xl lg:text-7xl z-10">
            <GrayTitle>Start free </GrayTitle>
            <br />
            <BlueTitle>scale when ready </BlueTitle>
          </h1>
          <p className="text-white/30 mx-auto mt-4 max-w-sm text-sm">
            No credit card required. Upgrade or downgrade
            anytime.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <PricingTable
            checkoutProps={{
              appearance: {
                elements: {
                  drawerRoot: {
                    zIndex: 2000,
                  },
                },
              },
            }}
          />
        </div>
      </section>

      <section
        className="relative mx-auto mb-32 max-w-5xl overflow-hidden rounded-2xl border border-white/8 
       px-10 py-42 text-center"
      >
        <HoleBackground
          strokeColor="rgba(255, 255 , 255 ,0.05)"
          className="absolute inset-0 h-full w-full "
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.5 ) 50%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.5 ) 50%, transparent 100%)",
          }}
        />

        <h1 className="mx-auto max-w-3xl text-balance font-serif text-5xl leading-tight tracking-tight sm:text-5xl lg:text-7xl z-10">
          <GrayTitle>Start building </GrayTitle>
          <br />
          <BlueTitle>for free. </BlueTitle>
        </h1>
        <p>
          Get 10 free generations on sign up. No credit card
          required.
          <br />
          Upgrade when you&apos;re ready.
        </p>

        <SignInButton mode="modal">
          <Button
            size="lg"
            className="relative h-10 mt-5 rounded-full bg-white px-6"
          >
            Get started free
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </SignInButton>
      </section>

      <footer className="relative z-10 border-t border-white/7 py-12 mx-auto px-6 flex flex-wrap items-center justify-center text-stone-400">
        Made with ❤️ by Deepak Kohli
      </footer>
    </main>
  );
}
