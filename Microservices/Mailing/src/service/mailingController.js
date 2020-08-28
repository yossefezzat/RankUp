import nodemailer from "nodemailer";
import config from "config";

const user =  config.get("cred.user")
const pass  = config.get("cred.pass");
// Adjust transporter
const transporter = nodemailer.createTransport({
    service: "yahoo",
    secure: false,
    auth: {
        user: user,
        pass: pass
    }
});

const sendMail = (req, res) => {
    console.log(req.body);
    const mailOptions = {
        from: "rankup9822@yahoo.com",
        to: req.body.receiver,
        subject: req.body.title,
        text: req.body.message
    };
    transporter.sendMail(mailOptions)
        .then(data => {
            console.log(data)
            res.json(data);
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
}


module.exports = {sendMail};