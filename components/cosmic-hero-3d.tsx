'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface CosmicHero3DProps {
  activeProduct?: 'ishop' | 'court' | 'aavanam'
  onSelectProduct?: (prod: 'ishop' | 'court' | 'aavanam') => void
}

export function CosmicHero3D({ activeProduct = 'ishop', onSelectProduct }: CosmicHero3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredObject, setHoveredObject] = useState<string | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    // 1. SCENE SETUP
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x050508, 0.04)

    const width = container.clientWidth || 600
    const height = container.clientHeight || 520

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100)
    camera.position.set(0, 0.9, 4.8)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.25

    // 2. LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45)
    scene.add(ambientLight)

    // Key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2)
    keyLight.position.set(3, 6, 4)
    scene.add(keyLight)

    // Crimson neon underglow point light
    const neonLight = new THREE.PointLight(0xff2442, 5.5, 4.5, 1.5)
    neonLight.position.set(0, -0.35, 0.4)
    scene.add(neonLight)

    // Blue atmospheric rim light
    const rimLight = new THREE.PointLight(0x38bdf8, 3.0, 6.0)
    rimLight.position.set(-2, 2.5, -2)
    scene.add(rimLight)

    // 3. TEXTURE LOADER
    const textureLoader = new THREE.TextureLoader()

    const laptopTexture = textureLoader.load(
      '/3d-assets/textures/laptop-dashboard-screen.png',
      () => setIsLoaded(true),
      undefined,
      () => setIsLoaded(true)
    )
    const phoneTexture = textureLoader.load('/3d-assets/textures/phone-dashboard-screen.png')
    const tabletTexture = textureLoader.load('/3d-assets/textures/tablet-branding-screen.png')
    const rockTexture = textureLoader.load('/3d-assets/textures/volcanic-rock-pedestal.png')

    // 4. EARTH GLOBE WITH NETWORK NODES
    const globeGroup = new THREE.Group()
    globeGroup.position.set(0.6, 1.6, -3.2)
    scene.add(globeGroup)

    // Earth Sphere
    const earthGeo = new THREE.SphereGeometry(2.4, 48, 32)
    const earthMat = new THREE.MeshStandardMaterial({
      color: 0x0f1d38,
      emissive: 0x071124,
      emissiveIntensity: 0.6,
      roughness: 0.65,
      metalness: 0.2,
      wireframe: false,
    })
    const earthMesh = new THREE.Mesh(earthGeo, earthMat)
    globeGroup.add(earthMesh)

    // Atmosphere Haze Shell
    const atmoGeo = new THREE.SphereGeometry(2.48, 32, 24)
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
      side: THREE.BackSide,
    })
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat)
    globeGroup.add(atmoMesh)

    // Orbital Red Network Spline Arcs
    const arcsGroup = new THREE.Group()
    globeGroup.add(arcsGroup)

    const createArc = (radius: number, tiltX: number, tiltY: number, tiltZ: number) => {
      const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2, false, 0)
      const points = curve.getPoints(64)
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points.map((p) => new THREE.Vector3(p.x, p.y, 0)))
      const arcMat = new THREE.LineBasicMaterial({
        color: 0xff334b,
        transparent: true,
        opacity: 0.55,
      })
      const arcMesh = new THREE.Line(arcGeo, arcMat)
      arcMesh.rotation.set(tiltX, tiltY, tiltZ)
      return arcMesh
    }

    arcsGroup.add(createArc(2.55, 0.4, 0.6, 0.2))
    arcsGroup.add(createArc(2.62, -0.7, 0.3, 0.8))
    arcsGroup.add(createArc(2.48, 1.1, -0.4, 0.5))

    // Network Node Hubs (Glowing Vertices)
    const nodesGeo = new THREE.BufferGeometry()
    const nodePositions: number[] = []
    for (let i = 0; i < 28; i++) {
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = 2.42
      const sinPhi = Math.sin(phi)
      nodePositions.push(r * sinPhi * Math.cos(theta), r * sinPhi * Math.sin(theta), r * Math.cos(phi))
    }
    nodesGeo.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3))
    const nodesMat = new THREE.PointsMaterial({
      color: 0xff3d56,
      size: 0.14,
      transparent: true,
      opacity: 0.9,
    })
    const nodesMesh = new THREE.Points(nodesGeo, nodesMat)
    globeGroup.add(nodesMesh)

    // 5. VOLCANIC BASALT ROCK PEDESTAL
    const pedestalGroup = new THREE.Group()
    pedestalGroup.position.set(0, -0.85, 0)
    scene.add(pedestalGroup)

    const rockGeo = new THREE.CylinderGeometry(2.3, 2.6, 0.7, 18, 2)
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x111318,
      roughness: 0.92,
      metalness: 0.15,
      map: rockTexture,
    })
    const rockMesh = new THREE.Mesh(rockGeo, rockMat)
    pedestalGroup.add(rockMesh)

    // Luminous Neon Glow Ring beneath devices
    const glowRingGeo = new THREE.TorusGeometry(1.65, 0.03, 16, 48)
    const glowRingMat = new THREE.MeshBasicMaterial({
      color: 0xff2442,
    })
    const glowRingMesh = new THREE.Mesh(glowRingGeo, glowRingMat)
    glowRingMesh.rotation.x = Math.PI / 2
    glowRingMesh.position.y = 0.36
    pedestalGroup.add(glowRingMesh)

    // 6. HARDWARE DEVICES
    const hardwareGroup = new THREE.Group()
    hardwareGroup.position.set(0, -0.45, 0.2)
    scene.add(hardwareGroup)

    // A. LAPTOP WORKSTATION
    const laptopGroup = new THREE.Group()
    laptopGroup.position.set(-0.55, 0, 0.1)
    laptopGroup.rotation.set(0.04, 0.32, -0.01)
    hardwareGroup.add(laptopGroup)

    // Base Chassis
    const baseGeo = new THREE.BoxGeometry(1.7, 0.06, 1.2)
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x1c1e24,
      metalness: 0.88,
      roughness: 0.28,
    })
    const baseMesh = new THREE.Mesh(baseGeo, darkMetalMat)
    baseMesh.position.set(0, 0.03, 0)
    laptopGroup.add(baseMesh)

    // Laptop Display Lid (angled at ~112°)
    const lidGroup = new THREE.Group()
    lidGroup.position.set(0, 0.06, -0.58) // Hinge pivot point!
    lidGroup.rotation.x = -0.38 // 112 degrees viewing angle
    laptopGroup.add(lidGroup)

    const lidBackGeo = new THREE.BoxGeometry(1.7, 1.15, 0.04)
    const lidBackMesh = new THREE.Mesh(lidBackGeo, darkMetalMat)
    lidBackMesh.position.set(0, 0.58, 0)
    lidGroup.add(lidBackMesh)

    // Screen Display Plane (Emissive dashboard)
    const screenGeo = new THREE.PlaneGeometry(1.62, 1.07)
    const screenMat = new THREE.MeshBasicMaterial({
      map: laptopTexture,
    })
    const screenMesh = new THREE.Mesh(screenGeo, screenMat)
    screenMesh.position.set(0, 0.58, 0.022)
    lidGroup.add(screenMesh)

    // B. SMARTPHONE DEVICE
    const phoneGroup = new THREE.Group()
    phoneGroup.position.set(0.55, 0.02, 0.5)
    phoneGroup.rotation.set(-0.06, -0.22, 0.03)
    hardwareGroup.add(phoneGroup)

    const phoneBodyGeo = new THREE.BoxGeometry(0.44, 0.88, 0.04)
    const phoneBodyMesh = new THREE.Mesh(phoneBodyGeo, darkMetalMat)
    phoneBodyMesh.position.set(0, 0.44, 0)
    phoneGroup.add(phoneBodyMesh)

    const phoneScreenGeo = new THREE.PlaneGeometry(0.41, 0.84)
    const phoneScreenMat = new THREE.MeshBasicMaterial({
      map: phoneTexture,
    })
    const phoneScreenMesh = new THREE.Mesh(phoneScreenGeo, phoneScreenMat)
    phoneScreenMesh.position.set(0, 0.44, 0.022)
    phoneGroup.add(phoneScreenMesh)

    // C. TABLET DEVICE
    const tabletGroup = new THREE.Group()
    tabletGroup.position.set(1.3, 0.08, 0.05)
    tabletGroup.rotation.set(0.04, -0.38, 0.02)
    hardwareGroup.add(tabletGroup)

    const tabletBodyGeo = new THREE.BoxGeometry(1.05, 1.48, 0.04)
    const tabletBodyMesh = new THREE.Mesh(tabletBodyGeo, darkMetalMat)
    tabletBodyMesh.position.set(0, 0.74, 0)
    tabletGroup.add(tabletBodyMesh)

    const tabletScreenGeo = new THREE.PlaneGeometry(1.0, 1.42)
    const tabletScreenMat = new THREE.MeshBasicMaterial({
      map: tabletTexture,
    })
    const tabletScreenMesh = new THREE.Mesh(tabletScreenGeo, tabletScreenMat)
    tabletScreenMesh.position.set(0, 0.74, 0.022)
    tabletGroup.add(tabletScreenMesh)

    // 7. BACKGROUND STARFIELD PARTICLES
    const starsGeo = new THREE.BufferGeometry()
    const starCount = 350
    const starCoords: number[] = []
    for (let i = 0; i < starCount; i++) {
      starCoords.push(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 25 + 2,
        (Math.random() - 0.5) * 20 - 8
      )
    }
    starsGeo.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3))
    const starsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.06,
      transparent: true,
      opacity: 0.75,
    })
    const starField = new THREE.Points(starsGeo, starsMat)
    scene.add(starField)

    // 8. MOUSE PARALLAX & HOVER INTERACTION
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    }

    container.addEventListener('mousemove', handleMouseMove)

    // Raycaster for object interaction
    const raycaster = new THREE.Raycaster()
    const mouseVector = new THREE.Vector2()

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseVector.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseVector.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)

      raycaster.setFromCamera(mouseVector, camera)
      const intersects = raycaster.intersectObjects([laptopGroup, phoneGroup, tabletGroup], true)

      if (intersects.length > 0) {
        const hit = intersects[0].object
        if (hit === screenMesh || hit.parent === laptopGroup) {
          onSelectProduct?.('ishop')
        } else if (hit === phoneScreenMesh || hit.parent === phoneGroup) {
          onSelectProduct?.('court')
        } else if (hit === tabletScreenMesh || hit.parent === tabletGroup) {
          onSelectProduct?.('aavanam')
        }
      }
    }

    container.addEventListener('click', handleClick)

    // Window Resize Handler
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    // 9. ANIMATION TICK LOOP
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      const delta = clock.getDelta()
      const elapsed = clock.getElapsedTime()

      // Smooth camera parallax
      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05

      camera.position.x = targetX * 0.35
      camera.position.y = 0.9 + targetY * 0.25
      camera.lookAt(0.1, 0.2, 0)

      // Earth rotation
      globeGroup.rotation.y += delta * 0.08
      arcsGroup.rotation.y += delta * 0.04

      // Neon pulse breathing
      const pulse = Math.sin(elapsed * 2.5) * 0.5 + 1.0
      neonLight.intensity = 4.5 + pulse * 1.5

      // Smartphone subtle floating bobbing
      phoneGroup.position.y = 0.02 + Math.sin(elapsed * 2.0) * 0.015

      // Laptop subtle breathing hover tilt
      laptopGroup.rotation.y = 0.32 + Math.sin(elapsed * 1.2) * 0.012

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('click', handleClick)
      renderer.dispose()
    }
  }, [onSelectProduct])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: '20px',
        cursor: 'grab',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          position: 'absolute',
          inset: 0,
        }}
      />

      {/* 3D WebGL Status Badge */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(5, 5, 8, 0.75)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '999px',
          padding: '4px 12px',
          fontSize: '11px',
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#ff2442',
            boxShadow: '0 0 8px #ff2442',
          }}
        />
        <span>Interactive 3D WebGL Scene</span>
      </div>
    </div>
  )
}
