
import React, { useState } from 'react';
import type { Project } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';

const AddToCartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
);

const GoLinkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/></svg>
);

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.577.688.48A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
);

const ProjectCardSkeleton: React.FC = () => (
    <div className="rounded-xl shadow-sm overflow-hidden flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse">
        <div className="w-full h-48 skeleton"></div>
        <div className="p-6 flex flex-col flex-grow">
            <div className="h-6 w-3/4 mb-2 skeleton"></div>
            <div className="h-4 w-1/4 mb-4 skeleton"></div>
            <div className="space-y-2 flex-grow">
                <div className="h-4 w-full skeleton"></div>
                <div className="h-4 w-full skeleton"></div>
                <div className="h-4 w-5/6 skeleton"></div>
            </div>
            <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
                {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-5 w-16 skeleton rounded-full"></div>)}
            </div>
        </div>
    </div>
);


const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const { theme } = useTheme();
    const { addToCart, removeFromCart, isItemInCart } = useCart();
    const inCart = isItemInCart(project.id);

    const cardBgClass = theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200';
    const linkClass = "hover:text-[var(--primary-color)] transition-colors duration-300";

    return (
        <div className={`rounded-xl shadow-sm overflow-hidden transition-all duration-300 group flex flex-col ${cardBgClass} border hover:shadow-lg hover:border-[var(--primary-color)] !z-20`}>
            <div className="overflow-hidden relative">
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                { inCart ? (
                    <button
                        onClick={() => removeFromCart(project.id)}
                        className="absolute top-3 right-3 p-2 rounded-full text-white transition-all duration-200 bg-green-500 group-hover:bg-red-500 !z-50"
                        aria-label="Remove from cart"
                    >
                        <span className="block group-hover:hidden"><CheckIcon className="w-5 h-5" /></span>
                        <span className="hidden group-hover:block"><TrashIcon className="w-5 h-5" /></span>
                    </button>
                ) : (
                    <button 
                        onClick={() => addToCart(project)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-black/40 text-white hover:bg-[var(--primary-color)] transition-all scale-0 group-hover:scale-100 duration-200 !z-50"
                        aria-label="Add to cart"
                    >
                        <AddToCartIcon className="w-5 h-5" />
                    </button>
                )}
            </div>
            <div className="p-6 flex flex-col flex-grow gap-2 justify-between">
                <div className="flex flex-col">
                    <h3 className="text-xl text-[var(--primary-color)] font-semibold mb-2">{project.title}</h3>
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-slate-500 dark:text-slate-400">{project.date}</p>
                        <div className="flex items-center gap-2">
                            {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className={linkClass}><GithubIcon /></a>}
                            {project.webapp && <a href={project.webapp} target="_blank" rel="noopener noreferrer" className={linkClass}><GoLinkIcon /></a>}
                        </div>
                    </div>
                    <p className="flex-grow text-slate-600 dark:text-slate-400">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200 dark:border-slate-800 mb-4">
                    {project.tags.map(tag => (
                        <span key={tag} className="text-xs bg-primary-10 text-[var(--primary-color)] px-2 py-1 rounded-full font-medium max-h-6">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};


const Projects: React.FC<{ projects: Project[] | null, loading: boolean }> = ({ projects, loading }) => {
    const [category, setCategory] = useState('all');
    const { theme } = useTheme();

    if (!projects && !loading) return null;

    const categories = ['all', ...Array.from(new Set(projects?.map(p => p.category) || []))];
    const filteredProjects = projects?.filter(p => category === 'all' || p.category === category) || [];
    
    const activeBtnClass = 'bg-[var(--primary-color)] text-white';
    const inactiveBtnClass = theme === 'dark' ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 dark:border-slate-700';

    return (
        <section className="py-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-4">Projects</h2>
                <p className="text-lg text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
                    Here are some of my creations. Add your favorites to the cart to discuss!
                </p>
                <div className="flex justify-center flex-wrap gap-4 mb-12">
                    {categories.map(cat => (
                        <button 
                            key={cat} 
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors duration-300 text-sm ${category === cat ? activeBtnClass : inactiveBtnClass}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading && Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)}
                    {!loading && filteredProjects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
