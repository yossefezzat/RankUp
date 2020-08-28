const ps = require('python-shell')
const path = require('path')
import multer from "multer";
import fs from "fs";
import http from "http";
import config from "config";

import rankingModel from "../repository/rankingModel";

// Getting cv with cvID
const pdfReader = (req, res) => {
    const desc = req.body.desc;
    const {
        jobID
    } = req.params;
    console.log(jobID, desc);
    const pdfs_path = path.join(__dirname,'/../../public/'+jobID);
    const ontology = path.join(__dirname, 'skill_ontologyFiltered.txt');
    const others = path.join(__dirname, 'others.txt');
    const options = {
        args: [pdfs_path, ontology, others],
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: path.join(__dirname, 'Model_py'),
    }
    ps.PythonShell.run('clean_data.py', options, async function (err, results) {
        if (err) throw err;
        const readingData = JSON.parse(results);
        setNumOfApplicants(readingData.resumes.length,jobID);
        const options = {
            mode: '',
            args: [JSON.stringify(readingData.resumes), desc],
            pythonOptions: ['-u'], // get print results in real-time
            scriptPath: path.join(__dirname, 'Model_py'),
        }
        ps.PythonShell.run('ranking_model.py', options, function (err, wResults) {
            if (err) throw err;
            const jsonData = JSON.parse(wResults);
            const CVs = jsonData.cvs;
            const weighted_CVs = new rankingModel({
                jobID: jobID,
                CVs
            });
            weighted_CVs.save()
                .then((data) => {
                    console.log("Done");
                    res.json(data);
                })
                .catch(() => {
                    res.json(err)
                });
        });
    });
}

const uploadCVS = (req, res) => {
    const dir = 'public/'+req.params.id;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, dir);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname )
        }
    });
    const upload = multer({ storage: storage }).array('file');
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log('1', err);
            return res.status(400).json(err)
        } else if (err) {
            console.log('2', err);
            return res.status(400).json(err)
        }
        return res.status(200).send(req.file)
    })
}

const setNumOfApplicants = (num, jobID) => {
    const jobsUrl = config.get("app.jobsService");
    const url = jobsUrl + `/job/${jobID}/${num}`;
    console.log(num, jobID);
    http.get(url, function(res){return res;});
}

module.exports = {
    pdfReader,
    uploadCVS
};