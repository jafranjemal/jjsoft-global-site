import os
import shutil
from PIL import Image, ImageFilter

def copy_if_exists(src, dest):
    if os.path.exists(src):
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        shutil.copy2(src, dest)
        print(f"Copied: {src} -> {dest}")
    else:
        print(f"WARNING: Source file not found: {src}")

def create_tablet_texture(new_assets_dir, public_assets_dir):
    tablet_path = os.path.join(public_assets_dir, 'dashboard-tablet.jpg')
    logo_4k_path = os.path.join(new_assets_dir, 'logo-transparent-4k.png')
    
    if not os.path.exists(tablet_path) or not os.path.exists(logo_4k_path):
        print("Skipping tablet texture: files not found")
        return

    # Load existing tablet texture (1024x1536)
    bg = Image.open(tablet_path).convert('RGBA')
    W, H = bg.size

    # In existing texture, the logo is roughly in center Y (between Y=450 and Y=800)
    # Let's clean the central logo area with a smooth dark fill matching the background color around Y=450-800
    # Background around the logo is deep black #01030a with subtle ambient dark glow
    # We can sample the background color or paint a dark patch, then composite the sharp 4k logo
    
    logo = Image.open(logo_4k_path).convert('RGBA')
    
    # Scale logo to fit nicely in the tablet screen width (~680px wide)
    target_w = 720
    aspect = logo.size[1] / logo.size[0]
    target_h = int(target_w * aspect)
    logo_resized = logo.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # Create clean dark patch over old logo box (from Y=440 to Y=820, X=100 to 924)
    # We blend it smoothly
    patch = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    # Fill central region with deep dark color
    for y in range(430, 830):
        for x in range(100, 924):
            # calculate distance to edge of box for soft feathering
            dx = min(x - 100, 924 - x)
            dy = min(y - 430, 830 - y)
            feather = min(dx, dy)
            alpha = min(255, int(feather * 6))
            # Background deep dark color
            patch.putpixel((x, y), (1, 3, 10, alpha))
            
    # Composite patch over bg to eliminate old hard edge
    bg = Image.alpha_composite(bg, patch)
    
    # Center logo at Y=500
    pos_x = (W - target_w) // 2
    pos_y = 510
    
    # Composite new crisp 4K transparent logo
    bg.paste(logo_resized, (pos_x, pos_y), logo_resized)
    
    # Convert back to RGB and save as JPG
    out_rgb = bg.convert('RGB')
    backup_path = os.path.join(public_assets_dir, 'dashboard-tablet-backup.jpg')
    if not os.path.exists(backup_path):
        shutil.copy2(tablet_path, backup_path)
    out_rgb.save(tablet_path, 'JPEG', quality=95)
    print(f"Generated upgraded tablet texture: {tablet_path}")

def main():
    base_dir = os.path.abspath('.')
    new_assets_dir = os.path.join(base_dir, 'public', 'new_assets')
    brand_dir = os.path.join(base_dir, 'public', 'assets', 'brand')
    logos_dir = os.path.join(base_dir, 'public', 'assets', 'logos')
    public_assets_dir = os.path.join(base_dir, 'public', 'assets')
    public_dir = os.path.join(base_dir, 'public')
    app_dir = os.path.join(base_dir, 'app')

    print("=== 1. BRAND VECTORS & LOGOS ===")
    copy_if_exists(os.path.join(new_assets_dir, 'logo.svg'), os.path.join(brand_dir, 'jjsoft-official-logo.svg'))
    copy_if_exists(os.path.join(new_assets_dir, 'logo.svg'), os.path.join(brand_dir, 'logo.svg'))
    copy_if_exists(os.path.join(new_assets_dir, 'logo.svg'), os.path.join(logos_dir, 'jjsoft.svg'))
    copy_if_exists(os.path.join(new_assets_dir, 'icon.svg'), os.path.join(brand_dir, 'icon.svg'))
    copy_if_exists(os.path.join(new_assets_dir, 'icon.svg'), os.path.join(app_dir, 'icon.svg'))
    copy_if_exists(os.path.join(new_assets_dir, 'icon.svg'), os.path.join(public_dir, 'icon.svg'))

    print("=== 2. BRAND HIGH-RES RASTERS ===")
    copy_if_exists(os.path.join(new_assets_dir, 'logo-transparent-4k.png'), os.path.join(brand_dir, 'jjsoft-official-logo-transparent.png'))
    copy_if_exists(os.path.join(new_assets_dir, 'logo-transparent.png'), os.path.join(brand_dir, 'jjsoft-brand-transparent.png'))
    copy_if_exists(os.path.join(new_assets_dir, 'logo-transparent.png'), os.path.join(brand_dir, 'logo-transparent.png'))
    copy_if_exists(os.path.join(new_assets_dir, 'logo-transparent-4k.png'), os.path.join(brand_dir, 'logo-transparent-4k.png'))
    copy_if_exists(os.path.join(new_assets_dir, 'logo-dark-3200.png'), os.path.join(brand_dir, 'jjsoft-official-logo.png'))
    copy_if_exists(os.path.join(new_assets_dir, 'logo-dark.png'), os.path.join(brand_dir, 'jjsoft-brand-dark.png'))
    copy_if_exists(os.path.join(new_assets_dir, 'icon-2048.png'), os.path.join(brand_dir, 'jjsoft-official-emblem.png'))
    copy_if_exists(os.path.join(new_assets_dir, 'icon-transparent.png'), os.path.join(brand_dir, 'jjsoft-official-emblem-transparent.png'))

    print("=== 3. FAVICONS & TOUCH ICONS ===")
    copy_if_exists(os.path.join(new_assets_dir, 'favicon.ico'), os.path.join(public_dir, 'favicon.ico'))
    copy_if_exists(os.path.join(new_assets_dir, 'favicon.ico'), os.path.join(app_dir, 'favicon.ico'))
    copy_if_exists(os.path.join(new_assets_dir, 'favicon-32.png'), os.path.join(public_dir, 'favicon-32x32.png'))
    copy_if_exists(os.path.join(new_assets_dir, 'favicon-16.png'), os.path.join(public_dir, 'favicon-16x16.png'))
    copy_if_exists(os.path.join(new_assets_dir, 'favicon-48.png'), os.path.join(public_dir, 'favicon-48x48.png'))
    copy_if_exists(os.path.join(new_assets_dir, 'favicon-180.png'), os.path.join(public_dir, 'apple-touch-icon.png'))
    copy_if_exists(os.path.join(new_assets_dir, 'mobile-app-icon.png'), os.path.join(public_dir, 'mobile-app-icon.png'))
    copy_if_exists(os.path.join(new_assets_dir, 'mobile-app-icon.svg'), os.path.join(public_dir, 'mobile-app-icon.svg'))

    print("=== 4. OPEN GRAPH SOCIAL CARDS ===")
    copy_if_exists(os.path.join(new_assets_dir, 'og-image.png'), os.path.join(public_dir, 'og-image.png'))
    copy_if_exists(os.path.join(new_assets_dir, 'og-image.svg'), os.path.join(public_dir, 'og-image.svg'))

    print("=== 5. FOOTER BACKGROUND ===")
    copy_if_exists(os.path.join(new_assets_dir, 'jjsoft_footer_background.svg'), os.path.join(brand_dir, 'jjsoft_footer_background.svg'))
    copy_if_exists(os.path.join(new_assets_dir, 'jjsoft_footer_background.png'), os.path.join(brand_dir, 'jjsoft_footer_background.png'))
    copy_if_exists(os.path.join(new_assets_dir, 'jjsoft_footer_background.png'), os.path.join(public_dir, 'jjsoft_footer_background.png'))
    copy_if_exists(os.path.join(new_assets_dir, 'jjsoft_footer_background.svg'), os.path.join(public_dir, 'jjsoft_footer_background.svg'))

    print("=== 6. TABLET TEXTURE UPGRADE ===")
    create_tablet_texture(new_assets_dir, public_assets_dir)

    print("Asset replacement finished successfully!")

if __name__ == '__main__':
    main()
