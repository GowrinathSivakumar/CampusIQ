import { motion } from 'framer-motion'
import {
  HiOfficeBuilding,
  HiClock,
  HiAnnotation,
  HiUserGroup,
  HiSparkles,
  HiChartBar,
} from 'react-icons/hi'
import styles from './Features.module.css'

const FEATURES = [
  {
    icon: <HiOfficeBuilding />,
    title: 'Company Intelligence',
    desc: 'Deep profiles for every recruiter — hiring patterns, packages, roles, and historical trends across campus drives.',
  },
  {
    icon: <HiClock />,
    title: 'Placement History',
    desc: 'Browse year-by-year placement stats: count, packages, branches hired, and company-wise breakups at a glance.',
  },
  {
    icon: <HiAnnotation />,
    title: 'Previous Questions',
    desc: 'Access curated question banks sorted by company, role, round, and subject — coding, technical, HR, and more.',
  },
  {
    icon: <HiUserGroup />,
    title: 'Interview Experiences',
    desc: 'Read first-hand accounts from seniors: the process, the questions, the vibe, and tips that actually helped.',
  },
  {
    icon: <HiSparkles />,
    title: 'AI Assistant',
    desc: 'Ask anything about placements. Get answers trained on your college data — questions, companies, trends, and prep tips.',
  },
  {
    icon: <HiChartBar />,
    title: 'Placement Analytics',
    desc: 'Visual dashboards with filters by year, branch, company, and role — spot patterns and plan your strategy.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function Features() {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.label}>Features</span>
          <h2 className={styles.heading}>Everything You Need to Prepare</h2>
          <p className={styles.subtitle}>
            From company deep-dives to AI-powered answers — CampusIQ gives you
            the intelligence edge for campus placements.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {FEATURES.map((feature) => (
            <motion.div key={feature.title} className={styles.card} variants={cardVariants}>
              <div className={styles.iconWrap}>{feature.icon}</div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
