const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateTabletScreen() {
  const W = 1024;
  const H = 1536;

  // Path to the real transparent logo
  const logoPath = path.join(__dirname, '../public/assets/brand/jjsoft-brand-transparent.png');
  let logoBuffer = null;
  if (fs.existsSync(logoPath)) {
    logoBuffer = await sharp(logoPath)
      .resize({ width: 720 })
      .toBuffer();
  }

  // Generate SVG backdrop with cyberwave & text
  const wavePoints = [];
  for (let i = 0; i <= 60; i++) {
    const x = (i / 60) * W;
    const y1 = H - 240 + Math.sin(i * 0.18) * 80 + Math.cos(i * 0.35) * 40;
    const y2 = H - 180 + Math.sin(i * 0.15 + 1.2) * 90 + Math.cos(i * 0.28) * 50;
    wavePoints.push({ x, y1, y2 });
  }

  let waveSvg = '';
  // Draw wave curves
  for (let step = 0; step < 18; step++) {
    const factor = step / 18;
    const opacity = 0.15 + factor * 0.55;
    const r = Math.round(255 * (1 - factor * 0.4));
    const g = Math.round(30 + factor * 140);
    const b = Math.round(60 + factor * 190);
    const color = `rgba(${r}, ${g}, ${b}, ${opacity.toFixed(2)})`;
    
    let pathD = `M 0 ${H - 260 + step * 10} `;
    for (let i = 0; i < wavePoints.length; i++) {
      const p = wavePoints[i];
      const y = p.y1 * (1 - factor) + p.y2 * factor + (step - 9) * 12;
      pathD += `L ${p.x.toFixed(1)} ${y.toFixed(1)} `;
    }
    waveSvg += `<path d="${pathD}" fill="none" stroke="${color}" stroke-width="${1.2 + factor * 0.8}" />\n`;
  }

  const svgBg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="centerGlow" cx="50%" cy="42%" r="50%">
        <stop offset="0%" stop-color="#ff1837" stop-opacity="0.14" />
        <stop offset="50%" stop-color="#0b172a" stop-opacity="0.4" />
        <stop offset="100%" stop-color="#020408" stop-opacity="1" />
      </radialGradient>
      <linearGradient id="vignette" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#040810" />
        <stop offset="50%" stop-color="#08101e" />
        <stop offset="100%" stop-color="#020407" />
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#vignette)" />
    <circle cx="${W/2}" cy="${H*0.42}" r="460" fill="url(#centerGlow)" />
    
    <!-- Cyberwave mesh at bottom -->
    <g>
      ${waveSvg}
    </g>

    <!-- Subtitle below logo area -->
    <text x="${W/2}" y="780" 
      font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" 
      font-size="34" 
      font-weight="600" 
      letter-spacing="9" 
      fill="#e2e8f0" 
      text-anchor="middle">
      BUILD <tspan fill="#ff2238">•</tspan> INNOVATE <tspan fill="#ff2238">•</tspan> GROW
    </text>
  </svg>
  `;

  const bgBuffer = Buffer.from(svgBg);
  
  const composites = [
    { input: bgBuffer, top: 0, left: 0 }
  ];

  if (logoBuffer) {
    const logoMeta = await sharp(logoBuffer).metadata();
    const logoTop = 420;
    const logoLeft = Math.round((W - logoMeta.width) / 2);
    composites.push({
      input: logoBuffer,
      top: logoTop,
      left: logoLeft
    });
  }

  const outputPath = path.join(__dirname, '../public/assets/dashboard-tablet.jpg');
  await sharp({
    create: {
      width: W,
      height: H,
      channels: 3,
      background: { r: 2, g: 4, b: 8 }
    }
  })
  .composite(composites)
  .jpeg({ quality: 95 })
  .toFile(outputPath);

  console.log('Created tablet branding texture:', outputPath);
}

async function generateLaptopScreen() {
  const W = 1440;
  const H = 900;

  const svgContent = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ff1e38" stop-opacity="0.45" />
        <stop offset="60%" stop-color="#ff1e38" stop-opacity="0.12" />
        <stop offset="100%" stop-color="#ff1e38" stop-opacity="0.0" />
      </linearGradient>
      <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#121a28" />
        <stop offset="100%" stop-color="#0c121c" />
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="#080d15" />

    <!-- Sidebar -->
    <rect x="0" y="0" width="220" height="${H}" fill="#0a101a" stroke="#162234" stroke-width="1" />
    
    <!-- Logo in sidebar -->
    <rect x="24" y="24" width="34" height="34" rx="8" fill="#ff1837" />
    <text x="41" y="47" font-family="sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">JJ</text>
    <text x="68" y="46" font-family="sans-serif" font-size="16" font-weight="700" fill="#ffffff">JJSOFT</text>
    <text x="68" y="58" font-family="sans-serif" font-size="9" font-weight="700" fill="#ff3b52" letter-spacing="1">CLOUD CONSOLE</text>

    <!-- Nav items -->
    <rect x="16" y="90" width="188" height="38" rx="6" fill="#ff1837" fill-opacity="0.15" stroke="#ff1837" stroke-opacity="0.4" stroke-width="1" />
    <text x="48" y="114" font-family="sans-serif" font-size="13" font-weight="600" fill="#ffffff">Dashboard Overview</text>
    <circle cx="32" cy="110" r="4" fill="#ff2238" />

    <text x="48" y="152" font-family="sans-serif" font-size="13" fill="#8ba0b8">Global Network</text>
    <text x="48" y="188" font-family="sans-serif" font-size="13" fill="#8ba0b8">API Infrastructure</text>
    <text x="48" y="224" font-family="sans-serif" font-size="13" fill="#8ba0b8">Cloud Databases</text>
    <text x="48" y="260" font-family="sans-serif" font-size="13" fill="#8ba0b8">Security &amp; IAM</text>
    <text x="48" y="296" font-family="sans-serif" font-size="13" fill="#8ba0b8">System Settings</text>

    <!-- Top header bar -->
    <rect x="220" y="0" width="${W - 220}" height="68" fill="#0c121e" stroke="#162234" stroke-width="1" />
    <text x="248" y="41" font-family="sans-serif" font-size="18" font-weight="700" fill="#ffffff">Enterprise Telemetry &amp; Operations</text>
    
    <!-- Live status pill -->
    <rect x="${W - 260}" y="20" width="140" height="28" rx="14" fill="#0d2419" stroke="#15803d" stroke-width="1" />
    <circle cx="${W - 246}" cy="34" r="4" fill="#22c55e" />
    <text x="${W - 234}" y="38" font-family="sans-serif" font-size="11" font-weight="600" fill="#86efac">ALL SYSTEMS LIVE</text>

    <!-- KPI Metric Cards -->
    <!-- Card 1 -->
    <rect x="248" y="92" width="360" height="116" rx="10" fill="url(#cardGrad)" stroke="#1a273b" stroke-width="1" />
    <text x="272" y="124" font-family="sans-serif" font-size="12" font-weight="600" fill="#7a8ea4" letter-spacing="0.5">ACTIVE CLOUD NODES</text>
    <text x="272" y="166" font-family="sans-serif" font-size="34" font-weight="800" fill="#ffffff">1,428</text>
    <text x="375" y="164" font-family="sans-serif" font-size="12" font-weight="700" fill="#22c55e">+14.2% ↑</text>
    <text x="272" y="188" font-family="sans-serif" font-size="11" fill="#4d637c">Spanning 14 international regions</text>

    <!-- Card 2 -->
    <rect x="628" y="92" width="360" height="116" rx="10" fill="url(#cardGrad)" stroke="#1a273b" stroke-width="1" />
    <text x="652" y="124" font-family="sans-serif" font-size="12" font-weight="600" fill="#7a8ea4" letter-spacing="0.5">GLOBAL THROUGHPUT</text>
    <text x="652" y="166" font-family="sans-serif" font-size="34" font-weight="800" fill="#ffffff">48.6 TB/s</text>
    <text x="815" y="164" font-family="sans-serif" font-size="12" font-weight="700" fill="#ff384d">Peak load</text>
    <text x="652" y="188" font-family="sans-serif" font-size="11" fill="#4d637c">Zero packet loss recorded</text>

    <!-- Card 3 -->
    <rect x="1008" y="92" width="360" height="116" rx="10" fill="url(#cardGrad)" stroke="#1a273b" stroke-width="1" />
    <text x="1032" y="124" font-family="sans-serif" font-size="12" font-weight="600" fill="#7a8ea4" letter-spacing="0.5">PLATFORM UPTIME</text>
    <text x="1032" y="166" font-family="sans-serif" font-size="34" font-weight="800" fill="#ffffff">99.994%</text>
    <text x="1200" y="164" font-family="sans-serif" font-size="12" font-weight="700" fill="#22c55e">SLA Met</text>
    <text x="1032" y="188" font-family="sans-serif" font-size="11" fill="#4d637c">Colombo HQ Primary Cluster</text>

    <!-- Main Chart Panel -->
    <rect x="248" y="232" width="${W - 320}" height="420" rx="12" fill="url(#cardGrad)" stroke="#1a273b" stroke-width="1" />
    <text x="278" y="272" font-family="sans-serif" font-size="16" font-weight="700" fill="#ffffff">Global Network Latency &amp; Demand Distribution</text>
    <text x="278" y="292" font-family="sans-serif" font-size="12" fill="#7a8ea4">Real-time edge computation stream</text>

    <!-- Grid lines -->
    <line x1="278" y1="340" x2="${W - 100}" y2="340" stroke="#162030" stroke-width="1" stroke-dasharray="4" />
    <line x1="278" y1="410" x2="${W - 100}" y2="410" stroke="#162030" stroke-width="1" stroke-dasharray="4" />
    <line x1="278" y1="480" x2="${W - 100}" y2="480" stroke="#162030" stroke-width="1" stroke-dasharray="4" />
    <line x1="278" y1="550" x2="${W - 100}" y2="550" stroke="#162030" stroke-width="1" stroke-dasharray="4" />

    <!-- Wave Chart Path -->
    <path d="M 278 540 
             Q 380 440, 480 470 
             T 680 390 
             T 880 430 
             T 1080 350 
             T 1240 320 
             L 1240 590 
             L 278 590 Z" 
          fill="url(#chartGrad)" />
    
    <path d="M 278 540 
             Q 380 440, 480 470 
             T 680 390 
             T 880 430 
             T 1080 350 
             T 1240 320" 
          fill="none" stroke="#ff203a" stroke-width="3.5" />

    <!-- Peak highlight dot -->
    <circle cx="1080" cy="350" r="6" fill="#ffffff" stroke="#ff1837" stroke-width="3" />
    <rect x="1030" y="300" width="100" height="34" rx="6" fill="#ff1837" />
    <text x="1080" y="322" font-family="sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">18.4 ms Peak</text>

    <!-- Bottom sub-cards -->
    <rect x="248" y="674" width="530" height="190" rx="10" fill="url(#cardGrad)" stroke="#1a273b" stroke-width="1" />
    <text x="272" y="706" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffffff">Enterprise Microservices</text>
    <rect x="272" y="724" width="480" height="12" rx="6" fill="#141e2e" />
    <rect x="272" y="724" width="380" height="12" rx="6" fill="#ff1837" />
    <text x="272" y="756" font-family="sans-serif" font-size="12" fill="#8ba0b8">iShopMaster • Court Automation • Aavanam ERP</text>

    <rect x="808" y="674" width="560" height="190" rx="10" fill="url(#cardGrad)" stroke="#1a273b" stroke-width="1" />
    <text x="832" y="706" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffffff">Security Operations Center</text>
    <text x="832" y="736" font-family="sans-serif" font-size="12" fill="#22c55e">✓ Zero vulnerabilities detected</text>
    <text x="832" y="758" font-family="sans-serif" font-size="12" fill="#22c55e">✓ End-to-end TLS 1.3 encryption active</text>
    <text x="832" y="780" font-family="sans-serif" font-size="12" fill="#8ba0b8">Automated disaster recovery sync every 60s</text>
  </svg>
  `;

  const outputPath = path.join(__dirname, '../public/assets/dashboard-laptop.jpg');
  await sharp(Buffer.from(svgContent))
    .jpeg({ quality: 95 })
    .toFile(outputPath);

  console.log('Created laptop dashboard texture:', outputPath);
}

