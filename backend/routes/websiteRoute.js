import express from 'express'
import { generateWebsite, getWebsite, updateWebsite, getAllWebsites, deploy, getBySlug } from '../controller/websiteController.js'
import protectRoute from '../middleware/protectRoute.js'

const websiteRouter = express.Router()

// ✅ Static routes first
websiteRouter.post('/generate',       protectRoute, generateWebsite)
websiteRouter.get('/all',             protectRoute, getAllWebsites)
websiteRouter.get('/deploy/:id',      protectRoute, deploy)
websiteRouter.put('/update/:id',      protectRoute, updateWebsite)

// ✅ Param routes last
websiteRouter.get('/id/:id',          protectRoute, getWebsite)
websiteRouter.get('/slug/:slug',     getBySlug)

export default websiteRouter