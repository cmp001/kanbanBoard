import React, { useContext, useState } from 'react';
import { KanbanContext } from '../context/KanbanContext';
import UserAvatar from './UserAvatar'; 
import axios from 'axios';

const KanbanCard = ({ ticket }) => {
  const { users } = useContext(KanbanContext);

  const user = users.find((user) => user.id === ticket.userId);
  const [isCompleted, setIsCompleted] = useState(ticket.isCompleted);

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
    updateTicketCompletion(ticket.id, !isCompleted);
  };

  const updateTicketCompletion = async (ticketId, isCompleted) => {
    try {
      const response = await axios.put(`/api/tickets/${ticketId}`, { isCompleted });
      if (response.status === 200) {
        console.log('Ticket completion updated successfully');
      } else {
        console.error('Error updating ticket completion:', response.data);
      }
    } catch (error) {
      console.error('Error updating ticket completion:', error);
    }
  };

  return (
    <div className="kanban-card">
      <div className="kanban-card-header">
        <span className="kanban-card-id">{ticket.id}</span>
        {user && <UserAvatar userId={user.id} />}
      </div>
      <h3 className="kanban-card-title">
      <input type="radio" checked={ticket.isCompleted} onChange={() => handleCheckboxChange(ticket.id)} />
      <span>{ticket.title}</span></h3>
      <div className="kanban-card-tag">
        {ticket.tag.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default KanbanCard;
