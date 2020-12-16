import React from 'react'
import "./Footer.css"

function Footer() {
    const date = new Date()
    return (
        <div className="footer">
        <div className="footer__1">
            <p>© {date.getFullYear()} - {date.getFullYear()+1}</p>
        </div>
        <div className="footer__2">
            <p>Designed and Developed By Riyazur Razak</p>
        </div>
        </div>
    )
}

export default Footer
