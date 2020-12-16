import express from 'express'
import passport from 'passport'
import '../auth/passport-config'
import mongoose from 'mongoose'


//models|| schemas//

import slotSchema from '../models/Slot'
import annoucementCollection from '../models/Announcement'


//helpers
import {slotCalc , addMinutes} from '../Helpers/helpers'


const router = express.Router()


router.get('/redirect', passport.authenticate('google', { failureRedirect: '/acessdenied' }),
  (req, res)=> {
       //implement your login logic as for client
      res.redirect("/")
    
  }
);

router.get('/studentlogin', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/loggedin', (req, res)=>{
  if(req.user){
    res.send(req.user._json)
  }else{
    res.send(false)
  }
})

router.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})



router.post("/createnewslots" , (req,res)=>{

  
  const collectionName = `${req.body.collectionName}slotbooking` || "newcollecto"
  const startTime = req.body.startingTime.substring(0, 5)
  const endTime = req.body.endingTime.substring(0, 5)
  const sheduleDate = req.body.sheduleDate
  const slot = req.body.singleSlotTime  
  const createBy = req.body.createdby

   const newCollection = mongoose.model(collectionName , slotSchema, collectionName)
   let slots = slotCalc(startTime, endTime, slot)

  for(let i =0; i<slots; i++){
       const Slots = new newCollection({
        facultyname: createBy,
        sheduledate: sheduleDate,
        starttime:addMinutes(startTime , (i*slot).toString()),
        endtime:endTime,
        createdate: new Date().toLocaleDateString(),
        bookedby: null,
        isbooked: false,
        id:i,
        slotnum: i,
       })
       Slots.save((err) =>{
         if(err) console.log(err)
       })
  }
   res.send("all saved")
  
})

router.post("/getslots" ,(req, res)=>{

  const collectionName = `${req.body.title}slotbooking`

  mongoose.connection.db.listCollections({name: collectionName}).toArray((err , reqCollection)=>{

    if(reqCollection.length != 0){
    const newCollection = mongoose.model( reqCollection[0].name , slotSchema, reqCollection[0].name)
          newCollection.find({} , (err, docs)=>{
             res.send(docs)
          })
    }
    else{
      res.send(reqCollection)
    }
     })

  })

  
router.get("/getbookinglist" , (req,res)=>{
   mongoose.connection.db.listCollections().toArray((err , names )=>{
    const collectionNames = names.map((collection)=>{
        return collection.name
     })
    const bookingCollection = collectionNames.filter((collection)=>{
       if(collection.includes("slotbooking")){
         return collection
       }
     })
     res.send(bookingCollection)
   
   })
})

router.post("/getrequiredslots" , (req,res)=>{

   const requestedCollection = req.body.requiredCollection
  
   const collection = mongoose.model( requestedCollection , slotSchema, requestedCollection)

   collection.find({}).sort({id:1}).exec((err, docs)=>{
     res.send(docs)
   })

})


router.patch("/booking" , (req,res)=>{
  const bookerName = req.body.bookedBy
  const collection = req.body.collectionName
  const slotId = req.body.slotId
  const reqBookingCollection = mongoose.model( collection , slotSchema, collection)
  reqBookingCollection.find({bookedby: bookerName}, (err, docs)=>{
       if(docs.length > 0){
         res.json({isAlreadyBooked :true})
       }
       else{
        reqBookingCollection.updateOne({slotnum: slotId}, {
          bookedby:bookerName,
          isbooked: true,
        }, (err, docs)=>{
          if(err) console.log(err)
          reqBookingCollection.find({id: slotId}, (err, docs)=>{
            res.send(docs)
          })
        })
       }
  })
 
})


router.post("/newannouncement" , (req,res)=>{

  const title = req.body.title
  const description = req.body.desc
  const imageUrl = req.body.url
  const author = req.body.by


  const doccument = new annoucementCollection({
    title:title,
    desc:description,
    imageurl: imageUrl,
    createdby : author,
    createdat: new Date().toLocaleDateString()
  })

  doccument.save((err)=>{
    res.send("saved")
  })

})


router.get("/announcements" , (req, res) =>{

  annoucementCollection.find({}, (err, docs)=>{
    res.send(docs)
  })
})


router.delete("/deleteevent/:name" , (req,res)=>{
  const deletingCollection = req.params.name

  mongoose.connection.db.dropCollection( deletingCollection , (err, result)=>{
    if(err) res.sendStatus(500)
    res.send("event deleted")
  })
})


router.delete("/deleteannouncement/:title" , (req,res)=>{

  const deletingtitle = req.params.title

  annoucementCollection.deleteOne({title: deletingtitle} , (err , cb)=>{
    if(err) res.sendStatus(500)
    res.send("Announcement Deleted")
  })
})




export default router