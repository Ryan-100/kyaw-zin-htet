import React from "react";
import type { Project } from "../types";
import { useTheme } from "@/contexts/ThemeContext";

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
);

const GithubIcon: React.FC = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.577.688.48A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
);

const LinkedinIcon: React.FC = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
);

interface ProjectModalProps {
  open: boolean;
  onClose: () => void;
  project: Project | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ open, onClose, project }) => {
    if (!project) return null;
    if (!open) return null;
    const { theme } = useTheme();


    const modalBgClass = theme === 'dark' ? 'bg-slate-900' : 'bg-white';
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/* Backdrop */}
        <div className="fixed inset-0 bg-black/60 transition-opacity rounded-lg" onClick={onClose}></div>


          <div className={`relative ${modalBgClass} text-slate-900 dark:text-slate-100 rounded-2xl shadow-lg max-w-2xl w-full my-12 mx-4 p-6 pointer-events-auto`}>
            <button
              className="absolute top-4 right-4 text-slate-500 hover:text-[var(--primary-color)]"
              onClick={onClose}
              aria-label="Close"
            >
              <CloseIcon />
            </button>
            <img
              src={project.image}
              alt={project.title}
              className="w-full rounded-xl object-cover mt-4 mb-6 shadow"
              style={{ maxHeight: 320 }}
            />
            <h2 className="text-2xl font-bold mb-2 text-[var(--primary-color)]">{project.title}</h2>
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-4">{project.date}</div>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-primary-10 text-[var(--primary-color)] px-2 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mb-6 text-base text-slate-600 dark:text-slate-400">{project.description}</p>
            {project.member && (
              <>
                <div className="text-lg font-semibold mb-2">Members</div>
                <div className="flex flex-col gap-3 mb-4">
                  {project.member.map((member) => (
                    <div key={member.name} className="flex items-center gap-3">
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover shadow"
                      />
                      <span className="font-medium">{member.name}</span>
                      <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[var(--primary-color)]">
                        <GithubIcon />
                      </a>
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[var(--primary-color)]">
                        <LinkedinIcon />
                      </a>
                    </div>
                  ))}
                </div>
              </>
            )}
            <div className="flex gap-4 mt-6">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center font-semibold py-3 rounded-lg bg-primary-10 text-[var(--primary-color)] hover:bg-primary-20 transition"
                >
                  View Code
                </a>
              )}
              <a
                href={project.webapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center font-semibold py-3 rounded-lg bg-[var(--primary-color)] text-white hover:bg-[var(--primary-color-hover)] transition"
              >
                View Live App
              </a>
            </div>
          </div>
        </div>
    );
};

export default ProjectModal;