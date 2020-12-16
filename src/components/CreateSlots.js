import React,{useState} from 'react'
import './CreateSlots.css'
import { Helmet } from 'react-helmet'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'


//date-fns
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {MuiPickersUtilsProvider,KeyboardTimePicker,KeyboardDatePicker} from '@material-ui/pickers'

//redux
import {useSelector}from 'react-redux'

//ui
import TextField from '@material-ui/core/TextField'
import { motion } from "framer-motion"
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'


//illustration
import createIllustration from '../../src/assets/create-slot.svg'




function CreateSlots() {

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [slotDuration , setSlotDuration] = useState(10)
    const [upload , setUpload] =useState(false)
    const [title , setTitle] = useState(null)
    const [slotCreated , setSlotCreated] =useState(false)

    const user = useSelector(state => state['userReducer'])


    const createSlotsHandller = async() =>{
       setUpload(true)
       await Axios.post("/api/createnewslots" , 
       {
            collectionName: title,
            sheduleDate : selectedDate.toLocaleDateString(),
            startingTime: startTime.toTimeString(),
            endingTime: endTime.toTimeString(),
            singleSlotTime : slotDuration,
            createdby: user.name,

        }).then((res)=>{
            setUpload(false)
            setSlotCreated(true)
        })
    }



    return (
        <div>
          <Helmet>
              <title>Create Slots - Dashboard</title>
          </Helmet>
          <Backdrop className="backdrop" open={upload}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <div className="createslot__illustration__container">
             <img className="createslot__illustration" src={createIllustration}></img>
          </div>
          <div className="createslot__textfield">
              <TextField  label="Title"  required placeholder="Enter Title for Reference purpose" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>  
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
           <div>
            <p className="createslot__title">Configure The Date And Time To Create Slots</p>
             <KeyboardDatePicker
             disableToolbar
             ampm={false} 
             variant="inline"
             format="dd/MM/yyyy"
             margin="normal"
             label="Select The Date"
             value={selectedDate}
             onChange={(date)=> setSelectedDate(date)}
             KeyboardButtonProps={{
             'aria-label': 'change date',
             }}
            />
          </div> 
          <div className="createslot__timepicker">
             <KeyboardTimePicker
             margin="dense"
             label="Starting Time"
             value={startTime}
             onChange={(time) => setStartTime(time)}
             KeyboardButtonProps={{
              'aria-label': 'change time',
             }}
            />

            <KeyboardTimePicker
             margin="dense"
             id="endpicker"
             label="Ending Time"
             value={endTime}
             onChange={(time) => setEndTime(time)}
             KeyboardButtonProps={{
              'aria-label': 'change time',
             }}
            />
          </div>
        </MuiPickersUtilsProvider>
        <div className="createslot__textfield">
        <TextField  label="Slot Duration (min)"  required placeholder="Set Duration for each Slot (min)" fullWidth value={slotDuration} onChange={(e) => setSlotDuration(e.target.value)} />
        </div>  
        <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.9}}>
            <button onClick={createSlotsHandller} className="createslots__btns">Create Slots</button>
         </motion.div>  

         { slotCreated && <Redirect to={"/booking"} />}
        </div>
    )
}

export default CreateSlots
