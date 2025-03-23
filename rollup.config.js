import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import svg from 'rollup-plugin-svg';
import pkg from './package.json' with { type: 'json' }; // Import package.json as a JSON module

// Get the base name for the output files from package.json
const baseName = pkg.main.replace(/\.js$/, '');

// Helper function to determine file extensions based on format
const getExtension = (format) => {
  switch (format) {
    case 'dts':
      return 'd.ts';
    case 'cjs':
      return 'js';
    default:
      return 'es.js';
  }
};

// Function to create a Rollup bundle configuration
const createBundle = (format) => ({
  input: 'src/index.ts', // Entry point
  output: {
    file: `${baseName}.${getExtension(format)}`,
    format: format === 'cjs' ? 'cjs' : 'es', // CommonJS or ES Module
    sourcemap: format !== 'dts', // Generate sourcemaps for JS builds
  },
  plugins: format === 'dts'
    ? [dts()] // Use the dts plugin for TypeScript declaration files
    : [
        svg(), // Handle SVG imports
        esbuild({
          minify: true, // Minify the output
          target: 'es2018', // Target modern JavaScript
        }),
      ],
  external: (id) => {
    // Exclude dependencies from the bundle
    // Externalize anything that is not a relative or absolute path
    return !id.startsWith('.') && !id.startsWith('/');
  },
});

// Export the bundle configurations
export default [
  createBundle('es'), // ES Module build
  createBundle('cjs'), // CommonJS build
  createBundle('dts'), // TypeScript declaration build
];