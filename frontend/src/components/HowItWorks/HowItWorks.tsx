import { motion } from 'framer-motion'
import { HiUpload, HiChip, HiSearch, HiChat } from 'react-icons/hi'
import styles from './HowItWorks.module.css'

const STEPS = [
  {
    icon: <HiUpload />,
    title: 'Data Upload',
    desc: 'Admin uploads historical placement data — company wise records, questions, and experiences.',
  },
  {
    icon: <HiChip />,
    title: 'AI Organization',
    desc: 'Our AI processes and structures the data into insightful company profiles and question banks.',
  },
  {
    icon: <HiSearch />,
    title: 'Explore & Analyze',
    desc: 'Students search companies, browse questions, compare packages, and analyze placement trends.',
  },
  {
    icon: <HiChat />,
    title: 'Ask AI',
    desc: 'Students ask placement-specific questions and get instant, data-backed answers from the AI assistant.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.label}>How It Works</span>
          <h2 className={styles.heading}>From Data to Intelligence</h2>
          <p className={styles.subtitle}>
            CampusIQ transforms raw placement data into actionable insights in
            four simple steps.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              className={styles.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className={styles.stepNumber}>
                <span className={styles.stepIcon}>{step.icon}</span>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
