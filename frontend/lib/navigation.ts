import {
    LayoutDashboard,
    Wrench,
    Toolbox,
    Landmark,
    Boxes,
    Users,
    LucideIcon,
    Home
} from "lucide-react"

export type NavItem = {
    name: string
    url: string
    icon: LucideIcon
}

export type NavGroup = {
    title: string
    items: NavItem[]
}

export const navigationData: NavGroup[] = [
    {
        title: "Serviços",
        items: [
            {
                name: "Início",
                url: "/dashboard",
                icon: Home,
            },
            {
                name: "Reparos",
                url: "/reparos",
                icon: Wrench,
            },
            {
                name: "Serviços",
                url: "/servicos",
                icon: Toolbox,
            },
        ],
    },
    {
        title: "Organização",
        items: [
            {
                name: "Financeiro",
                url: "/financeiro",
                icon: Landmark,
            },
            {
                name: "Estoque",
                url: "/estoque",
                icon: Boxes,
            },
            {
                name: "Clientes",
                url: "/clientes",
                icon: Users,
            },
        ],
    }
]

export function getPageName(pathname: string): string {
    for (const group of navigationData) {
        const item = group.items.find(item => item.url === pathname)
        if (item) return item.name
    }
    return "Página"
}
