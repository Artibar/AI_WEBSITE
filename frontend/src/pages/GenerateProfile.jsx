import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../style/generateProfile.css'
import { useWebsite } from '../hooks/useWebsite.js'
import { Monitor, Code2, Rocket, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const SUGGESTIONS = [
  'Portfolio site',
  'SaaS landing page',
  'E-commerce store',
  'Blog with CMS',
  'Restaurant menu',
]

const GenerateProfile = () => {
  const { generateWebsitePrompt, deploy } = useWebsite()
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState('')
  const [copied, setCopied] = useState(false)
  const [activeView, setActiveView] = useState('code')
  const [websiteId, setWebsiteId] = useState(null)
  const [deploying, setDeploying] = useState(false)
  const [deployedUrl, setDeployedUrl] = useState(null)
 const navigate = useNavigate()
  const handleGenerateWebsite = async (e) => {
    e.preventDefault()
    if (!prompt.trim()) return
    setLoading(true)
    setGenerated('')
    setWebsiteId(null)
    setDeployedUrl(null)
    try {
      const res = await generateWebsitePrompt(prompt)
      setGenerated(res?.website?.latestCode || res?.code || res?.data || '')
      setWebsiteId(res?.website?._id || null)
      setActiveView('code')
    } catch (error) {
      console.error('Error in creating website', error)
      setGenerated(`// Error generating website\n// ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  // const handleDeploy = async () => {
  //   if (!websiteId || deploying) return
  //   setDeploying(true)
  //   try {
  //     const res = await deploy(websiteId)
  //     if (res?.success) {
  //       const url = res?.website?.deployedUrl || res?.website?.url || res?.url || null
  //       setDeployedUrl(url)
  //     }
  //     navigate(`/site/${websiteId}`)
  //   } catch (error) {
  //     console.error('Deploy failed:', error)
  //   } finally {
  //     setDeploying(false)
  //   }
  // }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generated)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  const handleChip = (text) => {
    setPrompt((prev) => (prev ? `${prev}, ${text.toLowerCase()}` : text))
  }

  return (
    <div className='generate-page'>
      <div className='generate-container'>

        <div className='generate-header'>
          <div className='generate-eyebrow'>AI-Powered Builder</div>
          <h1>Build Websites with <span>Real AI Power</span></h1>
          <p>
            Transform your ideas into production-ready websites. GenWebAI focuses on
            quality, performance, and accessibility — not shortcuts.
          </p>
        </div>

        <form className='generate-form' onSubmit={handleGenerateWebsite}>
          <div className='form-label-row'>
            <label htmlFor='prompt'>Describe your website</label>
            <span className='char-count'>{prompt.length} / 800</span>
          </div>

          <textarea
            id='prompt'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value.slice(0, 800))}
            placeholder='e.g. A modern SaaS landing page for a project management tool. Include a hero section, features grid, pricing table, and a CTA. Dark theme, clean typography, fast animations.'
            rows={8}
          />

          <div className='prompt-suggestions'>
            <span>Try:</span>
            {SUGGESTIONS.map((s) => (
              <button key={s} type='button' className='suggestion-chip' onClick={() => handleChip(s)}>
                {s}
              </button>
            ))}
          </div>

          <button type='submit' disabled={loading || !prompt.trim()}>
            {loading ? (<><span className='loading-spinner' />Generating…</>) : (<>✦ Generate Website</>)}
          </button>

          {loading && (
            <div className='generate-progress'>
              <div className='progress-label'>
                <span>Building your website…</span>
                <span>est. 30s</span>
              </div>
              <div className='progress-track'>
                <div className='progress-fill' />
              </div>
            </div>
          )}
        </form>

        {generated && (
          <div className='generated-output'>
            <div className='output-header'>
              <div className='output-title'>
                <span className='output-dot' />
                Generated Website Code
              </div>

              <div className='output-view-toggle'>
                <button
                  className={`toolbar-btn${activeView === 'code' ? ' toolbar-btn--active' : ''}`}
                  onClick={() => setActiveView('code')}
                  type='button'
                >
                  <Code2 size={14} /> Code
                </button>
                <button
                  className={`toolbar-btn${activeView === 'preview' ? ' toolbar-btn--active' : ''}`}
                  onClick={() => setActiveView('preview')}
                  type='button'
                >
                  <Monitor size={14} /> Preview
                </button>
                <button
                  className='toolbar-btn'
                  onClick={() => navigate(`/dashboard`)}
                  type='button'
                >
                  <ExternalLink size={14} /> Dashboard
                </button>
              </div>

              <div className='output-actions'>
                <button className='output-btn' onClick={handleCopy} type='button'>
                  {copied ? '✓ Copied' : 'Copy'}
                </button>

                {websiteId && (
                  <button
                    className='output-btn output-btn--deploy'
                    onClick={() => navigate(`/site/${websiteId}`)}
                    
                    disabled={deploying}
                    type='button'
                  >
                    <Rocket size={13} />
                    {deploying ? 'Deploying…' : deployedUrl ? 'Redeploy' : 'Deploy'}
                  </button>
                )}

                <button
                  className='output-btn'
                  onClick={() => { setGenerated(''); setWebsiteId(null); setDeployedUrl(null) }}
                  type='button'
                >
                  Clear
                </button>
              </div>
            </div>

            {deployedUrl && (
              <div className='deploy-banner'>
                🚀 Live at{' '}
                <a href={deployedUrl} target='_blank' rel='noopener noreferrer'>
                  {deployedUrl}
                </a>
              </div>
            )}

            {activeView === 'code' && <pre>{generated}</pre>}

            {activeView === 'preview' && (
              <iframe
                title='Website preview'
                srcDoc={generated}
                sandbox='allow-scripts allow-same-origin allow-forms'
                className='generated-preview-iframe'
              />
            )}
          </div>
        )}

        <div className='generate-features'>
          <div className='feature-item'>
            <span className='icon'>⚡</span>
            <h4>Lightning Fast</h4>
            <p>Code splitting, lazy loading, and modern performance best practices baked in.</p>
          </div>
          <div className='feature-item'>
            <span className='icon'>📱</span>
            <h4>Fully Responsive</h4>
            <p>Perfect on every screen — desktop, tablet, and mobile, automatically.</p>
          </div>
          <div className='feature-item'>
            <span className='icon'>🔒</span>
            <h4>Production Ready</h4>
            <p>Enterprise-grade output with security, accessibility, and SEO built in.</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default GenerateProfile