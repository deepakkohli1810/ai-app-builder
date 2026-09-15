import { Message, StatusStep } from '@/types/workspace'
import { BlockList } from 'net';
import React from 'react'

interface ChatPanelPros {
 message: Message[];
 isGenerating : boolean; 
 inImproving: boolean; 
 statusLog:StatusStep[]; 
 credits : number ; 
 initialPrompt : string | null ; 
 onGenerate : (prompt : string , imageUrl?: string ) => Promise<void> ; 
 userId : string ; 
 work
}

const ChatPanel = ({
 messages , 
 isGenerating , 
 isImproving , 
 statusLog , 
 credits, 
 initialPrompt , 
 onGenerate , 
 userId , 
 workspaceId 
}) => {
  return (
    <div>
      
    </div>
  )
}

export default ChatPanel
