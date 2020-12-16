import React, { useState , useEffect } from 'react';
import './NavBar.css'
import {Link} from 'react-router-dom'
import { useDispatch }from 'react-redux'



//actions

import {user} from '../actions/index'
//ui- components
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

//icons
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Axios from 'axios';



const Navbar =() =>{
  
    const adminMembers = ["riyaz@example.com"] //adminmail ids for access dashboard
    const [open , setOpen]=useState(false)
    const [Listopen, setListOpen]=useState(false)
    const [isUserOpen , setIsUserOpen]=useState(false)
    const [userName , setUserName]= useState("UserName")
    const [userAvatar , setUserAvatar]= useState("https://www.seekpng.com/png/full/402-4022635_avatar-generic-person-icon.png")
    const [role , setRole] = useState("Login Now")
    const [admin, setIsAdmin] = useState(null)
    const dispatch = useDispatch()


     useEffect(()=>{
        fetchUser()
    },[])

    const fetchUser = async ()=>{

      await  Axios.get("/api/loggedin").then((res)=>{
        if(res.data.given_name){
           setUserAvatar(res.data.picture) 
           setUserName(res.data.given_name)
           dispatch(user(res.data))
           adminMembers.map((member , index)=>{
              if(res.data.email == member){
                setRole("Admin")
                setIsAdmin(true)
              }
           })
          !admin && setRole("User")
       }
      })
    }



    const drawerList =[{text: "Announcement", slug: "/", ico: RecordVoiceOverIcon},{text: "Booking", slug: "/booking", ico: ConfirmationNumberIcon},
    {text: "Login", slug:"/login" ,ico: LockOpenIcon} ] 

    const toggleOpen = () => setIsUserOpen(!isUserOpen)

    return(
    <>

           <div className="uk-position-relative">
            <div className="uk-position-top">
              <nav className="uk-navbar-container uk-navbar-transparent" data-uk-navbar>
                <div className="uk-navbar-left nav__menu nav__menu_icon" onClick={() => setOpen(true)}>
                <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.8 }}>
                   <MenuRoundedIcon color={"inherit"} fontSize={"inherit"}/>
                </motion.div>
                </div>
              </nav>
            </div>
           </div>

        <Drawer
           anchor={'left'}
           open={open}
           onClose={() =>setOpen(false)} 
        >
              <div className="nav__drawer">
                  {drawerList.map((list , index) =>{
                      return (
                    <List key={index}>
                      <Link to={list.slug} className="link">
                        <ListItem button>
                            <ListItemIcon>
                                <list.ico className="nav__drawer_icon"/>
                            </ListItemIcon>
                            <ListItemText className="nav__drawer_text"
                               primary={list.text}
                            />
                        </ListItem>
                        </Link>
                         <hr></hr>
                    </List>
                      )})}
                    <List>
                      <ListItem button onClick={() => setListOpen(!Listopen)}>
                          <ListItemIcon>
                              <AccountCircleIcon className="nav__drawer_icon" />
                          </ListItemIcon>
                        <ListItemText primary="Admin" />
                        {Listopen ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                    <Collapse in={Listopen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                      <Link to={"/dashboard"} className="link" >
                        <ListItem button className="nav-inner-list" >
                         <ListItemIcon>
                         <DashboardIcon className="nav__drawer_icon"/>
                        </ListItemIcon>
                         <ListItemText primary="Dashboard"  />
                         </ListItem>
                         </Link>
                        </List>
                        <List component="div" disablePadding>
                        </List>
                    </Collapse>
                    </List>
                    <hr></hr>
                    </div>
        </Drawer>
        <AnimateSharedLayout>
        <motion.div layout className="nav__user__container" onClick={toggleOpen}>
            <img className="nav__user__avatar" src={userAvatar} alt="avatar"></img>
            {isUserOpen &&
             <AnimatePresence>
                  <motion.div className="nav__user__inner-container" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p>{userName}</p>
                      <p>Role: {role}</p>
                      {userName =="UserName" ? 
                      <a href="/login">Login</a> :
                      <a href="/api/logout">LogOut</a>}
                  </motion.div>
            </AnimatePresence>}
        </motion.div>
        </AnimateSharedLayout>
        
           

 
    </>)}

export default Navbar;