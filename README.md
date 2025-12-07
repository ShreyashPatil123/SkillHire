# SkillHire

A modern freelancing platform built with React, TypeScript, and Tailwind CSS that connects skilled professionals with clients seeking talent.

![React](https://img.shields.io/badge/React-18.3.1-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06b6d4?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.4-646cff?style=flat-square&logo=vite)

## ✨ Features

- **User Authentication** - Secure login and signup flows
- **Dashboard** - Personalized dashboard for managing projects and activities
- **Project Management** - Browse, create, and manage projects
- **Milestone Workflow** - Track project progress with milestone-based workflows
- **User Profiles** - Detailed profiles showcasing skills and experience
- **Responsive Design** - Beautiful glassmorphism UI that works on all devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ShreyashPatil123/SkillHire.git
   cd SkillHire
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
SkillHire/
├── src/
│   ├── components/
│   │   ├── layout/       # Layout components (Header, Footer, etc.)
│   │   └── ui/           # Reusable UI components
│   ├── contexts/         # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── AppContext.tsx
│   ├── data/            # Mock data and constants
│   ├── pages/           # Application pages
│   │   ├── Landing.tsx
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── Profile.tsx
│   │   └── MilestoneWorkflow.tsx
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI library with hooks and concurrent features |
| **TypeScript** | Type-safe JavaScript |
| **Tailwind CSS** | Utility-first CSS framework |
| **Vite** | Fast build tool and dev server |
| **React Router** | Client-side routing |

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 🎨 Design System

The application features a modern glassmorphism design with:
- Gradient backgrounds
- Frosted glass effects
- Smooth animations and transitions
- Dark/light mode support ready

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Shreyash Patil**
- GitHub: [@ShreyashPatil123](https://github.com/ShreyashPatil123)

---

<p align="center">Made with ❤️ using React and TypeScript</p>
