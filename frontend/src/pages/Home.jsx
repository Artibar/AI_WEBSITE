import React, { useState } from 'react'
import { Coins } from 'lucide-react'
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useAuth } from '../hooks/useAuth.js'
import '../style/home.css'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const { createLogout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = async ()=>{
   try {
     const res = await createLogout()
     console.log("logout successful", res);
     
   } catch (error) {
     console.error("Error during logout:", error)
   }
  }
  const highlights = [
    {
      title: 'AI Generated Code',
      description: 'Enter a prompt and get production-ready website boilerplate in seconds.',
      icon: '⚡'
    },
    {
      title: 'Fully Responsive Layout',
      description: 'Desktop, tablet, and mobile classes rendered automatically.',
      icon: '📱'
    },
    {
      title: 'Production-ready Websites',
      description: 'Clean code structure, animations, accessibility support and SEO-friendly markup.',
      icon: '🚀'
    }
  ]

  

  const { userData } = useSelector(state => state.user)
  const [openProfile, setOpenProfile] = useState(false)
  const [selectedWebsite, setSelectedWebsite] = useState(null)
  const [showModal, setShowModal] = useState(false)


  const handleSampleClick = (site) => {
    setSelectedWebsite(site)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedWebsite(null)
  }

  return (
    <div className='home-page'>
      <header className='site-header'>
        <div className='header-box'>
          <div className='brand'>GenWeb<span className='brand-highlight'>Ai</span></div>
          <nav className='nav-links'>
            <Link to='#features'>Features</Link>
            <Link to='#about'>About</Link>
           
          </nav>

          {userData && <div className='credits-display'>
            <Coins />
            <span>Credits: {userData.credits}</span>
            <span>+</span>
          </div>}
          {!userData ?
            <button className='button primary-button' onClick={userData? () => navigate("/generate-profile"): () => navigate("/login")}>
              Get Started
            </button> :
            <div className='profile-section'>
              <button className='profile-button' onClick={() => setOpenProfile(!openProfile)}>
                <img src={userData.img || "https://ui-avatars.com/api/?name=" + userData.name} alt="Profile" />
              </button>
              {openProfile && (
                <div className='profile-dropdown'>
                  <div className='profile-info'>
                    <p>{userData.name}</p>
                    <p>{userData.email}</p>
                  </div>
                  <div className='credits-info'>
                    <Coins/>
                    <span>Credits: {userData.credits}</span>
                    <span>+</span>
                  </div>
                  <button>Dashboard</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )} 
            </div>
          }
        </div>
      </header>

      <section className='hero-section'>
        <div className='hero-copy'>
          <h1>Build professional websites with AI in minutes</h1>
          <p>Transform your ideas into modern, responsive and production-grade code. No design skills required.</p>
          <div className='hero-actions'>
            <button className='button primary-button' onClick={() => userData ? navigate('/generate-profile') : navigate('/login')}>Generate Website</button>
          </div>
        </div>
        <div className='hero-graphic'>
          <div className='card-gradient'>AI powered page with component-friendly structure</div>
        </div>
      </section>

      <section className='demo-section'>
        <h2>How It Works</h2>
        <div className='demo-container'>
          <div className='demo-prompt'>
            <h3>Sample Prompt</h3>
            <div className='prompt-box'>
              Create a modern landing page for a tech startup with hero section, features, and contact form
            </div>
          </div>
          <div className='demo-preview'>
            <h3>Generated Website Preview</h3>
            <div className='preview-mockup'>
              <div className='mockup-header'>Header</div>
              <div className='mockup-hero'>Hero Section</div>
              <div className='mockup-features'>Features Grid</div>
              <div className='mockup-footer'>Footer</div>
            </div>
          </div>
        </div>
      </section>

      <section id='features' className='features-section'>
        <h2>What makes GenWebAI special</h2>
        <div className='features-grid'>
          {highlights.map((item, i) => (
            <article key={i} className='feature-card'>
              <span className='feature-icon'>{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      

      <section id='about' className='about-section'>
        <h2>Trusted by developers and agencies</h2>
        <p>GenWebAI delivers complete website templates built to scale, with enhanced performance and clean architecture. You can tweak it in VS Code right away.</p>
      </section>

      <section id='cta' className='cta-section'>
        <h2>Ready to launch your next project?</h2>
        <p>Start with a prompt and get a polished, adaptive UI instantly.</p>
        <button className='button primary-button' onClick={() => userData? navigate("/generate-profile"):navigate("/login")}>
          Generate My Website
        </button>
      </section>

      <footer className='site-footer'>
        <div>&copy; {new Date().getFullYear()} GenWebAI</div>
        <div className='footer-links'>
          <Link to='#terms'>Terms</Link>
          <Link to='#privacy'>Privacy</Link>
          <Link to='#contact'>Contact</Link>
        </div>
      </footer>

      
    </div>
  )
}

export default Home