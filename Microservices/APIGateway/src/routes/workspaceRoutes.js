const express = require("express");
const config = require("config");
const axios = require('axios');

const workspace = config.get('services.workspace');
const router = express.Router();

router.route('/workspace/users/:wsID/:userID')
    .post((req, res) => {
        const {userID, wsID} = req.params;
        axios.post(workspace+'/api/v1/workspace/users/'+wsID+'/'+userID)
            .then(result => {
                res.json(result.data);
            })
            .catch(err => {
                res.send(err);
            });
    });

router.route('/workspace/:id')
    .post((req, res) => {
        const id = req.params.id;
        const {name} = req.body;
        axios.post(workspace+'/api/v1/workspace/'+id, {
            name: name
        }).then(result => {
            res.json(result.data);
        }).catch(err => {
            console.log(err);
            res.send(err);
        });
    })
    .get((req, res) => {
        const id = req.params.id;
        axios.post(workspace+'/api/v1/workspace/'+id)
            .then(result => {
                res.json(result.data);
            }).catch(err => {
                console.log(err);
                res.send(err);
            });
    });

router.route('/workspace')
    .post((req, res) => {
        const {name, ownerID, emails} = req.body;
        axios.post(workspace+'/api/v1/workspace/', {
            name: name,
            ownerID: ownerID,
            emails: emails
        }).then(result => {
            res.json(result.data);
        }).catch(err => {
            console.log(err);
            res.send(err);
        });
    })

router.route('/workspace/user/:id')
    .get((req, res) => {
        const id = req.params.id;
        const email = req.query.email;
        console.log(id, email);
        axios.get(workspace+'/api/v1/workspace/user/'+id+'?email='+email)
            .then(result => {
                res.json(result.data);
            }).catch(err => {
                res.send(err);
            });
    });

module.exports = router;