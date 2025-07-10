
import React from 'react';
import type { Education as EducationType } from '../types';
import { useTheme } from '../contexts/ThemeContext';

const CertificateIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
        <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
        <path d="m9 15 2 2 4-4"/>
    </svg>
);

const EducationCardSkeleton: React.FC = () => (
    <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse">
        <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-lg skeleton flex-shrink-0"></div>
            <div className="flex-grow space-y-3">
                <div className="h-6 w-3/4 skeleton"></div>
                <div className="h-4 w-1/2 skeleton"></div>
                <div className="h-4 w-1/3 skeleton"></div>
                <div className="h-4 w-1/4 mt-2 skeleton"></div>
                <div className="space-y-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="h-4 w-full skeleton"></div>
                    <div className="h-4 w-5/6 skeleton"></div>
                </div>
            </div>
        </div>
    </div>
);

const EducationCard: React.FC<{ edu: EducationType }> = ({ edu }) => {
    const { theme } = useTheme();
    const cardBgClass = theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50/50 border-slate-200';
    
    return (
        <div className={`p-6 rounded-2xl border ${cardBgClass} shadow-sm hover:shadow-lg hover:border-[var(--primary-color)] transition-all duration-300 backdrop-blur-sm`}>
            <div className="flex flex-col md:flex-row items-start gap-5">
                <img src={edu.img} alt={edu.school} className="w-16 h-16 rounded-lg object-cover flex-shrink-0 mt-1"/>
                <div className="flex-grow">
                    <h3 className="text-xl font-semibold">{edu.school}</h3>
                    <p className="text-md font-medium text-slate-600 dark:text-slate-400">{edu.degree}</p>
                    <p className="text-sm text-slate-500 mb-2">{edu.date}</p>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                         <p className="text-sm font-semibold text-[var(--primary-color)]">Grade: {edu.grade}</p>
                         {edu.certificate && (
                            <a href={edu.certificate} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors bg-primary-10 hover:bg-primary-20 text-[var(--primary-color)]">
                                <CertificateIcon className="w-4 h-4" />
                                View Certificate
                            </a>
                         )}
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mt-4 border-t border-slate-200 dark:border-slate-800 pt-4">{edu.desc}</p>
                </div>
            </div>
        </div>
    );
};

const Education: React.FC<{ education: EducationType[] | null, loading: boolean }> = ({ education, loading }) => {
    return (
        <section className="py-20 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-4">Education</h2>
                <p className="text-lg text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
                    My educational journey has been a cornerstone of my growth. Here are the details.
                </p>
                <div className="space-y-8">
                    {loading && Array.from({ length: 2 }).map((_, i) => <EducationCardSkeleton key={i} />)}
                    {!loading && education?.map(edu => (
                        <EducationCard key={edu.id} edu={edu} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
