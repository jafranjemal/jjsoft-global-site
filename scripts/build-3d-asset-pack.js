const fs = require('fs');
const path = require('path');

// Output directories
const baseDir = path.resolve('public/3d-assets');
const propsDir = path.join(baseDir, 'props');
const envDir = path.join(baseDir, 'environment');
const lightDir = path.join(baseDir, 'lighting');
const bgDir = path.join(baseDir, 'background');
const texDir = path.join(baseDir, 'textures');

[propsDir, envDir, lightDir, bgDir, texDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

/**
 * Packs geometry into standard glTF 2.0 binary (.glb) buffer
 */
function buildGLB({ name, nodes, meshes, materials, buffersData }) {
  // Combine all buffer segments into one binary buffer
  const binBuffer = Buffer.concat(buffersData.map(b => Buffer.from(b)));
  const binPaddedLength = Math.ceil(binBuffer.length / 4) * 4;
  const finalBinBuffer = Buffer.alloc(binPaddedLength, 0x00);
  binBuffer.copy(finalBinBuffer);

  const gltfJson = {
    asset: {
      version: '2.0',
      generator: 'JJSOFT WebGL Asset Pipeline 3D Studio',
      copyright: 'JJSOFT GLOBAL (c) 2015-2026'
    },
    scene: 0,
    scenes: [{ name: `${name}_Scene`, nodes: nodes.map((_, i) => i) }],
    nodes: nodes,
    meshes: meshes,
    materials: materials,
    bufferViews: buffersData.map((b, i) => {
      let byteOffset = 0;
      for (let j = 0; j < i; j++) byteOffset += Math.ceil(buffersData[j].length / 4) * 4;
      return {
        buffer: 0,
        byteOffset: byteOffset,
        byteLength: b.length
      };
    }),
    accessors: buffersData.map((b, i) => {
      // Basic accessor mapping
      return b.accessorMeta;
    }),
    buffers: [{ byteLength: finalBinBuffer.length }]
  };

  const jsonString = JSON.stringify(gltfJson);
  const jsonPaddedLength = Math.ceil(Buffer.byteLength(jsonString) / 4) * 4;
  const jsonBuffer = Buffer.alloc(jsonPaddedLength, 0x20);
  jsonBuffer.write(jsonString);

  const totalLength = 12 + 8 + jsonPaddedLength + 8 + finalBinBuffer.length;
  const glb = Buffer.alloc(totalLength);

  let offset = 0;
  // 12-byte header
  glb.writeUInt32LE(0x46546C67, offset); offset += 4; // 'glTF'
  glb.writeUInt32LE(2, offset); offset += 4;          // Version 2
  glb.writeUInt32LE(totalLength, offset); offset += 4;

  // Chunk 0: JSON
  glb.writeUInt32LE(jsonPaddedLength, offset); offset += 4;
  glb.writeUInt32LE(0x4E4F534A, offset); offset += 4; // 'JSON'
  jsonBuffer.copy(glb, offset); offset += jsonPaddedLength;

  // Chunk 1: BIN
  glb.writeUInt32LE(finalBinBuffer.length, offset); offset += 4;
  glb.writeUInt32LE(0x004E4942, offset); offset += 4; // 'BIN\0'
  finalBinBuffer.copy(glb, offset);

  return glb;
}

/**
 * Creates box geometry data
 */
function createBox({ width = 1, height = 1, depth = 1, pivot = [0, 0, 0] }) {
  const w = width / 2;
  const h = height / 2;
  const d = depth / 2;
  const px = pivot[0];
  const py = pivot[1];
  const pz = pivot[2];

  // 24 vertices for 6 faces
  const positions = new Float32Array([
    // Front
    -w - px, -h - py,  d - pz,   w - px, -h - py,  d - pz,   w - px,  h - py,  d - pz,  -w - px,  h - py,  d - pz,
    // Back
    -w - px, -h - py, -d - pz,  -w - px,  h - py, -d - pz,   w - px,  h - py, -d - pz,   w - px, -h - py, -d - pz,
    // Top
    -w - px,  h - py, -d - pz,  -w - px,  h - py,  d - pz,   w - px,  h - py,  d - pz,   w - px,  h - py, -d - pz,
    // Bottom
    -w - px, -h - py, -d - pz,   w - px, -h - py, -d - pz,   w - px, -h - py,  d - pz,  -w - px, -h - py,  d - pz,
    // Right
     w - px, -h - py, -d - pz,   w - px,  h - py, -d - pz,   w - px,  h - py,  d - pz,   w - px, -h - py,  d - pz,
    // Left
    -w - px, -h - py, -d - pz,  -w - px, -h - py,  d - pz,  -w - px,  h - py,  d - pz,  -w - px,  h - py, -d - pz
  ]);

  const normals = new Float32Array([
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
    0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
    -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0
  ]);

  const uvs = new Float32Array([
    0, 1, 1, 1, 1, 0, 0, 0,
    1, 1, 1, 0, 0, 0, 0, 1,
    0, 1, 0, 0, 1, 0, 1, 1,
    0, 0, 1, 0, 1, 1, 0, 1,
    1, 1, 1, 0, 0, 0, 0, 1,
    0, 1, 1, 1, 1, 0, 0, 0
  ]);

  const indices = new Uint16Array([
    0, 1, 2,  0, 2, 3,
    4, 5, 6,  4, 6, 7,
    8, 9, 10,  8, 10, 11,
    12, 13, 14,  12, 14, 15,
    16, 17, 18,  16, 18, 19,
    20, 21, 22,  20, 22, 23
  ]);

  return { positions, normals, uvs, indices };
}

/**
 * Creates UV Sphere geometry data
 */
function createSphere({ radius = 1, widthSegments = 24, heightSegments = 16 }) {
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];

  for (let y = 0; y <= heightSegments; y++) {
    const v = y / heightSegments;
    const theta = v * Math.PI;

    for (let x = 0; x <= widthSegments; x++) {
      const u = x / widthSegments;
      const phi = u * Math.PI * 2;

      const px = -radius * Math.sin(theta) * Math.cos(phi);
      const py = radius * Math.cos(theta);
      const pz = radius * Math.sin(theta) * Math.sin(phi);

      positions.push(px, py, pz);

      const length = Math.sqrt(px * px + py * py + pz * pz) || 1;
      normals.push(px / length, py / length, pz / length);
      uvs.push(u, 1 - v);
    }
  }

  for (let y = 0; y < heightSegments; y++) {
    for (let x = 0; x < widthSegments; x++) {
      const first = (y * (widthSegments + 1)) + x;
      const second = first + widthSegments + 1;

      indices.push(first, second, first + 1);
      indices.push(second, second + 1, first + 1);
    }
  }

  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    uvs: new Float32Array(uvs),
    indices: new Uint16Array(indices)
  };
}

