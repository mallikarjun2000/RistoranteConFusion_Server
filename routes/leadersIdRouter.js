const express = require('express')
const bodyParser = require('body-parser')

const leaderIdRouter = express.Router();

leaderIdRouter.use(bodyParser.json())

leaderIdRouter.route('/:leaderId')
.all((req,res,next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    next()
})
.get((req,res) => {
    res.end('will send details of the leader: '+
    req.params.leaderId + ' to you!')
})
.post((req,res,next) => {
    res.statusCode = 403
    res.end('POST operation not supported on /leaderes/'+
     req.params.leaderId)
})
.put((req,res,next) => {
    res.write('Updating the leader: '+req.params.leaderId)
    res.end('Will update the leader: '+req.body.name + '\n'+ 
    ' with details: '+req.body.description)
})
.delete((req,res,next) => {
    res.end('Deleting leader: '+req.params.leaderId)
})

module.exports = leaderIdRouter