import React, { useState, useCallback } from 'react';
import Experience from './components/Experience';
import UI from './components/UI';

function App() {
  const [currentSection, setCurrentSection] = useState(0);

  const handleSectionChange = useCallback((section: number) => {
    setCurrentSection(section);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#030308] overflow-hidden">
      {/* 3D World */}
      <Experience onSectionChange={handleSectionChange} />

      {/* Heads-Up Display (HUD) */}
      <UI currentSection={currentSection} />
    </div>
  );
}

export default App;