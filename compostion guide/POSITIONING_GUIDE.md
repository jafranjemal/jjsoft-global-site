# JJSOFT GLOBAL Hero Composition V3

## Target visual hierarchy

The scene is product photography, not a centered 3D demo.

1. **Phone = foreground focal point** — nearest to camera, centered slightly right.
2. **Laptop = left/back** — widest device, angled inward so keyboard deck and screen thickness are visible.
3. **Tablet = right/back** — narrower than the old version, angled inward so it reads as a tablet rather than a black rectangle.
4. **Globe = background anchor** — large, elevated, clearly behind the hardware instead of sitting on the same depth plane.
5. **Pedestal = supporting element** — reduced width/height and weaker neon so it does not become the subject.

## Desktop target

- Camera FOV: 34°
- Camera: `(0.20, 0.78, 7.65)`
- Camera target: `(0.16, -0.08, 0.72)`
- Globe anchor: `(0.36, 0.63, -1.85)`
- Earth radius: `2.65`
- Device rig: `(0.10, -0.50, 1.08)`
- Laptop: `(-1.30, 0.23, 0.32)`, yaw `+0.35`, scale `0.82`
- Phone: `(0.22, 0.10, 1.38)`, near-front, scale `0.88`
- Tablet: `(1.43, 0.15, 0.56)`, yaw `-0.40`, scale `0.76`

## Why this is different

The earlier scene used a nearly eye-level camera and put the front surface of the globe almost on the same Z plane as the devices. That flattened the scene. V3 moves the camera upward, aims it downward, pushes the globe back, increases phone foreground separation, shrinks the tablet and platform, and enables actual soft shadows.
