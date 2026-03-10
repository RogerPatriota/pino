import { ServiceOrder } from "../data/mock-data"
import { KanbanCard } from "./kanban-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Droppable } from "@hello-pangea/dnd"

interface KanbanColumnProps {
  title: string;
  status: "planned" | "in-progress" | "done";
  orders: ServiceOrder[];
}

export function KanbanColumn({ title, status, orders }: KanbanColumnProps) {
  const getStatusColor = () => {
    switch (status) {
      case "planned": return "bg-gray-200 dark:bg-gray-700";
      case "in-progress": return "bg-blue-500";
      case "done": return "bg-green-500";
      default: return "bg-gray-200";
    }
  };

  const getStatusDotColor = () => {
    switch (status) {
      case "planned": return "bg-zinc-400 dark:bg-zinc-500";
      case "in-progress": return "bg-blue-500";
      case "done": return "bg-green-500 cursor-pointer"; // just generic
      default: return "bg-zinc-400";
    }
  };

  return (
    <div className="flex flex-col w-[270px] min-w-[270px] h-full bg-zinc-50/50 dark:bg-zinc-900/20 rounded-xl border border-border/50">
      <div className="p-3 py-4 flex items-center justify-between border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getStatusDotColor()}`} />
          <h3 className="font-semibold text-sm">{title}</h3>
          <span className="flex items-center justify-center w-5 h-5 ml-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-200 dark:bg-zinc-800 rounded-full">
            {orders.length}
          </span>
        </div>
        
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-500">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-3">
        <Droppable droppableId={status}>
          {(provided, snapshot) => (
            <div 
              className="min-h-full"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {orders.map((order, index) => (
                <KanbanCard key={order.id} order={order} index={index} />
              ))}
              {provided.placeholder}
              {orders.length === 0 && !snapshot.isDraggingOver && (
                <div className="h-24 flex items-center justify-center text-sm text-zinc-400 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg">
                  Sem ordens
                </div>
              )}
            </div>
          )}
        </Droppable>
      </ScrollArea>
    </div>
  )
}
