"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Mesh } from "three";
import { useSpring, animated } from "@react-spring/three";

function MeshComponent() {
  const fileUrl = "https://pcauluwyrqzferpqtvjx.supabase.co/storage/v1/object/public/airplane-gltf/boeing-sterman-model-75/scene.gltf";
  const mesh = useRef<Mesh>(null!);
  const gltf = useLoader(GLTFLoader, fileUrl);
  const [active, setActive] = useState(false);

  const { position } = useSpring({
    from: { position: [2, -1, -5] as any },
    to: async (next) => {
      await next({
        position: active ? [0, 0, 0] : [2, -1, -5] as any,
        config: { mass: 1.8, tension: 120, friction: 22 },
      });
      setActive(true);
    },
    reset: true, // Reset the animation when active changes
    immediate: !active, // Skip the animation if immediate
  });

  useEffect(() => {
    const delay = setTimeout(() => {
      setActive(true);
    }, 100);

    return () => clearTimeout(delay);
  }, []);

  useFrame(() => {
    mesh.current.translateY(Math.sin(performance.now() / 600) / 400);
  });

  return (
    <animated.mesh position={position} ref={mesh}>
      <primitive object={gltf.scene} />
    </animated.mesh>
  );
}

const MemoizedMeshComponent = React.memo(MeshComponent);

export function Aeroplane() {
  return (
    <div className="flex justify-center items-center min-w-[1000px] h-screen">
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 1000, position: [2, 2.5, 4] }}
        className="h-xl w-xl"
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 10, 5]} intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.5}
          intensity={1}
          penumbra={0.5}
        />
        <MemoizedMeshComponent />
        {/* <PlaneComponent /> */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}
