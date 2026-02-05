import React, { useRef, useState, useMemo, Suspense, createContext, useContext } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  ScrollControls,
  useScroll,
  Text,
  Float,
  MeshDistortMaterial,
  Stars,
  Sparkles
} from '@react-three/drei';
import * as THREE from 'three';

import { LanguageContext } from '../contexts/LanguageContext';

// Context for section tracking
const SectionContext = createContext({ currentSection: 0, setCurrentSection: (n: number) => { } });
// Local translation definitions removed. Using global context.

// Constants
const SECTION_DISTANCE = 40;
const SECTIONS = 5;

// --- Enhanced 3D Components ---

const ParticleField = () => {
  const count = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 150;
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    const color1 = new THREE.Color('#00f3ff');
    const color2 = new THREE.Color('#bd00ff');
    for (let i = 0; i < count; i++) {
      const mixFactor = Math.random();
      const color = color1.clone().lerp(color2, mixFactor);
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return cols;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Enhanced floating ring effect
const FloatingRings = ({ position }: { position: [number, number, number] }) => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x = state.clock.elapsedTime * 0.3;
      group.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={group} position={position}>
      <mesh>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00f3ff" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.5, 0.015, 16, 100]} />
        <meshBasicMaterial color="#bd00ff" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2, Math.PI / 4, 0]}>
        <torusGeometry args={[3, 0.01, 16, 100]} />
        <meshBasicMaterial color="#ff0055" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

const SectionTitle = ({ children, position, color = "white", subtitle, scale = 1, fontSize = 1.5, anchorX = "center" }: { children: string, position: [number, number, number], color?: string, subtitle?: string, scale?: number, fontSize?: number, anchorX?: "center" | "left" | "right" }) => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
    }
  });

  const subtitleFontSize = fontSize * 0.22;
  const subtitleOffset = fontSize * 0.8;

  return (
    <group ref={group} position={position} scale={scale}>
      <Text
        color={color}
        anchorX={anchorX}
        anchorY="middle"
        fontSize={fontSize}
        outlineWidth={0.02}
        outlineColor="#000000"
        letterSpacing={0.08}
      >
        {children}
        <meshStandardMaterial
          emissive={color}
          emissiveIntensity={0.7}
          toneMapped={false}
        />
      </Text>
      {subtitle && (
        <group position={[anchorX === 'left' ? 0 : anchorX === 'right' ? 0 : 0, -subtitleOffset, 0]}>
          <Text
            color="#00f3ff"
            anchorX={anchorX}
            anchorY="middle"
            fontSize={subtitleFontSize}
            letterSpacing={0.2}
          >
            {subtitle}
            <meshBasicMaterial color="#00f3ff" transparent opacity={0.7} />
          </Text>
          {/* Decorative line under subtitle */}
          <mesh position={[anchorX === 'left' ? fontSize * 0.9 : anchorX === 'right' ? -fontSize * 0.9 : 0, -subtitleFontSize * 0.8, 0]}>
            <planeGeometry args={[fontSize * 1.8, 0.015]} />
            <meshBasicMaterial color="#00f3ff" transparent opacity={0.4} />
          </mesh>
        </group>
      )}
    </group>
  );
};

