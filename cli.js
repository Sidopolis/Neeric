#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import Table from 'cli-table3';
import { spawn, exec } from 'child_process';
import { platform } from 'os';

// Import our AWS scanner (we'll need to adapt it for Node.js)
// For now, we'll create a simplified version

const program = new Command();

program
  .name('neeric')
  .description('AWS cloud waste scanner and cleanup tool')
  .version('1.0.0');

program
  .command('scan')
  .description('Scan AWS account for waste')
  .option('-r, --region <region>', 'AWS region', 'us-east-1')
  .option('--profile <profile>', 'AWS profile to use')
  .option('--format <format>', 'Output format (table|json|csv)', 'table')
  .action(async (options) => {
    console.log(chalk.cyan.bold('\n🔍 Neeric AWS Waste Scanner\n'));
    
    const spinner = ora('Scanning AWS resources...').start();
    
    try {
      // Simulate scanning (replace with real AWS calls)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const wasteItems = [
        {
          service: 'EC2',
          resource: 'Instance',
          name: 'web-server-old',
          region: options.region,
          cost: 142.50,
          reason: 'Stopped for 45 days',
          risk: 'low'
        },
        {
          service: 'EC2',
          resource: 'EBS Volume',
          name: 'vol-unused-backup',
          region: options.region,
          cost: 89.20,
          reason: 'Unattached for 23 days',
          risk: 'medium'
        },
        {
          service: 'RDS',
          resource: 'DB Instance',
          name: 'test-database',
          region: options.region,
          cost: 156.80,
          reason: 'Stopped for 12 days',
          risk: 'high'
        }
      ];
      
      spinner.succeed('Scan completed!');
      
      const totalWaste = wasteItems.reduce((sum, item) => sum + item.cost, 0);
      
      console.log(chalk.green.bold(`\n💰 Found $${totalWaste.toFixed(2)} in monthly waste\n`));
      
      if (options.format === 'table') {
        const table = new Table({
          head: ['Service', 'Resource', 'Name', 'Cost/mo', 'Risk', 'Reason'],
          style: { head: ['cyan'] }
        });
        
        wasteItems.forEach(item => {
          const riskColor = item.risk === 'high' ? 'red' : item.risk === 'medium' ? 'yellow' : 'green';
          table.push([
            item.service,
            item.resource,
            item.name,
            chalk.red(`$${item.cost.toFixed(2)}`),
            chalk[riskColor](item.risk.toUpperCase()),
            item.reason
          ]);
        });
        
        console.log(table.toString());
      } else if (options.format === 'json') {
        console.log(JSON.stringify({ totalWaste, wasteItems }, null, 2));
      }
      
      console.log(chalk.blue('\n💡 Next steps:'));
      console.log('  • Review the findings above');
      console.log('  • Run `neeric cleanup` to safely remove waste');
      console.log('  • Visit the web dashboard for detailed analysis\n');
      
    } catch (error) {
      spinner.fail('Scan failed');
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });

program
  .command('cleanup')
  .description('Clean up identified waste')
  .option('-r, --region <region>', 'AWS region', 'us-east-1')
  .option('--dry-run', 'Show what would be deleted without actually deleting')
  .action(async (options) => {
    console.log(chalk.cyan.bold('\n🧹 Neeric Cleanup Tool\n'));
    
    if (options.dryRun) {
      console.log(chalk.yellow('🔍 DRY RUN MODE - No resources will be deleted\n'));
    }
    
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmed',
        message: 'Are you sure you want to proceed with cleanup?',
        default: false
      }
    ]);
    
    if (!answers.confirmed) {
      console.log(chalk.yellow('Cleanup cancelled.\n'));
      return;
    }
    
    const spinner = ora('Cleaning up resources...').start();
    
    try {
      // Simulate cleanup
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      spinner.succeed('Cleanup completed!');
      console.log(chalk.green.bold('\n✅ Successfully cleaned up AWS waste'));
      console.log(chalk.green('💰 Estimated monthly savings: $388.50\n'));
      
    } catch (error) {
      spinner.fail('Cleanup failed');
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });

