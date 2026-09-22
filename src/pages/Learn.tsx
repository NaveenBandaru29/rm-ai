import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { 
  Box, Typography, Button, IconButton, CircularProgress, LinearProgress, 
  Accordion, AccordionSummary, AccordionDetails, Divider, Drawer
} from '@mui/material';
import { 
  PlayCircle, CheckCircle2, Circle, ChevronDown, ArrowLeft, 
  LayoutList, FileText, CheckCircle, Menu as MenuIcon
} from 'lucide-react';
import { CourseService } from '../services/CourseService';
// import { EnrollmentService } from '../services/EnrollmentService';
// import { AuthService } from '../services/AuthService';
import type { Course, Lesson, Enrollment, Module } from '../types';

export const Learn = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [completing, setCompleting] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Auth check commented out for free demo preview mode
        // const user = await AuthService.getCurrentUser();
        // if (!user) {
        //   navigate('/login');
        //   return;
        // }

        const allCourses = await CourseService.getAllCourses();
        const foundCourse = allCourses.find(c => c.slug === slug);
        
        if (!foundCourse) {
          navigate('/courses');
          return;
        }
        
        setCourse(foundCourse);

        // Demo enrollment allows viewing lessons without backend authentication
        const demoEnrollment: Enrollment = {
          id: `enr-demo-${foundCourse.id}`,
          userId: 'demo-learner',
          courseId: foundCourse.id,
          enrolledAt: new Date().toISOString(),
          completedLessonIds: [],
          progressPercentage: 0
        };

        setEnrollment(demoEnrollment);
        
        // Find first lesson to play, or first incomplete lesson
        if (foundCourse.modules.length > 0 && foundCourse.modules[0].lessons.length > 0) {
          let targetLesson = foundCourse.modules[0].lessons[0];
          
          // Try to find the first incomplete lesson
          for (const m of foundCourse.modules) {
            const incomplete = m.lessons.find(l => !demoEnrollment.completedLessonIds.includes(l.id));
            if (incomplete) {
              targetLesson = incomplete;
              setExpandedModules([m.id]);
              break;
            }
          }
          
          setActiveLesson(targetLesson);
          if (expandedModules.length === 0) {
             setExpandedModules([foundCourse.modules[0].id]);
          }
        }
      } catch (err) {
        console.error("Failed to load LMS data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, navigate]);

  const handleToggleModule = (moduleId: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedModules(prev => 
      isExpanded ? [...prev, moduleId] : prev.filter(id => id !== moduleId)
    );
  };

  const handleLessonSelect = (lesson: Lesson, moduleId: string) => {
    setActiveLesson(lesson);
    if (!expandedModules.includes(moduleId)) {
      setExpandedModules(prev => [...prev, moduleId]);
    }
    setMobileDrawerOpen(false); // Close drawer on mobile after selection
  };

  const handleMarkComplete = async () => {
    if (!activeLesson || !course || !enrollment) return;
    
    setCompleting(true);
    // In demo mode without backend auth, toggle completion locally
    const isAlready = enrollment.completedLessonIds.includes(activeLesson.id);
    const updatedCompleted = isAlready 
      ? enrollment.completedLessonIds 
      : [...enrollment.completedLessonIds, activeLesson.id];

    const totalCount = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const updatedProgress = totalCount === 0 ? 0 : Math.round((updatedCompleted.length / totalCount) * 100);

    const updatedEnrollment: Enrollment = {
      ...enrollment,
      completedLessonIds: updatedCompleted,
      progressPercentage: updatedProgress
    };
    
    setEnrollment(updatedEnrollment);
    
    // Auto-advance to next lesson
    let foundCurrent = false;
    let nextLesson: { l: Lesson, mId: string } | null = null;
    
    for (const m of course.modules) {
      for (const l of m.lessons) {
        if (foundCurrent) {
          nextLesson = { l, mId: m.id };
          break;
        }
        if (l.id === activeLesson.id) {
          foundCurrent = true;
        }
      }
      if (nextLesson) break;
    }

    if (nextLesson) {
      setActiveLesson(nextLesson.l);
      if (!expandedModules.includes(nextLesson.mId)) {
         setExpandedModules(prev => [...prev, nextLesson.mId]);
      }
    }
    setCompleting(false);
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'slate.900' }}>
        <CircularProgress sx={{ color: 'primary.light' }} />
      </Box>
    );
  }

  if (!course || !enrollment || !activeLesson) return null;

  const isCompleted = enrollment.completedLessonIds.includes(activeLesson.id);

  // Calculate actual progress based on total lessons
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = enrollment.completedLessonIds.length;
  const progressPercent = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#f8fafc', overflow: 'hidden' }}>
      
      {/* Top Navigation Bar */}
      <Box sx={{ height: 64, bgcolor: '#1e1b4b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton component={RouterLink} to="/courses" sx={{ color: 'white' }}>
            <ArrowLeft className="h-5 w-5" />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>
            {course.title}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton 
            onClick={() => setMobileDrawerOpen(true)} 
            sx={{ color: 'white', display: { lg: 'none' } }}
          >
            <MenuIcon className="h-5 w-5" />
          </IconButton>
          <Box sx={{ width: 150, display: { xs: 'none', sm: 'block' } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>Your Progress</Typography>
              <Typography variant="caption" sx={{ fontWeight: 700 }}>{progressPercent}%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={progressPercent} sx={{ height: 6, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.2)', '& .MuiLinearProgress-bar': { bgcolor: 'green.400' } }} />
          </Box>
        </Box>
      </Box>

      {/* Main LMS Area */}
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        
        {/* Content Area */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', bgcolor: 'white' }}>
          
          {/* Mock Video Player */}
          <Box sx={{ width: '100%', bgcolor: 'black', position: 'relative', pt: '56.25%' /* 16:9 Aspect Ratio */ }}>
            <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: `url(${course.thumbnailUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} />
              
              <Box sx={{ zIndex: 10, textAlign: 'center' }}>
                <IconButton sx={{ color: 'white', '&:hover': { transform: 'scale(1.1)' }, transition: 'transform 0.2s' }}>
                  <PlayCircle size={80} strokeWidth={1} />
                </IconButton>
                <Typography variant="body1" sx={{ color: 'white', mt: 2, fontWeight: 500 }}>
                  {activeLesson.durationMinutes}m
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Lesson Details */}
          <Box sx={{ p: { xs: 2.5, sm: 4, md: 6 }, maxWidth: 1000, mx: 'auto', width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'flex-start' }, mb: 4, flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e1b4b', mb: 1, fontSize: { xs: '1.4rem', sm: '1.85rem', md: '2.125rem' } }}>
                  {activeLesson.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'text.secondary' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <PlayCircle className="h-4 w-4" /> <Typography variant="body2">{activeLesson.type}</Typography>
                  </Box>
                  •
                  <Typography variant="body2">{activeLesson.durationMinutes} mins</Typography>
                </Box>
              </Box>

              <Button 
                variant={isCompleted ? "outlined" : "contained"} 
                color={isCompleted ? "success" : "primary"}
                onClick={handleMarkComplete}
                disabled={isCompleted || completing}
                startIcon={isCompleted ? <CheckCircle className="h-5 w-5" /> : null}
                sx={{ borderRadius: 3, py: 1.5, px: 3, fontWeight: 600, width: { xs: '100%', sm: 'auto' } }}
              >
                {completing ? <CircularProgress size={24} /> : isCompleted ? 'Completed' : 'Mark as Complete'}
              </Button>
            </Box>
            
            <Divider sx={{ mb: 4 }} />
            
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '1.1rem' }}>
              In this lesson, you will dive deep into the concepts of {activeLesson.title.toLowerCase()}. 
              Pay close attention to the practical demonstrations as they will form the foundation for the upcoming interactive lab exercises.
              <br /><br />
              Don't forget to review the supplementary materials attached below before taking the module quiz.
            </Typography>

            {/* Mock Downloads Section */}
            <Box sx={{ mt: 6 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Resources</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="outlined" startIcon={<FileText className="h-4 w-4" />} sx={{ borderRadius: 2 }}>
                  Lesson Slides (PDF)
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Sidebar Content (Re-usable) */}
        {(() => {
          const sidebarContent = (
            <>
              <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'white', position: 'sticky', top: 0, zIndex: 10 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e1b4b', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LayoutList className="h-5 w-5 text-primary-main" /> Course Content
                </Typography>
              </Box>
              
              <Box sx={{ p: 2 }}>
                {course.modules.map((m: Module, idx: number) => (
                  <Accordion 
                    key={m.id} 
                    expanded={expandedModules.includes(m.id)}
                    onChange={handleToggleModule(m.id)}
                    disableGutters
                    elevation={0}
                    sx={{ mb: 2, border: '1px solid', borderColor: 'divider', borderRadius: '12px !important', '&:before': { display: 'none' }, overflow: 'hidden' }}
                  >
                    <AccordionSummary expandIcon={<ChevronDown />} sx={{ bgcolor: 'white', '&.Mui-expanded': { borderBottom: '1px solid', borderColor: 'divider' } }}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: 1, mb: 0.5 }}>
                          Module {idx + 1}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e1b4b', lineHeight: 1.2 }}>
                          {m.title}
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    
                    <AccordionDetails sx={{ p: 0, bgcolor: '#f8fafc' }}>
                      {m.lessons.map((lesson: Lesson) => {
                        const isLessonActive = activeLesson.id === lesson.id;
                        const isLessonComplete = enrollment.completedLessonIds.includes(lesson.id);
                        
                        return (
                          <Box 
                            key={lesson.id} 
                            onClick={() => handleLessonSelect(lesson, m.id)}
                            sx={{ 
                              py: 2, px: 3, cursor: 'pointer',
                              display: 'flex', alignItems: 'flex-start', gap: 2,
                              borderBottom: '1px solid rgba(0,0,0,0.04)',
                              bgcolor: isLessonActive ? 'primary.50' : 'transparent',
                              '&:hover': { bgcolor: isLessonActive ? 'primary.50' : 'rgba(0,0,0,0.02)' },
                              '&:last-child': { borderBottom: 'none' }
                            }}
                          >
                            <Box sx={{ mt: 0.3 }}>
                              {isLessonComplete ? (
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                              ) : isLessonActive ? (
                                <PlayCircle className="h-5 w-5 text-primary-main" />
                              ) : (
                                <Circle className="h-5 w-5 text-slate-300" />
                              )}
                            </Box>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: isLessonActive ? 700 : 500, color: isLessonActive ? 'primary.main' : 'text.primary', mb: 0.5 }}>
                                {lesson.title}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                {lesson.type === 'video' ? <PlayCircle className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
                                {lesson.durationMinutes}m
                              </Typography>
                            </Box>
                          </Box>
                        );
                      })}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </>
          );

          return (
            <>
              {/* Desktop Sidebar */}
              <Box sx={{ width: { xs: 0, lg: 400 }, flexShrink: 0, borderLeft: '1px solid', borderColor: 'divider', bgcolor: '#f8fafc', display: { xs: 'none', lg: 'flex' }, flexDirection: 'column', overflowY: 'auto' }}>
                {sidebarContent}
              </Box>

              {/* Mobile Drawer Sidebar */}
              <Drawer
                anchor="right"
                open={mobileDrawerOpen}
                onClose={() => setMobileDrawerOpen(false)}
                sx={{
                  display: { xs: 'block', lg: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: { xs: 280, sm: 350 }, bgcolor: '#f8fafc' },
                }}
              >
                {sidebarContent}
              </Drawer>
            </>
          );
        })()}
        
      </Box>
    </Box>
  );
};
