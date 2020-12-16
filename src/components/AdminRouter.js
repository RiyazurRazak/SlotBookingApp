import React, { useEffect, useState } from 'react'
import {Redirect, Route} from 'react-router-dom';


//ui

import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Axios from 'axios';



function AdminRouter({component: Component, authed, required,  ...rest}) {

    const adminMembers = ["riyaz@example.com"] //adminmail ids for access dashboard
    const [isLoaded , setIsLoaded] = useState(false)
    const [adminAuth , setAdminAuth] = useState(false)
    const [backdrop , setBackdrop] = useState(true)

    useEffect(()=>{
        fetchAdmin()
    },[])
  
 
     const fetchAdmin = async ()=>{
        await  Axios.get("/api/loggedin").then((res)=>{
           adminMembers.map((admin)=>{
               if(admin === res.data.email){
                   return setAdminAuth(true)
               }
           })
        })
        setIsLoaded(true)
        setBackdrop(false)
      }
       
    return (
       <>{
           isLoaded?
       <Route 
       {...rest}
       render={(props) => adminAuth ?  <Component {...props}  />  : 
       <Redirect to ={{pathname : '/login' , state:{from:props.location}}} /> } /> 
       : 
       <Backdrop className="backdrop" open={backdrop}>
          <CircularProgress color="inherit" />
       </Backdrop>
       }
       </>
    )

  
}

export default AdminRouter
