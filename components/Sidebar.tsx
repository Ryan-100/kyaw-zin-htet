import React, { useState, useEffect, RefObject } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Bio, THEME_COLORS } from '../data';

const sections = [
  { id: 'about', title: 'About' },
  { id: 'skills', title: 'Skills' },
  { id: 'experience', title: 'Experience' },
  { id: 'projects', title: 'Projects' },
  { id: 'education', title: 'Education' },
];

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
);

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  mainContentRef: RefObject<HTMLElement>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, mainContentRef }) => {
  const [activeSection, setActiveSection] = useState('about');
  const { theme, primaryColor, setPrimaryColor } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: mainContentRef.current, rootMargin: '-40% 0px -60% 0px', threshold: 0 }
    );

    const sectionElements = sections.map(sec => document.getElementById(sec.id)).filter(Boolean);
    sectionElements.forEach((el) => {
      if (el) observer.observe(el);
    });
    
    return () => {
      sectionElements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [mainContentRef]);

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
        <a href="#about" className="text-2xl font-bold tracking-wider">
          <span style={{ color: primaryColor }}>K</span>
          <span>ZH</span>
        </a>
        <button onClick={() => setIsOpen(false)} className="md:hidden text-2xl">
          <CloseIcon />
        </button>
      </div>
      <nav className="p-4">
        <ul>
          {sections.map(section => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 my-1 rounded-md transition-all duration-200 ${
                  activeSection === section.id
                    ? 'font-semibold text-white'
                    : 'hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                }`}
                style={{
                  backgroundColor: activeSection === section.id ? primaryColor : 'transparent',
                }}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto p-4 border-t border-slate-200 dark:border-slate-800">
          <p className="text-sm font-semibold mb-2">Theme Color</p>
          <div className="flex flex-wrap gap-3">
              {THEME_COLORS.map(color => (
                  <button
                      key={color.name}
                      onClick={() => setPrimaryColor(color.hex)}
                      className={`w-6 h-6 rounded-full transition-transform hover:scale-110 border-2 ${primaryColor === color.hex ? 'border-white' : 'border-transparent'}`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={`Set theme color to ${color.name}`}
                  />
              ))}
          </div>
      </div>
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
         <p className="text-xs text-slate-500 dark:text-slate-400">&copy; {new Date().getFullYear()} {Bio.name}</p>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                   transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="w-64 h-full bg-white dark:bg-slate-900 shadow-xl flex flex-col">
          {sidebarContent}
        </div>
        <div className="flex-1" onClick={() => setIsOpen(false)}></div>
      </div>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsOpen(false)}></div>}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-shrink-0">
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;
