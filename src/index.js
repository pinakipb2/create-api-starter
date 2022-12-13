#!/usr/bin/env node

const spawn = require('await-spawn');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const prompts = require('prompts');
const validate = require('validate-npm-package-name');

/**
 * User inputs Ctrl+C or Ctrl+D to exit the prompt. We should close the
 * process and not write to the file system.
 */
const onCancel = () => {
  console.log(chalk.red('Exiting !'));
  process.exit(1);
};

let appName;
let lang;

(async () => {
  const quesOne = await prompts(
    {
      type: 'text',
      name: 'name',
      message: 'What is your project named?',
      initial: 'my-app',
      validate: (value) => {
        if (value === '.') return true;
        const folder = path.join(process.cwd(), value);
        if (!fs.existsSync(folder)) {
          fs.mkdirSync(folder);
        } else {
          return 'Given Directory already exists !';
        }
        const validation = validate(value);
        let errMsg;
        if (validation.errors?.length > 0) {
          errMsg = validation.errors[0];
        } else if (validation.warnings?.length > 0) {
          errMsg = validation.warnings[0];
        }
        return validation.validForNewPackages === false ? errMsg : true;
      },
    },
    {
      onCancel,
    }
  );
  appName = quesOne.name;

  const styledTypeScript = chalk.hex('#007acc')('TypeScript');

  const quesTwo = await prompts(
    {
      type: 'toggle',
      name: 'typescript',
      message: `Would you like to use ${styledTypeScript} with this project?`,
      initial: true,
      active: 'Yes',
      inactive: 'No',
    },
    {
      onCancel,
    }
  );
  lang = quesTwo.typescript ? 'ts' : 'js';

  console.log();

  const basePath = path.resolve(__dirname, '../', lang);
  const appPath = path.join(process.cwd(), appName);

  console.log('Creating a new API Starter in ' + chalk.green(appPath) + '.');

  const addPackageJSON = () => {
    const fileName = 'package.json';
    let pjson = fs.readFileSync(path.join(basePath, fileName), 'utf8');
    pjson = JSON.parse(pjson);
    pjson.name = appName;
    const jsonContent = JSON.stringify(pjson, null, 2);
    fs.writeFile(path.join(appPath, fileName), jsonContent, 'utf8', function (err) {
      if (err) {
        console.log(chalk.red(`Error in creating ${fileName} !`));
        process.exit(1);
      }
    });
  };

  const addAdditionalFiles = () => {
    fs.readdirSync(basePath).forEach((file) => {
      if (!fs.lstatSync(path.resolve(basePath, file)).isDirectory() && file !== 'package.json' && file !== 'package-lock.json') {
        fs.copyFile(path.join(basePath, file), path.join(appPath, file), (err) => {
          if (err) {
            console.log(`Error in creating ${file} !`);
            process.exit(1);
          }
        });
      }
    });
    function copyFileSync(source, target) {
      var targetFile = target;
      // If target is a directory, a new file with the same name will be created
      if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
          targetFile = path.join(target, path.basename(source));
        }
      }
      fs.writeFileSync(targetFile, fs.readFileSync(source));
    }
    function copyFolderRecursiveSync(source, target) {
      var files = [];
      // Check if folder needs to be created or integrated
      var targetFolder = path.join(target, path.basename(source));
      if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
      }
      // Copy
      if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        files.forEach(function (file) {
          var curSource = path.join(source, file);
          if (fs.lstatSync(curSource).isDirectory()) {
            copyFolderRecursiveSync(curSource, targetFolder);
          } else {
            copyFileSync(curSource, targetFolder);
          }
        });
      }
    }
    copyFolderRecursiveSync(path.join(basePath, 'src'), appPath);
  };

  const addPackageLockJSON = () => {
    const fileName = 'package-lock.json';
    let pjson = fs.readFileSync(path.join(basePath, fileName), 'utf8');
    pjson = JSON.parse(pjson);
    pjson.name = appName;
    pjson.packages[''].name = appName;
    const jsonContent = JSON.stringify(pjson, null, 2);
    fs.writeFile(path.join(appPath, fileName), jsonContent, 'utf8', function (err) {
      if (err) {
        console.log(chalk.red(`Error in creating ${fileName} !`));
        process.exit(1);
      }
    });
  };

  const addDotEnv = () => {
    const content = 'PORT=5000\nFRONTEND_URL=http://localhost:3000\n';
    fs.writeFileSync(path.join(appName, '.env'), content, 'utf-8', function (err) {
      if (err) {
        console.log(chalk.red(`Error in creating .env !`));
        process.exit(1);
      }
    });
  };

  addPackageJSON();
  addAdditionalFiles();
  addPackageLockJSON();
  addDotEnv();

  console.log();

  try {
    process.chdir(appName);
    const ls = await spawn('git', ['init']);
    process.chdir('../');
    console.log('Initialized a git repository.');
  } catch (err) {
    console.log(err);
    console.error('Error while initializing a git repository');
  }

  console.log();

  console.log(`${chalk.green('Success!')} Created ${appName} at ${appPath}`);

  console.log();

  console.log('Inside that directory, you can run several commands:');

  console.log();

  console.log(chalk.cyan(`  npm run dev`));

  console.log('    Starts the development server.');

  console.log();

  console.log(chalk.cyan(`  npm run build`));

  console.log('    Builds the app for production.');

  console.log();

  console.log(chalk.cyan(`  npm run start`));

  console.log('    Runs the built app in production mode.');

  console.log();

  console.log();

  console.log('Now run:');

  console.log();

  console.log(chalk.cyan('  cd'), appName);

  console.log(`  ${chalk.cyan(`npm install`)}`);

  console.log(`  ${chalk.cyan(`npm run dev`)}`);

  console.log();

  console.log(chalk.white.bgRed.bold(' Created by @pinakipb2 '));

  console.log();
})();
