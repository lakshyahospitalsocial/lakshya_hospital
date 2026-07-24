"use client"
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { MeshProps } from '@react-three/fiber';

const RotatingBox: React.FC<MeshProps> = (props) => {
  return (
    <mesh {...props} rotation={[0.4, 0.4, 0]}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color="#4A90E2" metalness={0.2} roughness={0.6} />
    </mesh>
  );
};

export default function HeroCanvas() {
  return (
    <Canvas className="absolute inset-0">
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <RotatingBox position={[0, 0, 0]} />
      <OrbitControls enableZoom={false} enablePan={false} />
      <Stars radius={100} depth={50} count={5000} saturation={0} />
    </Canvas>
  );
}
