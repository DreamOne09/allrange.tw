"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Shader: Vertex
const vertexShader = `
  uniform float uTime;
  uniform float uProgress;
  
  attribute vec3 aTargetPosition;
  attribute float aRandomSize;
  
  varying vec3 vColor;
  varying float vAlpha;

  // Simple noise function
  float hash(float n) { return fract(sin(n) * 43758.5453123); }

  void main() {
    // Lerp between initial position (position) and target (aTargetPosition)
    vec3 p = mix(position, aTargetPosition, uProgress);
    
    // Add some "swirl" noise during transition
    float noise = hash(position.x * 10.0 + uTime) * 2.0 - 1.0;
    
    // While moving (uProgress < 1.0), add some chaotic movement
    if (uProgress < 0.95) {
      p += normalize(position) * noise * (1.0 - uProgress) * 2.0;
    }

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    
    // Size attenuation
    gl_PointSize = (3.0 + aRandomSize * 4.0) * (10.0 / -mvPosition.z);
    
    gl_Position = projectionMatrix * mvPosition;
    
    // Color logic
    // Start with white/yellow, fade to orange/gold
    vColor = mix(vec3(1.0, 1.0, 0.8), vec3(0.97, 0.71, 0.18), uProgress);
    vAlpha = 1.0;
  }
`;

// Shader: Fragment
const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Circular particle
    float r = distance(gl_PointCoord, vec2(0.5));
    if (r > 0.5) discard;
    
    // Soft edge
    float glow = 1.0 - (r * 2.0);
    glow = pow(glow, 1.5);

    gl_FragColor = vec4(vColor, glow);
  }
`;

const ParticleSphere = () => {
    const meshRef = useRef<THREE.Points>(null);
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uProgress: { value: 0 },
        }),
        []
    );

    const count = 4000;
    const radius = 2.5;

    const { positions, targets, randomSizes } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const targets = new Float32Array(count * 3);
        const randomSizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            // Initial: Chaotic Cloud
            positions[i * 3] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

            // Target: Sphere Surface
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;

            targets[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
            targets[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
            targets[i * 3 + 2] = radius * Math.cos(phi);

            randomSizes[i] = Math.random();
        }
        return { positions, targets, randomSizes };
    }, []);

    useFrame((state) => {
        if (meshRef.current) {
            const { clock } = state;
            const time = clock.getElapsedTime();

            // Update uniforms
            const material = meshRef.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = time;

            // Animated progress: slowly go from 0 to 1 over first 3 seconds
            let progress = Math.min(time / 2.5, 1.0);
            // Add easing
            progress = 1 - Math.pow(1 - progress, 3); // Cubic out

            material.uniforms.uProgress.value = progress;

            // Rotate the whole sphere slowly after formation
            if (progress > 0.8) {
                meshRef.current.rotation.y += 0.002;
                meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
            }
        }
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-aTargetPosition"
                    args={[targets, 3]}
                />
                <bufferAttribute
                    attach="attributes-aRandomSize"
                    args={[randomSizes, 1]}
                />
            </bufferGeometry>
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export default function HeroParticle() {
    return (
        <div className="w-full h-[600px] bg-brand-black relative overflow-hidden">
            <div className="absolute top-4 left-4 z-10 bg-brand-black/50 p-2 rounded border border-brand-orange text-brand-orange text-xs">
                OPTION 1: Particle Convergence (Three.js)
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                {/* Optional Background Text behind the sphere */}
                <h1 className="text-[120px] font-bold text-white/5 tracking-tighter select-none">ALLRANGE</h1>
            </div>

            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />
                {/* <OrbitControls enableZoom={false} autoRotate={false} /> */}
                <ParticleSphere />
            </Canvas>

            <div className="absolute bottom-10 w-full text-center z-10 opacity-0 animate-[fadeIn_1s_ease-in-out_3s_forwards]">
                <h2 className="text-2xl font-bold text-white tracking-widest uppercase">Designed to Impact</h2>
            </div>
        </div>
    );
}
