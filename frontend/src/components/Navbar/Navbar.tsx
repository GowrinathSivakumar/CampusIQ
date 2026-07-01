import { useState, useEffect } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'AI Assistant', href: '#ai' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleLinkClick = () => setMobileOpen(false)

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <span className={styles.logo}>
            Campus<span className={styles.logoAccent}>IQ</span>
          </span>

          <div className={styles.navLinks}>
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
            <button className={styles.loginBtn}>Login</button>
          </div>

          <button
            className={styles.menuBtn}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <HiMenu />
          </button>
        </div>
      </nav>

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}>
        <button
          className={styles.closeBtn}
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <HiX />
        </button>
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.mobileNavLink}
            onClick={handleLinkClick}
          >
            {link.label}
          </a>
        ))}
        <button className={styles.mobileLoginBtn} onClick={handleLinkClick}>
          Login
        </button>
      </div>
    </>
  )
}
