const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const User = require('../models/User');
const Company = require('../models/Company');
const Drive = require('../models/Drive');
const Question = require('../models/Question');
const Tip = require('../models/Tip');

const seedUsers = [
  { name: 'Admin', email: 'admin@campusiq.com', password: 'admin123', role: 'admin' },
  { name: 'Staff User', email: 'staff@campusiq.com', password: 'staff123', role: 'admin' },
  { name: 'Demo Student', email: 'student@campusiq.com', password: 'student123', role: 'student' },
];

const seedCompanies = [
  {
    name: 'Zoho Corporation', type: 'Software', industry: 'Information Technology', website: 'https://www.zoho.com', location: 'Chennai, Tamil Nadu',
    description: 'Zoho Corporation is a leading Indian multinational technology company that develops a wide range of web-based business tools, including office suites, CRM, and enterprise software. With over 55 million users worldwide, Zoho is known for its innovative products and strong engineering culture.',
    package: 8.5, status: 'Active', tags: ['Java', 'Python', 'React'],
    eligibility: ['B.E / B.Tech in CSE, IT, ECE, EEE', '70% and above in 10th, 12th, and UG', 'No active backlogs', '2024 or 2025 passing year'],
    process: ['Online Assessment', 'Aptitude Test', 'Coding Round', 'Technical Interview', 'HR Interview'],
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
  {
    name: 'TCS', type: 'Software', industry: 'Information Technology', website: 'https://www.tcs.com', location: 'Mumbai, Maharashtra',
    description: "Tata Consultancy Services (TCS) is India's largest IT services company and a global leader in technology services, digital, and business solutions. With a presence in over 46 countries, TCS offers a wide range of IT services, consulting, and business solutions.",
    package: 7, status: 'Active', tags: ['Java', 'SQL', 'Aptitude'],
    eligibility: ['B.E / B.Tech / M.E / M.Tech / MCA / M.Sc', '60% and above in 10th, 12th, and UG', 'No active backlogs at time of application', '2024 or 2025 passing year'],
    process: ['Online Application', 'TCS NQT (National Qualifier Test)', 'Technical Interview', 'HR Interview'],
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
  {
    name: 'Amazon', type: 'Software', industry: 'E-Commerce', website: 'https://www.amazon.com', location: 'Bengaluru, Karnataka',
    description: 'Amazon is a global e-commerce and cloud computing giant. Known for its customer-centric approach and innovation, Amazon offers diverse career opportunities in software development, data science, and cloud infrastructure.',
    package: 18, status: 'Active', tags: ['DSA', 'System Design', 'Leadership Principles'],
    eligibility: ['B.E / B.Tech in any discipline', '7.5 CGPA and above preferred', 'No active backlogs', '2024 or 2025 passing year'],
    process: ['Online Assessment', 'Technical Phone Screen', 'On-site Interviews (4-5 rounds)', 'Bar Raiser Round'],
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
  {
    name: 'Google', type: 'Software', industry: 'Information Technology', website: 'https://www.google.com', location: 'Bengaluru, Karnataka',
    description: 'Google is a global technology leader in search, cloud computing, AI, and digital advertising. Known for its engineering excellence and innovative culture, Google hires top talent for challenging technical roles.',
    package: 24, status: 'Active', tags: ['Algorithms', 'System Design', 'AI/ML'],
    eligibility: ['B.E / B.Tech / M.Tech in CS or related fields', 'Strong academic record preferred', 'No active backlogs', '2024 or 2025 passing year'],
    process: ['Online Application', 'Coding Assessments', 'Technical Phone Interview', 'On-site Interviews (4-5 rounds)', 'Hiring Committee Review'],
    rounds: [
      { name: 'Aptitude', description: 'Cognitive ability assessment including logical reasoning, problem-solving, and analytical thinking.', duration: '30 mins' },
      { name: 'Coding', description: "Complex algorithmic problems on Google's coding platform. Focus on optimal time and space complexity.", duration: '90 mins' },
      { name: 'Technical', description: 'Deep dive into algorithms, data structures, system design, and Google-specific technologies.', duration: '45 mins' },
      { name: 'HR', description: "Behavioral assessment, cultural fit, and discussion of Google's mission and values.", duration: '30 mins' },
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
  {
    name: 'Microsoft', type: 'Software', industry: 'Information Technology', website: 'https://www.microsoft.com', location: 'Hyderabad, Telangana',
    description: "Microsoft is the world's largest software company, empowering digital transformation through its platforms, products, and services including Azure, Office 365, and AI solutions.",
    package: 20, status: 'Active', tags: ['C++', 'System Design', 'Azure'],
    eligibility: ['B.E / B.Tech / M.Tech in CS, IT, or related fields', '7.0 CGPA and above', 'No active backlogs', '2024 or 2025 passing year'],
    process: ['Online Application', 'Coding Test', 'Technical Interviews (3-4 rounds)', 'Hiring Manager Discussion'],
    rounds: [
      { name: 'Aptitude', description: 'Logical reasoning, analytical thinking, and basic quantitative aptitude.', duration: '45 mins' },
      { name: 'Coding', description: "Data structures and algorithms problems on platforms like Codility or Microsoft's own assessment.", duration: '90 mins' },
      { name: 'Technical', description: 'System design, object-oriented design, debugging, and code review exercises.', duration: '60 mins' },
      { name: 'HR', description: "Behavioral questions, team collaboration, and alignment with Microsoft's growth mindset culture.", duration: '30 mins' },
    ],
    tips: [
      "Practice coding on Microsoft's interview platform",
      'Focus on system design and low-level design',
      'Prepare to discuss your past projects and internships',
      "Understand Microsoft's product ecosystem",
    ],
    resources: [
      { title: 'Microsoft Careers', url: 'https://careers.microsoft.com' },
      { title: 'LeetCode - Microsoft Questions', url: 'https://leetcode.com' },
      { title: 'Microsoft Learn', url: 'https://learn.microsoft.com' },
    ],
  },
  {
    name: 'Infosys', type: 'Software', industry: 'Information Technology', website: 'https://www.infosys.com', location: 'Bengaluru, Karnataka',
    description: 'Infosys is a global leader in next-generation digital services and consulting. With over 300,000 employees, Infosys helps clients navigate their digital transformation journey.',
    package: 6.5, status: 'Active', tags: ['Python', 'Java', 'InfyTQ'],
    eligibility: ['B.E / B.Tech / MCA / M.Sc (CS/IT)', '60% and above in 10th, 12th, and UG', 'No active backlogs', '2024 or 2025 passing year'],
    process: ['Online Registration', 'InfyTQ / Infosys Certification', 'Technical Interview', 'HR Interview'],
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
  {
    name: 'Wipro', type: 'Software', industry: 'Information Technology', website: 'https://www.wipro.com', location: 'Bengaluru, Karnataka',
    description: 'Wipro is a leading technology services and consulting company focused on building innovative solutions for clients across industries. Wipro is known for its strong training programs and diverse work culture.',
    package: 5.5, status: 'Active', tags: ['Java', 'SQL', 'Aptitude'],
    eligibility: ['B.E / B.Tech / MCA / M.Sc', '60% and above in 10th, 12th, and UG', 'No active backlogs', '2024 or 2025 passing year'],
    process: ['Online Application', 'Wipro NLTH / Wipro Turbo Test', 'Technical Interview', 'HR Interview'],
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
  {
    name: 'Accenture', type: 'Software', industry: 'Consulting', website: 'https://www.accenture.com', location: 'Bengaluru, Karnataka',
    description: 'Accenture is a global professional services company with leading capabilities in digital, cloud, and security. Combining unmatched experience and specialized skills across more than 40 industries.',
    package: 7.5, status: 'Active', tags: ['Cloud', 'Consulting', 'Digital'],
    eligibility: ['B.E / B.Tech / MCA / M.Sc (CS/IT)', '60% and above in 10th, 12th, and UG', 'No active backlogs', '2024 or 2025 passing year'],
    process: ['Online Application', 'Cognitive and Technical Assessment', 'Coding Assessment', 'HR Interview'],
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
];

const seedDrives = [
  { companyName: 'Microsoft', role: 'Software Engineer', date: new Date('2026-06-15'), studentsPlaced: 12, package: '₹45 LPA', rounds: 4, department: 'CSE, IT', description: 'Full-time software engineer role for fresh graduates' },
  { companyName: 'Google', role: 'SDE Intern', date: new Date('2026-06-10'), studentsPlaced: 8, package: '₹42 LPA', rounds: 5, department: 'CSE', description: 'Summer internship leading to full-time conversion' },
  { companyName: 'Amazon', role: 'Frontend Developer', date: new Date('2026-06-05'), studentsPlaced: 15, package: '₹38 LPA', rounds: 4, department: 'CSE', description: 'Full-stack development role with focus on frontend' },
  { companyName: 'TCS', role: 'System Engineer', date: new Date('2026-05-28'), studentsPlaced: 45, package: '₹12 LPA', rounds: 3, department: 'All', description: 'Bulk hiring for system engineering roles' },
  { companyName: 'Infosys', role: 'Associate Developer', date: new Date('2026-05-20'), studentsPlaced: 38, package: '₹14 LPA', rounds: 3, department: 'All', description: 'Entry-level developer positions across multiple teams' },
  { companyName: 'Zoho Corporation', role: 'Full Stack Developer', date: new Date('2026-05-15'), studentsPlaced: 10, package: '₹18 LPA', rounds: 4, department: 'CSE', description: 'Full-stack development with React and Node.js' },
];

const seedQuestions = [
  { question: 'Explain the difference between var, let, and const', category: 'Technical', company: 'Microsoft', difficulty: 'Easy', answer: 'var is function-scoped and can be redeclared. let is block-scoped and can be reassigned but not redeclared. const is block-scoped, cannot be reassigned or redeclared.', tags: ['JavaScript', 'Fundamentals'] },
  { question: 'Implement a function to reverse a linked list', category: 'Coding', company: 'Google', difficulty: 'Hard', answer: 'Use three pointers: prev, current, next. Iterate through the list, reversing each node pointer until current is null. Return prev as the new head.', tags: ['Linked List', 'Data Structures'] },
  { question: 'What is the OSI model? Explain each layer', category: 'Technical', company: 'Amazon', difficulty: 'Medium', answer: 'OSI has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application. Each layer provides services to the layer above it.', tags: ['Networking', 'Fundamentals'] },
  { question: 'Design a parking lot system', category: 'System Design', company: 'TCS', difficulty: 'Hard', answer: 'Use OOP to model ParkingLot, Floor, Spot, Vehicle. Implement Strategy pattern for pricing. Use Observer for notifications. Consider scalability with database design.', tags: ['OOP', 'System Design'] },
  { question: 'Explain RESTful API principles', category: 'Technical', company: 'Infosys', difficulty: 'Easy', answer: 'REST uses stateless client-server architecture. Resources are identified by URIs. Uses HTTP methods (GET, POST, PUT, DELETE). Supports JSON/XML. Follows HATEOAS.', tags: ['API', 'Web Development'] },
  { question: 'Write SQL query to find second highest salary', category: 'Coding', company: 'Zoho', difficulty: 'Medium', answer: 'Use subquery: SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees). Or use LIMIT/OFFSET or window functions like DENSE_RANK.', tags: ['SQL', 'Database'] },
  { question: 'Explain deadlock in operating systems and its prevention techniques', category: 'Technical', company: 'Google', difficulty: 'Hard', answer: 'Deadlock occurs when 4 conditions hold: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait. Prevention breaks one condition. Avoidance uses Bankers Algorithm.', tags: ['Operating System', 'Fundamentals'] },
  { question: 'Tell me about yourself and your career aspirations', category: 'HR', company: 'Amazon', difficulty: 'Easy', answer: 'Use STAR format. Start with current role/education, highlight key achievements, connect to career goals, and align with the company mission.', tags: ['HR', 'Behavioral'] },
  { question: 'What are React hooks? Explain useState and useEffect', category: 'Technical', company: 'Microsoft', difficulty: 'Easy', answer: 'Hooks let you use state and lifecycle in functional components. useState manages local state. useEffect handles side effects like API calls, with cleanup on unmount.', tags: ['React', 'Frontend'] },
  { question: 'Implement a rate limiter', category: 'System Design', company: 'Google', difficulty: 'Hard', answer: 'Use Token Bucket or Sliding Window algorithm. Token bucket adds tokens at fixed rate, requests consume tokens. Sliding window tracks requests in a time window.', tags: ['System Design', 'Algorithms'] },
  { question: 'If a train 100 m long passes a pole in 10 seconds, what is its speed?', category: 'Aptitude', company: 'TCS', difficulty: 'Easy', answer: 'Speed = Distance/Time = 100m/10s = 10 m/s = 36 km/h', tags: ['Speed', 'Distance'] },
  { question: 'Describe a time you faced a challenge and how you overcame it', category: 'HR', company: 'Google', difficulty: 'Medium', answer: 'Use STAR method. Situation: Set context. Task: Explain responsibility. Action: Describe steps taken. Result: Share measurable outcome.', tags: ['HR', 'Behavioral'] },
];

const seedTips = [
  { title: 'Master Data Structures & Algorithms', category: 'Technical', description: 'Focus on arrays, linked lists, trees, graphs, and dynamic programming. Practice daily on LeetCode or HackerRank. Start with easy problems and gradually move to hard ones.', company: '', tags: ['DSA', 'Practice'], status: 'Published' },
  { title: 'How to Ace HR Interviews', category: 'Soft Skills', description: 'Prepare your elevator pitch using the STAR method. Research the company culture. Practice common behavioral questions. Maintain positive body language and confident communication.', company: '', tags: ['HR', 'Communication'], status: 'Published' },
  { title: 'Top 50 System Design Questions', category: 'System Design', description: 'Study scalable architecture patterns, load balancers, caching strategies, database sharding, and microservices. Practice designing systems like URL shortener, chat app, and ride-sharing service.', company: '', tags: ['System Design', 'Architecture'], status: 'Published' },
  { title: 'Resume Building Guide for Freshers', category: 'Career', description: 'Keep it to one page. Highlight projects with quantifiable results. Include relevant technical skills. Use action verbs. Tailor your resume for each company application.', company: '', tags: ['Resume', 'Career'], status: 'Published' },
  { title: 'Common Java Interview Questions', category: 'Technical', description: 'Study OOP concepts, Collections framework, Multithreading, Exception handling, and JVM internals. Practice coding problems in Java. Understand design patterns.', company: '', tags: ['Java', 'OOP'], status: 'Published' },
  { title: 'Group Discussion Tips & Tricks', category: 'Soft Skills', description: 'Initiate or conclude the discussion. Listen actively and build on others points. Use data and examples. Stay respectful and composed. Take notes during the discussion.', company: '', tags: ['GD', 'Communication'], status: 'Draft' },
];

async function seed() {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('MongoDB connected for seeding');

    const isReset = process.argv.includes('--reset');

    if (isReset) {
      await User.deleteMany({});
      await Company.deleteMany({});
      await Drive.deleteMany({});
      await Question.deleteMany({});
      await Tip.deleteMany({});
      console.log('All collections cleared');
    }

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const saltRounds = 12;
      const users = await User.create(
        await Promise.all(
          seedUsers.map(async (u) => ({
            ...u,
            password: await bcrypt.hash(u.password, saltRounds),
          }))
        )
      );
      console.log(`Seeded ${users.length} users`);

      const adminUser = users.find((u) => u.role === 'admin');

      const companies = await Company.insertMany(
        seedCompanies.map((c) => ({ ...c, createdBy: adminUser._id }))
      );
      console.log(`Seeded ${companies.length} companies`);

      const drives = await Drive.insertMany(
        seedDrives.map((d) => ({ ...d, createdBy: adminUser._id }))
      );
      console.log(`Seeded ${drives.length} drives`);

      const questions = await Question.insertMany(
        seedQuestions.map((q) => ({ ...q, createdBy: adminUser._id }))
      );
      console.log(`Seeded ${questions.length} questions`);

      const tips = await Tip.insertMany(
        seedTips.map((t) => ({ ...t, createdBy: adminUser._id }))
      );
      console.log(`Seeded ${tips.length} tips`);

      console.log('\nSeed completed successfully!');
      console.log('\nDefault accounts:');
      console.log('  Admin:   admin@campusiq.com / admin123');
      console.log('  Staff:   staff@campusiq.com / staff123');
      console.log('  Student: student@campusiq.com / student123');
    } else {
      console.log('Database already has data. Use --reset to clear and reseed.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();
