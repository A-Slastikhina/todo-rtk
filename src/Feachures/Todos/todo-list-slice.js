import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState ={
    lists:{
        todoList:{
            listID: nanoid(),
            listName:'all Todos',
            list:[
                {
                    id:nanoid(),
                    text:'react',
                    isCompleted: false,
                },
                {
                    id:nanoid(),
                    text:'redux',
                    isCompleted: false,
                },
            ]
        },
        urgentList:{
            listID: nanoid(),
            listName:'urgent Todos',
            list:[]
        },
        importantList:{
            listID: nanoid(),
            listName:'important Todos',
            list:[]
        }
    },


}

// const sort = (
//     droppableIdStart,
//     droppableIdEnd,
//     droppableIndexStart,
//     droppableIndexEnd,
//     draggableId
// )=>{
//     return {
//         payload:{
//             droppableIdStart,
//             droppableIdEnd,
//             droppableIndexStart,
//             droppableIndexEnd,
//             draggableId 
//         }
//     }
// }
const todosSlice = createSlice({
    name:'@todos',
    initialState:initialState,
    reducers:{
        createTodo: (state, action)=>{
             state.todo.id = nanoid();
             state.todo.text= action.payload;
            state.todos.todoList.list.push(state.todo)   
        },
        deleteTodo:(state,action)=>{
           state.lists.todoList.list = state.lists.todoList.list.filter((item)=>item.id !== action.payload )
        },
        toggleTodo:(state,action)=>{
           state.lists.todoList.list.map((item)=>item.isCompleted = !item.isCompleted )
        },
        moveTodo:{
            prepare(
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId){
                    return{
                        payload:{
                            droppableIdStart,
                            droppableIdEnd,
                            droppableIndexStart,
                            droppableIndexEnd,
                            draggableId 
                        }
                    }
                },
                reducer(state,action){
                    const {
                        droppableIdStart,
                        droppableIdEnd,
                        droppableIndexStart,
                        droppableIndexEnd,
                        draggableId 
                    } = action.payload
                    // const newState = [...state.todoList.list];
                   
                    //in the same list
                    if(droppableIdStart===droppableIdEnd){
                       // const list = state.lists.find(item => droppableIdStart === item.listID);
                       
                       console.log(Object.entries(state.lists.todoList.listID))
                        const card = state.lists.todoList.list.splice(droppableIndexStart, 1);
                        state.lists.todoList.list.splice(droppableIndexEnd,0,...card)
                    }

                    if(droppableIdStart!==droppableIdEnd){

                    }
                }
        }
    }, 

})

export const todosReducer = todosSlice.reducer;
export const {createTodo, deleteTodo,toggleTodo, moveTodo} = todosSlice.actions