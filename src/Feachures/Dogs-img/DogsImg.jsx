import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDogImg } from "./dogs-img-selectors";
import { loadDogsImg } from "./dogs-img-slice";
import styled from "styled-components";

const ImgContainer = styled.img`
border-radius:45px;
margin-top:35px;
border: 2px solid #c1eff1;
`

export const DogImg = ()=>{
    const dispatch= useDispatch();
    const url = useSelector(selectDogImg);
    useEffect(()=>{
        dispatch(loadDogsImg({collections:'1289401',topics:'dogs',orientation:'landscape'}))
    },[dispatch])
    return(
        <ImgContainer className="infopannel__img" src={url} alt="" width="400" height="300"/>
    )
}

