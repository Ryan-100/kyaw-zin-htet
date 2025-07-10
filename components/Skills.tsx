
import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Skill } from '../types';
import { useTheme } from '../contexts/ThemeContext';

const HeartIcon: React.FC<{ filled: boolean, className?: string }> = ({ filled, className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
);

const SkillSkeleton: React.FC = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 animate-pulse">
                <div className="h-7 w-1/3 mb-6 skeleton"></div>
                <div className="flex flex-wrap justify-center gap-4">
                    {Array.from({ length: 6 }).map((_, j) => (
                        <div key={j} className="h-10 w-28 skeleton"></div>
                    ))}
                </div>
            </div>
        ))}
    </div>
);


const Skills: React.FC<{ skills: Skill[] | null, loading: boolean }> = ({ skills: initialSkills, loading }) => {
    const [skillsData, setSkillsData] = useState<Skill[] | null>(initialSkills);
    const [lovedSkills, setLovedSkills] = useState<Set<number>>(new Set());
    const { theme } = useTheme();

    useEffect(() => {
        setSkillsData(initialSkills);
    }, [initialSkills]);
    
    useEffect(() => {
        const storedLoves = localStorage.getItem('lovedSkills');
        if (storedLoves) {
            setLovedSkills(new Set(JSON.parse(storedLoves)));
        }
    }, []);

    const handleLoveClick = async (skillId: number) => {
        if (lovedSkills.has(skillId)) return;

        const newLovedSkills = new Set(lovedSkills).add(skillId);
        setLovedSkills(newLovedSkills);
        localStorage.setItem('lovedSkills', JSON.stringify(Array.from(newLovedSkills)));

        // Optimistic UI update
        setSkillsData(currentSkills => 
            currentSkills?.map(s => s.id === skillId ? { ...s, love_count: s.love_count + 1 } : s) || null
        );
        
        // Only call Supabase if it's configured
        if (isSupabaseConfigured) {
            const { error } = await supabase.rpc('increment_love', { skill_id: skillId });
            if (error) {
                console.error('Error incrementing love count:', error.message || error);
                // Revert UI on error
                 setSkillsData(currentSkills => 
                    currentSkills?.map(s => s.id === skillId ? { ...s, love_count: s.love_count - 1 } : s) || null
                 );
                 const revertedLoves = new Set(lovedSkills);
                 revertedLoves.delete(skillId);
                 setLovedSkills(revertedLoves);
                 localStorage.setItem('lovedSkills', JSON.stringify(Array.from(revertedLoves)));
            }
        }
    };

    if (loading || !skillsData) return <SkillSkeleton />;
    
    const skillCategories = skillsData.reduce((acc, skill) => {
        (acc[skill.category] = acc[skill.category] || []).push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    const cardBgClass = theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200';
    const skillClass = theme === 'dark' ? 'border-slate-700 bg-slate-800' : 'bg-slate-50 border-slate-300' 
    return (
        <section className="py-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-4">Skills</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
                    Explore my technical skills. Show some love for your favorites!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.entries(skillCategories).map(([category, skills]) => (
                        <div key={category} className={`rounded-2xl border ${cardBgClass} p-8 shadow-sm hover:shadow-lg transition-all duration-300`}>
                            <h3 className="text-2xl font-semibold mb-6 text-[var(--primary-color)]">{category}</h3>
                            <div className="flex flex-wrap justify-center gap-4">
                                {skills.map((skill) => (
                                    <div key={skill.id} className={`group relative flex items-center gap-2 border rounded-lg px-4 py-2 ${skillClass}`}>
                                        <img src={skill.image} alt={skill.name} className="w-6 h-6 object-contain" />
                                        <span>{skill.name}</span>
                                        <button 
                                            onClick={() => handleLoveClick(skill.id)}
                                            className={`absolute -top-2 -right-2 flex items-center justify-center p-1 rounded-full transition-all duration-200
                                                ${lovedSkills.has(skill.id) 
                                                    ? 'bg-red-500/20 text-red-500' 
                                                    : 'bg-slate-300/50 dark:bg-slate-700/50 text-slate-500 opacity-0 group-hover:opacity-100'}`}
                                            aria-label={`Love ${skill.name}`}
                                        >
                                            <HeartIcon filled={lovedSkills.has(skill.id)} className="w-4 h-4" />
                                            <span className="text-xs ml-1">{skill.love_count}</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
