import { promises as fs } from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

  // Create a backup file with the same name and a .bak extension

async function processAstroFiles() {
  console.log('🎉 try to  preprocessing Astro files for union string field auto ');

  try {
    const files = await glob('src/components/sections/**/*.astro');

    for (const file of files) {
      const content = await fs.readFile(file, 'utf-8');
      
      if (content.includes('interface Props') && content.includes('Astro.props')) {
        // Create backup before making changes

        let newContent = content;

        // Remove any existing literalProcessor import that appears before ---
        newContent = newContent.replace(
          /^import\s*{\s*processLiterals\s*}\s*from\s*['"]@utils\/literalProcessor['"];\s*\n*---/m,
          '---'
        );

        const hasProcessorImport = newContent.includes('@utils/literalProcessor');
        
        if (!hasProcessorImport) {
          // More robust frontmatter detection and import insertion
          const frontmatterMatch = newContent.match(/^(---\r?\n|\r?\n---\r?\n)/);
          if (frontmatterMatch) {
            const [frontmatterStart] = frontmatterMatch;
        newContent = newContent.replace(
              frontmatterStart,
              `${frontmatterStart}import { processLiterals } from '@utils/literalProcessor';\n`
          );
          } else {
            // If no frontmatter found, add it
            newContent = `---\nimport { processLiterals } from '@utils/literalProcessor';\n---\n${newContent}`;
        }
        }

        // Replace props destructuring
        newContent = newContent.replace(
          /const\s*{[^}]*}\s*=\s*Astro\.props\s*;/g,
          (match) => {
            const destructuring = match.match(/const\s*({[^}]*})/)?.[1] || '{}';
            return `const ${destructuring} = processLiterals<Props>(Astro.props);`;
          }
        );

        if (newContent !== content) {
          await fs.writeFile(file, newContent, 'utf-8');
          console.log(`✅ Updated ${file}`);
        }
      }
    }

    console.log('🎉 Finished processing Astro files');
  } catch (error) {
    console.error('Error processing files:', error);
    process.exit(1);
  }
}

processAstroFiles();