#!/usr/bin/env python3
"""
Download WordPress images from the old Commerce EDC site.
Saves them into categorized subdirectories under public/images/wp-archive/.
Converts .jfif extensions to .jpg when saving.
"""

import os
import urllib.request
import urllib.parse
import ssl
import time
from pathlib import Path

BASE_DIR = Path("/Users/joeshipman/Documents/Claude-Apps/Commerce EDC Website/commerce-edc/public/images/wp-archive")

IMAGES = {
    "aerials": [
        "https://commerceedc.com/wp-content/uploads/2018/06/Hydro-Aerials-0009.jpg",
        "https://commerceedc.com/wp-content/uploads/2021/09/Commerce-Aerials-0262.jpg",
        "https://commerceedc.com/wp-content/uploads/revslider/video-media/CEDC-Aerials-0849_Sub_01_1_12_layer.jpeg",
        "https://commerceedc.com/wp-content/uploads/revslider/video-media/CEDC-Aerials-0849_Sub_01_3_13_layer.jpeg",
        "https://commerceedc.com/wp-content/uploads/revslider/video-media/CEDC-Aerials-0849_Sub_01_8_13_layer.jpeg",
        "https://commerceedc.com/wp-content/uploads/2022/09/CEDC-Aerials-0857-scaled.jpg",
    ],
    "board": [
        "https://commerceedc.com/wp-content/uploads/2020/04/Mark-Rudin.jpg",
        "https://commerceedc.com/wp-content/uploads/2020/04/ChrisDelong.jpg",
        "https://commerceedc.com/wp-content/uploads/2020/04/Michael-Glas.jpg",
        "https://commerceedc.com/wp-content/uploads/2020/04/Stan-McKee.jpg",
        "https://commerceedc.com/wp-content/uploads/2020/04/Jay-Garrett.jpg",
        "https://commerceedc.com/wp-content/uploads/2020/04/Scott-Ward.jpg",
        "https://commerceedc.com/wp-content/uploads/2020/04/Bonnie-Hunter.jpg",
        "https://commerceedc.com/wp-content/uploads/2021/09/Joe-Shipman-Portrait-e1631899178801.jpg",
        "https://commerceedc.com/wp-content/uploads/2021/09/Mandy-Freeman-600x600-1.jpeg",
        "https://commerceedc.com/wp-content/uploads/2021/09/Cece-Gassner-8307.jpg",
        "https://commerceedc.com/wp-content/uploads/2021/09/City-Portraits-3929.jpg",
        "https://commerceedc.com/wp-content/uploads/2023/02/Bonnie-206.jpg",
        "https://commerceedc.com/wp-content/uploads/2023/02/Micheal-207.jpg",
        "https://commerceedc.com/wp-content/uploads/2023/02/Jay-195.jpg",
        "https://commerceedc.com/wp-content/uploads/2023/02/Scott-170.jpg",
        "https://commerceedc.com/wp-content/uploads/2023/02/Stan-181.jpg",
        "https://commerceedc.com/wp-content/uploads/2023/02/Brent-Donham-7931-1-scaled-1.jpg",
        "https://commerceedc.com/wp-content/uploads/2023/04/Lucket-Dan-Prof-Photo.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/Dan-Lockett-47-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/Dan-Lockett-53-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/Dan-Lockett-72-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/Dan-Lockett-91-scaled.jpg",
    ],
    "cedc-branding": [
        "https://commerceedc.com/wp-content/uploads/2025/02/CEDC-2022-3-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/CEDC-2022-4-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/CEDC-2022-22-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/CEDC-2022-70-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/CEDC-2022-8-scaled.jpg",
    ],
    "community": [
        "https://commerceedc.com/wp-content/uploads/2021/09/juan-cruz-mountford-oFweDg39ldw-unsplash-scaled-e1631919443203.jpg",
        "https://commerceedc.com/wp-content/uploads/2021/09/Bois-dArc-Bash-2019-0553.jpg",
        "https://commerceedc.com/wp-content/uploads/2021/09/Bois-dArc-Bash-2012-2012-09-21-005.jpeg",
        "https://commerceedc.com/wp-content/uploads/2022/01/EDC-Job-Fair-square-01-01.jpg",
        "https://commerceedc.com/wp-content/uploads/2022/01/EDC-Job-Fair-4x8-1.jpg",
        "https://commerceedc.com/wp-content/uploads/2011/03/akshay-nanavati-8FevUlxdZC0-unsplash-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2018/03/tyler-franta-iusJ25iYu1c-unsplash-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2019/03/mate-rozsa-TA3zFIp6HCc-unsplash-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/Boisdarc-Bash-2024-1193-1-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/Boisdarc-Bash-2024-7892.remini-enhanced-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/Boisdarc-Bash-2024-7909-Enhanced-NR-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/Baseball-Field-Sunset-0060-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/Cooper-Lake-174-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/Bois-d-Arc-Bash-2023-247-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/Bois-dArc-Bash-2019-0322-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/Splash-Pad-Grand-Opening-184-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/JOIN-OUR-TEAM-1.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/05/PJC-and-Commerce.jpg",
    ],
    "edc-projects": [
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Project-2024-0539-Edit.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Project-2024-0539.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Project-2024-0546.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Project-2024-0548.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Project-2024-0568.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Project-3-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Project-6-Enhanced-NR-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Project-12-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Project-20-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Project-23-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Project-44-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Project-54-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Project-61-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Project-62-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Project-65-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Project-66-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Project-77-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Project-78-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Project--scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Project-1682-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-2-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-3-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-10-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-146-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-164-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-191-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-193-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-204-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-220-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-221-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-244-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-248-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-249-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-257-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-258-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-261-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-266-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-310-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-320-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-321-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-339-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-375-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-376-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-380-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-391-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-393-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-395-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-404-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-411-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-422-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-430-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-2-1-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-3-1-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/EDC-Gramazini-411-1-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/12/EDC-Gramazini-238-scaled.jpg",
    ],
    "industrial": [
        "https://commerceedc.com/wp-content/uploads/2020/03/KLZ-Stone-Group-Inc-1-of-1.jpg",
        "https://commerceedc.com/wp-content/uploads/2020/03/KLZ-Stone-Group-Inc-1-of-2.jpg",
        "https://commerceedc.com/wp-content/uploads/2020/03/KLZ-Stone-Group-Inc-1-of-4.jpg",
        "https://commerceedc.com/wp-content/uploads/2020/03/KLZ-Stone-Group-Inc-2-of-2.jpg",
        "https://commerceedc.com/wp-content/uploads/2020/03/covidienbuilding-2.jpg",
        "https://commerceedc.com/wp-content/uploads/2020/03/CovidienBuilding2-2.jpg",
        "https://commerceedc.com/wp-content/uploads/2020/03/covidienbuilding.jpg",
        "https://commerceedc.com/wp-content/uploads/2020/03/CovidienBuilding2.jpg",
        "https://commerceedc.com/wp-content/uploads/2020/03/P1020405.jfif",
        "https://commerceedc.com/wp-content/uploads/2020/03/P1020406.jfif",
        "https://commerceedc.com/wp-content/uploads/2020/03/P1020408.jfif",
        "https://commerceedc.com/wp-content/uploads/2020/03/P1020409.jfif",
        "https://commerceedc.com/wp-content/uploads/2020/03/P1020410.jfif",
        "https://commerceedc.com/wp-content/uploads/2020/03/P1020411.jfif",
        "https://commerceedc.com/wp-content/uploads/2020/03/P1020412.jfif",
        "https://commerceedc.com/wp-content/uploads/2020/03/P1020413.jfif",
        "https://commerceedc.com/wp-content/uploads/2020/03/P1020415.jfif",
        "https://commerceedc.com/wp-content/uploads/2020/03/P1020417.jfif",
        "https://commerceedc.com/wp-content/uploads/2020/03/P1020419.jfif",
        "https://commerceedc.com/wp-content/uploads/2020/03/P1020420.jfif",
        "https://commerceedc.com/wp-content/uploads/2020/03/P1020421.jfif",
        "https://commerceedc.com/wp-content/uploads/2020/03/P1020422.jfif",
        "https://commerceedc.com/wp-content/uploads/2020/03/P1020423.jfif",
        "https://commerceedc.com/wp-content/uploads/2020/03/P1020424.jfif",
        "https://commerceedc.com/wp-content/uploads/2020/03/P1020425.jfif",
        "https://commerceedc.com/wp-content/uploads/2020/03/P1020426.jfif",
        "https://commerceedc.com/wp-content/uploads/2020/03/P1020427.jfif",
        "https://commerceedc.com/wp-content/uploads/2020/03/KLZ-9195-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2021/09/industry2.jpeg",
        "https://commerceedc.com/wp-content/uploads/2022/01/Hydro_Logo_White.png",
        "https://commerceedc.com/wp-content/uploads/2025/02/covidien-2-6.jpg",
    ],
    "logos": [
        "https://commerceedc.com/wp-content/uploads/2018/07/EDC-Logo-350-x-74.png",
        "https://commerceedc.com/wp-content/uploads/2018/07/1-color-CEDC-logo-small.png",
        "https://commerceedc.com/wp-content/uploads/2017/01/Nexii_Logo_White.png",
        "https://commerceedc.com/wp-content/uploads/2016/01/Ben-E.-Keith-Logo.png",
        "https://commerceedc.com/wp-content/uploads/2016/01/bloomfield-logo-3.png",
        "https://commerceedc.com/wp-content/uploads/2022/01/mohawk-logo.png",
        "https://commerceedc.com/wp-content/uploads/2022/01/legacy-housing-logo.png",
        "https://commerceedc.com/wp-content/uploads/2022/01/ZurnLogo_ALL-RGB-301x127-1.png",
        "https://commerceedc.com/wp-content/uploads/2022/01/Nexii_Logo_White-2.png",
        "https://commerceedc.com/wp-content/uploads/2022/01/bloomfield-logo-4.png",
        "https://commerceedc.com/wp-content/uploads/2025/12/EDC-Logo@0.5x.png",
        "https://commerceedc.com/wp-content/uploads/2025/12/EDC-Logo@4x.png",
        "https://commerceedc.com/wp-content/uploads/2025/12/EDC-Logo@0.25x.png",
    ],
    "properties": [
        "https://commerceedc.com/wp-content/uploads/2020/03/Crosslands-at-the-Mural-9784.jpg",
        "https://commerceedc.com/wp-content/uploads/2023/06/LL9.jpeg",
        "https://commerceedc.com/wp-content/uploads/2023/06/LL6.jpg",
        "https://commerceedc.com/wp-content/uploads/2023/06/LL4.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/1126-FM-1880-Cooper_-TX-0149-scaled.jpg",
    ],
    "slider-hero": [
        "https://commerceedc.com/wp-content/uploads/revslider/the7-corporate/co-008.jpg",
        "https://commerceedc.com/wp-content/uploads/revslider/the7-corporate/co-013.jpg",
        "https://commerceedc.com/wp-content/uploads/revslider/the7-corporate/co-003.jpg",
        "https://commerceedc.com/wp-content/uploads/revslider/the7-corporate/co-005.jpg",
        "https://commerceedc.com/wp-content/uploads/revslider/the7-corporate/co-001.jpg",
    ],
    "uncategorized": [
        "https://commerceedc.com/wp-content/uploads/2020/03/State-on-the-Disaster-Recovery-funds.jpg",
        "https://commerceedc.com/wp-content/uploads/2020/03/Commerce-airport.jpg",
        "https://commerceedc.com/wp-content/uploads/2020/03/invitationtobid.jpg",
        "https://commerceedc.com/wp-content/uploads/2020/03/Screen-Shot-2017-01-22-at-12.14.11-AM.png",
        "https://commerceedc.com/wp-content/uploads/2020/03/rail.jpg",
        "https://commerceedc.com/wp-content/uploads/2020/03/IMG_9414.jpg",
        "https://commerceedc.com/wp-content/uploads/2020/03/IMG_5434.jpg",
        "https://commerceedc.com/wp-content/uploads/2020/04/IMG_8050.jpg",
        "https://commerceedc.com/wp-content/uploads/2020/04/railRoadCrossing2.jpg",
        "https://commerceedc.com/wp-content/uploads/2020/04/mapSmall.gif",
        "https://commerceedc.com/wp-content/uploads/2020/04/IMG_2444.jpg",
        "https://commerceedc.com/wp-content/uploads/2020/04/cooperFishing.jpg",
        "https://commerceedc.com/wp-content/uploads/2021/09/IMG_9414.jpeg",
        "https://commerceedc.com/wp-content/uploads/2021/09/untitled-shoot-110-1.jpeg",
        "https://commerceedc.com/wp-content/uploads/2021/09/Live-Oak-9509-HDR.jpg",
        "https://commerceedc.com/wp-content/uploads/2021/09/Commerce-Community-Photos-2-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2021/09/IMG_8057.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/1640033924255.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/IMG_4967.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/IMG_5856.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/IMG_8044.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/untitled-shoot-030.jpg",
        "https://commerceedc.com/wp-content/uploads/2022/01/Screenshot-2025-02-17-at-11.04.46%20AM.png",
    ],
    "university": [
        "https://commerceedc.com/wp-content/uploads/2020/04/universityScienceBuilding.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/Univerity-Branding-shots-for-EDC-5071-Edit-scaled.jpg",
        "https://commerceedc.com/wp-content/uploads/2025/02/Univerity-Branding-shots-for-EDC-5071-scaled.jpg",
    ],
}