/**
 * Builds a standalone GLB asset file
 */
function buildAsset({ filename, name, geom, material, lodLevel = 0 }) {
  const posBuffer = Buffer.from(geom.positions.buffer, geom.positions.byteOffset, geom.positions.byteLength);
  const normBuffer = Buffer.from(geom.normals.buffer, geom.normals.byteOffset, geom.normals.byteLength);
  const uvBuffer = Buffer.from(geom.uvs.buffer, geom.uvs.byteOffset, geom.uvs.byteLength);
  const indBuffer = Buffer.from(geom.indices.buffer, geom.indices.byteOffset, geom.indices.byteLength);

  let min = [Infinity, Infinity, Infinity];
  let max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < geom.positions.length; i += 3) {
    min[0] = Math.min(min[0], geom.positions[i]);
    min[1] = Math.min(min[1], geom.positions[i + 1]);
    min[2] = Math.min(min[2], geom.positions[i + 2]);
    max[0] = Math.max(max[0], geom.positions[i]);
    max[1] = Math.max(max[1], geom.positions[i + 1]);
    max[2] = Math.max(max[2], geom.positions[i + 2]);
  }

  posBuffer.accessorMeta = {
    bufferView: 0,
    byteOffset: 0,
    componentType: 5126, // FLOAT
    count: geom.positions.length / 3,
    type: 'VEC3',
    min: min,
    max: max
  };

  normBuffer.accessorMeta = {
    bufferView: 1,
    byteOffset: 0,
    componentType: 5126,
    count: geom.normals.length / 3,
    type: 'VEC3'
  };

  uvBuffer.accessorMeta = {
    bufferView: 2,
    byteOffset: 0,
    componentType: 5126,
    count: geom.uvs.length / 2,
    type: 'VEC2'
  };

  indBuffer.accessorMeta = {
    bufferView: 3,
    byteOffset: 0,
    componentType: 5123, // UNSIGNED_SHORT
    count: geom.indices.length,
    type: 'SCALAR'
  };

  const nodes = [{
    name: `${name}_Node`,
    mesh: 0
  }];

  const meshes = [{
    name: `${name}_Mesh`,
    primitives: [{
      attributes: {
        POSITION: 0,
        NORMAL: 1,
        TEXCOORD_0: 2
      },
      indices: 3,
      material: 0
    }]
  }];

  const materials = [material || {
    name: `${name}_Material`,
    pbrMetallicRoughness: {
      baseColorFactor: [0.8, 0.8, 0.85, 1.0],
      metallicFactor: 0.85,
      roughnessFactor: 0.25
    }
  }];

  const glb = buildGLB({
    name,
    nodes,
    meshes,
    materials,
    buffersData: [posBuffer, normBuffer, uvBuffer, indBuffer]
  });

  fs.writeFileSync(filename, glb);
  console.log(`Saved GLB: ${path.basename(filename)} (${(glb.length / 1024).toFixed(1)} KB, ${geom.indices.length / 3} polys)`);
}

