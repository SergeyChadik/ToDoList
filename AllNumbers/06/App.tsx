import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType

}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todolist_Id1 = v1()
    const todolist_Id2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolist_Id1,title: 'What to learn',filter: 'all'},
        {id: todolist_Id2, title: 'What to learn',filter: 'all'}
    ])


    const [tasks, setTasks] = useState<TaskStateType>({
        [todolist_Id1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolist_Id2]:[
            {id: v1(), title: "&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "Rest API", isDone: true},
            {id: v1(), title: "GraphQL", isDone: false},
        ]
    });

    function removeTask(taskID: string, todolistId: string) {
        tasks[todolistId] = tasks[todolistId].filter(t => t.id !== taskID);
        setTasks({...tasks});
    }

    function addTask(title: string, todolistId: string) {
        let newTask = { id: v1(), title: title, isDone: false };
        tasks[todolistId] = [newTask, ... tasks[todolistId]];
        setTasks({...tasks});
    }


    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        tasks[todolistId] = tasks[todolistId].map(t => {
            if (t.id === id){
                return {...t, isDone: isDone}
            }
            return t
        })
        setTasks({...tasks})
    }

    const changeTaskTitle = (id: string, title: string, todolistId: string) => {
        tasks[todolistId] = tasks[todolistId].map(t => {
            if (t.id === id){
                return {...t, title: title}
            }
            return t
        })
        setTasks({...tasks})
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);

        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function changeTodolistTitle(title: string, todolistId: string) {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: title} : tl))

    }

    const removeTodolist = ( todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }

    function addTodolist(title: string)  {
        const newTodolistId = v1()
        const newTodolist: TodolistType = {
            id: newTodolistId,
            title: title,
            filter: 'all'
        }
        setTodolists([...todolists, newTodolist])
        setTasks({ ...tasks, [newTodolistId]:[] })
    }



    const todoListComponents = todolists.map(tl => {
        let tasksForTodolist = tasks[tl.id];

        if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
        }

        return (
            <Todolist
                todolistId={tl.id}
                title={tl.title}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                changeTodolistTitle={changeTodolistTitle}
                      removeTodolist={removeTodolist}
                      filter={tl.filter}
        />
        )
    })

    return (
        <div className="App">
            {todoListComponents}
        </div>
    );
}

export default App;
