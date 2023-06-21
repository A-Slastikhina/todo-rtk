import { NewTodo } from '../Feachures/Todos/NewTodo';
import { TodoList } from '../Feachures/Todos/TodoList';
import {
  selectIsNameEntered,
  selectUserName,
} from '../Feachures/User-name/user-name-selectors';
import { GreetingPage } from './GreetingPage';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { moveTodo, refreshTodoList, refreshTodoList2} from '../Feachures/Todos/todo-slice';
import { UrgentTodoList } from '../Feachures/Todos/UrgentTodoList';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SmallTitle, Title } from '../Components/StyledTitle';
import { selectMoveInfo } from '../Feachures/Todos/todos-selector';

const Wrapper = styled.div`
width:100%;
min-height:100vh;
padding:2rem;
background-image:url('img/bckg.jpeg');
bacground-position:center;
background-size: cover;
`
export const HomePage = () => {

  const dispatch = useDispatch();
  const isNameEntered = useSelector(selectIsNameEntered);
  const name = useSelector(selectUserName);
  const moveInfo = useSelector(selectMoveInfo)
  // const [startListId,setStartListId] = useState('') ;
  // const [endListId,setEndtListId] = useState('') ; 
  // const [todoIndexEnd,setTodoIndexEnd ] = useState('');
  // const [todoId,seTtodoId ] = useState('');
  const {todoId,startListName,endListName, todoText}= moveInfo

  const onDragEnd = (result) => {
    const {destination, source, draggableID} = result;
    // console.log(destination);
    // console.log(source)

    if(!destination){
      return;
    }
    dispatch(moveTodo(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableID,
     
    ));
  };


  useEffect(()=>{
        
    if( endListName!==startListName){
      setTimeout(()=>{
        dispatch(refreshTodoList2({id:todoId, listName:endListName, text:todoText}))
        dispatch(refreshTodoList({id:todoId, listName:startListName} ))
      },0)
    }
  },[endListName,todoId,startListName])

  return (
    <>
   <Wrapper>
   <DragDropContext onDragEnd={onDragEnd} >
        <div className="maborderStylesin">
          {!isNameEntered && <GreetingPage/>}
          {isNameEntered && (
            <div>
              <Title>
                {name==='' ? 'Hello, Traveler!' : `Hello, ${name}`}
                 
              </Title> 
              <NewTodo />
              <SmallTitle>Общий список дел</SmallTitle>
              <TodoList />
              <SmallTitle>Срочные дела</SmallTitle>
              <UrgentTodoList/>
            </div>
          )}

        </div>
      </DragDropContext>
   </Wrapper>
    </>
  );
};
