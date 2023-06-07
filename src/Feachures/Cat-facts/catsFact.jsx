import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCatFacts } from "./cat-facts-slice";
import { selectCatFacts } from "./cat-facts-selectors";

export const CatsFacts = ()=>{
    const dispatch = useDispatch();
    const catFact = useSelector(selectCatFacts)
    useEffect(()=>{
        dispatch(loadCatFacts())
    },[dispatch])
    return (
        <div className="infopannel__cats">{catFact}</div>
    )
}