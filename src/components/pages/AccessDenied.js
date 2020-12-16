import React from 'react'
import './NotFound.css'
import { Helmet } from 'react-helmet'

import acessdenied from '../../assets/access__denied.svg'

function AccessDenied() {
    return (
        <div className="notfound__illustration">
          <Helmet>
            <title>Acess Debied | Dept of ECE</title>
          </Helmet>
          <img  src={acessdenied} ></img>
          <p>Access Denied You Are Not Allowed To Access. Please Contact The required Faculty</p>
        </div>
    )
}

export default AccessDenied
