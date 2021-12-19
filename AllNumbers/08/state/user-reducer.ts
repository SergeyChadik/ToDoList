export type StateType = {
    age: number
    childrenCount: number
    name: string
}

export type ActionType = {
    type: string
    [key: string]: any
}


export const userReducer = (user: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {...user, age: user.age + 1};
        case 'INCREMENT-CHILDREN-COUNT':
            return {...user, childrenCount: user.childrenCount + 1};
        case 'CHANGE_NAME':
            return {...user, name: action.newName}
        default:
            throw new Error('I don`t understand this type')
    }
}