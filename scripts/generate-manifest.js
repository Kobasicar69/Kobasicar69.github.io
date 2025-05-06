const fs   = require('fs');
const path = require('path');

const MEDIA_DIR = path.join(__dirname, '..', 'media');
const OUT_FILE  = path.join(MEDIA_DIR, 'manifest.json');

const IMAGE_EXTS = new Set(['.jpg','.jpeg','.png','.gif','.webp']);
const VIDEO_EXTS = new Set(['.mp4','.webm','.ogg']);

// Read folder, filter media, build entries
const entries = fs.readdirSync(MEDIA_DIR)
  .filter(f => f !== 'manifest.json')
  .filter(f => {
    const ext = path.extname(f).toLowerCase();
    return IMAGE_EXTS.has(ext) || VIDEO_EXTS.has(ext);
  })
  .map(f => ({
    type: IMAGE_EXTS.has(path.extname(f).toLowerCase()) ? 'image' : 'video',
    path: `media/${f}`
  }));

fs.writeFileSync(OUT_FILE, JSON.stringify(entries, null, 2));
console.log(`Wrote ${entries.length} entries to manifest.json`);