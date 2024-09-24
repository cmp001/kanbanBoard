import React from 'react';
import KanbanCard from './KanbanCard';

const KanbanColumn = ({ title, tickets }) => {
  return (
    <div className="kanban-column">
      <h2 className="kanban-column-title">{title}</h2>
      <div className="kanban-column-content">
        {tickets.map((ticket) => (
          <KanbanCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