const CodeBlock = ({ position, scale = 1 }: { position: [number, number, number], scale?: number }) => {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (group.current) {
      const targetRotY = hovered ? 0 : Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
      const targetRotX = hovered ? 0 : Math.cos(state.clock.elapsedTime * 0.2) * 0.03;
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotY, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotX, 0.05);
    }
  });

  const codeString = `const xuan = {
  pronouns: "He/Him",
  code: ["TS", "JS", "C#", "SQL"],
  technologies: {
    frontEnd: ["React", "Vue", "Next"],
    backEnd: ["Node", "Nest", ".NET"],
    ops: ["Docker", "Git", "Azure"]
  },
  challenge: "I debug with console.log!"
};`;

  return (
    <group
      ref={group}
      position={position}
      scale={[scale, scale, scale]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Outer glow frame */}
      <mesh position={[0, 0, -0.2]}>
        <planeGeometry args={[7.4, 5]} />
        <meshBasicMaterial
          color={hovered ? "#00f3ff" : "#1a3a4a"}
          transparent
          opacity={hovered ? 0.15 : 0.08}
        />
      </mesh>

      {/* Glass Panel - simplified for performance */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[7.2, 4.8]} />
        <meshBasicMaterial
          color="#0a1520"
          transparent={true}
          opacity={0.92}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Neon border */}
      <lineSegments position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(7.2, 4.8)]} />
        <lineBasicMaterial color={hovered ? "#00f3ff" : "#0066aa"} linewidth={2} />
      </lineSegments>

      {/* Header bar */}
      <mesh position={[0, 2.15, 0.05]}>
        <planeGeometry args={[7.2, 0.5]} />
        <meshBasicMaterial color="#0d1f2d" />
      </mesh>

      {/* Decorative dots */}
      <mesh position={[-3.2, 2.15, 0.1]}>
        <circleGeometry args={[0.1]} />
        <meshBasicMaterial color="#ff5f56" />
      </mesh>
      <mesh position={[-2.85, 2.15, 0.1]}>
        <circleGeometry args={[0.1]} />
        <meshBasicMaterial color="#ffbd2e" />
      </mesh>
      <mesh position={[-2.5, 2.15, 0.1]}>
        <circleGeometry args={[0.1]} />
        <meshBasicMaterial color="#27c93f" />
      </mesh>

      {/* Code Text */}
      <Text
        position={[-3.3, 1.6, 0.15]}
        anchorX="left"
        anchorY="top"
        fontSize={0.26}
        color="#00f3ff"
        maxWidth={6.5}
        lineHeight={1.5}
      >
        {codeString}
        <meshBasicMaterial color="#00f3ff" transparent opacity={0.95} />
      </Text>
    </group>
  );
};

const SkillOrb = ({ position, color, label, scale = 1, glowColor }: { position: [number, number, number], color: string, label: string, scale?: number, glowColor?: string }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.5;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.3;
      const targetScale = hovered ? 1.3 : 1;
      mesh.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(hovered ? 1.8 : 1.4);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = hovered ? 0.25 : 0.1;
    }
  });

  return (
    <group position={position} scale={[scale, scale, scale]}>
      <Float speed={4} rotationIntensity={0.8} floatIntensity={1.2}>
        {/* Outer glow ring */}
        <mesh>
          <torusGeometry args={[1.2, 0.03, 8, 32]} />
          <meshBasicMaterial color={glowColor || color} transparent opacity={0.4} />
        </mesh>

        {/* Glow sphere behind - brighter */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[1.3, 16, 16]} />
          <meshBasicMaterial color={glowColor || color} transparent opacity={0.25} />
        </mesh>

        {/* Main orb - with emissive for self-illumination */}
        <mesh
          ref={mesh}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
        >
          <icosahedronGeometry args={[0.85, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Inner core glow - brighter */}
        <mesh>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.9} />
        </mesh>
      </Float>

      {/* Label below orb */}
      <group position={[0, -1.8, 0.5]}>
        <mesh>
          <planeGeometry args={[2.2, 0.5]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.7} />
        </mesh>
        <Text
          position={[0, 0, 0.02]}
          fontSize={0.32}
          color="white"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.03}
        >
          {label}
          <meshBasicMaterial color="white" toneMapped={false} depthTest={false} />
        </Text>
      </group>
    </group>
  )
}

