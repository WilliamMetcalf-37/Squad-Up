
import React, { useContext, useState, useEffect } from "react"



export default props => {
    
    
    const editMode = props.match.params.hasOwnProperty("taskId")
    
    const [task, setTask] = useState({})
    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newTask = Object.assign({}, task)
        newTask[event.target.name] = event.target.value
        setTask(newTask)
    }

    const setDefaults = () => {
        if (editMode) {
            const taskId = parseInt(props.match.params.taskId)
            const selectedTask = tasks.find(t => t.id === taskId) || {}
            setTask(selectedTask)
        }
    }

    useEffect(() => {
        setDefaults()
    }, [tasks])

    const constructNewTask = () => {
   
            if (editMode) {
                updateTask({ 
                    id: task.id,
                    name: task.name,
                    task: task.task,
                    dueDate: task.dateTime,
                    isCompleted: false,
                    userId: parseInt(localStorage.getItem("activeUser"))
                })
                    .then(() => props.history.push("/tasks"))
            } else {
                addTask({
                    name: task.name,
                    task: task.task,
                    dueDate: task.dateTime,
                    isCompleted: false,
                    userId: parseInt(localStorage.getItem("activeUser"))
                })
                    .then(() => props.history.push("/tasks"))
            }

        }
        
    

    return (
        <form className="taskForm">
            <h2 className="taskForm__title">{editMode ? "Update Task" : "Admit Task"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Task name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        proptype="varchar"
                        placeholder="Task name"
                        defaultValue={task.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="task">Task: </label>
                    <input type="text" name="task" required className="form-control"
                        proptype="varchar"
                        placeholder="Task"
                        defaultValue={task.task}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="treatment">Date: </label>
                    <input type="datetime-local" name="dateTime" className="form-control"
                        proptype="varchar"
                        value={task.dateTime}
                        onChange={handleControlledInputChange}>
                    </input>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    if(task.name === "" || task.task==="" || task.dateTime ===""){
                        window.alert("Please fill out all input fields")
                    }else{
                    evt.preventDefault()
                    constructNewTask()
                    }
                    
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Create Task"}
            </button>
        </form>
    )
}