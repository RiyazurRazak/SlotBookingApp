import React, { useEffect, useState } from 'react'
import {Redirect, Route} from 'react-router-dom';


//ui

import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Axios from 'axios';



function ProtectedRouter({component: Component, authed,  ...rest}) {

    const [isLoaded , setIsLoaded] = useState(false)
    const [auth , setIsAuth] = useState(false)
    const [backdrop , setBackdrop] = useState(true)

    useEffect(()=>{
        fetchUser()          
    },[])
  
    const fetchUser = async ()=>{
        await  Axios.get("/api/loggedin").then((res)=>{
           if(res.data.given_name){
             setIsAuth(true)
           }else{
               setIsAuth(false)
           }
        })
        setIsLoaded(true)
        setBackdrop(false)
      }
       
    return (
       <>{
           isLoaded?
       <Route 
       {...rest}
       render={(props) => auth ?  <Component {...props}  />  : 
       <Redirect to ={{pathname : '/login' , state:{from:props.location}}} /> } /> 
       : 
       <Backdrop className="backdrop" open={backdrop}>
          <CircularProgress color="inherit" />
       </Backdrop>
       }
       </>
    )

  
}

export default ProtectedRouter
