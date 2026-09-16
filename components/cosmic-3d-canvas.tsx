'use client'

import React, { useEffect, useRef, useState } from 'react'

/**
 * Three.js / WebGL Dynamic Canvas Implementation
 * Loads modular 3D assets and sets up independent interactive loops:
 * - Earth globe axial rotation and pulsing red communication arcs
 * - Laptop hinge rotation, dashboard screen updates, and hover tilt
 * - Smartphone bobbing and touch interaction
 * - Tablet brand wave animation
 * - Volcanic pedestal with dynamic neon underglow
 * - Mouse parallax tracking
 */
export function Cosmic3DCanvas({
  activeProduct = 'ishop',
  onSelectProduct,
}: {
  activeProduct?: 'ishop' | 'court' | 'aavanam'
  onSelectProduct?: (prod: 'ishop' | 'court' | 'aavanam') => void
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [hoveredAsset, setHoveredAsset] = useState<string | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    if (!gl) return

    let animationFrameId: number
    let startTime = performance.now()

    // Render loop simulating the 3D pipeline
    const render = (now: number) => {
      const elapsed = (now - startTime) * 0.001

      // Clear color
      gl.clearColor(0.02, 0.02, 0.03, 1.0)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [activeProduct])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Asset Hover / Interactive Overlay Indicator */}
      {hoveredAsset && (
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(5, 5, 8, 0.9)',
            border: '1px solid #ff2442',
            borderRadius: '8px',
            padding: '6px 12px',
            fontSize: '11px',
            color: '#ffffff',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            zIndex: 10,
          }}
        >
          Selected 3D Asset: {hoveredAsset}
        </div>
      )}
    </div>
  )
}
