import type { Category, Course, Instructor } from '../types';

export const categories: Category[] = [
  { id: 'cat-1', slug: 'ai', name: 'Artificial Intelligence', description: 'Master AI concepts and applications.', icon: 'brain' },
  { id: 'cat-2', slug: 'machine-learning', name: 'Machine Learning', description: 'Learn to build predictive models and ML pipelines.', icon: 'cpu' },
  { id: 'cat-3', slug: 'data-science', name: 'Data Science', description: 'Analyze data, build models, and drive decisions.', icon: 'bar-chart' },
  { id: 'cat-4', slug: 'data-analytics', name: 'Data Analytics', description: 'Extract insights from data using SQL, BI tools.', icon: 'pie-chart' }
];


export const instructors: Instructor[] = [
  { id: 'inst-1', name: 'Dr. Alan Turing', bio: 'Pioneer in AI and computer science with 15+ years of industry experience.', avatarUrl: 'https://i.pravatar.cc/150?u=alan', role: 'Lead AI Instructor' },
  { id: 'inst-2', name: 'Ada Lovelace', bio: 'Data Scientist and ML Engineer specializing in deep learning.', avatarUrl: 'https://i.pravatar.cc/150?u=ada', role: 'Senior ML Engineer' },
  { id: 'inst-3', name: 'Grace Hopper', bio: 'Expert in Data Analytics, Database architecture, and business intelligence.', avatarUrl: 'https://i.pravatar.cc/150?u=grace', role: 'Data Analytics Lead' },
  { id: 'inst-4', name: 'Yann LeCun', bio: 'World-renowned expert in Computer Vision and Deep Learning.', avatarUrl: 'https://i.pravatar.cc/150?u=yann', role: 'Chief AI Scientist' }
];

