import React, { useState, useEffect } from 'react';
import type { BioData } from '../types';
import { useTheme } from '../contexts/ThemeContext';

const GithubIcon: React.FC = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.577.688.48A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
);
const LinkedinIcon: React.FC = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
);

const Typewriter: React.FC<{ roles: string[] }> = ({ roles }) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [blink, setBlink] = useState(true);
    const [reverse, setReverse] = useState(false);

    useEffect(() => {
        if (!roles || roles.length === 0) return;
        if (subIndex === roles[index].length + 1 && !reverse) {
            setTimeout(() => setReverse(true), 1000);
            return;
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % roles.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, Math.max(reverse ? 75 : subIndex === roles[index].length ? 1000 : 150, 75));

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, roles]);
    
    useEffect(() => {
        const timeout2 = setTimeout(() => setBlink((prev) => !prev), 500);
        return () => clearTimeout(timeout2);
    }, [blink]);

    if (!roles || roles.length === 0) return null;

    return (
        <span className="text-2xl md:text-4xl font-bold">
            I am a <span className="text-[var(--primary-color)]">{`${roles[index].substring(0, subIndex)}${blink ? "|" : " "}`}</span>
        </span>
    );
};

const HeroSkeleton: React.FC = () => (
  <div className="flex flex-col-reverse lg:flex-row items-center justify-center w-full h-full min-h-[calc(100vh-64px)] py-12 lg:gap-12 animate-pulse">
      <div className="lg:w-1/2 text-center lg:text-left z-10 py-8">
          <div className="h-12 w-3/4 mb-4 skeleton mx-auto lg:mx-0"></div>
          <div className="h-12 w-1/2 mb-6 skeleton mx-auto lg:mx-0"></div>
          <div className="h-8 w-full mb-2 skeleton"></div>
          <div className="h-8 w-full mb-2 skeleton"></div>
          <div className="h-8 w-3/4 mb-8 skeleton"></div>
          <div className="h-12 w-48 skeleton mx-auto lg:mx-0"></div>
      </div>
      <div className="lg:w-1/2 flex justify-center items-center z-10 mt-8 lg:mt-0">
          <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full skeleton"></div>
      </div>
  </div>
);

const Hero: React.FC<{ bio: BioData | null, loading: boolean }> = ({ bio, loading }) => {
  const { primaryColor } = useTheme();

  const getShadowColor = (hex: string) => {
    if (!hex || hex.length !== 7) return 'rgba(133, 76, 230, 0.39)'; // Default shadow
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, 0.39)`;
  };

  if (loading || !bio) return <HeroSkeleton />;

  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-center w-full min-h-[calc(100vh-64px)] py-12 lg:gap-12">
        <div className="lg:w-1/2 text-center lg:text-left z-10 py-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2">
                Hi, I am <br/>{bio.name}
            </h1>
            <div className="h-16 md:h-12 mb-4">
               <Typewriter roles={bio.roles} />
            </div>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0">
                {bio.description}
            </p>
            <div className="flex justify-center lg:justify-start items-center gap-4 mb-8">
                <a href={bio.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[var(--primary-color)] transition-colors duration-300">
                    <GithubIcon />
                </a>
                <a href={bio.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[var(--primary-color)] transition-colors duration-300">
                    <LinkedinIcon />
                </a>
            </div>
            <a 
                href={bio.resume} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 font-semibold text-white rounded-lg transition-all duration-300 ease-in-out hover:scale-105"
                style={{ 
                    backgroundColor: 'var(--primary-color)',
                    boxShadow: `0 4px 14px 0 ${getShadowColor(primaryColor)}`
                }}
            >
                Check Resume
            </a>
        </div>
        <div className="lg:w-1/2 flex justify-center items-center z-10 mt-8 lg:mt-0">
            <div className="relative rounded-full w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-[var(--primary-color)]">
                <img 
                    src={bio.profile_url} 
                    alt="Profile" 
                    className="relative w-full h-full object-cover rounded-full shadow-2xl"
                />
            </div>
        </div>
    </div>
  );
};

export default Hero;