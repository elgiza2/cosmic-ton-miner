
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

interface PlanetProps {
  position: [number, number, number];
  size: number;
  color: string;
  rotationSpeed?: number;
}

const Planet: React.FC<PlanetProps> = ({ position, size, color, rotationSpeed = 0.01 }) => {
  const ref = useRef<THREE.Mesh>(null!);
  
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += rotationSpeed;
    }
  });
  
  return (
    <mesh position={position} ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const AnimatedStars: React.FC = () => {
  const starsRef = useRef<THREE.Object3D>(null!);
  
  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });
  
  return <Stars ref={starsRef} radius={100} depth={50} count={5000} factor={4} fade speed={1} />;
};

const SpaceBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 15] }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <AnimatedStars />
        <Planet position={[-8, 4, -10]} size={1.2} color="#FFB347" rotationSpeed={0.005} /> {/* Orange planet */}
        <Planet position={[8, -3, -5]} size={0.7} color="#9370DB" rotationSpeed={0.01} /> {/* Purple planet */}
        <Planet position={[-5, -5, -8]} size={1.5} color="#4682B4" rotationSpeed={0.008} /> {/* Blue planet */}
        <Planet position={[5, 7, -12]} size={0.9} color="#FF6B6B" rotationSpeed={0.012} /> {/* Red planet */}
        <Planet position={[0, -8, -6]} size={0.5} color="#20B2AA" rotationSpeed={0.015} /> {/* Teal planet */}
      </Canvas>
    </div>
  );
};

export default SpaceBackground;
