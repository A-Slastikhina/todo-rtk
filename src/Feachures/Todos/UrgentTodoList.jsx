import { Draggable, Droppable } from "react-beautiful-dnd"
import { useDispatch,useSelector } from "react-redux";
import {  selectUrgentList, selectUrgentTodos } from "./todos-selector";
import { deleteTodo, loadUrgentTodos, toggleTodo } from "./todo-slice";
import { useEffect } from "react";
import { StyledTodoList, TododListItem } from "./TodoList";

export const UrgentTodoList = ()=>{
    const dispatch = useDispatch()
    const urgentList = useSelector(selectUrgentList);
    const urgentTodos = useSelector(selectUrgentTodos);
    useEffect(()=>{
      dispatch(loadUrgentTodos());
 
     },[dispatch])

    return(
        <Droppable droppableId={String(urgentList.listID)}>
          
        {(provided)=>(
            <StyledTodoList {...provided.droppableProps} ref={provided.innerRef} className="collection todo-list">
            {urgentTodos.map((todo, index)=>{
               
                return (<Draggable draggableId={String(todo.id)} index={index} key={todo.id} >
                        {provided=>(
                           
                            <TododListItem className="collection-item todo-item" key={todo.id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >{todo.text} 
                             <div>
                             <i className="small material-icons todo-icon--completed" data-title='отметить как выполненное' onClick={()=>{dispatch(toggleTodo(urgentList.listID,todo.id))}}>done</i>
                             <i className="small material-icons todo-icon--delete" data-title='удалить' onClick={()=>dispatch(deleteTodo({id:todo.id, listName:urgentList.listName }))}>delete</i>
                             </div>
                             </TododListItem>
                           
                             
                        )}
                       
                        </Draggable> 
               )
            })}
           {provided.placeholder}
          </StyledTodoList>)
        }
        
      </Droppable>
    )
}