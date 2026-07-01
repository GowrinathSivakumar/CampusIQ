import { HiMail, HiGlobe } from 'react-icons/hi'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import styles from './Footer.module.css'

const QUICK_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'AI Assistant', href: '#ai' },
  { label: 'How It Works', href: '#how-it-works' },
]

const RESOURCES = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Help Center', href: '#' },
  { label: 'Documentation', href: '#' },
]

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <span className={styles.logo}>
              Campus<span className={styles.logoAccent}>IQ</span>
            </span>
            <p className={styles.brandDesc}>
              AI-Powered Campus Placement Intelligence Platform — transforming
              historical placement data into actionable insights for students.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="mailto:hello@campusiq.com" className={styles.socialLink} aria-label="Email">
                <HiMail />
              </a>
            </div>
          </div>

          <div>
            <h4 className={styles.columnTitle}>Quick Links</h4>
            <div className={styles.columnLinks}>
              {QUICK_LINKS.map((link) => (
                <a key={link.label} href={link.href} className={styles.columnLink}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className={styles.columnTitle}>Resources</h4>
            <div className={styles.columnLinks}>
              {RESOURCES.map((link) => (
                <a key={link.label} href={link.href} className={styles.columnLink}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className={styles.columnTitle}>Contact</h4>
            <div className={styles.columnLinks}>
              <a href="mailto:hello@campusiq.com" className={styles.columnLink}>
                hello@campusiq.com
              </a>
              <a href="#" className={styles.columnLink}>
                <HiGlobe /> campusiq.com
              </a>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <span className={styles.copyright}>
            &copy; {new Date().getFullYear()} CampusIQ. All rights reserved.
          </span>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink}>Privacy</a>
            <a href="#" className={styles.bottomLink}>Terms</a>
            <a href="#" className={styles.bottomLink}>Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
