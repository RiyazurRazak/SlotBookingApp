import React from 'react'
import "./StudentLogin.css"
import { Helmet } from 'react-helmet'

//ui
import { motion } from "framer-motion"

//components
import Navbar from '../NavBar'

//illustration
import authenticationIllustration from "../../assets/authention.svg"
import Footer from '../Footer'



const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.4,
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

function StudentsLogin() {

   
    return (
        <>
         <Helmet>
                <title>Login</title>
         </Helmet>

        <Navbar />
        <div className="student__login">
             <motion.div  variants={container} initial="hidden" animate="visible">
                 <motion.div className="studentlogin__container"  variants={item}> 
                   <img className="studentlogin__illustration" src={authenticationIllustration}></img>
                   <h3>Login</h3>
                   <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.8 }}>
                    <a href="/api/studentlogin"><button className="studentlogin__btn">Login Now</button></a>
                   </motion.div>
                 </motion.div>
            </motion.div>

            <Footer />

        </div>
        </>
    )
}

export default StudentsLogin
