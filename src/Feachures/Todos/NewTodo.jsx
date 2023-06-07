import { useDispatch } from "react-redux";
import { createTodo } from "./todo-slice";
import { useState } from "react";

import styled from "styled-components";
import {StyledInputSubmit, StyledInputText } from "../../Components/StyledInput";
const NewTodoWrapper = styled.div`
width:70%;
margin: 0 auto;

`
export const NewTodo = (props)=>{
    const [text, setText] = useState('')
    const dispatch = useDispatch();
    const handleSubmit = (evt)=>{
        evt.preventDefault(evt);
      
        if(evt.target.title.value){
            dispatch(createTodo(text));

            evt.target.reset()
        }

    }
    const handleChange = (evt)=>{
        setText(evt.target.value)
    }

    return (
        <NewTodoWrapper>
            <form onSubmit={handleSubmit}>
            <StyledInputText name="title" placeholder="Мне нужно выполнить..." onChange={handleChange}/> 
            <StyledInputSubmit/> 
                
            </form>
        </NewTodoWrapper>
      
    )
}