import React, { useState, DragEvent } from 'react'
import Swal from 'sweetalert2';
import { useTaskStore } from '../stores';
import { TaskStatus } from '../interfaces';

interface Options {
  status: TaskStatus,
}
export const useTasks = ({ status }:Options) => {
  const isDragging = useTaskStore(store => !!store.draggingTaskId);
  const onTaskDrop = useTaskStore( state => state.onTaskDrop);
  const addTask = useTaskStore( state => state.addTask);

  const [onDragOver, setOnDragOver] = useState(false)
  const handleAddTask = async () => {
    const { isConfirmed, value: title } = await Swal.fire({
      title: 'Nueva tarea',
      input: 'text',
      inputLabel: 'Titulo de la tarea',
      inputPlaceholder: 'Ingrese el titulo de la tarea',
      showCancelButton: true,
      inputValidator: (value) => {
        if(!value) {
          return 'Debe de ingresar un titulo para la tarea'
        }
      }
    })
    if (isConfirmed) {
      addTask(title, status)
    }
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setOnDragOver(true)
  }
  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setOnDragOver(false)
  }
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setOnDragOver(false)
    onTaskDrop(status)
  }
  
  return {
    //Properties
    isDragging,

    //Methods
    onDragOver,
    handleAddTask,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  }
}
