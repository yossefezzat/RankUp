import JobModel from "../repository/jobModel";

// Display HR all jobs from recent to old
const getAllHRJobs = (req, res) => {
    JobModel.find({ hrID: req.params.id, wsID : req.params.wsID}).sort({ created_date: -1 }) //sort based on recent created date
        .then((results) => res.json(results))
        .catch((err) => res.status(404).json(err))
}

// Display all jobs in workspace from recent to old	
const getAllWSJobs = (req, res) => {
    JobModel.find({ wsID: req.params.id }).sort({ created_date: -1 }) //sort based on recent created date
        .then((results) => res.json(results))
        .catch((err) => res.status(404).json(err))
}

// Get jobs states with number for each one
const getJobStatesWithNum = (req, res) => {
    const states = {
        'all': 0,
        'active': 0,
        'hold': 0,
        'closed': 0
    };
    let {wsID} = req.params;
    JobModel.find({wsID})
        .then((jobs) => {
            states['all'] = jobs.length;
            jobs.forEach(e => states[e.stat] = states[e.stat]+1);
            res.json(states);
        })
        .catch((err) => res.status(400).json(err)); 
}

// Crud operations for job
const addNewJob = (req, res) => {
    const newJob = JobModel(req.body);
    newJob.save()
        .then((job) => res.json(job))
        .catch((err) => res.status(400).json(err)); 
}

const getJob = (req, res) => {
    JobModel.findById(req.params.id)
        .then((job) => res.json(job))
        .catch((err) => res.status(400).json(err));
}

const updateJob = (req, res) => {
    JobModel.findByIdAndUpdate(req.body._id, req.body)
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json(err)); 
}

const deleteJob = (req, res) => {
    JobModel.deleteOne({ _id: req.params.id })
        .then((result) => res.json(result))
        .catch((err) => res.status(404).json(err));
}

const setNumOfApplicants = (req, res) => {
    const {id, num} = req.params;
    console.log(id, num);
    JobModel.findByIdAndUpdate(id, {numOfApplicants: num})
        .then(data => res.json(data))
        .catch(err=> res.send(err));
}

// Handling all not found requests
const invalidRequest = (req, res) => {
    res.send("<h1>PAGE NOT FOUND</h1>");
}

module.exports = { 
    getAllHRJobs, getJobStatesWithNum, getAllWSJobs,
    addNewJob, getJob, updateJob, deleteJob, invalidRequest,
    setNumOfApplicants
};