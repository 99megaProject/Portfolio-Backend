import express from 'express'
import cors from 'cors'


const app = express()


app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cors())

// routers
import serviceRouter from './src/routes/service.route.js'
import projectRouter from './src/routes/project.route.js'
import profileRouter from './src/routes/profile.route.js'

app.use('/api/v1', serviceRouter)
app.use('/api/v1', projectRouter)
app.use('/api/v1', profileRouter)



export default app