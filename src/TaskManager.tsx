import { useState } from "react"

interface Task {
    title: string;
    id: number;
    isCompleted: boolean;
}

export default function TaskManager() {
    const[tasks, setTasks] =useState<Array<Task>>( [{
                id:1,
                title: "Sleep",
                isCompleted: true}
            ]);

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

    return (
        <div>
           <input 
           value={inputValue}
           onChange={(e)=>setInputValue(e.target.value)}/>
           {tasks.map((task) =>(
                <p key={task.id}>{task.title}</p>
            ))}
            <button onClick={addTask}>Add</button>
        </div>
    )
}