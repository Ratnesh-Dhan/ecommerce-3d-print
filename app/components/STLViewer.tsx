"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { STLLoader } from "three-stdlib";
import { useRef } from "react";

import * as THREE from "three";


function Model({ url }: { url: string }) {
  const geometry = useLoader(STLLoader, url);

  geometry.computeBoundingBox();

  const box = geometry.boundingBox;
  const size = new THREE.Vector3();
  box.getSize(size);

  const scale = 60 / Math.max(size.x, size.y, size.z);

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
      camera={{ position: [0, 0, 120] }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} />
      <Model url={fileUrl} />
      <OrbitControls
         enableZoom={true}
         enablePan={false}
         enableRotate={true}
       />
    </Canvas>
    </div>
  );
}