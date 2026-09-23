import { CourseCard } from '../components/common/CourseCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Star, Award, BrainCircuit, Cpu, BarChart2, PieChart } from 'lucide-react';
import { Button, Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { motion } from 'framer-motion';
import { CourseService } from '../services/CourseService';
import type { Course, Category } from '../types';

const categoryIconMap: Record<string, React.ElementType> = {
  'brain': BrainCircuit,
  'cpu': Cpu,
  'bar-chart': BarChart2,
  'pie-chart': PieChart,
};

const getCategoryIcon = (icon?: string): React.ElementType => {
  return icon ? (categoryIconMap[icon] ?? BrainCircuit) : BrainCircuit;
};


const testimonials = [
  { id: 1, name: 'Priya Sharma', role: 'Data Scientist at TechCorp', content: 'The Generative AI course completely transformed how I approach problem-solving at work. The curriculum is incredibly well-structured.', avatar: 'https://i.pravatar.cc/150?u=priya' },
  { id: 2, name: 'David Chen', role: 'Machine Learning Engineer', content: 'I was amazed by the depth of the MLOps modules. It bridged the gap between my theoretical knowledge and actual deployment.', avatar: 'https://i.pravatar.cc/150?u=david' },
  { id: 3, name: 'Aditya Patel', role: 'AI Researcher', content: 'The hands-on projects are what sets this platform apart. You are not just watching videos, you are building real-world solutions.', avatar: 'https://i.pravatar.cc/150?u=aditya' },
  { id: 4, name: 'Michael Chang', role: 'Software Developer', content: 'Transitioning to AI was daunting, but the beginner-friendly foundations course made the math and concepts so intuitive.', avatar: 'https://i.pravatar.cc/150?u=michael' },
  { id: 5, name: 'Neha Gupta', role: 'Product Manager', content: 'Understanding the capabilities of AI helped me lead my team more effectively. A must for any tech leader.', avatar: 'https://i.pravatar.cc/150?u=neha' },
];

export const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesData, categoriesData] = await Promise.all([
          CourseService.getAllCourses(),
          CourseService.getAllCategories()
        ]);
        setFeaturedCourses(coursesData.slice(0, 3));
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch home data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { label: 'Active Learners', value: '10,000+', icon: Users },
    { label: 'Premium Courses', value: '50+', icon: BookOpen },
    { label: 'Average Rating', value: '4.8/5', icon: Star },
    { label: 'Certified Alumni', value: '5,000+', icon: Award },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="flex flex-col overflow-hidden bg-slate-50">
      <Helmet>
        <title>RM AI • Master AI & Data Science</title>
        <meta name="description" content="Elevate your career with premium, interactive AI and Data Science courses designed by industry experts. From foundations to advanced MLOps." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-[#1e1b4b] text-white py-24 sm:py-32 lg:py-40 min-h-[90vh] flex flex-col justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b4b] via-[#1e1b4b]/90 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center w-full">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center w-full">
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-200 text-sm font-semibold mb-8 backdrop-blur-md shadow-lg shadow-blue-900/20">
              <span className="flex h-2.5 w-2.5 rounded-full bg-blue-400 animate-pulse"></span>
              New: Generative AI Masterclass Now Live
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading tracking-tight mb-6 max-w-5xl mx-auto leading-tight w-full">
              Master the Future of <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                AI & Data Science
              </span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed font-light px-2">
              Elevate your career with premium, interactive courses designed by industry experts. From foundations to advanced MLOps.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center w-full px-4 sm:px-0">
              <Button component={Link} to="/courses" variant="contained" size="large" sx={{ py: 2, px: 4, borderRadius: 8, fontSize: { xs: '1rem', sm: '1.1rem' }, boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)' }}>
                Explore Curriculum
              </Button>
              <Button component={Link} to="/categories/ai" variant="outlined" size="large" sx={{ py: 2, px: 4, borderRadius: 8, fontSize: { xs: '1rem', sm: '1.1rem' }, color: 'white', borderColor: 'rgba(255,255,255,0.3)', '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                View AI Tracks
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-12 z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <Card sx={{ borderRadius: { xs: 4, sm: 6 }, boxShadow: '0 20px 40px rgba(0,0,0,0.08)', border: 'none', bgcolor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)' }}>
            <CardContent sx={{ p: { xs: 3, sm: 4, md: 6 } }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 md:divide-x md:divide-slate-100">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div key={index} variants={fadeIn} className="flex flex-col items-center text-center px-4">
                      <div className="p-3 bg-indigo-50 rounded-2xl mb-4 text-indigo-600 group-hover:scale-110 transition-transform">
                        <Icon className="h-7 w-7" />
                      </div>
                      <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#1e1b4b' }}>{stat.value}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{stat.label}</Typography>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Featured Courses */}
      <section className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-indigo-100 blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-purple-100 blur-3xl opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <div>
              <Chip label="Premium Selection" color="primary" sx={{ mb: 2, fontWeight: 600 }} />
              <Typography variant="h2" sx={{ fontWeight: 800, color: '#1e1b4b', mb: 2 }}>
                Featured Programs
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, fontWeight: 400 }}>
                Hand-picked, industry-aligned courses to accelerate your journey in tech. Join thousands of successful alumni.
              </Typography>
            </div>
            <Button
              component={Link}
              to="/courses"
              endIcon={
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              }
              sx={{ fontWeight: 600 }}
              className="group"
            >
              View all courses
            </Button>

          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => <div key={i} className="h-[500px] bg-slate-200 rounded-[2rem] animate-pulse"></div>)}
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
            >
              {featuredCourses.map(course => (
                <motion.div key={course.id} variants={fadeIn} whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                  <CourseCard course={course} />
                </motion.div>
              ))}</motion.div>
          )}
        </div>
      </section>

      {/* Testimonials Marquee */}
      <section className="py-24 bg-slate-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 relative z-10">
          <Typography variant="h2" sx={{ fontWeight: 800, color: '#1e1b4b', mb: 4 }}>
            What Our Students Say
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', fontWeight: 400 }}>
            Join thousands of professionals who have accelerated their careers with RM AI.
          </Typography>
        </div>

        {/* Marquee Container */}
        <Box sx={{ display: 'flex', overflow: 'hidden', whiteSpace: 'nowrap', py: 4, position: 'relative' }}>
          {/* Gradient Masks for smooth fading on edges */}
          <Box sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: { xs: 50, md: 200 }, background: 'linear-gradient(to right, #f1f5f9 0%, transparent 100%)', zIndex: 2 }} />
          <Box sx={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: { xs: 50, md: 200 }, background: 'linear-gradient(to left, #f1f5f9 0%, transparent 100%)', zIndex: 2 }} />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 35
            }}
            style={{ display: 'flex', gap: '2rem' }}
          >
            {/* Render array twice for seamless infinite scroll */}
            {[...testimonials, ...testimonials].map((testimonial, idx) => (
              <Card key={`${testimonial.id}-${idx}`} sx={{
                width: { xs: 280, sm: 380 },
                flexShrink: 0,
                borderRadius: { xs: 4, sm: '2rem' },
                p: { xs: 3, sm: 4 },
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5,
                whiteSpace: 'normal',
                bgcolor: 'white'
              }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </Box>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, flexGrow: 1, fontStyle: 'italic' }}>
                  "{testimonial.content}"
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 'auto' }}>
                  <Box component="img" src={testimonial.avatar} alt={testimonial.name} sx={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e1b4b', lineHeight: 1.2 }}>{testimonial.name}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>{testimonial.role}</Typography>
                  </Box>
                </Box>
              </Card>
            ))}
          </motion.div>
        </Box>
      </section>

      {/* Categories */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mb-16">
            <Typography variant="h2" sx={{ fontWeight: 800, color: '#1e1b4b', mb: 4 }}>
              Explore by Specialization
            </Typography>
          </motion.div>
          {categories.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-48 bg-slate-200 rounded-3xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {categories.map(category => (
                <motion.div key={category.id} variants={fadeIn} whileHover={{ y: -8 }}>
                  <Link to={`/categories/${category.slug}`} className="block h-full">
                    <Card sx={{
                      h: '100%', borderRadius: 6, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                      border: '1px solid', borderColor: 'slate.100', boxShadow: 'none',
                      transition: 'all 0.3s', '&:hover': { borderColor: 'primary.300', bgcolor: 'primary.50', boxShadow: '0 10px 20px rgba(99,102,241,0.1)' }
                    }}>
                      <Box sx={{ w: 72, h: 72, borderRadius: 4, bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        {(() => { const Icon = getCategoryIcon(category.icon); return <Icon className="h-8 w-8 text-indigo-600" />; })()}
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#1e1b4b' }}>{category.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{category.description}</Typography>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-[#1e1b4b] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 4 }}>
            Ready to transform your career?
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', mb: 8, fontWeight: 400 }}>
            Join thousands of learners and take the first step towards mastering Artificial Intelligence today.
          </Typography>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button component={Link} to="/courses" variant="contained" size="large" sx={{ py: 2, px: 6, borderRadius: 8, fontSize: '1.1rem', bgcolor: 'white', color: '#1e1b4b', '&:hover': { bgcolor: 'slate.100' } }}>
              Explore All Courses
            </Button>
            {/* <Button component={Link} to="/courses" variant="outlined" size="large" sx={{ py: 2, px: 6, borderRadius: 8, fontSize: '1.1rem', color: 'white', borderColor: 'rgba(255,255,255,0.3)', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.05)' } }}>
              View All Courses
            </Button> */}
          </div>
        </motion.div>
      </section>
    </div>
  );
};
