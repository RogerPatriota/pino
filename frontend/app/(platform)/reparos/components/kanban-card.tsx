import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ServiceOrder } from "../data/mock-data"
import { Calendar, MessageSquare, Paperclip, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface KanbanCardProps {
  order: ServiceOrder;
}

export function KanbanCard({ order }: KanbanCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 hover:bg-red-100/80 dark:bg-red-500/20 dark:text-red-400";
      case "medium":
        return "bg-amber-100 text-amber-700 hover:bg-amber-100/80 dark:bg-amber-500/20 dark:text-amber-400";
      case "low":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100/80 dark:bg-blue-500/20 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high": return "Alta";
      case "medium": return "Média";
      case "low": return "Baixa";
      default: return priority;
    }
  };

  return (
    <Card className="mb-3 hover:shadow-md transition-shadow cursor-pointer gap-1 pt-2 shadow-sm border border-zinc-200 dark:border-zinc-800 ring-0">
      <CardHeader className="p-3 pb-2 flex flex-row items-center justify-between space-y-0">
        <Badge variant="secondary" className="font-normal text-[13px] bg-teal-200/20 border border-teal-500 dark:bg-zinc-800 dark:border-teal-800 text-zinc-600 dark:text-zinc-400 rounded-sm px-1.5 py-0">
          {order.id.toUpperCase()}
        </Badge>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-700 -mr-1">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="p-3 pt-0">
        <h4 className="font-semibold text-base mb-1.5 leading-tight">{order.title}</h4>
        <p className="text-[11px] text-muted-foreground line-clamp-2 mb-3 leading-snug">
          {order.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-4">
          <div className="flex -space-x-2">
            {order.assignees.map((assignee) => (
              <Avatar key={assignee.id} className="h-6 w-6 border-2 border-background">
                {assignee.avatarUrl ? (
                  <AvatarImage src={assignee.avatarUrl} alt={assignee.name} />
                ) : null}
                <AvatarFallback className="text-[10px] bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                  {assignee.initials}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            <span>{order.dueDate}</span>
          </div>
        </div>

        {/* {order.progress !== undefined && (
          <div className="mt-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5">
            <div 
              className="bg-green-500 h-1.5 rounded-full" 
              style={{ width: `${order.progress}%` }}
            />
          </div>
        )} */}
      </CardContent>

      <CardFooter className="p-3 px-4 flex items-center justify-between text-xs text-muted-foreground bg-zinc-50 border-t">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{order.commentsCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Paperclip className="h-3.5 w-3.5" />
            <span>{order.linksCount}</span>
          </div>
        </div>
        <Badge className={`font-medium border-none rounded-full px-2 py-0 h-5 ${getPriorityColor(order.priority)}`}>
          {getPriorityLabel(order.priority)}
        </Badge>
      </CardFooter>
    </Card>
  )
}
