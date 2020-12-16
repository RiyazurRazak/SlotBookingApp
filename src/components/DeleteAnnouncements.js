import React, { useEffect, useState } from 'react'
import './DeleteEvents.css'
import { Helmet } from 'react-helmet'
import Axios from 'axios'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

//icons
import DeleteIcon from '@material-ui/icons/Delete'
//illustration
import deleteIllustration from '../assets/delete__illustration.svg'

function DeleteAnnouncements() {

    const [announcements , setAnnouncements] = useState([])
    const [isLoading , setIsLoading] = useState(false)

    useEffect(()=>{
        loadTotalAnnouncementsHandller()
    },[])

    const loadTotalAnnouncementsHandller = async()=>{
        setIsLoading(true)
      await  Axios.get("/api/announcements").then((res)=> setAnnouncements(res.data))
            setIsLoading(false)
        
    }

    const deleteAnnouncementHandller = async (title)=>{
        setIsLoading(true)
        await Axios.delete(`/api/deleteannouncement/${title}`).then((res) => loadTotalAnnouncementsHandller())
    }
   
    return (
        <div>
          <Helmet>
              <title>Delete Slots - Dashboard</title>
          </Helmet>
          <Backdrop className="backdrop" open={isLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <div className="createslot__illustration__container">
             <img className="createslot__illustration" src={deleteIllustration}></img>
          </div>
            <List>
                {announcements.map((announcement)=>{
                    return(
                      <ListItem className="deleteevents__list__container">
                        <ListItemText
                          primary={announcement.title}
                          secondary={'Delete this and all its slots from the database. Event is overed Action Can not be rewind!!'}
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="delete" onClick={()=> deleteAnnouncementHandller(announcement.title)}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    )
                })}
            </List>
            
        </div>
    )
}

export default DeleteAnnouncements
