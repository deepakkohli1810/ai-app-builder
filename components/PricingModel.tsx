import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { BlueTitle } from './resuables';
import { PricingTable } from '@clerk/nextjs';

interface PricingModalProps {
 children: React.ReactNode;
 reason?: "upgrade" | "credits";
}

const  PricingModel = ({children , reason = "upgrade"} : PricingModalProps) => {
  const title 
  = reason === "credits" ? "Upgrade your plan" : "Out of credits";
  const description = 
  reason === "credits"
  ? "You have used all your credits. Upgrade your plan to continue using the app."
  : "Choose a plan that fits how much you build";

  return (
    <Dialog>
      <DialogTrigger className={"cursor-pointer"}>{children}</DialogTrigger>
      <DialogContent  className="border-white/8 bg-[#0f0f0f] p-6 text-white sm:max-w-6xl max-h-[90vh]
      overflow-y-auto " >
        <DialogHeader className= "px-6 pt-6 py-2 ">
          <DialogTitle className="font-serif text-xl tracking-tight text-white/90 ">
          <BlueTitle className="text-4xl">{title}</BlueTitle>
          </DialogTitle>
          <DialogDescription>
           {description}
          </DialogDescription>
        </DialogHeader>
        <PricingTable 
        checkoutProps={{
         appearance:{
          elements:{
           drawerRoot:{
            zIndex:2000
           }
          }
         }
        }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default PricingModel ;