const ProjectCard = ({ position, title, description, color, scale = 1, index = 0 }: { position: [number, number, number], title: string, description: string, color: string, scale?: number, index?: number }) => {
  const [hovered, setHover] = useState(false);
  const ref = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { t } = useContext(LanguageContext);

  useFrame((state) => {
    if (ref.current) {
      // Gentle floating animation instead of lookAt
      const floatY = Math.sin(state.clock.elapsedTime * 0.8 + index * 1.5) * 0.15;
      ref.current.position.y = position[1] + floatY;

      // Subtle rotation
      const targetRotY = hovered ? 0 : Math.sin(state.clock.elapsedTime * 0.4 + index) * 0.05;
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotY, 0.05);

      // Scale animation
      const targetScale = hovered ? 1.08 : 1;
      ref.current.scale.lerp(new THREE.Vector3(targetScale * scale, targetScale * scale, targetScale * scale), 0.08);
    }
  });

  return (
    <group
      ref={ref}
      position={position}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* Outer glow on hover */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[4, 2.8]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.2 : 0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Card Background with gradient feel */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[3.8, 2.6]} />
        <meshPhysicalMaterial
          color="#0a0a15"
          roughness={0.2}
          metalness={0.4}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Colored top border */}
      <mesh position={[0, 1.2, 0.02]}>
        <planeGeometry args={[3.8, 0.08]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Neon Border */}
      <lineSegments position={[0, 0, 0.01]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(3.8, 2.6)]} />
        <lineBasicMaterial
          color={hovered ? color : "#333355"}
          opacity={hovered ? 1 : 0.4}
          transparent
        />
      </lineSegments>

      {/* Project number indicator */}
      <Text
        position={[-1.6, 0.85, 0.05]}
        anchorX="left"
        anchorY="middle"
        fontSize={0.18}
        color={color}
        letterSpacing={0.1}
      >
        {`0${index + 1}`}
        <meshBasicMaterial color={color} />
      </Text>

      {/* Title */}
      <Text
        position={[-1.6, 0.45, 0.05]}
        anchorX="left"
        anchorY="middle"
        fontSize={0.32}
        maxWidth={3.2}
        color={hovered ? "#ffffff" : "#e0e0e0"}
        letterSpacing={0.02}
      >
        {title.toUpperCase()}
        <meshBasicMaterial
          color={hovered ? "#ffffff" : "#e0e0e0"}
        />
      </Text>

      {/* Decorative line */}
      <mesh position={[-0.4, 0.1, 0.05]}>
        <planeGeometry args={[2.4, 0.015]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>

      {/* Description */}
      <Text
        position={[-1.6, -0.25, 0.05]}
        anchorX="left"
        anchorY="top"
        fontSize={0.17}
        maxWidth={3.2}
        color="#999999"
        lineHeight={1.5}
      >
        {description}
        <meshBasicMaterial color="#999999" />
      </Text>

      {/* View button hint */}
      <group position={[1.4, -0.9, 0.05]}>
        <Text
          anchorX="right"
          anchorY="middle"
          fontSize={0.14}
          color={hovered ? color : "#666666"}
          letterSpacing={0.08}
        >
          {t.projects.view}
          <meshBasicMaterial color={hovered ? color : "#666666"} />
        </Text>
      </group>
    </group>
  )
}

