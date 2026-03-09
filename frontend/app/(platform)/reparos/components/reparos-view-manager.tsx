"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KanbanBoard } from "./kanban-board"
import { LayoutDashboard, Calendar as CalendarIcon, List, Table2, Filter, Users, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ReparosViewManager() {
  const [view, setView] = useState("board")

  return (
    <div className="flex flex-col h-full min-w-0 box-border m-6">
      <Tabs defaultValue="board" value={view} onValueChange={setView} className="flex flex-col h-full min-h-0">
        <div className="flex items-center justify-between mb-3 shrink-0 rounded-lg">
          <TabsList className="gap-2 rounded-sm">
            <TabsTrigger value="board" className="p-3 data-[state=active]:text-teal-600 text-zinc-500 group rounded-sm">
              <LayoutDashboard className="" />
              <span className="">Board</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="p-3 data-[state=active]:text-teal-600 rounded-sm">
              <CalendarIcon className="" />
              Calendário
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center text-sm text-zinc-500 gap-2">
            <Button variant="ghost" className="flex items-center rounded-sm gap-1.5 hover:text-zinc-800 border-zinc-200 transition-colors">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button variant="ghost" className="flex items-center rounded-sm gap-1.5 hover:text-zinc-800 border-zinc-200 transition-colors">
              <Users className="h-4 w-4" /> Group by
            </Button>
            <Button variant="ghost" className="flex items-center rounded-sm gap-1.5 hover:text-zinc-800 border-zinc-200 transition-colors">
              <ArrowUpDown className="h-4 w-4" /> Sort
            </Button>
          </div>
        </div>

        <TabsContent value="board" className="flex-1 min-h-0 min-w-0 outline-none m-0 p-0">
          <KanbanBoard />
        </TabsContent>
        
        <TabsContent value="calendar" className="flex-1 mt-0 h-full border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-center">
          <div className="text-center text-zinc-500 flex flex-col items-center gap-3">
            <CalendarIcon className="h-10 w-10 opacity-20" />
            <p className="text-sm font-medium">A visualização de Calendário será implementada em breve.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