def get_filename(url):
    """Extract filename from URL, converting .jfif to .jpg."""
    parsed = urllib.parse.urlparse(url)
    path = urllib.parse.unquote(parsed.path)
    filename = os.path.basename(path)
    if filename.lower().endswith(".jfif"):
        filename = filename[:-5] + ".jpg"
    return filename


def download_image(url, dest_path, timeout=30):
    """Download a single image. Returns True on success, False on failure."""
    try:
        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            },
        )
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE

        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as response:
            data = response.read()
            with open(dest_path, "wb") as f:
                f.write(data)
        return True
    except Exception as e:
        print(f"  FAILED: {e}")
        return False


def main():
    total_urls = sum(len(urls) for urls in IMAGES.values())
    print(f"Starting download of {total_urls} images across {len(IMAGES)} categories...\n")

    results = {}
    grand_success = 0
    grand_fail = 0

    for category, urls in IMAGES.items():
        cat_dir = BASE_DIR / category
        success = 0
        failed = 0
        failed_urls = []

        print(f"--- {category.upper()} ({len(urls)} images) ---")

        for url in urls:
            filename = get_filename(url)
            dest = cat_dir / filename
            print(f"  Downloading: {filename} ... ", end="", flush=True)

            if download_image(url, dest):
                size_kb = os.path.getsize(dest) / 1024
                print(f"OK ({size_kb:.0f} KB)")
                success += 1
            else:
                failed += 1
                failed_urls.append(url)

            time.sleep(0.15)

        results[category] = {"success": success, "failed": failed, "total": len(urls), "failed_urls": failed_urls}
        grand_success += success
        grand_fail += failed
        print(f"  => {success}/{len(urls)} succeeded\n")

    print("=" * 60)
    print("DOWNLOAD SUMMARY")
    print("=" * 60)
    print(f"{'Category':<20} {'Success':>8} {'Failed':>8} {'Total':>8}")
    print("-" * 60)
    for category, r in results.items():
        print(f"{category:<20} {r['success']:>8} {r['failed']:>8} {r['total']:>8}")
    print("-" * 60)
    print(f"{'TOTAL':<20} {grand_success:>8} {grand_fail:>8} {total_urls:>8}")
    print("=" * 60)

    if grand_fail > 0:
        print(f"\nFailed downloads ({grand_fail}):")
        for category, r in results.items():
            for url in r["failed_urls"]:
                print(f"  [{category}] {url}")

    print(f"\nDone! Files saved to: {BASE_DIR}")


if __name__ == "__main__":
    main()
