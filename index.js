const program = require('commander');
//import walk from 'fs-walk';
import fs from 'fs-extra';
import path from 'path';

//import config from './config';

const basePath = process.cwd(),
    config = require(`${basePath}/templates/config.js`).default,
    files = [];
let modules;

program
    // .version('0.1.0')
    .arguments('[args...]')
    // .option('-c, --class', 'Add peppers')
    .option('-t, --template <type>', 'template from templates Folder', config.defaultType)
    //.option('-b, --bbq-sauce', 'Add bbq sauce')
    .action(function (args) {
        // console.log(args)
        modules = args;
    });




program.parse(['dsad', 'adsd', 'adsd', 'adsd2', 'asdasd']);


//console.log(program.template)

copyOverOuter()

function copyOverOuter() {
    //console.log(config,program.template)
    if (!config.types[program.template]) {
        console.warn(`folder for template ${program.template} does not exist`)
        return;
    }
    const def = config.types[program.template],
        folder = `${basePath}/templates/${def.source}`;

    copyOver({ replaceSting: config.palaceHolder, modules, folder, destination: def.destination })
        .then(result => {
            console.log(`created form '${program.template}' template:\n`)
            modules.forEach(module => {
                const logs = result.reduce((log, line) => {
                    console.log(line.file)
                    if (line.module === module)
                        log += line.file.replace(basePath, '\n\t');
                    return log
                }, '')
                console.log(module, logs,'\n')
            })
        })
        .catch(r => console.log(r))
}

async function copyOver({ replaceSting, modules, folder, destination }) {
    //console.log(replaceSting, modules, folder, destination)
    const writes = [],
        files = await walk(folder),
        contentPre = await Promise.all(files.map(file => fs.readFile(file, 'utf8')));

    modules.forEach(module => {

        contentPre.map(async (text, index) => {
            const tempPath = path.dirname(files[index]).replace(folder, ''),
                ext = path.extname(files[index]),
                file = path.basename(files[index], ext),
                outPath = `${basePath}/${destination}/${module}${tempPath}`,
                outFilename = `${capitalizeFirstLetter(module)}${capitalizeFirstLetter(file)}${ext}`,
                newFile = `${outPath}/${outFilename}`,
                newText = text.replace(`/${replaceSting}g/`, module);
            writes.push(writeFile({ module, outPath, newFile, newText }))
        })

    })
    return Promise.all(writes)

}

async function writeFile({ module, outPath, newFile, newText }) {
    await fs.ensureDir(outPath)
    await fs.writeFile(newFile, newText, 'utf8')
    return { module, file: newFile }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function walk(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (error, files) => {
            if (error) {
                return reject(error);
            }
            Promise.all(files.map((file) => {
                return new Promise((resolve, reject) => {
                    const filepath = path.join(dir, file);
                    fs.stat(filepath, (error, stats) => {
                        if (error) {
                            return reject(error);
                        }
                        if (stats.isDirectory()) {
                            walk(filepath).then(resolve);
                        } else if (stats.isFile()) {
                            resolve(filepath);
                        }
                    });
                });
            }))
                .then((foldersContents) => {
                    resolve(foldersContents.reduce((all, folderContents) => all.concat(folderContents), []));
                });
        });
    });
}