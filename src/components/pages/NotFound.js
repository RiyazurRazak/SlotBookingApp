import React from 'react'
import './NotFound.css'
import { Helmet } from 'react-helmet'

import notFoundIllustration from '../../assets/notFound.svg'

function NotFound() {
    return (
        <div className="notfound__illustration">
            <Helmet>
              <title>404 Page Not Found</title>
            </Helmet>
            <img  src={notFoundIllustration} ></img>
            <p>404 Page Not Found</p>
        </div>
    )
}

export default NotFound
