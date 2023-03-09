const InitValues = {
    name : undefined,
    passward : undefined,
   
}
export const ChangeState =   (state=InitValues,action )=>{


  if(action.type === "Login"){

  
     
        return { name : state.name =  action.username  }
       
 
    
  }else{
      return{

          name : state.name,
          passward : state.passward ,
      
      }
  }
    

} 