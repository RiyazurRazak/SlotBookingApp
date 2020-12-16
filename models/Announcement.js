import mongoose from 'mongoose'

const announcementSchema = mongoose.Schema({
    title:{type: String , required:true},
    desc:{type: String , required:true},
    imageurl:{type: String , required:true},
    createdat:{type: String , required:true},
    createdby:{type: String , required:true}
})

const announcementCollection = mongoose.model("Announcement" , announcementSchema)

export default announcementCollection