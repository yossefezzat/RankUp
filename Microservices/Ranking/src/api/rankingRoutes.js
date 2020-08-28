import express from "express";

import {classifying, getClass, classesWithNum} from "../service/rankingController";

const router = express.Router();

router.route("/ranking/:jobID")
    .get(classifying);

// Rendering data for ui
router.route("/ranking/:jobID/states")
    .get(classesWithNum);

// Handling getting some class (A, B, C)
router.route("/ranking/:jobID/class/:classType")
    .get(getClass);

module.exports = router;
