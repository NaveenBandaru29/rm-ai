# RM AI — AI & Data Science Learning Platform

RM AI is a modern, high-performance web application designed for learning Artificial Intelligence, Machine Learning, Data Science, and Data Analytics. Built with React 19, TypeScript, Vite, Material UI, and Tailwind CSS, it delivers a smooth, interactive e-learning experience complete with course discovery, rich curriculum exploration, and an LMS course player.

---

## Key Features

### 1. Dynamic Landing Page & Discovery
- **Hero Section**: Modern value proposition banner with quick CTA buttons and animated badge highlights.
- **Platform Metrics & Stats**: Highlighted live statistics (10,000+ Learners, 50+ Premium Courses, 4.8/5 Average Rating, 5,000+ Alumni).
- **Curated Category Explorer**: Categorized course tabs to quickly jump into specific AI/DS specializations.
- **Featured Course Grid**: Live preview cards displaying badges for difficulty level, duration, rating, skills, and pricing.
- **Why Choose RM AI**: Core differentiators including industry-aligned curriculum, hands-on capstone projects, and 1-on-1 mentorship.
- **Student Testimonials**: Community feedback showcasing real career transformations.

### 2. Course Catalog & Smart Filtering
- **Real-Time Keyword Search**: Instantly searches course titles, descriptions, and taggable skills.
- **Multi-Category Filter**: Filter courses by:
  - *Artificial Intelligence*
  - *Machine Learning*
  - *Data Science*
  - *Data Analytics*
- **Level Filters**: Filter by difficulty (*Beginner*, *Intermediate*, *Advanced*).
- **Responsive Drawer & Grid**: Collapsible mobile filter drawer and responsive card layouts.

### 3. In-Depth Course Details & Syllabus
- **Comprehensive Overview**: Deep-dive course landing page with title, rating, review counts, instructor details, and pricing.
- **Full Module & Lesson Breakdown**: Expandable syllabus accordion showing:
  - Video lectures
  - Reading materials
  - Practical projects & assignments
  - Quiz assessments
- **Skill Tags**: Badges for key technologies (Python, TensorFlow, PyTorch, SQL, Tableau, MLOps, etc.).
- **Instructor Profiles**: Detailed credentials, bio, and avatar for each subject-matter expert.
- **One-Click Enrollment**: Seamless CTA to jump directly into the course player.

### 4. Interactive LMS Course Player (`/learn/:slug`)
- **Distraction-Free Environment**: Full-screen, focused learning player interface.
- **Dynamic Curriculum Sidebar**: Structured modules with lesson status indicators (completed vs. upcoming).
- **Interactive Progress Tracking**: Check off completed lessons with live progress bar updates.
- **Multi-Format Content Viewer**: Dedicated viewports for video lectures, reading articles, quizzes, and project guidelines.
- **Navigation Controls**: Next Lesson / Previous Lesson navigation with responsive mobile syllabus drawer.

### 5. Global Quick Search Modal
- **Spotlight Search Dialog**: Accessible anytime from the navigation bar.
- **Instant Search Results**: Live filtering of the course catalog with direct one-click routing to courses.
- **Keyboard Friendly**: Quick dismissal and focused search input.

### 6. User Dashboard & Account Services
- **Student Dashboard**: Tracks currently enrolled courses, overall completion percentage, and last accessed lessons.
- **Mock Authentication & Persistence**: `AuthService` and `EnrollmentService` utilizing browser `localStorage` for progress persistence without requiring a backend server.

### 7. Informational & Support Pages
- **About Us**: Organization mission, vision, learning philosophy, and core team.
- **FAQ Page**: Expandable accordion addressing common queries (prerequisites, certification, career support).
- **Legal Compliance**: Dedicated views for *Terms of Service*, *Privacy Policy*, and *Cookie Policy*.
- **404 Handling**: Friendly error page guiding lost users back to safety.

---

## Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool & Bundler** | [Vite 8](https://vite.dev/) |
| **Component Library** | [Material UI (MUI v9)](https://mui.com/) + Emotion |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + Vanilla CSS |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) + MUI Icons |
| **Routing** | [React Router v7](https://reactrouter.com/) |
| **Linter & Tools** | [Oxlint](https://oxc.rs/) |

---

## Project Structure

```
rm-ai/
├── public/                  # Static assets and favicons
├── src/
│   ├── assets/              # Images, vector graphics, and logos
│   ├── components/
│   │   ├── common/          # SearchModal, ScrollToTop, ScrollToTopButton
│   │   ├── layout/          # Navbar, Footer, MainLayout
│   │   └── ui/              # Reusable Button and Card primitives
│   ├── data/
│   │   ├── mockData.ts      # Courses, categories, instructors, and lessons
│   │   └── uiConfig.tsx     # Centralized navigation links, FAQs, and footer config
│   ├── pages/
│   │   ├── Home.tsx         # Landing page
│   │   ├── Catalog.tsx      # Course catalog with search & filters
│   │   ├── CourseDetail.tsx # Syllabus, instructor info, enrollment
│   │   ├── Learn.tsx        # LMS learning player with lesson progress
│   │   ├── Dashboard.tsx    # Enrolled courses and learning statistics
│   │   ├── About.tsx        # Company about page
│   │   ├── FAQ.tsx          # Frequently asked questions
│   │   ├── Legal.tsx        # Terms, Privacy, and Cookie policies
│   │   └── NotFound.tsx     # 404 page
│   ├── services/
│   │   ├── AuthService.ts       # Authentication service (localStorage-backed)
│   │   ├── CourseService.ts     # Course & category queries
│   │   └── EnrollmentService.ts # Course enrollments & progress tracking
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces (Course, Module, Lesson, User, etc.)
│   ├── App.tsx              # Router and top-level route configuration
│   ├── main.tsx             # Application bootstrap & ThemeProvider
│   └── theme.ts             # MUI theme customizations & color tokens
├── package.json             # Dependencies and scripts
├── vite.config.ts           # Vite configuration
└── README.md                # Project documentation
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ or 20+ recommended)
- `npm` or `pnpm` / `yarn`

### Installation
1. Clone the repository or navigate to the project directory:
   ```bash
   cd rm-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Available Scripts
- `npm run dev`: Runs Vite dev server with Hot Module Replacement (HMR).
- `npm run build`: Compiles TypeScript and creates optimized production bundle in `dist/`.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Runs fast code analysis using Oxlint.

---

## License
This project is open-source and available under the [MIT License](LICENSE).
