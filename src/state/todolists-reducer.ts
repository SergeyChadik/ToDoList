import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
type AddTodolistsActionType = {
    type: 'ADD-TODOLIST'
    title: string
}

type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistId: string
    title: string
}

type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    todolistId: string
    filter: FilterValuesType
}


export type ActionType = RemoveTodoListActionType | AddTodolistsActionType
    | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            const newTodolistId = v1()
            const newTodolist: TodolistType = {
                id: newTodolistId,
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodolist]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todolistId ? {...tl,  filter: action.filter} : tl)
        default:
            return state
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return { type: 'REMOVE-TODOLIST', todolistId: todolistId}
}
