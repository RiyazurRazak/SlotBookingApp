import React, {useState, useEffect} from 'react'
import "./Booking.css"
import { Helmet } from 'react-helmet'


//ui
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

//components
import Navbar from '../NavBar'
import BookingList from '../BookingList'
import Footer from '../Footer'
import Axios from 'axios'


function Booking() {

    const [list, setList] = useState([])
    const [isLoading , setIsLoading] =useState(true)

    useEffect(()=>{
      fetchBookingList()
    },[])
    
    const fetchBookingList = async ()=>{
            setIsLoading(true)
          await Axios.get("/api/getbookinglist").then((res)=> {
            setList(res.data)
            setIsLoading(false)
         })
    }
    return (
        <div>
            <Helmet>
                <title>Slot Booking</title>
            </Helmet>
            <Backdrop className="backdrop" open={isLoading}>
              <CircularProgress color="inherit" />
            </Backdrop>

            <Navbar />

            <div className="booking__table">
                {list.map((singleList, index)=>{
                    return(
                        <BookingList
                        key={index}
                        title={singleList}
                        />
                    )
                })}
            </div>

            <Footer />

           
            
        </div>
    )
}

export default Booking
