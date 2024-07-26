import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";

function Home() {
  const [ todos, setTodos ] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/get')
    .then(result => setTodos(result.data))
    .catch(err => console.error(err))
  }, [])
  const handleEdit = (id) => {
    axios.put('http://localhost:3000/update/' + id)
    .then(result => {
      location.reload()
    })
    .catch(err => console.error(err))
  }
  const handlerDelete = (id) => {
    axios.delete('http://localhost:3000/delete/' + id)
    .then(result => {
      location.reload()
    })
    .catch(err => console.error(err))
  }
  return (
    <div  className='home'>
        <h2>Todo List</h2>
        <Create />
        <br />
        {
          todos.length === 0
          ?
          <div><h2>No record</h2></div>
          :
          todos.map(todo => (
            <div className='task'>
              <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                {todo.done ? 
                  <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill> 
                  : <BsCircleFill className='icon' />
                }
                <p className={todo.done ? 'line_through' : ''}>{todo.task}</p>
              </div>
              <div>
                <span><BsFillTrashFill className='icon' onClick={() => handlerDelete(todo._id)} /></span>
              </div>
            </div>
          ))

        }
    </div>
  )
}

export default Home