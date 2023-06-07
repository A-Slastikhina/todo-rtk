import { useDispatch, useSelector } from 'react-redux';
import { setUserName, setIsNameEntered } from './user-name-slice';
import { selectUserName } from './user-name-selectors';
import { StyledInputSubmit, StyledInputText } from '../../Components/StyledInput';

export const EnterUserName = () => {
  const dispatch = useDispatch();
  const name = useSelector(selectUserName);
  const handleName = (evt) => {
    
    dispatch(setUserName(evt.target.value));
  };

  const handleFormSubmit = (evt)=>{
    evt.preventDefault();
    dispatch(setIsNameEntered(true))
  }
  return (
    <form className="welcome-section__name-form" onSubmit={handleFormSubmit}>
      
      <StyledInputText  
        placeholder="Введи свое имя"
        value={name}
        onChange={handleName}/>
      <StyledInputSubmit
        value='Это я!'
      >
      </StyledInputSubmit>
    </form>
  );
};
