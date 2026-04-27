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
import * as THREE from "three";

const exteriorColors = [
  { name: "Obsidian", hex: "#111111" },
  { name: "Silver", hex: "#b8bcc4" },
  { name: "Electric Blue", hex: "#1f5cff" },
  { name: "Crimson", hex: "#c91f3c" },
];

const interiorTrims = [
  { name: "Nappa Black", hex: "#101010" },
  { name: "Ivory White", hex: "#e7ddd2" },
  { name: "Tan Leather", hex: "#8d5a3b" },
  { name: "Red Leather", hex: "#6f1616" },
];

const rotationAngles = [0, 90, 180, 270];

export const Configurator = () => {
  const [exteriorColor, setExteriorColor] = useState(exteriorColors[0]);
  const [interiorTrim, setInteriorTrim] = useState(interiorTrims[0]);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(42);

  const handleZoomIn = () => {
    setZoom((prev) => Math.max(20, prev - 2));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.min(70, prev + 2));
  };

  return (
    <section id="configurator" className="relative py-32">
      <div className="container">
        <SectionTitle
          eyebrow="BUILD YOURS"
          title={
            <>
              Configure your <span className="text-gradient-glow">signature</span>
            </>
          }
        />

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="glass-strong relative overflow-hidden rounded-3xl p-6 lg:col-span-3"
          >
            <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-[radial-gradient(ellipse_at_center,_#111827_0%,_#050505_75%)]">
              <div className="absolute inset-0">
                <ConfiguratorCanvas
                  exteriorColor={exteriorColor.hex}
                  interiorColor={interiorTrim.hex}
                  rotation={rotation}
                  zoom={zoom}
                />
              </div>
            </div>

            <div className="mt-4 px-1">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/40 text-sm font-bold text-foreground transition hover:border-foreground/30 hover:bg-primary/10"
                >
                  +
                </button>

                <div className="flex-1 text-center font-display text-[9px] tracking-[0.25em] text-muted-foreground">
                  ZOOM
                </div>

                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/40 text-sm font-bold text-foreground transition hover:border-foreground/30 hover:bg-primary/10"
                >
                  -
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <Spec label="EXTERIOR COLOR" value={exteriorColor.name} />
              <Spec label="INTERIOR TRIM" value={interiorTrim.name} />
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="space-y-7 lg:col-span-2"
          >
            <Group label="EXTERIOR COLOR">
              <div className="flex flex-wrap gap-3">
                {exteriorColors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setExteriorColor(c)}
                    className={`group flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-display tracking-wide transition ${
                      exteriorColor.name === c.name
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-card/40 text-muted-foreground hover:border-foreground/30"
                    }`}
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-border"
                      style={{ background: c.hex }}
                    />
                    {c.name}
                  </button>
                ))}
              </div>
            </Group>

            <Group label="INTERIOR TRIM">
              <div className="grid grid-cols-2 gap-3">
                {interiorTrims.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => setInteriorTrim(t)}
                    className={`relative flex flex-col items-center gap-2 rounded-xl border p-3 transition ${
                      interiorTrim.name === t.name
                        ? "border-primary bg-primary/10"
                        : "border-border bg-card/40 hover:border-foreground/30"
                    }`}
                  >
                    <span
                      className="h-5 w-5 rounded-full border border-border"
                      style={{ background: t.hex }}
                    />
                    <span className="font-display text-[10px] tracking-wide text-muted-foreground">
                      {t.name}
                    </span>
                  </button>
                ))}
              </div>
            </Group>

            <Group label="VIEW ANGLE">
              <div className="flex gap-2">
                {rotationAngles.map((deg) => (
                  <button
                    key={deg}
                    onClick={() => setRotation(deg)}
                    className={`flex-1 rounded-full border py-2 text-xs font-display tracking-wide transition ${
                      rotation === deg
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-card/40 text-muted-foreground hover:border-foreground/30"
                    }`}
                  >
                    {deg}°
                  </button>
                ))}
              </div>
            </Group>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

function ConfiguratorCanvas({
  exteriorColor,
  interiorColor,
  rotation,
  zoom,
}: {
  exteriorColor: string;
  interiorColor: string;
  rotation: number;
  zoom: number;
}) {
  return (
    <Canvas dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[0, 1.5, 7]} fov={zoom} />

      <Suspense
        fallback={
          <Html center>
            <div className="rounded-full bg-black/70 px-4 py-2 text-xs tracking-[0.2em] text-white">
              LOADING MODEL...
            </div>
          </Html>
        }
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[5, 6, 5]} intensity={1.6} color="#ffffff" />
        <directionalLight position={[-5, 3, -5]} intensity={0.8} color="#ffffff" />
        <spotLight
          position={[0, 8, 2]}
          angle={0.35}
          penumbra={1}
          intensity={2.2}
          color="#ffffff"
        />
        <hemisphereLight intensity={0.35} color="#ffffff" groundColor="#111111" />

        <Environment preset="city" />

        <Bounds fit clip observe margin={1.2}>
          <Center>
            <CarModel
              exteriorColor={exteriorColor}
              interiorColor={interiorColor}
              rotation={rotation}
            />
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
          autoRotate={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 2}
        />
      </Suspense>
    </Canvas>
  );
}

function CarModel({
  exteriorColor,
  interiorColor,
  rotation,
}: {
  exteriorColor: string;
  interiorColor: string;
  rotation: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const gltf = useGLTF("/models/car2.glb");
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  const targetY = (rotation * Math.PI) / 180;

  useEffect(() => {
    scene.traverse((child) => {
      if (!((child as THREE.Mesh).isMesh)) return;

      const mesh = child as THREE.Mesh;
      const meshName = mesh.name.toLowerCase();

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];

      const isExteriorPart =
        meshName.includes("paint") ||
        meshName.includes("coloured") ||
        meshName.includes("carpaint") ||
        meshName.includes("body");

      const isInteriorPart =
        meshName.includes("interior") ||
        meshName.includes("interiorcolourzone") ||
        meshName.includes("seatbelt") ||
        meshName.includes("trim");

      const updatedMaterials = materials.map((mat) => {
        const material = mat as THREE.MeshStandardMaterial;
        const cloned = material.clone();

        if (isExteriorPart) {
          cloned.color.set(exteriorColor);
          cloned.metalness = 0.78;
          cloned.roughness = 0.26;
          cloned.envMapIntensity = 1.1;
        } else if (isInteriorPart) {
          cloned.color.set(interiorColor);
          cloned.metalness = 0.12;
          cloned.roughness = 0.72;
          cloned.envMapIntensity = 0.6;
        }

        cloned.needsUpdate = true;
        return cloned;
      });

      mesh.material = Array.isArray(mesh.material)
        ? updatedMaterials
        : updatedMaterials[0];
    });
  }, [scene, exteriorColor, interiorColor]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetY,
        0.07
      );
    }
  });

  return (
    <group ref={groupRef} scale={1.4} position={[0, -1.2, 0]}>
      <primitive object={scene} />
    </group>
  );
}

const Group = ({ label, children }: { label: string; children: ReactNode }) => (
  <div>
    <div className="font-display mb-3 text-[10px] tracking-[0.3em] text-muted-foreground">
      {label}
    </div>
    {children}
  </div>
);

const Spec = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-xl border border-border bg-card/40 p-3">
    <div className="font-display text-[9px] tracking-[0.25em] text-muted-foreground">
      {label}
    </div>
    <div className="mt-1 truncate font-display text-sm text-foreground">{value}</div>
  </div>
);

useGLTF.preload("/models/car2.glb");