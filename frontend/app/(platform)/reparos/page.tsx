import { ReparosViewManager } from "./components/reparos-view-manager"
import { Button } from "@/components/ui/button"
import { Share, Users } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function ReparosPage() {
  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0">
      <div className="flex-1 min-h-0 flex flex-col">
        <ReparosViewManager />
      </div>
    </div>
  )
}
