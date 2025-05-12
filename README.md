# Raijin Theme - Custom Gutenberg Blocks

A WordPress theme with a custom block development environment for Gutenberg blocks.

## Project Structure

```
raijin/
├── blocks/                  # Custom blocks directory
│   ├── index.js            # Main block registration file
│   └── [block-name]/       # Individual block directory
│       ├── index.js        # Block implementation
│       └── style.scss      # Block styles
├── scripts/                # Development scripts
│   ├── create-block.js     # Block creation script
│   └── templates/          # Block templates
│       ├── basic.js        # Basic block template
│       └── advanced.js     # Advanced block template
├── dist/                   # Compiled assets
├── assets/                 # Theme assets
│   ├── css/               # Compiled CSS files
│   ├── js/                # JavaScript files
│   └── images/            # Theme images
├── inc/                    # Theme includes
│   ├── filters.php        # WordPress filters
│   ├── register-block-variations.php
│   ├── register-block-styles.php
│   └── register-block-patterns.php
├── patterns/              # Block patterns
├── parts/                 # Template parts
├── styles/                # Theme styles
├── templates/             # Theme templates
├── functions.php          # Theme functions
├── style.css             # Main theme stylesheet
├── theme.json            # Theme configuration
└── package.json          # Project dependencies
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- WordPress (v5.8 or higher)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd raijin
```

2. Install dependencies:
```bash
npm install
```

## Development

### Creating New Blocks

The theme includes a custom block creation script that generates the necessary files and structure for new Gutenberg blocks.

To create a new block:

```bash
npm run create-block
```

The script will prompt you for:
- Block name (in kebab-case, e.g., `my-service`)
- Block title (e.g., `My Service`)
- Block type (`basic` or `advanced`)

#### Block Types

1. **Basic Block**
   - Simple content block
   - Rich text editor
   - Basic styling

2. **Advanced Block**
   - Full-featured block
   - Color picker
   - Text alignment
   - Hover effects
   - Inspector controls

### Development Workflow

1. Start the development server:
```bash
npm start
```

2. Make changes to your blocks in the `blocks` directory
3. Changes will be automatically compiled to the `dist` directory

## Block Structure

### Basic Block
```javascript
// blocks/my-block/index.js
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import './style.scss';

registerBlockType('raijin/my-block', {
    // Block configuration
});
```

### Advanced Block
```javascript
// blocks/my-advanced-block/index.js
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPicker, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.scss';

registerBlockType('raijin/my-advanced-block', {
    // Advanced block configuration
});
```

## Building for Production

To build blocks for production:

```bash
npm run build
```

This will:
- Compile all blocks
- Minify JavaScript and CSS
- Generate production-ready files in the `dist` directory

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## Best Practices

1. **Block Naming**
   - Use kebab-case for block names
   - Prefix block names with `raijin/`
   - Use descriptive names

2. **Code Organization**
   - Keep block logic in `index.js`
   - Separate styles in `style.scss`

3. **Performance**
   - Keep blocks lightweight
   - Use proper WordPress dependencies
   - Optimize assets for production

## License

This project is licensed under the GPL v2 or later.

## Support

For support, please open an issue in the repository. 