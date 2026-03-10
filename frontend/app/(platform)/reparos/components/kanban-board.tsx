"use client"

import { useMemo, useState } from "react"
import { mockServiceOrders, ServiceOrder } from "../data/mock-data"
import { KanbanColumn } from "./kanban-column"
import { DragDropContext, DropResult } from "@hello-pangea/dnd"

export function KanbanBoard() {
  const [orders, setOrders] = useState<ServiceOrder[]>(mockServiceOrders);

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

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId as ServiceOrder['status'];

    setOrders((prevOrders) => {
      // Find the dragged order and create a copy of all other orders
      const orderToMove = prevOrders.find((o) => o.id === draggableId);
      if (!orderToMove) return prevOrders;
      
      const otherOrders = prevOrders.filter((o) => o.id !== draggableId);

      // We don't have a strict global order field yet, but we can manage local index arrangement
      // Since our lists are filtered, we insert it at the correct index visually by
      // slicing the specific status array if we wanted strict index ordering.
      // For a basic implementation, just mapping the status update:
      
      const updatedOrder = { ...orderToMove, status: newStatus };
      
      // Separate the destination column
      const destColumnOrders = otherOrders.filter(o => o.status === newStatus);
      const otherColumnsOrders = otherOrders.filter(o => o.status !== newStatus);
      
      // Insert at the new index
      destColumnOrders.splice(destination.index, 0, updatedOrder);
      
      return [...otherColumnsOrders, ...destColumnOrders];
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-start h-full w-full gap-4 overflow-x-auto overflow-y-hidden p-1 pb-6 hide-scrollbar flex-nowrap">
        <KanbanColumn 
          title="A fazer" 
          status="planned" 
          orders={plannedOrders} 
        />
        
        <KanbanColumn 
          title="Em Progresso" 
          status="in-progress" 
          orders={inProgressOrders} 
        />
        
        <KanbanColumn 
          title="Concluído" 
          status="done" 
          orders={doneOrders} 
        />
      </div>
    </DragDropContext>
  )
}
