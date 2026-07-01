import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { HiOfficeBuilding, HiAnnotation, HiDocumentText, HiUserGroup } from 'react-icons/hi'
import styles from './Statistics.module.css'

const STATS = [
  { icon: <HiOfficeBuilding />, target: 48, suffix: '+', label: 'Companies Archived' },
  { icon: <HiAnnotation />, target: 1200, suffix: '+', label: 'Interview Questions' },
  { icon: <HiDocumentText />, target: 3400, suffix: '+', label: 'Placement Records' },
  { icon: <HiUserGroup />, target: 860, suffix: '+', label: 'Student Experiences' },
]

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.round(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref} className={styles.number}>
      {count}
      <span className={styles.suffix}>{suffix}</span>
    </div>
  )
}

export default function Statistics() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.label}>Our Impact</span>
          <h2 className={styles.heading}>Built on Real Campus Data</h2>
          <p className={styles.subtitle}>
            Every number represents real data collected and organized from
            campus placement drives.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className={styles.cardIcon}>{stat.icon}</div>
              <AnimatedNumber target={stat.target} suffix={stat.suffix} />
              <div className={styles.label}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
