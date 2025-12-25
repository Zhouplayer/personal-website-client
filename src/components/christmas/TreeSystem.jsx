import React, { useRef, useMemo, useContext, useState, useEffect } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial, Text, Line } from '@react-three/drei';
// 修复点 1: 使用标准导入路径，防止 Vite 找不到文件报错
import * as random from 'maath/random';
import { TreeContext } from './types';

// --- 1. 定义 FoliageMaterial ---
const FoliageMaterial = shaderMaterial(
    { uTime: 0, uColor: new THREE.Color('#004225'), uColorAccent: new THREE.Color('#00fa9a'), uPixelRatio: 1 },
    ` uniform float uTime; uniform float uPixelRatio; attribute float size; varying vec3 vPosition; varying float vBlink; vec3 curl(float x, float y, float z) { float eps=1.,n1,n2,a,b;x/=eps;y/=eps;z/=eps;vec3 curl=vec3(0.);n1=sin(y+cos(z+uTime));n2=cos(x+sin(z+uTime));curl.x=n1-n2;n1=sin(z+cos(x+uTime));n2=cos(y+sin(x+uTime));curl.z=n1-n2;n1=sin(x+cos(y+uTime));n2=cos(z+sin(y+uTime));curl.z=n1-n2;return curl*0.1; } void main() { vPosition=position; vec3 distortedPosition=position+curl(position.x,position.y,position.z); vec4 mvPosition=modelViewMatrix*vec4(distortedPosition,1.0); gl_Position=projectionMatrix*mvPosition; gl_PointSize=size*uPixelRatio*(60.0/-mvPosition.z); vBlink=sin(uTime*2.0+position.y*5.0+position.x); } `,
    ` uniform vec3 uColor; uniform vec3 uColorAccent; varying float vBlink; void main() { vec2 xy=gl_PointCoord.xy-vec2(0.5); float ll=length(xy); if(ll>0.5) discard; float strength=pow(1.0-ll*2.0,3.0); vec3 color=mix(uColor,uColorAccent,smoothstep(-0.8,0.8,vBlink)); gl_FragColor=vec4(color,strength); } `
);

// --- 2. 定义 ShimmerMaterial ---
const ShimmerMaterial = shaderMaterial(
    { uTime: 0, uColor: new THREE.Color('#ffffff') },
    // Vertex Shader
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // Fragment Shader
    `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;
    void main() {
      float pos = mod(uTime * 0.8, 2.5) - 0.5;
      float bar = smoothstep(0.0, 0.2, 0.2 - abs(vUv.x + vUv.y * 0.5 - pos));
      float alpha = bar * 0.05;
      gl_FragColor = vec4(uColor, alpha);
    }
  `
);

// --- 3. 注册材质 ---
// 这一步非常重要，必须在组件渲染前完成
extend({ FoliageMaterial, ShimmerMaterial });

// --- 4. Photo Component ---
const PolaroidPhoto = ({ url, position, rotation, scale, id, shouldLoad, year }) => {
    const [texture, setTexture] = useState(null);
    const [loadStatus, setLoadStatus] = useState('pending');

    useEffect(() => {
        if (!shouldLoad || loadStatus !== 'pending') return;

        setLoadStatus('loading');
        const loader = new THREE.TextureLoader();

        loader.load(
            url,
            (tex) => {
                tex.colorSpace = THREE.SRGBColorSpace;
                tex.wrapS = THREE.ClampToEdgeWrapping;
                tex.wrapT = THREE.ClampToEdgeWrapping;
                tex.needsUpdate = true;
                setTexture(tex);
                setLoadStatus('local');
            },
            undefined,
            (error) => {
                console.warn(`⚠️ Local image not found: ${url}, loading random photo...`);
                const seed = id.split('-')[1] || '55';
                const fallbackUrl = `https://picsum.photos/seed/${parseInt(seed) + 100}/400/500`;
                loader.load(
                    fallbackUrl,
                    (fbTex) => {
                        fbTex.colorSpace = THREE.SRGBColorSpace;
                        fbTex.wrapS = THREE.ClampToEdgeWrapping;
                        fbTex.wrapT = THREE.ClampToEdgeWrapping;
                        fbTex.needsUpdate = true;
                        setTexture(fbTex);
                        setLoadStatus('fallback');
                    },
                    undefined,
                    (e) => console.error(`❌ Failed to load images for ${url}`)
                );
            }
        );
    }, [url, id, shouldLoad, loadStatus]);

    return (
        <group position={position} rotation={rotation} scale={scale * 1.2}>
            <mesh position={[0, 0, 0]} userData={{ photoId: id, photoUrl: url }}>
                <boxGeometry args={[1, 1.25, 0.02]} />
                <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
            </mesh>
            <mesh position={[0, 0.15, 0.015]} userData={{ photoId: id, photoUrl: url }}>
                <planeGeometry args={[0.9, 0.9]} />
                {texture ? (
                    <meshStandardMaterial key={texture.uuid} map={texture} roughness={0.5} metalness={0.0} />
                ) : (
                    <meshStandardMaterial color="#333" />
                )}
            </mesh>
            <mesh position={[0, 0.15, 0.02]} scale={[0.9, 0.9, 1]}>
                <planeGeometry args={[1, 1]} />
                {/* 这里的 shimmerMaterial 已经在上方 extend 中注册 */}
                <shimmerMaterial transparent depthWrite={false} blending={THREE.AdditiveBlending} />
            </mesh>
        </group>
    );
};

