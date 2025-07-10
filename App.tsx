import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import { useTheme } from './contexts/ThemeContext';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import type { BioData, Skill, Experience as ExperienceType, Project, Education as EducationType } from './types';
import { Bio, staticSkills, experiences as staticExperiences, projects as staticProjects, education as staticEducation } from './data';
import RocketScrollButton from './components/shared/RocketScrollButton';


interface PortfolioData {
  bio: BioData | null;
  skills: Skill[] | null;
  experiences: ExperienceType[] | null;
  projects: Project[] | null;
  education: EducationType[] | null;
}

const App: React.FC = () => {
  const { theme } = useTheme();
  const [data, setData] = useState<PortfolioData>({
    bio: null,
    skills: null,
    experiences: null,
    projects: null,
    education: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      // If Supabase is not configured, use static data.
      if (!isSupabaseConfigured) {
        console.log("Using static fallback data because Supabase credentials are not set.");
        setData({
          bio: Bio,
          skills: staticSkills,
          experiences: staticExperiences,
          projects: staticProjects,
          education: staticEducation,
        });
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const [
          bioRes,
          skillsRes,
          expRes,
          projRes,
          eduRes
        ] = await Promise.all([
          supabase.from('bio').select('*').single(),
          supabase.from('skills').select('*').order('id'),
          supabase.from('experiences').select('*').order('id',{ascending:true}),
          supabase.from('projects').select('*').order('id', { ascending: false }),
          supabase.from('education').select('*').order('id', { ascending: false })
        ]);

        const allData: PortfolioData = {
          bio: bioRes.data,
          skills: skillsRes.data,
          experiences: expRes.data,
          projects: projRes.data,
          education: eduRes.data,
        };

        const firstError = [bioRes, skillsRes, expRes, projRes, eduRes].find(res => res.error);
        if (firstError?.error) throw firstError.error;

        setData(allData);
      } catch (err: any) {
        console.error("Error fetching data from Supabase, falling back to static data:", err);
        setError("Could not load live portfolio data. Displaying a local version.");
        // Fallback to static data on error
        setData({
          bio: Bio,
          skills: staticSkills,
          experiences: staticExperiences,
          projects: staticProjects,
          education: staticEducation,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);


  const mainBgClass = theme === 'dark' ? 'bg-slate-950 text-slate-200' : 'bg-white text-slate-800';

  return (
    <>
      <div className={`w-full h-fit ${mainBgClass} transition-colors duration-500`}>
        <Navbar />
        <CartModal />
        <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4 rounded-md" role="alert">
              <p className="font-bold">Connection Error</p>
              <p>{error}</p>
            </div>
          )}
          <div id="about">
            <Hero bio={data.bio} loading={loading} />
          </div>
          <div id="skills" className="pt-24">
            <Skills skills={data.skills} loading={loading} />
          </div>
          <div id="experience" className="pt-24">
            <Experience experiences={data.experiences} loading={loading} />
          </div>
          <div id="projects" className="pt-24">
            <Projects projects={data.projects} loading={loading} />
          </div>
          <div id="education" className="pt-24">
            <Education education={data.education} loading={loading} />
          </div>
        </main>
        <Footer bio={data.bio} />
      </div>
      <RocketScrollButton/>
    </>
  );
};

export default App;