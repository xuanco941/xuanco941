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

// Context for section tracking
const SectionContext = createContext({ currentSection: 0, setCurrentSection: (n: number) => { } });

// Constants
const SECTION_DISTANCE = 25;
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

const SectionTitle = ({ children, position, color = "white", subtitle, scale = 1, fontSize = 1.5 }: { children: string, position: [number, number, number], color?: string, subtitle?: string, scale?: number, fontSize?: number }) => {
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
        anchorX="center"
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
        <group position={[0, -subtitleOffset, 0]}>
          <Text
            color="#00f3ff"
            anchorX="center"
            anchorY="middle"
            fontSize={subtitleFontSize}
            letterSpacing={0.2}
          >
            {subtitle}
            <meshBasicMaterial color="#00f3ff" transparent opacity={0.7} />
          </Text>
          {/* Decorative line under subtitle */}
          <mesh position={[0, -subtitleFontSize * 0.8, 0]}>
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

      {/* Label with background */}
      <group position={[0, -1.6, 0]}>
        <mesh>
          <planeGeometry args={[2.2, 0.5]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.6} />
        </mesh>
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.35}
          color="white"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.05}
        >
          {label}
          <meshBasicMaterial color="white" />
        </Text>
      </group>
    </group>
  )
}

const ProjectCard = ({ position, title, description, color, scale = 1, index = 0 }: { position: [number, number, number], title: string, description: string, color: string, scale?: number, index?: number }) => {
  const [hovered, setHover] = useState(false);
  const ref = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

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
          VIEW PROJECT →
          <meshBasicMaterial color={hovered ? color : "#666666"} />
        </Text>
      </group>
    </group>
  )
}

