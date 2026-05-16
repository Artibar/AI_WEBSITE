import { Monitor, Rocket, Code2, Send, Loader2 } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { useWebsite } from '../hooks/useWebsite.js'

import '../style/preview.css'

const Preview = ({ websiteId }) => {
  const { updateWebsite } = useWebsite()
  const [website, setWebsite] = useState(null)
  const [updateLoading, setUpdateLoading] = useState(false)
  const [activeView, setActiveView] = useState('preview')
  const [prompt, setPrompt] = useState('')
  const [thinkingIndex, setThinkingIndex] = useState(0)
  const chatEndRef = useRef(null)

  const thinkingSteps = [
    "Understanding your requirements...",
    "Planning layout changes...",
    "Applying animations...",
    "Finalizing update..."
  ]

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [website?.conversation])

  useEffect(() => {
    if (!updateLoading) return
    const interval = setInterval(() => {
      setThinkingIndex(i => (i + 1) % thinkingSteps.length)
    }, 1200)
    return () => clearInterval(interval)
  }, [updateLoading])

  const handleUpdateWebsite = async () => {
    if (!prompt.trim() || updateLoading) return
    setUpdateLoading(true)
    try {
      const res = await updateWebsite(websiteId, prompt)
      if (res?.website) setWebsite(res.website)
      setPrompt('')
    } catch (error) {
      console.error('Update failed:', error)
    } finally {
      setUpdateLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleUpdateWebsite()
    }
  }

  return (
    <div className="preview-root">
      <aside className="preview-sidebar">
        <Header website={website} />
        <Chat
          website={website}
          prompt={prompt}
          setPrompt={setPrompt}
          updateLoading={updateLoading}
          thinkingStep={thinkingSteps[thinkingIndex]}
          onSend={handleUpdateWebsite}
          onKeyDown={handleKeyDown}
          chatEndRef={chatEndRef}
        />
      </aside>

      <main className="preview-main">
        <div className="preview-toolbar">
          <button
            className={`toolbar-btn${activeView === 'preview' ? ' toolbar-btn--active' : ''}`}
            onClick={() => setActiveView('preview')}
          >
            <Monitor size={15} /> Preview
          </button>
          <button
            className={`toolbar-btn${activeView === 'code' ? ' toolbar-btn--active' : ''}`}
            onClick={() => setActiveView('code')}
          >
            <Code2 size={15} /> Code
          </button>
          <div className="toolbar-spacer" />
          <button className="toolbar-btn toolbar-btn--deploy" to={'/liveSite'}>
            <Rocket size={15} /> Deploy
          </button>
        </div>

        <div className="preview-stage">
          {activeView === 'preview' ? (
            <iframe
              title="Website preview"
              srcDoc={website?.latestCode || '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:monospace;color:#555;font-size:13px;">No preview yet</div>'}
              sandbox="allow-scripts allow-same-origin allow-forms"
              className="preview-iframe"
            />
          ) : (
            <pre className="preview-code">
              <code>{website?.latestCode || '// No code generated yet'}</code>
            </pre>
          )}
        </div>
      </main>
    </div>
  )
}

function Header({ website }) {
  return (
    <div className="sidebar-header">
      <div className="sidebar-logo">
        <span className="sidebar-logo-dot" />
        <span className="sidebar-logo-text">Ai Website</span>
      </div>
      <h2 className="sidebar-title">{website?.title || 'Untitled Project'}</h2>
    </div>
  )
}

function Chat({ website, prompt, setPrompt, updateLoading, thinkingStep, onSend, onKeyDown, chatEndRef }) {
  return (
    <div className="chat-root">
      <div className="chat-messages">
        {!website?.conversation?.length && (
          <div className="chat-empty">
            <span>Describe your website to start building</span>
          </div>
        )}
        {website?.conversation?.map((m, i) => (
          <div key={i} className={`chat-bubble chat-bubble--${m.role === 'user' ? 'user' : 'ai'}`}>
            <div className="chat-bubble-inner">{m.content}</div>
          </div>
        ))}
        {updateLoading && (
          <div className="chat-thinking">
            <Loader2 size={13} className="chat-thinking-spinner" />
            <span>{thinkingStep}</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input-area">
        <div className="chat-input-box">
          <textarea
            className="chat-textarea"
            placeholder="Describe changes..."
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            disabled={updateLoading}
          />
          <button
            className="chat-send-btn"
            disabled={updateLoading || !prompt.trim()}
            onClick={onSend}
          >
            {updateLoading
              ? <Loader2 size={14} className="chat-thinking-spinner" />
              : <Send size={14} />
            }
          </button>
        </div>
        <p className="chat-hint">Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  )
}

export default Preview