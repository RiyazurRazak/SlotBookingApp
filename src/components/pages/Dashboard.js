import React, { useState } from 'react'
import './Dashboard.css'
import { Helmet } from 'react-helmet'


import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

//icons
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder'
import AlarmOnIcon from '@material-ui/icons/AlarmOn'
import PostAddIcon from '@material-ui/icons/PostAdd'
import BackspaceIcon from '@material-ui/icons/Backspace';


import Navbar from '../NavBar';
import CreateSlots from '../CreateSlots';
import SlotsBooked from '../SlotsBooked';
import Footer from '../Footer';
import CreateAnnouncement from '../CreateAnnouncement';
import DeleteEvents from '../DeleteEvents';
import DeleteAnnouncements from '../DeleteAnnouncements'




function Dashboard() {

    const[selectedIndex , setSelectedIndex]=useState(null)

      
    return (

    <>
        <Helmet>
            <title>Dashboard</title>
        </Helmet>
        <Navbar />
        <div className="dashboard__container">
            
            <Grid container spacing={0}>
               <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                  <div className="dashboard__list">
                     <List>
                        <Link to={"/dashboard/createslots"} className="dashboard__link">
                        <ListItem button selected={selectedIndex === 0} onClick={() => setSelectedIndex(0)}>
                          <ListItemIcon>
                              <CreateNewFolderIcon className="dashboard__icon" />
                          </ListItemIcon>
                          <ListItemText primary="Create Slots" className="dashboard__text" />
                         </ListItem>
                        </Link>
                        <Divider className="dashboard__divider" />
                        <Link to={"/dashboard/studentsbooked"} className="dashboard__link">
                        <ListItem button selected={selectedIndex === 1} onClick={() => setSelectedIndex(1)}>
                          <ListItemIcon>
                             <AlarmOnIcon className="dashboard__icon" />
                          </ListItemIcon>
                          <ListItemText primary="Slots Booked" className="dashboard__text" />
                        </ListItem>
                        </Link>
                        <Divider className="dashboard__divider" />
                        <Link to={"/dashboard/announements"} className="dashboard__link">
                        <ListItem button selected={selectedIndex === 2} onClick={() => setSelectedIndex(2)}>
                          <ListItemIcon>
                             <PostAddIcon className="dashboard__icon" />
                          </ListItemIcon>
                          <ListItemText primary="Create Announcement" className="dashboard__text" />
                        </ListItem>
                        </Link>
                        <Divider className="dashboard__divider" />
                        <Link to={"/dashboard/delete-old-events"} className="dashboard__link">
                        <ListItem button selected={selectedIndex === 3} onClick={() => setSelectedIndex(3)}>
                          <ListItemIcon>
                             <BackspaceIcon className="dashboard__icon" />
                          </ListItemIcon>
                          <ListItemText primary="Delete Old Event" className="dashboard__text" />
                        </ListItem>
                        </Link>
                        <Divider className="dashboard__divider" />
                        <Link to={"/dashboard/delete-old-announcements"} className="dashboard__link">
                        <ListItem button selected={selectedIndex === 4} onClick={() => setSelectedIndex(4)}>
                          <ListItemIcon>
                             <BackspaceIcon className="dashboard__icon" />
                          </ListItemIcon>
                          <ListItemText primary="Delete Announcements" className="dashboard__text" />
                        </ListItem>
                        </Link>
                     </List>
                   </div>
               </Grid>
               <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                   <div className="dasboard-inner">
                  <Switch>
                      <Route path="/dashboard/createslots" component={CreateSlots} />
                      <Route path="/dashboard/studentsbooked" component={SlotsBooked} />
                      <Route path="/dashboard/announements" component={CreateAnnouncement} />
                      <Route path="/dashboard/delete-old-events" component={DeleteEvents} />
                      <Route path="/dashboard/delete-old-announcements" component={DeleteAnnouncements} />
                  </Switch>
                  </div>
               </Grid>
            </Grid>  
            <div className="dashboard__footer">  <Footer /></div>
          
        </div>
     </>
    )
}

export default Dashboard