export const courses: Course[] = [
  {
    id: 'course-1',
    slug: 'certified-data-scientist',
    title: 'Certified Data Scientist',
    description: 'Certified Data Scientist is a global leading data science certification. Datamites provides 8 Months Course with a Live Project & Internship. Gain expertise in Python, Machine Learning, Statistics, and more to excel in a Data Science career.',
    shortDescription: 'Global leading data science certification with Live Project & Internship.',
    categoryId: 'cat-3',
    instructorId: 'inst-1',
    level: 'Advanced',
    durationHours: 81,
    price: 65000,
    rating: 4.9,
    reviewCount: 3200,
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    skills: ['Python', 'Machine Learning', 'Statistics', 'Tableau', 'Data Science'],
    isBestseller: true,
    modules: [
      {
        id: 'c1-m1', title: 'Data Science Foundation', order: 1,
        lessons: [
          { id: 'c1-l1', title: 'Data Science Essentials', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l2', title: 'Data Science Demo', type: 'project', durationMinutes: 90 },
          { id: 'c1-l3', title: 'Analytics Classification', type: 'reading', durationMinutes: 45, content: 'Types of Analytics' },
          { id: 'c1-l4', title: 'Data Science and Related Fields', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l5', title: 'Data Science Roles & Workflow', type: 'reading', durationMinutes: 30, content: 'Roles and Workflow' },
          { id: 'c1-l6', title: 'Machine Learning Introduction', type: 'video', durationMinutes: 45, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l7', title: 'Data Science Industry Applications', type: 'reading', durationMinutes: 45, content: 'Industry Applications' }
        ]
      },
      {
        id: 'c1-m2', title: 'Python Foundation', order: 2,
        lessons: [
          { id: 'c1-l8', title: 'Python Basics', type: 'video', durationMinutes: 120, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l9', title: 'Python Control Statements', type: 'video', durationMinutes: 90, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l10', title: 'Python Data Structures', type: 'project', durationMinutes: 120 },
          { id: 'c1-l11', title: 'Python Functions', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' }
        ]
      },
      {
        id: 'c1-m3', title: 'Statistics Essentials', order: 3,
        lessons: [
          { id: 'c1-l12', title: 'Overview of Statistics', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l13', title: 'Harnessing Data', type: 'reading', durationMinutes: 60, content: 'Sampling techniques' },
          { id: 'c1-l14', title: 'Exploratory Data Analysis', type: 'project', durationMinutes: 120 },
          { id: 'c1-l15', title: 'Hypothesis Testing', type: 'video', durationMinutes: 90, videoUrl: 'https://demo.com/vid' }
        ]
      },
      {
        id: 'c1-m4', title: 'Machine Learning Associate', order: 4,
        lessons: [
          { id: 'c1-l16', title: 'Machine Learning Introduction', type: 'video', durationMinutes: 45, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l17', title: 'Python Numpy Package', type: 'project', durationMinutes: 90 },
          { id: 'c1-l18', title: 'Python Pandas Package', type: 'project', durationMinutes: 120 },
          { id: 'c1-l19', title: 'Visualization with Python - Matplotlib', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l20', title: 'Python Visualization Package - Seaborn', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l21', title: 'ML Algo: Linear Regression', type: 'project', durationMinutes: 120 },
          { id: 'c1-l22', title: 'ML Algo: Logistic Regression', type: 'project', durationMinutes: 120 },
          { id: 'c1-l23', title: 'ML Algo: K Means Clustering', type: 'video', durationMinutes: 90, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l24', title: 'ML Algo: KNN', type: 'video', durationMinutes: 90, videoUrl: 'https://demo.com/vid' }
        ]
      },
      {
        id: 'c1-m5', title: 'Machine Learning Expert', order: 5,
        lessons: [
          { id: 'c1-l25', title: 'Feature Engineering', type: 'video', durationMinutes: 90, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l26', title: 'ML Algo: Support Vector Machine (SVM)', type: 'project', durationMinutes: 120 },
          { id: 'c1-l27', title: 'Principal Component Analysis (PCA)', type: 'video', durationMinutes: 90, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l28', title: 'ML Algo: Decision Tree', type: 'project', durationMinutes: 120 },
          { id: 'c1-l29', title: 'Ensemble Techniques - Bagging', type: 'video', durationMinutes: 90, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l30', title: 'ML Algo: Naïve Bayes', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l31', title: 'Gradient Boosting, XGBoost', type: 'project', durationMinutes: 120 }
        ]
      },
      {
        id: 'c1-m6', title: 'Advanced Data Science', order: 6,
        lessons: [
          { id: 'c1-l32', title: 'Time Series Forecasting - ARIMA', type: 'video', durationMinutes: 120, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l33', title: 'Sentiment Analysis', type: 'project', durationMinutes: 90 },
          { id: 'c1-l34', title: 'Regular Expressions with Python', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l35', title: 'ML Model Deployment with Flask', type: 'project', durationMinutes: 120 },
          { id: 'c1-l36', title: 'Advanced Data Analysis with MS Excel', type: 'video', durationMinutes: 90, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l37', title: 'AWS Cloud for Data Science', type: 'video', durationMinutes: 90, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l38', title: 'Azure for Data Science', type: 'video', durationMinutes: 90, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l39', title: 'Introduction to Deep Learning', type: 'project', durationMinutes: 120 }
        ]
      },
      {
        id: 'c1-m7', title: 'Database: SQL and MongoDB', order: 7,
        lessons: [
          { id: 'c1-l40', title: 'Database Introduction', type: 'video', durationMinutes: 45, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l41', title: 'SQL Basics', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l42', title: 'Data Types and Constraints', type: 'reading', durationMinutes: 45, content: 'Constraints overview' },
          { id: 'c1-l43', title: 'Databases and Tables (MySQL)', type: 'project', durationMinutes: 90 },
          { id: 'c1-l44', title: 'SQL Joins', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l45', title: 'SQL Commands and Clauses', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l46', title: 'Document DB/No-SQL DB', type: 'project', durationMinutes: 90 }
        ]
      },
      {
        id: 'c1-m8', title: 'GIT', order: 8,
        lessons: [
          { id: 'c1-l47', title: 'GIT Introduction', type: 'video', durationMinutes: 45, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l48', title: 'GIT Repository and GitHub', type: 'project', durationMinutes: 60 },
          { id: 'c1-l49', title: 'Commits, Pull, Fetch and Push', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l50', title: 'Tagging, Branching and Merging', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l51', title: 'GIT with GitHub and Bitbucket', type: 'project', durationMinutes: 60 }
        ]
      },
      {
        id: 'c1-m9', title: 'Big Data Foundation', order: 9,
        lessons: [
          { id: 'c1-l52', title: 'Big Data Introduction', type: 'video', durationMinutes: 45, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l53', title: 'HDFS and Map Reduce', type: 'video', durationMinutes: 90, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l54', title: 'PySpark Foundation', type: 'project', durationMinutes: 120 },
          { id: 'c1-l55', title: 'Spark SQL and Hadoop Hive', type: 'video', durationMinutes: 90, videoUrl: 'https://demo.com/vid' }
        ]
      },
      {
        id: 'c1-m10', title: 'BI Analyst', order: 10,
        lessons: [
          { id: 'c1-l56', title: 'Tableau Fundamentals', type: 'project', durationMinutes: 120 },
          { id: 'c1-l57', title: 'Power-BI Basics', type: 'project', durationMinutes: 120 },
          { id: 'c1-l58', title: 'Data Transformation Techniques', type: 'video', durationMinutes: 90, videoUrl: 'https://demo.com/vid' },
          { id: 'c1-l59', title: 'Connecting to Various Data Sources', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' }
        ]
      }
    ]
  },
  {
    id: 'course-2',
    slug: 'ai-expert-certification',
    title: 'Artificial Intelligence Expert',
    description: 'The Artificial Intelligence Expert Certification is designed to provide comprehensive knowledge in AI, covering Deep Learning, NLP, Computer Vision, and Reinforcement Learning to build intelligent systems.',
    shortDescription: 'Comprehensive knowledge in AI, covering Deep Learning, NLP, and Computer Vision.',
    categoryId: 'cat-1',
    instructorId: 'inst-4',
    level: 'Advanced',
    durationHours: 37,
    price: 75000,
    rating: 4.8,
    reviewCount: 1500,
    thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    skills: ['Deep Learning', 'NLP', 'Computer Vision', 'Reinforcement Learning', 'TensorFlow'],
    isBestseller: true,
    modules: [
      {
        id: 'c2-m1', title: 'Neural Networks', order: 1,
        lessons: [
          { id: 'c2-l1', title: 'Structure of neural networks', type: 'video', durationMinutes: 45, videoUrl: 'https://demo.com/vid' },
          { id: 'c2-l2', title: 'Neural network - core concepts', type: 'reading', durationMinutes: 30, content: 'Core concepts of Neural Networks.' },
          { id: 'c2-l3', title: 'Feed forward algorithm', type: 'video', durationMinutes: 40, videoUrl: 'https://demo.com/vid' },
          { id: 'c2-l4', title: 'Backpropagation', type: 'video', durationMinutes: 50, videoUrl: 'https://demo.com/vid' },
          { id: 'c2-l5', title: 'Building neural network from scratch using Numpy', type: 'project', durationMinutes: 90 }
        ]
      },
      {
        id: 'c2-m2', title: 'Implementing Deep Neural Networks', order: 2,
        lessons: [
          { id: 'c2-l6', title: 'Introduction to neural networks with tf2.X', type: 'video', durationMinutes: 45, videoUrl: 'https://demo.com/vid' },
          { id: 'c2-l7', title: 'Simple deep learning model in Keras (tf2.X)', type: 'video', durationMinutes: 50, videoUrl: 'https://demo.com/vid' },
          { id: 'c2-l8', title: 'Building a neural network model in TF2.0 for MNIST dataset', type: 'project', durationMinutes: 120 }
        ]
      },
      {
        id: 'c2-m3', title: 'Deep Computer Vision - CNN', order: 3,
        lessons: [
          { id: 'c2-l9', title: 'Convolutional neural networks (CNNs)', type: 'video', durationMinutes: 40, videoUrl: 'https://demo.com/vid' },
          { id: 'c2-l10', title: 'Introduction', type: 'reading', durationMinutes: 20, content: 'Introduction to CNNs.' },
          { id: 'c2-l11', title: 'CNNs with Keras', type: 'video', durationMinutes: 45, videoUrl: 'https://demo.com/vid' },
          { id: 'c2-l12', title: 'Transfer learning in CNN', type: 'video', durationMinutes: 50, videoUrl: 'https://demo.com/vid' },
          { id: 'c2-l13', title: 'Style transfer', type: 'project', durationMinutes: 60 },
          { id: 'c2-l14', title: 'Flowers dataset with tf2.X', type: 'video', durationMinutes: 40, videoUrl: 'https://demo.com/vid' },
          { id: 'c2-l15', title: 'Examining x-ray with CNN model', type: 'project', durationMinutes: 90 }
        ]
      },
      {
        id: 'c2-m4', title: 'Recurrent Neural Network', order: 4,
        lessons: [
          { id: 'c2-l16', title: 'RNN introduction', type: 'video', durationMinutes: 30, videoUrl: 'https://demo.com/vid' },
          { id: 'c2-l17', title: 'Sequences with RNNs', type: 'video', durationMinutes: 40, videoUrl: 'https://demo.com/vid' },
          { id: 'c2-l18', title: 'Long short-term memory networks', type: 'reading', durationMinutes: 45, content: 'LSTM concepts.' },
          { id: 'c2-l19', title: 'LSTM RNNs and GRU', type: 'video', durationMinutes: 50, videoUrl: 'https://demo.com/vid' },
          { id: 'c2-l20', title: 'Examples of RNN applications', type: 'project', durationMinutes: 60 }
        ]
      },
      {
        id: 'c2-m5', title: 'Natural Language Processing (NLP)', order: 5,
        lessons: [
          { id: 'c2-l21', title: 'Natural language processing', type: 'video', durationMinutes: 35, videoUrl: 'https://demo.com/vid' },
          { id: 'c2-l22', title: 'Introduction', type: 'reading', durationMinutes: 20, content: 'NLP overview.' },
          { id: 'c2-l23', title: 'NLP with RNNs', type: 'video', durationMinutes: 45, videoUrl: 'https://demo.com/vid' },
          { id: 'c2-l24', title: 'Creating model', type: 'project', durationMinutes: 90 },
          { id: 'c2-l25', title: 'Transformers and BERT', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c2-l26', title: 'State of art NLP and projects', type: 'project', durationMinutes: 90 }
        ]
      },
      {
        id: 'c2-m6', title: 'Reinforcement Learning', order: 6,
        lessons: [
          { id: 'c2-l27', title: 'Markov decision process', type: 'video', durationMinutes: 45, videoUrl: 'https://demo.com/vid' },
          { id: 'c2-l28', title: 'Fundamental equations in RL', type: 'reading', durationMinutes: 30, content: 'Math behind RL.' },
          { id: 'c2-l29', title: 'Model-based method', type: 'video', durationMinutes: 40, videoUrl: 'https://demo.com/vid' },
          { id: 'c2-l30', title: 'Dynamic programming model free methods', type: 'video', durationMinutes: 50, videoUrl: 'https://demo.com/vid' }
        ]
      },
      {
        id: 'c2-m7', title: 'Deep Reinforcement Learning', order: 7,
        lessons: [
          { id: 'c2-l31', title: 'Architectures of deep Q learning', type: 'video', durationMinutes: 50, videoUrl: 'https://demo.com/vid' },
          { id: 'c2-l32', title: 'Deep Q learning', type: 'project', durationMinutes: 120 },
          { id: 'c2-l33', title: 'Policy gradient methods', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' }
        ]
      },
      {
        id: 'c2-m8', title: 'Generative Adversarial Network (GAN)', order: 8,
        lessons: [
          { id: 'c2-l34', title: 'Gan introduction', type: 'video', durationMinutes: 30, videoUrl: 'https://demo.com/vid' },
          { id: 'c2-l35', title: 'Core concepts of GAN', type: 'reading', durationMinutes: 30, content: 'GAN fundamentals.' },
          { id: 'c2-l36', title: 'Building GAN model with TensorFlow 2.X', type: 'project', durationMinutes: 120 },
          { id: 'c2-l37', title: 'GAN applications', type: 'video', durationMinutes: 40, videoUrl: 'https://demo.com/vid' }
        ]
      },
      {
        id: 'c2-m9', title: 'Deploying DL Models in the Cloud (AWS)', order: 9,
        lessons: [
          { id: 'c2-l38', title: 'Amazon web services (AWS)', type: 'video', durationMinutes: 40, videoUrl: 'https://demo.com/vid' },
          { id: 'c2-l39', title: 'AWS SageMaker Overview', type: 'reading', durationMinutes: 30, content: 'SageMaker basics.' },
          { id: 'c2-l40', title: 'Sage Makers from Data pipeline to deployments', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c2-l41', title: 'Deploying deep learning models WS Sage maker', type: 'project', durationMinutes: 90 }
        ]
      }
    ]
  },
  {
    id: 'course-3',
    slug: 'certified-data-analyst',
    title: 'Certified Data Analyst',
    description: 'Certified Data Analyst certification equips you with the skills to interpret complex data, extract actionable insights, and build interactive dashboards using Excel, SQL, and Tableau or Power BI.',
    shortDescription: 'Master data interpretation, SQL, and visualization tools.',
    categoryId: 'cat-4',
    instructorId: 'inst-3',
    level: 'Intermediate',
    durationHours: 68,
    price: 45000,
    rating: 4.7,
    reviewCount: 2800,
    thumbnailUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800',
    skills: ['Data Analysis', 'SQL', 'Tableau', 'Excel', 'Power BI'],
    modules: [
      {
        id: 'c3-m1', title: 'Data Analysis Foundation', order: 1,
        lessons: [
          { id: 'c3-l1', title: 'Data Analysis Introduction', type: 'video', durationMinutes: 45, videoUrl: 'https://demo.com/vid' },
          { id: 'c3-l2', title: 'Classification of Analytics', type: 'reading', durationMinutes: 30, content: 'Four types of analytics' },
          { id: 'c3-l3', title: 'CRIP-DM Model', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c3-l4', title: 'Univariate Data Analysis', type: 'project', durationMinutes: 90 },
          { id: 'c3-l5', title: 'Data Analysis with Visual Charts', type: 'project', durationMinutes: 120 },
          { id: 'c3-l6', title: 'Bi-Variate Data Analysis', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' }
        ]
      },
      {
        id: 'c3-m2', title: 'Python Foundation', order: 2,
        lessons: [
          { id: 'c3-l7', title: 'Python Basics', type: 'video', durationMinutes: 90, videoUrl: 'https://demo.com/vid' },
          { id: 'c3-l8', title: 'Python Control Statements', type: 'video', durationMinutes: 90, videoUrl: 'https://demo.com/vid' },
          { id: 'c3-l9', title: 'Python Data Structures', type: 'project', durationMinutes: 120 },
          { id: 'c3-l10', title: 'Python Functions', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' }
        ]
      },
      {
        id: 'c3-m3', title: 'Statistics Essentials', order: 3,
        lessons: [
          { id: 'c3-l11', title: 'Overview of Statistics', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c3-l12', title: 'Harnessing Data', type: 'reading', durationMinutes: 60, content: 'Sampling techniques' },
          { id: 'c3-l13', title: 'Exploratory Data Analysis', type: 'project', durationMinutes: 120 },
          { id: 'c3-l14', title: 'Hypothesis Testing', type: 'video', durationMinutes: 90, videoUrl: 'https://demo.com/vid' }
        ]
      },
      {
        id: 'c3-m4', title: 'Data Analysis Associate', order: 4,
        lessons: [
          { id: 'c3-l15', title: 'Comparison and Correlation Analysis', type: 'project', durationMinutes: 90 },
          { id: 'c3-l16', title: 'Variance and Frequency Analysis', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c3-l17', title: 'Ranking Analysis', type: 'project', durationMinutes: 90 },
          { id: 'c3-l18', title: 'Break Even Analysis', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c3-l19', title: 'Pareto (80/20 Rule) Analysis', type: 'project', durationMinutes: 60 },
          { id: 'c3-l20', title: 'Time Series and Trend Analysis', type: 'video', durationMinutes: 90, videoUrl: 'https://demo.com/vid' },
          { id: 'c3-l21', title: 'Data Analysis Business Reporting', type: 'project', durationMinutes: 120 }
        ]
      },
      {
        id: 'c3-m5', title: 'Advanced Data Analytics', order: 5,
        lessons: [
          { id: 'c3-l22', title: 'Data Analytics Foundation', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c3-l23', title: 'Optimization Models', type: 'project', durationMinutes: 120 },
          { id: 'c3-l24', title: 'Predictive Analytics with Regression', type: 'project', durationMinutes: 120 },
          { id: 'c3-l25', title: 'Decision Modeling', type: 'video', durationMinutes: 90, videoUrl: 'https://demo.com/vid' }
        ]
      },
      {
        id: 'c3-m6', title: 'Predictive Analytics with ML', order: 6,
        lessons: [
          { id: 'c3-l26', title: 'Machine Learning Introduction', type: 'video', durationMinutes: 45, videoUrl: 'https://demo.com/vid' },
          { id: 'c3-l27', title: 'ML Algo: Linear Regression', type: 'project', durationMinutes: 120 },
          { id: 'c3-l28', title: 'ML Algo: Logistic Regression', type: 'project', durationMinutes: 120 },
          { id: 'c3-l29', title: 'ML Algo: KNN', type: 'video', durationMinutes: 90, videoUrl: 'https://demo.com/vid' },
          { id: 'c3-l30', title: 'ML Algo: K Means Clustering', type: 'video', durationMinutes: 90, videoUrl: 'https://demo.com/vid' },
          { id: 'c3-l31', title: 'ML Algo: Decision Tree', type: 'project', durationMinutes: 120 },
          { id: 'c3-l32', title: 'ML Algo: Support Vector Machine (SVM)', type: 'project', durationMinutes: 120 },
          { id: 'c3-l33', title: 'Artificial Neural Network (ANN)', type: 'video', durationMinutes: 90, videoUrl: 'https://demo.com/vid' }
        ]
      },
      {
        id: 'c3-m7', title: 'Database: SQL and MongoDB', order: 7,
        lessons: [
          { id: 'c3-l34', title: 'Database Introduction', type: 'video', durationMinutes: 45, videoUrl: 'https://demo.com/vid' },
          { id: 'c3-l35', title: 'SQL Basics', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c3-l36', title: 'Data Types and Constraints', type: 'reading', durationMinutes: 45, content: 'Constraints overview' },
          { id: 'c3-l37', title: 'Databases and Tables (MySQL)', type: 'project', durationMinutes: 90 },
          { id: 'c3-l38', title: 'SQL Joins', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c3-l39', title: 'SQL Commands and Clauses', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c3-l40', title: 'Document DB/No-SQL DB', type: 'project', durationMinutes: 90 }
        ]
      },
      {
        id: 'c3-m8', title: 'Big Data Foundation', order: 8,
        lessons: [
          { id: 'c3-l41', title: 'Big Data Introduction', type: 'video', durationMinutes: 45, videoUrl: 'https://demo.com/vid' },
          { id: 'c3-l42', title: 'HDFS and Map Reduce', type: 'video', durationMinutes: 90, videoUrl: 'https://demo.com/vid' },
          { id: 'c3-l43', title: 'PySpark Foundation', type: 'project', durationMinutes: 120 },
          { id: 'c3-l44', title: 'Spark SQL and Hadoop Hive', type: 'video', durationMinutes: 90, videoUrl: 'https://demo.com/vid' }
        ]
      },
      {
        id: 'c3-m9', title: 'BI Analyst', order: 9,
        lessons: [
          { id: 'c3-l45', title: 'Tableau Fundamentals', type: 'project', durationMinutes: 120 },
          { id: 'c3-l46', title: 'Power-BI Basics', type: 'project', durationMinutes: 120 },
          { id: 'c3-l47', title: 'Data Transformation Techniques', type: 'video', durationMinutes: 90, videoUrl: 'https://demo.com/vid' },
          { id: 'c3-l48', title: 'Connecting to Various Data Sources', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' }
        ]
      }
    ]
  },
  {
    id: 'course-4',
    slug: 'tensorflow-machine-learning',
    title: 'Machine Learning with Tensorflow',
    description: 'Datamites is a leading training institute for machine learning courses. Opt for the machine learning course with Tensorflow to build robust, scalable ML models and deploy them effectively.',
    shortDescription: 'Build robust, scalable ML models with TensorFlow.',
    categoryId: 'cat-2',
    instructorId: 'inst-2',
    level: 'Intermediate',
    durationHours: 42,
    price: 55000,
    rating: 4.8,
    reviewCount: 1100,
    thumbnailUrl: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&q=80&w=800',
    skills: ['Machine Learning', 'TensorFlow', 'Deep Learning', 'Neural Networks'],
    isBestseller: true,
    modules: [
      {
        id: 'c4-m1', title: 'Introduction to TensorFlow', order: 1,
        lessons: [
          { id: 'c4-l1', title: 'Installing TensorFlow using Docker', type: 'video', durationMinutes: 30, videoUrl: 'https://demo.com/vid' },
          { id: 'c4-l2', title: 'Installing Matplotlib', type: 'video', durationMinutes: 15, videoUrl: 'https://demo.com/vid' },
          { id: 'c4-l3', title: 'Hello World application with TensorFlow', type: 'project', durationMinutes: 60 }
        ]
      },
      {
        id: 'c4-m2', title: 'Basic Statistics', order: 2,
        lessons: [
          { id: 'c4-l4', title: 'Basic Statistics and Exploratory Analysis', type: 'video', durationMinutes: 45, videoUrl: 'https://demo.com/vid' },
          { id: 'c4-l5', title: 'Descriptive summary statistics with Numpy', type: 'project', durationMinutes: 90 },
          { id: 'c4-l6', title: 'Summarize continous and categorical data', type: 'reading', durationMinutes: 30, content: 'Summarizing data types.' },
          { id: 'c4-l7', title: 'Outlier analysis', type: 'project', durationMinutes: 60 }
        ]
      },
      {
        id: 'c4-m3', title: 'Machine Learning Introduction', order: 3,
        lessons: [
          { id: 'c4-l8', title: 'Machine learning essentials', type: 'video', durationMinutes: 45, videoUrl: 'https://demo.com/vid' },
          { id: 'c4-l9', title: 'Data representation and features', type: 'video', durationMinutes: 45, videoUrl: 'https://demo.com/vid' },
          { id: 'c4-l10', title: 'Distance metrics', type: 'video', durationMinutes: 30, videoUrl: 'https://demo.com/vid' },
          { id: 'c4-l11', title: 'Supervised learning', type: 'reading', durationMinutes: 30, content: 'Supervised learning overview' },
          { id: 'c4-l12', title: 'Unsupervised learning', type: 'reading', durationMinutes: 30, content: 'Unsupervised learning overview' },
          { id: 'c4-l13', title: 'Reinforcement learning', type: 'reading', durationMinutes: 30, content: 'Reinforcement learning overview' },
          { id: 'c4-l14', title: 'Theano, Caffe, Torch, CGT, and TensorFlow', type: 'reading', durationMinutes: 45, content: 'Framework comparisons' }
        ]
      },
      {
        id: 'c4-m4', title: 'TensorFlow Essentials', order: 4,
        lessons: [
          { id: 'c4-l15', title: 'Representing tensors', type: 'video', durationMinutes: 30, videoUrl: 'https://demo.com/vid' },
          { id: 'c4-l16', title: 'Creating operators and excuting with sessions', type: 'project', durationMinutes: 60 },
          { id: 'c4-l17', title: 'Introduction Jupyter notebook for TensorFlow coding', type: 'video', durationMinutes: 30, videoUrl: 'https://demo.com/vid' },
          { id: 'c4-l18', title: 'TensorFlow variables', type: 'video', durationMinutes: 30, videoUrl: 'https://demo.com/vid' },
          { id: 'c4-l19', title: 'Visualizing data using TensorBoard', type: 'project', durationMinutes: 90 }
        ]
      },
      {
        id: 'c4-m5', title: 'ML Algorithm - Linear Regression in TensorFlow', order: 5,
        lessons: [
          { id: 'c4-l20', title: 'Regression problems', type: 'reading', durationMinutes: 20, content: 'Linear Regression problems' },
          { id: 'c4-l21', title: 'Linear regression applications', type: 'video', durationMinutes: 30, videoUrl: 'https://demo.com/vid' },
          { id: 'c4-l22', title: 'Regularization', type: 'video', durationMinutes: 45, videoUrl: 'https://demo.com/vid' },
          { id: 'c4-l23', title: 'Available datasets', type: 'reading', durationMinutes: 15, content: 'Datasets overview' },
          { id: 'c4-l24', title: 'Coding Linear Regression with TensorFlow - Case study', type: 'project', durationMinutes: 120 }
        ]
      },
      {
        id: 'c4-m6', title: 'ML Algorithm - Classification in TensorFlow', order: 6,
        lessons: [
          { id: 'c4-l25', title: 'Classification problems', type: 'video', durationMinutes: 30, videoUrl: 'https://demo.com/vid' },
          { id: 'c4-l26', title: 'Using linear regression for classification', type: 'video', durationMinutes: 45, videoUrl: 'https://demo.com/vid' },
          { id: 'c4-l27', title: 'Using logistic regression', type: 'video', durationMinutes: 45, videoUrl: 'https://demo.com/vid' },
          { id: 'c4-l28', title: 'Multiclass classifiers', type: 'video', durationMinutes: 45, videoUrl: 'https://demo.com/vid' },
          { id: 'c4-l29', title: 'Hands on Classification with TensorFlow', type: 'project', durationMinutes: 120 }
        ]
      },
      {
        id: 'c4-m7', title: 'ML Algorithm - Clustering in TensorFlow', order: 7,
        lessons: [
          { id: 'c4-l30', title: 'Traversing files in TensorFlow', type: 'video', durationMinutes: 30, videoUrl: 'https://demo.com/vid' },
          { id: 'c4-l31', title: 'K-means clustering', type: 'project', durationMinutes: 90 },
          { id: 'c4-l32', title: 'Clustering using a self-organizing map', type: 'project', durationMinutes: 120 }
        ]
      },
      {
        id: 'c4-m8', title: 'Simple Neural Networks in TensorFlow', order: 8,
        lessons: [
          { id: 'c4-l33', title: 'Introduction to Neural Networks', type: 'video', durationMinutes: 45, videoUrl: 'https://demo.com/vid' },
          { id: 'c4-l34', title: 'Batch training', type: 'video', durationMinutes: 45, videoUrl: 'https://demo.com/vid' },
          { id: 'c4-l35', title: 'Variational, denoising and stacked autoencoders', type: 'project', durationMinutes: 120 }
        ]
      },
      {
        id: 'c4-m9', title: 'Reinforcement learning', order: 9,
        lessons: [
          { id: 'c4-l36', title: 'Concept of Reinforcement Learning', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c4-l37', title: 'Simple model applying Reinforcement Learning in TensorFlow', type: 'project', durationMinutes: 120 }
        ]
      },
      {
        id: 'c4-m10', title: 'Convolutional and Recurrent Neural Networks', order: 10,
        lessons: [
          { id: 'c4-l38', title: 'Advantages and disadvantages of neural networks', type: 'reading', durationMinutes: 30, content: 'Pros and cons of neural networks' },
          { id: 'c4-l39', title: 'Convolutional neural networks', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c4-l40', title: 'The idea of contextual information', type: 'reading', durationMinutes: 30, content: 'Contextual info concept' },
          { id: 'c4-l41', title: 'Recurrent neural networks', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c4-l42', title: 'Real world predictive model - example', type: 'project', durationMinutes: 120 }
        ]
      },
      {
        id: 'c4-m11', title: 'Case study - Stock Market Analysis with TensorFlow', order: 11,
        lessons: [
          { id: 'c4-l43', title: 'Case study - Stock Market Analysis', type: 'video', durationMinutes: 60, videoUrl: 'https://demo.com/vid' },
          { id: 'c4-l44', title: 'Hands on Coding in TensorFlow', type: 'project', durationMinutes: 180 }
        ]
      }
    ]
  }
];
