import React from "react";
import './Todo.css'
import {useState,useRef,useEffect} from 'react'
import { FaTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { MdOutlineDoneAll } from "react-icons/md";

function Todo(){
   const [todo,SetTodo]=useState('')
   const [todos,SetTodos]=useState([])
   const [editId, setEditID]=useState(0)

   const addToDo=()=>{
    if(todo!==''){
        SetTodos([...todos,{list:todo,id:Date.now(),status:false} ])
    SetTodo('')
    } 
    if(editId){
        const editTodo=todos.find((to)=>to.id===editId)
        const updateTodo=todos.map((to)=>to.id===editTodo.id?(to={id:to.id,list:todo}) :(to={id:to.id,list:to.list}))
    SetTodos(updateTodo)
    setEditID(0)
    SetTodo('')
    }
   }
   const handleSubmit=(e)=>{
    e.preventDefault()  //Whenever the states got updated, render all the times,when it refresh it will get clear the data- default character of form in react  
   }
   const inputRef=useRef('null')
   useEffect(()=>{
    inputRef.current.focus()
   })
   const onDelete=(id)=>{
    SetTodos(todos.filter((to) =>to.id!==id))
   }
   const onComplete=(id) =>{
        let complete=todos.map((list)=>{
            if(list.id===id){
                return ({...list,status:!list.status})
            }
            return list
        })
        SetTodos(complete)
   }
   const onEdit=(id)=>{
            const editTodo=todos.find((to)=>to.id===id )
            SetTodo(editTodo.list)
            setEditID(editTodo.id)
        }
    return (
        <div className="container">
            <h2>Todo App</h2>  
            <form className="form-group" onSubmit={handleSubmit}>
                
                <input type="text" value={todo} ref={inputRef} placeholder="Enter your todo" className="form-control" onChange={(event)=> SetTodo(event.target.value)}> 
                </input>
                <button onClick={addToDo}> {editId ? 'EDIT':'ADD'}</button>
            </form>
            <div className="list">
                <ul>
                    {
                        todos.map((to)=>(
                            <li className="list-items">
                                <div className="list-item-list" id={to.status?'list-item':''}>{to.list }</div>
                            <span>
                                < MdOutlineDoneAll 
                                className="list-item-icons"
                                 id="complete" 
                                 title="Complete"
                                 onClick={()=>onComplete(to.id)}
                                 />
                                 
                                <MdEdit
                                className="list-item-icons"
                                id="edit" title="Edit"
                                onClick={()=>onEdit(to.id)}
                                />
                                <FaTrashCan className="list-item-icons"
                                 id="delete"
                                title="Delete"
                                onClick={()=>onDelete(to.id)}
                                />
                            </span>
                            
                            </li>
                        ))
                    }

                </ul>
            </div>
             </div>
    )
}

export default Todo