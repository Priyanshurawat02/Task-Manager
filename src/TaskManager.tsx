import { useState } from "react"

interface Task {
    title: string;
    id: number;
    isCompleted: boolean;
}

export default function TaskManager() {
    const[tasks, setTasks] =useState<Array<Task>>([]);

    const [inputValue, setInputValue] =useState<string>("");

   const addTask=()=> {
    if(!inputValue.trim()) return;

    const newTask: Task={
        id:Date.now(),
        title: inputValue,
        isCompleted: false
    }
    setTasks([...tasks, newTask]);
    setInputValue("");
  }

const deleteTask=(id:number)=>{
    const newTasks = tasks.filter((task) =>task.id !== id);
    setTasks(newTasks);
}

const toggleTask=(id:number) =>{
    const newTasks= tasks.map((task)=>{
        if(task.id ===id){
            return {
                ...task,
                isCompleted:!task.isCompleted
            };
        }else{
            return task;
        }
    });
        setTasks(newTasks);
    }


    return (
        <div>
           <input 
           value={inputValue}
           onChange={(e)=>setInputValue(e.target.value)}/>
           {tasks.map((task) =>(
                <div key={task.id}>
                <p onClick={()=> toggleTask(task.id)}
                    style={{textDecoration: task.isCompleted ? "line-through":"none"}}>{task.title}</p>
                <button onClick={()=>deleteTask(task.id)}>Delete</button>
                </div>
            ))}
        
            <button onClick={addTask} disabled={!inputValue.trim()}>Add</button>
             
        </div>
    )
}