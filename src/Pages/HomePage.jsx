import { NewTodo } from '../Feachures/Todos/NewTodo';
import { TodoList } from '../Feachures/Todos/TodoList';
import {
  selectIsNameEntered,
  selectUserName,
} from '../Feachures/User-name/user-name-selectors';
import { GreetingPage } from './GreetingPage';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { moveTodo } from '../Feachures/Todos/todo-slice';
import { UrgentTodoList } from '../Feachures/Todos/UrgentTodoList';

import styled from 'styled-components';
import { SmallTitle, Title } from '../Components/StyledTitle';
import { DogImg } from '../Feachures/Dogs-img/DogsImg';

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
  const borderStyles = {
    border: '1px solid rgba(0, 0, 0, 0.05)',
  };
  const onDragEnd = (result) => {
    
    const {destination, source, draggableID} = result;
    if(!destination){
      return;
    }
    dispatch(moveTodo(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableID
    ))
  };
  return (
    <>
   <Wrapper>
   <DragDropContext onDragEnd={onDragEnd}>
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
