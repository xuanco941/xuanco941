import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Mail, MousePointer2, Facebook, Instagram, ChevronDown } from 'lucide-react';
import { LanguageContext } from '../contexts/LanguageContext';

interface UIProps {
  currentSection?: number;
}

const UI = ({ currentSection = 0 }: UIProps) => {
  const [localSection, setLocalSection] = useState(currentSection);
  const { language, setLanguage, t } = useContext(LanguageContext);

  useEffect(() => {
    setLocalSection(currentSection);
  }, [currentSection]);

  const sections = [
    { id: 0, label: t.ui.nav.home, subtitle: t.ui.subtitles.home },
    { id: 1, label: t.ui.nav.about, subtitle: t.ui.subtitles.about },
    { id: 2, label: t.ui.nav.tech, subtitle: t.ui.subtitles.tech },
    { id: 3, label: t.ui.nav.projects, subtitle: t.ui.subtitles.projects },
    { id: 4, label: t.ui.nav.contact, subtitle: t.ui.subtitles.contact },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-50 flex flex-col justify-between p-4 sm:p-6 md:p-10">

      {/* Top Header HUD */}
      <header className="flex justify-between items-start relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <h1 className="font-bold text-xl tracking-tighter flex items-center gap-1">
            <span className="text-white">Xuan</span>
            <span className="text-cyan-400">/&gt;</span>
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-[10px] font-mono text-cyan-400 opacity-80">SYS.ONLINE</span>
          </div>
        </motion.div>

        {/* Section Navigation - Desktop */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="hidden lg:flex gap-6 text-xs font-mono tracking-widest pointer-events-auto"
        >
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              className={`relative flex flex-col items-center transition-all duration-300 ${localSection === index
                ? 'text-white'
                : 'text-gray-500 hover:text-gray-300'
                }`}
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center gap-2">
                {localSection === index && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="text-gray-500">{`0${index + 1}.`}</span>
                <span>{section.label}</span>
              </div>
              {localSection === index && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-1"
                />
              )}
            </motion.button>
          ))}
        </motion.nav>

        {/* Mobile Section Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:hidden flex flex-col items-end"
        >
          <span className="text-xs font-mono text-gray-500">{t.ui.section}</span>
          <span className="text-lg font-bold text-cyan-400">{`0${localSection + 1}`}</span>
          <span className="text-[10px] font-mono text-gray-400">{sections[localSection]?.subtitle}</span>
        </motion.div>
      </header>

      {/* Side Progress Bar - Desktop */}
      <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3">
        <div className="relative h-32 w-px">
          {/* Background track */}
          <div className="absolute inset-0 bg-gray-800 rounded-full" />
          {/* Active progress */}
          <motion.div
            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-cyan-400 via-purple-500 to-pink-500 rounded-full"
            animate={{
              height: `${((localSection + 1) / sections.length) * 100}%`
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        </div>

        {/* Section dots */}
        <div className="flex flex-col gap-2 mt-2">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${localSection === index
                ? 'bg-cyan-400 scale-125'
                : localSection > index
                  ? 'bg-purple-500'
                  : 'bg-gray-700'
                }`}
              animate={localSection === index ? { scale: [1, 1.3, 1] } : {}}
              transition={{ repeat: localSection === index ? Infinity : 0, duration: 2 }}
            />
          ))}
        </div>

        {/* Current section label */}
        <motion.div
          key={localSection}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[10px] font-mono text-cyan-400 writing-mode-vertical transform -rotate-180 mt-2"
          style={{ writingMode: 'vertical-rl' }}
        >
          {sections[localSection]?.subtitle.toUpperCase()}
        </motion.div>
      </div>

      {/* Right side decorative elements */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-purple-500/30 to-transparent" />
      </div>

      {/* Bottom Footer HUD */}
      <footer className="flex justify-between items-end">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col gap-4 items-start"
        >
          {/* Language Switcher */}
          <div className="flex gap-1 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/5 pointer-events-auto">
            <button
              onClick={() => setLanguage('vi')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${language === 'vi' ? 'bg-cyan-400 text-black shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'text-gray-400 hover:text-white'
                }`}
            >
              VI
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${language === 'en' ? 'bg-cyan-400 text-black shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'text-gray-400 hover:text-white'
                }`}
            >
              EN
            </button>
          </div>

          {/* Scroll indicator - show only on first section */}
          <AnimatePresence>
            {localSection === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 text-sm font-mono text-cyan-300"
              >
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ChevronDown size={18} />
                </motion.div>
                <span className="text-xs tracking-wider">{t.ui.scroll}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Section info - show on other sections */}
          <AnimatePresence>
            {localSection > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-1"
              >
                <span className="text-[10px] font-mono text-gray-500 tracking-wider">{t.ui.viewing}</span>
                <span className="text-sm font-mono text-cyan-400">{sections[localSection]?.subtitle}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 md:gap-6 pointer-events-auto"
        >
          <motion.a
            href="https://github.com/xuanco941"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-all duration-300"
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={18} className="md:w-5 md:h-5" />
          </motion.a>
          <motion.a
            href="https://facebook.com/xuanco941"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-all duration-300"
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Facebook size={18} className="md:w-5 md:h-5" />
          </motion.a>
          <motion.a
            href="https://instagram.com/vibes.js"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-pink-400 transition-all duration-300"
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram size={18} className="md:w-5 md:h-5" />
          </motion.a>
          <motion.a
            href="mailto:xuanco941@gmail.com"
            className="text-gray-400 hover:text-cyan-400 transition-all duration-300"
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={18} className="md:w-5 md:h-5" />
          </motion.a>
        </motion.div>
      </footer>

      {/* Corner decorations */}
      <div className="absolute top-4 right-4 md:top-10 md:right-10 pointer-events-none">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="opacity-20">
          <path d="M40 0H30V10H40V0Z" fill="#00f3ff" />
          <path d="M40 10H35V15H40V10Z" fill="#00f3ff" />
          <path d="M10 0H0V10H10V0Z" fill="transparent" stroke="#00f3ff" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 pointer-events-none">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="opacity-20 rotate-180">
          <path d="M40 0H30V10H40V0Z" fill="#bd00ff" />
          <path d="M40 10H35V15H40V10Z" fill="#bd00ff" />
          <path d="M10 0H0V10H10V0Z" fill="transparent" stroke="#bd00ff" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  );
};

export default UI;