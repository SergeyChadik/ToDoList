import {FilterValuesType, TaskStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodoListActionType} from "./todolists-reducer";

type RemoveTasksActionType = {
    type: "REMOVE-TASK"
    todolistId: string
    taskID: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
type ChangeTaskStatusAC = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    isDone: boolean
    todolistId: string
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    id: string
    title: string
    todolistId: string
}


export type ActionType =
    RemoveTasksActionType
    | AddTaskActionType
    | ChangeTaskStatusAC
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodoListActionType


const initialState: TaskStateType = {}


export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            state[action.todolistId] = state[action.todolistId].filter(t => t.id !== action.taskID);
            return {...state};
        case "ADD-TASK":
            let newTask = {id: v1(), title: action.title, isDone: false};
            state[action.todolistId] = [newTask, ...state[action.todolistId]];
            return {...state}
        case "CHANGE-TASK-STATUS":
            state[action.todolistId] = state[action.todolistId].map(t => {
                if (t.id === action.id) {
                    return {...t, isDone: action.isDone}
                }
                return t
            })
            return {...state}
        case "CHANGE-TASK-TITLE":
            state[action.todolistId] = state[action.todolistId].map(t => {
                if (t.id === action.id) {
                    return {...t, title: action.title}
                }
                return t
            })
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistId: string): RemoveTasksActionType => {
    return {type: 'REMOVE-TASK', taskID: taskID, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId: todolistId}
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusAC => {
    return {type: 'CHANGE-TASK-STATUS', id, isDone, todolistId: todolistId}
}
export const changeTaskTitleAC = (id: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', id, title, todolistId: todolistId}
}
export const removeTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', todolistId: todolistId}
}



