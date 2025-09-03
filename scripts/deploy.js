#!/usr/bin/env node

// 🚀 AURA AI - Production Deployment Script
// Automated deployment with environment validation

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

const validateEnvironment = () => {
  log('\n🔍 Validating environment...', 'cyan');
  
  const requiredFiles = [
    'package.json',
    'src/App.js',
    'src/firebaseConfig.js',
    'src/config/environment.js'
  ];
  
  for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
      log(`❌ Missing required file: ${file}`, 'red');
      process.exit(1);
    }
  }
  
  // Check if .env exists (optional but recommended)
  if (!fs.existsSync('.env')) {
    log('⚠️  No .env file found. Using default configuration.', 'yellow');
  }
  
  log('✅ Environment validation passed', 'green');
};

const runTests = () => {
  log('\n🧪 Running tests...', 'cyan');
  
  try {
    execSync('npm test -- --coverage --watchAll=false', { stdio: 'inherit' });
    log('✅ All tests passed', 'green');
  } catch (error) {
    log('❌ Tests failed', 'red');
    process.exit(1);
  }
};

const buildProduction = () => {
  log('\n🏗️  Building production bundle...', 'cyan');
  
  try {
    execSync('npm run build', { stdio: 'inherit' });
    log('✅ Production build completed', 'green');
  } catch (error) {
    log('❌ Build failed', 'red');
    process.exit(1);
  }
};

const analyzeBundleSize = () => {
  log('\n📊 Analyzing bundle size...', 'cyan');
  
  const buildPath = path.join(__dirname, '../build/static/js');
  
  if (fs.existsSync(buildPath)) {
    const files = fs.readdirSync(buildPath);
    const mainBundle = files.find(file => file.startsWith('main.') && file.endsWith('.js'));
    
    if (mainBundle) {
      const stats = fs.statSync(path.join(buildPath, mainBundle));
      const sizeInKB = Math.round(stats.size / 1024);
      
      if (sizeInKB > 1000) {
        log(`⚠️  Bundle size is large: ${sizeInKB}KB`, 'yellow');
      } else {
        log(`✅ Bundle size: ${sizeInKB}KB`, 'green');
      }
    }
  }
};

const generateDeploymentInfo = () => {
  log('\n📋 Generating deployment info...', 'cyan');
  
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const deploymentInfo = {
    name: packageJson.name,
    version: packageJson.version,
    buildTime: new Date().toISOString(),
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || 'production',
    features: {
      openaiIntegration: !!process.env.REACT_APP_OPENAI_API_KEY,
      firebaseAuth: true,
      premiumFeatures: true,
      socialFeatures: true
    }
  };
  
  fs.writeFileSync('build/deployment-info.json', JSON.stringify(deploymentInfo, null, 2));
  log('✅ Deployment info generated', 'green');
};

const main = () => {
  log('🎬 AURA AI - Production Deployment', 'magenta');
  log('=====================================', 'magenta');
  
  validateEnvironment();
  
  // Skip tests in CI or if --skip-tests flag is passed
  if (!process.env.CI && !process.argv.includes('--skip-tests')) {
    runTests();
  }
  
  buildProduction();
  analyzeBundleSize();
  generateDeploymentInfo();
  
  log('\n🎉 Deployment preparation complete!', 'green');
  log('\n📝 Next steps:', 'cyan');
  log('  1. Upload the build/ folder to your hosting provider', 'blue');
  log('  2. Configure environment variables on your hosting platform', 'blue');
  log('  3. Set up custom domain and SSL certificate', 'blue');
  log('  4. Configure Firebase hosting (optional): firebase deploy', 'blue');
  
  log('\n🔗 Useful commands:', 'cyan');
  log('  • Firebase deploy: firebase deploy --only hosting', 'blue');
  log('  • Serve locally: npx serve -s build', 'blue');
  log('  • Test production build: npm run build && npx serve -s build', 'blue');
};

// Run deployment script
if (require.main === module) {
  main();
}

module.exports = {
  validateEnvironment,
  buildProduction,
  analyzeBundleSize,
  generateDeploymentInfo
};

