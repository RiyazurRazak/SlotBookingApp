import "@babel/polyfill"
import express from "express"
import http from 'http'
import bodyParser from "body-parser"
import React from "react"
import ReactDOMServer from 'react-dom/server'
import {StaticRouter} from "react-router"
import {Helmet} from 'react-helmet'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import reducer from './src/reducers/index.js'



//frontend src file
import App from './src/App'

//backend
import env from 'dotenv'
import passport from 'passport'
import session from 'cookie-session'
import cookieparser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'



//router
import routers from './routes/router'
import slotSchema from './models/Slot'


//config

const app = express()
const PORT = process.env.PORT || 9000
const  HOST = process.env.YOUR_HOST || '0.0.0.0'
const server = http.createServer(app)
const io = require('socket.io')(server)


//middleware


app.use(express.static('build/public'))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  name: 'session',
  keys: ['key1', 'key2']
  }));
  app.use(cookieparser())
app.use(passport.initialize());
app.use(passport.session());



mongoose.connect(process.env.MONGO_SERVER , {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology:true});

mongoose.connection.once("open" , ()=>{
    console.log(" WOW!!! db has successfully connected")
})

//other api routers

app.use('/api', routers)


//ws

io.on('connection', (socket)=>{
    console.log("a user connected")

    socket.on("booking", data=>{
        
        const bookerName = data.bookedBy
        const collection = data.collectionName
        const slotId = data.slotId
        const reqBookingCollection = mongoose.model( collection , slotSchema, collection)
        reqBookingCollection.find({bookedby: bookerName}, (err, docs)=>{
          if(docs.length > 0){
            socket.emit("response", {isAlreadyBooked: true})
         }
         else{
          reqBookingCollection.updateOne({slotnum: slotId}, {
          bookedby:bookerName,
          isbooked: true,
           }, (err, docs)=>{
           if(err) console.log(err)
           reqBookingCollection.find({}, (err, docs)=>{
             io.emit("response", docs)
          })
        })
       }
  })
    })





    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
})

//default router


const store = createStore(reducer)

app.get('/*' , (req, res)=>{
    const context = {}
    const content = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
           <Provider store={store}>
            <App />
            </Provider>
        </StaticRouter>
    )

const helmet = Helmet.renderStatic()

    
const html = `<!doctype html>    
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="theme-color" content="#000000" />
${helmet.title.toString()}
${helmet.meta.toString()}
<link rel="stylesheet" href="/client_bundle.css"></link>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.5.9/dist/css/uikit.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.5.9/dist/js/uikit.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.5.9/dist/js/uikit-icons.min.js"></script>
  </head>
   <body>
     <div id="root">${content}</div>
     ${helmet.script.toString()}
     <script src="/client_bundle.js"> </script>
    </body>  
    </html>`

    res.send(html)

})


server.listen(PORT ,HOST, ()=>{
    console.log(`server runing in ${PORT}`)
})