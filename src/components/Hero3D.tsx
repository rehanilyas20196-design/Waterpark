import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { ChevronDown } from 'lucide-react';

const AnimatedSphere = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.002;
      ref.current.rotation.y += 0.003;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 100, 200]} scale={1.2}>
      <MeshDistortMaterial
        color="#00B359"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.8}
      />
    </Sphere>
  );
};

const Hero3D = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-primary via-blue-600 to-secondary rounded-lg overflow-hidden flex items-center justify-center">
      {/* 3D Canvas */}
      <Canvas
        className="absolute w-full h-full"
        camera={{ position: [0, 0, 2.5] }}
        aria-hidden="true"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedSphere />
        <OrbitControls autoRotate autoRotateSpeed={4} />
      </Canvas>

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 flex flex-col items-center justify-center">
        <div className="text-center text-white px-4 animate-fadeInUp">
          <div className="mb-6 inline-block">
            <div className="text-7xl drop-shadow-lg animate-float">🌊</div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
            Welcome to WaterPark
          </h1>
          <p className="text-lg md:text-2xl mb-2 drop-shadow-md text-blue-100">
            Experience the Ultimate Water Adventure
          </p>
          <p className="text-sm md:text-lg mb-8 drop-shadow-md text-blue-100 max-w-2xl mx-auto">
            Thrilling slides, relaxing rivers, and unforgettable memories await you
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
            <a
              href="/booking"
              className="bg-secondary text-park-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition transform hover:scale-105 shadow-lg"
            >
              Book Now
            </a>
            <a
              href="#attractions"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition transform hover:scale-105 backdrop-blur-sm"
            >
              Learn More
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 animate-bounce">
            <ChevronDown size={32} className="text-white drop-shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero3D;