const SceneContent = () => {
  const scroll = useScroll();
  // Calculate width at the content distance (12 units) to ensure consistent responsiveness
  const width = useThree((state) => {
    const cam = state.camera as THREE.PerspectiveCamera;
    const distance = 12; // Distance from camera to content planes
    const vFov = (cam.fov * Math.PI) / 180;
    const height = 2 * Math.tan(vFov / 2) * distance;
    return height * state.viewport.aspect;
  });

  // Stabilized responsive breakpoints with hysteresis to prevent jumping
  const prevWidth = useRef(width);
  const stableBreakpoints = useRef({ isSmall: width < 5, isMobile: width < 7, isTablet: width < 10 });

  // Only update breakpoints if width changed significantly (hysteresis of 0.3)
  const hysteresis = 0.3;
  if (Math.abs(width - prevWidth.current) > 0.1) {
    const isSmall = stableBreakpoints.current.isSmall
      ? width < 5 + hysteresis
      : width < 5 - hysteresis;
    const isMobile = stableBreakpoints.current.isMobile
      ? width < 7 + hysteresis
      : width < 7 - hysteresis;
    const isTablet = stableBreakpoints.current.isTablet
      ? width < 10 + hysteresis
      : width < 10 - hysteresis;

    stableBreakpoints.current = { isSmall, isMobile, isTablet };
    prevWidth.current = width;
  }

  const { isSmall, isMobile, isTablet } = stableBreakpoints.current;

  const { setCurrentSection } = useContext(SectionContext);
  const { t } = useContext(LanguageContext);
  const prevSection = useRef(0);

  useFrame((state, delta) => {
    // Calculate which section we should be viewing based on scroll
    const sectionProgress = scroll.offset * SECTIONS;

    // Switch section slightly earlier (when 65-70% of the way to next section)
    // instead of waiting for full alignment
    const trackingBias = 0.35;
    const currentSectionIndex = Math.min(Math.floor(sectionProgress + trackingBias), SECTIONS - 1);

    // Calculate target Z position
    // Camera starts at z=12 to view Hero at z=0
    // Then moves to z=12-30=-18 for About, etc.
    const baseZ = 12;
    const targetZ = baseZ - (sectionProgress * SECTION_DISTANCE);

    // Smoother camera movement
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 3, delta);

    // Enhanced parallax effect  
    const mouseX = state.pointer.x * (isMobile ? 0.8 : 1.2);
    const mouseY = state.pointer.y * (isMobile ? 0.8 : 1.2);
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, mouseX, 4, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, mouseY, 4, delta);

    // Subtle camera rotation for depth
    state.camera.rotation.x = THREE.MathUtils.damp(state.camera.rotation.x, -mouseY * 0.02, 3, delta);
    state.camera.rotation.y = THREE.MathUtils.damp(state.camera.rotation.y, -mouseX * 0.02, 3, delta);

    // Track current section
    if (currentSectionIndex !== prevSection.current) {
      setCurrentSection(currentSectionIndex);
      prevSection.current = currentSectionIndex;
    }
  });

  // Responsive Layout Calculations

  // Dynamic scale based on viewport
  const baseScale = isSmall ? 0.55 : isMobile ? 0.7 : isTablet ? 0.85 : 1;

  // About Section - Compact layout for mobile
  const aboutTextScale = isSmall ? 0.45 : isMobile ? 0.5 : 0.8;
  const aboutCodeScale = isSmall ? 0.3 : isMobile ? 0.35 : 0.6;

  // Mobile: Title top, Text below, Code at bottom - all compact
  // Mobile: Title top, Text below, Code at bottom - tighter spacing
  const aboutTitlePos: [number, number, number] = isMobile
    ? [0, isSmall ? 3.5 : 3.2, 0]
    : [-4, 3.5, 0];
  const aboutTextPos: [number, number, number] = isMobile
    ? [0, isSmall ? 1.0 : 0.8, 0.5]
    : [-4, 1.2, 0.5]; // Desktop: Raised from -0.5 to 1.2
  const aboutCodePos: [number, number, number] = isMobile
    ? [0, isSmall ? -2.0 : -2.2, 0] // Mobile: Raised significantly to be closer to text
    : [3.5, 0, 0];

  // Skills Section
  const skillsList = [
    { name: "Node.js", color: "#339933", glow: "#22c55e" },
    { name: "NestJS", color: "#e0234e", glow: "#ef4444" },
    { name: "Next.js", color: "#000000", glow: "#ffffff" },
    { name: "React", color: "#61dafb", glow: "#61dafb" },
    { name: "React Native", color: "#61dafb", glow: "#38bdf8" },
    { name: "C#", color: "#512bd4", glow: "#8b5cf6" },
    { name: "ASP.NET", color: "#512bd4", glow: "#a78bfa" },
    { name: "Redis", color: "#dc382d", glow: "#ef4444" },
    { name: "Firebase", color: "#ffca28", glow: "#fcd34d" },
    { name: "SQL Server", color: "#cc2927", glow: "#ef4444" },
    { name: "Git", color: "#f05032", glow: "#fb923c" }
  ];

  // Skills Grid Layout - compact for mobile
  const skillPositions = useMemo(() => {
    const pos: [number, number, number][] = [];
    const n = skillsList.length;

    if (isSmall) {
      // Very small mobile: 2 columns, very tight
      const cols = 2;
      const xSpacing = 2.2;
      const ySpacing = 2.0;
      for (let i = 0; i < n; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = (col - (cols - 1) / 2) * xSpacing;
        const y = 2 - row * ySpacing;
        pos.push([x, y, 0]);
      }
    } else if (isMobile) {
      // Mobile: 3 columns, compact
      const cols = 3;
      const xSpacing = 2.2; // Tighter spacing for 3 cols
      const ySpacing = 2.2;
      for (let i = 0; i < n; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = (col - (cols - 1) / 2) * xSpacing;
        const y = 3.8 - row * ySpacing; // Moved up significantly (was 3.0)
        pos.push([x, y, 0]);
      }
    } else {
      // Desktop: 4 columns, 3 rows
      const cols = 4;
      const xSpacing = 4.0;
      const ySpacing = 3.5;
      for (let i = 0; i < n; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = (col - (cols - 1) / 2) * xSpacing;
        const y = 2 - row * ySpacing;
        pos.push([x, y, 0]);
      }
    }
    return pos;
  }, [isMobile, isSmall, skillsList.length]);

  const skillScale = isSmall ? 0.3 : isMobile ? 0.35 : 0.55; // Decreased mobile scale for 3 cols

  // Projects Section - Compact grid for mobile
  const projectScale = isSmall ? 0.4 : isMobile ? 0.45 : 0.85;
  const projectPositions = useMemo(() => {
    const pos: [number, number, number][] = [];
    const count = 8;

    if (isSmall) {
      // Very small mobile: 2 columns, compact
      const cols = 2;
      const xSpacing = 3.5;
      const ySpacing = 2.0;
      for (let i = 0; i < count; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = (col - (cols - 1) / 2) * xSpacing;
        const y = 2 - row * ySpacing;
        pos.push([x, y, 0]);
      }
    } else if (isMobile) {
      // Mobile: 2-column grid, compact
      const cols = 2;
      const xSpacing = 4.0;
      const ySpacing = 2.5;
      for (let i = 0; i < count; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = (col - (cols - 1) / 2) * xSpacing;
        const y = 3.0 - row * ySpacing;
        pos.push([x, y, 0]);
      }
    } else {
      // Desktop: 2 Rows, 4 Columns grid
      const cols = 4;
      const xSpacing = 4.8;
      const ySpacing = 3.5;
      for (let i = 0; i < count; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = (col - (cols - 1) / 2) * xSpacing;
        const y = 1.5 - row * ySpacing;
        pos.push([x, y, 0]);
      }
    }
    return pos;
  }, [isMobile, isSmall]);

  return (
    <>
      {/* --- HERO SECTION --- */}
      <group position={[0, 0, 0]}>
        <FloatingRings position={[0, 0, -3]} />

        <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.2}>
          {/* Main Title */}
          <Text
            position={[0, isSmall ? 1.2 : isMobile ? 1.5 : 1.2, 0]}
            fontSize={isSmall ? 0.45 : isMobile ? 0.65 : isTablet ? 1.2 : 1.5}
            letterSpacing={-0.02}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={width * 0.9}
            textAlign="center"
            lineHeight={1.1}
          >
            {t.hero.greeting}
            <meshStandardMaterial
              emissive="#00f3ff"
              emissiveIntensity={1}
              toneMapped={false}
            />
          </Text>

          {/* Role */}
          <Text
            position={[0, isSmall ? -0.2 : isMobile ? -0.3 : -0.6, 0]}
            fontSize={isSmall ? 0.18 : isMobile ? 0.28 : isTablet ? 0.45 : 0.5}
            color="#00f3ff"
            anchorX="center"
            anchorY="middle"
            maxWidth={width * 0.85}
            textAlign="center"
            letterSpacing={0.1}
          >
            {t.hero.role}
            <meshBasicMaterial color="#00f3ff" transparent opacity={0.9} />
          </Text>

          {/* Subtitle tagline */}
          <Text
            position={[0, isSmall ? -0.8 : isMobile ? -1.0 : -1.5, 0]}
            fontSize={isSmall ? 0.11 : isMobile ? 0.16 : isTablet ? 0.22 : 0.25}
            color="#888888"
            anchorX="center"
            anchorY="middle"
            maxWidth={width * 0.8}
          >
            {t.hero.tagline}
            <meshBasicMaterial color="#888888" transparent opacity={0.7} />
          </Text>
        </Float>

        <Sparkles
          count={80}
          scale={12}
          size={5}
          speed={0.3}
          opacity={0.6}
          color="#00f3ff"
        />
        <Sparkles
          count={40}
          scale={10}
          size={3}
          speed={0.5}
          opacity={0.4}
          color="#bd00ff"
        />
      </group>

      {/* --- ABOUT SECTION --- */}
      <group position={[0, 0, -SECTION_DISTANCE]}>
        {/* Title at top */}
        <SectionTitle
          position={aboutTitlePos}
          subtitle={t.about.subtitle}
          fontSize={isSmall ? 0.6 : isMobile ? 0.65 : 1.4}
          anchorX={isMobile ? "center" : "left"}
        >
          {t.about.title}
        </SectionTitle>

        {/* Text content - Personal details + Description - positioned after title */}
        <group position={aboutTextPos} scale={[aboutTextScale, aboutTextScale, aboutTextScale]}>
          {/* Background panel */}
          <mesh position={[isMobile ? 0 : 2.75, isMobile ? 0 : -1.0, -0.05]}>
            <planeGeometry args={[isSmall ? 5.5 : isMobile ? 6.5 : 5.8, isSmall ? 5 : isMobile ? 5.5 : 5.5]} />
            <meshBasicMaterial color="#000000" transparent opacity={0.35} />
          </mesh>

          {/* Details first (hometown, residence, work) - AT TOP */}
          <Text
            position={[0, isMobile ? 1.2 : 0.5, 0]}
            maxWidth={isSmall ? 4.5 : isMobile ? 5.5 : 5.5}
            fontSize={isSmall ? 0.28 : isMobile ? 0.3 : 0.28}
            lineHeight={1.8}
            textAlign={isMobile ? "center" : "left"}
            anchorX={isMobile ? "center" : "left"}
            anchorY="top"
            color="#00f3ff"
          >
            {t.about.details}
            <meshBasicMaterial color="#00f3ff" />
          </Text>

          {/* Description text - BELOW details - Closer on mobile */}
          <Text
            position={[0, isMobile ? -1.4 : -2.0, 0]}
            maxWidth={isSmall ? 4.5 : isMobile ? 5.5 : 5.5}
            fontSize={isSmall ? 0.22 : isMobile ? 0.24 : 0.24}
            lineHeight={1.6}
            textAlign={isMobile ? "center" : "left"}
            anchorX={isMobile ? "center" : "left"}
            anchorY="top"
            color="#d0d0d0"
          >
            {t.about.description}
            <meshBasicMaterial color="#d0d0d0" />
          </Text>
        </group>

        {/* Code Block - AT BOTTOM */}
        <CodeBlock position={aboutCodePos} scale={aboutCodeScale} />

        <Sparkles count={30} scale={8} size={2} speed={0.5} opacity={0.3} color="#00f3ff" position={[0, 0, -2]} />
      </group>

      {/* --- SKILLS SECTION --- */}
      <group position={[0, 0, -SECTION_DISTANCE * 2]}>
        <SectionTitle
          position={[0, isSmall ? 4 : isMobile ? 5.3 : 5.5, 0]}
          subtitle={t.skills.subtitle}
          fontSize={isSmall ? 0.6 : isMobile ? 0.65 : 1.4}
        >
          {t.skills.title}
        </SectionTitle>

        {skillsList.map((skill, index) => (
          <SkillOrb
            key={skill.name}
            position={skillPositions[index]}
            color={skill.color}
            glowColor={skill.glow}
            label={skill.name}
            scale={skillScale}
          />
        ))}

        {/* Connecting lines visual */}
        {!isMobile && (
          <group position={[0, 0, -1]}>
            <mesh rotation={[0, 0, Math.PI / 6]}>
              <torusGeometry args={[4, 0.008, 8, 64]} />
              <meshBasicMaterial color="#00f3ff" transparent opacity={0.15} />
            </mesh>
          </group>
        )}
      </group>

      {/* --- PROJECTS SECTION --- */}
      <group position={[0, 0, -SECTION_DISTANCE * 3]}>
        <SectionTitle
          position={[0, isSmall ? 4.5 : isMobile ? 4.8 : 5, 0]}
          subtitle={t.projects.subtitle}
          fontSize={isSmall ? 0.6 : isMobile ? 0.65 : 1.4}
        >
          {t.projects.title}
        </SectionTitle>

        {t.projects.items.map((item, index) => (
          <ProjectCard
            key={index}
            position={projectPositions[index]}
            title={item.title}
            description={item.description}
            color={["#00f3ff", "#bd00ff", "#ff0055", "#00ff88", "#ffaa00", "#ffffff", "#4287f5", "#f542e0"][index] || "#ffffff"}
            scale={projectScale}
            index={index}
          />
        ))}
      </group>

      {/* --- CONTACT SECTION --- */}
      <group position={[0, isMobile ? (isSmall ? 3 : 2) : 2, -SECTION_DISTANCE * 4]}>
        <FloatingRings position={[0, 0, -3]} />

        {/* Main Title */}
        <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.4}>
          <Text
            fontSize={isSmall ? 0.6 : isMobile ? 0.65 : 2}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={width * 1.5}
            textAlign="center"
            letterSpacing={0.08}
          >
            {t.contact.title}
            <meshStandardMaterial
              emissive="#bd00ff"
              emissiveIntensity={1}
              toneMapped={false}
            />
          </Text>
        </Float>

        {/* Subtitle */}
        <Text
          position={[0, isMobile ? -1.2 : -1.6, 0]}
          fontSize={isSmall ? 0.18 : isMobile ? 0.22 : 0.28}
          color="#888888"
          anchorX="center"
          anchorY="middle"
        >
          {t.contact.subtitle}
          <meshBasicMaterial color="#888888" />
        </Text>

        {/* Email Box */}
        <group position={[0, isSmall ? -2.0 : isMobile ? -2.0 : -3.2, 0]}>
          <mesh>
            <planeGeometry args={[isSmall ? 3.5 : isMobile ? 4.5 : 6, isSmall ? 0.7 : 0.9]} />
            <meshBasicMaterial color="#0a0a15" transparent opacity={0.8} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(isMobile ? 4.5 : 6, 0.9)]} />
            <lineBasicMaterial color="#00f3ff" transparent opacity={0.5} />
          </lineSegments>
          <Text
            position={[0, 0.1, 0.01]}
            fontSize={isMobile ? 0.14 : 0.16}
            color="#666666"
            anchorX="center"
            anchorY="middle"
          >
            {t.contact.email}
            <meshBasicMaterial color="#666666" />
          </Text>
          <Text
            position={[0, -0.18, 0.01]}
            fontSize={isMobile ? 0.22 : 0.28}
            color="#00f3ff"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.02}
          >
            xuanco941@gmail.com
            <meshBasicMaterial color="#00f3ff" />
          </Text>
        </group>

        {/* Social Links Row */}
        <group position={[0, isMobile ? -3.4 : -4.8, 0]}>
          {/* GitHub */}
          <group position={[isMobile ? -1.5 : -2.5, 0, 0]}>
            <mesh>
              <planeGeometry args={[isMobile ? 1.3 : 2, 1]} />
              <meshBasicMaterial color="#0a0a15" transparent opacity={0.7} />
            </mesh>
            <lineSegments>
              <edgesGeometry args={[new THREE.PlaneGeometry(isMobile ? 1.3 : 2, 1)]} />
              <lineBasicMaterial color="#888888" transparent opacity={0.3} />
            </lineSegments>
            <Text
              position={[0, 0.2, 0.01]}
              fontSize={isMobile ? 0.12 : 0.14}
              color="#666666"
              anchorX="center"
            >
              GITHUB
              <meshBasicMaterial color="#666666" />
            </Text>
            <Text
              position={[0, -0.15, 0.01]}
              fontSize={isMobile ? 0.14 : 0.18}
              color="#ffffff"
              anchorX="center"
            >
              @xuanco941
              <meshBasicMaterial color="#ffffff" />
            </Text>
          </group>

          {/* Facebook */}
          <group position={[0, 0, 0]}>
            <mesh>
              <planeGeometry args={[isMobile ? 1.3 : 2, 1]} />
              <meshBasicMaterial color="#0a0a15" transparent opacity={0.7} />
            </mesh>
            <lineSegments>
              <edgesGeometry args={[new THREE.PlaneGeometry(isMobile ? 1.3 : 2, 1)]} />
              <lineBasicMaterial color="#888888" transparent opacity={0.3} />
            </lineSegments>
            <Text
              position={[0, 0.2, 0.01]}
              fontSize={isMobile ? 0.12 : 0.14}
              color="#666666"
              anchorX="center"
            >
              FACEBOOK
              <meshBasicMaterial color="#666666" />
            </Text>
            <Text
              position={[0, -0.15, 0.01]}
              fontSize={isMobile ? 0.14 : 0.18}
              color="#ffffff"
              anchorX="center"
            >
              xuanco941
              <meshBasicMaterial color="#ffffff" />
            </Text>
          </group>

          {/* Instagram */}
          <group position={[isMobile ? 1.5 : 2.5, 0, 0]}>
            <mesh>
              <planeGeometry args={[isMobile ? 1.3 : 2, 1]} />
              <meshBasicMaterial color="#0a0a15" transparent opacity={0.7} />
            </mesh>
            <lineSegments>
              <edgesGeometry args={[new THREE.PlaneGeometry(isMobile ? 1.3 : 2, 1)]} />
              <lineBasicMaterial color="#888888" transparent opacity={0.3} />
            </lineSegments>
            <Text
              position={[0, 0.2, 0.01]}
              fontSize={isMobile ? 0.12 : 0.14}
              color="#666666"
              anchorX="center"
            >
              INSTAGRAM
              <meshBasicMaterial color="#666666" />
            </Text>
            <Text
              position={[0, -0.15, 0.01]}
              fontSize={isMobile ? 0.14 : 0.18}
              color="#ffffff"
              anchorX="center"
            >
              @vibes.js
              <meshBasicMaterial color="#ffffff" />
            </Text>
          </group>
        </group>

        {/* Stats Row */}
        <group position={[0, isMobile ? -4.8 : -6.5, 0]}>
          <group position={[isMobile ? -1.5 : -2, isMobile ? 0 : 0, 0]}>
            <Text
              fontSize={isMobile ? 0.5 : 0.7}
              color="#00f3ff"
              anchorX="center"
            >
              3+
              <meshBasicMaterial color="#00f3ff" />
            </Text>
            <Text
              position={[0, isMobile ? -0.5 : -0.65, 0]}
              fontSize={isMobile ? 0.14 : 0.18}
              color="#666666"
              anchorX="center"
            >
              {t.contact.stats.exp}
              <meshBasicMaterial color="#666666" />
            </Text>
          </group>

          <group position={[0, 0, 0]}>
            <Text
              fontSize={isMobile ? 0.5 : 0.7}
              color="#bd00ff"
              anchorX="center"
            >
              20+
              <meshBasicMaterial color="#bd00ff" />
            </Text>
            <Text
              position={[0, isMobile ? -0.5 : -0.65, 0]}
              fontSize={isMobile ? 0.14 : 0.18}
              color="#666666"
              anchorX="center"
            >
              {t.contact.stats.proj}
              <meshBasicMaterial color="#666666" />
            </Text>
          </group>

          <group position={[isMobile ? 1.5 : 2, isMobile ? 0 : 0, 0]}>
            <Text
              fontSize={isMobile ? 0.5 : 0.7}
              color="#ff0055"
              anchorX="center"
            >
              100%
              <meshBasicMaterial color="#ff0055" />
            </Text>
            <Text
              position={[0, isMobile ? -0.5 : -0.65, 0]}
              fontSize={isMobile ? 0.14 : 0.18}
              color="#666666"
              anchorX="center"
            >
              {t.contact.stats.sat}
              <meshBasicMaterial color="#666666" />
            </Text>
          </group>
        </group>

        {/* CTA Text */}
        <Text
          position={[0, isMobile ? -6.0 : -8, 0]}
          fontSize={isMobile ? 0.18 : 0.22}
          color="#888888"
          anchorX="center"
          anchorY="middle"
          textAlign="center"
          maxWidth={isMobile ? 4 : 6}
        >
          {t.contact.cta}
          <meshBasicMaterial color="#888888" />
        </Text>

        <Sparkles count={30} scale={12} size={3} speed={0.2} opacity={0.4} color="#bd00ff" />
      </group>
    </>
  );
};

