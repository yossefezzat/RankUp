import express from "express";
import { pushNotification } from "../service/notificationController";

const router = express.Router();

// Handling mailing operation
router.route("/notifications")
    .post(pushNotification)
;
module.exports = router;
