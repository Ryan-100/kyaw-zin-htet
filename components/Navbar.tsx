
import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { THEME_COLORS } from '../data';

const SunIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
);

const MoonIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
);

const CartIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
);

const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path></svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
);

const Navbar: React.FC = () => {
  const { theme, toggleTheme, primaryColor, setPrimaryColor } = useTheme();
  const { cartItems, openCart } = useCart();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { title: 'About', href: '#about'},
    { title: 'Skills', href: '#skills'},
    { title: 'Experience', href: '#experience'},
    { title: 'Projects', href: '#projects'},
    { title: 'Education', href: '#education'},
  ];

  const headerBgClass = theme === 'dark' ? 'bg-slate-950/80' : 'bg-white/80';
  const mobileMenuBgClass = theme === 'dark' ? 'bg-slate-950/80' : 'bg-white/80';
  const themeBorderClass = theme === 'dark' ? 'border-white' : 'border-slate-700';
  const buttonClass = theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300';

  return (
    <header className={`sticky top-0 z-30 w-full ${headerBgClass} backdrop-blur-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#about" className="text-2xl font-bold tracking-wider">
            <span style={{ color: primaryColor }}>KZH's&nbsp;</span>Store
          </a>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <a key={link.title} href={link.href} className="text-sm font-medium hover:text-[var(--primary-color)] transition-colors">
                {link.title}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex flex-wrap gap-2">
              {THEME_COLORS.map(color => (
                  <button
                      key={color.name}
                      onClick={() => setPrimaryColor(color.hex)}
                      className={`w-5 h-5 rounded-full transition-transform hover:scale-110 border-2 ${primaryColor === color.hex ? themeBorderClass : 'border-transparent'}`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={`Set theme color to ${color.name}`}
                  />
              ))}
            </div>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${buttonClass}`}
            >
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
            <button onClick={openCart} className={`relative p-2 rounded-full transition-colors ${buttonClass}`}>
                <CartIcon className="w-5 h-5"/>
                {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--primary-color)] text-xs text-white">
                        {cartItems.length}
                    </span>
                )}
            </button>
            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-2xl">
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>
       {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden ${mobileMenuBgClass} backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 py-4`}>
          <nav className="flex flex-col items-center gap-4">
             {navLinks.map(link => (
              <a key={link.title} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-md font-medium hover:text-[var(--primary-color)] transition-colors">
                {link.title}
              </a>
            ))}
             <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 mt-2">
              {THEME_COLORS.map(color => (
                  <button
                      key={color.name}
                      onClick={() => {setPrimaryColor(color.hex); setMobileMenuOpen(false);}}
                      className={`w-6 h-6 rounded-full transition-transform hover:scale-110 border-2 ${primaryColor === color.hex ? themeBorderClass : 'border-transparent'}`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={`Set theme color to ${color.name}`}
                  />
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
