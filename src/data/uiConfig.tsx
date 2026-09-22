import React from 'react';

// Navbar Navigation Links
export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Courses', path: '/courses' },
];

// FAQ Data
export const faqs = [
  { q: "Do I need prior coding experience?", a: "For beginner courses, no prior experience is needed. For advanced topics like Deep Learning, we recommend completing our Python and Machine Learning foundations first." },
  { q: "Are the certificates recognized by employers?", a: "Yes, our certificates are widely recognized and demonstrate that you have completed rigorous, hands-on projects." },
  { q: "How long do I have access to the courses?", a: "Once enrolled, you have lifetime access to the course content, including all future updates." },
  { q: "Do you offer refunds?", a: "We offer a 30-day no-questions-asked money-back guarantee for all our courses." }
];

// Footer Navigation Links
export const footerLinks = [
  {
    title: 'Learn',
    links: [
      { label: 'All Courses', path: '/courses' },
      { label: 'Artificial Intelligence', path: '/categories/ai' },
      { label: 'Machine Learning', path: '/categories/machine-learning' },
      { label: 'Data Science', path: '/categories/data-science' },
      { label: 'Data Analytics', path: '/categories/data-analytics' },
    ]
  },
  {
    title: 'Platform',
    links: [
      { label: 'About Us', path: '/about' },
      { label: 'FAQ', path: '/faq' },
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Cookie Policy', path: '/cookies' },
    ]
  }
];

// Legal and Policy Data
export type LegalSection = {
  heading: string;
  content: React.ReactNode;
};

export const legalData: Record<string, LegalSection[]> = {
  'Terms of Service': [
    {
      heading: '1. Acceptance of Terms',
      content: 'By accessing and using RM AI, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services. We reserve the right to update these terms at any time without prior notice.'
    },
    {
      heading: '2. User Accounts',
      content: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must be at least 18 years old or have parental permission to create an account and purchase courses.'
    },
    {
      heading: '3. Course Access & Licensing',
      content: 'Upon purchasing a course, you are granted a limited, non-exclusive, non-transferable license to access the course content for your personal, non-commercial educational use. You may not share your account details or redistribute the course materials.'
    },
    {
      heading: '4. Payments and Refunds',
      content: 'All payments are processed securely through our third-party payment providers. We offer a 14-day money-back guarantee for most courses, provided you have not completed more than 30% of the course content.'
    }
  ],
  'Privacy Policy': [
    {
      heading: '1. Information We Collect',
      content: 'We collect information you provide directly to us, such as your name, email address, and payment information when you create an account or purchase a course. We also automatically collect certain technical information about your device and usage patterns.'
    },
    {
      heading: '2. How We Use Your Information',
      content: 'Your information is used to provide, maintain, and improve our educational platform. This includes processing transactions, sending course updates, personalizing your learning experience, and communicating with you about new offerings.'
    },
    {
      heading: '3. Data Sharing and Disclosure',
      content: 'We do not sell your personal data. We may share your information with trusted third-party service providers who assist us in operating our platform, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.'
    },
    {
      heading: '4. Your Privacy Rights',
      content: 'Depending on your location, you may have the right to access, correct, or delete your personal data. You can manage your communication preferences from your account dashboard or by contacting our support team.'
    }
  ],
  'Cookie Policy': [
    {
      heading: '1. What Are Cookies?',
      content: 'Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide a better, more personalized user experience.'
    },
    {
      heading: '2. How We Use Cookies',
      content: 'We use cookies to keep you signed in, understand how you interact with our courses, and remember your preferences. This allows us to track your progress accurately and suggest content that aligns with your learning goals.'
    },
    {
      heading: '3. Types of Cookies We Use',
      content: (
        <>
          <strong>Essential Cookies:</strong> Required for the basic operation of our platform (like logging in).<br />
          <strong>Analytical/Performance Cookies:</strong> Allow us to recognize and count the number of visitors and see how they move around the site.<br />
          <strong>Functionality Cookies:</strong> Used to recognize you when you return to our platform.
        </>
      )
    },
    {
      heading: '4. Managing Your Cookie Preferences',
      content: 'Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, as it will no longer be personalized to you.'
    }
  ]
};
