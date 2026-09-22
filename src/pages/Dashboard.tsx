import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Button, Avatar, CircularProgress, Chip } from '@mui/material';
import { PlayCircle, BookOpen, Award, Clock, ArrowRight, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { AuthService } from '../services/AuthService';
import { EnrollmentService } from '../services/EnrollmentService';
import { CourseService } from '../services/CourseService';
import type { User, Enrollment, Course } from '../types';

interface EnrolledCourseData {
  enrollment: Enrollment;
  course: Course;
}

export const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourseData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        
        // If not logged in, redirect to login
        if (!currentUser) {
          navigate('/login');
          return;
        }
        
        setUser(currentUser);

        const enrollments = await EnrollmentService.getEnrollments(currentUser.id);
        const allCourses = await CourseService.getAllCourses();

        // Map enrollments to their full course data
        const enrichedData = enrollments.map(enr => {
          const course = allCourses.find(c => c.id === enr.courseId);
          return course ? { enrollment: enr, course } : null;
        }).filter(Boolean) as EnrolledCourseData[];

        setEnrolledCourses(enrichedData);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) {
    return (
      <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8fafc' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) return null; // Will redirect in useEffect

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 12 }}>
      {/* Dashboard Header - Dark & Elegant */}
      <Box sx={{ 
        position: 'relative',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)', 
        pt: { xs: 13, sm: 16 }, 
        pb: { xs: 14, sm: 18 }, 
        px: { xs: 2.5, sm: 4, lg: 8 },
        overflow: 'hidden'
      }}>
        {/* Subtle background glow accents */}
        <Box sx={{ position: 'absolute', top: '-40%', left: '-10%', width: '50%', height: '180%', background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)', transform: 'rotate(25deg)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: '-20%', right: '-5%', width: '40%', height: '150%', background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")', pointerEvents: 'none' }} />
        
        <Box sx={{ 
          position: 'relative', 
          maxWidth: 'lg', 
          mx: 'auto', 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          alignItems: { xs: 'center', sm: 'center' }, 
          textAlign: { xs: 'center', sm: 'left' },
          gap: { xs: 2.5, sm: 3.5, md: 4 }, 
          zIndex: 1 
        }}>
          <Avatar 
            src={user.avatarUrl} 
            alt={user.name} 
            sx={{ 
              width: { xs: 72, sm: 84 }, 
              height: { xs: 72, sm: 84 }, 
              border: '3px solid rgba(255,255,255,0.25)', 
              boxShadow: '0 8px 30px rgba(0,0,0,0.4)' 
            }} 
          />
          <Box>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 800, 
                mb: 0.5, 
                color: '#ffffff', 
                letterSpacing: '-0.02em', 
                fontSize: { xs: '1.65rem', sm: '2.15rem', md: '2.5rem' },
                textShadow: '0 2px 10px rgba(0,0,0,0.3)' 
              }}
            >
              Welcome back, {user.name}!
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255,255,255,0.8)', 
                fontWeight: 500,
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}
            >
              Ready to continue your learning journey?
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Main Dashboard Content */}
      <Box sx={{ maxWidth: 'lg', mx: 'auto', px: { xs: 2, sm: 4, lg: 8 }, mt: { xs: -6, sm: -8 }, position: 'relative', zIndex: 10 }}>
        
        {/* Stats Row */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: { xs: 2, sm: 3, md: 4 }, mb: { xs: 6, sm: 8, md: 10 } }}>
          <Card sx={{ 
            borderRadius: 4, 
            boxShadow: '0 12px 32px -8px rgba(15,23,42,0.06)', 
            border: '1px solid rgba(255,255,255,0.85)', 
            bgcolor: 'rgba(255,255,255,0.92)', 
            backdropFilter: 'blur(20px)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 16px 36px -8px rgba(99,102,241,0.12)' }
          }}>
            <CardContent sx={{ p: { xs: 2.5, sm: 3 }, '&:last-child': { pb: { xs: 2.5, sm: 3 } }, display: 'flex', alignItems: 'center', gap: 2.5 }}>
              <Box sx={{ bgcolor: 'primary.50', p: 1.5, borderRadius: 3, color: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', width: { xs: 48, sm: 54 }, height: { xs: 48, sm: 54 }, flexShrink: 0 }}>
                <BookOpen className="h-6 w-6" />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 800, color: '#0f172a', lineHeight: 1.1, fontSize: { xs: '1.75rem', sm: '2rem' } }}>{enrolledCourses.length}</Typography>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem', mt: 0.5 }}>Enrolled Courses</Typography>
              </Box>
            </CardContent>
          </Card>
          <Card sx={{ 
            borderRadius: 4, 
            boxShadow: '0 12px 32px -8px rgba(15,23,42,0.06)', 
            border: '1px solid rgba(255,255,255,0.85)', 
            bgcolor: 'rgba(255,255,255,0.92)', 
            backdropFilter: 'blur(20px)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 16px 36px -8px rgba(16,185,129,0.12)' }
          }}>
            <CardContent sx={{ p: { xs: 2.5, sm: 3 }, '&:last-child': { pb: { xs: 2.5, sm: 3 } }, display: 'flex', alignItems: 'center', gap: 2.5 }}>
              <Box sx={{ bgcolor: 'emerald.50', p: 1.5, borderRadius: 3, color: 'emerald.600', display: 'flex', alignItems: 'center', justifyContent: 'center', width: { xs: 48, sm: 54 }, height: { xs: 48, sm: 54 }, flexShrink: 0 }}>
                <Award className="h-6 w-6 text-emerald-600" />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 800, color: '#0f172a', lineHeight: 1.1, fontSize: { xs: '1.75rem', sm: '2rem' } }}>0</Typography>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem', mt: 0.5 }}>Certificates</Typography>
              </Box>
            </CardContent>
          </Card>
          <Card sx={{ 
            borderRadius: 4, 
            boxShadow: '0 12px 32px -8px rgba(15,23,42,0.06)', 
            border: '1px solid rgba(255,255,255,0.85)', 
            bgcolor: 'rgba(255,255,255,0.92)', 
            backdropFilter: 'blur(20px)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 16px 36px -8px rgba(249,115,22,0.12)' }
          }}>
            <CardContent sx={{ p: { xs: 2.5, sm: 3 }, '&:last-child': { pb: { xs: 2.5, sm: 3 } }, display: 'flex', alignItems: 'center', gap: 2.5 }}>
              <Box sx={{ bgcolor: 'orange.50', p: 1.5, borderRadius: 3, color: 'orange.500', display: 'flex', alignItems: 'center', justifyContent: 'center', width: { xs: 48, sm: 54 }, height: { xs: 48, sm: 54 }, flexShrink: 0 }}>
                <Clock className="h-6 w-6" />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 800, color: '#0f172a', lineHeight: 1.1, fontSize: { xs: '1.75rem', sm: '2rem' } }}>12h</Typography>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem', mt: 0.5 }}>Learning Time</Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* My Learning Section */}
        <Box sx={{ mb: { xs: 4, sm: 6 }, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', fontSize: { xs: '1.5rem', sm: '1.875rem' } }}>
            My Learning
          </Typography>
          <Button component={RouterLink} to="/courses" variant="text" endIcon={<ArrowRight className="h-4 w-4" />} sx={{ fontWeight: 700, color: 'primary.main', textTransform: 'none', '&:hover': { bgcolor: 'primary.50' }, borderRadius: 4, px: 2 }}>
            Browse More
          </Button>
        </Box>

        {enrolledCourses.length === 0 ? (
          <Card sx={{ borderRadius: 4, textAlign: 'center', py: { xs: 8, sm: 12 }, px: { xs: 2, sm: 4 }, boxShadow: '0 10px 40px -10px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}>
            <Box sx={{ bgcolor: '#f8fafc', width: { xs: 72, sm: 84 }, height: { xs: 72, sm: 84 }, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3, boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.05)' }}>
              <PlayCircle className="h-8 w-8 text-slate-300" />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: '#0f172a', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>No active courses found</Typography>
            <Typography sx={{ color: '#64748b', mb: 4, maxWidth: 420, mx: 'auto', lineHeight: 1.6, fontSize: { xs: '0.9rem', sm: '1rem' } }}>You haven't enrolled in any courses yet. Explore our premium catalog and start your learning journey today.</Typography>
            <Button component={RouterLink} to="/courses" variant="contained" size="large" sx={{ borderRadius: 6, px: { xs: 4, sm: 6 }, py: 1.5, fontWeight: 700, boxShadow: '0 8px 20px rgba(99,102,241,0.3)', '&:hover': { boxShadow: '0 12px 28px rgba(99,102,241,0.4)', transform: 'translateY(-2px)' }, transition: 'all 0.3s ease' }}>
              Explore Curriculum
            </Button>
          </Card>
        ) : (
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {enrolledCourses.map(({ enrollment, course }) => (
              <motion.div key={enrollment.id} variants={fadeIn}>
                <Card sx={{ 
                  display: 'flex', flexDirection: 'column', height: '100%', 
                  borderRadius: 4, overflow: 'hidden',
                  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.06)',
                  transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
                  '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 20px 40px -10px rgba(99,102,241,0.15)' }
                }}>
                  <Box sx={{ position: 'relative', height: { xs: 170, sm: 190 }, overflow: 'hidden' }}>
                    <img src={course.thumbnailUrl} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 100%)' }} />
                    <Box sx={{ position: 'absolute', bottom: 14, left: 16 }}>
                      <Chip label={course.level} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.22)', color: 'white', fontWeight: 700, backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }} />
                    </Box>
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1, p: { xs: 2.5, sm: 3.5 }, pb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2.5, lineHeight: 1.35, color: '#0f172a', fontSize: { xs: '1.05rem', sm: '1.2rem' } }}>
                      {course.title}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.2 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Progress
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', fontSize: '0.85rem' }}>
                        {enrollment.progressPercentage}%
                      </Typography>
                    </Box>
                    <Box sx={{ position: 'relative', height: 6, bgcolor: 'slate.100', borderRadius: 4, overflow: 'hidden' }}>
                      <Box sx={{ 
                        position: 'absolute', left: 0, top: 0, bottom: 0, 
                        width: `${enrollment.progressPercentage}%`, 
                        background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)',
                        borderRadius: 4,
                        transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
                      }} />
                    </Box>
                  </CardContent>
                  
                  <Box sx={{ p: { xs: 2.5, sm: 3.5 }, pt: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, color: '#64748b' }}>
                      <BarChart className="h-4 w-4" />
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>{course.modules.length} Modules</Typography>
                    </Box>
                    <Button 
                      component={RouterLink} 
                      to={`/learn/${course.slug}`} 
                      variant="contained" 
                      color="primary" 
                      endIcon={<PlayCircle className="h-4 w-4" />}
                      sx={{ borderRadius: 6, fontWeight: 700, px: { xs: 2.5, sm: 3 }, py: 1, boxShadow: '0 4px 14px rgba(99,102,241,0.2)', textTransform: 'none' }}
                    >
                      {enrollment.progressPercentage > 0 ? 'Continue' : 'Start'}
                    </Button>
                  </Box>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </Box>
    </Box>
  );
};
