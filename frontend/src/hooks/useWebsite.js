import { useDispatch } from 'react-redux'
import { setWebsiteData } from '../redux/websiteSlice.js'
import { deployWeb, generateWebsite, getAllWebsites, getWebsite, slugWeb, updateWebsite } from '../services/website.api.js'

export const useWebsite = () => {
    const dispatch = useDispatch()

    const generateWebsitePrompt = async (prompt) => {
        try {
            const response = await generateWebsite({ prompt })
            if (response.success) {
                dispatch(setWebsiteData(response.website))
            }
            return response
        } catch (error) {
            console.error("Error in generating website", error)
            throw error
        }
    }

    const fetchAllWebsites = async () => {
        try {
            const response = await getAllWebsites({})
            if (response.success) {
                dispatch(setWebsiteData(response.websites))
            }
            return response
        } catch (error) {
            console.error("Error in fetching all websites", error)
            throw error
        }
    }

    const fetchWebsite = async (id) => {
        try {
            const response = await getWebsite({ id })
            if (response.success) {
                dispatch(setWebsiteData(response.website))
            }
            return response
        } catch (error) {
            console.error("Error in fetching website", error)
            throw error
        }
    }

    const updateWebsites = async (id, prompt) => {
        try {
            const response = await updateWebsite({ id, prompt })
            if (response.success) {
                dispatch(setWebsiteData(response.website))
            }
            return response
        } catch (error) {
            console.error("Error in updating website", error)

        }
    }
    const deploy = async (id) => {
        try {
            const response = await deployWeb({ id })
            if (response.success) {
                dispatch(setWebsiteData(response.website))
            }
            return response
        } catch (error) {
            console.error("Error in deploying website", error)
        }
    }
   
const getWebsiteBySlug = async (slugValue) => {
  try {
    const response = await slugWeb({ slug: slugValue })
    if (response.success) {
      dispatch(setWebsiteData(response.website))
    }
    return response
  } catch (error) {
    console.error("Error in fetching slug website", error)
  }
}



    return {
        generateWebsitePrompt,
        fetchAllWebsites,
        fetchWebsite,
        updateWebsites,
        deploy,
         getWebsiteBySlug
    }
}

