import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { Clock, Star, Users, BookOpen, CheckCircle, PlayCircle, ShieldCheck, ChevronRight, ChevronDown as ExpandMoreIcon, FileText, HelpCircle, Download } from 'lucide-react';
import { Button, Card, CardContent, Typography, Box, Accordion, AccordionSummary, AccordionDetails, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CourseService } from '../services/CourseService';
import type { Course } from '../types';


export const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!slug) return;
      try {
        const data = await CourseService.getCourseBySlug(slug);
        setCourse(data || null);
      } catch (error) {
        console.error("Failed to fetch course details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [slug]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 20 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!course) {
    return (
      <Box sx={{ textAlign: 'center', py: 20, px: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>Course not found</Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>The course you are looking for does not exist or has been removed.</Typography>
        <Button component={RouterLink} to="/courses" variant="contained">Back to Catalog</Button>
      </Box>
    );
  }

  const handleEnroll = () => {
    // Navigate directly to the LMS lesson player in demo mode while backend/checkout is disabled
    navigate(`/learn/${course.slug}`);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 10 }}>
      <Helmet>
        <title>{course.title} • RM AI</title>
        <meta name="description" content={course.shortDescription} />
      </Helmet>

      {/* Course Hero */}
      <Box sx={{ position: 'relative', bgcolor: 'primary.900', color: 'primary.contrastText', pt: { xs: 14, sm: 16, lg: 18 }, pb: { xs: 8, lg: 12 }, overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #1e1b4b 0%, rgba(30, 27, 75, 0.8) 100%)', zIndex: 1 }} />
        <Box 
          component="img"
          src={course.thumbnailUrl} 
          alt={course.title} 
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }}
        />
        
        <Box sx={{ maxWidth: 'lg', mx: 'auto', px: { xs: 2, sm: 3, lg: 4 }, position: 'relative', zIndex: 2 }}>
          <Box sx={{ maxWidth: 800 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'primary.200', fontSize: '0.875rem', fontWeight: 500, mb: 3 }}>
              <RouterLink to="/courses" style={{ color: 'inherit', textDecoration: 'none' }}>Courses</RouterLink>
              <ChevronRight className="h-4 w-4" />
              <span>{course.level}</span>
            </Box>
            
            <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 2.5, lineHeight: 1.2, fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' } }}>
              {course.title}
            </Typography>
            
            <Typography variant="h6" component="p" sx={{ mb: 3.5, color: 'primary.100', fontWeight: 400, maxWidth: 700, lineHeight: 1.6, fontSize: { xs: '0.95rem', sm: '1.15rem' } }}>
              {course.shortDescription}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2, sm: 3, md: 4 }, color: 'primary.200', fontSize: '0.875rem' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Box component="span" sx={{ fontWeight: 600, color: 'white' }}>{course.rating}</Box>
                <span>({course.reviewCount} ratings)</span>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Users className="h-5 w-5" />
                <span>12k+ enrolled</span>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Clock className="h-5 w-5" />
                <span>{course.durationHours} hours of content</span>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Course Content Grid */}
      <Box sx={{ maxWidth: 'lg', mx: 'auto', px: { xs: 2, sm: 3, lg: 4 }, py: 8 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: { xs: 6, lg: 8 }, alignItems: 'start' }}>
          
          {/* Left Column (Main Content) */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>About this course</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {course.description}
              </Typography>
            </motion.section>

            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>What you'll learn</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                {course.skills.map(skill => (
                  <Box key={skill} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <CheckCircle className="h-5 w-5 text-primary-main flex-shrink-0 mt-0.5" />
                    <Typography variant="body2" color="text.primary">{skill}</Typography>
                  </Box>
                ))}
              </Box>
            </motion.section>

            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>Course Curriculum</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {course.modules.map((module, mIdx) => {
                  const moduleDuration = module.lessons.reduce((acc, lesson) => acc + lesson.durationMinutes, 0);
                  const hrs = Math.floor(moduleDuration / 60);
                  const mins = moduleDuration % 60;
                  const durationStr = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;

                  return (
                    <Accordion 
                      key={module.id} 
                      disableGutters 
                      elevation={0}
                      defaultExpanded={mIdx === 0}
                      sx={{ 
                        '&:before': { display: 'none' },
                        border: '1px solid',
                        borderColor: 'rgba(0,0,0,0.05)',
                        borderRadius: '16px !important',
                        bgcolor: 'white',
                        overflow: 'hidden',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                        transition: 'box-shadow 0.3s',
                        '&:hover': { boxShadow: '0 8px 30px rgba(99,102,241,0.08)' }
                      }}
                    >
                      <AccordionSummary 
                        expandIcon={<ExpandMoreIcon className="text-primary-main" />}
                        sx={{ 
                          bgcolor: '#f8fafc', 
                          p: { xs: 2, md: 3 },
                          '&.Mui-expanded': { borderBottom: '1px solid rgba(0,0,0,0.05)' } 
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', pr: 2, alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                          <Box>
                            <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, mb: 0.5, display: 'block' }}>
                              Module {module.order}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e1b4b', lineHeight: 1.2 }}>
                              {module.title}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, color: 'text.secondary' }}>
                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 500 }}>
                              <BookOpen className="h-4 w-4" /> {module.lessons.length} lessons
                            </Typography>
                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 500 }}>
                              <Clock className="h-4 w-4" /> {durationStr}
                            </Typography>
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails sx={{ p: 0, bgcolor: 'white' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          {module.lessons.map((lesson, lIdx) => (
                            <Box 
                              key={lesson.id} 
                              sx={{ 
                                display: 'flex', alignItems: 'center', gap: 3, py: 2.5, px: { xs: 2, md: 4 },
                                borderBottom: lIdx !== module.lessons.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                                transition: 'background-color 0.2s',
                                '&:hover': { bgcolor: '#f8fafc' }
                              }}
                            >
                              <Box sx={{ 
                                bgcolor: lesson.type === 'video' ? 'primary.50' : lesson.type === 'quiz' ? 'warning.50' : 'success.50', 
                                p: 1.5, borderRadius: '50%', display: 'flex' 
                              }}>
                                {lesson.type === 'video' ? (
                                  <PlayCircle className="h-5 w-5 text-primary-main" />
                                ) : lesson.type === 'quiz' ? (
                                  <HelpCircle className="h-5 w-5 text-warning-main" />
                                ) : (
                                  <FileText className="h-5 w-5 text-success-main" />
                                )}
                              </Box>
                              
                              <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>{lesson.title}</Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{lesson.type}</Typography>
                              </Box>
                              
                              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>{lesson.durationMinutes} min</Typography>
                            </Box>
                          ))}
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </Box>
            </motion.section>
          </Box>

          {/* Right Column (Sidebar details: Top on mobile, sticky sidebar on desktop) */}
          <Box sx={{ position: { xs: 'static', lg: 'sticky' }, top: 100, order: { xs: -1, lg: 0 } }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Card sx={{ boxShadow: 12, borderRadius: 4, border: 'none', overflow: 'hidden' }}>
                <Box sx={{ height: 220, position: 'relative' }}>
                  <img src={course.thumbnailUrl} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(0,0,0,0.4)', transition: 'background-color 0.3s', '&:hover': { bgcolor: 'rgba(0,0,0,0.2)' } }}>
                    <PlayCircle className="h-16 w-16 text-white opacity-90 cursor-pointer" />
                  </Box>
                </Box>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3 }}>₹{course.price}</Typography>
                  <Button fullWidth size="large" variant="contained" onClick={handleEnroll} sx={{ mb: 1, py: 1.5, fontSize: '1.05rem', fontWeight: 600 }}>
                    Start Learning (Demo Preview)
                  </Button>
                  <Button 
                    fullWidth 
                    size="large" 
                    variant="outlined" 
                    startIcon={<Download className="h-5 w-5" />}
                    onClick={() => alert('Brochure download will be implemented later!')} 
                    sx={{ mb: 2, py: 1.5, fontSize: '1.05rem', fontWeight: 600, borderRadius: 6, borderWidth: 2, '&:hover': { borderWidth: 2 } }}
                  >
                    Download Brochure
                  </Button>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mb: 4, fontSize: '0.8rem' }}>
                    Full demo preview accessible without login.
                  </Typography>
                  
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>This course includes:</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, fontSize: '0.875rem', color: 'text.secondary' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <BookOpen className="h-5 w-5 text-primary-main" />
                      <span>{course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} interactive lessons</span>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Clock className="h-5 w-5 text-primary-main" />
                      <span>{course.durationHours} hours of content</span>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <FileText className="h-5 w-5 text-primary-main" />
                      <span>Downloadable resources</span>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <ShieldCheck className="h-5 w-5 text-primary-main" />
                      <span>Certificate of completion</span>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
