
import React from 'react';
import { BioData } from '../types';
import { useTheme } from '../contexts/ThemeContext';

const GithubIcon: React.FC = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.577.688.48A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
);
const LinkedinIcon: React.FC = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
);
const TwitterIcon: React.FC = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);

const Footer: React.FC<{ bio: BioData | null }> = ({ bio }) => {
  const { theme } = useTheme();
  const footerBgClass = theme === 'dark' ? 'bg-slate-900' : 'bg-slate-100/50';
  const textColorClass = theme === 'dark' ? 'text-slate-400' : 'text-slate-600';
  const linkClass = "hover:text-[var(--primary-color)] transition-colors duration-300";

  return (
    <footer className={`${footerBgClass} py-8 mt-24 border-t border-slate-200 dark:border-slate-800`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${textColorClass}`}>
        {bio ? (
          <>
            <h3 className="text-xl font-semibold text-[var(--primary-color)] mb-4">{bio.name}</h3>
            <div className="flex justify-center gap-6 mb-4">
                <a href={bio.github} target="_blank" rel="noopener noreferrer" className={linkClass}><GithubIcon /></a>
                <a href={bio.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}><LinkedinIcon /></a>
                <a href={bio.twitter} target="_blank" rel="noopener noreferrer" className={linkClass}><TwitterIcon /></a>
            </div>
            <p className="text-sm">&copy; {new Date().getFullYear()} {bio.name}. All rights reserved.</p>
          </>
        ) : (
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-1/4 mx-auto skeleton"></div>
            <div className="flex justify-center gap-6">
              <div className="w-5 h-5 skeleton rounded-full"></div>
              <div className="w-5 h-5 skeleton rounded-full"></div>
              <div className="w-5 h-5 skeleton rounded-full"></div>
            </div>
            <div className="h-4 w-1/3 mx-auto skeleton"></div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
