'use client'

import React, { useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import Modals from './Modal';
import { useRouter } from 'next/navigation';
import { editTodo, deleteTodo } from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyUpdate, notifyDelele } from './Toast';
const Task = ({task}) => {
  const [openModelEdit, setOpenModalEdit]=useState(false);
  const [openModalDel, setOpenModalDel]=useState(false);
  const [newTask, setNewTask]=useState(task.task);
  const [newAction, setNewAction]= useState(task.action);
  const router=useRouter();
  const handleSubmitEdit=async (e)=> {
    e.preventDefault();
    await editTodo({
      id:task.id,
      task:newTask,
      action:newAction,
    });
    setNewTask('');
    setOpenModalEdit(false);
    router.refresh();
  }
  const handleDeleteTask=async(id) =>{
    await deleteTodo(id);
    setOpenModalDel(false);
    router.refresh();
  }
  const deleteTask=() => {
    handleDeleteTask(task.id)
    notifyDelele
  }

 
  return (
    <tr key={task.id} className='text-center'>
        <td className='w-2/5 truncate md:text-clip'>{task.task}</td>
        <td className='grid-cols-1 w-2/5'>{task.action}</td>
        <td className='flex gap-5 '>
          <FaRegEdit onClick={()=>setOpenModalEdit(true)} cursor='pointer' className='text-blue-500'/>
          <Modals modalOpen={openModelEdit} setModal={setOpenModalEdit}>
            <form onSubmit={handleSubmitEdit}>
                <h3 className='text-center'>Edit task</h3>
                <div className='modal-action'>
                  <input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  type='text'
                  placeholder='enter task here'
                  className='input input-bordered w-full mt-10'                 
                  />
                  <input
                  value={newAction}
                  onChange={(e) => setNewAction(e.target.value)}
                  type='text'
                  placeholder='enter action here'
                  className='input input-bordered w-full mt-10'                 
                  />
                  <button onClick={notifyUpdate} type='submit' className='btn bg-blue-600 bordered rounded-xl w-24 text-white mt-40'>Submit</button>
                </div>
            </form>
        </Modals>
        <ToastContainer/>

          <IoTrashOutline onClick={() => setOpenModalDel(true)} cursor='pointer' className='text-red-700' />
          <Modals modalOpen={openModalDel} setModal={setOpenModalDel}>
            <h3>Are you sure , you want to delete this task</h3>
            <div className='modal-action'>
                <button 
                      onClick={deleteTask}
                      className='bg-blue-800 hover:bg-red-800 rounded-sm font-bold mt-10 max-w-lg'>
                  Yes
                </button>
            </div>
        </Modals>
        <ToastContainer/>
        </td>
    </tr>
  )
}

export default Task