import styled from "styled-components";

const StyledTitle = styled.h1`
font-family: 'Balsamiq Sans';
font-weight: 400;
font-size: 35px;
margin-top:35px;
margin-bottom:35px;
color: white;
text-shadow: 1px 1px 1px #255d42
`

const StyledSmallTitle = styled.h2`
font-size: 25px;
margin-top:35px;
margin-bottom:35px;
color: #c1eff1;
text-shadow: 1px 1px 3px #255d42
`
export const Title = ({children})=>{
    return <StyledTitle>
        {children}
    </StyledTitle>
}

export const SmallTitle = ({children})=>{
    return <StyledSmallTitle> {children}</StyledSmallTitle>
}