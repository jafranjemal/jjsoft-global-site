'use client'

import React, { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  radius: number
  color: string
  baseAlpha: number
  twinkleSpeed: number
  phase: number
  hasGlow: boolean
}

interface Meteor {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  alpha: number
  width: number
  color: string
  life: number
  maxLife: number
}

export function GalaxyStarfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Star Colors: Diamond white, Celestial electric cyan, Ruby rose, Warm stellar gold
    const STAR_COLORS = [
      'rgba(255, 255, 255, ',
      'rgba(255, 255, 255, ',
      'rgba(255, 255, 255, ',
      'rgba(165, 220, 255, ',
      'rgba(140, 205, 255, ',
      'rgba(255, 180, 195, ',
      'rgba(255, 225, 180, ',
    ]

    // Generate stars
    const starCount = Math.min(Math.floor((width * height) / 7500), 280)
    const stars: Star[] = []

    for (let i = 0; i < starCount; i++) {
      const radius = Math.random() < 0.8 ? Math.random() * 0.9 + 0.5 : Math.random() * 1.4 + 1.1
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        baseAlpha: Math.random() * 0.55 + 0.25,
        twinkleSpeed: Math.random() * 0.025 + 0.008,
        phase: Math.random() * Math.PI * 2,
        hasGlow: radius > 1.4,
      })
    }

    // Meteors / Shooting stars
    const meteors: Meteor[] = []
    let lastMeteorSpawn = Date.now()

    const spawnMeteor = () => {
      const startX = Math.random() * width * 0.9
      const startY = Math.random() * height * 0.35
      const angle = (Math.PI / 180) * (35 + Math.random() * 15) // ~35 to 50 degrees diagonal
      const speed = Math.random() * 9 + 11
      const length = Math.random() * 110 + 70
      meteors.push({
        x: startX,
        y: startY,
        length,
        speed,
        angle,
        alpha: 1,
        width: Math.random() * 1.5 + 1.2,
        color: Math.random() > 0.4 ? 'rgba(255, 255, 255, ' : 'rgba(255, 60, 90, ',
        life: 0,
        maxLife: Math.random() * 35 + 45,
      })
    }

    // Resize Handler
    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Animation Loop
    let tick = 0
    let isRunning = true

    const handleVisibility = () => {
      isRunning = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibility)

    const render = () => {
      if (!isRunning) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      tick++
      ctx.clearRect(0, 0, width, height)

      // 1. Draw Nebular Dust Clouds (soft celestial background light)
      const nebula1 = ctx.createRadialGradient(width * 0.85, height * 0.2, 0, width * 0.85, height * 0.2, width * 0.45)
      nebula1.addColorStop(0, 'rgba(0, 140, 255, 0.045)')
      nebula1.addColorStop(0.5, 'rgba(0, 90, 200, 0.018)')
      nebula1.addColorStop(1, 'transparent')
      ctx.fillStyle = nebula1
      ctx.fillRect(0, 0, width, height)

      const nebula2 = ctx.createRadialGradient(width * 0.15, height * 0.75, 0, width * 0.15, height * 0.75, width * 0.4)
      nebula2.addColorStop(0, 'rgba(255, 22, 51, 0.035)')
      nebula2.addColorStop(0.5, 'rgba(255, 45, 75, 0.012)')
      nebula2.addColorStop(1, 'transparent')
      ctx.fillStyle = nebula2
      ctx.fillRect(0, 0, width, height)

      // 2. Draw Twinkling Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]
        const currentAlpha = Math.max(
          0.1,
          Math.min(1, star.baseAlpha + Math.sin(tick * star.twinkleSpeed + star.phase) * 0.35)
        )

        // Draw soft glow aura for brighter stars
        if (star.hasGlow && currentAlpha > 0.6) {
          const glowGrad = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 4.5)
          glowGrad.addColorStop(0, star.color + (currentAlpha * 0.45) + ')')
          glowGrad.addColorStop(1, 'transparent')
          ctx.fillStyle = glowGrad
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.radius * 4.5, 0, Math.PI * 2)
          ctx.fill()
        }

        // Draw star core
        ctx.fillStyle = star.color + currentAlpha + ')'
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // 3. Spawn & Render Meteors
      const now = Date.now()
      if (now - lastMeteorSpawn > 8000 + Math.random() * 6000) {
        spawnMeteor()
        lastMeteorSpawn = now
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i]
        m.life++

        const progress = m.life / m.maxLife
        const currentAlpha = Math.sin(progress * Math.PI) * m.alpha

        const tailX = m.x - Math.cos(m.angle) * m.length
        const tailY = m.y - Math.sin(m.angle) * m.length

        const streakGrad = ctx.createLinearGradient(tailX, tailY, m.x, m.y)
        streakGrad.addColorStop(0, 'transparent')
        streakGrad.addColorStop(0.7, m.color + (currentAlpha * 0.4) + ')')
        streakGrad.addColorStop(1, '#ffffff')

        ctx.strokeStyle = streakGrad
        ctx.lineWidth = m.width
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(m.x, m.y)
        ctx.stroke()

        m.x += Math.cos(m.angle) * m.speed
        m.y += Math.sin(m.angle) * m.speed

        if (m.life >= m.maxLife || m.x > width + 100 || m.y > height + 100) {
          meteors.splice(i, 1)
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
