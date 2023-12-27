// @refresh reset
import React from 'react'
import Task from './Task'
const TodoList = ({tasks}) => {
  return (
    <main>
    <table className='table w-full'>
        <thead className='justify-center'>
            <tr>
                <th>Task</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {tasks.map(task =><Task key={task.id} task={task}/>)}
        </tbody>
    </table>
</main>

        )
  }
export default TodoList