import { motion } from 'framer-motion'
import { HiLightBulb, HiChartBar, HiAcademicCap } from 'react-icons/hi'
import styles from './About.module.css'

const COMPARISONS = [
  {
    icon: <HiLightBulb />,
    title: 'Not a Placement Portal',
    desc: 'We don\'t list upcoming drives. We surface historical intelligence — past questions, company patterns, and trends.',
  },
  {
    icon: <HiChartBar />,
    title: 'Data-Driven Preparation',
    desc: 'Analyze hiring patterns, package trends, and role distributions across companies that visit your campus.',
  },
  {
    icon: <HiAcademicCap />,
    title: 'Learn from Experiences',
    desc: 'Read real interview experiences from seniors who have been through the process at your very own campus.',
  },
]

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>About CampusIQ</span>
          <h2 className={styles.heading}>
            Beyond Placement Portals —<br />Pure Intelligence
          </h2>
          <p className={styles.description}>
            CampusIQ is a Placement Intelligence Platform. Unlike traditional
            portals that focus on upcoming drives, we organize and surface
            historical placement data so you can prepare with context and
            confidence.
          </p>

          <div className={styles.comparison}>
            {COMPARISONS.map((item, i) => (
              <motion.div
                key={item.title}
                className={styles.comparisonItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className={styles.comparisonIcon}>{item.icon}</div>
                <div className={styles.comparisonText}>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.insightCard}>
            <div className={styles.cardLabel}>Company Intelligence</div>
            <div className={styles.cardTitle}>
              Infosys — Software Engineer
            </div>
            <div className={styles.cardStat}>
              <span className={styles.cardStatName}>Avg Package</span>
              <span className={styles.cardStatValue}>₹9.2 LPA</span>
            </div>
            <div className={styles.cardStatBar}>
              <div className={styles.cardStatFill} style={{ width: '85%' }} />
            </div>
            <div className={styles.cardDivider} />
            <div className={styles.cardStat}>
              <span className={styles.cardStatName}>Hiring Trend</span>
              <span className={styles.cardStatValue}>+12%</span>
            </div>
            <div className={styles.cardStatBar}>
              <div className={styles.cardStatFill} style={{ width: '72%' }} />
            </div>
            <div className={styles.cardDivider} />
            <div className={styles.cardStat}>
              <span className={styles.cardStatName}>Questions Bank</span>
              <span className={styles.cardStatValue}>340+</span>
            </div>
            <div className={styles.cardStatBar}>
              <div className={styles.cardStatFill} style={{ width: '95%' }} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
