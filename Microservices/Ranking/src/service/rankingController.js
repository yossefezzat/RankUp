import rankingModel from "../repository/rankingModel";

// To Classify cvs of some job 
const classifying = (req, res) => {
    const {jobID} = req.params;
    rankingModel.findOne({ jobID: jobID })
        .then((job) => {
            const classAPercent = Math.floor(job.CVs.length*0.2);
            const classBPercent = Math.floor(job.CVs.length*0.4);
            console.log(classAPercent, classBPercent); 
            let i = 0;
            job.CVs.forEach(cv => {
                if (i >= 0 && i < classAPercent)
                    cv.class = "A";
                else if (i >= classAPercent && i < (classBPercent+classAPercent))
                    cv.class = "B";
                else
                    cv.class = "C";
                i++;
            });
            job.save()
                .then(data => console.log(data))
                .catch(err => console.log("err", err));
            res.json(job);
        })
        .catch((err => { console.log(err); res.status(400).json(err); }))
}

// For a particular job, return how many CVs are there in each class!
const classesWithNum = (req, res) => {
    const {jobID} = req.params;
    const classes = {
        'A': 0,
        'B': 0,
        'C': 0,
        'undefined': 0
    };
    rankingModel.findOne({jobID})
        .then((job) => {
            job.CVs.forEach(cv => classes[cv.class] = classes[cv.class]+1);
            res.json(classes);
        })
        .catch((err) => res.status(400).json(err)); 
}

// Getting cvs of some class
const getClass = (req, res) => {
    const {jobID, classType} = req.params;
    rankingModel.findOne({jobID})
        .then(job => {
            const cvs = [];
            job.CVs.forEach(cv => {
                if(cv.class === classType.toUpperCase())
                    cvs.push(cv);
            })
            res.json(cvs);
        })
        .catch((err) => res.status(400).json(err)); 
}


module.exports = {classifying, getClass, classesWithNum};