import express from "express";
import {
    pdfReader,
    uploadCVS
} from "../service/pdfReadingController";

const router = express.Router();

router.route("/readPdf/:jobID")
    .post(pdfReader);

// Receive uploaded cvs
router.route("/upload/:id")
    .post(uploadCVS);

module.exports = router;
