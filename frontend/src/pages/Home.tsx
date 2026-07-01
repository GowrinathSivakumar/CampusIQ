import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import Features from '../components/Features/Features'
import HowItWorks from '../components/HowItWorks/HowItWorks'
import AISection from '../components/AISection/AISection'
import Statistics from '../components/Statistics/Statistics'
import Footer from '../components/Footer/Footer'
import styles from './Home.module.css'

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <Hero />
        <About />
        <Features />
        <HowItWorks />
        <AISection />
        <Statistics />
      </main>
      <Footer />
    </div>
  )
}
