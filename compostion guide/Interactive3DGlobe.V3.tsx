'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { GLOBE_NODES, GLOBE_LINKS, latLngToVector3, makeArcCurve } from '@/lib/geo'

interface Interactive3DGlobeProps {
  className?: string
  onNodeHover?: (name: string | null) => void
}

/**
 * Creates a clean, soft radial glow texture for network node pins
 */
function createNodePinTexture(colorHex = '#ff283c') {
  if (typeof document === 'undefined') return null
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  const cx = 64, cy = 64

  const radGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 64)
  radGrad.addColorStop(0, '#ffffff')
  radGrad.addColorStop(0.2, colorHex)
  radGrad.addColorStop(0.5, colorHex + '55')
  radGrad.addColorStop(0.85, colorHex + '11')
  radGrad.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = radGrad
  ctx.fillRect(0, 0, 128, 128)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export function Interactive3DGlobe({ className = '', onNodeHover }: Interactive3DGlobeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [activeCity, setActiveCity] = useState<string>('Colombo (HQ)')
  const [isInteracting, setIsInteracting] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    // 1. Scene & Camera Setup (Brought closer for high-fidelity zoom & prominent hardware)
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x010611)
    scene.fog = new THREE.Fog(0x010611, 12, 26)

    const width = container.clientWidth || 760
    const height = container.clientHeight || 580

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100)
    const cameraTarget = new THREE.Vector3(0.16, -0.08, 0.72)
    camera.position.set(0.20, 0.78, 7.65)
    camera.lookAt(cameraTarget)

    // 2. High-Performance WebGL Renderer (True Native Retina Resolution with Hardware MSAA)
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2.5)
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    })
    renderer.setSize(width, height, false)
    renderer.setPixelRatio(pixelRatio)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    const maxAniso = renderer.capabilities.getMaxAnisotropy()

    // 3. Studio & Cosmic Lighting
    const ambientLight = new THREE.AmbientLight(0xd4eaff, 0.42)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.25)
    keyLight.position.set(-4.2, 5.6, 5.8)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.set(2048, 2048)
    keyLight.shadow.camera.near = 0.5
    keyLight.shadow.camera.far = 18
    keyLight.shadow.camera.left = -6
    keyLight.shadow.camera.right = 6
    keyLight.shadow.camera.top = 6
    keyLight.shadow.camera.bottom = -6
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight(0xff2238, 2.45)
    rimLight.position.set(6, 2, 4)
    scene.add(rimLight)

    const frontFill = new THREE.DirectionalLight(0x8fc7ff, 1.15)
    frontFill.position.set(0, 2, 7)
    scene.add(frontFill)

    // Product-photography edge lights: reveal chassis thickness without flooding the scene
    const deviceLeftEdge = new THREE.PointLight(0xb9dcff, 2.2, 7.5, 2.0)
    deviceLeftEdge.position.set(-3.0, 1.7, 4.3)
    scene.add(deviceLeftEdge)

    const deviceRightEdge = new THREE.PointLight(0xff3550, 1.8, 6.5, 2.0)
    deviceRightEdge.position.set(3.1, 1.2, 3.6)
    scene.add(deviceRightEdge)

    // 4. Starfield Background
    const starCount = 1800
    const starGeo = new THREE.BufferGeometry()
    const starPositions = new Float32Array(starCount * 3)
    const starColors = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3
      const radius = 28 + Math.random() * 24
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      starPositions[idx] = radius * Math.sin(phi) * Math.cos(theta)
      starPositions[idx + 1] = radius * Math.sin(phi) * Math.sin(theta)
      starPositions[idx + 2] = radius * Math.cos(phi)

      const isCrimson = Math.random() > 0.88
      if (isCrimson) {
        starColors[idx] = 1.0; starColors[idx + 1] = 0.2; starColors[idx + 2] = 0.3
      } else {
        const bright = 0.75 + Math.random() * 0.25
        starColors[idx] = bright * 0.85; starColors[idx + 1] = bright * 0.95; starColors[idx + 2] = bright
      }
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3))
    const starMat = new THREE.PointsMaterial({
      size: 0.15, vertexColors: true, transparent: true,
      opacity: 0.75, blending: THREE.AdditiveBlending,
    })
    const starField = new THREE.Points(starGeo, starMat)
    scene.add(starField)

    // 5. 3D NOCTURNAL ROTATING EARTH GLOBE (Commanding, High-Fidelity Celestial Staging)
    const globeAnchor = new THREE.Group()
    globeAnchor.position.set(0.36, 0.63, -1.85)
    scene.add(globeAnchor)

    const globeGroup = new THREE.Group()
    globeGroup.rotation.set(0.12, -0.65, 0)
    globeAnchor.add(globeGroup)

    const earthRadius = 2.65
    const earthGeo = new THREE.SphereGeometry(earthRadius, 64, 64)

    const textureLoader = new THREE.TextureLoader()

    const earthMat = new THREE.MeshStandardMaterial({
      color: 0x070e1b,
      roughness: 0.55,
      metalness: 0.25,
    })

    const earthMesh = new THREE.Mesh(earthGeo, earthMat)
    globeGroup.add(earthMesh)

    // Atmospheric rim glow shell
    const atmoGeo = new THREE.SphereGeometry(earthRadius * 1.025, 48, 48)
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.17,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    })
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat)
    globeGroup.add(atmoMesh)

    // Load nocturnal earth texture with country night lights
    textureLoader.load(
      '/assets/earth-night.jpg',
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        tex.anisotropy = maxAniso
        tex.generateMipmaps = true
        tex.minFilter = THREE.LinearMipmapLinearFilter
        tex.magFilter = THREE.LinearFilter
        earthMat.map = tex
        earthMat.emissiveMap = tex
        earthMat.emissive = new THREE.Color(0xffeedd)
        earthMat.emissiveIntensity = 0.34
        earthMat.needsUpdate = true
        setIsReady(true)
      },
      undefined,
      () => {
        setIsReady(true)
      }
    )

    // 5.5 SCULPTED 3D ARCHITECTURAL JJSOFT LOGO (True 3D Geometry in Deep Space)
    const extrudeSettings = {
      depth: 0.22,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.025,
      bevelThickness: 0.025,
    }

    const whiteMetalMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      metalness: 0.90,
      roughness: 0.16,
      emissive: 0x1e293b,
      emissiveIntensity: 0.35,
    })

    /*
    // =========================================================================
    // [PRESERVED: 3D "JJSOFT" BACKGROUND TEXT]
    // Uncomment this block and its animation lines to display the 3D text again
    // =========================================================================
    const brandBackdropGroup = new THREE.Group()
    brandBackdropGroup.position.set(0.35, 2.32, -2.5)
    brandBackdropGroup.scale.set(0.72, 0.72, 0.72)
    scene.add(brandBackdropGroup)

    // Dedicated Architectural Studio Lights for 3D JJSOFT Text
    const logoFrontLight = new THREE.PointLight(0xffffff, 4.6, 14, 1.4)
    logoFrontLight.position.set(0.35, 3.8, 1.2)
    scene.add(logoFrontLight)

    const logoRimLight = new THREE.PointLight(0xff1837, 3.8, 10, 1.4)
    logoRimLight.position.set(1.6, 1.5, -1.0)
    scene.add(logoRimLight)

    const logoFillLight = new THREE.PointLight(0x38bdf8, 2.4, 10, 1.6)
    logoFillLight.position.set(-1.8, 3.2, 0.5)
    scene.add(logoFillLight)

    // 3D ARCHITECTURAL TEXT "JJSOFT" (Clean, Modern Cyberpunk Letterforms)
    // 1. Letter 'J'
    const createLetterJShape = (w = 0.86, h = 1.40, t = 0.22, hookH = 0.65) => {
      const s = new THREE.Shape()
      const r = w / 2
      const rIn = r - t
      const cx = r, cy = r
      s.moveTo(w, h)
      s.lineTo(w, cy)
      s.absarc(cx, cy, r, 0, -Math.PI, true)
      s.lineTo(0, hookH)
      s.lineTo(t, hookH)
      s.lineTo(t, cy)
      s.absarc(cx, cy, rIn, -Math.PI, 0, false)
      s.lineTo(w - t, h)
      s.lineTo(w, h)
      return s
    }

    // 2. Letter 'S'
    const createLetterSShape = (w = 0.86, h = 1.40, t = 0.22) => {
      const s = new THREE.Shape()
      s.moveTo(w, h)
      s.lineTo(0, h)
      s.lineTo(0, h * 0.50 - t * 0.5)
      s.lineTo(w - t, h * 0.50 - t * 0.5)
      s.lineTo(w - t, t)
      s.lineTo(0, t)
      s.lineTo(0, 0)
      s.lineTo(w, 0)
      s.lineTo(w, h * 0.50 + t * 0.5)
      s.lineTo(t, h * 0.50 + t * 0.5)
      s.lineTo(t, h - t)
      s.lineTo(w, h - t)
      s.lineTo(w, h)
      return s
    }

    // 3. Letter 'O'
    const createLetterOShape = (w = 1.04, h = 1.40, t = 0.22) => {
      const s = new THREE.Shape()
      const rx = w / 2, ry = h / 2
      const cx = rx, cy = ry
      s.absellipse(cx, cy, rx, ry, 0, Math.PI * 2, false, 0)
      const hole = new THREE.Path()
      hole.absellipse(cx, cy, rx - t, ry - t, 0, Math.PI * 2, true, 0)
      s.holes.push(hole)
      return s
    }

    // 4. Letter 'F'
    const createLetterFShape = (w = 0.82, h = 1.40, t = 0.22) => {
      const s = new THREE.Shape()
      s.moveTo(0, 0)
      s.lineTo(t, 0)
      s.lineTo(t, h * 0.52 - t * 0.5)
      s.lineTo(w * 0.85, h * 0.52 - t * 0.5)
      s.lineTo(w * 0.85, h * 0.52 + t * 0.5)
      s.lineTo(t, h * 0.52 + t * 0.5)
      s.lineTo(t, h - t)
      s.lineTo(w, h - t)
      s.lineTo(w, h)
      s.lineTo(0, h)
      s.lineTo(0, 0)
      return s
    }

    // 5. Letter 'T'
    const createLetterTShape = (w = 0.92, h = 1.40, t = 0.22) => {
      const s = new THREE.Shape()
      const mid = w / 2, halfT = t / 2
      s.moveTo(mid - halfT, 0)
      s.lineTo(mid + halfT, 0)
      s.lineTo(mid + halfT, h - t)
      s.lineTo(w, h - t)
      s.lineTo(w, h)
      s.lineTo(0, h)
      s.lineTo(0, h - t)
      s.lineTo(mid - halfT, h - t)
      s.lineTo(mid - halfT, 0)
      return s
    }

    const jGeo = new THREE.ExtrudeGeometry(createLetterJShape(), extrudeSettings)
    const sGeo = new THREE.ExtrudeGeometry(createLetterSShape(), extrudeSettings)
    const oGeo = new THREE.ExtrudeGeometry(createLetterOShape(), extrudeSettings)
    const fGeo = new THREE.ExtrudeGeometry(createLetterFShape(), extrudeSettings)
    const tGeo = new THREE.ExtrudeGeometry(createLetterTShape(), extrudeSettings)

    // J - 1
    const j1Mesh = new THREE.Mesh(jGeo, whiteMetalMat)
    j1Mesh.position.set(-3.28, 0, 0.12)
    brandBackdropGroup.add(j1Mesh)

    // J - 2
    const j2Mesh = new THREE.Mesh(jGeo, whiteMetalMat)
    j2Mesh.position.set(-2.22, 0, 0.12)
    brandBackdropGroup.add(j2Mesh)

    // S
    const sMesh = new THREE.Mesh(sGeo, whiteMetalMat)
    sMesh.position.set(-1.01, 0, 0.12)
    brandBackdropGroup.add(sMesh)

    // O
    const oMesh = new THREE.Mesh(oGeo, whiteMetalMat)
    oMesh.position.set(0.07, 0, 0.12)
    brandBackdropGroup.add(oMesh)

    // F
    const fMesh = new THREE.Mesh(fGeo, whiteMetalMat)
    fMesh.position.set(1.33, 0, 0.12)
    brandBackdropGroup.add(fMesh)

    // T
    const tMesh = new THREE.Mesh(tGeo, whiteMetalMat)
    tMesh.position.set(2.37, 0, 0.12)
    brandBackdropGroup.add(tMesh)

    // Soft celestial nebula aura behind 3D text
    const auraCanvas = document.createElement('canvas')
    auraCanvas.width = 256
    auraCanvas.height = 128
    const auraCtx = auraCanvas.getContext('2d')
    if (auraCtx) {
      const g = auraCtx.createRadialGradient(128, 64, 10, 128, 64, 128)
      g.addColorStop(0, 'rgba(255, 30, 60, 0.38)')
      g.addColorStop(0.5, 'rgba(0, 160, 255, 0.14)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      auraCtx.fillStyle = g
      auraCtx.fillRect(0, 0, 256, 128)
      const auraTex = new THREE.CanvasTexture(auraCanvas)
      const auraPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(11.5, 4.8),
        new THREE.MeshBasicMaterial({
          map: auraTex,
          transparent: true,
          opacity: 0.65,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      )
      auraPlane.position.set(0, 0.70, -0.25)
      brandBackdropGroup.add(auraPlane)
    }
    */

    // 6. GLOBAL TECH HUBS & NETWORK ARCS
    const nodePinTex = createNodePinTexture('#ff283c')
    const pulseNodes: { coreMesh: THREE.Mesh; sprite?: THREE.Sprite; light: THREE.PointLight; nodeScale: number; phase: number }[] = []

    GLOBE_NODES.forEach((node, i) => {
      const pos = latLngToVector3(node.lat, node.lng, earthRadius * 1.008)
      const isHQ = node.name.includes('HQ') || i === 0

      const nodeGroup = new THREE.Group()
      nodeGroup.position.copy(pos)
      globeGroup.add(nodeGroup)

      const coreGeo = new THREE.SphereGeometry(isHQ ? 0.055 : 0.035, 16, 16)
      const coreMat = new THREE.MeshBasicMaterial({
        color: isHQ ? 0xffffff : (i % 2 === 0 ? 0xff4055 : 0x38bdf8),
        toneMapped: false,
      })
      const coreMesh = new THREE.Mesh(coreGeo, coreMat)
      nodeGroup.add(coreMesh)

      let sprite: THREE.Sprite | undefined
      if (nodePinTex) {
        const spriteMat = new THREE.SpriteMaterial({
          map: nodePinTex,
          color: isHQ ? 0xff253a : (i % 2 === 0 ? 0xff3b4e : 0x00d4ff),
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
        sprite = new THREE.Sprite(spriteMat)
        const scale = isHQ ? 0.45 : 0.30
        sprite.scale.set(scale, scale, 1)
        nodeGroup.add(sprite)
      }

      const lightColor = isHQ ? 0xff2535 : 0x00d4ff
      const nodeLight = new THREE.PointLight(lightColor, isHQ ? 2.2 : 1.2, 2.5, 2.0)
      nodeGroup.add(nodeLight)

      pulseNodes.push({ coreMesh, sprite, light: nodeLight, nodeScale: node.s, phase: i * 0.77 })
    })

    // Network Arcs & Streaming Data Packets
    const arcCurves: THREE.QuadraticBezierCurve3[] = []
    const packetMeshes: { mesh: THREE.Mesh; curveIndex: number; progress: number; speed: number }[] = []

    GLOBE_LINKS.forEach(([fromIdx, toIdx, linkColor], idx) => {
      const fromNode = GLOBE_NODES[fromIdx]
      const toNode = GLOBE_NODES[toIdx]
      if (!fromNode || !toNode) return

      const curve = makeArcCurve(fromNode, toNode, earthRadius * 1.008, 0.32)
      arcCurves.push(curve)

      const pts = curve.getPoints(54)
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts)
      const lineMat = new THREE.LineBasicMaterial({
        color: idx % 2 === 0 ? 0xff2840 : 0x38bdf8,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
      })
      const arcLine = new THREE.Line(lineGeo, lineMat)
      globeGroup.add(arcLine)

      // Data packets
      for (let p = 0; p < 2; p++) {
        const pGeo = new THREE.SphereGeometry(0.024, 8, 8)
        const pMat = new THREE.MeshBasicMaterial({
          color: idx % 2 === 0 ? 0xffffff : 0x67e8f9,
          toneMapped: false,
        })
        const packet = new THREE.Mesh(pGeo, pMat)
        globeGroup.add(packet)
        packetMeshes.push({
          mesh: packet,
          curveIndex: arcCurves.length - 1,
          progress: (p * 0.5 + idx * 0.15) % 1.0,
          speed: 0.65 + Math.random() * 0.5,
        })
      }
    })

    // 7. FOREGROUND MULTI-DEVICE SHOWCASE RIG
    // Art direction: laptop = left/back, phone = center/front focal point, tablet = right/back.
    // Globe stays clearly behind the hardware; the platform supports rather than dominates.
    const deviceRig = new THREE.Group()
    deviceRig.position.set(0.10, -0.50, 1.08)
    scene.add(deviceRig)

    // Load High-Resolution Screen Textures with Max Anisotropy for razor-sharp text
    const setupScreenTex = (url: string) => {
      const tex = textureLoader.load(url)
      tex.colorSpace = THREE.SRGBColorSpace
      tex.anisotropy = maxAniso
      tex.generateMipmaps = true
      tex.minFilter = THREE.LinearMipmapLinearFilter
      tex.magFilter = THREE.LinearFilter
      return tex
    }

    const laptopTexture = setupScreenTex('/assets/dashboard-laptop.jpg')
    const phoneTexture = setupScreenTex('/assets/dashboard-phone.jpg')
    const tabletTexture = setupScreenTex('/assets/dashboard-tablet.png')

    // Screen Material Factory with 100% true-to-life color reproduction (no blur, no glare)
    const makeScreenMat = (tex: THREE.Texture) => new THREE.MeshPhysicalMaterial({
      map: tex,
      emissiveMap: tex,
      emissive: new THREE.Color(0x252525),
      emissiveIntensity: 0.55,
      metalness: 0.0,
      roughness: 0.16,
      clearcoat: 0.85,
      clearcoatRoughness: 0.08,
      toneMapped: false,
    })

    const darkTitaniumMat = new THREE.MeshPhysicalMaterial({
      color: 0x252c36,
      metalness: 0.58,
      roughness: 0.26,
      clearcoat: 0.42,
      clearcoatRoughness: 0.18,
    })

    // A. BASALT ROCK PEDESTAL & NEON RIM
    const pedestalGroup = new THREE.Group()
    pedestalGroup.position.set(0, -0.38, 0)
    deviceRig.add(pedestalGroup)

    const rockGeo = new THREE.IcosahedronGeometry(2.35, 3)
    const pAttr = rockGeo.attributes.position
    for (let i = 0; i < pAttr.count; i++) {
      const x = pAttr.getX(i), y = pAttr.getY(i), z = pAttr.getZ(i)
      const n = 0.88 + 0.12 * Math.sin(x * 5.4 + z * 4.1) * Math.cos(y * 3.2)
      pAttr.setXYZ(i, x * 1.34 * n, y * 0.19 * n, z * 0.74 * n)
    }
    rockGeo.computeVertexNormals()

    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x0e131b,
      roughness: 0.75,
      metalness: 0.3,
      flatShading: true,
    })
    const rockPlatform = new THREE.Mesh(rockGeo, rockMat)
    rockPlatform.position.set(0, -0.05, 0)
    rockPlatform.castShadow = true
    rockPlatform.receiveShadow = true
    pedestalGroup.add(rockPlatform)

    // Intense Crimson Neon Glow Ring beneath hardware
    const glowRingGeo = new THREE.TorusGeometry(1.80, 0.026, 16, 64)
    const glowRingMat = new THREE.MeshBasicMaterial({ color: 0xff1837, toneMapped: false })
    const glowRing = new THREE.Mesh(glowRingGeo, glowRingMat)
    glowRing.rotation.x = Math.PI / 2
    glowRing.position.set(0, 0.24, 0.05)
    pedestalGroup.add(glowRing)

    const neonUnderglow = new THREE.PointLight(0xff1837, 4.2, 4.2, 1.8)
    neonUnderglow.position.set(0, 0.34, 0.45)
    pedestalGroup.add(neonUnderglow)

    function addPlanarUVs(geometry: THREE.BufferGeometry) {
      geometry.computeBoundingBox()
      const box = geometry.boundingBox
      if (!box) return
      const pos = geometry.attributes.position
      const uvs = new Float32Array(pos.count * 2)
      const width = (box.max.x - box.min.x) || 1
      const height = (box.max.y - box.min.y) || 1
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i)
        const y = pos.getY(i)
        uvs[i * 2] = (x - box.min.x) / width
        uvs[i * 2 + 1] = (y - box.min.y) / height
      }
      geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
    }

    const gltfLoader = new GLTFLoader()

    // B. LAPTOP WORKSTATION (Left Foreground - Premium GLTF Model)
    const laptopGroup = new THREE.Group()
    laptopGroup.position.set(-1.30, 0.23, 0.32)
    laptopGroup.rotation.set(0.00, 0.35, -0.012)
    laptopGroup.scale.setScalar(0.82)
    deviceRig.add(laptopGroup)

    gltfLoader.load('/assets/models/laptop-premium.glb', (gltf) => {
      const model = gltf.scene
      model.position.y = 0.06
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh
          mesh.castShadow = true
          mesh.receiveShadow = true
          if (mesh.name === 'screen') {
            addPlanarUVs(mesh.geometry)
            mesh.material = makeScreenMat(laptopTexture)
          } else if (mesh.name === 'red_accent') {
            mesh.material = new THREE.MeshBasicMaterial({ color: 0xff1837, toneMapped: false })
          } else if (mesh.name === 'trackpad') {
            mesh.material = new THREE.MeshStandardMaterial({ color: 0x1e2430, metalness: 0.85, roughness: 0.25 })
          } else if (mesh.name === 'keyboard' || mesh.name === 'keyboard_deck') {
            mesh.material = new THREE.MeshStandardMaterial({ color: 0x181e28, metalness: 0.7, roughness: 0.45 })
          } else {
            mesh.material = darkTitaniumMat
          }
        }
      })
      laptopGroup.add(model)
    })

    // C. SMARTPHONE DEVICE (Center Foreground - Premium GLTF Model)
    const phoneGroup = new THREE.Group()
    phoneGroup.position.set(0.22, 0.10, 1.38)
    phoneGroup.rotation.set(-0.025, -0.02, 0.008)
    phoneGroup.scale.setScalar(0.88)
    deviceRig.add(phoneGroup)

    gltfLoader.load('/assets/models/phone-premium.glb', (gltf) => {
      const model = gltf.scene
      model.position.y = 0.79
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh
          mesh.castShadow = true
          mesh.receiveShadow = true
          if (mesh.name === 'screen') {
            addPlanarUVs(mesh.geometry)
            mesh.material = makeScreenMat(phoneTexture)
          } else if (mesh.name === 'island') {
            mesh.material = new THREE.MeshBasicMaterial({ color: 0x05070a })
          } else {
            mesh.material = darkTitaniumMat
          }
        }
      })
      phoneGroup.add(model)
    })

    // D. TABLET DEVICE WITH JJSOFT GLOBAL LOGO (Right Foreground - Premium GLTF Model)
    const tabletGroup = new THREE.Group()
    tabletGroup.position.set(1.43, 0.15, 0.56)
    tabletGroup.rotation.set(-0.02, -0.40, 0.012)
    tabletGroup.scale.setScalar(0.76)
    deviceRig.add(tabletGroup)

    gltfLoader.load('/assets/models/tablet-premium.glb', (gltf) => {
      const model = gltf.scene
      model.position.y = 1.09
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh
          mesh.castShadow = true
          mesh.receiveShadow = true
          if (mesh.name === 'screen') {
            addPlanarUVs(mesh.geometry)
            mesh.material = makeScreenMat(tabletTexture)
          } else {
            mesh.material = darkTitaniumMat
          }
        }
      })
      tabletGroup.add(model)
    })

    // 8. 360° INTERACTIVE DRAG & MOUSE PARALLAX
    let isDragging = false
    let dragStart = { x: 0, y: 0 }
    let mousePos = { x: 0, y: 0 }

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true
      dragStart = { x: e.clientX, y: e.clientY }
      setIsInteracting(true)
      document.body.style.cursor = 'grabbing'
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePos.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mousePos.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      if (!isDragging) return
      const dx = e.clientX - dragStart.x
      const dy = e.clientY - dragStart.y
      globeGroup.rotation.y += dx * 0.0055
      globeGroup.rotation.x = THREE.MathUtils.clamp(globeGroup.rotation.x + dy * 0.003, -0.65, 0.65)
      dragStart = { x: e.clientX, y: e.clientY }
    }

    const onPointerUp = () => {
      isDragging = false
      setIsInteracting(false)
      document.body.style.cursor = ''
    }

    canvas.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)

    // 9. RESPONSIVE RESIZE OBSERVER & SHARP RESOLUTION CONTROL
    const handleResize = () => {
      const w = container.clientWidth || 760
      const h = container.clientHeight || 580
      camera.aspect = w / h
      if (w < 768) {
        camera.fov = 44
        camera.position.set(0.0, 0.62, 8.75)
        cameraTarget.set(0.06, -0.10, 0.60)
        deviceRig.scale.setScalar(0.86)
        globeAnchor.scale.setScalar(0.92)
      } else {
        camera.fov = 34
        camera.position.set(0.20, 0.78, 7.65)
        cameraTarget.set(0.16, -0.08, 0.72)
        deviceRig.scale.setScalar(1.0)
        globeAnchor.scale.setScalar(1.0)
      }
      camera.lookAt(cameraTarget)
      camera.updateProjectionMatrix()
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.5))
      renderer.setSize(w, h, false)
    }
    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)
    handleResize()

    // 10. SMOOTH ANIMATION LOOP (Direct Razor-Sharp WebGL Rendering)
    const clock = new THREE.Clock()
    let animationFrameId: number

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Globe continuous rotation when not dragging
      if (!isDragging) {
        globeGroup.rotation.y += 0.0022
      }

      // 3D Parallax on hardware device rig
      deviceRig.rotation.y = THREE.MathUtils.lerp(deviceRig.rotation.y, mousePos.x * 0.045, 0.04)
      deviceRig.rotation.x = THREE.MathUtils.lerp(deviceRig.rotation.x, -mousePos.y * 0.022, 0.04)
      deviceRig.position.y = -0.50 + Math.sin(elapsedTime * 1.6) * 0.012

      // Streaming data packets along network arcs
      packetMeshes.forEach((item) => {
        item.progress += item.speed * 0.008
        if (item.progress > 1.0) item.progress = 0
        const curve = arcCurves[item.curveIndex]
        if (curve) item.mesh.position.copy(curve.getPoint(item.progress))
      })

      // Pulsing node glow & lights
      pulseNodes.forEach((node, idx) => {
        const pulse = 1 + Math.sin(elapsedTime * 3 + node.phase) * 0.25
        node.coreMesh.scale.setScalar(pulse)
        if (node.sprite) {
          const s = (idx === 0 ? 1.25 : 0.88 * node.nodeScale) * (1 + Math.sin(elapsedTime * 3 + node.phase) * 0.15)
          node.sprite.scale.set(s, s, 1)
        }
        node.light.intensity = (idx === 0 ? 2.5 : 1.2) * (0.85 + Math.sin(elapsedTime * 3 + node.phase) * 0.2)
      })

      // Neon underglow pulse
      neonUnderglow.intensity = 4.2 + Math.sin(elapsedTime * 2.2) * 0.65
      /*
      // Cosmic 3D text JJSOFT subtle floating dynamics & interactive mouse parallax
      brandBackdropGroup.position.y = 2.32 + Math.sin(elapsedTime * 1.2) * 0.025
      brandBackdropGroup.rotation.y = THREE.MathUtils.lerp(brandBackdropGroup.rotation.y, mousePos.x * 0.032, 0.03)
      brandBackdropGroup.rotation.x = THREE.MathUtils.lerp(brandBackdropGroup.rotation.x, -mousePos.y * 0.018, 0.03)
      */

      // Render directly with hardware MSAA and native pixel ratio for 100% crisp fidelity
      renderer.render(scene, camera)
    }

    animate()

    // 11. CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      canvas.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
      renderer.dispose()
      starGeo.dispose()
      starMat.dispose()
      earthGeo.dispose()
      earthMat.dispose()
      atmoGeo.dispose()
      atmoMat.dispose()
      rockGeo.dispose()
      rockMat.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        touchAction: 'none',
      }}
    >
      {/* Loading skeleton shimmer */}
      {!isReady && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, #0a1426 0%, #010611 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5,
            transition: 'opacity 0.6s ease',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '90px', height: '90px', borderRadius: '50%',
              border: '2px solid rgba(255, 34, 51, 0.4)',
              boxShadow: '0 0 35px rgba(255, 24, 55, 0.25)',
              margin: '0 auto 16px',
              animation: 'spin 2s linear infinite',
              background: 'radial-gradient(circle at 35% 35%, #0f2442, #010816)',
            }} />
            <div style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em' }}>
              INITIALIZING 3D ECOSYSTEM...
            </div>
          </div>
        </div>
      )}

      {/* WebGL 3D Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          cursor: isInteracting ? 'grabbing' : 'grab',
        }}
      />

      {/* Interactive Active Hub Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          background: 'rgba(7, 13, 24, 0.78)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '999px',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#e2e8f0',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.05em',
          pointerEvents: 'none',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          zIndex: 4,
        }}
      >
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#ff1837',
            boxShadow: '0 0 8px #ff1837',
            display: 'inline-block',
          }}
        />
        <span>ACTIVE HUB: {activeCity.toUpperCase()}</span>
        <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 2px' }}>|</span>
        <span style={{ color: '#94a3b8', fontSize: '10px' }}>360° DRAG TO ROTATE</span>
      </div>
    </div>
  )
}
