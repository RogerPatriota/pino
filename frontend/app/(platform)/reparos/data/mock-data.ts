export type Priority = "low" | "medium" | "high";
export type Status = "planned" | "in-progress" | "done";

export interface TechAssignee {
  id: string;
  name: string;
  avatarUrl?: string;
  initials: string;
}

export interface ServiceOrder {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate: string;
  assignees: TechAssignee[];
  commentsCount: number;
  linksCount: number;
  progress?: number;
}

export const mockServiceOrders: ServiceOrder[] = [
  // {
  //   id: "os-1",
  //   title: "Troca de Tela iPhone 13",
  //   description: "Cliente relatou tela trincada após queda. Substituição do display frontal.",
  //   status: "planned",
  //   priority: "high",
  //   dueDate: "25 Mar 2024",
  //   assignees: [
  //     { id: "t1", name: "Carlos Silva", initials: "CS" },
  //     { id: "t2", name: "Ana Paula", initials: "AP" }
  //   ],
  //   commentsCount: 2,
  //   linksCount: 1
  // },
  // {
  //   id: "os-2",
  //   title: "Limpeza de PS5",
  //   description: "Console superaquecendo e desligando sozinho. Troca de pasta térmica e limpeza geral.",
  //   status: "planned",
  //   priority: "medium",
  //   dueDate: "28 Mar 2024",
  //   assignees: [
  //     { id: "t3", name: "João Pedro", initials: "JP" }
  //   ],
  //   commentsCount: 5,
  //   linksCount: 0
  // },
  {
    id: "os-3",
    title: "Reparo Placa Mãe Notebook Dell",
    description: "Equipamento não liga. Curto circuito identificado na linha de 19v.",
    status: "in-progress",
    priority: "high",
    dueDate: "30 Mar 2024",
    assignees: [
      { id: "t1", name: "Carlos Silva", initials: "CS" }
    ],
    commentsCount: 8,
    linksCount: 2,
    progress: 65
  },
  {
    id: "os-4",
    title: "Instalação de SSD MacBook Pro",
    description: "Upgrade de armazenamento HD para SSD de 1TB NVMe.",
    status: "in-progress",
    priority: "low",
    dueDate: "02 Apr 2024",
    assignees: [
      { id: "t2", name: "Ana Paula", initials: "AP" },
      { id: "t4", name: "Marcos Lima", initials: "ML" }
    ],
    commentsCount: 3,
    linksCount: 0,
    progress: 30
  },
  {
    id: "os-5",
    title: "Troca de Bateria S23 Ultra",
    description: "Bateria descarregando rapidamente. Bateria original adquirida no fornecedor local.",
    status: "done",
    priority: "high",
    dueDate: "07 Apr 2024",
    assignees: [
      { id: "t3", name: "João Pedro", initials: "JP" }
    ],
    commentsCount: 6,
    linksCount: 0,
    progress: 100
  },
  {
    id: "os-6",
    title: "Formatação Desktop Gamer",
    description: "Instalação do Windows 11 PRO e drivers placa de vídeo. Backup não solicitado.",
    status: "done",
    priority: "low",
    dueDate: "10 Apr 2024",
    assignees: [
      { id: "t4", name: "Marcos Lima", initials: "ML" }
    ],
    commentsCount: 4,
    linksCount: 1,
    progress: 100
  }
];
