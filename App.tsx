import React, { useCallback, useMemo, useState } from 'react';
import Experience from './components/Experience';
import UI from './components/UI';
import CVPage from './components/CVPage';
import { LanguageProvider } from './contexts/LanguageContext';

const basePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

function App() {
  const [currentSection, setCurrentSection] = useState(0);

  const currentRoute = useMemo(() => {
    const path = window.location.pathname.replace(/\/$/, '');
    return path.startsWith(basePath) ? path.slice(basePath.length) || '/' : path || '/';
  }, []);

  const handleSectionChange = useCallback((section: number) => {
    setCurrentSection(section);
  }, []);

  if (currentRoute === '/cv') {
    return <CVPage />;
  }

  return (
    <LanguageProvider>
      <div className="relative w-full h-[100dvh] bg-[#030308] overflow-hidden">
        <Experience onSectionChange={handleSectionChange} />
        <UI currentSection={currentSection} />
      </div>
    </LanguageProvider>
  );
}

export default App;
