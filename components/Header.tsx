import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { ArrowRight, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import PricingModel from './PricingModel'
import { checkUser } from '@/lib/checkUser'
import { Plan } from '@/types/plans'
import { PLANS } from '@/lib/constants'

const Header =  async () => {
  const user = await checkUser() ;
  return (
    <header className=" fixed w-full top-0 left-0 z-50 h-16 border-b border-white/6 bg-white/7 backdrop-blur-md">
      <nav className=" mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/">
          <Image
            src={"/rename.png"}
            alt="kohli ai logo"
            width={100}
            height={100}
            priority
            className="h-12 w-auto"
          />
        </Link>
        <div className="flex items-center gap-5">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                size="sm"
                className={
                  " text-white/40  hover:text-white/80"
                }
              >
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button
                size="sm"
                className={
                  " h-8 rounded-full font-semibold active:scale-95 px-4 pt-0.5 "
                }
              >
                Get Started
                <ArrowRight className=" h-3 w-3 opacity-60 " />
              </Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link
              href={"/projects"}
              className="text-[13px] font-medium text-white/40 transition-colors
 hover:text-white/80"
            >
              Projects
            </Link>
            {user && <PricingModel>
              <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/5  px-3  text-xs text-white/70">
                <Zap className="mr-1 inline-block h-3 w-3 text-white" />
               {user.credits}/{PLANS[user?.plan as Plan].credits}
              </span>
            </PricingModel>
 }
            <UserButton />
          </Show>
        </div>
      </nav>
    </header>
  );
}

export default Header
