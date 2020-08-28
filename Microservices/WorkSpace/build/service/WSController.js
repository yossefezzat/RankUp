"use strict";

var _WSModel = require("../repository/WSModel");

var _WSModel2 = _interopRequireDefault(_WSModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getWorkSpace = function getWorkSpace(req, res) {
    _WSModel2.default.findById(req.params.id).then(function (data) {
        return res.json(data);
    }).catch(function (err) {
        return res.send(err);
    });
};

var listWorkSpaces = function listWorkSpaces(req, res) {
    _WSModel2.default.find({ $or: [{ ownerID: req.params.id }, { 'users.id': req.params.id }] }).then(function (data) {
        return res.send(data);
    }).catch(function (err) {
        return res.send(err);
    });
};

var createWS = function createWS(req, res) {
    var newWS = new _WSModel2.default(req.body);
    newWS.save().then(function (ws) {
        return res.json(ws);
    }).catch(function (err) {
        return res.status(400).json(err);
    });
};

var deleteWS = function deleteWS(req, res) {
    _WSModel2.default.deleteOne({ _id: req.params.id }).then(function (data) {
        return res.json(data);
    }).catch(function (err) {
        return res.send(err);
    });
};

var changeName = function changeName(req, res) {
    _WSModel2.default.findById(req.params.id).then(function (data) {
        data.name = req.body.name;
        data.save();
    }).then(function (updated) {
        return res.json(updated);
    }).catch(function (err) {
        return res.send(err);
    }).catch(function (err) {
        return res.send(err);
    });
};

var addNewUser = function addNewUser(req, res) {
    _WSModel2.default.update({ _id: req.params.id }, { "$push": { "users": req.body.id } }, function (err, data) {
        if (err) res.send(err);
        res.json(data);
    });
};

var deleteUser = function deleteUser(req, res) {
    console.log(req.params.id, req.params.userID);
    _WSModel2.default.updateOne({ _id: req.params.id }, { $pull: { users: { userID: req.params.userID } } }, { safe: false }).then(function (data) {
        console.log(data);
        res.json(data);
    }).catch(function (err) {
        return res.send(err);
    });
};

var incNumOfJobs = function incNumOfJobs(req, res) {
    _WSModel2.default.findById(req.params.id, function (err, data) {
        if (err) res.send(err);
        data.numOfJobs += 1;
        data.save(function (err, updated) {
            if (err) res.send(err);
            res.json(updated);
        });
    });
};

var decNumOfJobs = function decNumOfJobs(req, res) {
    _WSModel2.default.findById(req.params.id, function (err, data) {
        if (err) res.send(err);
        if (data.numOfJobs > 0) {
            data.numOfJobs -= 1;
            data.save(function (err, updated) {
                if (err) res.send(err);
                res.json(updated);
            });
        } else res.json({ Empty_WS: "This workspace either has no job profiles yet or they are already deleted" });
    });
};

var invalidRequest = function invalidRequest(req, res) {
    res.send("<h1>PAGE NOT FOUND</h1>");
};

module.exports = { getWorkSpace: getWorkSpace, listWorkSpaces: listWorkSpaces,
    createWS: createWS, deleteWS: deleteWS,
    changeName: changeName, addNewUser: addNewUser, deleteUser: deleteUser, incNumOfJobs: incNumOfJobs, decNumOfJobs: decNumOfJobs, invalidRequest: invalidRequest };