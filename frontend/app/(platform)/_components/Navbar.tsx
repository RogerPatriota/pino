"use client"
import { usePathname } from "next/navigation"
import { getPageName } from "@/lib/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Bell, ChevronDown } from "lucide-react"
import { Separator } from "@/components/ui/separator"

function Navbar() {
    const pathname = usePathname()
    const currentPage = getPageName(pathname)

    return (
        <nav className="flex h-[77px] p-4 shrink-0 text-zinc-700 items-center gap-2 border-b  transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[61px]">
            <h1 className="text-xl font-semibold ">{currentPage}</h1>
            <div className="flex-1 flex justify-end items-center gap-4">
                <Button variant="default" size="lg" className="flex w-36 h-10 gap-2 bg-teal-400 hover:bg-teal-500">
                    <ChevronDown className="size-5! stroke-2! text-white"/>
                    <span className="text-base font-semibold text-white">Nova ação</span>
                </Button>
                <Bell strokeWidth={2} className="size-6!" />
                <Separator orientation="vertical"/>
                <div className="flex flex-row items-center mr-4">
                    <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>RB</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                        <p className="text-base font-semibold">Robson B.</p>
                        <p className="text-sm text-zinc-500">Gerente</p>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar