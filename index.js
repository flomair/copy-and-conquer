#!/usr/bin/env node
const fs = require('fs-extra'),
    path = require('path');



const basePath = process.cwd(),
    config = require(`${basePath}/templates/config.json`),
    [node, file, template, ...modules2] = process.argv;

if (!template || template === 'help' || template === '?') {
    const types = Object.keys(config.types);
    console.log('Tempates : ', types.join(", "))
    return
}

copyOverOuter(template, modules2)

function copyOverOuter(template, modules) {

    if (!config.types[template]) {
        console.warn(`folder for template ${template} does not exist`)
        return;
    }
    const def = config.types[template],
        folder = path.normalize(`${basePath}/templates/${def.source}`);

    copyOver({ replaceString: config.palaceHolder, modules, folder, destination: def.destination })
        .then(result => {
            console.log(`created form '${template}' template:`)
            modules.forEach(module => {
                const logs = result.reduce((log, line) => {
                    if (line.module === module)
                        log += line.file.replace(basePath, '\n\t');
                    return log
                }, '')
                console.log(module, logs, '\n')
            })
        })
        .catch(r => console.log(r))
}

async function copyOver({ replaceString, modules, folder, destination }) {
    // console.log(replaceString, replaceString.toUpperCase(), modules, folder, destination)
    const writes = [],
        files = await walk(folder),
        contentPre = await Promise.all(files.map(file => fs.readFile(file, 'utf8')));

    modules.forEach(module => {
        contentPre.map(async (text, index) => {
            const tempPath = path.dirname(files[index]).replace(folder, ''),
                ext = path.extname(files[index]),
                file = path.basename(files[index], ext),
                outPath = (tempPath.toLowerCase().includes(replaceString) || file.toLowerCase().includes(replaceString)) ? `${basePath}/${destination}/${replaceTemplateStrings(tempPath, replaceString, module)}` : `${basePath}/${destination}/${module}${tempPath}`,
                outFilename = (file.toLowerCase().includes(replaceString)) ? `${replaceTemplateStrings(file, replaceString, module)}${ext}` : `${file}${ext}`,
                newFile = `${outPath}/${outFilename}`;

                let newText = replaceTemplateStrings(text, replaceString, module);


            writes.push(writeFile({ module, outPath, newFile, newText }))
        })

    })
    return Promise.all(writes)

}


function replaceTemplateStrings(text, replaceString, module) {

    return text
        .split(replaceString).join(module)
        .split(replaceString.toUpperCase()).join(module.toUpperCase())
        .split(capitalizeFirstLetterReplaceString(replaceString)).join(capitalizeFirstLetter(module))
}

async function writeFile({ module, outPath, newFile, newText }) {
    const from = path.normalize(outPath),
        file = path.normalize(newFile);
    //console.log(from, file)
    await fs.ensureDir(from)
    await fs.writeFile(file, newText, 'utf8')
    return { module, file }
}

function capitalizeFirstLetter(string,at=0) {
    return string.charAt(at).toUpperCase() + string.slice(1);
}

function capitalizeFirstLetterReplaceString(string) {
    return '$' +string.charAt(1).toUpperCase() + string.slice(2);
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
