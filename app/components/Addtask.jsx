'use client'
import React, { useState } from 'react'
import { FiPlus } from "react-icons/fi";
import Modals from './Modal'
import { addTodo } from '../api';
import { useRouter } from 'next/navigation';
import {v4 as uuidv4} from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notifyAdd from './Toast'
const Addtask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask]=useState('');
  const [newAction, setNewAction]= useState('');
  const handleOnchangeTask=(e) => {
    setNewTask(e.target.value);
  }
  const handleOnchangeAction=(e) => {
    setNewAction(e.target.value);
  }
  const handleSubmitNewTodo=async (e) => {
    e.preventDefault();
    console.log(newTask)
    await addTodo({
      id:uuidv4(),
      action: newAction,
      task:newTask
    });
    setNewTask('');
    setNewAction('');
    router.refresh();
    setIsModalOpen(false);

  }
  const router=useRouter();
  return (
    <div>
        <button onClick={() => setIsModalOpen(true)} className='flex btn w-full bg-blue-600 hover:bg-blue-800 justify-center'>
            Add new task
            <FiPlus className='mt-1' />
        </button>
     
        <Modals modalOpen={isModalOpen} setModal={setIsModalOpen}>
            <form onSubmit={handleSubmitNewTodo}>
                <h3 className='text-center'>Add new task</h3>
                <div className='modal-action'>
                  <input
                  value={newTask}
                  onChange={handleOnchangeTask}
                  type='text'
                  placeholder='enter task here'
                  className='input input-bordered w-full mt-10'
                  
                  />
                  <input
                  value={newAction}
                  onChange={handleOnchangeAction}
                  type='text'
                  placeholder='enter action here'
                  className='input input-bordered w-full mt-10'
                  
                  />
           

                  <button onClick={notifyAdd} type='submit' className='btn bg-blue-600 bordered rounded-xl w-24 text-white mt-40'>Submit</button>
                 
                </div>
            </form>
        </Modals>
        <ToastContainer/>
       
    </div>
  )
}

export default Addtask