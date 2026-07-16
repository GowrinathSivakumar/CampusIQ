const mongoose = require('mongoose');
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
  { name: 'Zoho Corporation', type: 'Software', industry: 'Information Technology', website: 'https://www.zoho.com', location: 'Chennai, Tamil Nadu', description: 'Leading SaaS company with a wide range of business applications.', package: 8.5, status: 'Active', tags: ['Java', 'Python', 'React'] },
  { name: 'TCS', type: 'Software', industry: 'Information Technology', website: 'https://www.tcs.com', location: 'Mumbai, Maharashtra', description: "India's largest IT services company providing technology solutions.", package: 7, status: 'Active', tags: ['Java', 'SQL', 'Aptitude'] },
  { name: 'Amazon', type: 'Software', industry: 'E-Commerce', website: 'https://www.amazon.com', location: 'Bengaluru, Karnataka', description: 'Global e-commerce and cloud computing giant.', package: 18, status: 'Active', tags: ['DSA', 'System Design', 'Leadership Principles'] },
  { name: 'Google', type: 'Software', industry: 'Information Technology', website: 'https://www.google.com', location: 'Bengaluru, Karnataka', description: 'Technology leader in search, cloud, and AI solutions.', package: 24, status: 'Active', tags: ['Algorithms', 'System Design', 'AI/ML'] },
  { name: 'Microsoft', type: 'Software', industry: 'Information Technology', website: 'https://www.microsoft.com', location: 'Hyderabad, Telangana', description: "World's largest software company empowering digital transformation.", package: 20, status: 'Active', tags: ['C++', 'System Design', 'Azure'] },
  { name: 'Infosys', type: 'Software', industry: 'Information Technology', website: 'https://www.infosys.com', location: 'Bengaluru, Karnataka', description: 'Global leader in next-generation digital services and consulting.', package: 6.5, status: 'Active', tags: ['Python', 'Java', 'InfyTQ'] },
  { name: 'Wipro', type: 'Software', industry: 'Information Technology', website: 'https://www.wipro.com', location: 'Bengaluru, Karnataka', description: 'Leading technology services and consulting company.', package: 5.5, status: 'Active', tags: ['Java', 'SQL', 'Aptitude'] },
  { name: 'Accenture', type: 'Software', industry: 'Consulting', website: 'https://www.accenture.com', location: 'Bengaluru, Karnataka', description: 'Global professional services company with expertise in digital and cloud.', package: 7.5, status: 'Active', tags: ['Cloud', 'Consulting', 'Digital'] },
];

const seedDrives = [
  { companyName: 'Microsoft', role: 'Software Engineer', date: new Date('2026-06-15'), studentsPlaced: 12, package: '₹45 LPA', description: 'Full-time software engineer role for fresh graduates' },
  { companyName: 'Google', role: 'SDE Intern', date: new Date('2026-06-10'), studentsPlaced: 8, package: '₹42 LPA', description: 'Summer internship leading to full-time conversion' },
  { companyName: 'Amazon', role: 'Frontend Developer', date: new Date('2026-06-05'), studentsPlaced: 15, package: '₹38 LPA', description: 'Full-stack development role with focus on frontend' },
  { companyName: 'TCS', role: 'System Engineer', date: new Date('2026-05-28'), studentsPlaced: 45, package: '₹12 LPA', description: 'Bulk hiring for system engineering roles' },
  { companyName: 'Infosys', role: 'Associate Developer', date: new Date('2026-05-20'), studentsPlaced: 38, package: '₹14 LPA', description: 'Entry-level developer positions across multiple teams' },
  { companyName: 'Zoho Corporation', role: 'Full Stack Developer', date: new Date('2026-05-15'), studentsPlaced: 10, package: '₹18 LPA', description: 'Full-stack development with React and Node.js' },
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
      const users = await User.create(seedUsers);
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
