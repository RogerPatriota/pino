"use client"
import { 
    Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton,
    SidebarTrigger, useSidebar
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Cpu } from "lucide-react"
import SideBarNav from "./SideBarNav"
import { usePathname } from "next/navigation"
import { navigationData } from "@/lib/navigation"

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
                                <Cpu className="size-5!" />
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
        </Sidebar>
    )
}

function SideBar() {
    return <SideBarContent />
}

export default SideBar