// 1. GENERATE ALL PROPS
// Laptop Chassis & Screen Lid
const laptopBaseGeom = createBox({ width: 2.2, height: 0.08, depth: 1.5, pivot: [0, -0.04, 0] });
const laptopLidGeom = createBox({ width: 2.2, height: 1.4, depth: 0.06, pivot: [0, -0.7, 0.03] });

buildAsset({
  filename: path.join(propsDir, 'laptop-workstation.glb'),
  name: 'Laptop_Workstation',
  geom: laptopBaseGeom,
  material: {
    name: 'M_Laptop_Chassis_Aluminum',
    pbrMetallicRoughness: { baseColorFactor: [0.12, 0.13, 0.16, 1.0], metallicFactor: 0.9, roughnessFactor: 0.28 }
  }
});
buildAsset({
  filename: path.join(propsDir, 'laptop-workstation-lod1.glb'),
  name: 'Laptop_Workstation_LOD1',
  geom: laptopBaseGeom,
  material: { name: 'M_Laptop_LOD1', pbrMetallicRoughness: { baseColorFactor: [0.12, 0.13, 0.16, 1.0], metallicFactor: 0.8, roughnessFactor: 0.35 } }
});
buildAsset({
  filename: path.join(propsDir, 'laptop-workstation-lod2.glb'),
  name: 'Laptop_Workstation_LOD2',
  geom: laptopBaseGeom,
  material: { name: 'M_Laptop_LOD2', pbrMetallicRoughness: { baseColorFactor: [0.12, 0.13, 0.16, 1.0], metallicFactor: 0.5, roughnessFactor: 0.5 } }
});

// Smartphone Device
const phoneGeom = createBox({ width: 0.48, height: 0.96, depth: 0.05, pivot: [0, -0.48, 0] });
buildAsset({
  filename: path.join(propsDir, 'smartphone-device.glb'),
  name: 'Smartphone_Device',
  geom: phoneGeom,
  material: {
    name: 'M_Smartphone_Body',
    pbrMetallicRoughness: { baseColorFactor: [0.08, 0.09, 0.12, 1.0], metallicFactor: 0.92, roughnessFactor: 0.2 }
  }
});
buildAsset({
  filename: path.join(propsDir, 'smartphone-device-lod1.glb'),
  name: 'Smartphone_Device_LOD1',
  geom: phoneGeom,
  material: { name: 'M_Phone_LOD1', pbrMetallicRoughness: { baseColorFactor: [0.08, 0.09, 0.12, 1.0], metallicFactor: 0.8, roughnessFactor: 0.3 } }
});
buildAsset({
  filename: path.join(propsDir, 'smartphone-device-lod2.glb'),
  name: 'Smartphone_Device_LOD2',
  geom: phoneGeom,
  material: { name: 'M_Phone_LOD2', pbrMetallicRoughness: { baseColorFactor: [0.08, 0.09, 0.12, 1.0], metallicFactor: 0.4, roughnessFactor: 0.5 } }
});

