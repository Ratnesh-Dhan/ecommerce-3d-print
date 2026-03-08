"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import { STLLoader } from "three-stdlib";
import { useRef } from "react";

import * as THREE from "three";


function Model({ url }: { url: string }) {
  const geometry = useLoader(STLLoader, url);

  geometry.computeBoundingBox();

  const box = geometry.boundingBox;
  const size = new THREE.Vector3();
  const centre = new THREE.Vector3();

  box.getSize(size);
  box?.getCenter(centre);

  const scale = 60 / Math.max(size.x, size.y, size.z);
  
  geometry.translate(-centre.x, -box.min.y, -centre.z);

  // geometry.center();

  return (
    <mesh geometry={geometry} scale={scale}>
      <meshStandardMaterial color="#a88d32" />
    </mesh>
  );
}

  
export default function STLViewer({ fileUrl }: { fileUrl: string }) {
  if (!fileUrl) return null;
   
  const containerRef = useRef(null); 
  
  return (
    <div ref = {containerRef} className = "w-full h-full">
  <Canvas
    style={{ width: "100%", height: "100%" }}
    camera={{ position: [0, 80, 120], fov: 50 }}
  >

    <ambientLight intensity={0.8} />
    <directionalLight position={[50, 50, 50]} intensity={1} />

    {/* Build Plate */}
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color="#1a1a1a" />
    </mesh>

    {/* Grid */}
    <Grid
      args={[200, 200]}
      cellSize={10}
      cellThickness={0.5}
      cellColor="#6f6f6f"
      sectionSize={50}
      sectionThickness={1}
      sectionColor="#9d4b4b"
      fadeDistance={300}
      fadeStrength={1}
      followCamera={false}
      infiniteGrid={false}
    />

    <Model url={fileUrl} />

    <OrbitControls
      enableZoom
      enablePan
      enableRotate
    />

  </Canvas>
    </div>
  );
}