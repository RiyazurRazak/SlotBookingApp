import React,{useState}  from 'react'
import './CreateAnnouncement.css'
import { Helmet } from 'react-helmet'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'


//redux
import {useSelector}from 'react-redux'

//ui
import TextField from '@material-ui/core/TextField'
import { motion } from "framer-motion"
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

//illustration
import newEntriesIllustration from '../assets/new-entries.svg'


function CreateAnnouncement() {

    const [title , setTitle] = useState("")
    const [desc , setDesc] = useState("")
    const [url , setUrl]=useState(null)
    const [uploading , setUploading] = useState(false)
    const [isCreated , setIsCreated] = useState(false)

    const user = useSelector(state => state['userReducer'])

    const postAnnouncementHandller = async() =>{

        setUploading(true)

        await Axios.post("/api/newannouncement" , {
            title: title,
            desc : desc,
            url : url,
            by: user.name,
        }).then((res)=> {
            setUploading(false)
            setIsCreated(true)
        })
    }

    return (
        <div>
          <Helmet>
              <title>Create Anouncements - Dashboard</title>
          </Helmet>
          <Backdrop className="backdrop" open={uploading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <div className="createslot__illustration__container">
             <img className="createslot__illustration" src={newEntriesIllustration}></img>
          </div>
          <div className="createannouncements__div">
          <TextField  label="Title"  required placeholder="Enter Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="createannouncements__div">
          <TextField  label="Description"  required placeholder="Enter Description" fullWidth multiline rowsMax={7} value={desc} onChange={(e) => setDesc(e.target.value)} />  
          </div>
          <div className="createannouncements__div">
          <TextField  label="URL For Image"  required placeholder="Enter URL For Feature Image" fullWidth value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>

          <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.9}}>
            <button onClick={postAnnouncementHandller} className="createslots__btns center_btn">Post Announcement</button>
         </motion.div>  
         { isCreated && <Redirect to={"/"} />}
        </div>
    )
}

export default CreateAnnouncement
