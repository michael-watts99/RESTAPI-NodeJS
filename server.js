const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const express = require("express")

const Worker = require("./models/workers.js")

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/workerDB", {useNewUrlParser: true})

// Workers Route
app.route('/workers')

.post((req, res) => {
    const worker  = new Worker({
        worker_name: req.body.name,
        worker_id: req.body.id,
        worker_address: req.body.address,
        worker_phone: req.body.phone,
        worker_password: req.body.password
    })
    worker.save((err) =>{
        if(err)
        {
            res.send(err)
        }
        else
        {
            res.send('Successfully added worker')
        }
    })
})

.get((req, res) => {
    Worker.find((err, worker)=>{
        if(err)
        {
            res.send(err)
        }
        else
        {
            res.send(worker)
        }
        
    })
})

.delete((req, res)=> {
    Worker.deleteMany((err) =>{
        if(err)
        {
            res.send(err)
        }
        else
        {
            res.send("The workers were all successfully deleted")
        }
    })
})
// ID route
app.route('/workers/:id')
.get((req, res)=>{
    Worker.findOne({worker_id: req.params.id}, (err, workerFound)=>{
        if(err)
        {
            res.send("No worker found")

        }
        else
        {
            res.send(workerFound)
        }
    })
})
.delete((req, res)=>{
    Worker.findOneAndRemove({worker_id: req.params.id}, (err, workerDeleted)=>{
        if(err)
        {
            res.send("No worker found")
        }
        else
        {
            res.send(workerDeleted)
        }
    })
})

.put((req, res)=>{
    Worker.updateOne(
        {worker_id: req.params.id},
        {
            worker_name: req.body.name, 
            worker_id: req.body.id,
            worker_address: req.body.address,
            worker_phone: req.body.phone,
            worker_password: req.body.password
        },
        {overwrite:true},
        (err, updatedWorker)=>{
            if(err)
            {
                res.send("No worker found")
            }
            else
            {
                res.send("Worker is updated")
            }
        }
    )
   
})

.patch((req, res)=>{
    Worker.updateOne(
        {worker_id: req.params.id},
        {$set: {
            worker_address: req.body.address,
            worker_phone: req.body.phone,
            worker_password: req.body.password
            
        } }, (err)=>{
            if(err)
            {
                res.send(err)
            }
            else
            {
                res.send("Worker has been updated")
            }
        }
    )
    
})

// Server information
app.listen(8080, (request, response)=>{
    console.log("server is running")
})