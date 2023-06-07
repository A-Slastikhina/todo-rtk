import axios from "axios";
import { configureStore} from "@reduxjs/toolkit";
import * as api from './config';
import { catsFactsReducer } from "./Feachures/Cat-facts/cat-facts-slice";
import { dogsImgReducer } from "./Feachures/Dogs-img/dogs-img-slice";
import { userNameReducer } from "./Feachures/User-name/user-name-slice";
import { todoReducer } from "./Feachures/Todos/todo-slice";

export const store = configureStore({
    reducer:{
        catFact: catsFactsReducer,
        dogImg: dogsImgReducer,
        userName: userNameReducer,
        todo: todoReducer
    },
    devTools:true,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        
        serializableCheck: false,
        thunk:{
            extraArgument:{
                client:axios,
                api
            }
        }
    })
})