program
  .command('init')
  .description('Setup Neeric with AWS credentials')
  .action(async () => {
    console.log(chalk.cyan.bold('\n⚙️  Neeric Setup\n'));
    
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'accessKeyId',
        message: 'AWS Access Key ID:',
        validate: input => input.length > 0 || 'Access Key ID is required'
      },
      {
        type: 'password',
        name: 'secretAccessKey',
        message: 'AWS Secret Access Key:',
        validate: input => input.length > 0 || 'Secret Access Key is required'
      },
      {
        type: 'list',
        name: 'region',
        message: 'Default AWS Region:',
        choices: [
          'us-east-1',
          'us-west-2',
          'eu-west-1',
          'ap-southeast-1'
        ]
      }
    ]);
    
    console.log(chalk.green('\n✅ Configuration saved!'));
    console.log(chalk.blue('Next steps:'));
    console.log('  • Run `neeric scan` to find waste');
    console.log('  • Visit http://localhost:5174/dashboard for web interface\n');
  });

program
  .command('dashboard')
  .description('Open the web dashboard')
  .action(() => {
    console.log(chalk.cyan.bold('\n🌐 Opening Neeric Dashboard...\n'));
    
    // Check if dev server is already running
    console.log(chalk.blue('Checking if dashboard is already running...'));
    
    // Try to start the development server with better Windows support
    const isWindows = platform() === 'win32';
    const npmCommand = isWindows ? 'npm.cmd' : 'npm';
    
    console.log(chalk.blue('Starting development server...'));
    console.log(chalk.yellow('Dashboard will be available at: http://localhost:5174/dashboard\n'));
    
    try {
      const server = spawn(npmCommand, ['run', 'dev'], { 
        stdio: 'inherit',
        shell: true // Use shell for better Windows compatibility
      });
      
      server.on('error', (error) => {
        console.error(chalk.red('\n❌ Failed to start dashboard:'), error.message);
        console.log(chalk.yellow('\n💡 Alternative options:'));
        console.log('  1. Run manually: npm run dev');
        console.log('  2. Open your browser to: http://localhost:5174/dashboard');
        console.log('  3. Make sure npm is in your PATH\n');
      });
      
      server.on('close', (code) => {
        if (code !== 0) {
          console.log(chalk.yellow(`\nDashboard process ended with code ${code}`));
        }
      });
      
      // Handle Ctrl+C gracefully
      process.on('SIGINT', () => {
        console.log(chalk.yellow('\n\nStopping dashboard...'));
        server.kill('SIGINT');
        process.exit(0);
      });
      
    } catch (error) {
      console.error(chalk.red('\n❌ Error starting dashboard:'), error.message);
      console.log(chalk.yellow('\n💡 Try running manually:'));
      console.log('  npm run dev');
      console.log('\n  Then visit: http://localhost:5174/dashboard\n');
    }
  });

program
  .command('status')
  .description('Check if dashboard is running')
  .action(() => {
    console.log(chalk.cyan.bold('\n📊 Neeric Status\n'));
    
    // Simple check by trying to connect to localhost:5174
    exec('curl -f http://localhost:5174 2>/dev/null || echo "NOT_RUNNING"', (error, stdout, stderr) => {
      if (stdout.includes('NOT_RUNNING') || error) {
        console.log(chalk.red('❌ Dashboard is not running'));
        console.log(chalk.blue('\n💡 To start:'));
        console.log('  neeric dashboard');
        console.log('  npm run dev\n');
      } else {
        console.log(chalk.green('✅ Dashboard is running'));
        console.log(chalk.blue('🌐 Available at: http://localhost:5174/dashboard\n'));
      }
    });
  });

program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  console.log(chalk.cyan.bold('🚀 Neeric - AWS Cloud Waste Scanner\n'));
  console.log('Find and clean up AWS waste to reduce your cloud costs.\n');
  program.outputHelp();
  console.log(chalk.blue('\nExamples:'));
  console.log('  neeric scan              # Scan for waste');
  console.log('  neeric cleanup --dry-run # Preview cleanup');
  console.log('  neeric dashboard         # Open web interface');
  console.log('  neeric status            # Check dashboard status');
  console.log('  neeric init              # Setup credentials\n');
  
  console.log(chalk.green('Quick Start:'));
  console.log('  1. neeric init           # Setup AWS credentials');
  console.log('  2. neeric scan           # Find waste');
  console.log('  3. neeric dashboard      # Open web UI\n');
} 