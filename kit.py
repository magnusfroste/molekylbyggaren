#!/usr/bin/env python3
"""Ritar appikoner, favicon, og-bild och manifest för Molekylbyggaren. Ingen tredjepart."""
import json
import math
import pathlib

from PIL import Image, ImageDraw, ImageFont

P = pathlib.Path(__file__).parent / "public"
P.mkdir(exist_ok=True)
ACCENT = (31, 138, 112, 255)
PAPPER = (250, 247, 242, 255)
BLACK = (20, 24, 31, 255)
VIT = (255, 255, 255, 255)

# tre atomer i vattenform, i andelar av rutan
ATOMER = [(0.50, 0.30, 0.135), (0.28, 0.66, 0.115), (0.72, 0.66, 0.115)]
BINDNINGAR = [(0, 1), (0, 2)]


def molekyl(d, N, fg, fyllning=None):
    """Två bindningar och tre atomer. Få och tjocka former som överlever 48 px."""
    for a, b in BINDNINGAR:
        x1, y1, _ = ATOMER[a]
        x2, y2, _ = ATOMER[b]
        d.line([(N * x1, N * y1), (N * x2, N * y2)], fill=fg, width=max(3, round(N * 0.05)))
    for x, y, r in ATOMER:
        rr = N * r
        d.ellipse([N * x - rr, N * y - rr, N * x + rr, N * y + rr], fill=fyllning or fg)


def ikon(N):
    ss = 4
    im = Image.new("RGBA", (N * ss, N * ss), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([0, 0, N * ss - 1, N * ss - 1], radius=N * ss * 0.23, fill=ACCENT)
    molekyl(d, N * ss, VIT)
    return im.resize((N, N), Image.LANCZOS)


def favicon():
    N = 512
    im = Image.new("RGBA", (N, N), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([0, 0, N - 1, N - 1], radius=N * 0.23, fill=ACCENT)
    molekyl(d, N, VIT)
    im.save(P / "favicon.png")
    (P / "favicon.svg").write_text(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
        '<rect width="100" height="100" rx="23" fill="#1f8a70"/>'
        '<g stroke="#fff" stroke-width="5" stroke-linecap="round">'
        '<line x1="50" y1="30" x2="28" y2="66"/><line x1="50" y1="30" x2="72" y2="66"/></g>'
        '<g fill="#fff"><circle cx="50" cy="30" r="13.5"/><circle cx="28" cy="66" r="11.5"/>'
        '<circle cx="72" cy="66" r="11.5"/></g></svg>', encoding="utf-8")


def og():
    W, H = 1200, 630
    im = Image.new("RGB", (W, H), PAPPER)
    d = ImageDraw.Draw(im)
    ico = ikon(160)
    im.paste(ico, (int(W / 2 - 80), 60), ico)
    font = None
    for path in ("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
                 "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"):
        if pathlib.Path(path).exists():
            font = ImageFont.truetype(path, 86)
            break
    small = ImageFont.truetype(path, 38) if font else None
    if font:
        t = "Molekylbyggaren"
        d.text((W / 2 - d.textlength(t, font=font) / 2, 260), t, fill=BLACK, font=font)
        t2 = "Bygg molekyler atom för atom · åk 7–9"
        d.text((W / 2 - d.textlength(t2, font=small) / 2, 380), t2, fill=(74, 82, 96), font=small)
        t3 = "Gratis · ingen inloggning · skolappar.org"
        d.text((W / 2 - d.textlength(t3, font=small) / 2, 465), t3, fill=(120, 126, 136), font=small)
    im.save(P / "og.png")


def main():
    favicon()
    ikon(192).save(P / "icon-192.png")
    ikon(512).save(P / "icon-512.png")
    m = ikon(512).convert("RGB").resize((512, 512), Image.LANCZOS)
    m.save(P / "icon-maskable-512.png")
    ikon(180).save(P / "apple-touch-icon.png")
    og()
    (P / "site.webmanifest").write_text(json.dumps({
        "name": "Molekylbyggaren – bygg molekyler atom för atom",
        "short_name": "Molekylbyggaren",
        "lang": "sv",
        "start_url": "/",
        "display": "standalone",
        "orientation": "any",
        "background_color": "#faf7f2",
        "theme_color": "#1f8a70",
        "icons": [
            {"src": "/icon-192.png", "sizes": "192x192", "type": "image/png"},
            {"src": "/icon-512.png", "sizes": "512x512", "type": "image/png"},
            {"src": "/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"},
        ],
    }, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    (P / "robots.txt").write_text("User-agent: *\nAllow: /\nSitemap: https://molekylbyggaren.skolappar.org/sitemap.xml\n", encoding="utf-8")
    (P / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        '<url><loc>https://molekylbyggaren.skolappar.org/</loc></url>\n</urlset>\n', encoding="utf-8")
    print("skrev ikoner, favicon, og.png, manifest, robots, sitemap till", P)


if __name__ == "__main__":
    main()