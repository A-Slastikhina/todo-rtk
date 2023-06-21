export const BASE_URL_CATS = 'https://catfact.ninja/fact';
export const BASE_URL_DOGS =
  'https://api.unsplash.com/photos/random/?client_id=4SPbm_IsLj1WjWwccAE_p2hoVK5ZeBQTqsnv3TKpoNs';
// export const URL_DOGS = 'https://api.unsplash.com/photos/random/?client_id=4SPbm_IsLj1WjWwccAE_p2hoVK5ZeBQTqsnv3TKpoNs&collections=1289401&topics=dogs&orientation=landscape'

export const getDogsImgs = (collections, topics,orientation)=>{
 return BASE_URL_DOGS + '&collections=' + collections + '&topics='+ topics + '&orientation='+ orientation
  }
  
 const BASE_TODO_URL = 'http://localhost:3001/todoList/';
const URGENT_TODO_URL = 'http://localhost:3001/urgentList/'
 export const loadTodos = async ()=>{
  try { 
    const res = await fetch(BASE_TODO_URL)
    const data = await res.json();
    return data
  } catch (error) {
    console.log(error)
  }
};

export const loadUrgentTodos = async ()=>{

  const res = await fetch(URGENT_TODO_URL)
  const data = await res.json();

  return data
};
export const createTodo = async (text)=>{
 
    const res = await fetch('http://localhost:3001/todoList/',{
        method:'POST',
        headers:{
         'Content-Type': 'application/json'
        },
        body: JSON.stringify({text, completed: false}),
       })
   
       const data = await res.json();
       return data;
};

export const toggleTodo = async ( id, fields)=>{
  const res = await fetch(BASE_TODO_URL + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(fields)
  })
  const data = await res.json();
  return data;
};

export const deleteTodo = async({id, listName}) =>{
  const res = await fetch(`http://localhost:3001/${listName}/` + id,{
    method: 'DELETE',
    headers:{
      'Content-Type': 'application/json'
    }
  })
  await res.json();

  return {id, listName} ;
}

export const refreshTodoList = async({id, listName})=>{
 try {
  const res = await fetch(`http://localhost:3001/${listName}/${id}`,{
    method: 'DELETE',
    headers:{
      'Content-Type': 'application/json'
    }
  })
  if (!res.ok) throw new Error(res.statusText)
  await res.json();
  // return {id, listName};
 } catch (error) {
  console.log(error)
 }
}
export const refreshTodoList2 = async({id, listName, text})=>{
 try {
  const res = await fetch(`http://localhost:3001/${listName}/`,{
    method:'POST',
    headers:{
     'Content-Type': 'application/json'
    },
    body: JSON.stringify({text, completed: false, id}),
    
   })
   if (!res.ok) throw new Error(res.statusText)
   const data = await res.json();

  return {id, listName, data} ;
 } catch (error) {
    console.log(error)
 }
}

