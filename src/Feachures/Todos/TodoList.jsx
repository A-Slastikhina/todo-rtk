import { useDispatch,useSelector } from "react-redux";
import {  selectTodoList, selectTodos } from "./todos-selector";
import {  deleteTodo, loadTodos,  toggleTodo  } from "./todo-slice";
import { Droppable,Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import styled from "styled-components";

export const StyledTodoList = styled.ul`
width:70%;
padding: 10px;
margin:0 auto;
`
export const TododListItem = styled.li`
display: flex;

justify-content: space-between;
background-image: transparent;
font-family: 'Balsamiq Sans';
font-weight: 400;
color: white;
font-size: 20px;
text-shadow: 1px 1px 1px #255d42;

&: hover{
  text-shadow: 1px 1px 1px #8adfef;
}
`;

export const TodoList = (startListId)=>{
    const dispatch = useDispatch();
    const todos = useSelector(selectTodos);
    const todoList = useSelector(selectTodoList);
   const [todoid, setTodoId]= useState('');
   const [listStart, setListStart] = useState('')

    useEffect(()=>{
     dispatch(loadTodos());
      
    },[dispatch])
    useEffect(()=>{
       
    }, [todos])
    // const handleDeleteTodo = (id, listid)=>{
    
    //   dispatch(deleteTodo(id, listid))
    // }
    return(
        <Droppable droppableId={String(todoList.listID)} >
        {(provided)=>(
          
            <StyledTodoList {...provided.droppableProps}  ref={provided.innerRef} className="collection todo-list" >
            {todos.map((todo, index)=>{
               
                return (<Draggable draggableId={String(todo.id)} index={index} key={todo.id} >
                        {provided=>(
                           
                            <TododListItem key={todo.id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            {todo.text} 
                             <div>
                             <i className="small material-icons todo-icon--completed" data-title='отметить как выполненное' onClick={()=>{dispatch(toggleTodo(todo.id))}}>done</i>
                             <i className="small material-icons todo-icon--delete" data-title='удалить' 
                             onClick={()=>{dispatch(deleteTodo({id:todo.id, listName:todoList.listName}))
                            }
                             }>delete</i>
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