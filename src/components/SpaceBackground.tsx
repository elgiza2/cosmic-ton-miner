
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Point, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface PlanetProps {
  position: [number, number, number];
  size: number;
  color: string;
  rotationSpeed?: number;
  texture?: string;
}

const Planet: React.FC<PlanetProps> = ({ position, size, color, rotationSpeed = 0.01, texture }) => {
  const ref = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += rotationSpeed;
      // Add subtle floating motion
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });
  
  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({ color });
    mat.metalness = 0.2;
    mat.roughness = 0.8;
    return mat;
  }, [color]);
  
  return (
    <mesh position={position} ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      {material && <primitive object={material} />}
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.3} />
    </mesh>
  );
};

const AnimatedStars: React.FC = () => {
  const starsRef = useRef<THREE.Points>(null!);
  const starsMaterial = useRef<THREE.PointsMaterial>(null!);
  
  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
    if (starsMaterial.current) {
      starsMaterial.current.size = 1 + Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
    }
  });
  
  return (
    <>
      <Stars 
        ref={starsRef}
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        fade
        speed={1}
      />
      <Points limit={2000}>
        <PointMaterial
          ref={starsMaterial}
          transparent
          color="#fff"
          size={1.5}
          sizeAttenuation={true}
          depthWrite={false}
        />
        {Array.from({ length: 2000 }).map((_, i) => (
          <Point 
            key={i} 
            position={[
              (Math.random() - 0.5) * 200,
              (Math.random() - 0.5) * 200,
              (Math.random() - 0.5) * 200
            ]} 
          />
        ))}
      </Points>
    </>
  );
};

const SpaceBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 15] }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <AnimatedStars />
        <Planet position={[-8, 4, -10]} size={1.5} color="#FFB347" rotationSpeed={0.005} /> {/* Orange planet */}
        <Planet position={[8, -3, -5]} size={0.9} color="#9370DB" rotationSpeed={0.01} /> {/* Purple planet */}
        <Planet position={[-5, -5, -8]} size={1.8} color="#4682B4" rotationSpeed={0.008} /> {/* Blue planet */}
        <Planet position={[5, 7, -12]} size={1.2} color="#FF6B6B" rotationSpeed={0.012} /> {/* Red planet */}
        <Planet position={[0, -8, -6]} size={0.7} color="#20B2AA" rotationSpeed={0.015} /> {/* Teal planet */}
        <Planet position={[12, 0, -15]} size={2.2} color="#FFC0CB" rotationSpeed={0.003} /> {/* Pink planet */}
        {/* Add nebula-like glowing particles */}
        <fog attach="fog" color="#000" near={30} far={100} />
      </Canvas>
    </div>
  );
};

export default SpaceBackground;