// --- 5. Main Tree System ---
const TreeSystem = () => {
    const { state, rotationSpeed, rotationBoost, pointer, clickTrigger, setSelectedPhotoUrl, selectedPhotoUrl, panOffset } = useContext(TreeContext);
    const { camera } = useThree();
    const pointsRef = useRef(null);
    const lightsRef = useRef(null);
    const trunkRef = useRef(null);
    const groupRef = useRef(null);

    const progress = useRef(0);
    const treeRotation = useRef(0);
    const currentPan = useRef({ x: 0, y: 0 });
    const [loadedCount, setLoadedCount] = useState(0);
    const [photoObjects, setPhotoObjects] = useState([]);
    const photoOpenTimeRef = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadedCount(prev => {
                if (prev >= photoObjects.length) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, 100);
        return () => clearInterval(interval);
    }, [photoObjects.length]);

    const { foliageData, photosData, lightsData } = useMemo(() => {
        const particleCount = 4500;
        const foliage = new Float32Array(particleCount * 3); const foliageChaos = new Float32Array(particleCount * 3); const foliageTree = new Float32Array(particleCount * 3); const sizes = new Float32Array(particleCount);
        const sphere = random.inSphere(new Float32Array(particleCount * 3), { radius: 18 }); for (let i = 0; i < particleCount * 3; i++) foliageChaos[i] = sphere[i];
        for (let i = 0; i < particleCount; i++) { const i3 = i * 3; const h = Math.random() * 14; const coneRadius = (14 - h) * 0.45; const angle = h * 3.0 + Math.random() * Math.PI * 2; foliageTree[i3] = Math.cos(angle) * coneRadius; foliageTree[i3 + 1] = h - 6; foliageTree[i3 + 2] = Math.sin(angle) * coneRadius; sizes[i] = Math.random() * 1.5 + 0.5; }

        const lightCount = 300;
        const lightChaos = new Float32Array(lightCount * 3); const lightTree = new Float32Array(lightCount * 3); const lSphere = random.inSphere(new Float32Array(lightCount * 3), { radius: 20 });
        for (let i = 0; i < lightCount * 3; i++) lightChaos[i] = lSphere[i];
        for (let i = 0; i < lightCount; i++) { const i3 = i * 3; const t = i / lightCount; const h = t * 13; const coneRadius = (14 - h) * 0.48; const angle = t * Math.PI * 25; lightTree[i3] = Math.cos(angle) * coneRadius; lightTree[i3 + 1] = h - 6; lightTree[i3 + 2] = Math.sin(angle) * coneRadius; }

        const photoFiles = [
            "2025_11_1.jpg", "2025_11_2.jpg", "2025_11_3.jpg", "2025_11_4.jpg", "2025_11_5.jpg", "2025_11_6.jpg",
            "2025_11_7.jpg", "2025_11_8.jpg", "2025_11_9.jpg", "2025_11_10.jpg", "2025_11_11.jpg", "2025_11_12.jpg",
            "2025_11_13.jpg", "2025_11_14.jpg", "2025_11_15.jpg", "2025_11_16.jpg", "2025_11_17.jpg", "2025_11_18.jpg",
            "2025_11_19.jpg", "2025_11_20.jpg", "2025_11_21.jpg", "2025_11_22.jpg", "2025_11_23.jpg", "2025_11_24.jpg",
            "2025_11_25.jpg", "2025_11_26.jpg", "2025_11_27.jpg", "2025_11_28.jpg", "2025_11_29.jpg", "2025_11_30.jpg",
            "2025_11_31.jpg"
        ];
        photoFiles.sort();

        const photoCount = photoFiles.length;
        const photos = [];

        for (let i = 0; i < photoCount; i++) {
            const fileName = photoFiles[i];
            const parts = fileName.split('_');
            const year = parseInt(parts[0]);
            const month = parts[1];
            const t = i / (photoCount - 1);
            const h = t * 14 - 7;
            const radius = (7 - (h + 7)) * 0.4 + 1.5;
            const angle = t * Math.PI * 10;
            const treeX = Math.cos(angle) * radius;
            const treeY = h;
            const treeZ = Math.sin(angle) * radius;

            const phi = Math.acos(1 - 2 * (i + 0.5) / photoCount);
            const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
            const r = 12 + Math.random() * 4;
            const chaosX = r * Math.sin(phi) * Math.cos(theta);
            const chaosY = r * Math.sin(phi) * Math.sin(theta) * 0.6;
            const chaosZ = r * Math.cos(phi);

            photos.push({
                id: `photo-${i}`,
                type: 'PHOTO',
                year: year,
                month: month,
                chaosPos: [chaosX, chaosY, chaosZ],
                treePos: [treeX, treeY, treeZ],
                chaosRot: [(Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.1],
                treeRot: [0, -angle + Math.PI / 2, 0],
                scale: 0.9 + Math.random() * 0.3,
                image: `/photos/${fileName}`,
                color: 'white'
            });
        }
        return { foliageData: { current: foliage, chaos: foliageChaos, tree: foliageTree, sizes }, photosData: photos, lightsData: { chaos: lightChaos, tree: lightTree, count: lightCount } };
    }, []);

    useEffect(() => {
        setPhotoObjects(photosData.map(p => ({ id: p.id, url: p.image, ref: React.createRef(), data: p, pos: new THREE.Vector3(), rot: new THREE.Euler(), scale: p.scale })));
    }, [photosData]);

    useEffect(() => {
        if (state === 'CHAOS' && pointer) {
            if (selectedPhotoUrl && Date.now() - photoOpenTimeRef.current < 3000) return;

            const ndcX = pointer.x * 2 - 1;
            const ndcY = -(pointer.y * 2) + 1;
            let closestPhotoId = null;
            let minDistance = Infinity;
            const SELECTION_THRESHOLD = 0.05;

            photoObjects.forEach(obj => {
                if (!obj.ref.current) return;
                const worldPos = new THREE.Vector3();
                obj.ref.current.getWorldPosition(worldPos);
                const screenPos = worldPos.clone().project(camera);
                if (screenPos.z < 1) {
                    const dist = Math.hypot(screenPos.x - ndcX, screenPos.y - ndcY);
                    if (dist < SELECTION_THRESHOLD && dist < minDistance) {
                        minDistance = dist;
                        closestPhotoId = obj.data.image;
                    }
                }
            });

            if (closestPhotoId) {
                if (selectedPhotoUrl === closestPhotoId) {
                    if (Date.now() - photoOpenTimeRef.current > 3000) setSelectedPhotoUrl(null);
                } else {
                    setSelectedPhotoUrl(closestPhotoId);
                    photoOpenTimeRef.current = Date.now();
                }
            } else if (selectedPhotoUrl) {
                if (Date.now() - photoOpenTimeRef.current > 3000) setSelectedPhotoUrl(null);
            }
        }
    }, [clickTrigger]);

    useFrame((state3d, delta) => {
        const targetProgress = state === 'FORMED' ? 1 : 0;
        progress.current = THREE.MathUtils.damp(progress.current, targetProgress, 2.0, delta);
        const ease = progress.current * progress.current * (3 - 2 * progress.current);
        treeRotation.current += (state === 'FORMED' ? (rotationSpeed + rotationBoost) : 0.05) * delta;

        const targetPanX = panOffset.x;
        const targetPanY = panOffset.y;
        currentPan.current.x = THREE.MathUtils.lerp(currentPan.current.x, targetPanX, 0.2);
        currentPan.current.y = THREE.MathUtils.lerp(currentPan.current.y, targetPanY, 0.2);

        if (groupRef.current) {
            groupRef.current.position.x = currentPan.current.x;
            groupRef.current.position.y = currentPan.current.y;
        }

        if (pointsRef.current) {
            pointsRef.current.material.uniforms.uTime.value = state3d.clock.getElapsedTime();
            const positions = pointsRef.current.geometry.attributes.position.array;
            for (let i = 0; i < positions.length / 3; i++) {
                const i3 = i * 3; const cx = foliageData.chaos[i3]; const cy = foliageData.chaos[i3 + 1]; const cz = foliageData.chaos[i3 + 2]; const tx = foliageData.tree[i3]; const ty = foliageData.tree[i3 + 1]; const tz = foliageData.tree[i3 + 2];
                const y = THREE.MathUtils.lerp(cy, ty, ease); const tr = Math.sqrt(tx * tx + tz * tz); const tAngle = Math.atan2(tz, tx); const cr = Math.sqrt(cx * cx + cz * cz); const r = THREE.MathUtils.lerp(cr, tr, ease);
                const vortexTwist = (1 - ease) * 15.0; const currentAngle = tAngle + vortexTwist + treeRotation.current; const formedX = r * Math.cos(currentAngle); const formedZ = r * Math.sin(currentAngle);
                const cAngle = Math.atan2(cz, cx); const cRotatedX = cr * Math.cos(cAngle + treeRotation.current * 0.5); const cRotatedZ = cr * Math.sin(cAngle + treeRotation.current * 0.5);
                positions[i3] = THREE.MathUtils.lerp(cRotatedX, formedX, ease); positions[i3 + 1] = y; positions[i3 + 2] = THREE.MathUtils.lerp(cRotatedZ, formedZ, ease);
            }
            pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }
        if (lightsRef.current) {
            const dummy = new THREE.Object3D();
            for (let i = 0; i < lightsData.count; i++) {
                const i3 = i * 3; const cx = lightsData.chaos[i3]; const cy = lightsData.chaos[i3 + 1]; const cz = lightsData.chaos[i3 + 2]; const tx = lightsData.tree[i3]; const ty = lightsData.tree[i3 + 1]; const tz = lightsData.tree[i3 + 2];
                const y = THREE.MathUtils.lerp(cy, ty, ease); const tr = Math.sqrt(tx * tx + tz * tz); const tAngle = Math.atan2(tz, tx); const cr = Math.sqrt(cx * cx + cz * cz); const r = THREE.MathUtils.lerp(cr, tr, ease);
                const vortexTwist = (1 - ease) * 12.0; const currentAngle = tAngle + vortexTwist + treeRotation.current;
                const cAngle = Math.atan2(cz, cx); const cRotatedX = cr * Math.cos(cAngle + treeRotation.current * 0.3); const cRotatedZ = cr * Math.sin(cAngle + treeRotation.current * 0.3);
                const fx = THREE.MathUtils.lerp(cRotatedX, r * Math.cos(currentAngle), ease); const fz = THREE.MathUtils.lerp(cRotatedZ, r * Math.sin(currentAngle), ease);
                dummy.position.set(fx, y, fz); dummy.scale.setScalar(1); dummy.updateMatrix(); lightsRef.current.setMatrixAt(i, dummy.matrix);
            }
            lightsRef.current.instanceMatrix.needsUpdate = true;
        }
        photoObjects.forEach(obj => {
            if (obj.ref.current) {
                obj.ref.current.traverse((child) => {
                    if (child.material && child.material.uniforms && child.material.uniforms.uTime) {
                        child.material.uniforms.uTime.value = state3d.clock.getElapsedTime() + parseInt(obj.id.split('-')[1] || '0');
                    }
                });
            }
        });
        if (trunkRef.current) {
            const trunkScale = THREE.MathUtils.smoothstep(ease, 0.3, 1.0); trunkRef.current.scale.set(trunkScale, ease, trunkScale); trunkRef.current.position.y = 1; trunkRef.current.rotation.y = treeRotation.current;
        }
        photoObjects.forEach((obj) => {
            if (!obj.ref.current) return;
            const { chaosPos, treePos, chaosRot, treeRot } = obj.data;
            const [cx, cy, cz] = chaosPos; const [tx, ty, tz] = treePos;
            const y = THREE.MathUtils.lerp(cy, ty, ease); const cr = Math.sqrt(cx * cx + cz * cz); const tr = Math.sqrt(tx * tx + tz * tz); const r = THREE.MathUtils.lerp(cr, tr, ease);
            const tAngle = Math.atan2(tz, tx); const vortexTwist = (1 - ease) * 10.0; const currentAngle = tAngle + vortexTwist + treeRotation.current;
            const cAngle = Math.atan2(cz, cx); const cRotatedX = cr * Math.cos(cAngle + treeRotation.current * 0.2); const cRotatedZ = cr * Math.sin(cAngle + treeRotation.current * 0.2);
            const targetX = r * Math.cos(currentAngle); const targetZ = r * Math.sin(currentAngle);
            obj.ref.current.position.set(THREE.MathUtils.lerp(cRotatedX, targetX, ease), y, THREE.MathUtils.lerp(cRotatedZ, targetZ, ease));
            const lookAtAngle = -currentAngle + Math.PI / 2;
            obj.ref.current.rotation.x = THREE.MathUtils.lerp(chaosRot[0], treeRot[0], ease); obj.ref.current.rotation.y = THREE.MathUtils.lerp(chaosRot[1], lookAtAngle, ease); obj.ref.current.rotation.z = THREE.MathUtils.lerp(chaosRot[2], treeRot[2], ease);
        });
    });

    return (
        <group ref={groupRef}>
            <mesh ref={trunkRef} position={[0, 0, 0]}><cylinderGeometry args={[0.2, 0.8, 14, 8]} /><meshStandardMaterial color="#3E2723" roughness={0.9} metalness={0.1} /></mesh>
            <points ref={pointsRef}> <bufferGeometry> <bufferAttribute attach="attributes-position" count={foliageData.current.length / 3} array={foliageData.current} itemSize={3} /> <bufferAttribute attach="attributes-size" count={foliageData.sizes.length} array={foliageData.sizes} itemSize={1} /> </bufferGeometry> <foliageMaterial transparent depthWrite={false} blending={THREE.AdditiveBlending} /> </points>
            <instancedMesh ref={lightsRef} args={[undefined, undefined, lightsData.count]}><sphereGeometry args={[0.05, 8, 8]} /><meshStandardMaterial color="#ffddaa" emissive="#ffbb00" emissiveIntensity={3} toneMapped={false} /></instancedMesh>
            {photoObjects.map((obj, index) => (
                <group key={obj.id} ref={(el) => { obj.ref.current = el; }}>
                    <PolaroidPhoto
                        url={obj.url}
                        position={obj.pos}
                        rotation={obj.rot}
                        scale={obj.scale}
                        id={obj.id}
                        shouldLoad={index < loadedCount}
                        year={obj.data.year}
                    />
                    {obj.data.year && (index === 0 || photoObjects[index - 1].data.year !== obj.data.year) && (
                        <group position={[0, 0.65, 0.05]}>
                            <Text position={[0.01, -0.01, -0.01]} fontSize={0.18} maxWidth={1.2} color="#000000" font="/fonts/Cinzel-Bold.ttf" characters="0123456789-" anchorX="center" anchorY="bottom" fillOpacity={0.5}>
                                {`${obj.data.year}-${obj.data.month}`}
                            </Text>
                            <Text fontSize={0.18} maxWidth={1.2} color="#ffd700" font="/fonts/Cinzel-Bold.ttf" characters="0123456789-" anchorX="center" anchorY="bottom" fillOpacity={state === 'FORMED' ? 1 : 0.9} outlineWidth={0}>
                                {`${obj.data.year}-${obj.data.month}`}
                            </Text>
                        </group>
                    )}
                </group>
            ))}
            {state === 'FORMED' && (
                <Line points={photoObjects.map(obj => new THREE.Vector3(...obj.data.treePos))} color="#ffd700" opacity={0.3} transparent lineWidth={1} />
            )}
        </group>
    );
};

export default TreeSystem;