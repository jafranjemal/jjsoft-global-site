const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function run() {
  const targetDir = path.join(__dirname, '..', 'public', 'assets', 'images');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // 1. Logo
  const brandDarkSrc = path.join(__dirname, '..', 'public', 'assets', 'brand', 'jjsoft-brand-dark.png');
  const logoExtracted = path.join(__dirname, '..', 'public', 'assets', 'reference-extracted', 'brand-logo.png');
  const finalLogoSrc = fs.existsSync(brandDarkSrc) ? brandDarkSrc : logoExtracted;
  fs.copyFileSync(finalLogoSrc, path.join(targetDir, 'jjsoft-logo.png'));
  console.log('✓ Copied jjsoft-logo.png');

  // 2. About Office
  const officeSrc = path.join(__dirname, '..', 'public', 'assets', 'about', 'office-workspace.jpg');
  const metaOffice = await sharp(officeSrc).metadata();
  await sharp(officeSrc)
    .extract({ left: 0, top: 0, width: Math.round(metaOffice.width * 0.72), height: metaOffice.height })
    .resize(1000, 781, { fit: 'cover' })
    .png()
    .toFile(path.join(targetDir, 'about-office.png'));
  console.log('✓ Generated clean about-office.png');

  // 3. Hero Visual from user's latest upload
  const userUploadPath = 'C:\\Users\\JJSOFT-GLOBAL\\.gemini\\antigravity-ide\\brain\\ff92a4f0-8fe1-4b2b-b238-49cab81dbc47\\.user_uploaded\\media_1789042143378.png';
  const fallbackPath = path.join(__dirname, '..', 'public', 'assets', 'hero', 'hero-cosmic-vignette.png');
  const heroSrc = fs.existsSync(userUploadPath) ? userUploadPath : fallbackPath;

  const metaHero = await sharp(heroSrc).metadata();
  // We upscale to 1200x821 with lanczos3 for maximum crispness on big screens
  const targetW = 1200;
  const targetH = Math.round((metaHero.height / metaHero.width) * 1200);

  const heroResized = await sharp(heroSrc)
    .resize(targetW, targetH, { kernel: 'lanczos3' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = heroResized;

  // Key out the background void pixels
  // In the background void, max(r,g,b) <= 20.
  // This lets the rings and radar wave pulses behind the image shine through,
  // while the laptop screen, tablet, phone, rock pedestal, and Earth globe remain 100% opaque.
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const maxC = Math.max(r, g, b);

    if (maxC <= 18) {
      data[i + 3] = 0;
    } else if (maxC < 42) {
      // Smooth feather ramp
      const t = (maxC - 18) / (42 - 18);
      data[i + 3] = Math.round(t * t * 255);
    }
  }

  // Create an elliptical feathering mask that smoothly tapers the edges to transparent
  const maskSvg = Buffer.from(
    '<svg width="' + targetW + '" height="' + targetH + '">' +
    '<defs>' +
    '<radialGradient id="fade" cx="50%" cy="50%" rx="49%" ry="48%">' +
    '<stop offset="80%" stop-color="#ffffff" stop-opacity="1" />' +
    '<stop offset="94%" stop-color="#ffffff" stop-opacity="0.75" />' +
    '<stop offset="99%" stop-color="#ffffff" stop-opacity="0.1" />' +
    '<stop offset="100%" stop-color="#ffffff" stop-opacity="0" />' +
    '</radialGradient>' +
    '</defs>' +
    '<rect width="' + targetW + '" height="' + targetH + '" fill="url(#fade)" />' +
    '</svg>'
  );

  const maskPng = await sharp(maskSvg).png().toBuffer();

  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .composite([{ input: maskPng, blend: 'dest-in' }])
    .png({ quality: 100, compressionLevel: 6 })
    .toFile(path.join(targetDir, 'hero-network-devices.png'));

  console.log('✓ Generated high-res transparent-keyed hero-network-devices.png (' + targetW + 'x' + targetH + ')');
}

run().catch(console.error);
