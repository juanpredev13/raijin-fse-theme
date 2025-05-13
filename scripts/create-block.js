const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Importar plantillas
const basicTemplate = require('./templates/basic');
const advancedTemplate = require('./templates/advanced');

// Función para crear directorios
const createDirectory = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// Función para crear archivos
const createFile = (filePath, content) => {
    fs.writeFileSync(filePath, content);
};

// Función principal
const createBlock = async () => {
    try {
        // Solicitar información del block
        const blockName = await new Promise(resolve => {
            rl.question('Nombre del block (en kebab-case, ej: mi-block): ', resolve);
        });

        const blockTitle = await new Promise(resolve => {
            rl.question('Título del block (ej: Mi Block): ', resolve);
        });

        const blockType = await new Promise(resolve => {
            rl.question('Tipo de block (basic/advanced): ', (answer) => {
                resolve(answer.toLowerCase() === 'advanced' ? 'advanced' : 'basic');
            });
        });

        // Seleccionar plantilla
        const template = blockType === 'advanced' ? advancedTemplate : basicTemplate;

        // Crear estructura de directorios
        const blockPath = path.join(__dirname, '..', 'blocks', blockName);
        createDirectory(blockPath);

        // Crear archivos
        createFile(
            path.join(blockPath, 'block.json'),
            template.blockJson(blockName, blockTitle)
        );

        createFile(
            path.join(blockPath, 'edit.js'),
            template.edit(blockName, blockTitle)
        );

        createFile(
            path.join(blockPath, 'save.js'),
            template.save(blockName, blockTitle)
        );

        createFile(
            path.join(blockPath, 'index.js'),
            template.index(blockName)
        );

        createFile(
            path.join(blockPath, 'style.scss'),
            template.style(blockName)
        );

        createFile(
            path.join(blockPath, 'edit.scss'),
            template.editStyle(blockName)
        );

        createFile(
            path.join(blockPath, 'view.js'),
            template.view(blockName)
        );

        // Actualizar blocks/index.js
        const blocksIndexPath = path.join(__dirname, '..', 'blocks', 'index.js');
        let blocksIndexContent = fs.readFileSync(blocksIndexPath, 'utf8');
        
        // Agregar la importación del nuevo block
        const importStatement = `import './${blockName}';\n`;
        if (!blocksIndexContent.includes(importStatement)) {
            blocksIndexContent = blocksIndexContent.replace(
                '// Registrar blocks aquí',
                `// Registrar blocks aquí\n${importStatement}`
            );
            fs.writeFileSync(blocksIndexPath, blocksIndexContent);
        }

        console.log('\n¡Block creado exitosamente! 🎉');
        console.log(`\nUbicación: ${blockPath}`);
        console.log('\nPara usar el block:');
        console.log('1. Ejecuta "npm start" para compilar');
        console.log('2. El block estará disponible en el editor de Gutenberg');

    } catch (error) {
        console.error('Error al crear el block:', error);
    } finally {
        rl.close();
    }
};

// Ejecutar el script
createBlock(); 