import React,{useEffect, useState} from 'react'
import './BookingList.css'
import Axios from 'axios'

import {useSelector}from 'react-redux'
import {socket} from './pages/Booking'

//ui
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

//components
import BookingInnerList from './BookingInnerList'





function BookingList({title , key}) {

    const [isLoading , setIsLoading] = useState(false)
    const [slots , setSlots] = useState([])
    const [alreadyBooked , setAlreadyBooked] = useState(false)
    const [isEmmit, setIsEmmit] = useState(false)
    const loggedUser = useSelector(state => state['userReducer'])

    const loadSlotsHandller = async()=>{
        setIsLoading(true)
        await Axios.post("/api/getrequiredslots" , {requiredCollection : title}).then((res) =>{
            setSlots(res.data)
            setIsLoading(false)
        })
    }
        
    useEffect(()=>{
        if(isEmmit){
            console.log("res")
           socket.on("response",data=>{
            if(data.isAlreadyBooked){
              setAlreadyBooked(true) 
              setIsEmmit(false)
            }else{
             setSlots(data)
             setIsLoading(false)
             setIsEmmit(false)
            }
        })
    }
    },[isEmmit])

     
 

    const slotDetails = (slotId)=>{
        socket.emit("booking", {
            collectionName:title,
            slotId: slotId,
            bookedBy: loggedUser.name
        })
        setIsEmmit(true)
    }


    return (
      <div>
            <Accordion key={key} onChange={(events , expanded)=> expanded && loadSlotsHandller()}>
                 <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                     <p className="booklist__center booklist__title">{title.replace("slotbooking" , "")}</p>
                 </AccordionSummary>
                 <AccordionDetails className="accortation__details">
                      <Backdrop className="backdrop" open={isLoading}>
                         <CircularProgress color="inherit" />
                      </Backdrop>
                      <ul>
                          {slots.map((slot , index)=>{
                              return(
                                <BookingInnerList
                                key={index}
                                slot={slot}
                                cb={slotDetails}
                                 />
                              )
                          })}
                      </ul>
                 </AccordionDetails>
            </Accordion>
              
            <Dialog open={alreadyBooked}  aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
               <DialogTitle id="alert-dialog-title">{"You Are Alreay Selected One Time Slot"}</DialogTitle>
               <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                     You Are Already Selected One Time Slot. Try Anothe Day.
                  </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                     <Button onClick={()=> setAlreadyBooked(false)} color="primary">Close</Button>
                  </DialogActions>
             </Dialog>
            </div>
    )
}

export default BookingList
