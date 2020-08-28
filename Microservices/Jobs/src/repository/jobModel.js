import mongoose, { Schema } from "mongoose";

const JobSchema = mongoose.Schema({
    HRName:{
        type:String,
        required: true
    },
    hrID: {
        type: Schema.Types.ObjectId,
        required: true
    },
    wsID: {
        type: Schema.Types.ObjectId,
        required: true
    },
    numOfApplicants: {
        type: Number,
        default: 0
    },
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    stat:{
        type:String,
        default: 'active'
    },
    level:{
        type:String,
        default: 'junior'
    },
    skills: {
        type: String,
        required: true
    },
    created_date:{
        type:Date,
        default: Date.now
    }
});

const jobModel = mongoose.model('job', JobSchema);

module.exports = jobModel;
