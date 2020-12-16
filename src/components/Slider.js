import React, { useEffect, useState } from 'react'
import './Slider.css'
import Axios from 'axios'

//ui



function Slider() {

    const [announcements , setAnnouncements] = useState([])

    useEffect(()=>{
        Axios.get("/api/announcements").then((res)=> setAnnouncements(res.data))
    },[])
    return (
        <div className="slider__container">
           <div className="uk-position-relative uk-visible-toggle uk-light" tabIndex="-1" data-uk-slider="center: true; autoplay: true;">
              <ul className="uk-slider-items uk-child-width-1-2@s uk-grid">

                  {announcements.map((announcement , index)=>{
                      return(
                        <li key={index}>
                        <div className="uk-card uk-card-default">
                           <div className="uk-card-media-top">
                               <img className="slider__image" src={announcement.imageurl} alt=""></img>
                           </div>
                           <div className="uk-card-body slider__li">
                             <h3>{announcement.title}</h3>
                             <p>{announcement.desc}</p>
                           </div>
                          </div>
                        </li>
                      )
                  })}
               </ul>
               <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
            </div>
        </div>
    )
}

export default Slider
