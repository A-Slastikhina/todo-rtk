export const selectTodos = (state,action)=>{
    return state.todo.lists.todoList.list
}
export const selectTodoList = (state, action)=>{
    return state.todo.lists.todoList
}
export const selectUrgentList = (state)=>{
    return state.todo.lists.urgentList
}
// export const selectFilteredTodos = (state, {listName = ''})=>{
//     return state.todos.find(list => (list.listName.includes(listName.toLowerCase())))
// }
export const selectUrgentTodos = (state)=>{
    return state.todo.lists.urgentList.list
}

export const selectMoveInfo = (state)=>{
    return state.todo.moveInfo
}