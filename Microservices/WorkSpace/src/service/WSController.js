import WSModel from "../repository/WSModel";

const getWorkSpace  = (req, res) =>{
    WSModel.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.send(err));
};

const listWorkSpaces = (req, res) => {
    WSModel.find({$or:[{ownerID: req.params.id},{'users.id': req.params.id}, {emails: req.query.email}]})
        .then(data => res.send(data))
        .catch(err => res.send(err));
};

const createWS = (req, res) => {
    const newWS = new WSModel(req.body);
    newWS.save()
        .then((ws) => res.json(ws))
        .catch((err) => res.status(400).json(err)); 
};

const deleteWS = (req, res) => {
    WSModel.deleteOne({_id:req.params.id})
        .then(data => res.json(data))
        .catch(err => res.send(err))
};

const changeName = (req, res) => {
    WSModel.findById(req.params.id)
        .then(data => {
            data.name = req.body.name;
            data.save()
        })
        .then(updated =>  res.json(updated))
        .catch(err => res.send(err))
        .catch(err => res.send(err));
};

const addNewUser = (req, res) => {
    WSModel.update(
        {_id: req.params.id},
        { "$push": { "users": req.body.id} },
        (err, data) => {
            if (err) 
                res.send(err);
            res.json(data);
        }
    );     
};

const deleteUser = (req, res) => {
    WSModel.updateOne({_id: req.params.id},{$pull:{users:{userID: req.params.userID}}},{ safe: false })
        .then(data => {
            res.json(data);
        })
        .catch(err => res.send(err));
};

const incNumOfJobs = (req, res) => {
    WSModel.findById(req.params.id, (err, data) => {
        if (err)
            res.send(err);
        data.numOfJobs += 1;
        data.save((err, updated) => {
            if (err)
                res.send(err)
            res.json(updated);
        })
    });
};

const decNumOfJobs = (req, res) => {
    WSModel.findById(req.params.id, (err, data) => {
        if (err)
            res.send(err);
        if (data.numOfJobs > 0){
            data.numOfJobs -= 1;
            data.save((err, updated) => {
                if (err)
                    res.send(err)
                res.json(updated);
            });
        }
        else
            res.json({ Empty_WS: "This workspace either has no job profiles yet or they are already deleted" });
    });
};

const invalidRequest = (req, res) => {
    res.send("<h1>PAGE NOT FOUND</h1>");
}

module.exports = { getWorkSpace, listWorkSpaces, 
    createWS, deleteWS,
    changeName, addNewUser, deleteUser, incNumOfJobs, decNumOfJobs, invalidRequest };
