import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  Center,
  Bounds,
} from "@react-three/drei";
import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { Moon, RotateCw, Sun } from "lucide-react";
import * as THREE from "three";

const colors = [
  { name: "Black", hex: "#111111" },
  { name: "Silver", hex: "#b8bcc4" },
  { name: "Blue", hex: "#1f5cff" },
  { name: "Red", hex: "#c91f3c" },
];

export const CarViewer3D = () => {
  const [rotate, setRotate] = useState(0);
  const [color, setColor] = useState(colors[0]);
  const [bright, setBright] = useState(false);
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => {
    setZoom((z) => Math.min(2, Number((z + 0.1).toFixed(2))));
  };

  const handleZoomOut = () => {
    setZoom((z) => Math.max(0.6, Number((z - 0.1).toFixed(2))));
  };

  return (
    <section id="viewer" className="relative py-32">
      <div className="container">
        <SectionTitle
          eyebrow="360° EXPERIENCE"
          title={
            <>
              Inspect every <span className="text-gradient-glow">curve</span>
            </>
          }
          description="Rotate, recolor, relight. Step into a virtual showroom built for connoisseurs."
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-10"
        >
          <div
            className="relative mx-auto aspect-[16/10] w-full overflow-hidden rounded-2xl"
            style={{
              background: bright
                ? "radial-gradient(circle at center, #1f2937 0%, #09090b 75%)"
                : "radial-gradient(circle at center, #111827 0%, #000000 75%)",
            }}
          >
            {/* subtle glow only */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 50% 65%, ${color.hex}18, transparent 60%)`,
              }}
            />

            <div className="absolute inset-0">
              <CarCanvas color={color.hex} bright={bright} rotate={rotate} zoom={zoom} />
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div>
              <Label>BODY COLOR</Label>
              <div className="mt-3 flex flex-wrap gap-3">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c)}
                    aria-label={c.name}
                    className={`h-10 w-10 rounded-full border-2 transition ${
                      color.name === c.name
                        ? "border-primary scale-110 shadow-glow-sm"
                        : "border-border hover:border-foreground/40"
                    }`}
                    style={{ background: c.hex }}
                  />
                ))}
              </div>
              <div className="font-display mt-3 text-xs tracking-[0.2em] text-muted-foreground">
                {color.name.toUpperCase()}
              </div>
            </div>

            <div>
              <Label>ROTATE</Label>
              <div className="mt-3 flex flex-wrap gap-3">
                {[0, 90, 180, 270].map((deg) => (
                  <button
                    key={deg}
                    onClick={() => setRotate(deg)}
                    className={`flex h-10 min-w-[60px] items-center justify-center rounded-full border px-4 font-display text-xs tracking-[0.2em] transition ${
                      rotate === deg
                        ? "border-primary bg-primary/15 text-primary-glow"
                        : "border-border bg-card/40 text-muted-foreground hover:border-foreground/30"
                    }`}
                  >
                    {deg}°
                  </button>
                ))}
                <button
                  onClick={() => setRotate((r) => (r + 90) % 360)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/40 text-muted-foreground transition hover:border-primary hover:text-primary"
                >
                  <RotateCw size={14} />
                </button>
              </div>

              <Label>ZOOM</Label>
              <div className="mt-3 flex flex-wrap gap-3">
                <button
                  onClick={handleZoomOut}
                  className="flex h-10 min-w-[60px] items-center justify-center rounded-full border px-4 font-display text-xs tracking-[0.2em] transition border-border bg-card/40 text-muted-foreground hover:border-foreground/30"
                >
                  -
                </button>
                <button
                  onClick={handleZoomIn}
                  className="flex h-10 min-w-[60px] items-center justify-center rounded-full border px-4 font-display text-xs tracking-[0.2em] transition border-border bg-card/40 text-muted-foreground hover:border-foreground/30"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <Label>AMBIENT LIGHT</Label>
              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => setBright(false)}
                  className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-full border font-display text-xs tracking-[0.2em] transition ${
                    !bright
                      ? "border-primary bg-primary/15 text-primary-glow"
                      : "border-border bg-card/40 text-muted-foreground"
                  }`}
                >
                  <Moon size={14} /> NIGHT
                </button>

                <button
                  onClick={() => setBright(true)}
                  className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-full border font-display text-xs tracking-[0.2em] transition ${
                    bright
                      ? "border-primary bg-primary/15 text-primary-glow"
                      : "border-border bg-card/40 text-muted-foreground"
                  }`}
                >
                  <Sun size={14} /> STUDIO
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

function CarCanvas({
  color,
  bright,
  rotate,
  zoom,
}: {
  color: string;
  bright: boolean;
  rotate: number;
  zoom: number;
}) {
  return (
    <Canvas dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[0, 1.5, 7]} fov={42} />

      <Suspense
        fallback={
          <Html center>
            <div className="rounded-full bg-black/70 px-4 py-2 text-xs tracking-[0.2em] text-white">
              LOADING MODEL...
            </div>
          </Html>
        }
      >
        {/* softer, more neutral lights */}
        <ambientLight intensity={bright ? 0.9 : 0.35} />
        <directionalLight position={[5, 6, 5]} intensity={bright ? 2.6 : 1.4} color="#ffffff" />
        <directionalLight position={[-5, 3, -5]} intensity={bright ? 1.1 : 0.6} color="#ffffff" />
        <spotLight
          position={[0, 8, 2]}
          angle={0.35}
          penumbra={1}
          intensity={bright ? 3.2 : 1.8}
          color="#ffffff"
        />
        <hemisphereLight
          intensity={bright ? 0.65 : 0.28}
          color="#ffffff"
          groundColor="#111111"
        />

        <Environment preset={bright ? "studio" : "city"} />

        <Bounds fit clip observe margin={1.2}>
          <Center>
            <CarModel color={color} rotate={rotate} zoom={zoom} />
          </Center>
        </Bounds>

        <ContactShadows
          position={[0, -1.4, 0]}
          opacity={0.55}
          scale={15}
          blur={2.5}
          far={5}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.7}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 2}
        />
      </Suspense>
    </Canvas>
  );
}

function CarModel({
  color,
  rotate,
  zoom,
}: {
  color: string;
  rotate: number;
  zoom: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const gltf = useGLTF("/models/car.glb");
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const meshName = mesh.name.toLowerCase();

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const materials = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];

        const isPaintBodyPart = meshName.includes("carpaint");

        if (!isPaintBodyPart) return;

        const updatedMaterials = materials.map((mat) => {
          const material = mat as THREE.MeshStandardMaterial;
          const cloned = material.clone();

          cloned.color.set(color);
          cloned.metalness = 0.75;
          cloned.roughness = 0.28;
          cloned.envMapIntensity = 1.15;
          cloned.needsUpdate = true;

          return cloned;
        });

        mesh.material = Array.isArray(mesh.material)
          ? updatedMaterials
          : updatedMaterials[0];
      }
    });
  }, [scene, color]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        THREE.MathUtils.degToRad(rotate),
        0.08
      );
    }
  });

  return (
    <group ref={groupRef} scale={1.4 * zoom} position={[0, -1.2, 0]}>
      <primitive object={scene} />
    </group>
  );
}

const Label = ({ children }: { children: ReactNode }) => (
  <div className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">
    {children}
  </div>
);

useGLTF.preload("/models/car.glb");