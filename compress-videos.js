import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if FFmpeg is installed
function checkFFmpeg() {
  return new Promise((resolve) => {
    exec('ffmpeg -version', (error) => {
      if (error) {
        console.error('❌ FFmpeg is not installed. Please install FFmpeg first:');
        console.error('   Windows: https://ffmpeg.org/download.html');
        console.error('   macOS: brew install ffmpeg');
        console.error('   Ubuntu: sudo apt install ffmpeg');
        resolve(false);
      } else {
        console.log('✅ FFmpeg is installed');
        resolve(true);
      }
    });
  });
}

// Compress video function
function compressVideo(inputPath, outputPath, quality = 'medium') {
  return new Promise((resolve, reject) => {
    let ffmpegCommand;
    
    switch (quality) {
      case 'high':
        // High quality - 720p, good bitrate
        ffmpegCommand = `ffmpeg -i "${inputPath}" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -vf scale=1280:720 "${outputPath}"`;
        break;
      case 'medium':
        // Medium quality - 480p, balanced
        ffmpegCommand = `ffmpeg -i "${inputPath}" -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 96k -vf scale=854:480 "${outputPath}"`;
        break;
      case 'low':
        // Low quality - 360p, small file
        ffmpegCommand = `ffmpeg -i "${inputPath}" -c:v libx264 -crf 32 -preset ultrafast -c:a aac -b:a 64k -vf scale=640:360 "${outputPath}"`;
        break;
      default:
        reject(new Error('Invalid quality setting'));
        return;
    }

    console.log(`🔄 Compressing ${inputPath} to ${quality} quality...`);
    
    exec(ffmpegCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error compressing ${inputPath}:`, error.message);
        reject(error);
      } else {
        console.log(`✅ Successfully compressed ${inputPath} to ${outputPath}`);
        resolve(outputPath);
      }
    });
  });
}

// Main function
async function main() {
  console.log('🎬 Video Compression Tool');
  console.log('========================\n');

  // Check if FFmpeg is available
  const ffmpegAvailable = await checkFFmpeg();
  if (!ffmpegAvailable) {
    return;
  }

  const publicDir = path.join(__dirname, 'public');
  
  // Check if public directory exists
  if (!fs.existsSync(publicDir)) {
    console.error('❌ Public directory not found');
    return;
  }

  // Get all MP4 files in public directory
  const files = fs.readdirSync(publicDir).filter(file => file.endsWith('.mp4'));
  
  if (files.length === 0) {
    console.log('ℹ️  No MP4 files found in public directory');
    return;
  }

  console.log(`📁 Found ${files.length} MP4 files:`);
  files.forEach(file => {
    const filePath = path.join(publicDir, file);
    const stats = fs.statSync(filePath);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`   - ${file} (${sizeMB} MB)`);
  });
  console.log('');

  // Compress each file
  for (const file of files) {
    const inputPath = path.join(publicDir, file);
    const fileName = path.parse(file).name;
    
    try {
      // Create compressed versions
      await compressVideo(inputPath, path.join(publicDir, `${fileName}-compressed.mp4`), 'medium');
      await compressVideo(inputPath, path.join(publicDir, `${fileName}-low.mp4`), 'low');
      
      console.log(`✅ Completed compression for ${file}\n`);
    } catch (error) {
      console.error(`❌ Failed to compress ${file}\n`);
    }
  }

  console.log('🎉 Video compression completed!');
  console.log('\n📋 Summary:');
  console.log('   - Original files remain unchanged');
  console.log('   - Compressed versions created with "-compressed" and "-low" suffixes');
  console.log('   - Use compressed versions for better loading performance');
}

// Run the script
main().catch(console.error); 