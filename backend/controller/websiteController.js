import Website from '../model/Website.js'
import User from '../model/User.js'
import generateResponce from '../aiServices/ai.js'

const masterPrompt = `YOU ARE A PRINCIPAL FULL STACK ARCHITECT
AND A SENIOR WEBSITE DEVELOPER SPECIALIZED IN RESPONSIVE DESIGN SYSTEMS

YOU BUILD HIGH-END, REAL-WORLD, PRODUCTION-READY GRADE WEBSITES
USING HTML, CSS, JAVASCRIPT

THAT WORK PERFECTLY ON ALL SCREEN SIZES

USERS REQUIREMENT: {USER_PROMPT}

GLOBAL QUALITY BAR (NON-NEGOTIABLE)
- Premium, modern UI (2026-2027)
- Professional typography & spacing
- Clean visual hierarchy
- Business-ready content (NO lorem ipsum)
- Smooth transitions & hover effects
- Production-ready, readable code

RETURN ONLY RAW JSON IN THIS FORMAT:
{
  "message": "Short confirmation",
  "code": "<full website html/css/js here>"
}`

// ✅ helper to extract JSON from AI response
const extractJson = (raw) => {
    try {
        if (!raw || typeof raw !== "string") return null
        const cleaned = raw.replace(/```json|```/g, '').trim()
        return JSON.parse(cleaned)
    } catch (err) {
        console.log("JSON parse error:", err.message)
        return null
    }
}

export const generateWebsite = async (req, res) => {
    try {
        console.log("REQ BODY:", req.body)

        const { prompt } = req.body

        if (!prompt) {
            return res.status(400).json({ message: "Prompt is required" })
        }

        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const user = await User.findById(req.user._id)

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        // if (!user.credits || user.credits < 500) {
        //     return res.status(400).json({ message: "Not enough credits" })
        // }

        const finalPrompt = masterPrompt.replace("{USER_PROMPT}", prompt)

        let raw = await generateResponce(finalPrompt)
        console.log("AI RAW:", raw)

        let parsed = extractJson(raw)

        if (!parsed) {
            raw = await generateResponce(finalPrompt + "\n\nRETURN ONLY RAW JSON")
            parsed = extractJson(raw)
        }

        if (!parsed || !parsed.code) {
            console.log("INVALID AI:", raw)
            return res.status(400).json({ message: "AI returned invalid response" })
        }

        const website = await Website.create({
            user: user._id,
            title: prompt.slice(0, 60), // ✅ was using wrong 'prompt' variable
            latestCode: parsed.code,
            conversation: [
                { role: "user", content: prompt },
                { role: "ai", content: parsed.message }
            ]
        })

        // user.credits = user.credits - 500
        // await user.save()

        return res.status(201).json({
            websiteId: website._id,
            code: parsed.code,          // ✅ send code back to frontend
            message: parsed.message,
            // remainingCredits: user.credits
        })

    } catch (error) {
        console.error("Error in generateWebsite", error)
        res.status(500).json({ message: `generate website error: ${error.message}` })
    }
}

export const getWebsite = async (req, res) => {
    try {
        const website = await Website.findOne({
            _id: req.params.id,
            user: req.user._id
        })
        if (!website) {
            return res.status(404).json({ message: "Website not found" })
        }
        res.status(200).json({ message: "Website fetched successfully", website })
    } catch (error) {
        console.error("Error in fetching website", error)
        res.status(500).json({ message: "Error in fetching website", error })
    }
}

export const updateWebsite = async (req, res) => {
    try {
        const { prompt } = req.body
        if (!prompt) {
            return res.status(400).json({ message: "Prompt is required" })
        }

        const website = await Website.findOne({
            _id: req.params.id,
            user: req.user._id
        })
        if (!website) {
            return res.status(404).json({ message: "Website not found" })
        }

        const user = await User.findById(req.user._id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        if (user.credits < 100) {
            return res.status(400).json({ message: "Not enough credits to update website" })
        }

        const updatePrompt = `UPDATE THIS FULLSTACK WEBSITE.
CURRENT CODE:
${website.latestCode}

USER REQUEST:
${prompt}

RETURN ONLY RAW JSON:
{
  "message": "Short confirmation",
  "code": "<updated full website>"
}`

        let raw = ''
        let parsed = null

        // ✅ same fix — removed undefined array loop
        raw = await generateResponce(updatePrompt)
        parsed = extractJson(raw)

        if (!parsed) {
            raw = await generateResponce(updatePrompt + "\n\nRETURN ONLY RAW JSON")
            parsed = extractJson(raw)
        }

        if (!parsed || !parsed.code) {
            console.log("AI returned invalid response", raw)
            return res.status(400).json({ message: "AI returned invalid response" })
        }

        website.conversation.push(
            { role: "user", content: prompt },
            { role: "ai", content: parsed.message } // ✅ was "parsed.message" (string literal)
        )
        website.latestCode = parsed.code
        await website.save()

        user.credits = user.credits - 100
        await user.save()

        return res.status(200).json({
            message: "Website updated successfully",
            code: parsed.code,
            remainingCredits: user.credits
        })

    } catch (error) {
        console.error("Error in updateWebsite", error)
        res.status(500).json({ message: "Error in updating website", error })
    }
}

export const getAllWebsites = async (req, res) => {
    try {
        const websites = await Website.find({ user: req.user._id }).select("_id title createdAt deployed deployedUrl")
        res.status(200).json({ message: "Websites fetched successfully", websites })
    } catch (error) {
        console.error("Error in getAllWebsites", error)
        res.status(500).json({ message: "Error in fetching websites", error })
    }
}

export const deploy = async (req, res) => {
    try {
        const website = await Website.findOne({
            _id: req.params.id,
            user: req.user._id
        })
        if (!website) {
            return res.status(404).json({ message: "Website not found" })
        }
        if (!website.slug) {
            website.slug = website.title
                .toLowerCase()
                .replace(/[^a-z0-9]/g, '')
                .slice(0, 60) + website._id.toString().slice(-5) // ✅ fixed line break bug
        }
        website.deployed = true
        website.deployedUrl = `${process.env.FRONTEND_URL}/site/${website.slug}`
        await website.save()

        return res.status(200).json({ url: website.deployedUrl })
    } catch (error) {
        console.error("Error in deploy controller", error)
        res.status(500).json({ message: "Error in deploy", error })
    }
}

export const getBySlug = async (req, res) => {
    try {
        const website = await Website.findOne({ slug: req.params.slug }) // ✅ removed user filter — public page
        if (!website) {
            return res.status(404).json({ message: "Website not found" })
        }
       return res.status(200).json({ success: true, website })
    } catch (error) {
        console.error("Error in getBySlug", error)
        res.status(500).json({ message: "Error in getBySlug", error })
    }
}