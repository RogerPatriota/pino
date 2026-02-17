"use client"
import { usePathname } from "next/navigation"
import { getPageName } from "@/lib/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Bell, ChevronDown } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function Navbar() {
    const pathname = usePathname()
    const currentPage = getPageName(pathname)

    return (
        <nav className="flex h-[65px] p-4 shrink-0 text-zinc-700 items-center gap-2 border-b  transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[49px]">
            <h1 className="text-xl font-semibold ">{currentPage}</h1>
            <div className="flex-1 flex justify-end items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="default" size="lg" className="flex items-center justify-center w-28 h-10 gap-1 bg-teal-600 hover:bg-teal-500 transition-all ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-8 group-has-data-[collapsible=icon]/sidebar-wrapper:w-8 group-has-data-[collapsible=icon]/sidebar-wrapper:p-0">
                            <ChevronDown className="size-5! stroke-3! mt-1 text-white group-has-data-[collapsible=icon]/sidebar-wrapper:mt-0" />
                            <span className="text-sm font-semibold text-white group-has-data-[collapsible=icon]/sidebar-wrapper:hidden">Nova ação</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" side="left" className="bg-white w-40! p-1 mt-2 border border-teal-700/30">
                        <DropdownMenuItem className="text-zinc-800 hover:bg-zinc-100! hover:text-teal-600! border-b p-1 m-1 my-2 border-zinc-200 text-xs sm:text-xs md:text-xs lg:text-xs">Criar Ordem de Serviço</DropdownMenuItem>
                        <DropdownMenuItem className="text-zinc-800 hover:bg-zinc-100! hover:text-teal-600! border-b p-1 m-1 my-2 border-zinc-200 text-xs sm:text-xs md:text-xs lg:text-xs">Adicionar produto</DropdownMenuItem>
                        <DropdownMenuItem className="text-zinc-800 hover:bg-zinc-100! hover:text-teal-600! border-b p-1 m-1 my-2 border-zinc-200 text-xs sm:text-xs md:text-xs lg:text-xs">Adicionar Cliente</DropdownMenuItem>
                        <DropdownMenuItem className="text-zinc-800 hover:bg-zinc-100! hover:text-teal-600! p-1 m-1 my-2 border-zinc-200 text-xs sm:text-xs md:text-xs lg:text-xs">Adicionar Serviço</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Bell strokeWidth={2} className="size-5!" />
                <Separator orientation="vertical" />
                <div className="flex flex-row items-center mr-4">
                    <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>RB</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                        <p className="text-base font-semibold group-has-data-[collapsible=icon]/sidebar-wrapper:text-sm">Robson B.</p>
                        <p className="text-sm text-zinc-500 group-has-data-[collapsible=icon]/sidebar-wrapper:text-xs">Gerente</p>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar