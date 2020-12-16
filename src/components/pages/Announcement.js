import React from 'react'
import './Announcement.css'
import {Link} from 'react-router-dom'
import { Helmet } from 'react-helmet'

//ui
import { motion } from "framer-motion"

//components
import Navbar from '../NavBar'
import Slider from '../Slider'
import Footer from '../Footer'

//illustrations
import anoouncementIllustration from '../../assets/announcement-1.svg'
import preparationIllustration from '../../assets/anouncement_preparation-2.svg'
import conferrenceIllutions from '../../assets/anouncement_conference-3.svg'
import marshmelooIllustration from '../../assets/soon.svg'



const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

function Announcement() {
    return (
        <div>

            <Helmet>
              <title>Anouncements</title>
            </Helmet>
            <Navbar />

            <div className="announcement__illustration__container">
            <img className="announcement__illustration" src={anoouncementIllustration}></img>
            <h3>Are You Ready For The Biggest Event</h3>
            </div>
            
            <motion.div className="home__announcement_container" variants={container} initial="hidden" animate="visible">
                 <motion.div variants={item}> 
                      <Slider />
                 </motion.div>
            </motion.div>

            <div className="announcement__illustration__container">
            <img className="announcement__illustration" src={preparationIllustration}></img>
            <h3>Are You Prepared!! Check And Book Your Slot Now!!</h3>
            <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.8 }}>
                <Link to="/booking"><button className="announcement__btns">Book Your Slot Now</button></Link> 
            </motion.div>
            </div>

            <div className="announcement__illustration__container">
            <img className="announcement__illustration" src={conferrenceIllutions}></img>
            <h3>More And More Option Are In Devoloping Stage </h3>
            <motion.div className="home__announcement_container" variants={container} initial="hidden" animate="visible">
                 <motion.div variants={item}> 
                    <img className="announcement__illustration" src={marshmelooIllustration}></img> 
                    <p>See You Soon</p>
                </motion.div>
            </motion.div>

            </div>

            <Footer />
            
        </div>
    )
}

export default Announcement
