
const pushNotification = (req, res) => {
    /*console.log(req.body)
    socket.emit('notifying', req.body);*/
    res.json({'msg': 'Done'});
}

module.exports = {pushNotification};