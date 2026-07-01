import { motion } from 'framer-motion'
import { HiSparkles } from 'react-icons/hi'
import styles from './Hero.module.css'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className={styles.badge} variants={itemVariants}>
            <HiSparkles />
            AI-Powered Placement Intelligence
          </motion.div>

          <motion.h1 className={styles.title} variants={itemVariants}>
            Unlock Campus{' '}
            <span className={styles.titleAccent}>Placement</span> Intelligence
          </motion.h1>

          <motion.p className={styles.subtitle} variants={itemVariants}>
            Explore company histories, interview experiences, previous questions,
            placement analytics, and AI-powered insights—all in one platform.
          </motion.p>

          <motion.div className={styles.buttons} variants={itemVariants}>
            <a href="#features" className={styles.btnPrimary}>
              Explore Insights
            </a>
            <a href="#about" className={styles.btnSecondary}>
              Learn More
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.illustration}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
        >
          <div className={styles.dashboardMock}>
            <div className={styles.floatingBadge}>Analytics Preview</div>

            <div className={styles.dashboardTop}>
              <div className={styles.dashboardDots}>
                <span className={`${styles.dot} ${styles.dotRed}`} />
                <span className={`${styles.dot} ${styles.dotYellow}`} />
                <span className={`${styles.dot} ${styles.dotGreen}`} />
              </div>
              <span className={styles.dashboardTitle}>Placement Overview</span>
            </div>

            <div className={styles.dashboardContent}>
              <div className={styles.chartRow}>
                <div className={styles.chartCard}>
                  <div className={styles.chartCardLabel}>Company Hires</div>
                  <div className={styles.barChart}>
                    <div className={styles.bar} style={{ height: '48px' }} />
                    <div className={styles.bar} style={{ height: '32px' }} />
                    <div className={styles.bar} style={{ height: '56px' }} />
                    <div className={styles.bar} style={{ height: '24px' }} />
                    <div className={styles.bar} style={{ height: '40px' }} />
                  </div>
                </div>
                <div className={styles.chartCard}>
                  <div className={styles.chartCardLabel}>Placement Rate</div>
                  <div className={styles.donutChart}>
                    <div className={styles.donut}>
                      <div className={styles.donutInner}>87%</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.statRow}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>24+</div>
                  <div className={styles.statLabel}>Companies</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>1.2K</div>
                  <div className={styles.statLabel}>Questions</div>
                </div>
              </div>

              <div className={styles.listCard}>
                <div className={styles.listCardLabel}>Recent Interviews</div>
                <div className={styles.listItems}>
                  <div className={styles.listItem}>
                    <span className={styles.listDot} />
                    TCS — Digital Role
                  </div>
                  <div className={styles.listItem}>
                    <span className={styles.listDot} />
                    Infosys — SE Profile
                  </div>
                  <div className={styles.listItem}>
                    <span className={styles.listDot} />
                    Cognizant — GenC
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
