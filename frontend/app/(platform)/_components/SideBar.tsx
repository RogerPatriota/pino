"use client"
import { 
    Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton,
    SidebarTrigger, useSidebar,
    SidebarFooter
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Cog, Cpu, Wallet } from "lucide-react"
import SideBarNav from "./SideBarNav"
import { usePathname } from "next/navigation"
import { navigationData } from "@/lib/navigation"
import CardPlan from "./CardPlan"

function SideBarContent() {
    const pathname = usePathname()
    const { open, setOpen } = useSidebar()

    const handleSidebarClick = (e: React.MouseEvent) => {
        if (!open) {
            const target = e.target as HTMLElement
            if (!target.closest('a')) {
                setOpen(true)
            }
        }
    }

    return (
        <Sidebar collapsible="icon" onClick={handleSidebarClick}>
            <SidebarHeader className="flex flex-row items-center justify-center mt-2">
                <SidebarMenu className="flex-1 justify-center">
                    <SidebarMenuItem className="flex items-center">
                        <SidebarMenuButton size="lg" className="items-center data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <div className="bg-teal-600 text-white flex aspect-square size-8 items-center justify-center rounded-lg">
                                <Cpu className="size-5! mr-0.5" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold text-lg">Pino</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                {open && <SidebarTrigger />}
            </SidebarHeader>
            <Separator className="my-1"/>
            <SidebarContent>
                {navigationData.map((group) => (
                    <SideBarNav key={group.title} data={group} pathname={pathname} />
                ))}
            </SidebarContent>
            <SidebarFooter>
                {open ? (
                    <>
                        <CardPlan />
                        <Separator className="my-2"/>
                        <div className="flex flex-row items-center justify-between my-3">
                            <p className="text-xs text-zinc-400">Todos os direitos reservados @2026</p>
                            <Cog strokeWidth={2} className="size-5! text-zinc-500 mr-2" />
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-4 my-2">
                        <Wallet strokeWidth={2} className="size-8! text-zinc-500 p-1 rounded-full hover:bg-teal-400/20" />
                        <Cog strokeWidth={2} className="size-8! text-zinc-500 p-1 rounded-full hover:bg-teal-400/20" />
                    </div>
                )}
            </SidebarFooter>
        </Sidebar>
    )
}

function SideBar() {
    return <SideBarContent />
}

export default SideBar
