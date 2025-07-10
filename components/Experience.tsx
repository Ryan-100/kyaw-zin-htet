
import React from 'react';
import type { Experience as ExperienceType } from '../types';
import { useTheme } from '../contexts/ThemeContext';

const ExperienceCardSkeleton: React.FC = () => (
    <div className="flex gap-6 w-full animate-pulse">
        <div className="w-16 h-16 rounded-lg skeleton flex-shrink-0"></div>
        <div className="flex-grow space-y-3">
            <div className="h-5 w-1/2 skeleton"></div>
            <div className="h-4 w-1/3 skeleton"></div>
            <div className="h-4 w-1/4 skeleton"></div>
            <div className="h-10 w-full mt-2 skeleton"></div>
        </div>
    </div>
);

const ExperienceCard: React.FC<{ experience: ExperienceType }> = ({ experience }) => {
    const { theme } = useTheme();
    const cardBgClass = theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50/50 border-slate-200';
    const docButtonClass = theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300';

    return (
        <div className={`w-full p-6 rounded-lg border shadow-sm ${cardBgClass} flex flex-col md:flex-row gap-6 hover:border-[var(--primary-color)] transition-colors backdrop-blur-sm`}>
            <div className="flex-shrink-0">
                <img src={experience.img} alt={experience.company} className="w-16 h-16 rounded-lg object-cover" />
            </div>
            <div className="flex-grow">
                <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                        <h3 className="text-lg font-semibold text-[var(--primary-color)]">{experience.role}</h3>
                        <p className="text-md font-medium text-slate-700 dark:text-slate-400">{experience.company}</p>
                        <p className="text-sm text-slate-500">{experience.date}</p>
                    </div>
                     {experience.doc && (
                        <a href={experience.doc} target="_blank" rel="noopener noreferrer" className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${docButtonClass}`}>
                            View Doc
                        </a>
                    )}
                </div>
                <p className="mt-4 text-slate-600 dark:text-slate-400">{experience.desc}</p>
                {experience.skills && experience.skills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="text-sm font-semibold mr-2">Skills:</span>
                        {experience.skills.map((skill, index) => (
                            <span key={index} className="text-sm text-slate-600 dark:text-slate-400">
                                {skill}{index !== experience.skills!.length - 1 && ', '}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const Experience: React.FC<{ experiences: ExperienceType[] | null, loading: boolean }> = ({ experiences, loading }) => {
    const { theme } = useTheme();
    const styleBarClass = theme === 'dark' ? 'bg-slate-900': 'bg-slate-50';

    return (
        <section className="py-20 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-4">Experience</h2>
                <p className="text-lg text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
                    My professional journey as a software engineer, contributing to various companies and projects.
                </p>
                <div className="relative border-l-2 border-[var(--primary-color)]/20 pl-8 space-y-12">
                     <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-[var(--primary-color)] to-transparent"></div>
                    {loading && Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="relative">
                            <div className="absolute -left-[38px] top-5 w-4 h-4 rounded-full bg-primary-20"></div>
                            <ExperienceCardSkeleton />
                        </div>
                    ))}
                    {!loading && experiences?.map((exp, index) => (
                         <div key={index} className="relative">
                            <div className={`absolute -left-[38px] top-5 w-4 h-4 rounded-full border-4 border-[var(--primary-color)] ${styleBarClass}`}></div>
                            <ExperienceCard experience={exp} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
