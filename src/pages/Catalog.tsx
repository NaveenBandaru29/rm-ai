import { useEffect, useState, useMemo } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Search, Filter, BookOpen, Star, PlayCircle, ArrowRight, ChevronDown } from 'lucide-react';
import { Button, Card, CardContent, Typography, Box, TextField, Chip, Skeleton, Divider, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { CourseService } from '../services/CourseService';
import type { Course, Category } from '../types';

export const Catalog = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesData, categoriesData] = await Promise.all([
          CourseService.getAllCourses(),
          CourseService.getAllCategories()
        ]);
        setCourses(coursesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch catalog data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Update selected category when slug changes or when categories are first loaded
  useEffect(() => {
    if (slug && categories.length > 0) {
      const matchingCategory = categories.find(c => c.slug === slug);
      if (matchingCategory) {
        setSelectedCategory(matchingCategory.id);
      }
    } else if (!slug) {
      setSelectedCategory('all');
    }
  }, [slug, categories]);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || course.categoryId === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || course.level.toLowerCase() === selectedLevel.toLowerCase();

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [courses, searchQuery, selectedCategory, selectedLevel]);

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <Box sx={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
        color: 'white', pt: { xs: 16, md: 20 }, pb: { xs: 24, md: 28 }, px: { xs: 2, sm: 3, lg: 4 }, textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        {/* Background Decorative Elements */}
        <Box sx={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }} />
        <Box sx={{ position: 'absolute', top: '-20%', left: '-10%', width: '60%', height: '140%', background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 60%)', filter: 'blur(60px)' }} />
        <Box sx={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '60%', height: '140%', background: 'radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 60%)', filter: 'blur(60px)' }} />

        {/* Floating shapes */}
        <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} style={{ position: 'absolute', top: '20%', right: '15%', opacity: 0.5 }}>
          <Box sx={{ width: 120, height: 120, borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', background: 'linear-gradient(45deg, rgba(99,102,241,0.4), rgba(168,85,247,0.4))', filter: 'blur(12px)' }} />
        </motion.div>

        <motion.div animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} style={{ position: 'absolute', bottom: '30%', left: '10%', opacity: 0.4 }}>
          <Box sx={{ width: 150, height: 150, borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', background: 'linear-gradient(45deg, rgba(56,189,248,0.4), rgba(99,102,241,0.4))', filter: 'blur(12px)' }} />
        </motion.div>

        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 800, mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.75, borderRadius: 50, bgcolor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', mb: 3, backdropFilter: 'blur(10px)' }}>
              <Star className="h-4 w-4 text-yellow-400" />
              <Typography variant="body2" sx={{ fontWeight: 600, letterSpacing: 0.5 }}>PREMIUM LEARNING EXPERIENCE</Typography>
            </Box>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}>
            <Typography variant="h2" component="h1" sx={{ fontWeight: 800, mb: 3, textShadow: '0 4px 20px rgba(0,0,0,0.3)', fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' }, lineHeight: 1.1 }}>
              Master the Future of <br className="hidden sm:block" />
              <Box component="span" sx={{ background: 'linear-gradient(to right, #818cf8, #c084fc, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
                Tech & Data
              </Box>
            </Typography>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 400, maxWidth: 650, mx: 'auto', lineHeight: 1.6, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              Explore our curated selection of interactive courses designed to accelerate your career in AI, Machine Learning, and Data Science.
            </Typography>
          </motion.div>
        </Box>
      </Box>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">

        {/* Search Bar (Floating) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <Box sx={{
            bgcolor: 'white', p: 1, borderRadius: 4,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)', mb: 8,
            display: 'flex', alignItems: 'center',
            border: '1px solid rgba(0,0,0,0.05)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:focus-within': { transform: 'translateY(-2px)', boxShadow: '0 25px 50px rgba(99,102,241,0.15)' }
          }}>
            <Box sx={{ pl: { xs: 2, sm: 3 }, display: 'flex', alignItems: 'center', color: 'primary.main' }}>
              <Search className="h-5 w-5 sm:h-6 sm:w-6" />
            </Box>
            <TextField
              fullWidth
              placeholder="Search courses, skills, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="standard"
              slotProps={{ input: { disableUnderline: true, sx: { py: { xs: 1.5, sm: 2.2 }, px: { xs: 1.5, sm: 3 }, fontSize: { xs: '0.95rem', sm: '1.15rem' }, fontWeight: 500 } } }}
            />
            <Button variant="contained" sx={{ px: { sm: 3, md: 4 }, py: 1.8, borderRadius: 3, display: { xs: 'none', sm: 'block' }, fontWeight: 700 }}>
              Search
            </Button>
          </Box>
        </motion.div>

        {/* Mobile Filter Toggle */}
        <Box sx={{ display: { xs: 'flex', lg: 'none' }, justifyContent: 'space-between', alignItems: 'center', mb: 3, gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Filter className="h-4 w-4" />}
            endIcon={<ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileFiltersOpen ? 'rotate-180' : ''}`} />}
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            sx={{ borderRadius: 6, fontWeight: 700, color: '#1e1b4b', borderColor: 'rgba(0,0,0,0.15)', px: 2.5, py: 0.8, bgcolor: 'white' }}
          >
            {mobileFiltersOpen ? 'Hide Filters' : 'Filter Courses'}
            {(selectedCategory !== 'all' || selectedLevel !== 'all') && (
              <Box component="span" sx={{ ml: 1, bgcolor: 'primary.main', color: 'white', borderRadius: '50%', width: 20, height: 20, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>
                {(selectedCategory !== 'all' ? 1 : 0) + (selectedLevel !== 'all' ? 1 : 0)}
              </Box>
            )}
          </Button>
          {(selectedCategory !== 'all' || selectedLevel !== 'all' || searchQuery) && (
            <Button
              size="small"
              onClick={() => { setSelectedCategory('all'); setSelectedLevel('all'); setSearchQuery(''); }}
              sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'none' }}
            >
              Reset Filters
            </Button>
          )}
        </Box>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar Filters */}
          <Box sx={{ display: { xs: mobileFiltersOpen ? 'block' : 'none', lg: 'block' } }} className="w-full lg:w-72 flex-shrink-0 space-y-6">
            <Card sx={{ borderRadius: 4, boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                  <Filter className="h-5 w-5 text-primary-main" />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Filters</Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, mb: 2, color: 'text.secondary' }}>
                    Category
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Chip
                      label="All Categories"
                      onClick={() => setSelectedCategory('all')}
                      color={selectedCategory === 'all' ? 'primary' : 'default'}
                      variant={selectedCategory === 'all' ? 'filled' : 'outlined'}
                      sx={{ justifyContent: 'flex-start', borderRadius: 2, py: 2, fontWeight: 500 }}
                      clickable
                    />
                    {categories.map(cat => (
                      <Chip
                        key={cat.id}
                        label={cat.name}
                        onClick={() => setSelectedCategory(cat.id)}
                        color={selectedCategory === cat.id ? 'primary' : 'default'}
                        variant={selectedCategory === cat.id ? 'filled' : 'outlined'}
                        sx={{ justifyContent: 'flex-start', borderRadius: 2, py: 2, fontWeight: 500 }}
                        clickable
                      />
                    ))}
                  </Box>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, mb: 2, color: 'text.secondary' }}>
                    Difficulty Level
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Chip
                      label="All Levels"
                      onClick={() => setSelectedLevel('all')}
                      color={selectedLevel === 'all' ? 'primary' : 'default'}
                      variant={selectedLevel === 'all' ? 'filled' : 'outlined'}
                      sx={{ justifyContent: 'flex-start', borderRadius: 2, py: 2, fontWeight: 500 }}
                      clickable
                    />
                    {levels.map(level => (
                      <Chip
                        key={level}
                        label={level}
                        onClick={() => setSelectedLevel(level.toLowerCase())}
                        color={selectedLevel === level.toLowerCase() ? 'primary' : 'default'}
                        variant={selectedLevel === level.toLowerCase() ? 'filled' : 'outlined'}
                        sx={{ justifyContent: 'flex-start', borderRadius: 2, py: 2, fontWeight: 500 }}
                        clickable
                      />
                    ))}
                  </Box>
                </Box>

              </CardContent>
            </Card>
          </Box>

          {/* Course Grid */}
          <div className="flex-grow">
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
              </Typography>
            </Box>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <Card key={i} sx={{ borderRadius: '2rem', height: 450 }}>
                    <Skeleton variant="rectangular" height={220} />
                    <CardContent>
                      <Skeleton variant="text" height={40} width="80%" sx={{ mb: 2 }} />
                      <Skeleton variant="text" height={20} />
                      <Skeleton variant="text" height={20} width="60%" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredCourses.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 12, bgcolor: 'white', borderRadius: 6, border: '1px dashed', borderColor: 'divider' }}>
                <Box sx={{ bgcolor: '#f8fafc', w: 80, h: 80, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
                  <Search className="h-8 w-8 text-slate-300" />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>No courses found</Typography>
                <Typography color="text.secondary">Try adjusting your search or filters to find what you're looking for.</Typography>
                <Button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedLevel('all'); }}
                  variant="outlined"
                  sx={{ mt: 3, borderRadius: 6 }}
                >
                  Clear all filters
                </Button>
              </Box>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8"
              >
                {filteredCourses.map((course, idx) => (
                  <motion.div key={course.id} variants={fadeIn} whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                    <Card sx={{
                      display: 'flex', flexDirection: 'column', height: '100%',
                      borderRadius: 4, overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)',
                      transition: 'all 0.3s ease',
                      '&:hover': { boxShadow: '0 25px 50px rgba(99,102,241,0.15)', borderColor: 'primary.300', transform: 'translateY(-4px)' }
                    }}>
                      <Box sx={{ position: 'relative', height: 240, overflow: 'hidden' }}>
                        <Box
                          component="img"
                          src={course.thumbnailUrl}
                          alt={course.title}
                          sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease', '&:hover': { transform: 'scale(1.08)' } }}
                        />
                        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.2) 50%, transparent 100%)' }} />

                        <Box sx={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 1 }}>
                          <Chip label={course.level} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.95)', color: '#1e1b4b', fontWeight: 700, backdropFilter: 'blur(8px)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                          {idx === 0 && (
                            <Chip label="Bestseller" size="small" sx={{ bgcolor: 'warning.main', color: 'warning.contrastText', fontWeight: 700, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                          )}
                        </Box>

                        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s', '&:hover': { opacity: 1 } }}>
                          <Box sx={{ bgcolor: 'primary.main', borderRadius: '50%', p: 1.5, display: 'flex', boxShadow: '0 0 30px rgba(99,102,241,0.6)' }}>
                            <PlayCircle className="h-12 w-12 text-white" />
                          </Box>
                        </Box>

                        <Box sx={{ position: 'absolute', bottom: 16, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', px: 2, py: 0.75, borderRadius: 3, backdropFilter: 'blur(8px)' }}>
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <Typography variant="body2" sx={{ fontWeight: 700, color: 'white' }}>{course.rating}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', px: 2, py: 0.75, borderRadius: 3, backdropFilter: 'blur(8px)' }}>
                            <BookOpen className="h-4 w-4 text-white" />
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'white' }}>{course.durationHours}h</Typography>
                          </Box>
                        </Box>
                      </Box>

                      <CardContent sx={{ flexGrow: 1, p: 4 }}>
                        <Typography variant="h5" component="h3" sx={{ fontWeight: 800, mb: 2, lineHeight: 1.3, color: '#1e1b4b', transition: 'color 0.2s', '&:hover': { color: 'primary.main' } }}>
                          {course.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', mb: 4, lineHeight: 1.6 }}>
                          {course.shortDescription}
                        </Typography>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                          {course.skills.slice(0, 3).map(skill => (
                            <Chip key={skill} label={skill} size="small" sx={{ bgcolor: 'slate.100', color: 'slate.700', fontWeight: 600, borderRadius: 1.5, '&:hover': { bgcolor: 'slate.200' } }} />
                          ))}
                          {course.skills.length > 3 && (
                            <Tooltip
                              title={
                                <Box sx={{ p: 0.75 }}>
                                  <Typography variant="caption" sx={{ display: 'block', color: '#94a3b8', fontWeight: 700, mb: 1.2, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.7rem' }}>
                                    Additional Skills ({course.skills.length - 3})
                                  </Typography>
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {course.skills.slice(3).map(skill => (
                                      <Chip
                                        key={skill}
                                        label={skill}
                                        size="small"
                                        sx={{
                                          bgcolor: 'rgba(99, 102, 241, 0.2)',
                                          color: '#e0e7ff',
                                          fontWeight: 600,
                                          fontSize: '0.75rem',
                                          borderRadius: 1.5,
                                          border: '1px solid rgba(165, 180, 252, 0.3)'
                                        }}
                                      />
                                    ))}
                                  </Box>
                                </Box>
                              }
                              arrow
                              placement="top"
                              slotProps={{
                                tooltip: {
                                  sx: {
                                    bgcolor: '#0f172a',
                                    color: '#ffffff',
                                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    borderRadius: 2.5,
                                    p: 1.5,
                                    maxWidth: 290
                                  }
                                },
                                arrow: {
                                  sx: { color: '#0f172a', '&::before': { border: '1px solid rgba(255, 255, 255, 0.15)' } }
                                }
                              }}
                            >
                              <Chip
                                label={`+${course.skills.length - 3}`}
                                size="small"
                                sx={{
                                  bgcolor: 'rgba(99, 102, 241, 0.08)',
                                  color: '#4f46e5',
                                  fontWeight: 700,
                                  border: '1px solid rgba(99, 102, 241, 0.25)',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease',
                                  '&:hover': {
                                    bgcolor: '#4f46e5',
                                    color: '#ffffff',
                                    borderColor: '#4f46e5',
                                    transform: 'scale(1.05)'
                                  }
                                }}
                              />
                            </Tooltip>
                          )}
                        </Box>
                      </CardContent>

                      <Box sx={{ p: 4, pt: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.05)', mt: 'auto', paddingTop: 3 }}>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e1b4b', letterSpacing: '-0.02em' }}>₹{course.price}</Typography>
                        <Button component={RouterLink} to={`/courses/${course.slug}`} variant="contained" color="primary" sx={{ borderRadius: 6, fontWeight: 700, px: 3, py: 1 }} endIcon={<ArrowRight className="h-4 w-4" />}>
                          View Course
                        </Button>
                      </Box>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
