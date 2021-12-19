import {ActionType, StateType, userReducer} from './user-reducer';

test('increment age', () => {
    const startUser: StateType = { age: 23, childrenCount: 3, name: 'Dimych' };

    const endState = userReducer(startUser, { type: 'INCREMENT-AGE' })

    expect(endState.age).toBe(24);
});

test('user reducer should increment only childrenCount', () => {
    const startState = { age: 29, childrenCount: 3, name: 'Dimych' };
    const myAction: ActionType = {type: 'INCREMENT-CHILDREN-COUNT'}

    const endState = userReducer(startState, myAction)

    expect(endState.childrenCount).toBe(4);
    // your code here
});
test('change name of reducer', () => {
   const startState = { name: 'Dimych', age: 20, childrenCount: 2};
   const newName = 'Victor';
   const endState = userReducer(startState, {type: 'CHANGE_NAME',newName: "Bob"})

    expect(endState.name).toBe("Bob");
    // your code here
});
