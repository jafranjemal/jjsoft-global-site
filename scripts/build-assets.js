const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function buildAllAssets() {
  console.log('Building authentic assets from references...');

  // Ensure directories exist
  ['public/assets/logos', 'public/assets/brand', 'public/assets/products', 'public/assets/founder', 'public/assets/projects'].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  // 1. BRAND LOGO (jjsoft.svg)
  // We use the dark-ground version of the official JJSOFT GLOBAL logo
  const brandDarkBuf = fs.readFileSync('public/assets/brand/jjsoft-brand-dark.png');
  const brandDarkBase64 = brandDarkBuf.toString('base64');
  const brandSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1256 492" width="100%" height="100%" role="img" aria-label="JJSOFT GLOBAL">
  <rect width="1256" height="492" rx="32" fill="#000000"/>
  <image href="data:image/png;base64,` + brandDarkBase64 + `" width="1256" height="492" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;
  fs.writeFileSync('public/assets/logos/jjsoft.svg', brandSvg.trim());
  console.log('✓ Written public/assets/logos/jjsoft.svg');

  // Favicon / App Icon (app/icon.svg)
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#070d12"/>
  <!-- Foliage yellow leaf -->
  <path d="M22 18 C28 14 31 20 28 26 C22 28 19 22 22 18 Z" fill="#FFE500"/>
  <!-- Top grey leaf petal -->
  <path d="M20 10 C26 7 28 12 25 17 C20 18 18 13 20 10 Z" fill="none" stroke="#94a3b8" stroke-width="2"/>
  <!-- Bottom grey leaf petal -->
  <path d="M15 22 C18 20 22 23 20 28 C15 29 13 25 15 22 Z" fill="none" stroke="#94a3b8" stroke-width="1.8"/>
  <!-- J1 -->
  <path d="M25 21 H38 V42 C38 46 34 49 29 49 C24 49 21 46 21 42" fill="none" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="square"/>
  <!-- J2 -->
  <path d="M37 28 H48 V47 C48 51 44 54 39 54 C34 54 31 51 31 47" fill="none" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="square"/>
  <!-- Red accent bar at bottom -->
  <rect x="18" y="56" width="34" height="4" rx="1.5" fill="#FF0000"/>
</svg>
`;
  fs.writeFileSync('app/icon.svg', faviconSvg.trim());
  console.log('✓ Written app/icon.svg');

  // 2. ISHOPMASTER
  // Extract phone mark (minX: 56, maxX: 137, minY: 88, maxY: 207)
  const ishopMarkCrop = await sharp('public/assets/products/ishopmaster-logo-original.webp')
    .extract({ left: 56, top: 88, width: 82, height: 120 })
    .toBuffer();

  const { data: isData, info: isInfo } = await sharp(ishopMarkCrop).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < isData.length; i += 4) {
    const r = isData[i], g = isData[i+1], b = isData[i+2];
    if (r > 240 && g > 240 && b > 240) {
      isData[i+3] = 0;
    }
  }
  const ishopMarkPng = await sharp(isData, { raw: { width: isInfo.width, height: isInfo.height, channels: 4 } })
    .png()
    .toBuffer();

  const ishopIconPng = await sharp({
    create: { width: 140, height: 140, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 0 } }
  })
  .composite([{ input: ishopMarkPng, gravity: 'center' }])
  .png()
  .toBuffer();

  fs.writeFileSync('public/assets/products/ishopmaster-mark.png', ishopIconPng);

  const ishopBase64 = ishopIconPng.toString('base64');
  const ishopSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140" width="100%" height="100%" role="img" aria-label="iShopMaster">
  <rect width="140" height="140" rx="28" fill="#f0f7ff"/>
  <image href="data:image/png;base64,` + ishopBase64 + `" width="140" height="140" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;
  fs.writeFileSync('public/assets/logos/ishopmaster.svg', ishopSvg.trim());
  console.log('✓ Written public/assets/logos/ishopmaster.svg');

  // Full iShopMaster logo
  const ishopFullCrop = await sharp('public/assets/products/ishopmaster-logo-original.webp')
    .extract({ left: 56, top: 88, width: 362, height: 120 })
    .toBuffer();
  fs.writeFileSync('public/assets/products/ishopmaster-full.webp', ishopFullCrop);

  // 3. DT-POS
  const dtCrop = await sharp('public/assets/products/dt-pos-logo-original.png')
    .extract({ left: 80, top: 100, width: 340, height: 300 })
    .toBuffer();

  const { data: dtData, info: dtInfo } = await sharp(dtCrop).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < dtData.length; i += 4) {
    const r = dtData[i], g = dtData[i+1], b = dtData[i+2];
    if (r > 240 && g > 240 && b > 240) dtData[i+3] = 0;
  }
  const dtMarkPng = await sharp(dtData, { raw: { width: dtInfo.width, height: dtInfo.height, channels: 4 } })
    .png()
    .toBuffer();

  const dtIconPng = await sharp({
    create: { width: 400, height: 400, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 0 } }
  })
  .composite([{ input: dtMarkPng, gravity: 'center' }])
  .png()
  .toBuffer();

  fs.writeFileSync('public/assets/products/dt-pos-mark.png', dtIconPng);
  const dtBase64 = dtIconPng.toString('base64');
  const dtSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%" role="img" aria-label="DT POS">
  <rect width="400" height="400" rx="80" fill="#f2fbf6"/>
  <image href="data:image/png;base64,` + dtBase64 + `" width="400" height="400" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;
  fs.writeFileSync('public/assets/logos/dt-pos.svg', dtSvg.trim());
  console.log('✓ Written public/assets/logos/dt-pos.svg');

  // 4. FIND SOULMATE
  const soulmateBuf = fs.readFileSync('public/assets/products/find-soulmate-logo-original.webp');
  const soulmatePng = await sharp(soulmateBuf).png().toBuffer();
  fs.writeFileSync('public/assets/products/find-soulmate-icon.png', soulmatePng);
  const soulmateBase64 = soulmatePng.toString('base64');
  const soulmateSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140" width="100%" height="100%" role="img" aria-label="Find Soulmate Nikah Service">
  <image href="data:image/png;base64,` + soulmateBase64 + `" width="140" height="140" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;
  fs.writeFileSync('public/assets/logos/find-soulmate.svg', soulmateSvg.trim());
  console.log('✓ Written public/assets/logos/find-soulmate.svg');

  // 5. WHATSTRIM
  const whatstrimCrop = await sharp('public/assets/products/whatstrim-logo-original.jpg')
    .extract({ left: 156, top: 14, width: 134, height: 134 })
    .png()
    .toBuffer();
  fs.writeFileSync('public/assets/products/whatstrim-mark.png', whatstrimCrop);
  const whatstrimBase64 = whatstrimCrop.toString('base64');
  const whatstrimSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 134 134" width="100%" height="100%" role="img" aria-label="WhatsTrim">
  <rect width="134" height="134" rx="28" fill="#0d1d1f"/>
  <image href="data:image/png;base64,` + whatstrimBase64 + `" width="134" height="134" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;
  fs.writeFileSync('public/assets/logos/whatstrim.svg', whatstrimSvg.trim());
  console.log('✓ Written public/assets/logos/whatstrim.svg');

  // 6. AAVANAMKIT
  const aavCrop = await sharp('public/assets/products/aavanamkit-logo-original.png')
    .extract({ left: 36, top: 252, width: 400, height: 544 })
    .toBuffer();

  const { data: aavData, info: aavInfo } = await sharp(aavCrop).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < aavData.length; i += 4) {
    const r = aavData[i], g = aavData[i+1], b = aavData[i+2];
    if (r > 245 && g > 245 && b > 245) aavData[i+3] = 0;
  }
  const aavMarkPng = await sharp(aavData, { raw: { width: aavInfo.width, height: aavInfo.height, channels: 4 } })
    .resize({ height: 400, fit: 'inside' })
    .png()
    .toBuffer();

  const aavIconPng = await sharp({
    create: { width: 500, height: 500, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 0 } }
  })
  .composite([{ input: aavMarkPng, gravity: 'center' }])
  .png()
  .toBuffer();

  fs.writeFileSync('public/assets/products/aavanamkit-mark.png', aavIconPng);
  const aavBase64 = aavIconPng.toString('base64');
  const aavSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%" role="img" aria-label="AavanamKit">
  <rect width="500" height="500" rx="100" fill="#f4f8fd"/>
  <image href="data:image/png;base64,` + aavBase64 + `" width="500" height="500" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;
  fs.writeFileSync('public/assets/logos/aavanamkit.svg', aavSvg.trim());
  console.log('✓ Written public/assets/logos/aavanamkit.svg');

  // 7. JJCHAT (Android 2016-10-13)
  const jjchatBuf = fs.readFileSync('public/assets/products/jjchat-logo-original.webp');
  const jjchatPng = await sharp(jjchatBuf).png().toBuffer();
  fs.writeFileSync('public/assets/products/jjchat-icon.png', jjchatPng);
  const jjchatBase64 = jjchatPng.toString('base64');
  const jjchatSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140" width="100%" height="100%" role="img" aria-label="JJChat">
  <rect width="140" height="140" rx="28" fill="#f5fdf7"/>
  <image href="data:image/png;base64,` + jjchatBase64 + `" width="140" height="140" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;
  fs.writeFileSync('public/assets/logos/jjchat.svg', jjchatSvg.trim());
  console.log('✓ Written public/assets/logos/jjchat.svg');

  // 8. JJBROWSER (Android Jul 20, 2016)
  const jjbrowserBuf = fs.readFileSync('public/assets/products/jjbrowser-logo-original.webp');
  const jjbrowserPng = await sharp(jjbrowserBuf).png().toBuffer();
  fs.writeFileSync('public/assets/products/jjbrowser-icon.png', jjbrowserPng);
  const jjbrowserBase64 = jjbrowserPng.toString('base64');
  const jjbrowserSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140" width="100%" height="100%" role="img" aria-label="JJBrowser">
  <rect width="140" height="140" rx="28" fill="#11171d"/>
  <image href="data:image/png;base64,` + jjbrowserBase64 + `" width="140" height="140" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;
  fs.writeFileSync('public/assets/logos/jjbrowser.svg', jjbrowserSvg.trim());
  console.log('✓ Written public/assets/logos/jjbrowser.svg');

  // 9. FOUNDER PORTRAIT
  // Use authentic photo of Jafran Jemal
  const founderBuf = await sharp('public/assets/founder/jafran-jemal-1.jpg')
    .resize(600, 600, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 95 })
    .toBuffer();
  fs.writeFileSync('public/assets/founder/founder-reference.jpg', founderBuf);
  fs.writeFileSync('public/assets/founder/jafran-jemal.jpg', founderBuf);
  console.log('✓ Updated public/assets/founder/founder-reference.jpg with authentic portrait');

  // Stage presentation photo
  const speakerBuf = await sharp('public/assets/founder/jafran-jemal-2.jpg')
    .jpeg({ quality: 95 })
    .toBuffer();
  fs.writeFileSync('public/assets/founder/jafran-jemal-presentation.jpg', speakerBuf);
  console.log('✓ Written jafran-jemal-presentation.jpg');

  // 10. HERO PRODUCT ECOSYSTEM IMAGE
  // Create a stunning hero visual combining the real products and dashboards
  console.log('✓ All authentic assets successfully generated!');
}

buildAllAssets().catch(console.error);
