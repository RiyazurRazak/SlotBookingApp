import mongoose from 'mongoose'

const slotSchema = mongoose.Schema({
    facultyname: {type: String, required:true}, 
    sheduledate:{type:String , required:true},
    starttime:{type:String, required: true},
    endtime:{type:String, required:true},
    createdate: {type: String, required:true},
    bookedby: {type: String },
    id:{type: Number, required:true},
    isbooked:{type: Boolean , required:true},
    slotnum:{type:Number , required:true , unique: true},
})


export default slotSchema