const SceneContent = () => {
  const scroll = useScroll();
  const { width } = useThree((state) => state.viewport);
  // Responsive breakpoints
  const isSmall = width < 5;
  const isMobile = width < 7;
  const isTablet = width < 10;
  const { setCurrentSection } = useContext(SectionContext);
  const prevSection = useRef(0);

  useFrame((state, delta) => {
    // Calculate which section we should be viewing based on scroll
    const sectionProgress = scroll.offset * SECTIONS;

    // Switch section slightly earlier (when 65-70% of the way to next section)
    // instead of waiting for full alignment
    const trackingBias = 0.35;
    const currentSectionIndex = Math.min(Math.floor(sectionProgress + trackingBias), SECTIONS - 1);

    // Calculate target Z position
    // Camera starts at z=8 to view Hero at z=0
    // Then moves to z=8-25=-17 for About, z=8-50=-42 for Skills, etc.
    const baseZ = 8;
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

  // About Section
  const aboutTextScale = isSmall ? 0.65 : isMobile ? 0.8 : 0.9;
  const aboutCodeScale = isSmall ? 0.45 : isMobile ? 0.6 : 0.75;
  const aboutTextPos: [number, number, number] = isMobile ? [0, -3.8, 0.5] : [-4, -0.5, 0.5];
  const aboutCodePos: [number, number, number] = isMobile ? [0, 1.2, 0] : [3.5, 0, 0];
  const aboutTitlePos: [number, number, number] = isMobile ? [0, 4.2, 0] : [-4, 3.5, 0];

  // Skills Section
  const skillPositions: [number, number, number][] = isMobile ? [
    [0, 2.2, 0],
    [-1.5, 0.2, 0.5],
    [1.5, 0.2, 0.5],
    [-0.8, -1.8, 0],
    [0.8, -1.8, 0]
  ] : [
    [-4, 0, 0],
    [-1.8, 2, -0.5],
    [1.8, 2, -0.5],
    [-1.8, -2, 0.5],
    [1.8, -2, 0.5]
  ];
  const skillScale = isSmall ? 0.55 : isMobile ? 0.7 : 0.9;

  // Projects Section
  const projectScale = isSmall ? 0.65 : isMobile ? 0.8 : 0.95;
  const projectPositions: [number, number, number][] = isMobile ? [
    [0, 2.8, 0],
    [0, -0.2, 0],
    [0, -3.2, 0]
  ] : [
    [-4, 0.5, 0],
    [0, -0.5, 1],
    [4, 0.5, 0]
  ];

  return (
    <>
      {/* --- HERO SECTION --- */}
      <group position={[0, 0, 0]}>
        <FloatingRings position={[0, 0, -3]} />

        <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.2}>
          {/* Main Title */}
          <Text
            position={[0, isSmall ? 0.4 : isMobile ? 0.6 : 0.8, 0]}
            fontSize={isSmall ? 0.8 : isMobile ? 1.4 : isTablet ? 1.8 : 2.2}
            letterSpacing={-0.02}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={width * 0.95}
            textAlign="center"
            lineHeight={1}
          >
            HI, I'M XUAN
            <meshStandardMaterial
              emissive="#00f3ff"
              emissiveIntensity={1}
              toneMapped={false}
            />
          </Text>

          {/* Role */}
          <Text
            position={[0, isSmall ? -0.4 : isMobile ? -0.6 : -1, 0]}
            fontSize={isSmall ? 0.22 : isMobile ? 0.35 : isTablet ? 0.45 : 0.5}
            color="#00f3ff"
            anchorX="center"
            anchorY="middle"
            maxWidth={width * 0.9}
            textAlign="center"
            letterSpacing={0.1}
          >
            FULLSTACK DEVELOPER
            <meshBasicMaterial color="#00f3ff" transparent opacity={0.9} />
          </Text>

          {/* Subtitle tagline */}
          <Text
            position={[0, isSmall ? -0.9 : isMobile ? -1.2 : -1.8, 0]}
            fontSize={isSmall ? 0.12 : isMobile ? 0.18 : isTablet ? 0.22 : 0.25}
            color="#888888"
            anchorX="center"
            anchorY="middle"
            maxWidth={width * 0.85}
          >
            Building Digital Experiences
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
        <SectionTitle
          position={aboutTitlePos}
          subtitle="// WHO I AM"
          fontSize={isSmall ? 0.8 : isMobile ? 1 : 1.4}
        >
          ABOUT ME
        </SectionTitle>

        <CodeBlock position={aboutCodePos} scale={aboutCodeScale} />

        <group position={aboutTextPos} scale={[aboutTextScale, aboutTextScale, aboutTextScale]}>
          <mesh position={[isMobile ? 0 : 2.75, 1.2, -0.05]}>
            <planeGeometry args={[isSmall ? 4 : isMobile ? 5 : 5.8, 3]} />
            <meshBasicMaterial color="#000000" transparent opacity={0.3} />
          </mesh>
          <Text
            position={[0, 0, 0]}
            maxWidth={isSmall ? 3.8 : isMobile ? 4.5 : 5.5}
            fontSize={isSmall ? 0.22 : isMobile ? 0.26 : 0.3}
            lineHeight={1.6}
            textAlign={isMobile ? "center" : "left"}
            anchorX={isMobile ? "center" : "left"}
            anchorY="top"
            color="#d0d0d0"
          >
            I focus on building scalable full-stack applications using modern technologies. My stack includes React, Node.js, ASP.NET, and cloud infrastructure.
            {'\n\n'}
            Creating elegant solutions for complex problems is my passion.
            <meshBasicMaterial color="#d0d0d0" />
          </Text>
        </group>

        <Sparkles count={30} scale={8} size={2} speed={0.5} opacity={0.3} color="#00f3ff" position={[0, 0, -2]} />
      </group>

      {/* --- SKILLS SECTION --- */}
      <group position={[0, 0, -SECTION_DISTANCE * 2]}>
        <SectionTitle
          position={[0, isMobile ? 4.5 : 4.2, 0]}
          subtitle="// MY SKILLS"
          fontSize={isSmall ? 0.8 : isMobile ? 1 : 1.4}
        >
          TECH STACK
        </SectionTitle>

        <SkillOrb position={skillPositions[0]} color="#61dafb" glowColor="#61dafb" label="React" scale={skillScale} />
        <SkillOrb position={skillPositions[1]} color="#512bd4" glowColor="#8b5cf6" label=".NET / C#" scale={skillScale} />
        <SkillOrb position={skillPositions[2]} color="#339933" glowColor="#22c55e" label="Node.js" scale={skillScale} />
        <SkillOrb position={skillPositions[3]} color="#3178c6" glowColor="#60a5fa" label="TypeScript" scale={skillScale} />
        <SkillOrb position={skillPositions[4]} color="#e38c00" glowColor="#f59e0b" label="SQL" scale={skillScale} />

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
          position={[0, isMobile ? 5 : 4, 0]}
          subtitle="// MY WORK"
          fontSize={isSmall ? 0.8 : isMobile ? 1 : 1.4}
        >
          PROJECTS
        </SectionTitle>

        <ProjectCard
          position={projectPositions[0]}
          title="Neural Analytics"
          description="Real-time data visualization dashboard with WebSockets and interactive charts."
          color="#00f3ff"
          scale={projectScale}
          index={0}
        />
        <ProjectCard
          position={projectPositions[1]}
          title="Nexus Commerce"
          description="Headless e-commerce architecture utilizing Next.js and Stripe integration."
          color="#bd00ff"
          scale={projectScale}
          index={1}
        />
        <ProjectCard
          position={projectPositions[2]}
          title="Synth AI"
          description="LLM-powered code assistant extension for Visual Studio Code."
          color="#ff0055"
          scale={projectScale}
          index={2}
        />
      </group>

      {/* --- CONTACT SECTION --- */}
      <group position={[0, isMobile ? 1.5 : 2, -SECTION_DISTANCE * 4]}>
        <FloatingRings position={[0, 0, -3]} />

        {/* Main Title */}
        <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.4}>
          <Text
            fontSize={isSmall ? 1 : isMobile ? 1.3 : 2}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={width * 0.9}
            textAlign="center"
            letterSpacing={0.08}
          >
            LET'S CONNECT
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
          Ready to bring your ideas to life
          <meshBasicMaterial color="#888888" />
        </Text>

        {/* Email Box */}
        <group position={[0, isSmall ? -2.2 : isMobile ? -2.8 : -3.2, 0]}>
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
            EMAIL
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
        <group position={[0, isMobile ? -4.2 : -4.8, 0]}>
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
        <group position={[0, isMobile ? -5.8 : -6.5, 0]}>
          <group position={[isMobile ? -1.8 : -3, 0, 0]}>
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
              Years Experience
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
              Projects Completed
              <meshBasicMaterial color="#666666" />
            </Text>
          </group>

          <group position={[isMobile ? 1.8 : 3, 0, 0]}>
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
              Client Satisfaction
              <meshBasicMaterial color="#666666" />
            </Text>
          </group>
        </group>

        {/* CTA Text */}
        <Text
          position={[0, isMobile ? -7.2 : -8, 0]}
          fontSize={isMobile ? 0.18 : 0.22}
          color="#888888"
          anchorX="center"
          anchorY="middle"
          textAlign="center"
          maxWidth={isMobile ? 4 : 6}
        >
          Available for freelance projects and full-time opportunities.{"\n"}Let's build something amazing together!
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
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
        camera={{ fov: 50, near: 0.1, far: 200, position: [0, 0, 8] }}
      >
        <color attach="background" args={['#030308']} />

        <Suspense fallback={null}>
          <ScrollControls pages={6} damping={0.2}>
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
    </SectionContext.Provider>
  );
};

export default Experience;
export { SectionContext };