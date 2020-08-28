import mongoose from "mongoose";

const MailingSchema = mongoose.Schema({
    hrName:{
        type:String,
        required: true
    },
    hrID: {
        type: Number,
        required: true
    },
    wsID: {
        type: Number,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    title:{
        type:String,
        required: true
    },
    message:{
        type:String,
        required: true
    },
    created_date:{
        type:Date,
        default: Date.now
    }
});

const mailingModel = mongoose.model('mailing', MailingSchema);

module.exports = mailingModel;