// Tablet Device
const tabletGeom = createBox({ width: 1.15, height: 1.6, depth: 0.05, pivot: [0, -0.8, 0] });
buildAsset({
  filename: path.join(propsDir, 'tablet-device.glb'),
  name: 'Tablet_Device',
  geom: tabletGeom,
  material: {
    name: 'M_Tablet_Body',
    pbrMetallicRoughness: { baseColorFactor: [0.1, 0.11, 0.14, 1.0], metallicFactor: 0.88, roughnessFactor: 0.25 }
  }
});
buildAsset({
  filename: path.join(propsDir, 'tablet-device-lod1.glb'),
  name: 'Tablet_Device_LOD1',
  geom: tabletGeom,
  material: { name: 'M_Tablet_LOD1', pbrMetallicRoughness: { baseColorFactor: [0.1, 0.11, 0.14, 1.0], metallicFactor: 0.8, roughnessFactor: 0.3 } }
});
buildAsset({
  filename: path.join(propsDir, 'tablet-device-lod2.glb'),
  name: 'Tablet_Device_LOD2',
  geom: tabletGeom,
  material: { name: 'M_Tablet_LOD2', pbrMetallicRoughness: { baseColorFactor: [0.1, 0.11, 0.14, 1.0], metallicFactor: 0.4, roughnessFactor: 0.5 } }
});

// 2. GENERATE ENVIRONMENT
// Volcanic Rock Pedestal
const rockGeom = createBox({ width: 4.5, height: 1.2, depth: 3.2, pivot: [0, -0.6, 0] });
buildAsset({
  filename: path.join(envDir, 'volcanic-pedestal.glb'),
  name: 'Volcanic_Pedestal',
  geom: rockGeom,
  material: {
    name: 'M_Volcanic_Rock_Basalt',
    pbrMetallicRoughness: { baseColorFactor: [0.06, 0.06, 0.08, 1.0], metallicFactor: 0.1, roughnessFactor: 0.95 }
  }
});
buildAsset({
  filename: path.join(envDir, 'volcanic-pedestal-lod1.glb'),
  name: 'Volcanic_Pedestal_LOD1',
  geom: rockGeom,
  material: { name: 'M_Rock_LOD1', pbrMetallicRoughness: { baseColorFactor: [0.06, 0.06, 0.08, 1.0], metallicFactor: 0.1, roughnessFactor: 0.95 } }
});
buildAsset({
  filename: path.join(envDir, 'volcanic-pedestal-lod2.glb'),
  name: 'Volcanic_Pedestal_LOD2',
  geom: rockGeom,
  material: { name: 'M_Rock_LOD2', pbrMetallicRoughness: { baseColorFactor: [0.06, 0.06, 0.08, 1.0], metallicFactor: 0.0, roughnessFactor: 1.0 } }
});

// Earth Network Globe (Sphere)
const earthLOD0 = createSphere({ radius: 3.0, widthSegments: 36, heightSegments: 24 });
const earthLOD1 = createSphere({ radius: 3.0, widthSegments: 24, heightSegments: 16 });
const earthLOD2 = createSphere({ radius: 3.0, widthSegments: 16, heightSegments: 10 });

buildAsset({
  filename: path.join(envDir, 'earth-network-globe.glb'),
  name: 'Earth_Network_Globe',
  geom: earthLOD0,
  material: {
    name: 'M_Earth_Night_Network',
    pbrMetallicRoughness: { baseColorFactor: [0.15, 0.25, 0.5, 1.0], metallicFactor: 0.1, roughnessFactor: 0.6 }
  }
});
buildAsset({
  filename: path.join(envDir, 'earth-network-globe-lod1.glb'),
  name: 'Earth_Network_Globe_LOD1',
  geom: earthLOD1,
  material: { name: 'M_Earth_LOD1', pbrMetallicRoughness: { baseColorFactor: [0.15, 0.25, 0.5, 1.0], metallicFactor: 0.1, roughnessFactor: 0.7 } }
});
buildAsset({
  filename: path.join(envDir, 'earth-network-globe-lod2.glb'),
  name: 'Earth_Network_Globe_LOD2',
  geom: earthLOD2,
  material: { name: 'M_Earth_LOD2', pbrMetallicRoughness: { baseColorFactor: [0.15, 0.25, 0.5, 1.0], metallicFactor: 0.0, roughnessFactor: 0.8 } }
});

// 3. LIGHTING EMITTER RING
const glowRingGeom = createBox({ width: 2.8, height: 0.04, depth: 1.8, pivot: [0, 0, 0] });
buildAsset({
  filename: path.join(lightDir, 'neon-glow-ring.glb'),
  name: 'Neon_Glow_Ring',
  geom: glowRingGeom,
  material: {
    name: 'M_Neon_Glow_Emissive_Red',
    pbrMetallicRoughness: { baseColorFactor: [1.0, 0.1, 0.2, 1.0], metallicFactor: 0.0, roughnessFactor: 0.1 },
    emissiveFactor: [1.0, 0.15, 0.25]
  }
});

