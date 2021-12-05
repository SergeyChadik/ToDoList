import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValuesType
}

export const Todolist = (props: PropsType) => {

    const addTask = (title: string) => {
        props.addTask(title, props.todolistId)
    }

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle( title, props.todolistId)
    }

    
    const onAllClickHandler = () => props.changeFilter("all", props.todolistId);
    const onActiveClickHandler = () => props.changeFilter("active",props.todolistId);
    const onCompletedClickHandler = () => props.changeFilter("completed",props.todolistId);

    return <div>

        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodolistTitle} />
            <button onClick={() => {props.removeTodolist(props.todolistId)}}>X</button>
        </h3>
            <AddItemForm addItem={addTask}/>
        <div>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.todolistId)

                    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId)
                    }
                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.todolistId)
                    }

                    return <div key={t.id} className={t.isDone ? 'is-done' : ""}>
                        <Checkbox
                            onChange={changeTitle}
                            color='primary'
                            checked={t.isDone}/>
                        <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                        <button onClick={ onClickHandler }>x</button>
                        <IconButton onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button color={'inherit'} variant={props.filter === 'all' ? 'outlined' : 'text'} onClick={ onAllClickHandler }>All</Button>
            <Button color={'primary'} variant={props.filter === 'active' ? 'outlined' : 'text'} onClick={ onActiveClickHandler }>Active</Button>
            <Button color={'secondary'} variant={props.filter === 'completed' ? 'outlined' : 'text'} onClick={ onCompletedClickHandler }>Completed</Button>
        </div>
    </div>
}
