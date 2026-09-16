import os
import shutil
from PIL import Image

def brand_screens():
    base_dir = os.path.abspath('.')
    public_assets = os.path.join(base_dir, 'public', 'assets')
    new_assets = os.path.join(base_dir, 'public', 'new_assets')

    emblem_path = os.path.join(new_assets, 'icon-transparent.png')
    logo_path = os.path.join(new_assets, 'logo-transparent.png')
    
    emblem = Image.open(emblem_path).convert('RGBA')
    logo = Image.open(logo_path).convert('RGBA')

    # 1. Laptop screen (1440x900)
    laptop_path = os.path.join(public_assets, 'dashboard-laptop.jpg')
    laptop_backup = os.path.join(public_assets, 'dashboard-laptop-backup.jpg')
    if not os.path.exists(laptop_backup):
        shutil.copy2(laptop_path, laptop_backup)
        
    laptop = Image.open(laptop_backup).convert('RGBA')
    # The old red square JJ icon is at (17, 24) to (48, 55)
    # We can replace the top left area (X: 14 to 120, Y: 20 to 60) with clean dark background #070c14
    # and paste the official logo
    target_h = 36
    target_w = int(logo.size[0] * (target_h / logo.size[1]))
    logo_small = logo.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # Clean patch over old logo area (X:14 to 135, Y:20 to 64)
    patch_laptop = Image.new('RGBA', (130, 48), (7, 12, 20, 255))
    laptop.paste(patch_laptop, (14, 18))
    laptop.paste(logo_small, (16, 24), logo_small)
    laptop.convert('RGB').save(laptop_path, 'JPEG', quality=95)
    print("Updated dashboard-laptop.jpg with official logo")

    # 2. Phone screen (540x1140)
    phone_path = os.path.join(public_assets, 'dashboard-phone.jpg')
    phone_backup = os.path.join(public_assets, 'dashboard-phone-backup.jpg')
    if not os.path.exists(phone_backup):
        shutil.copy2(phone_path, phone_backup)
        
    phone = Image.open(phone_backup).convert('RGBA')
    # Old red square JJ is at X: 26 to 68, Y: 60 to 102
    target_size = 40
    emblem_small = emblem.resize((target_size, target_size), Image.Resampling.LANCZOS)
    
    patch_phone = Image.new('RGBA', (46, 46), (7, 12, 20, 255))
    phone.paste(patch_phone, (25, 60))
    phone.paste(emblem_small, (28, 62), emblem_small)
    phone.convert('RGB').save(phone_path, 'JPEG', quality=95)
    print("Updated dashboard-phone.jpg with official emblem")

if __name__ == '__main__':
    brand_screens()
