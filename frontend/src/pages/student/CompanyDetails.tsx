import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import {
  Building2,
  Globe,
  MapPin,
  ChevronRight,
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Target,
  ClipboardList,
  Layers,
  Lightbulb,
  Link2,
} from 'lucide-react'
import './CompanyDetails.css'

interface Round {
  name: string
  description: string
  duration: string
}

interface CompanyData {
  id: number
  name: string
  overview: string
  website: string
  location: string
  eligibility: string[]
  process: string[]
  rounds: Round[]
  tips: string[]
  resources: { title: string; url: string }[]
}

const companiesData: Record<number, CompanyData> = {
  1: {
    id: 1,
    name: 'Zoho Corporation',
    overview: 'Zoho Corporation is a leading Indian multinational technology company that develops a wide range of web-based business tools, including office suites, CRM, and enterprise software. With over 55 million users worldwide, Zoho is known for its innovative products and strong engineering culture.',
    website: 'https://www.zoho.com',
    location: 'Chennai, Tamil Nadu',
    eligibility: [
      'B.E / B.Tech in CSE, IT, ECE, EEE',
      '70% and above in 10th, 12th, and UG',
      'No active backlogs',
      '2024 or 2025 passing year',
    ],
    process: [
      'Online Assessment',
      'Aptitude Test',
      'Coding Round',
      'Technical Interview',
      'HR Interview',
    ],
    rounds: [
      { name: 'Aptitude', description: 'Quantitative aptitude, logical reasoning, and verbal ability questions covering topics like percentages, ratios, data interpretation, and critical thinking.', duration: '60 mins' },
      { name: 'Coding', description: 'Problem-solving using programming languages like Java, C++, or Python. Focus on data structures and algorithms.', duration: '90 mins' },
      { name: 'Technical', description: 'Core CS fundamentals including DSA, DBMS, OS, networking, and OOP concepts. In-depth discussion of projects.', duration: '45 mins' },
      { name: 'HR', description: 'Behavioral questions, communication skills assessment, cultural fit, and career aspirations discussion.', duration: '30 mins' },
    ],
    tips: [
      'Master at least one programming language deeply (preferably Java or C++)',
      'Practice data structures and algorithms daily on platforms like LeetCode',
      'Be thorough with Object-Oriented Programming concepts',
      'Prepare for aptitude with focus on logical reasoning',
      'Work on communication skills for the HR round',
    ],
    resources: [
      { title: 'Zoho Official Careers', url: 'https://careers.zoho.com' },
      { title: 'LeetCode - Zoho Questions', url: 'https://leetcode.com' },
      { title: 'GeeksforGeeks - Zoho Interview Prep', url: 'https://geeksforgeeks.org' },
    ],
  },
  2: {
    id: 2,
    name: 'TCS',
    overview: 'Tata Consultancy Services (TCS) is India\'s largest IT services company and a global leader in technology services, digital, and business solutions. With a presence in over 46 countries, TCS offers a wide range of IT services, consulting, and business solutions.',
    website: 'https://www.tcs.com',
    location: 'Mumbai, Maharashtra',
    eligibility: [
      'B.E / B.Tech / M.E / M.Tech / MCA / M.Sc',
      '60% and above in 10th, 12th, and UG',
      'No active backlogs at time of application',
      '2024 or 2025 passing year',
    ],
    process: [
      'Online Application',
      'TCS NQT (National Qualifier Test)',
      'Technical Interview',
      'HR Interview',
    ],
    rounds: [
      { name: 'Aptitude', description: 'Numerical ability, verbal ability, and logical reasoning sections. Includes time and work, probability, and data sufficiency.', duration: '80 mins' },
      { name: 'Coding', description: 'Two coding problems of moderate difficulty. Languages allowed include C, C++, Java, and Python.', duration: '60 mins' },
      { name: 'Technical', description: 'Programming concepts, database management systems, operating systems, and project discussion.', duration: '40 mins' },
      { name: 'HR', description: 'General HR questions, communication skills, and alignment with company values.', duration: '20 mins' },
    ],
    tips: [
      'Focus on TCS NQT preparation with emphasis on aptitude',
      'Practice coding problems from previous TCS papers',
      'Be confident in explaining your academic projects',
      'Prepare for common HR questions and situational scenarios',
    ],
    resources: [
      { title: 'TCS Careers', url: 'https://careers.tcs.com' },
      { title: 'TCS NQT Preparation', url: 'https://www.tcs.com/careers' },
      { title: 'GeeksforGeeks - TCS Prep', url: 'https://geeksforgeeks.org' },
    ],
  },
  3: {
    id: 3,
    name: 'Amazon',
    overview: 'Amazon is a global e-commerce and cloud computing giant. Known for its customer-centric approach and innovation, Amazon offers diverse career opportunities in software development, data science, and cloud infrastructure.',
    website: 'https://www.amazon.com',
    location: 'Bengaluru, Karnataka',
    eligibility: [
      'B.E / B.Tech in any discipline',
      '7.5 CGPA and above preferred',
      'No active backlogs',
      '2024 or 2025 passing year',
    ],
    process: [
      'Online Assessment',
      'Technical Phone Screen',
      'On-site Interviews (4-5 rounds)',
      'Bar Raiser Round',
    ],
    rounds: [
      { name: 'Aptitude', description: 'Online assessment with logical reasoning, data interpretation, and basic math skills.', duration: '45 mins' },
      { name: 'Coding', description: 'Algorithmic coding challenges on data structures, arrays, strings, and dynamic programming.', duration: '90 mins' },
      { name: 'Technical', description: 'System design, scalability, data structures, algorithms, and Amazon leadership principles.', duration: '60 mins' },
      { name: 'HR', description: 'Behavioral assessment based on Amazon leadership principles. STAR format responses expected.', duration: '45 mins' },
    ],
    tips: [
      'Internalize Amazon leadership principles',
      'Practice system design questions thoroughly',
      'Use STAR method for behavioral questions',
      'Focus on scalable, customer-obsessed solutions',
    ],
    resources: [
      { title: 'Amazon Jobs', url: 'https://www.amazon.jobs' },
      { title: 'LeetCode - Amazon Questions', url: 'https://leetcode.com' },
      { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer' },
    ],
  },
  4: {
    id: 4,
    name: 'Google',
    overview: 'Google is a global technology leader in search, cloud computing, AI, and digital advertising. Known for its engineering excellence and innovative culture, Google hires top talent for challenging technical roles.',
    website: 'https://www.google.com',
    location: 'Bengaluru, Karnataka / Hyderabad, Telangana',
    eligibility: [
      'B.E / B.Tech / M.Tech in CS or related fields',
      'Strong academic record preferred',
      'No active backlogs',
      '2024 or 2025 passing year',
    ],
    process: [
      'Online Application',
      'Coding Assessments',
      'Technical Phone Interview',
      'On-site Interviews (4-5 rounds)',
      'Hiring Committee Review',
    ],
    rounds: [
      { name: 'Aptitude', description: 'Cognitive ability assessment including logical reasoning, problem-solving, and analytical thinking.', duration: '30 mins' },
      { name: 'Coding', description: 'Complex algorithmic problems on Google\'s coding platform. Focus on optimal time and space complexity.', duration: '90 mins' },
      { name: 'Technical', description: 'Deep dive into algorithms, data structures, system design, and Google-specific technologies.', duration: '45 mins' },
      { name: 'HR', description: 'Behavioral assessment, cultural fit, and discussion of Google\'s mission and values.', duration: '30 mins' },
    ],
    tips: [
      'Master data structures and algorithms at an advanced level',
      'Practice on LeetCode with Google-tagged problems',
      'Understand system design and scalability concepts',
      'Prepare for open-ended problem-solving discussions',
    ],
    resources: [
      { title: 'Google Careers', url: 'https://careers.google.com' },
      { title: 'LeetCode - Google Questions', url: 'https://leetcode.com' },
      { title: 'Google Tech Dev Guide', url: 'https://techdevguide.withgoogle.com' },
    ],
  },
  5: {
    id: 5,
    name: 'Microsoft',
    overview: 'Microsoft is the world\'s largest software company, empowering digital transformation through its platforms, products, and services including Azure, Office 365, and AI solutions.',
    website: 'https://www.microsoft.com',
    location: 'Hyderabad, Telangana / Bengaluru, Karnataka',
    eligibility: [
      'B.E / B.Tech / M.Tech in CS, IT, or related fields',
      '7.0 CGPA and above',
      'No active backlogs',
      '2024 or 2025 passing year',
    ],
    process: [
      'Online Application',
      'Coding Test',
      'Technical Interviews (3-4 rounds)',
      'Hiring Manager Discussion',
    ],
    rounds: [
      { name: 'Aptitude', description: 'Logical reasoning, analytical thinking, and basic quantitative aptitude.', duration: '45 mins' },
      { name: 'Coding', description: 'Data structures and algorithms problems on platforms like Codility or Microsoft\'s own assessment.', duration: '90 mins' },
      { name: 'Technical', description: 'System design, object-oriented design, debugging, and code review exercises.', duration: '60 mins' },
      { name: 'HR', description: 'Behavioral questions, team collaboration, and alignment with Microsoft\'s growth mindset culture.', duration: '30 mins' },
    ],
    tips: [
      'Practice coding on Microsoft\'s interview platform',
      'Focus on system design and low-level design',
      'Prepare to discuss your past projects and internships',
      'Understand Microsoft\'s product ecosystem',
    ],
    resources: [
      { title: 'Microsoft Careers', url: 'https://careers.microsoft.com' },
      { title: 'LeetCode - Microsoft Questions', url: 'https://leetcode.com' },
      { title: 'Microsoft Learn', url: 'https://learn.microsoft.com' },
    ],
  },
  6: {
    id: 6,
    name: 'Infosys',
    overview: 'Infosys is a global leader in next-generation digital services and consulting. With over 300,000 employees, Infosys helps clients navigate their digital transformation journey.',
    website: 'https://www.infosys.com',
    location: 'Bengaluru, Karnataka',
    eligibility: [
      'B.E / B.Tech / MCA / M.Sc (CS/IT)',
      '60% and above in 10th, 12th, and UG',
      'No active backlogs',
      '2024 or 2025 passing year',
    ],
    process: [
      'Online Registration',
      'InfyTQ / Infosys Certification',
      'Technical Interview',
      'HR Interview',
    ],
    rounds: [
      { name: 'Aptitude', description: 'Quantitative aptitude, logical reasoning, and verbal ability as part of InfyTQ assessment.', duration: '60 mins' },
      { name: 'Coding', description: 'Python or Java-based coding problems focusing on logic building and basic algorithms.', duration: '60 mins' },
      { name: 'Technical', description: 'Programming fundamentals, database concepts, and project discussion.', duration: '30 mins' },
      { name: 'HR', description: 'Communication skills, flexibility, and willingness to relocate.', duration: '20 mins' },
    ],
    tips: [
      'Complete the InfyTQ certification for direct interview opportunity',
      'Focus on Python or Java programming',
      'Prepare SQL and database concepts',
      'Be ready to discuss your academic projects',
    ],
    resources: [
      { title: 'Infosys Careers', url: 'https://www.infosys.com/careers' },
      { title: 'InfyTQ Portal', url: 'https://infytq.infosys.com' },
      { title: 'GeeksforGeeks - Infosys Prep', url: 'https://geeksforgeeks.org' },
    ],
  },
  7: {
    id: 7,
    name: 'Wipro',
    overview: 'Wipro is a leading technology services and consulting company focused on building innovative solutions for clients across industries. Wipro is known for its strong training programs and diverse work culture.',
    website: 'https://www.wipro.com',
    location: 'Bengaluru, Karnataka',
    eligibility: [
      'B.E / B.Tech / MCA / M.Sc',
      '60% and above in 10th, 12th, and UG',
      'No active backlogs',
      '2024 or 2025 passing year',
    ],
    process: [
      'Online Application',
      'Wipro NLTH / Wipro Turbo Test',
      'Technical Interview',
      'HR Interview',
    ],
    rounds: [
      { name: 'Aptitude', description: 'Numerical ability, verbal reasoning, and logical reasoning sections in the Wipro assessment.', duration: '60 mins' },
      { name: 'Coding', description: 'Basic programming problems to test logic and coding ability in C, Java, or Python.', duration: '45 mins' },
      { name: 'Technical', description: 'CS fundamentals, programming concepts, and knowledge of databases and networking.', duration: '30 mins' },
      { name: 'HR', description: 'Communication, attitude, and role fitment discussion.', duration: '20 mins' },
    ],
    tips: [
      'Prepare for Wipro NLTH English and aptitude sections',
      'Practice basic coding problems from previous Wipro tests',
      'Be prepared to explain your projects in detail',
      'Focus on communication skills for the HR round',
    ],
    resources: [
      { title: 'Wipro Careers', url: 'https://careers.wipro.com' },
      { title: 'GeeksforGeeks - Wipro Prep', url: 'https://geeksforgeeks.org' },
    ],
  },
  8: {
    id: 8,
    name: 'Cognizant',
    overview: 'Cognizant is a multinational technology services and consulting company. It provides IT services, digital, and business consulting services to clients across industries worldwide.',
    website: 'https://www.cognizant.com',
    location: 'Chennai, Tamil Nadu',
    eligibility: [
      'B.E / B.Tech / MCA / M.Sc (CS/IT)',
      '60% and above in 10th, 12th, and UG',
      'No active backlogs',
      '2024 or 2025 passing year',
    ],
    process: [
      'Online Registration',
      'Online Test (Aptitude + Coding)',
      'Technical Interview',
      'HR Interview',
    ],
    rounds: [
      { name: 'Aptitude', description: 'Quantitative aptitude, logical reasoning, and verbal English skills assessment.', duration: '60 mins' },
      { name: 'Coding', description: 'Programming questions in Java, C++, or Python focusing on logic and problem-solving.', duration: '45 mins' },
      { name: 'Technical', description: 'OOP concepts, database basics, web technologies, and project discussion.', duration: '30 mins' },
      { name: 'HR', description: 'Communication skills, flexibility, and interest in the IT services domain.', duration: '20 mins' },
    ],
    tips: [
      'Practice aptitude questions regularly',
      'Prepare OOP and database concepts thoroughly',
      'Focus on SQL queries and basic web technologies',
      'Be confident during the HR discussion about role preferences',
    ],
    resources: [
      { title: 'Cognizant Careers', url: 'https://careers.cognizant.com' },
      { title: 'GeeksforGeeks - Cognizant Prep', url: 'https://geeksforgeeks.org' },
    ],
  },
  9: {
    id: 9,
    name: 'Accenture',
    overview: 'Accenture is a global professional services company with leading capabilities in digital, cloud, and security. Combining unmatched experience and specialized skills across more than 40 industries.',
    website: 'https://www.accenture.com',
    location: 'Bengaluru, Karnataka / Mumbai, Maharashtra',
    eligibility: [
      'B.E / B.Tech / MCA / M.Sc (CS/IT)',
      '60% and above in 10th, 12th, and UG',
      'No active backlogs',
      '2024 or 2025 passing year',
    ],
    process: [
      'Online Application',
      'Cognitive and Technical Assessment',
      'Coding Assessment',
      'HR Interview',
    ],
    rounds: [
      { name: 'Aptitude', description: 'Cognitive ability, logical reasoning, and numerical reasoning sections.', duration: '60 mins' },
      { name: 'Coding', description: 'Pseudocode and programming logic questions. Languages include Java, C++, and Python.', duration: '45 mins' },
      { name: 'Technical', description: 'CS fundamentals, programming concepts, cloud basics, and project experience discussion.', duration: '30 mins' },
      { name: 'HR', description: 'Communication skills, interest in consulting, and willingness to work across domains.', duration: '20 mins' },
    ],
    tips: [
      'Focus on the cognitive assessment sections',
      'Practice pseudocode and programming logic',
      'Prepare for cloud computing basics',
      'Be clear about your interest in consulting roles',
    ],
    resources: [
      { title: 'Accenture Careers', url: 'https://www.accenture.com/in-en/careers' },
      { title: 'GeeksforGeeks - Accenture Prep', url: 'https://geeksforgeeks.org' },
    ],
  },
  10: {
    id: 10,
    name: 'HCL Technologies',
    overview: 'HCL Technologies is a global technology company helping enterprises reimagine their businesses for the digital age. HCL offers IT services, engineering services, and digital solutions.',
    website: 'https://www.hcltech.com',
    location: 'Noida, Uttar Pradesh',
    eligibility: [
      'B.E / B.Tech / MCA / M.Sc (CS/IT)',
      '60% and above in 10th, 12th, and UG',
      'No active backlogs',
      '2024 or 2025 passing year',
    ],
    process: [
      'Online Application',
      'Online Aptitude Test',
      'Technical Interview',
      'HR Interview',
    ],
    rounds: [
      { name: 'Aptitude', description: 'Quantitative aptitude, logical reasoning, and verbal ability assessment.', duration: '60 mins' },
      { name: 'Coding', description: 'Basic programming questions in C, C++, or Java to assess problem-solving skills.', duration: '45 mins' },
      { name: 'Technical', description: 'Programming languages, databases, networking, and project discussion.', duration: '30 mins' },
      { name: 'HR', description: 'Communication, willingness to relocate, and role alignment.', duration: '20 mins' },
    ],
    tips: [
      'Prepare for aptitude with focus on speed and accuracy',
      'Practice coding in C++ or Java',
      'Be ready to discuss your projects and internships',
      'Emphasize flexibility and eagerness to learn during HR',
    ],
    resources: [
      { title: 'HCL Careers', url: 'https://www.hcltech.com/careers' },
      { title: 'GeeksforGeeks - HCL Prep', url: 'https://geeksforgeeks.org' },
    ],
  },
}

const fallbackCompany: CompanyData = {
  id: 0,
  name: 'Company',
  overview: 'Company details are being updated. Please check back later.',
  website: '#',
  location: 'India',
  eligibility: ['Details coming soon'],
  process: ['Details coming soon'],
  rounds: [
    { name: 'Aptitude', description: 'Details coming soon.', duration: 'TBD' },
    { name: 'Coding', description: 'Details coming soon.', duration: 'TBD' },
    { name: 'Technical', description: 'Details coming soon.', duration: 'TBD' },
    { name: 'HR', description: 'Details coming soon.', duration: 'TBD' },
  ],
  tips: ['Details coming soon.'],
  resources: [],
}

const defaultLogos: Record<string, string> = {
  'Zoho': '#1a73e8',
  'TCS': '#312783',
  'Amazon': '#ff9900',
  'Google': '#4285f4',
  'Microsoft': '#00a4ef',
  'Infosys': '#007cc3',
  'Wipro': '#341170',
  'Cognizant': '#0a2885',
  'Accenture': '#a100ff',
  'HCL': '#006bb7',
}

export default function CompanyDetails() {
  const { id } = useParams<{ id: string }>()
  const [bookmarked, setBookmarked] = useState(false)

  const company = companiesData[Number(id)] || { ...fallbackCompany, name: `Company #${id}` }
  const logoColor = defaultLogos[company.name.split(' ')[0]] || '#6366f1'

  return (
    <div className="company-details">
      <div className="company-details-breadcrumb">
        <Link to="/student/companies" className="company-details-breadcrumb-link">
          <ArrowLeft size={16} />
          <span>Back to Companies</span>
        </Link>
        <div className="company-details-breadcrumb-path">
          <Link to="/student/dashboard">Dashboard</Link>
          <ChevronRight size={14} />
          <Link to="/student/companies">Companies</Link>
          <ChevronRight size={14} />
          <span>{company.name}</span>
        </div>
      </div>

      <div className="company-details-hero">
        <div className="company-details-hero-info">
          <div className="company-details-hero-logo" style={{ background: `linear-gradient(135deg, ${logoColor}, ${logoColor}cc)` }}>
            <span>{company.name.charAt(0)}</span>
          </div>
          <div className="company-details-hero-text">
            <h1 className="company-details-name">{company.name}</h1>
            <div className="company-details-meta">
              <span className="company-details-meta-item">
                <MapPin size={14} />
                {company.location}
              </span>
              <span className="company-details-meta-item">
                <Globe size={14} />
                <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website.replace('https://', '')}</a>
                <ExternalLink size={12} />
              </span>
            </div>
          </div>
        </div>
        <button
          className={`company-details-bookmark ${bookmarked ? 'bookmarked' : ''}`}
          onClick={() => setBookmarked(!bookmarked)}
        >
          {bookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
        </button>
      </div>

      <div className="company-details-grid">
        <div className="company-details-main">
          <section className="company-details-section">
            <h2 className="company-details-section-title">
              <Building2 size={20} />
              Company Overview
            </h2>
            <p className="company-details-text">{company.overview}</p>
          </section>

          <section className="company-details-section">
            <h2 className="company-details-section-title">
              <Target size={20} />
              Eligibility Criteria
            </h2>
            <ul className="company-details-list">
              {company.eligibility.map((item, i) => (
                <li key={i} className="company-details-list-item">{item}</li>
              ))}
            </ul>
          </section>

          <section className="company-details-section">
            <h2 className="company-details-section-title">
              <ClipboardList size={20} />
              Hiring Process
            </h2>
            <div className="company-details-process">
              {company.process.map((step, i) => (
                <div key={i} className="company-details-process-step">
                  <span className="company-details-process-number">0{i + 1}</span>
                  <span className="company-details-process-label">{step}</span>
                  {i < company.process.length - 1 && <span className="company-details-process-line" />}
                </div>
              ))}
            </div>
          </section>

          <section className="company-details-section">
            <h2 className="company-details-section-title">
              <Layers size={20} />
              Previous Drive Details
            </h2>
            <div className="company-details-rounds">
              {company.rounds.map((round, i) => (
                <div key={i} className="company-details-round-card">
                  <div className="company-details-round-header">
                    <div className="company-details-round-title">
                      <span className="company-details-round-badge">Round {i + 1}</span>
                      <h3 className="company-details-round-name">{round.name}</h3>
                    </div>
                    <span className="company-details-round-duration">{round.duration}</span>
                  </div>
                  <p className="company-details-round-desc">{round.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="company-details-section">
            <h2 className="company-details-section-title">
              <Lightbulb size={20} />
              Preparation Tips
            </h2>
            <ul className="company-details-list">
              {company.tips.map((tip, i) => (
                <li key={i} className="company-details-list-item">{tip}</li>
              ))}
            </ul>
          </section>

          {company.resources.length > 0 && (
            <section className="company-details-section">
              <h2 className="company-details-section-title">
                <Link2 size={20} />
                Useful Resources
              </h2>
              <div className="company-details-resources">
                {company.resources.map((resource, i) => (
                  <a key={i} href={resource.url} target="_blank" rel="noopener noreferrer" className="company-details-resource-link">
                    <span>{resource.title}</span>
                    <ExternalLink size={14} />
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="company-details-sidebar">
          <div className="company-details-sidebar-card">
            <h3 className="company-details-sidebar-title">Quick Info</h3>
            <div className="company-details-sidebar-stats">
              <div className="company-details-sidebar-stat">
                <span className="company-details-sidebar-stat-label">Eligibility</span>
                <span className="company-details-sidebar-stat-value">{company.eligibility.length} criteria</span>
              </div>
              <div className="company-details-sidebar-stat">
                <span className="company-details-sidebar-stat-label">Process Steps</span>
                <span className="company-details-sidebar-stat-value">{company.process.length}</span>
              </div>
              <div className="company-details-sidebar-stat">
                <span className="company-details-sidebar-stat-label">Rounds</span>
                <span className="company-details-sidebar-stat-value">{company.rounds.length}</span>
              </div>
              <div className="company-details-sidebar-stat">
                <span className="company-details-sidebar-stat-label">Tips</span>
                <span className="company-details-sidebar-stat-value">{company.tips.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
