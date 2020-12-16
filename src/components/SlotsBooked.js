import React,{useState} from 'react';
import Axios from 'axios'
import './SlotsBooked.css'
import { Helmet } from 'react-helmet'

import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField'
import { motion } from "framer-motion"
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

const columns = [
  { field: 'slotnum', headerName: 'Slot Id', width: 130 },
  { field: 'bookedby', headerName: 'Booked By', width: 300 },
  { field: 'sheduledate', headerName: 'Shedule Date', width: 130 },
  { field: 'isbooked', headerName: 'Is Slot Booked', width: 130 },
];

  function SlotsBooked() {

    const [rows, setRows] = useState([])
    const [reqTitle , setReqTitle] = useState(null)
    const [upload , setUpload] =useState(false)

    
    const fetchHandller =  async() =>{
        setUpload(true)
        await Axios.post('/api/getslots', {title: reqTitle}).then((res) => {
            setRows(res.data)
            setUpload(false)
        })
    }
    
  return (
    <>  
    <Helmet>
      <title>Slots Table - Dashboard</title>
    </Helmet>
    <Backdrop className="backdrop" open={upload}>
        <CircularProgress color="inherit" />
    </Backdrop>
    <div className="slotbooked__container">
           <div>
              <TextField  label="Title"  required placeholder="Enter Title for Reference purpose" fullWidth value={reqTitle} onChange={(e) => setReqTitle(e.target.value)} />
           </div>  
          <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 1.1}}>
            <button onClick={fetchHandller} className="slotsbooking__btns">Fetch Data</button>
         </motion.div>  
      <DataGrid rows={rows} columns={columns} pageSize={6}  />
    </div>
    </>
  );
}

export default SlotsBooked