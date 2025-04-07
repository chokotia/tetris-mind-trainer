const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const svgPath = path.join(__dirname, 'public/img/icons/icon.svg');
console.log('SVG path:', svgPath);

// アイコンのサイズと出力ファイル名の設定
const icons = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 150, name: 'mstile-150x150.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
  { size: 192, name: 'android-chrome-maskable-192x192.png' },
  { size: 512, name: 'android-chrome-maskable-512x512.png' },
];

async function generateIcons() {
  try {
    // SVGファイルの存在確認
    if (!fs.existsSync(svgPath)) {
      console.error('Error: icon.svg not found at', svgPath);
      process.exit(1);
    }
    console.log('SVG file found');

    // 出力ディレクトリの作成
    const outputDir = path.join(__dirname, 'public/img/icons');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    console.log('Output directory:', outputDir);

    // 各サイズのアイコンを生成
    for (const icon of icons) {
      const outputPath = path.join(outputDir, icon.name);
      console.log(`Generating ${icon.name} (${icon.size}x${icon.size}px)`);
      await sharp(svgPath)
        .resize(icon.size, icon.size)
        .png()
        .toFile(outputPath);
      console.log(`Generated ${icon.name}`);
    }

    console.log('All icons have been generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
