import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import { v1 } from 'uuid';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import AddItemForm from "./AddItemForm";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/ store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType

}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    // const todolist_Id1 = v1()
    // const todolist_Id2 = v1()
    //
    // const [todolists, dispatchToTodolists] = useReducer(todolistsReducer,[
    //     {id: todolist_Id1,title: 'What to learn',filter: 'all'},
    //     {id: todolist_Id2, title: 'What to learn',filter: 'all'}
    // ])
    //
    //
    // const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
    //     [todolist_Id1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "Rest API", isDone: false},
    //         {id: v1(), title: "GraphQL", isDone: false},
    //     ],
    //     [todolist_Id2]:[
    //         {id: v1(), title: "&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "JS", isDone: false},
    //         {id: v1(), title: "Rest API", isDone: true},
    //         {id: v1(), title: "GraphQL", isDone: false},
    //     ]
    // });

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch();

    function removeTask(taskID: string, todolistId: string) {
        dispatch(removeTaskAC(taskID, todolistId))
        // const action = removeTaskAC(taskID,todolistId)
        // dispatchToTasks(action)
        // tasks[todolistId] = tasks[todolistId].filter(t => t.id !== taskID);
        // setTasks({...tasks});
    }

   function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
        // const action = addTaskAC(title, todolistId)
        // dispatchToTasks(action)
        // let newTask = { id: v1(), title: title, isDone: false };
        // tasks[todolistId] = [newTask, ... tasks[todolistId]];
        // setTasks({...tasks});
    }


    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(id,isDone,todolistId))
        // const action = changeTaskStatusAC(id,isDone,todolistId)
        // dispatchToTasks(action)
        // tasks[todolistId] = tasks[todolistId].map(t => {
        //     if (t.id === id){
        //         return {...t, isDone: isDone}
        //     }
        //     return t
        // })
        // setTasks({...tasks})
    }

    const changeTaskTitle = (id: string, title: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id,title,todolistId))
        // const action = changeTaskTitleAC(id,title,todolistId)
        // dispatchToTasks(action)
        // tasks[todolistId] = tasks[todolistId].map(t => {
        //     if (t.id === id){
        //         return {...t, title: title}
        //     }
        //     return t
        // })
        // setTasks({...tasks})
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(ChangeTodolistFilterAC(value,todolistId))
        // const action = ChangeTodolistFilterAC(value, todolistId)
        // dispatchToTodolists(action)
        // let todolist = todolists.find(tl => tl.id === todolistId);
        //
        // if (todolist) {
        //     todolist.filter = value
        //     setTodolists([...todolists])
        // }
    }

    function changeTodolistTitle(title: string, todolistId: string) {
        dispatch(ChangeTodolistTitleAC(title,todolistId ))
        // const action = ChangeTodolistTitleAC(title,todolistId)
        // dispatchToTodolists(action)
       //setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: title} : tl))

    }

    const removeTodolist = ( todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId))
        // const action = RemoveTodolistAC(todolistId)
        // dispatchToTodolists(action)
        // setTodolists(todolists.filter(tl => tl.id !== todolistId))
        // delete tasks[todolistId]
    }

    const addTodolist = (title: string) => {
        dispatch(AddTodolistAC(title))
        // const action = AddTodolistAC(title)
        // dispatchToTasks(action)
        // dispatchToTodolists(action)

        // const newTodolistId = v1()
        // const newTodolist: TodolistType = {
        //     id: newTodolistId,
        //     title: title,
        //     filter: 'all'
        // }
        // setTodolists([...todolists, newTodolist])
        // setTasks({ ...tasks, [newTodolistId]:[] })
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
            <Grid item key={tl.id}>
                <Paper style={{padding: '10px'}}>
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
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu />
                    </IconButton>
                    <Typography variant='h6'>
                        News
                    </Typography>
                    <Button color='inherit'>Login</Button>

                 </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={3}>
                    {todoListComponents}
                </Grid>

            </Container>

        </div>

    );

}

export default AppWithRedux;
