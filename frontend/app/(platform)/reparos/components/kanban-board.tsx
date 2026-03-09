"use client"

import { useMemo } from "react"
import { mockServiceOrders, ServiceOrder } from "../data/mock-data"
import { KanbanColumn } from "./kanban-column"

export function KanbanBoard() {
  const orders = useMemo(() => mockServiceOrders, []);

  const plannedOrders = useMemo(
    () => orders.filter((o) => o.status === "planned"),
    [orders]
  );
  const inProgressOrders = useMemo(
    () => orders.filter((o) => o.status === "in-progress"),
    [orders]
  );
  const doneOrders = useMemo(
    () => orders.filter((o) => o.status === "done"),
    [orders]
  );

  return (
    <div className="flex justify-start h-full w-full gap-4 overflow-x-auto overflow-y-hidden p-1 pb-6 hide-scrollbar flex-nowrap">
      <KanbanColumn 
        title="A fazer" 
        status="planned" 
        orders={plannedOrders} 
      />
      <KanbanColumn 
        title="Em analise" 
        status="planned" 
        orders={plannedOrders} 
      />

      <KanbanColumn 
        title="Aguardando peça" 
        status="done" 
        orders={doneOrders} 
      />
      
      <KanbanColumn 
        title="Em Progresso" 
        status="in-progress" 
        orders={inProgressOrders} 
      />

      <KanbanColumn 
        title="Aguardando pagamento" 
        status="in-progress" 
        orders={inProgressOrders} 
      />
      
      
      <KanbanColumn 
        title="Concluído" 
        status="done" 
        orders={doneOrders} 
      />
    </div>
  )
}
