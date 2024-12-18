import React, { useState } from 'react';
import './Notes.css';
export default function Notes() {
    const [todo,setToDo]= useState([]);
    const [task,setTask]= useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();
        var tsk = document.getElementById('textBox').value;
        // console.log(e);
        if(tsk.length>0)
            setToDo([...todo,tsk]);
        
        setTask("");
        document.getElementById('textBox').value='';
    }
    const handleDelete = (tn)=>
    {
        setToDo(
            todo.filter(tt=>tt!=tn)
        );
       
    }
    const handleEdit = (tn)=>
    {
        setToDo(
            todo.filter(tt=>tt!=tn)
        );
       document.getElementById('textBox').value=tn;
    }
  return (
    <>
        <h1>Welcome to TODO App</h1>
        {/* {task} */}
        <form onSubmit={handleSubmit}>
            <input id='textBox' type='text' name="Description" placeholder='Add Task ...' onChange={(e)=>setTask(e.target.value)}/>
            <input type='submit' value='Add'/>
        </form>
    <table>
        <tr>
            <td>
                TODO |
            </td>
            <td>
                Delete |
            </td>
            <td>
                Edit
            </td>
        </tr>
        {
            todo.map((taskname)=>(
            
                <tr>
                    <td><p>{taskname}</p></td>
                    <td><button onClick={()=>handleDelete(taskname)}>Delete</button></td>
                    <td><button onClick={()=>handleEdit(taskname)}>Edit</button></td>
                </tr>
            ))
        }
        </table>
    </>
  )
}