async function generatePhoneScreen() {
  const W = 540;
  const H = 1140;

  const svgContent = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="phoneChart" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ff1837" stop-opacity="0.5" />
        <stop offset="100%" stop-color="#ff1837" stop-opacity="0.0" />
      </linearGradient>
      <linearGradient id="phoneCard" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#141b27" />
        <stop offset="100%" stop-color="#0b111a" />
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="#060a10" />

    <!-- Status Bar -->
    <text x="36" y="44" font-family="sans-serif" font-size="15" font-weight="700" fill="#ffffff">9:41</text>
    <circle cx="${W - 60}" cy="38" r="4" fill="#ffffff" />
    <rect x="${W - 48}" y="32" width="22" height="12" rx="3" fill="none" stroke="#ffffff" stroke-width="1.5" />
    <rect x="${W - 46}" y="34" width="14" height="8" rx="1.5" fill="#ffffff" />

    <!-- App Header -->
    <rect x="28" y="74" width="38" height="38" rx="10" fill="#ff1837" />
    <text x="47" y="99" font-family="sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">JJ</text>
    <text x="78" y="94" font-family="sans-serif" font-size="17" font-weight="700" fill="#ffffff">JJSOFT Mobile</text>
    <text x="78" y="108" font-family="sans-serif" font-size="11" fill="#7d91a6">Operations Control</text>

    <!-- Primary KPI Card -->
    <rect x="28" y="140" width="${W - 56}" height="180" rx="16" fill="url(#phoneCard)" stroke="#1a2536" stroke-width="1" />
    <text x="52" y="178" font-family="sans-serif" font-size="13" font-weight="600" fill="#7a8ea4">TOTAL CLIENT REACH</text>
    <text x="52" y="226" font-family="sans-serif" font-size="40" font-weight="800" fill="#ffffff">24.5M</text>
    <text x="210" y="224" font-family="sans-serif" font-size="14" font-weight="700" fill="#22c55e">+28% ↑</text>
    <text x="52" y="258" font-family="sans-serif" font-size="12" fill="#586f87">Across Asia, Europe &amp; Americas</text>
    <rect x="52" y="278" width="${W - 104}" height="6" rx="3" fill="#141e2c" />
    <rect x="52" y="278" width="${(W - 104) * 0.76}" height="6" rx="3" fill="#ff1837" />

    <!-- Quick Action Grid -->
    <text x="28" y="356" font-family="sans-serif" font-size="16" font-weight="700" fill="#ffffff">Instant Controls</text>
    
    <rect x="28" y="374" width="${(W - 76) / 2}" height="84" rx="14" fill="url(#phoneCard)" stroke="#1a2536" stroke-width="1" />
    <circle cx="56" cy="406" r="14" fill="#ff1837" fill-opacity="0.2" />
    <text x="56" y="411" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ff384d" text-anchor="middle">⚡</text>
    <text x="80" y="411" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffffff">Scale Pods</text>
    <text x="80" y="430" font-family="sans-serif" font-size="11" fill="#7a8ea4">Auto-balanced</text>

    <rect x="${W/2 + 10}" y="374" width="${(W - 76) / 2}" height="84" rx="14" fill="url(#phoneCard)" stroke="#1a2536" stroke-width="1" />
    <circle cx="${W/2 + 38}" cy="406" r="14" fill="#22c55e" fill-opacity="0.2" />
    <text x="${W/2 + 38}" y="411" font-family="sans-serif" font-size="12" font-weight="bold" fill="#22c55e" text-anchor="middle">🛡</text>
    <text x="${W/2 + 62}" y="411" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffffff">Security</text>
    <text x="${W/2 + 62}" y="430" font-family="sans-serif" font-size="11" fill="#7a8ea4">Shield 100%</text>

    <!-- Telemetry Graph Card -->
    <rect x="28" y="480" width="${W - 56}" height="380" rx="16" fill="url(#phoneCard)" stroke="#1a2536" stroke-width="1" />
    <text x="52" y="520" font-family="sans-serif" font-size="15" font-weight="700" fill="#ffffff">Throughput Analytics</text>
    <text x="52" y="540" font-family="sans-serif" font-size="12" fill="#7a8ea4">Real-time edge transactions</text>

    <path d="M 52 760 
             Q 130 680, 200 710 
             T 340 620 
             T 480 580 
             L 480 810 
             L 52 810 Z" 
          fill="url(#phoneChart)" />
    
    <path d="M 52 760 
             Q 130 680, 200 710 
             T 340 620 
             T 480 580" 
          fill="none" stroke="#ff1f3a" stroke-width="3" />

    <circle cx="340" cy="620" r="5" fill="#ffffff" stroke="#ff1837" stroke-width="2.5" />
    <text x="340" y="598" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ff3b52" text-anchor="middle">99.8% Speed</text>

    <!-- Bottom Navigation Bar -->
    <rect x="0" y="${H - 96}" width="${W}" height="96" fill="#090e17" stroke="#162234" stroke-width="1" />
    <circle cx="${W * 0.2}" cy="${H - 52}" r="18" fill="#ff1837" />
    <text x="${W * 0.2}" y="${H - 46}" font-family="sans-serif" font-size="14" fill="#ffffff" text-anchor="middle">⌂</text>

    <text x="${W * 0.4}" y="${H - 46}" font-family="sans-serif" font-size="17" fill="#6d8299" text-anchor="middle">📊</text>
    <text x="${W * 0.6}" y="${H - 46}" font-family="sans-serif" font-size="17" fill="#6d8299" text-anchor="middle">⚡</text>
    <text x="${W * 0.8}" y="${H - 46}" font-family="sans-serif" font-size="17" fill="#6d8299" text-anchor="middle">⚙</text>
  </svg>
  `;

  const outputPath = path.join(__dirname, '../public/assets/dashboard-phone.jpg');
  await sharp(Buffer.from(svgContent))
    .jpeg({ quality: 95 })
    .toFile(outputPath);

  console.log('Created phone dashboard texture:', outputPath);
}

async function main() {
  await generateTabletScreen();
  await generateLaptopScreen();
  await generatePhoneScreen();
  console.log('All screen textures successfully generated!');
}

main().catch(err => {
  console.error('Error generating screen textures:', err);
  process.exit(1);
});
