import { promises as fs } from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function restoreProcessLiterals() {
  try {
    const files = await glob('src/components/ui/**/*.astro');

    for (const file of files) {
      const content = await fs.readFile(file, 'utf-8');
      
      if (content.includes('processLiterals<Props>(Astro.props)')) {
        let newContent = content;

        // Remove the import
        newContent = newContent.replace(
          /import\s*{\s*processLiterals\s*}\s*from\s*['"]@utils\/literalProcessor['"];\s*\n/,
          ''
        );

        // Replace processLiterals back to Astro.props
        newContent = newContent.replace(
          /const\s*({[^}]*})\s*=\s*processLiterals<Props>\(Astro\.props\);/g,
          'const $1 = Astro.props;'
        );

        if (newContent !== content) {
          await fs.writeFile(file, newContent, 'utf-8');
          console.log(`✅ Restored processLiterals in ${file}`);
        }
      }
    }

    console.log('🎉 Finished restoring processLiterals');
  } catch (error) {
    console.error('Error restoring processLiterals:', error);
    process.exit(1);
  }
}

restoreProcessLiterals();