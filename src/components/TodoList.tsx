import React from 'react'

const TodoList = () => {
  const [task, setTask] = React.useState<string[]>([]); // state to hold the list of tasks
  const [input, setInput] = React.useState(""); // state to hold the current input value

  const addTask = () => {
    if (!input.trim()) return; // prevent adding empty tasks

    setTask([...task, input]); // add the new task to the list
    setInput(""); // clear the input field
  }

  const deleteTask = (index: number) => {
    setTask(task.filter((_, i) => i !== index)); // _ = the task (we don’t use it)  || i !== index; keep everything EXCEPT the one we want to delete  
                                                 // filter() will loop through the array and return a new array with only the tasks that do not match the index || eg. index 1   i !== index 1  => 0 !== 1 (true)  || 1 !== 1 (false) || 2 !== 1 (true) => return [task0, task2] and remove task1
  }

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
          />
          <button className='btn btn-primary mb-3' onClick={addTask}>Add</button>

        </div>
        
        <ul className="list-group">
          {task.map((task, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
              {task}
              <button className='btn btn-danger btn-sm' onClick={() => deleteTask(index)}> X </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TodoList