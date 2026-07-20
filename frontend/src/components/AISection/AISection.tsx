import { motion } from 'framer-motion'
import { HiSparkles, HiPaperAirplane } from 'react-icons/hi'
import styles from './AISection.module.css'



const PROMPTS = [
  {
    label: 'Technical Prep',
    text: '"What Java questions were asked by TCS in the last 3 years?"',
  },
  {
    label: 'Company Comparison',
    text: '"Compare Cognizant and Infosys based on packages and hiring trends."',
  },
  {
    label: 'HR Round',
    text: '"Show previous HR interview questions asked by top recruiters."',
  },
]

export default function AISection() {
  return (
    <section id="ai" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.label}>
            <HiSparkles />
            AI Assistant
          </span>
          <h2 className={styles.heading}>
            Your Placement Intelligence, On Demand
          </h2>
          <p className={styles.subtitle}>
            Ask anything about placements. Our AI is trained on your college
            data and delivers precise, contextual answers.
          </p>
        </motion.div>

        <div className={styles.grid}>
          <motion.div
            className={styles.chatCard}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.chatHeader}>
              <div className={styles.chatAvatar}>
                <HiSparkles />
              </div>
              <div className={styles.chatHeaderInfo}>
                <div className={styles.chatHeaderTitle}>CampusIQ Assistant</div>
                <div className={styles.chatHeaderStatus}>Online — Trained on your campus data</div>
              </div>
              <span className={styles.chatHeaderBadge}>AI</span>
            </div>

            <div className={styles.chatBody}>
              <div className={`${styles.chatMessage} ${styles.chatMessageBot}`}>
                <div className={styles.chatAvatarSmall}>
                  <HiSparkles />
                </div>
                <div className={`${styles.chatBubble} ${styles.chatBubbleBot}`}>
                  Hi! I can help you with placement questions. Try asking about
                  company questions, trends, or interview tips.
                </div>
              </div>

              <div className={`${styles.chatMessage} ${styles.chatMessageUser}`}>
                <div className={`${styles.chatBubble} ${styles.chatBubbleUser}`}>
                  What Java questions were asked by TCS?
                </div>
              </div>

              <div className={`${styles.chatMessage} ${styles.chatMessageBot}`}>
                <div className={styles.chatAvatarSmall}>
                  <HiSparkles />
                </div>
                <div className={`${styles.chatBubble} ${styles.chatBubbleBot}`}>
                  Based on TCS campus drives (2023-2025), common Java questions
                  include: OOPs concepts, Collections framework, Multithreading,
                  Exception handling, and SQL basics. Here are 3 specific
                  questions asked...
                </div>
              </div>
            </div>

            <div className={styles.chatInput}>
              <input
                type="text"
                className={styles.chatInputField}
                placeholder="Ask about placements..."
                readOnly
              />
              <button className={styles.chatSendBtn} aria-label="Send message">
                <HiPaperAirplane />
              </button>
            </div>
          </motion.div>

          <div className={styles.prompts}>
            <motion.p
              className={styles.subtitle}
              style={{ marginBottom: '0.5rem', opacity: 0.6 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Try asking
            </motion.p>
            {PROMPTS.map((prompt, i) => (
              <motion.div
                key={prompt.label}
                className={styles.promptCard}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className={styles.promptLabel}>{prompt.label}</div>
                <div className={styles.promptText}>{prompt.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
