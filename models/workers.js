const mongoose = require("mongoose")

const workerSchema = new mongoose.Schema 
(
    {
        worker_name: {
            type: String,
            required: [true, 'Please enter a name']
        },
        worker_id: {
            type: Number,
            required: [true, 'Please enter a worker ID']
        },
        worker_address: {
            type: String
        },
        worker_phone: {
            type: String
        },
        worker_password: {
            type: String,
            required: [true, 'Please enter a worker password']
        }
        
    }
)

module.exports = mongoose.model("Worker", workerSchema);