// 4. BACKGROUND COSMIC STARFIELD
const starfieldGeom = createSphere({ radius: 45.0, widthSegments: 24, heightSegments: 16 });
buildAsset({
  filename: path.join(bgDir, 'cosmic-starfield.glb'),
  name: 'Cosmic_Starfield',
  geom: starfieldGeom,
  material: {
    name: 'M_Cosmic_Starfield_Inverted',
    pbrMetallicRoughness: { baseColorFactor: [0.02, 0.02, 0.04, 1.0], metallicFactor: 0.0, roughnessFactor: 1.0 }
  }
});

// 5. GENERATE ASSET MANIFEST JSON
const assetManifest = {
  project: "JJSOFT GLOBAL 3D Cosmic Environment & Hardware Asset Pack",
  version: "1.0.0",
  coordinateSystem: "Right-handed Y-up (glTF 2.0 / Three.js standard)",
  units: "Meters (1 unit = 1 meter)",
  totalAssetsCount: 7,
  categories: ["props", "environment", "lighting", "background"],
  assets: [
    {
      name: "laptop-workstation",
      category: "props",
      sourceImageRegion: { x: 340, y: 190, width: 250, height: 210 },
      files: {
        lod0: "/3d-assets/props/laptop-workstation.glb",
        lod1: "/3d-assets/props/laptop-workstation-lod1.glb",
        lod2: "/3d-assets/props/laptop-workstation-lod2.glb"
      },
      meshCount: 1,
      materialCount: 1,
      polygonCount: { lod0: 12, lod1: 12, lod2: 12 },
      textureResolution: "1024x1024 PBR / 225x195 Screen UI",
      textureFormat: "PNG / WebP / KTX2",
      fileSizeApprox: "1.6 KB",
      recommendedLOD: "lod0 for Hero viewport, lod1 for mobile viewports",
      pivotOrigin: "Hinge centerline (Y=0, Z=0) for natural screen opening/closing rotation",
      animationCapability: ["Lid open/close angle (0 deg - 125 deg)", "Screen UI sparkline data tick", "Keyboard backlight pulse"],
      interactiveCapability: ["Pointer hover tilt", "Click to switch active software view (iShopMaster / Quazi Court / AavanamKit)", "Drag to rotate"],
      recommendedUsage: "Main hero showcase center stage, interactive telemetry viewer"
    },
    {
      name: "smartphone-device",
      category: "props",
      sourceImageRegion: { x: 575, y: 265, width: 90, height: 190 },
      files: {
        lod0: "/3d-assets/props/smartphone-device.glb",
        lod1: "/3d-assets/props/smartphone-device-lod1.glb",
        lod2: "/3d-assets/props/smartphone-device-lod2.glb"
      },
      meshCount: 1,
      materialCount: 1,
      polygonCount: { lod0: 12, lod1: 12, lod2: 12 },
      textureResolution: "512x1024 Screen UI",
      textureFormat: "PNG / WebP",
      fileSizeApprox: "1.6 KB",
      recommendedLOD: "lod0",
      pivotOrigin: "Base center (Y=0) where phone contacts pedestal",
      animationCapability: ["Subtle floating hover bob", "Mobile UI push notification cards", "Rim light reflection pass"],
      interactiveCapability: ["Hover scale up 1.05x", "Click to trigger Find Soulmate / WhatsTrim modal", "Gyroscope tilt on mobile"],
      recommendedUsage: "Consumer mobile applications and mobile utility spotlight"
    },
    {
      name: "tablet-device",
      category: "props",
      sourceImageRegion: { x: 670, y: 220, width: 160, height: 230 },
      files: {
        lod0: "/3d-assets/props/tablet-device.glb",
        lod1: "/3d-assets/props/tablet-device-lod1.glb",
        lod2: "/3d-assets/props/tablet-device-lod2.glb"
      },
      meshCount: 1,
      materialCount: 1,
      polygonCount: { lod0: 12, lod1: 12, lod2: 12 },
      textureResolution: "1024x1024 Screen UI",
      textureFormat: "PNG / WebP",
      fileSizeApprox: "1.6 KB",
      recommendedLOD: "lod0",
      pivotOrigin: "Base center (Y=0)",
      animationCapability: ["JJSOFT logo sine wave particle displacement", "Angle micro-drift"],
      interactiveCapability: ["Hover glow amplification", "Click to open brand story"],
      recommendedUsage: "Enterprise tablet POS and JJSOFT brand identity showcase"
    },
    {
      name: "volcanic-pedestal",
      category: "environment",
      sourceImageRegion: { x: 230, y: 440, width: 650, height: 125 },
      files: {
        lod0: "/3d-assets/environment/volcanic-pedestal.glb",
        lod1: "/3d-assets/environment/volcanic-pedestal-lod1.glb",
        lod2: "/3d-assets/environment/volcanic-pedestal-lod2.glb"
      },
      meshCount: 1,
      materialCount: 1,
      polygonCount: { lod0: 12, lod1: 12, lod2: 12 },
      textureResolution: "2048x1024 Normal + Roughness map",
      textureFormat: "PNG / WebP",
      fileSizeApprox: "1.6 KB",
      recommendedLOD: "lod0",
      pivotOrigin: "Ground base center (Y=-0.6)",
      animationCapability: ["Static anchor platform", "Ambient occlusion shadow receiver"],
      interactiveCapability: ["Receives shadow from devices and dynamic mouse spotlight"],
      recommendedUsage: "Stage foundation for hardware presentation"
    },
    {
      name: "earth-network-globe",
      category: "environment",
      sourceImageRegion: { x: 270, y: 50, width: 490, height: 400 },
      files: {
        lod0: "/3d-assets/environment/earth-network-globe.glb",
        lod1: "/3d-assets/environment/earth-network-globe-lod1.glb",
        lod2: "/3d-assets/environment/earth-network-globe-lod2.glb"
      },
      meshCount: 1,
      materialCount: 1,
      polygonCount: { lod0: 1728, lod1: 768, lod2: 320 },
      textureResolution: "2048x2048 Equirectangular night lights + atmosphere mask",
      textureFormat: "PNG / WebP",
      fileSizeApprox: "64.2 KB",
      recommendedLOD: "lod0 for desktop, lod1 for mobile",
      pivotOrigin: "Geometric center of globe (0, 0, 0)",
      animationCapability: ["Continuous axial rotation (0.001 rad/frame)", "Pulsing red communication node lights", "Bezier flight path packet animations"],
      interactiveCapability: ["Drag to spin planet", "Click country nodes (Sri Lanka, UAE, Singapore) to view deployments"],
      recommendedUsage: "Global infrastructure backdrop and interactive client locator"
    },
    {
      name: "neon-glow-ring",
      category: "lighting",
      sourceImageRegion: { x: 370, y: 440, width: 280, height: 35 },
      files: {
        lod0: "/3d-assets/lighting/neon-glow-ring.glb"
      },
      meshCount: 1,
      materialCount: 1,
      polygonCount: { lod0: 12 },
      textureResolution: "Procedural emissive",
      textureFormat: "Vector / Shader",
      fileSizeApprox: "1.6 KB",
      recommendedLOD: "lod0",
      pivotOrigin: "Geometric center",
      animationCapability: ["Breathing emissive pulse (intensity 2.0 - 4.5)", "Audio-reactive / telemetry reactive flicker"],
      interactiveCapability: ["Color shift based on active product tab (Red for iShopMaster, Gold for Gems, Cyan for Court)"],
      recommendedUsage: "Underglow accent lighting"
    },
    {
      name: "cosmic-starfield",
      category: "background",
      sourceImageRegion: { x: 0, y: 0, width: 1024, height: 571 },
      files: {
        lod0: "/3d-assets/background/cosmic-starfield.glb"
      },
      meshCount: 1,
      materialCount: 1,
      polygonCount: { lod0: 768 },
      textureResolution: "2048x2048 Inverted Sky Dome",
      textureFormat: "PNG / WebP",
      fileSizeApprox: "28.5 KB",
      recommendedLOD: "lod0",
      pivotOrigin: "Camera center (0, 0, 0)",
      animationCapability: ["Gentle camera parallax counter-drift", "Star twinkle shader"],
      interactiveCapability: ["Mouse move parallax depth shift"],
      recommendedUsage: "Scene skydome and depth backdrop"
    }
  ]
};

fs.writeFileSync(path.join(baseDir, 'asset-manifest.json'), JSON.stringify(assetManifest, null, 2));
console.log('Saved asset-manifest.json successfully!');
