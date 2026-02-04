import { ReactNode } from 'react';

export interface SectionProps {
  children: ReactNode;
  id: string;
  className?: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image?: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}
