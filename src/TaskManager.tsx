import { useEffect, useState } from "react"

interface Task {
    title: string;
    id: number;
    isCompleted: boolean;
}

export default function TaskManager() {
    const[tasks, setTasks] =useState<Array<Task>>([]);
    const [inputValue, setInputValue] =useState<string>("");
    const [hydrated, setHydrated] =useState(false);
    const[filter,setFilter] =useState<"all" | "active" | "completed">("all");


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

   useEffect(()=>{
    const savedTasks= localStorage.getItem("tasks")
    if(savedTasks){
        setTasks(JSON.parse(savedTasks))
    }
    setHydrated(true);
  },[])

  useEffect(()=>{
    if(!hydrated) return;
    localStorage.setItem("tasks",JSON.stringify(tasks))
  },[tasks,hydrated])

 

const deleteTask=(id:number)=>{
    const newTasks = tasks.filter((task) =>task.id !== id);
    setTasks(newTasks);
}

const toggleTask =(id:number) =>{
    const newToggle = tasks.map((task)=>{
        if(task.id === id){
            return {
                ...task,
                isCompleted: !task.isCompleted
            };
        } else{
                return task;
            }      
    });
     setTasks(newToggle);
}

const filteredTask=tasks.filter(task =>{
    if (filter==="active"){
    return !task.isCompleted
    } if(filter === "completed"){
        return task.isCompleted
    }
    return true;
})
  


    return (
        <div>
           <input 
           value={inputValue}
           onChange={(e)=>setInputValue(e.target.value)}/>

           <button onClick={addTask} disabled={!inputValue.trim()}>Add</button>

           <div>
              <button onClick={() => setFilter("all")}>All</button>
              <button onClick={() => setFilter("active")}>Active</button>
              <button onClick={() => setFilter("completed")}>Completed</button>
            </div>

           {filteredTask.map((task) =>(
                <div key={task.id}>
                <p 
                onClick={()=> toggleTask(task.id)}
                    style={{textDecoration: task.isCompleted ? "line-through": "none"}}>
                        {task.title}</p>

                <button onClick={()=>deleteTask(task.id)}>Delete</button>
                </div>
            ))} 
             
        </div>
    )
}   