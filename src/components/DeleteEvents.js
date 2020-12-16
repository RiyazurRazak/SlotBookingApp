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

function DeleteEvents() {

    const [events , setEvents] = useState([])
    const [isLoading , setIsLoading] = useState(false)

    useEffect(()=>{
        loadTotalSlotsHandller()
    },[])

    const loadTotalSlotsHandller = async()=>{
        setIsLoading(true)
       await Axios.get("/api/getbookinglist").then((res)=> {
            setEvents(res.data)
            setIsLoading(false)
         })
    }

    const deleteEventHandller = async (collectionName)=>{
        setIsLoading(true)
        await Axios.delete(`/api/deleteevent/${collectionName}`).then((res) =>{
          loadTotalSlotsHandller()
        }) 
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
                {events.map((event)=>{
                    return(
                      <ListItem className="deleteevents__list__container">
                        <ListItemText
                          primary={event.replace("slotbooking", "")}
                          secondary={'Delete this and all its slots from the database. Event is overed Action Can not be rewind!!'}
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="delete" onClick={()=> deleteEventHandller(event)}>
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

export default DeleteEvents
