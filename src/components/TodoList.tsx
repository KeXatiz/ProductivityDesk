import React, { useEffect } from 'react'

// add checkbox + strike-through
type Task = {
  text: string;
  completed: boolean;
}

const TodoList = () => {
  // const [task, setTask] = React.useState<string[]>([]); // state to hold the list of tasks
  const [tasks, setTasks] = React.useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");  // on local we have store tasks
    return saved ? JSON.parse(saved) : [];  // convert string → array || else return empty array if no saved tasks
  })

  // load from localstorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));    // convert to array of tasks to string  and save to localstorage whenever tasks change
  }, [tasks]);

  const [input, setInput] = React.useState(""); // state to hold the current input value

  const addTask = () => {
    if (!input.trim()) return; // prevent adding empty tasks

    //setTask([...task, input]); // add the new task to the list
    setTasks([...tasks, { text: input, completed: false }]);
    setInput(""); // clear the input field
  }

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index)); // _ = the task (we don’t use it)  || i !== index; keep everything EXCEPT the one we want to delete  
                                                   // filter() will loop through the array and return a new array with only the tasks that do not match the index || eg. index 1   i !== index 1  => 0 !== 1 (true)  || 1 !== 1 (false) || 2 !== 1 (true) => return [task0, task2] and remove task1
  }

  const [editingIndex, setEditingIndex] = React.useState<number | null>(null); // state to track which task is being edited
  const [editText, setEditText] = React.useState(""); // state to hold the current edit text

  const startEdit = (index: number) => {
    setEditingIndex(index); // set the index of the task being edited
    setEditText(tasks[index].text); // set the edit text to the current task text
  }

  const saveEdit = (index: number) => {
    setTasks(tasks.map((task, i) => i === index ? { ...task, text: editText } : task)); // update the task text in the tasks array
    setEditingIndex(null); // exit edit mode
  }

  // toggle completed
  const toggleTask = (index: number) => {
    setTasks(tasks.map((task, i) => i === index ? {...task, completed: !task.completed} : task));
  };

  return (
    <div className="card p-2 mb-5">
      <div className="card-body">
        <h2 className="card-title">Todo List</h2>
        <div className='d-flex mb-2'>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {if (e.key === "Enter") addTask()}}
          />
          <button className='btn btn-primary mb-2 mx-2' onClick={addTask}>Add</button>

        </div>
        
        <ul className="list-group">
          {tasks.map((task, index) => (
            <li key={index} className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? "completed" : ""}`}>
              <div className='d-flex align-items-center w-100'>
                <input type='checkbox' checked={task.completed} onChange={() => toggleTask(index)} className='me-2' />

                {editingIndex === index ? (
                  <input 
                    className='form-control' 
                    value={editText} 
                    autoFocus 
                    onChange={(e) => setEditText(e.target.value)} 
                    onBlur={() => { 
                      if (editText.trim() === "") return; 
                      saveEdit(index);}} 
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (editText.trim() === "") return;  
                        saveEdit(index);
                      }
                      if (e.key === "Escape") setEditingIndex(null);
                    }}/> 
                ) : (
                  <span onClick={() => startEdit(index)} style={{ textDecoration: task.completed ? "line-through" : "none", color: task.completed ? "gray" : "black", cursor: "pointer" }}>
                    {task.text}
                  </span>
                )}
              </div>
              <button className='btn btn-danger btn-sm ms-2' onClick={() => deleteTask(index)}> X </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TodoList