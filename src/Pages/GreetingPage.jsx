import { Title } from "../Components/StyledTitle"
import { CatsFacts } from "../Feachures/Cat-facts/catsFact"
import { DogImg } from "../Feachures/Dogs-img/DogsImg"
import { EnterUserName } from "../Feachures/User-name/EnterUserName"



export const GreetingPage = ()=>{
    return(
    <>
    <div className="welcome-section">
        <div className="welcome-section__wrapper">
            <div className="infopannel">
            <CatsFacts/>
            <DogImg/>
            </div>
            <Title>
            Привет, любитель планирования!
            </Title>

           <EnterUserName/>
            <img className="welcome-section__image js_welcome-img" src="img/greeting-paimon.png" alt=""/>

        </div>
    
    </div>
    </>
    
    )
}