interface ExperienceProps {
  onSectionChange?: (section: number) => void;
}

const Experience = ({ onSectionChange }: ExperienceProps) => {
  const [currentSection, setCurrentSection] = useState(0);

  const handleSectionChange = (section: number) => {
    setCurrentSection(section);
    onSectionChange?.(section);
  };

  return (
    <SectionContext.Provider value={{ currentSection, setCurrentSection: handleSectionChange }}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Canvas
          dpr={[1, 2]}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2
          }}
          camera={{ fov: 50, near: 0.1, far: 200, position: [0, 0, 12] }}
        >
          <color attach="background" args={['#030308']} />

          <Suspense fallback={null}>
            <ScrollControls pages={6} damping={0.3}>
              <SceneContent />
            </ScrollControls>

            <Stars
              radius={100}
              depth={80}
              count={2500}
              factor={4}
              saturation={0.2}
              fade
              speed={0.5}
            />
            <ParticleField />

            <fog attach="fog" args={['#030308', 10, 60]} />
          </Suspense>

          <ambientLight intensity={0.3} />
          <pointLight position={[15, 15, 15]} intensity={1.5} color="#00f3ff" distance={50} />
          <pointLight position={[-15, -15, -15]} intensity={1.2} color="#bd00ff" distance={50} />
          <pointLight position={[0, 10, -20]} intensity={0.8} color="#ff0055" distance={40} />
        </Canvas>
      </div>
    </SectionContext.Provider>
  );
};

export default Experience;
export { SectionContext };