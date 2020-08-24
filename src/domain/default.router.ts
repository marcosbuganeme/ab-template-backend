import { Router } from 'express'

const DefaultRouter = Router()

DefaultRouter
  .get('/', (req, res) => {
    return res
      .status(200)
      .send({ status: 'online', application: 'api-template-backend', version: '1.0.0' })
  })

export default DefaultRouter