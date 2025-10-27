# Winlow Estate

Winlow Estate is a modern web application built with React and TypeScript, designed to manage estate-related operations such as resident management, dashboards, and user authentication. The project leverages Vite for fast development and building, Tailwind CSS for styling, and Radix UI components for accessible and customizable UI elements.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Development Dependencies](#development-dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Dashboard**: A comprehensive dashboard for estate management insights.
- **Resident Management**: Add, edit, and view residents with a responsive table.
- **Authentication**: Secure user authentication via AuthContext.
- **Responsive UI**: Built with Tailwind CSS and Radix UI components for accessibility and responsiveness.
- **Modals and Navigation**: Includes modals for adding/editing residents and a navigation menu for seamless user experience.
- **Animations**: Smooth transitions and animations using Framer Motion.

## Project Structure
```plaintext
winlow-estate/
├── src/
│   ├── assets/                     # Static assets like images and SVGs
│   │   └── react.svg
│   ├── components/                 # Reusable React components
│   │   ├── ui/                    # Radix UI-based components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   ├── AddResidentModal.tsx
│   │   ├── AppButton.tsx
│   │   ├── DashBoardCard.tsx
│   │   ├── EditResidentModal.tsx
│   │   ├── Layout.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Toast.tsx
│   │   ├── UserInfo.tsx
│   ├── context/                    # React context for state management
│   │   └── AuthContext.tsx
│   ├── data/                      # Mock data and constants
│   │   ├── mockUsers.ts
│   │   ├── residents.ts
│   ├── lib/                       # Utility functions
│   │   └── utils.ts
│   ├── pages/                     # Page components for routing
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   ├── Residents.tsx
│   │   ├── Settings.tsx
│   ├── table/                     # Table-related components
│   │   └── ResidentsTable.tsx
│   ├── App.css                    # Global CSS styles
│   ├── App.tsx                    # Main App component
│   ├── index.css                  # Entry CSS file
│   ├── main.tsx                   # Entry point for React
├── package.json                   # Project metadata and dependencies
├── README.md                      # This file



Installation

Clone the repository:
bashgit clone <repository-url>
cd winlow-estate

Install dependencies:
bashnpm install

Set up environment:

No additional environment variables are required for the basic setup. If needed, create a .env file based on your requirements.


Run the development server:
bashnpm run dev
The app will be available at http://localhost:5173 (or another port if configured).

Scripts

npm run dev: Starts the Vite development server.
npm run build: Builds the app for production with TypeScript compilation.
npm run lint: Runs ESLint to check for code quality issues.
npm run preview: Previews the production build locally.

Dependencies

React & React DOM: Core libraries for building the UI (^19.1.1).
React Router DOM: For client-side routing (^7.9.4).
Radix UI Components: Accessible UI primitives for buttons, dialogs, dropdowns, etc.
Tailwind CSS: Utility-first CSS framework for styling.
Framer Motion: For animations and transitions (^12.23.24).
Lucide React: Icon library for React (^0.548.0).
Class Variance Authority & Tailwind Merge: For managing Tailwind CSS classes dynamically.
Full list in package.json.

Development Dependencies

TypeScript: For type-safe JavaScript (~5.9.3).
Vite: Fast build tool and development server (^7.1.7).
ESLint: For linting and maintaining code quality.
Autoprefixer & PostCSS: For CSS vendor prefixing and processing.
@vitejs/plugin-react: React plugin for Vite.
Full list in package.json.

Contributing

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request.
