import React from 'react'
import './BookingInnerList.css'

//ui
import { motion } from "framer-motion"


function BookingInnerList({slot, key, cb}) {

   const bookingHandller = () =>{
        cb(slot.slotnum)
   }

    return (
        <li key={key} className={`bookinginnerlist__container ${slot.isbooked && 'bookinginnerlist-booked'}`}>
            <p className="booklist__center">Slot {slot.slotnum}</p>
            <p className="booklist__center">{slot.sheduledate}</p>
            {slot.isbooked ? <p className="booklist__center booklist__bookedby">Booked By: {slot.bookedby}</p> :
            <p className="booklist__center">Expected StartTime: {slot.starttime}</p>
            }
            <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.8 }} className="booklist__center">
                <button className={`bookinginnerlist__btns ${slot.isbooked && 'bookinglistinner-btn-booked'}`} onClick={bookingHandller}>Book Your Slot Now</button>
            </motion.div>
        </li>
    )
}

export default BookingInnerList
