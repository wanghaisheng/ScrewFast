export default {
  // Paths to scan for .astro files
  scanPaths: ['src/components/**/*.astro'],
  
  // Import statement to add
  importStatement: "import { processLiterals } from '@utils/literalProcessor';",
  
  // Backup files before modifying
  createBackups: true,
  
  // Files to ignore
  ignoreFiles: [
    'src/components/ignored/**/*.astro'
  ],

  // Custom transformations
  transforms: {
    // Add your custom transformations here
  }
};