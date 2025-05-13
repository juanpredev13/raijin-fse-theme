const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');

// Obtener todos los bloques
const blocks = glob.sync('./blocks/*/').map(block => {
    const blockName = block.split('/')[2];
    return {
        name: blockName,
        path: block
    };
});

// Crear entradas para cada bloque
const entries = blocks.reduce((acc, block) => {
    // Solo agregar entradas si los archivos existen
    const indexPath = `${block.path}index.js`;

    if (require('fs').existsSync(path.resolve(__dirname, indexPath))) {
        acc[`${block.name}/index`] = indexPath;
    }

    return acc;
}, {
    'blocks': './blocks/index.js'
});

module.exports = {
    entry: entries,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'blocks.css'
        })
    ],
    externals: {
        '@wordpress/blocks': ['wp', 'blocks'],
        '@wordpress/block-editor': ['wp', 'blockEditor'],
        '@wordpress/components': ['wp', 'components'],
        '@wordpress/i18n': ['wp', 'i18n']
    }
}; 