import styled from "styled-components";


export const StyledInputText = styled.input.attrs(props=>({
    type:"text",
}))`
background-color:hsla(183, 63%, 85%, 0.5);
border:none;
font-family: 'Balsamiq Sans';
font-weight: 400;
color:#255d42;
width: 50%;
font-size: 17px;
line-height: 34px;
outline: none;
border-bottom: 2px solid #255d42;
padding-left:10px;


    &::placeholder{
        font-family: 'Balsamiq Sans';
        font-weight: 400;
        font-size: 17px;
        color: hsla(151, 43%, 25%, 0.5);

    };
    &:focus{
        font-family: 'Balsamiq Sans';
        font-weight: 400;
        color: #255d42; 
        transition: all 3s;
        background-color:hsla(183, 63%, 85%, 1);
    };

    &:active{
        font-family: 'Balsamiq Sans';
        font-weight: 400;  
        background-color:hsla(183, 63%, 85%, 1);

    }
`

export const StyledInputSubmit = styled.input.attrs({
    type:'submit'
})`
display:block;
margin: 0 auto;
background-color:hsla(183, 63%, 85%, 0.5);
border:none;
font-family: 'Balsamiq Sans';
font-weight: 400;
color:#255d42;
font-size: 17px;
line-height: 34px;
outline: none;
border: 1px solid #255d42;
width: 150px;
margin-top: 35px;
border-radius: 25px;
cursor: pointer;    

&:hover{
    background-color:hsla(183, 63%, 85%, 1);
    transition: all 1s;
}
`
