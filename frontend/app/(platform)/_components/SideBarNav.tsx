import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import Link from "next/link"

function SideBarNav({ data, pathname }: { data: { title: string, items: { name: string, url: string, icon: any }[] }, pathname: string }) {
    const isActive = (url: string) => pathname === url

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="text-zinc-500">{data.title}</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {data.items.map((item) => (
                        <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton asChild className={`cursor-pointer mb-2 p-3! ${isActive(item.url) ? "bg-teal-500/10 hover:bg-teal-500/30" : ""}`}>
                                <Link href={item.url}>
                                    <item.icon className={`size-6! stroke-2! pr-1 ${isActive(item.url) ? "text-teal-600" : "text-zinc-700"}`}/>
                                    <span className={`text-lg font-semibold ${isActive(item.url) ? "text-teal-500" : "text-zinc-600"}`}>{item.name}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))} 
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

export default SideBarNav
