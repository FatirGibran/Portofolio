import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * SpatialStage3D
 * The Persistent 3D WebGL Canvas for Fatir Gibran's Portfolio.
 * Combines:
 * - Option A: Cyber-Pastel Glassmorphism & Floating Liquid Particles
 * - Option B: Kinetic Wireframe Grid & Dynamic Scroll Camera Trajectory
 * - Option C: Interactive 3D Cyber-Desk, Laptop, and Holographic Core
 */
export default function SpatialStage3D({
  isLaserActive = false,
  laserPos = { x: 0, y: 0 },
  isConfettiActive = false,
}) {
  const canvasRef = useRef(null);
  const { isDark } = usePortfolio();

  // Keep ref to reactive props for the animation loop
  const isDarkRef = useRef(isDark);
  const isLaserActiveRef = useRef(isLaserActive);
  const laserPosRef = useRef(laserPos);
  const isConfettiActiveRef = useRef(isConfettiActive);

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    isLaserActiveRef.current = isLaserActive;
  }, [isLaserActive]);

  useEffect(() => {
    laserPosRef.current = laserPos;
  }, [laserPos]);

  useEffect(() => {
    isConfettiActiveRef.current = isConfettiActive;
  }, [isConfettiActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(3.2, 4.0, 7.8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Fog for depth blending
    const fogColorLight = new THREE.Color('#FDFBF7');
    const fogColorDark = new THREE.Color('#0B1120');
    scene.fog = new THREE.FogExp2(isDarkRef.current ? fogColorDark : fogColorLight, 0.035);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(
      isDarkRef.current ? 0x1e293b : 0xf8fafc,
      isDarkRef.current ? 1.2 : 1.8
    );
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, isDarkRef.current ? 1.4 : 2.0);
    dirLight.position.set(5, 8, 4);
    scene.add(dirLight);

    // Pastel point lights
    const bluePointLight = new THREE.PointLight(0x38bdf8, 2.5, 12);
    bluePointLight.position.set(-2, 2.5, 2);
    scene.add(bluePointLight);

    const yellowPointLight = new THREE.PointLight(0xfde047, 2.0, 10);
    yellowPointLight.position.set(2.5, 1.8, 1);
    scene.add(yellowPointLight);

    // Interactive Laser 3D Light
    const laser3DLight = new THREE.PointLight(0xef4444, 0, 8);
    scene.add(laser3DLight);

    // 3. Materials Factory
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: isDarkRef.current ? 0x0284c7 : 0xbae6fd,
      transmission: 0.78,
      opacity: 0.85,
      transparent: true,
      roughness: 0.18,
      ior: 1.45,
      metalness: 0.1,
      reflectivity: 0.6,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
    });

    const matYellowEmissive = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xfbbf24,
      emissiveIntensity: 0.7,
      roughness: 0.25,
      metalness: 0.2,
    });

    const matSlate = new THREE.MeshStandardMaterial({
      color: isDarkRef.current ? 0x1e293b : 0x334155,
      roughness: 0.4,
      metalness: 0.5,
    });

    const matMint = new THREE.MeshStandardMaterial({
      color: 0xbbf7d0,
      emissive: 0x4ade80,
      emissiveIntensity: 0.35,
      roughness: 0.2,
    });

    // 4. Kinetic Wireframe Floor Grid (Option B)
    const gridHelper = new THREE.GridHelper(
      32,
      32,
      isDarkRef.current ? 0x38bdf8 : 0x0284c7,
      isDarkRef.current ? 0x1e293b : 0xe2e8f0
    );
    gridHelper.position.y = -2.2;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = isDarkRef.current ? 0.35 : 0.45;
    scene.add(gridHelper);

    // 5. The Cyber-Desk Group (Option C + A)
    const deskGroup = new THREE.Group();
    scene.add(deskGroup);

    // A. Main Floating Desk Slab
    const deskGeo = new THREE.BoxGeometry(6.2, 0.22, 3.6);
    const deskMesh = new THREE.Mesh(deskGeo, glassMaterial);
    deskMesh.position.y = 0;
    deskGroup.add(deskMesh);

    // Desk Glowing Edge Trim
    const deskEdgeGeo = new THREE.BoxGeometry(6.28, 0.05, 3.68);
    const deskEdgeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
    });
    const deskEdge = new THREE.Mesh(deskEdgeGeo, deskEdgeMat);
    deskEdge.position.y = -0.09;
    deskGroup.add(deskEdge);

    // Desk Mat
    const matGeo = new THREE.BoxGeometry(4.2, 0.03, 2.4);
    const deskMat = new THREE.Mesh(matGeo, matSlate);
    deskMat.position.set(0, 0.12, 0.15);
    deskGroup.add(deskMat);

    // B. 3D Laptop
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(0.1, 0.15, 0.1);
    deskGroup.add(laptopGroup);

    // Laptop Base
    const lapBaseGeo = new THREE.BoxGeometry(2.0, 0.06, 1.4);
    const lapBaseMat = new THREE.MeshStandardMaterial({
      color: isDarkRef.current ? 0x0f172a : 0xe2e8f0,
      metalness: 0.8,
      roughness: 0.3,
    });
    const lapBase = new THREE.Mesh(lapBaseGeo, lapBaseMat);
    laptopGroup.add(lapBase);

    // Keyboard & Trackpad Insets
    const kbGeo = new THREE.BoxGeometry(1.7, 0.015, 0.75);
    const kbMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
    const kb = new THREE.Mesh(kbGeo, kbMat);
    kb.position.set(0, 0.035, -0.2);
    laptopGroup.add(kb);

    const padGeo = new THREE.BoxGeometry(0.65, 0.012, 0.4);
    const pad = new THREE.Mesh(padGeo, kbMat);
    pad.position.set(0, 0.034, 0.38);
    laptopGroup.add(pad);

    // Laptop Screen (Hinged at back)
    const screenPivot = new THREE.Group();
    screenPivot.position.set(0, 0.03, -0.7);
    laptopGroup.add(screenPivot);

    const lapScreenGeo = new THREE.BoxGeometry(2.0, 1.35, 0.04);
    const lapScreenBack = new THREE.Mesh(lapScreenGeo, lapBaseMat);
    lapScreenBack.position.set(0, 0.67, 0);
    screenPivot.add(lapScreenBack);

    // Glowing Animated Display Texture
    const displayCanvas = document.createElement('canvas');
    displayCanvas.width = 512;
    displayCanvas.height = 345;
    const ctx = displayCanvas.getContext('2d');
    const displayTexture = new THREE.CanvasTexture(displayCanvas);

    const screenDisplayGeo = new THREE.PlaneGeometry(1.9, 1.25);
    const screenDisplayMat = new THREE.MeshBasicMaterial({
      map: displayTexture,
    });
    const screenDisplay = new THREE.Mesh(screenDisplayGeo, screenDisplayMat);
    screenDisplay.position.set(0, 0.67, 0.025);
    screenPivot.add(screenDisplay);

    // Angle the screen open
    screenPivot.rotation.x = THREE.MathUtils.degToRad(15);

    // C. Floating Holographic Core & Orbit Rings
    const coreGroup = new THREE.Group();
    coreGroup.position.set(-2.1, 0.9, -0.4);
    deskGroup.add(coreGroup);

    // Central Floating Crystal (Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(0.36, 0);
    const coreMesh = new THREE.Mesh(coreGeo, matYellowEmissive);
    coreGroup.add(coreMesh);

    // Kinetic Wireframe Orbit Rings (Option B)
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const ringGeo1 = new THREE.TorusGeometry(0.65, 0.015, 8, 36);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    coreGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const ringGeo2 = new THREE.TorusGeometry(0.85, 0.012, 8, 36);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 2.5;
    coreGroup.add(ring2);

    // Pedestal Base
    const pedGeo = new THREE.CylinderGeometry(0.35, 0.45, 0.15, 24);
    const ped = new THREE.Mesh(pedGeo, matSlate);
    ped.position.set(-2.1, 0.1, -0.4);
    deskGroup.add(ped);

    // D. Cyber Mug / Energy Container
    const mugGroup = new THREE.Group();
    mugGroup.position.set(2.0, 0.15, 0.6);
    deskGroup.add(mugGroup);

    const mugGeo = new THREE.CylinderGeometry(0.24, 0.2, 0.55, 24);
    const mug = new THREE.Mesh(mugGeo, glassMaterial);
    mug.position.y = 0.27;
    mugGroup.add(mug);

    const mugRimGeo = new THREE.TorusGeometry(0.24, 0.02, 12, 24);
    const mugRim = new THREE.Mesh(mugRimGeo, matMint);
    mugRim.rotation.x = Math.PI / 2;
    mugRim.position.y = 0.55;
    mugGroup.add(mugRim);

    // E. Floating Liquid Bubbles & Ambient Particles (Option A)
    const bubbles = [];
    const bubbleGeo = new THREE.SphereGeometry(1, 24, 24);
    const bubbleColors = [0xbae6fd, 0xfef08a, 0xbbf7d0, 0xe9d5ff, 0xfbcfe8];

    for (let i = 0; i < 14; i++) {
      const bMat = new THREE.MeshPhysicalMaterial({
        color: bubbleColors[i % bubbleColors.length],
        transmission: 0.75,
        opacity: 0.7,
        transparent: true,
        roughness: 0.1,
        clearcoat: 0.9,
      });
      const bMesh = new THREE.Mesh(bubbleGeo, bMat);
      const scale = 0.12 + Math.random() * 0.24;
      bMesh.scale.set(scale, scale, scale);

      bMesh.position.set(
        (Math.random() - 0.5) * 8.5,
        0.5 + Math.random() * 3.5,
        (Math.random() - 0.5) * 5.0
      );

      bMesh.userData = {
        originY: bMesh.position.y,
        speed: 0.8 + Math.random() * 1.5,
        amplitude: 0.15 + Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2,
      };

      scene.add(bMesh);
      bubbles.push(bMesh);
    }

    // F. 3D Holographic Project Fan-Out Plates (Option B + C)
    const projectPlatesGroup = new THREE.Group();
    projectPlatesGroup.position.set(0.1, 1.6, -0.6);
    projectPlatesGroup.scale.set(0.01, 0.01, 0.01); // Hidden initially, reveals on scroll
    deskGroup.add(projectPlatesGroup);

    const plateGeo = new THREE.PlaneGeometry(0.9, 0.6);
    const plateMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide,
    });

    const plateCount = 5;
    const plates = [];
    for (let i = 0; i < plateCount; i++) {
      const p = new THREE.Mesh(plateGeo, plateMat);
      const angle = (i - 2) * 0.35;
      p.position.set(Math.sin(angle) * 1.8, Math.cos(angle) * 0.4, -Math.cos(angle) * 0.7);
      p.rotation.y = -angle;
      projectPlatesGroup.add(p);
      plates.push(p);
    }

    // G. 3D Confetti Particles System
    const confettiCount = 60;
    const confettiGeo = new THREE.BoxGeometry(0.08, 0.08, 0.01);
    const confettiMeshes = [];
    const confettiColors = [0xef4444, 0x3b82f6, 0xfde047, 0x10b981, 0xa855f7];

    for (let i = 0; i < confettiCount; i++) {
      const cMat = new THREE.MeshBasicMaterial({
        color: confettiColors[i % confettiColors.length],
        side: THREE.DoubleSide,
      });
      const cMesh = new THREE.Mesh(confettiGeo, cMat);
      cMesh.visible = false;
      cMesh.userData = {
        vy: 0,
        vx: 0,
        vz: 0,
        vrotX: 0,
        vrotY: 0,
      };
      scene.add(cMesh);
      confettiMeshes.push(cMesh);
    }

    const trigger3DConfettiBurst = () => {
      confettiMeshes.forEach((c) => {
        c.visible = true;
        c.position.set(
          (Math.random() - 0.5) * 4,
          4.5 + Math.random() * 1.5,
          (Math.random() - 0.5) * 3
        );
        c.userData.vy = -(0.03 + Math.random() * 0.04);
        c.userData.vx = (Math.random() - 0.5) * 0.03;
        c.userData.vz = (Math.random() - 0.5) * 0.03;
        c.userData.vrotX = Math.random() * 0.15;
        c.userData.vrotY = Math.random() * 0.15;
      });
    };

    // 6. Interaction & Damped Inertial Tracking
    let targetCameraPos = new THREE.Vector3(3.0, 4.0, 7.8);
    let targetCameraLookAt = new THREE.Vector3(0.1, 0.4, 0);
    const currentCameraLookAt = new THREE.Vector3(0.1, 0.4, 0);

    let targetMouseX = 0;
    let targetMouseY = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;

    let targetScrollFraction = 0;
    let smoothScrollFraction = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const updateScrollTarget = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      targetScrollFraction = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };
    window.addEventListener('scroll', updateScrollTarget, { passive: true });
    updateScrollTarget();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      updateScrollTarget();
    };
    window.addEventListener('resize', handleResize);

    // Continuous Waypoints for 100% Seamless Scroll Progression
    const waypoints = [
      {
        stop: 0.0,
        pos: new THREE.Vector3(3.0, 3.8, 7.6),
        lookAt: new THREE.Vector3(0.1, 0.4, 0),
        plateScale: 0.01,
      },
      {
        stop: 0.25,
        pos: new THREE.Vector3(-1.9, 2.2, 5.0),
        lookAt: new THREE.Vector3(-1.9, 0.9, -0.4),
        plateScale: 0.01,
      },
      {
        stop: 0.52,
        pos: new THREE.Vector3(0.0, 4.0, 6.2),
        lookAt: new THREE.Vector3(0.0, 1.2, 0),
        plateScale: 1.0,
      },
      {
        stop: 0.76,
        pos: new THREE.Vector3(0.0, 3.1, 5.2),
        lookAt: new THREE.Vector3(0.0, 0.3, 0),
        plateScale: 0.01,
      },
      {
        stop: 1.0,
        pos: new THREE.Vector3(2.4, 3.4, 6.8),
        lookAt: new THREE.Vector3(0.0, 0.2, 0),
        plateScale: 0.01,
      },
    ];

    const getInterpolatedWaypoint = (t) => {
      const clampedT = Math.min(1, Math.max(0, t));
      let idx = 0;
      for (let i = 0; i < waypoints.length - 1; i++) {
        if (clampedT >= waypoints[i].stop && clampedT <= waypoints[i + 1].stop) {
          idx = i;
          break;
        }
      }
      const w1 = waypoints[idx];
      const w2 = waypoints[idx + 1];
      const segmentProgress = (clampedT - w1.stop) / (w2.stop - w1.stop);
      // S-curve smoothstep easing: zero acceleration at junctions
      const eased = segmentProgress * segmentProgress * (3 - 2 * segmentProgress);

      const pos = new THREE.Vector3().lerpVectors(w1.pos, w2.pos, eased);
      const lookAt = new THREE.Vector3().lerpVectors(w1.lookAt, w2.lookAt, eased);
      const plateScale = THREE.MathUtils.lerp(w1.plateScale, w2.plateScale, eased);

      return { pos, lookAt, plateScale };
    };

    // 7. Animation & Render Loop
    let clock = new THREE.Clock();
    let animId;
    let codeScrollOffset = 0;
    let lastConfettiTriggerState = false;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // A. Smooth Inertial Damping for Scroll and Mouse
      smoothScrollFraction += (targetScrollFraction - smoothScrollFraction) * 0.06;
      smoothMouseX += (targetMouseX - smoothMouseX) * 0.045;
      smoothMouseY += (targetMouseY - smoothMouseY) * 0.045;

      // Sample Continuous Waypoints
      const { pos: basePos, lookAt: baseLookAt, plateScale } = getInterpolatedWaypoint(smoothScrollFraction);

      // Add gentle mouse parallax offset
      targetCameraPos.copy(basePos);
      targetCameraPos.x += smoothMouseX * 0.35;
      targetCameraPos.y += smoothMouseY * 0.22;

      targetCameraLookAt.copy(baseLookAt);

      // Buttery smooth camera motion
      camera.position.lerp(targetCameraPos, 0.065);
      currentCameraLookAt.lerp(targetCameraLookAt, 0.065);
      camera.lookAt(currentCameraLookAt);

      // Holographic Plates Smooth Scaling
      projectPlatesGroup.scale.lerp(
        new THREE.Vector3(plateScale, plateScale, plateScale),
        0.06
      );

      // B. Desk Subtle Floating & Parallax Tilt
      deskGroup.position.y = Math.sin(elapsed * 1.2) * 0.06;
      deskGroup.rotation.y = THREE.MathUtils.lerp(
        deskGroup.rotation.y,
        smoothMouseX * 0.15,
        0.05
      );
      deskGroup.rotation.x = THREE.MathUtils.lerp(
        deskGroup.rotation.x,
        -smoothMouseY * 0.10,
        0.05
      );

      // C. Holographic Core Spin
      coreMesh.rotation.y = elapsed * 0.9;
      coreMesh.rotation.x = elapsed * 0.5;
      ring1.rotation.z = elapsed * 1.5;
      ring1.rotation.x = elapsed * 0.8;
      ring2.rotation.y = -elapsed * 1.2;
      ring2.rotation.z = elapsed * 0.6;

      // D. Floating Liquid Bubbles (Option A)
      bubbles.forEach((b) => {
        const { originY, speed, amplitude, phase } = b.userData;
        b.position.y = originY + Math.sin(elapsed * speed + phase) * amplitude;
        b.rotation.y += 0.01;
      });

      // E. Update Animated Laptop Screen Canvas Texture
      if (ctx) {
        codeScrollOffset += 1.5;
        if (codeScrollOffset > 300) codeScrollOffset = 0;

        ctx.fillStyle = isDarkRef.current ? '#0F172A' : '#1E293B';
        ctx.fillRect(0, 0, 512, 345);

        // Terminal Top Bar
        ctx.fillStyle = isDarkRef.current ? '#1E293B' : '#334155';
        ctx.fillRect(0, 0, 512, 38);
        ctx.fillStyle = '#EF4444';
        ctx.beginPath();
        ctx.arc(24, 19, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#F59E0B';
        ctx.beginPath();
        ctx.arc(44, 19, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#10B981';
        ctx.beginPath();
        ctx.arc(64, 19, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#94A3B8';
        ctx.font = '13px monospace';
        ctx.fillText('terminal@fatir-portfolio: ~/lab', 90, 24);

        // Animated Code Lines
        const lines = [
          'const developer = "Fatir Gibran";',
          'import { SpatialStage } from "@three/cyber-desk";',
          'await system.bootQuantumHologram();',
          'status: 100% Operational | 60+ FPS',
          'console.log("Welcome to interactive portfolio!");',
          'running: [AI Models, Fullstack, 3D Canvas]',
          'gestureCommand: ACTIVE | laserEngine: READY',
        ];

        ctx.font = '15px monospace';
        lines.forEach((line, index) => {
          const y = 80 + index * 34 - (codeScrollOffset % 34);
          if (y > 45 && y < 330) {
            ctx.fillStyle =
              index % 2 === 0 ? '#38BDF8' : index % 3 === 0 ? '#FDE047' : '#BBF7D0';
            ctx.fillText(`> ${line}`, 24, y);
          }
        });

        displayTexture.needsUpdate = true;
      }

      // F. React to Interactive Laser Pointer from Sandbox
      if (isLaserActiveRef.current) {
        // Convert screen laser pos to approximate 3D world pos near desk
        const lx = (laserPosRef.current.x / window.innerWidth) * 2 - 1;
        const ly = -(laserPosRef.current.y / window.innerHeight) * 2 + 1;
        laser3DLight.position.set(lx * 4, ly * 3, 2.5);
        laser3DLight.intensity = 4.0;
      } else {
        laser3DLight.intensity = 0;
      }

      // G. React to Confetti Burst from Sandbox
      if (isConfettiActiveRef.current && !lastConfettiTriggerState) {
        trigger3DConfettiBurst();
      }
      lastConfettiTriggerState = isConfettiActiveRef.current;

      // Animate 3D confetti particles
      if (isConfettiActiveRef.current) {
        confettiMeshes.forEach((c) => {
          if (!c.visible) return;
          c.position.y += c.userData.vy;
          c.position.x += c.userData.vx;
          c.position.z += c.userData.vz;
          c.rotation.x += c.userData.vrotX;
          c.rotation.y += c.userData.vrotY;

          // Bounce or reset when landing on desk
          if (c.position.y < -1.8) {
            c.position.y = 4.5;
          }
        });
      }

      // H. Dynamic Theme Adaptation
      const currentDark = isDarkRef.current;
      scene.fog.color.lerp(currentDark ? fogColorDark : fogColorLight, 0.05);
      ambientLight.color.lerp(
        new THREE.Color(currentDark ? 0x1e293b : 0xf8fafc),
        0.05
      );
      ambientLight.intensity = THREE.MathUtils.lerp(
        ambientLight.intensity,
        currentDark ? 1.4 : 2.0,
        0.05
      );

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup on Component Unmount
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', updateScrollTarget);
      window.removeEventListener('resize', handleResize);

      // Dispose Geometries and Materials
      scene.traverse((obj) => {
        if (obj.isMesh) {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => m.dispose());
            } else {
              obj.material.dispose();
            }
          }
        }
      });

      displayTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.95 }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
