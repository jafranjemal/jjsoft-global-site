const sharp = require('sharp');
const fs = require('fs');

async function buildHeroGraphic() {
  const ishopMark = fs.readFileSync('public/assets/products/ishopmaster-mark.png').toString('base64');
  const dtMark = fs.readFileSync('public/assets/products/dt-pos-mark.png').toString('base64');
  const aavMark = fs.readFileSync('public/assets/products/aavanamkit-mark.png').toString('base64');
  const soulMark = fs.readFileSync('public/assets/products/find-soulmate-icon.png').toString('base64');
  const jjchatMark = fs.readFileSync('public/assets/products/jjchat-icon.png').toString('base64');

  const width = 1180;
  const height = 640;

  const heroSvg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <radialGradient id="bg-glow" cx="75%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#1e3a5f" stop-opacity="0.5"/>
      <stop offset="50%" stop-color="#0d1d2d" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#070d12" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="card-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a2530" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0e171f" stop-opacity="0.9"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="14" stdDeviation="20" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Dark Background -->
  <rect width="${width}" height="${height}" fill="#070d12"/>
  <circle cx="880" cy="320" r="420" fill="url(#bg-glow)"/>
  <circle cx="300" cy="460" r="280" fill="url(#bg-glow)" opacity="0.6"/>

  <!-- Subtle Blueprint Tech Lines -->
  <g opacity="0.08" stroke="#8ec8ff" stroke-width="1">
    <line x1="0" y1="160" x2="1180" y2="160"/>
    <line x1="0" y1="320" x2="1180" y2="320"/>
    <line x1="0" y1="480" x2="1180" y2="480"/>
    <line x1="295" y1="0" x2="295" y2="640"/>
    <line x1="590" y1="0" x2="590" y2="640"/>
    <line x1="885" y1="0" x2="885" y2="640"/>
  </g>

  <!-- Central Laptop Mockup (iShopMaster ERP Dashboard) -->
  <g transform="translate(240, 130)" filter="url(#glow)">
    <!-- Laptop screen outer frame -->
    <rect x="0" y="0" width="530" height="335" rx="14" fill="#1b2530" stroke="#334454" stroke-width="2"/>
    <!-- Screen display -->
    <rect x="10" y="10" width="510" height="315" rx="6" fill="#0c141a"/>
    <!-- Screen Header -->
    <rect x="10" y="10" width="510" height="34" fill="#15212b"/>
    <circle cx="28" cy="27" r="4" fill="#ef4444"/>
    <circle cx="40" cy="27" r="4" fill="#eab308"/>
    <circle cx="52" cy="27" r="4" fill="#22c55e"/>
    <text x="76" y="31" fill="#94a3b8" font-family="sans-serif" font-size="11" font-weight="bold">iShopMaster Enterprise POS &amp; ERP Cloud</text>
    
    <!-- Sidebar -->
    <rect x="10" y="44" width="105" height="281" fill="#0e171f"/>
    <rect x="22" y="60" width="80" height="8" rx="4" fill="#1e293b"/>
    <rect x="22" y="80" width="70" height="8" rx="4" fill="#1e293b"/>
    <rect x="22" y="100" width="75" height="8" rx="4" fill="#0284c7" opacity="0.8"/>
    <rect x="22" y="120" width="60" height="8" rx="4" fill="#1e293b"/>
    <rect x="22" y="140" width="72" height="8" rx="4" fill="#1e293b"/>
    <rect x="22" y="160" width="65" height="8" rx="4" fill="#1e293b"/>
    
    <!-- KPI Cards in Dashboard Area -->
    <rect x=\"128\" y=\"58\" width=\"112\" height=\"56\" rx=\"6\" fill=\"#16232e\" stroke=\"#243342\" stroke-width=\"1\"/>
    <text x=\"138\" y=\"76\" fill=\"#64748b\" font-family=\"sans-serif\" font-size=\"9\">Total Sales Today</text>
    <text x=\"138\" y=\"100\" fill=\"#38bdf8\" font-family=\"sans-serif\" font-size=\"16\" font-weight=\"bold\">$48,920</text>

    <rect x=\"250\" y=\"58\" width=\"112\" height=\"56\" rx=\"6\" fill=\"#16232e\" stroke=\"#243342\" stroke-width=\"1\"/>
    <text x=\"260\" y=\"76\" fill=\"#64748b\" font-family=\"sans-serif\" font-size=\"9\">Repairs Active</text>
    <text x=\"260\" y=\"100\" fill=\"#10b981\" font-family=\"sans-serif\" font-size=\"16\" font-weight=\"bold\">184 units</text>

    <rect x=\"372\" y=\"58\" width=\"138\" height=\"56\" rx=\"6\" fill=\"#16232e\" stroke=\"#243342\" stroke-width=\"1\"/>
    <text x=\"382\" y=\"76\" fill=\"#64748b\" font-family=\"sans-serif\" font-size=\"9\">Multi-Branch Items</text>
    <text x=\"382\" y=\"100\" fill=\"#f59e0b\" font-family=\"sans-serif\" font-size=\"16\" font-weight=\"bold\">5,412 items</text>

    <!-- Chart Visual -->
    <rect x=\"128\" y=\"126\" width=\"382\" height=\"188\" rx=\"6\" fill=\"#111c24\" stroke=\"#202e3b\" stroke-width=\"1\"/>
    <text x=\"142\" y=\"148\" fill=\"#94a3b8\" font-family=\"sans-serif\" font-size=\"11\" font-weight=\"600\">Real-Time Retail &amp; Multi-Branch Synchronization</text>
    <!-- Bar charts -->
    <rect x=\"150\" y=\"240\" width=\"28\" height=\"50\" rx=\"3\" fill=\"#0ea5e9\" opacity=\"0.5\"/>
    <rect x=\"192\" y=\"218\" width=\"28\" height=\"72\" rx=\"3\" fill=\"#0ea5e9\" opacity=\"0.7\"/>
    <rect x=\"234\" y=\"188\" width=\"28\" height=\"102\" rx=\"3\" fill=\"#0ea5e9\" opacity=\"0.85\"/>
    <rect x=\"276\" y=\"166\" width=\"28\" height=\"124\" rx=\"3\" fill=\"#38bdf8\"/>
    <rect x=\"318\" y=\"198\" width=\"28\" height=\"92\" rx=\"3\" fill=\"#0ea5e9\" opacity=\"0.75\"/>
    <rect x=\"360\" y=\"176\" width=\"28\" height=\"114\" rx=\"3\" fill=\"#0ea5e9\" opacity=\"0.8\"/>
    <rect x=\"402\" y=\"156\" width=\"28\" height=\"134\" rx=\"3\" fill=\"#38bdf8\"/>
    <rect x=\"444\" y=\"206\" width=\"28\" height=\"84\" rx=\"3\" fill=\"#0ea5e9\" opacity=\"0.7\"/>

    <!-- Laptop Base -->
    <path d=\"M -40 335 L 570 335 L 538 348 L -10 348 Z\" fill=\"#2b3846\"/>
    <rect x=\"220\" y=\"336\" width=\"100\" height=\"4\" rx=\"2\" fill=\"#17202a\"/>
  </g>

  <!-- Right Tablet Mockup (DT-POS Elite) -->
  <g transform=\"translate(740, 195)\" filter=\"url(#glow)\">
    <rect x=\"0\" y=\"0\" width=\"225\" height=\"305\" rx=\"14\" fill=\"#1e2936\" stroke=\"#334556\" stroke-width=\"2\"/>
    <rect x=\"8\" y=\"8\" width=\"209\" height=\"289\" rx=\"8\" fill=\"#0a1218\"/>
    <rect x=\"8\" y=\"8\" width=\"209\" height=\"30\" fill=\"#131e27\"/>
    <circle cx=\"112\" cy=\"18\" r=\"3\" fill=\"#475569\"/>
    <!-- DT-POS Header -->
    <rect x=\"18\" y=\"48\" width=\"80\" height=\"8\" rx=\"4\" fill=\"#00965f\"/>
    <rect x=\"18\" y=\"68\" width=\"188\" height=\"48\" rx=\"6\" fill=\"#12201c\" stroke=\"#00965f\" stroke-width=\"1\" opacity=\"0.7\"/>
    <text x=\"28\" y=\"88\" fill=\"#34d399\" font-family=\"sans-serif\" font-size=\"11\" font-weight=\"bold\">DT POS Elite</text>
    <text x=\"28\" y=\"104\" fill=\"#94a3b8\" font-family=\"sans-serif\" font-size=\"9\">Checkout Terminal Active</text>
    <!-- Product Grid in POS -->
    <rect x=\"18\" y=\"126\" width=\"58\" height=\"48\" rx=\"4\" fill=\"#142028\"/>
    <rect x=\"84\" y=\"126\" width=\"58\" height=\"48\" rx=\"4\" fill=\"#142028\"/>
    <rect x=\"148\" y=\"126\" width=\"58\" height=\"48\" rx=\"4\" fill=\"#142028\"/>
    <rect x=\"18\" y=\"182\" width=\"58\" height=\"48\" rx=\"4\" fill=\"#142028\"/>
    <rect x=\"84\" y=\"182\" width=\"58\" height=\"48\" rx=\"4\" fill=\"#142028\"/>
    <rect x=\"148\" y=\"182\" width=\"58\" height=\"48\" rx=\"4\" fill=\"#142028\"/>
    <rect x=\"18\" y=\"242\" width=\"188\" height=\"36\" rx=\"6\" fill=\"#00965f\"/>
    <text x=\"75\" y=\"265\" fill=\"#ffffff\" font-family=\"sans-serif\" font-size=\"11\" font-weight=\"bold\">Checkout Fast</text>
  </g>

  <!-- Left Mobile Phone Mockup (Find Soulmate) -->
  <g transform=\"translate(110, 235)\" filter=\"url(#glow)\">
    <rect x=\"0\" y=\"0\" width=\"142\" height=\"285\" rx=\"22\" fill=\"#1b2530\" stroke=\"#334556\" stroke-width=\"2\"/>
    <rect x=\"6\" y=\"6\" width=\"130\" height=\"273\" rx=\"16\" fill=\"#0a1117\"/>
    <!-- Phone top notch -->
    <rect x=\"45\" y=\"12\" width=\"52\" height=\"8\" rx=\"4\" fill=\"#18232c\"/>
    <!-- App header -->
    <rect x=\"14\" y=\"32\" width=\"114\" height=\"28\" rx=\"6\" fill=\"#3b0d19\" opacity=\"0.6\"/>
    <text x=\"24\" y=\"50\" fill=\"#f43f5e\" font-family=\"sans-serif\" font-size=\"10\" font-weight=\"bold\">Find Soulmate</text>
    <!-- Cards in mobile -->
    <rect x=\"14\" y=\"68\" width=\"114\" height=\"112\" rx=\"10\" fill=\"#18232e\"/>
    <circle cx=\"71\" cy=\"110\" r=\"26\" fill=\"#223240\"/>
    <rect x=\"30\" y=\"148\" width=\"82\" height=\"8\" rx=\"4\" fill=\"#334454\"/>
    <rect x=\"40\" y=\"162\" width=\"62\" height=\"6\" rx=\"3\" fill=\"#f43f5e\" opacity=\"0.7\"/>
    <rect x=\"14\" y=\"190\" width=\"114\" height=\"70\" rx=\"8\" fill=\"#141d24\"/>
    <circle cx=\"32\" cy=\"216\" r=\"10\" fill=\"#f43f5e\" opacity=\"0.8\"/>
    <rect x=\"52\" y=\"208\" width=\"68\" height=\"7\" rx=\"3.5\" fill=\"#38bdf8\"/>
    <rect x=\"52\" y=\"220\" width=\"52\" height=\"5\" rx=\"2.5\" fill=\"#64748b\"/>
  </g>

  <!-- CALLOUT CARDS WITH AUTHENTIC LOGOS -->

  <!-- 1. iShopMaster Callout (Top Left) -->
  <g transform=\"translate(180, 45)\" filter=\"url(#glow)\">
    <rect width=\"245\" height=\"66\" rx=\"12\" fill=\"url(#card-bg)\" stroke=\"#33495d\" stroke-width=\"1.5\"/>
    <rect x=\"12\" y=\"11\" width=\"44\" height=\"44\" rx=\"10\" fill=\"#f0f7ff\"/>
    <image href=\"data:image/png;base64,` + ishopMark + `\" x=\"12\" y=\"11\" width=\"44\" height=\"44\" preserveAspectRatio=\"xMidYMid meet\"/>
    <text x=\"68\" y=\"32\" fill=\"#ffffff\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\">iShopMaster</text>
    <text x=\"68\" y=\"50\" fill=\"#38bdf8\" font-family=\"sans-serif\" font-size=\"11\">Retail · POS · ERP</text>
  </g>

  <!-- 2. DT-POS Callout (Top Right) -->
  <g transform=\"translate(760, 70)\" filter=\"url(#glow)\">
    <rect width=\"235\" height=\"66\" rx=\"12\" fill=\"url(#card-bg)\" stroke=\"#33495d\" stroke-width=\"1.5\"/>
    <rect x=\"12\" y=\"11\" width=\"44\" height=\"44\" rx=\"10\" fill=\"#f2fbf6\"/>
    <image href=\"data:image/png;base64,` + dtMark + `\" x=\"12\" y=\"11\" width=\"44\" height=\"44\" preserveAspectRatio=\"xMidYMid meet\"/>
    <text x=\"68\" y=\"32\" fill=\"#ffffff\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\">DT POS</text>
    <text x=\"68\" y=\"50\" fill=\"#34d399\" font-family=\"sans-serif\" font-size=\"11\">Smart Retail Solution</text>
  </g>

  <!-- 3. AavanamKit Callout (Bottom Center-Right) -->
  <g transform=\"translate(650, 535)\" filter=\"url(#glow)\">
    <rect width=\"255\" height=\"66\" rx=\"12\" fill=\"url(#card-bg)\" stroke=\"#33495d\" stroke-width=\"1.5\"/>
    <rect x=\"12\" y=\"11\" width=\"44\" height=\"44\" rx=\"10\" fill=\"#f4f8fd\"/>
    <image href=\"data:image/png;base64,` + aavMark + `\" x=\"12\" y=\"11\" width=\"44\" height=\"44\" preserveAspectRatio=\"xMidYMid meet\"/>
    <text x=\"68\" y=\"32\" fill=\"#ffffff\" font-family=\"sans-serif\" font-size=\"15\" font-weight=\"bold\">AavanamKit</text>
    <text x=\"68\" y=\"50\" fill=\"#60a5fa\" font-family=\"sans-serif\" font-size=\"11\">Visual Document Designer</text>
  </g>

  <!-- 4. Find Soulmate Callout (Bottom Left) -->
  <g transform=\"translate(80, 535)\" filter=\"url(#glow)\">
    <rect width=\"245\" height=\"66\" rx=\"12\" fill=\"url(#card-bg)\" stroke=\"#33495d\" stroke-width=\"1.5\"/>
    <rect x=\"12\" y=\"11\" width=\"44\" height=\"44\" rx=\"10\" fill=\"#ffffff\"/>
    <image href=\"data:image/png;base64,` + soulMark + `\" x=\"12\" y=\"11\" width=\"44\" height=\"44\" preserveAspectRatio=\"xMidYMid meet\"/>
    <text x=\"68\" y=\"32\" fill=\"#ffffff\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\">Find Soulmate</text>
    <text x=\"68\" y=\"50\" fill=\"#f43f5e\" font-family=\"sans-serif\" font-size=\"11\">Nikah Service Mobile</text>
  </g>

  <!-- 5. JJChat Callout (Center Bottom) -->
  <g transform=\"translate(360, 535)\" filter=\"url(#glow)\">
    <rect width=\"235\" height=\"66\" rx=\"12\" fill=\"url(#card-bg)\" stroke=\"#33495d\" stroke-width=\"1.5\"/>
    <rect x=\"12\" y=\"11\" width=\"44\" height=\"44\" rx=\"10\" fill=\"#f5fdf7\"/>
    <image href=\"data:image/png;base64,` + jjchatMark + `\" x=\"12\" y=\"11\" width=\"44\" height=\"44\" preserveAspectRatio=\"xMidYMid meet\"/>
    <text x=\"68\" y=\"32\" fill=\"#ffffff\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\">JJChat &amp; Apps</text>
    <text x=\"68\" y=\"50\" fill=\"#22c55e\" font-family=\"sans-serif\" font-size=\"11\">Android Mobile Suite</text>
  </g>
</svg>
`);

  await sharp(heroSvg)
    .jpeg({ quality: 92 })
    .toFile('public/assets/products/product-stack-reference.jpg');

  console.log('✓ Successfully regenerated product-stack-reference.jpg with authentic assets!');
}

buildHeroGraphic().catch(console.error);
