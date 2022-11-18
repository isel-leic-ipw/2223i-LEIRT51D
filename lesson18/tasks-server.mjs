// Application Entry Point. 
// Register all HTTP API routes and starts the server


import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import yaml from 'yamljs'

import  * as tasksData from './data/tasks-data.mjs'
import  * as usersData from './data/users-data.mjs'
import  tasksServicesInit from './services/tasks-services.mjs'
import  tasksApiInit from './api/tasks-http-api.mjs'

const tasksServices = tasksServicesInit(tasksData, usersData)
const api = tasksApiInit(tasksServices)


const PORT = 1904

console.log("Start setting up server")
let app = express()

app.use(express.json())
app.use(cors())
const swaggerDocument = yaml.load('./docs/tasks-api.yaml')
app.use('/slb', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/tasks', api.getTasks)
app.get('/tasks/:id', api.getTask)
app.delete('/tasks/:id', api.deleteTask)
app.post('/tasks', api.createTask)
app.put('/tasks/:id', api.updateTask)

app.listen(PORT, () => console.log(`Server listening in http://localhost:${PORT}`))

console.log("End setting up server")

// Route handling functions

