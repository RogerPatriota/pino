import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import SideBar from "./_components/SideBar"
import Navbar from "./_components/Navbar"

export default function PlatformLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider defaultOpen={true}>
            <SideBar />
            <SidebarInset>
                <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                    <Navbar />
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
