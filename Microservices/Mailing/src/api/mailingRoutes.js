import express from "express";
import { sendMail } from "../service/mailingController";

const router = express.Router();

// Handling mailing operation
router.route("/mailing")
    .post(sendMail);

module.exports = router;
