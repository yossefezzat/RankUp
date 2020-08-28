"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _WSController = require("../service/WSController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route("/workspace/user/:id").get(_WSController.listWorkSpaces);

router.route("/workspace").post(_WSController.createWS);

router.route("/workspace/:id").get(_WSController.getWorkSpace).delete(_WSController.deleteWS).post(_WSController.changeName);

router.route("/workspace/users/:id").post(_WSController.addNewUser);

router.route("/workspace/users/:id/:userID").post(_WSController.deleteUser);

router.route("/workspace/jobs/:id").patch(_WSController.incNumOfJobs).put(_WSController.decNumOfJobs);

//catch all other routes
router.route("*").get(_WSController.invalidRequest);
module.exports = router;