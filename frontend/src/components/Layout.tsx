import React, { type ReactNode } from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  backgroundClass?: string;
}
const Layout: React.FC<LayoutProps> = ({ children, backgroundClass = '' }) => {
  return (
    <div className={`min-h-screen flex flex-col relative overflow-hidden ${backgroundClass}`}>
      
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className="absolute w-3 h-3 rounded-full opacity-30 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: getRandomColor(),
              animationDuration: `${5 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>


      <nav className="flex items-center bg-black p-4 justify-end md:text-lg border-b-black border-b-[1px] fixed top-0 z-50 w-full text-white">
        <div className="flex items-center gap-3 md:gap-5 lg:gap-7">
          <Link to='/'>Home</Link>
          <Link to='/all-videos'>All Videos</Link>
          <Link to='/sign-up'>Sign In</Link>
        </div>
      </nav>

 
      <main className="flex-1 flex flex-col items-center w-full mt-16 z-10">
        {children}
      </main>

     
      <footer className="bg-gray-200 text-center p-6 z-10">
        <p className="text-lg font-semibold mb-4">Empowering Ideas, One Line of Code at a Time</p>
        <div className="flex justify-center gap-6 text-2xl">
          <a href="https://github.com/akshaysolan" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black transition-colors">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/akshaysolanke" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition-colors">
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com/akshaysolanke__/" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 transition-colors">
            <FaInstagram />
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-500">© 2025 Akshay Solanke. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;


const getRandomColor = () => {
  const colors = [
    '#ffffff',
    '#93c5fd',
    '#fca5a5',
    '#fcd34d',
    '#a78bfa',
    '#6ee7b7',
    '#f9a8d4',
    '#fdba74',
    '#818cf8',
    '#5eead4'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

