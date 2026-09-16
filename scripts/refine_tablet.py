import os
import shutil
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def refine_tablet():
    base_dir = os.path.abspath('.')
    public_assets_dir = os.path.join(base_dir, 'public', 'assets')
    new_assets_dir = os.path.join(base_dir, 'public', 'new_assets')
    
    tablet_path = os.path.join(public_assets_dir, 'dashboard-tablet.jpg')
    backup_path = os.path.join(public_assets_dir, 'dashboard-tablet-backup.jpg')
    logo_4k_path = os.path.join(new_assets_dir, 'logo-transparent-4k.png')

    orig = Image.open(backup_path if os.path.exists(backup_path) else tablet_path).convert('RGBA')
    W, H = orig.size

    # Create new clean canvas 1024 x 1536
    canvas = Image.new('RGBA', (W, H), (4, 7, 12, 255))
    
    # 1. Base gradient from deep space #03060a to bottom
    draw = ImageDraw.Draw(canvas)
    for y in range(H):
        # subtle vignette/gradient
        ratio = y / H
        r = int(3 + ratio * 4)
        g = int(6 + ratio * 4)
        b = int(10 + ratio * 8)
        draw.line([(0, y), (W, y)], fill=(r, g, b, 255))

    # 2. Add an ambient soft radial glow behind the logo
    glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    
    # Subtle crimson flare behind the emblem (around X=300, Y=620)
    center_x, center_y = 310, 610
    for rad in range(350, 0, -20):
        alpha = int((1 - rad / 350) * 48)
        glow_draw.ellipse([center_x - rad, center_y - rad, center_x + rad, center_y + rad], fill=(255, 24, 55, alpha))
        
    # Subtle cyan-white fill light behind letters
    center_lx, center_ly = 650, 610
    for rad in range(300, 0, -25):
        alpha = int((1 - rad / 300) * 22)
        glow_draw.ellipse([center_lx - rad, center_ly - rad, center_lx + rad, center_ly + rad], fill=(56, 189, 248, alpha))
        
    glow = glow.filter(ImageFilter.GaussianBlur(30))
    canvas = Image.alpha_composite(canvas, glow)

    # 3. Paste the cybernetic wave lines from orig (Y=1080 to H) with smooth top fade
    waves = orig.crop((0, 1050, W, H))
    # feather the top 80 pixels of waves
    wave_mask = Image.new('L', (W, H - 1050), 255)
    mask_draw = ImageDraw.Draw(wave_mask)
    for y in range(80):
        a = int((y / 80) * 255)
        mask_draw.line([(0, y), (W, y)], fill=a)
        
    canvas.paste(waves, (0, 1050), wave_mask)

    # 4. Composite the crystal clear 4K transparent logo
    logo = Image.open(logo_4k_path).convert('RGBA')
    target_w = 760
    aspect = logo.size[1] / logo.size[0]
    target_h = int(target_w * aspect)
    logo_resized = logo.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    logo_x = (W - target_w) // 2
    logo_y = 520
    canvas.paste(logo_resized, (logo_x, logo_y), logo_resized)

    # 5. Draw the crisp subtitle: BUILD • INNOVATE • GROW
    # Find a clean sans font or use default with nice letter spacing
    draw_final = ImageDraw.Draw(canvas)
    text = "B U I L D   •   I N N O V A T E   •   G R O W"
    try:
        font = ImageFont.truetype("arial.ttf", 22)
    except Exception:
        font = ImageFont.load_default()
        
    bbox = draw_final.textbbox((0, 0), text, font=font)
    text_w = bbox[2] - bbox[0]
    text_x = (W - text_w) // 2
    text_y = logo_y + target_h + 38
    draw_final.text((text_x, text_y), text, fill=(148, 163, 184, 220), font=font)

    # Save to public/assets/dashboard-tablet.jpg
    out_rgb = canvas.convert('RGB')
    out_rgb.save(tablet_path, 'JPEG', quality=98)
    print(f"Refined seamless tablet texture saved to: {tablet_path}")

if __name__ == '__main__':
    refine_tablet()
