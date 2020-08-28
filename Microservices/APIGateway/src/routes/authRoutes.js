const express = require("express");
const config = require("config");
const axios = require('axios');

const auth = config.get('services.auth');
const router = express.Router();

router.route('/logout')
    .post((req, res) => {
        axios.post(auth+'/api/v1/logout')
            .then(result => {
                res.json(result.data);
            })
            .catch(err => {
                res.send(err);
            });
    });

router.route('/login')
    .post((req, res) => {
        const {email, password} = req.body;
        axios.post(auth+'/api/v1/login', {
            email: email,
            password : password
        }).then(result => {
            res.json(result.data);
        }).catch(err => {
            console.log(err);
            res.send(err);
        });
    });

router.route('/signup')
    .post((req, res) => {
        axios.post(auth+'/api/v1/signup',{
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }).then(result => {
            res.json(result.data);
        }).catch(err => {
            res.send(err);
        });
    });

router.route('/init')
    .post((req, res) => {
        axios.post(auth+'/api/v1/init')
            .then(result => {
                return res.send(result.data);
            })
            .catch(err => {
                return res.send(err);
            });
    });

module.exports = router;