const express = require('express')
const bodyParser = require('body-parser')

const promotionIdRouter = express.Router();

promotionIdRouter.use(bodyParser.json())

promotionIdRouter.route('/:promotionId')
.all((req,res,next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    next()
})
.get((req,res) => {
    res.end('will send details of the promotion: '+
    req.params.promotionId + ' to you!')
})
.post((req,res,next) => {
    res.statusCode = 403
    res.end('POST operation not supported on /promotiones/'+
     req.params.promotionId)
})
.put((req,res,next) => {
    res.write('Updating the promotion: '+req.params.promotionId)
    res.end('Will update the promotion: '+req.body.name + '\n'+ 
    ' with details: '+req.body.description)
})
.delete((req,res,next) => {
    res.end('Deleting promotion: '+req.params.promotionId)
})

module.exports = promotionIdRouter