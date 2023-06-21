import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
// import { refreshTodoList, refreshTodoList2 } from "../../config";


//import { CreateTodo } from "../../config";

const initialState ={
  
    lists:{
        todoList:{
            listID: nanoid(),
            listName:'todoList',
            list:[]
        },
        urgentList:{
            listID: nanoid(),
            listName:'urgentList',
            list:[]
        },
        importantList:{
            listID: nanoid(),
            listName:'important Todos',
            list:[]
        }
    },
    moveInfo:{
        // startListId:'',
        startListName:'',
        // endListId:'',
        endListName:'',
        todoIndexEnd:'' ,
        todoId:'',
        todoText:''
    }

}

export const createTodo = createAsyncThunk(
    '@@todos/create-todo',
    async(text, {extra})=>{
         return extra.api.createTodo(text)
        
    }
)
export const loadTodos = createAsyncThunk(
    '@@todos/load-todo',
    async (_, {extra})=>{
        return extra.api.loadTodos()
    }
)
export const loadUrgentTodos = createAsyncThunk(
    '@@todos/load-urgent-todo',
    async (_, {extra})=>{
        return extra.api.loadUrgentTodos()
    }
)
// export const toggleTodo = createAsyncThunk(
//     '@@todos/toggle-todo',
//     async (id, { extra})=>{
//       const todo = state.todos.entities[id];
//       return extra.api.toggleTodo(id, {completed: !todo.completed});
  
//     }
//   )
export  const refreshTodoList = createAsyncThunk(
    '@@todos/move-delete-todo',
    async({id, listName}, {extra})=>{
        return extra.api.refreshTodoList({id, listName})
    }
  )

export  const refreshTodoList2 = createAsyncThunk(
    '@@todos/move-add-todo',
    async({id, listName, text}, {extra})=>{
        return extra.api.refreshTodoList2({id, listName, text})
    }
  )
  export const deleteTodo = createAsyncThunk(
    '@@todos/delete-todo',
    async({id,listName}, {extra})=>{

      return extra.api.deleteTodo({id, listName})
    }
  );

const todoSlice = createSlice({
    name:'@todo',
    initialState:initialState,
    reducers:{
       
        toggleTodo:(state,action)=>{
           state.lists.todoList.list.map((item)=>item.isCompleted = !item.isCompleted )
        },
        moveTodo:{
            prepare(
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId
               
                ){
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
                    const listObj = state.lists;
                    
                    const entries =  Object.values(listObj)
                    let currentObject={}
                    //in the same list
                    if(droppableIdStart===droppableIdEnd){

                        entries.forEach(entry => {
                          const listInfos =   Object.values(entry)   
                          const listId   =  listInfos[0]                  
                            if(listId===droppableIdStart){                           
                                currentObject=entry;                 
                            }
                        });                     
                        const card = currentObject.list.splice(droppableIndexStart, 1);
                        currentObject.list.splice(droppableIndexEnd,0,...card)
                    }

                    if(droppableIdStart!==droppableIdEnd){
                        let card;
                        let listStart;
                        let listInfosEnd;
                        let currentTodoId;
                        let currentTodoText;
                        entries.forEach(entry => {
                            const listInfos =   Object.values(entry)   
                              if(listInfos[0]===droppableIdStart){
                               // listStart=listInfos[1]
                                state.moveInfo.startListName=listInfos[1]
                                  currentObject=entry; 
                                card = currentObject.list.splice(droppableIndexStart, 1);
                              
                              }          
                          }); 
                          
                          entries.forEach(entry => {
                            const listInfos =   Object.values(entry)                               
                              if(listInfos[0]===droppableIdEnd){
                                state.moveInfo.endListName=listInfos[1];
                                let objectEnd = entry;
                             objectEnd.list.splice(droppableIndexEnd,0,...card);
                             state.moveInfo.todoIndexEnd = droppableIndexEnd;   
                             currentTodoId=objectEnd.list[droppableIndexEnd].id;
                             state.moveInfo.todoId=currentTodoId;
                             currentTodoText = objectEnd.list[droppableIndexEnd].text;
                             state.moveInfo.todoText=currentTodoText
                              }        
                           
                          }); 
                          

                    //     refreshTodoList2({id:currentTodoId, listName:listInfosEnd, text:currentTodoText})
                    //    refreshTodoList({id:currentTodoId, listName:listStart})
                        //   console.log(listStart, listInfosEnd, currentTodoId,currentTodoText);

                    }

                }
        }, 
       
    }, 
    extraReducers:(builder)=>{
        builder
        .addCase(createTodo.fulfilled, (state,action)=>{
           state.lists.todoList.list.push(action.payload);
        })
        .addCase(createTodo.rejected,(state,action)=>{
            console.log(action.error.message)
        })
        .addCase(loadTodos.fulfilled, (state,action)=>{
            state.lists.todoList.list = action.payload
   
        })
        .addCase(loadUrgentTodos.fulfilled,(state,action)=>{
            state.lists.urgentList.list = action.payload
        })
        .addCase(deleteTodo.fulfilled, (state, action)=>{
            const listObj = state.lists;
           
            const entries =  Object.values(listObj)
            let currentObject= {}
            entries.forEach(entry => {
                const listInfos =   Object.values(entry)
               
                  if(listInfos[1]===action.payload.listName){
                    
                    currentObject=entry;
                     entry.list = entry.list.filter(item=>{
                        return item.id !==action.payload.id
                     })
                    
                  }
              });                    

        })
        .addCase(refreshTodoList.fulfilled, (state,action)=>{
            // const droppableIdStart = state.startListId;
            // const droppableIdEnd = state.endListId;
            // const droppableIndexEnd = state.todoIndexEnd;
            // console.log(state.startListId)
            // let listStart;
            // let listInfosEnd;
            // let currentTodoId;
            // let currentTodoText;
            // const listObj = state.lists;
            // const entries =  Object.values(listObj);
            // if(droppableIdStart!==droppableIdEnd){
            //   console.log('checked')
               
            //     entries.forEach(entry => {
            //         const listInfos =   Object.values(entry)   
            //           if(listInfos[0]===droppableIdStart){
            //             listStart=listInfos[1]

            //           }          
            //       }); 
                  
            //       entries.forEach(entry => {
            //         const listInfos =   Object.values(entry)                               
            //           if(listInfos[0]===droppableIdEnd){
            //             listInfosEnd=listInfos[1];
            //             let objectEnd = entry;                  
            //          currentTodoId=objectEnd.list[droppableIndexEnd].id;
            //          currentTodoText = objectEnd.list[droppableIndexEnd].text
            //           }        
            
            //      }); 
                  
        //         refreshTodoList2({id:currentTodoId, listName:listInfosEnd, text:currentTodoText})
        //    refreshTodoList({id:currentTodoId, listName:listStart})
              
                  
                  

        //    }

          //return  ({id:state.moveInfo.todoId, listName:state.moveInfo.startListName})
        })
        // .addCase(refreshTodoList.rejected, (state,action)=>{
        //   return  console.log('rejected' + state.moveInfo.todoId)
        // })
        // .addCase(refreshTodoList2.fulfilled, (state, action)=>{
        //     return  console.log('fulfilled' + state.moveInfo.todoId)
        // })
    }

})

export const todoReducer = todoSlice.reducer;
export const { toggleTodo, moveTodo} = todoSlice.actions