# Tatum Design System

A modern, reusable component library for Tatum projects.
- [Storybook - Component Examples](https://tatum-desing-system-ed3d1a.gitlab.io/?path=/docs/introduction--docs)
- [llms.txt](https://tatum-desing-system-ed3d1a.gitlab.io/llms.txt)

## Installation

1. Add `.npmrc` to your project and make sure it is in `.gitignore` or if not don't store token directly in the file:
```
@tatum-io:registry=https://gitlab.com/api/v4/projects/68384178/packages/npm/
//gitlab.com/api/v4/projects/68384178/packages/npm/:_authToken=${NPM_TOKEN}
```

2. If you didn't add token directly to the file the better approach will be set your access token like it:
```bash
export NPM_TOKEN=your_gitlab_token
```

3. Install the package:
```bash
yarn add @tatum-io/tatum-design-system
```

## Usage

```tsx
// Import components
import { Button, Card } from '@tatum-io/tatum-design-system';

// Import styles to get the fonts
import '@tatum-io/tatum-design-system/styles.css';

function App() {
  return (
          <Card>
            <h2>Hello World</h2>
            <Button>Click me</Button>
          </Card>
  );
}
```

### Alternative Import Methods

You can also import individual components:

```tsx
import { Button } from '@tatum-io/tatum-design-system/components/Button';
```

### Widget Integration

When using the design system in widget environments, portal-based components (like modals, tooltips...) are automatically handled for Shadow DOM environments. However, if you're using prefixed Tailwind CSS, you need to add the `data-tds-root="true"` attribute to your widget container to ensure proper styling:

```tsx
function MyWidget() {
  return (
    <div data-tds-root="true">
      {/* Your widget content */}
      <Modal>
        {/* This modal will render inside the widget container with proper styles */}
      </Modal>
    </div>
  );
}
```

Without the `data-tds-root` attribute, portal components would render in `document.body` and lose access to your prefixed Tailwind styles.

## Using the Tailwind Plugin

The Tatum Design System includes a custom Tailwind CSS plugin that provides predefined utilities, components, and theming capabilities for your projects.

### Installation

Add the plugin to your Tailwind configuration:

```js
// tailwind.config.js
import tdsPlugin from '@tatum-io/tatum-design-system/tailwind-plugin';

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@tatum-io/tatum-design-system/dist/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [tdsPlugin],
}
```

### Features

The plugin includes:

- **Colors**: Brand colors, accent colors, semantic colors
- **Typography**: Text sizes, weights, line heights, font families
- **Borders**: Border widths, radii, and styles
- **Shadows**: Elevation levels and interactive states
- **Transitions**: Animation timing, easing functions
- **Z-index**: Layering system for consistent stacking

For comprehensive examples of all available design tokens and their usage, please refer to the Storybook documentation where you can find interactive examples for each feature.

## Development

**Set `UNTITLEDUI_PRO_TOKEN` for Untitled UI Pro Icons**

This project uses Untitled UI Pro icons. To access the private Untitled UI Pro npm registry, you'll need to authenticate using a token:

1. Request access to the Untitled UI Pro npm registry from your team
2. Set token in your terminal with `export UNTITLEDUI_PRO_TOKEN=YOUR_TOKEN_HERE`

Note that environment variables from your `.env` file won't automatically be recognized by npm's configuration system, so you need to export this variable in your terminal.

You can create a configuration that automatically sets the `UNTITLEDUI_PRO_TOKEN` in your terminal.

1. `open -t ~/.zshrc`
2. Add in terminal `export UNTITLEDUI_PRO_TOKEN="your_token_here"`
3. Check that changes applied with command `source ~/.zshrc`


```bash
# Run storybook
yarn storybook

# Build the library
yarn build

# Run tests
yarn test
```

### Tailwind CSS

* **Version:** The project is built using **Tailwind CSS v3** due to current limitations with the custom plugin's
  compatibility with v4.
* **IntelliSense:** For optimal Tailwind IntelliSense support in your editor, especially when defining classes
  programmatically or using helper utilities (like clsx), consult the setup instructions here:
  * [Tailwind IntelliSense IDE configuration](https://cva.style/docs/getting-started/installation#intellisense)

## Project Structure

```
src/
├── components/     # React components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   ├── Button.stories.tsx
│   │   └── index.ts
│   └── ...
└── index.ts        # Main export file
```

## TypeScript Support

All components include TypeScript definitions. For proper module resolution in consuming projects, we recommend using TypeScript with `"moduleResolution": "node16"` or `"bundler"`.

## Component Guidelines

Each component must have:
- TypeScript interface for props (exported)
- Enum for data-testid attributes (exported)
- Tests
- Storybook stories

### Component Building Strategy

- Use **[Radix UI](https://www.radix-ui.com/)** headless primitives as our main tool for building more complex
  components
- **[shadcn/ui](https://ui.shadcn.com/)** components (built on Radix) can be used as a quick starting point via its CLI
  or copy-paste mechanism
- **[Untitled UI Pro](https://untitledui.com/)** icons provide our icon system with 10,000+ premium icons across multiple styles (Line, Solid, Duotone, Duocolor)
- Apply our own Tailwind design system styles on top

## Version Bumps

### MAJOR Version (x.0.0)

- Breaking changes to existing components
- Changes that require updates to consumer code
- Visual redesigns affecting appearance and functionality
- Removal of deprecated components or properties
- Architecture changes impacting implementation

### MINOR Version (0.x.0)

- Addition of new components
- New features to existing components that don't break API
- New component variants
- Expanded properties for components
- Visual enhancements that maintain backward compatibility
- Deprecation notices (while maintaining functionality)

### PATCH Version (0.0.x)

- Minimal changes needed for bug and security fixes
- Documentation corrections

---

# Component Examples

Below is a markdown-formatted list of all components from the Storybook `.stories.tsx` files.

## zindex

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Section, StoriesContainer } from './common'

const meta: Meta = {
  title: 'Tailwind Plugin/Z-Index',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['!autodocs'],
}

export default meta
type Story = StoryObj

export const CornerStackedSquares: Story = {
  render: () => (
    <StoriesContainer
      title='Z-Index Demonstration'
      description='Squares of different sizes stacked in the same corner to demonstrate z-index stacking.'
    >
      <Section
        title='Corner Stacked Squares'
        description='All squares are positioned at the same corner (bottom left) - notice how the z-index determines which one appears on top.'
      >
        <div className='relative h-[850px] rounded-tatum-lg bg-tatum-gray-100'>
          <div className='absolute bottom-0 left-0 z-tatum-minus-1 h-[800px] w-[800px] rounded-tatum-lg border-4 border-tatum-error-500 bg-tatum-error-200'>
            <div className='absolute left-0 right-0 top-4 flex justify-center'>
              <div className='rounded-tatum-md bg-tatum-white px-tatum-md py-tatum-xs shadow-tatum-sm'>
                <span className='text-tatum-text-md font-tatum-bold text-tatum-error-900'>
                  z-tatum-minus-1
                </span>
              </div>
            </div>
          </div>

          <div className='absolute bottom-0 left-0 z-tatum-0 h-[600px] w-[600px] rounded-tatum-lg border-4 border-tatum-warning-500 bg-tatum-warning-200'>
            <div className='absolute left-0 right-0 top-4 flex justify-center'>
              <div className='rounded-tatum-md bg-tatum-white px-tatum-md py-tatum-xs shadow-tatum-sm'>
                <span className='text-tatum-text-md font-tatum-bold text-tatum-warning-900'>
                  z-tatum-0
                </span>
              </div>
            </div>
          </div>

          <div className='absolute bottom-0 left-0 z-tatum-1 h-[450px] w-[450px] rounded-tatum-lg border-4 border-tatum-success-500 bg-tatum-success-200'>
            <div className='absolute left-0 right-0 top-4 flex justify-center'>
              <div className='rounded-tatum-md bg-tatum-white px-tatum-md py-tatum-xs shadow-tatum-sm'>
                <span className='text-tatum-text-md font-tatum-bold text-tatum-success-900'>
                  z-tatum-1
                </span>
              </div>
            </div>
          </div>

          <div className='absolute bottom-0 left-0 z-tatum-10 h-[300px] w-[300px] rounded-tatum-lg border-4 border-tatum-tertiary-500 bg-tatum-tertiary-200'>
            <div className='absolute left-0 right-0 top-4 flex justify-center'>
              <div className='rounded-tatum-md bg-tatum-white px-tatum-md py-tatum-xs shadow-tatum-sm'>
                <span className='text-tatum-text-md font-tatum-bold text-tatum-tertiary-900'>
                  z-tatum-10
                </span>
              </div>
            </div>
          </div>

          <div className='absolute bottom-0 left-0 z-tatum-20 h-[200px] w-[200px] rounded-tatum-lg border-4 border-tatum-secondary-500 bg-tatum-secondary-200'>
            <div className='absolute left-0 right-0 top-4 flex justify-center'>
              <div className='rounded-tatum-md bg-tatum-white px-tatum-md py-tatum-xs shadow-tatum-sm'>
                <span className='text-tatum-text-md font-tatum-bold text-tatum-secondary-900'>
                  z-tatum-20
                </span>
              </div>
            </div>
          </div>

          <div className='absolute bottom-0 left-0 z-tatum-60 h-[140px] w-[140px] rounded-tatum-lg border-4 border-tatum-primary-500 bg-tatum-primary-200'>
            <div className='absolute left-0 right-0 top-4 flex justify-center'>
              <div className='rounded-tatum-md bg-tatum-white px-tatum-md py-tatum-xs shadow-tatum-sm'>
                <span className='text-tatum-text-sm font-tatum-bold text-tatum-primary-900'>
                  z-tatum-60
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title='Z-Index Values Reference'
        description='The scale of z-index values in the Tatum Design System, from lowest to highest.'
      >
        <div className='grid grid-cols-2 gap-tatum-xl md:grid-cols-3'>
          <div className='rounded-tatum-md border border-tatum-gray-200 bg-tatum-white p-tatum-md shadow-tatum-sm'>
            <p className='text-tatum-text-md font-tatum-semibold text-tatum-gray-900'>
              z-tatum-minus-1
            </p>
            <p className='text-tatum-text-sm text-tatum-gray-500'>-1</p>
          </div>

          <div className='rounded-tatum-md border border-tatum-gray-200 bg-tatum-white p-tatum-md shadow-tatum-sm'>
            <p className='text-tatum-text-md font-tatum-semibold text-tatum-gray-900'>
              z-tatum-0
            </p>
            <p className='text-tatum-text-sm text-tatum-gray-500'>0</p>
          </div>

          <div className='rounded-tatum-md border border-tatum-gray-200 bg-tatum-white p-tatum-md shadow-tatum-sm'>
            <p className='text-tatum-text-md font-tatum-semibold text-tatum-gray-900'>
              z-tatum-1
            </p>
            <p className='text-tatum-text-sm text-tatum-gray-500'>1</p>
          </div>

          <div className='rounded-tatum-md border border-tatum-gray-200 bg-tatum-white p-tatum-md shadow-tatum-sm'>
            <p className='text-tatum-text-md font-tatum-semibold text-tatum-gray-900'>
              z-tatum-10
            </p>
            <p className='text-tatum-text-sm text-tatum-gray-500'>10</p>
          </div>

          <div className='rounded-tatum-md border border-tatum-gray-200 bg-tatum-white p-tatum-md shadow-tatum-sm'>
            <p className='text-tatum-text-md font-tatum-semibold text-tatum-gray-900'>
              z-tatum-20
            </p>
            <p className='text-tatum-text-sm text-tatum-gray-500'>20</p>
          </div>

          <div className='rounded-tatum-md border border-tatum-gray-200 bg-tatum-white p-tatum-md shadow-tatum-sm'>
            <p className='text-tatum-text-md font-tatum-semibold text-tatum-gray-900'>
              z-tatum-30
            </p>
            <p className='text-tatum-text-sm text-tatum-gray-500'>30</p>
          </div>

          <div className='rounded-tatum-md border border-tatum-gray-200 bg-tatum-white p-tatum-md shadow-tatum-sm'>
            <p className='text-tatum-text-md font-tatum-semibold text-tatum-gray-900'>
              z-tatum-40
            </p>
            <p className='text-tatum-text-sm text-tatum-gray-500'>40</p>
          </div>

          <div className='rounded-tatum-md border border-tatum-gray-200 bg-tatum-white p-tatum-md shadow-tatum-sm'>
            <p className='text-tatum-text-md font-tatum-semibold text-tatum-gray-900'>
              z-tatum-50
            </p>
            <p className='text-tatum-text-sm text-tatum-gray-500'>50</p>
          </div>

          <div className='rounded-tatum-md border border-tatum-gray-200 bg-tatum-white p-tatum-md shadow-tatum-sm'>
            <p className='text-tatum-text-md font-tatum-semibold text-tatum-gray-900'>
              z-tatum-60
            </p>
            <p className='text-tatum-text-sm text-tatum-gray-500'>60</p>
          </div>
        </div>
      </Section>
    </StoriesContainer>
  ),
}

```

## typography

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Section, StoriesContainer } from './common'

const meta: Meta = {
  title: 'Tailwind Plugin/Typography',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['!autodocs'],
}

export default meta
type Story = StoryObj

export const Sizes: Story = {
  render: () => (
    <StoriesContainer
      title='Typography'
      description='Tatum Design System typography tokens include font sizes, weights, and families.'
    >
      <Section
        title='Heading Sizes'
        description='Used for page headings, section titles, and other prominent text.'
      >
        <div className='space-y-tatum-3xl'>
          <div className='border-b border-tatum-gray-200 pb-tatum-3xl'>
            <p className='mb-tatum-xs text-tatum-text-sm text-tatum-gray-500'>
              text-tatum-heading-2xl
            </p>
            <h1 className='text-tatum-heading-2xl font-tatum-bold text-tatum-gray-900'>
              The quick brown fox jumps over the lazy dog
            </h1>
            <p className='mt-tatum-md text-tatum-text-sm text-tatum-gray-500'>
              Font size: 4.5rem / Line height: 5.625rem
            </p>
          </div>

          <div className='border-b border-tatum-gray-200 pb-tatum-3xl'>
            <p className='mb-tatum-xs text-tatum-text-sm text-tatum-gray-500'>
              text-tatum-heading-xl
            </p>
            <h1 className='text-tatum-heading-xl font-tatum-bold text-tatum-gray-900'>
              The quick brown fox jumps over the lazy dog
            </h1>
            <p className='mt-tatum-md text-tatum-text-sm text-tatum-gray-500'>
              Font size: 3.75rem / Line height: 4.5rem
            </p>
          </div>

          <div className='border-b border-tatum-gray-200 pb-tatum-3xl'>
            <p className='mb-tatum-xs text-tatum-text-sm text-tatum-gray-500'>
              text-tatum-heading-lg
            </p>
            <h1 className='text-tatum-heading-lg font-tatum-bold text-tatum-gray-900'>
              The quick brown fox jumps over the lazy dog
            </h1>
            <p className='mt-tatum-md text-tatum-text-sm text-tatum-gray-500'>
              Font size: 3rem / Line height: 3.75rem
            </p>
          </div>

          <div className='border-b border-tatum-gray-200 pb-tatum-3xl'>
            <p className='mb-tatum-xs text-tatum-text-sm text-tatum-gray-500'>
              text-tatum-heading-md
            </p>
            <h2 className='text-tatum-heading-md font-tatum-semibold text-tatum-gray-900'>
              The quick brown fox jumps over the lazy dog
            </h2>
            <p className='mt-tatum-md text-tatum-text-sm text-tatum-gray-500'>
              Font size: 2.25rem / Line height: 2.75rem
            </p>
          </div>

          <div className='border-b border-tatum-gray-200 pb-tatum-3xl'>
            <p className='mb-tatum-xs text-tatum-text-sm text-tatum-gray-500'>
              text-tatum-heading-sm
            </p>
            <h3 className='text-tatum-heading-sm font-tatum-semibold text-tatum-gray-900'>
              The quick brown fox jumps over the lazy dog
            </h3>
            <p className='mt-tatum-md text-tatum-text-sm text-tatum-gray-500'>
              Font size: 1.875rem / Line height: 2.375rem
            </p>
          </div>

          <div>
            <p className='mb-tatum-xs text-tatum-text-sm text-tatum-gray-500'>
              text-tatum-heading-xs
            </p>
            <h4 className='text-tatum-heading-xs font-tatum-semibold text-tatum-gray-900'>
              The quick brown fox jumps over the lazy dog
            </h4>
            <p className='mt-tatum-md text-tatum-text-sm text-tatum-gray-500'>
              Font size: 1.5rem / Line height: 2rem
            </p>
          </div>
        </div>
      </Section>

      <Section
        title='Text Sizes'
        description='Used for body text, paragraphs, and other content.'
      >
        <div className='space-y-tatum-3xl'>
          <div className='border-b border-tatum-gray-200 pb-tatum-3xl'>
            <p className='mb-tatum-xs text-tatum-text-sm text-tatum-gray-500'>
              text-tatum-text-xl
            </p>
            <p className='text-tatum-text-xl text-tatum-gray-900'>
              The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit.
            </p>
            <p className='mt-tatum-md text-tatum-text-sm text-tatum-gray-500'>
              Font size: 1.25rem / Line height: 1.875rem
            </p>
          </div>

          <div className='border-b border-tatum-gray-200 pb-tatum-3xl'>
            <p className='mb-tatum-xs text-tatum-text-sm text-tatum-gray-500'>
              text-tatum-text-lg
            </p>
            <p className='text-tatum-text-lg text-tatum-gray-900'>
              The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit.
            </p>
            <p className='mt-tatum-md text-tatum-text-sm text-tatum-gray-500'>
              Font size: 1.125rem / Line height: 1.75rem
            </p>
          </div>

          <div className='border-b border-tatum-gray-200 pb-tatum-3xl'>
            <p className='mb-tatum-xs text-tatum-text-sm text-tatum-gray-500'>
              text-tatum-text-md
            </p>
            <p className='text-tatum-text-md text-tatum-gray-900'>
              The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit.
            </p>
            <p className='mt-tatum-md text-tatum-text-sm text-tatum-gray-500'>
              Font size: 1rem / Line height: 1.5rem
            </p>
          </div>

          <div className='border-b border-tatum-gray-200 pb-tatum-3xl'>
            <p className='mb-tatum-xs text-tatum-text-sm text-tatum-gray-500'>
              text-tatum-text-sm
            </p>
            <p className='text-tatum-text-sm text-tatum-gray-900'>
              The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit.
            </p>
            <p className='mt-tatum-md text-tatum-text-sm text-tatum-gray-500'>
              Font size: 0.875rem / Line height: 1.25rem
            </p>
          </div>

          <div>
            <p className='mb-tatum-xs text-tatum-text-sm text-tatum-gray-500'>
              text-tatum-text-xs
            </p>
            <p className='text-tatum-text-xs text-tatum-gray-900'>
              The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit.
            </p>
            <p className='mt-tatum-md text-tatum-text-sm text-tatum-gray-500'>
              Font size: 0.75rem / Line height: 1.125rem
            </p>
          </div>
        </div>
      </Section>
    </StoriesContainer>
  ),
}

export const FontWeights: Story = {
  render: () => (
    <StoriesContainer
      title='Font Weights'
      description='Font weight options in the Tatum Design System'
    >
      <Section
        title='Font Weights'
        description='Font weight tokens for varying text emphasis.'
      >
        <div className='space-y-tatum-3xl'>
          <div className='border-b border-tatum-gray-200 pb-tatum-3xl'>
            <p className='mb-tatum-xs text-tatum-text-sm text-tatum-gray-500'>
              font-tatum-bold (700)
            </p>
            <p className='text-tatum-text-lg font-tatum-bold text-tatum-gray-900'>
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>

          <div className='border-b border-tatum-gray-200 pb-tatum-3xl'>
            <p className='mb-tatum-xs text-tatum-text-sm text-tatum-gray-500'>
              font-tatum-semibold (600)
            </p>
            <p className='text-tatum-text-lg font-tatum-semibold text-tatum-gray-900'>
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>

          <div className='border-b border-tatum-gray-200 pb-tatum-3xl'>
            <p className='mb-tatum-xs text-tatum-text-sm text-tatum-gray-500'>
              font-tatum-medium (500)
            </p>
            <p className='text-tatum-text-lg font-tatum-medium text-tatum-gray-900'>
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>

          <div>
            <p className='mb-tatum-xs text-tatum-text-sm text-tatum-gray-500'>
              font-tatum-regular (400)
            </p>
            <p className='text-tatum-text-lg font-tatum-regular text-tatum-gray-900'>
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>
        </div>
      </Section>
    </StoriesContainer>
  ),
}

export const FontFamilies: Story = {
  render: () => (
    <StoriesContainer
      title='Font Family'
      description='Default font family in the Tatum Design System'
    >
      <Section
        title='Font Family'
        description='Poppins font is automatically applied to all text in the design system.'
      >
        <div className='space-y-tatum-3xl'>
          <div>
            <p className='mb-tatum-md text-tatum-text-md text-tatum-gray-900'>
              Tatum Design System uses Poppins as its default font family for
              all text elements. The font is automatically applied through the
              design system is base styles, so you do not need to add any
              special classes for the font family.
            </p>
            <p className='mb-tatum-md text-tatum-text-md text-tatum-gray-900'>
              This is regular text using the Poppins font.
            </p>
            <h3 className='mb-tatum-md text-tatum-heading-sm font-tatum-semibold text-tatum-gray-900'>
              This is a heading using the Poppins font.
            </h3>
            <p className='text-tatum-text-sm text-tatum-gray-500'>
              Font family: Poppins, sans-serif
            </p>
          </div>
        </div>
      </Section>
    </StoriesContainer>
  ),
}

```

## transition

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Section, StoriesContainer } from './common'

const meta: Meta = {
  title: 'Tailwind Plugin/Transitions',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['!autodocs'],
}

export default meta
type Story = StoryObj

export const TransitionProperties: Story = {
  render: function Render() {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null)

    return (
      <StoriesContainer
        title='Transition Properties Demonstration'
        description='Visual demonstration of different transition properties in the Tatum Design System.'
      >
        <Section
          title='Transition Properties'
          description='Hover over each card to see the different transition properties in action.'
        >
          <div
            className='grid grid-cols-1 gap-tatum-xl md:grid-cols-2 lg:grid-cols-3'
            onMouseLeave={() => setHoveredCard(null)}
          >
            {[
              {
                key: 'default',
                title: 'Default Transition',
                description: 'Changes background, border, shadow and transform',
                color: 'primary',
                transitionClass: 'transition-tatum-default',
              },
              {
                key: 'colors',
                title: 'Colors Transition',
                description: 'Only changes colors (background & border)',
                color: 'secondary',
                transitionClass: 'transition-tatum-colors',
              },
              {
                key: 'shadow',
                title: 'Shadow Transition',
                description: 'Only changes box-shadow property',
                color: 'tertiary',
                transitionClass: 'transition-tatum-shadow',
              },
              {
                key: 'transform',
                title: 'Transform Transition',
                description: 'Only changes transform properties',
                color: 'success',
                transitionClass: 'transition-tatum-transform',
              },
              {
                key: 'opacity',
                title: 'Opacity Transition',
                description: 'Only changes opacity property',
                color: 'warning',
                transitionClass: 'transition-tatum-opacity',
              },
            ].map(({ key, title, description, color, transitionClass }) => (
              <div
                key={key}
                className={`relative cursor-pointer overflow-hidden rounded-tatum-lg transition-all duration-tatum-normal bg-tatum-${color}-100 border-4 border-tatum-${color}-300 ${
                  hoveredCard === key
                    ? ` ${key === 'shadow' ? 'shadow-tatum-xl' : ''} ${key === 'colors' ? `border-tatum-${color}-500 bg-tatum-${color}-300` : ''} ${key === 'default' ? `shadow-tatum-xl border-tatum-${color}-500 bg-tatum-${color}-300` : ''} ${key === 'transform' ? 'rotate-3' : ''} ${key === 'opacity' ? 'opacity-40' : 'opacity-100'} `
                    : 'shadow-tatum-sm'
                } `}
                onMouseEnter={() => setHoveredCard(key)}
              >
                <div className='flex h-[250px] flex-col items-center justify-center p-tatum-3xl'>
                  <h3
                    className={`text-tatum-text-lg font-tatum-bold text-tatum-${color}-900 mb-tatum-md`}
                  >
                    {title}
                  </h3>
                  <p
                    className={`text-tatum-text-md text-tatum-${color}-700 text-center`}
                  >
                    {description}
                  </p>
                </div>
                <div className='absolute bottom-tatum-md left-0 right-0 flex justify-center'>
                  <div className='rounded-tatum-md bg-tatum-white px-tatum-md py-tatum-xs shadow-tatum-sm'>
                    <span className='text-tatum-text-sm font-tatum-bold text-tatum-gray-900'>
                      {transitionClass}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </StoriesContainer>
    )
  },
}

export const TransitionTimingFunctions: Story = {
  render: function Render() {
    const [isAnimating, setIsAnimating] = useState(false)

    const toggleAnimation = () => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 4500)
    }

    return (
      <StoriesContainer
        title='Transition Timing Functions'
        description='Visual demonstration of different transition timing functions in the Tatum Design System.'
      >
        <Section
          title='Timing Functions'
          description='Click the button to trigger animations with different timing functions.'
        >
          <div className='mb-tatum-3xl'>
            <button
              onClick={toggleAnimation}
              className='rounded-tatum-lg bg-tatum-primary-500 px-tatum-2xl py-tatum-lg font-tatum-semibold text-tatum-white transition-tatum-colors duration-tatum-normal hover:bg-tatum-primary-600'
            >
              Trigger Animations
            </button>
          </div>

          <div className='space-y-tatum-3xl'>
            <div className='relative overflow-hidden rounded-tatum-lg'>
              <div className='relative h-tatum-3xl rounded-tatum-lg bg-tatum-gray-100'>
                <div
                  className={`timing-tatum-linear h-full w-20 rounded-tatum-lg bg-tatum-primary-500 transition-tatum-transform duration-tatum-very-slow ${isAnimating ? 'translate-x-[300px]' : ''}`}
                ></div>
              </div>
              <div className='mt-tatum-md'>
                <p className='text-tatum-text-md font-tatum-semibold text-tatum-gray-900'>
                  Linear
                </p>
                <p className='text-tatum-text-sm text-tatum-gray-600'>
                  timing-tatum-linear
                </p>
                <p className='text-tatum-text-xs text-tatum-gray-500'>
                  cubic-bezier(0, 0, 1, 1)
                </p>
              </div>
            </div>

            <div className='relative overflow-hidden rounded-tatum-lg'>
              <div className='relative h-tatum-3xl rounded-tatum-lg bg-tatum-gray-100'>
                <div
                  className={`timing-tatum-in h-full w-20 rounded-tatum-lg bg-tatum-secondary-500 transition-tatum-transform duration-tatum-very-slow ${isAnimating ? 'translate-x-[300px]' : ''}`}
                ></div>
              </div>
              <div className='mt-tatum-md'>
                <p className='text-tatum-text-md font-tatum-semibold text-tatum-gray-900'>
                  Ease In
                </p>
                <p className='text-tatum-text-sm text-tatum-gray-600'>
                  timing-tatum-in
                </p>
                <p className='text-tatum-text-xs text-tatum-gray-500'>
                  cubic-bezier(0.4, 0, 1, 1)
                </p>
              </div>
            </div>

            <div className='relative overflow-hidden rounded-tatum-lg'>
              <div className='relative h-tatum-3xl rounded-tatum-lg bg-tatum-gray-100'>
                <div
                  className={`timing-tatum-out h-full w-20 rounded-tatum-lg bg-tatum-tertiary-500 transition-tatum-transform duration-tatum-very-slow ${isAnimating ? 'translate-x-[300px]' : ''}`}
                ></div>
              </div>
              <div className='mt-tatum-md'>
                <p className='text-tatum-text-md font-tatum-semibold text-tatum-gray-900'>
                  Ease Out
                </p>
                <p className='text-tatum-text-sm text-tatum-gray-600'>
                  timing-tatum-out
                </p>
                <p className='text-tatum-text-xs text-tatum-gray-500'>
                  cubic-bezier(0, 0, 0.2, 1)
                </p>
              </div>
            </div>

            <div className='relative overflow-hidden rounded-tatum-lg'>
              <div className='relative h-tatum-3xl rounded-tatum-lg bg-tatum-gray-100'>
                <div
                  className={`timing-tatum-in-out h-full w-20 rounded-tatum-lg bg-tatum-success-500 transition-tatum-transform duration-tatum-very-slow ${isAnimating ? 'translate-x-[300px]' : ''}`}
                ></div>
              </div>
              <div className='mt-tatum-md'>
                <p className='text-tatum-text-md font-tatum-semibold text-tatum-gray-900'>
                  Ease In Out
                </p>
                <p className='text-tatum-text-sm text-tatum-gray-600'>
                  timing-tatum-in-out
                </p>
                <p className='text-tatum-text-xs text-tatum-gray-500'>
                  cubic-bezier(0.4, 0, 0.2, 1)
                </p>
              </div>
            </div>

            <div className='relative overflow-hidden rounded-tatum-lg'>
              <div className='relative h-tatum-3xl rounded-tatum-lg bg-tatum-gray-100'>
                <div
                  className={`timing-tatum-default h-full w-20 rounded-tatum-lg bg-tatum-warning-500 transition-tatum-transform duration-tatum-very-slow ${isAnimating ? 'translate-x-[300px]' : ''}`}
                ></div>
              </div>
              <div className='mt-tatum-md'>
                <p className='text-tatum-text-md font-tatum-semibold text-tatum-gray-900'>
                  Default
                </p>
                <p className='text-tatum-text-sm text-tatum-gray-600'>
                  timing-tatum-default
                </p>
                <p className='text-tatum-text-xs text-tatum-gray-500'>
                  cubic-bezier(0.4, 0, 0.2, 1)
                </p>
              </div>
            </div>
          </div>
        </Section>
      </StoriesContainer>
    )
  },
}

export const TransitionDurations: Story = {
  render: function Render() {
    const [isAnimating, setIsAnimating] = useState(false)

    const toggleAnimation = () => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 2000)
    }

    return (
      <StoriesContainer
        title='Transition Durations'
        description='Visual demonstration of different transition durations in the Tatum Design System.'
      >
        <Section
          title='Duration Values'
          description='Click the button to see the effect of different transition durations. All animations use the same timing function.'
        >
          <div className='mb-tatum-3xl'>
            <button
              onClick={toggleAnimation}
              className='rounded-tatum-lg bg-tatum-primary-500 px-tatum-2xl py-tatum-lg font-tatum-semibold text-tatum-white transition-tatum-colors duration-tatum-normal hover:bg-tatum-primary-600'
            >
              Trigger Animations
            </button>
          </div>

          <div className='space-y-tatum-3xl'>
            <div className='relative overflow-hidden rounded-tatum-lg'>
              <div className='relative h-tatum-3xl rounded-tatum-lg bg-tatum-gray-100'>
                <div
                  className={`timing-tatum-default h-full w-20 rounded-tatum-lg bg-tatum-primary-500 transition-tatum-transform duration-tatum-fast ${isAnimating ? 'translate-x-[300px]' : ''}`}
                ></div>
              </div>
              <div className='mt-tatum-md flex items-center justify-between'>
                <div>
                  <p className='text-tatum-text-md font-tatum-semibold text-tatum-gray-900'>
                    Fast
                  </p>
                  <p className='text-tatum-text-sm text-tatum-gray-600'>
                    duration-tatum-fast
                  </p>
                  <p className='text-tatum-text-xs text-tatum-gray-500'>
                    150ms
                  </p>
                </div>
                <div className='h-1 w-32 overflow-hidden rounded-tatum-full bg-tatum-gray-200'>
                  <div className='h-full w-1/4 bg-tatum-primary-500'></div>
                </div>
              </div>
            </div>

            <div className='relative overflow-hidden rounded-tatum-lg'>
              <div className='relative h-tatum-3xl rounded-tatum-lg bg-tatum-gray-100'>
                <div
                  className={`timing-tatum-default h-full w-20 rounded-tatum-lg bg-tatum-secondary-500 transition-tatum-transform duration-tatum-normal ${isAnimating ? 'translate-x-[300px]' : ''}`}
                ></div>
              </div>
              <div className='mt-tatum-md flex items-center justify-between'>
                <div>
                  <p className='text-tatum-text-md font-tatum-semibold text-tatum-gray-900'>
                    Normal
                  </p>
                  <p className='text-tatum-text-sm text-tatum-gray-600'>
                    duration-tatum-normal
                  </p>
                  <p className='text-tatum-text-xs text-tatum-gray-500'>
                    300ms
                  </p>
                </div>
                <div className='h-1 w-32 overflow-hidden rounded-tatum-full bg-tatum-gray-200'>
                  <div className='h-full w-1/2 bg-tatum-secondary-500'></div>
                </div>
              </div>
            </div>

            <div className='relative overflow-hidden rounded-tatum-lg'>
              <div className='relative h-tatum-3xl rounded-tatum-lg bg-tatum-gray-100'>
                <div
                  className={`timing-tatum-default h-full w-20 rounded-tatum-lg bg-tatum-tertiary-500 transition-tatum-transform duration-tatum-slow ${isAnimating ? 'translate-x-[300px]' : ''}`}
                ></div>
              </div>
              <div className='mt-tatum-md flex items-center justify-between'>
                <div>
                  <p className='text-tatum-text-md font-tatum-semibold text-tatum-gray-900'>
                    Slow
                  </p>
                  <p className='text-tatum-text-sm text-tatum-gray-600'>
                    duration-tatum--slow
                  </p>
                  <p className='text-tatum-text-xs text-tatum-gray-500'>
                    500ms
                  </p>
                </div>
                <div className='h-1 w-32 overflow-hidden rounded-tatum-full bg-tatum-gray-200'>
                  <div className='h-full w-3/4 bg-tatum-tertiary-500'></div>
                </div>
              </div>
            </div>
            <div className='relative overflow-hidden rounded-tatum-lg'>
              <div className='relative h-tatum-3xl rounded-tatum-lg bg-tatum-gray-100'>
                <div
                  className={`timing-tatum-default h-full w-20 rounded-tatum-lg bg-tatum-error-500 transition-tatum-transform duration-tatum-very-slow ${isAnimating ? 'translate-x-[300px]' : ''}`}
                ></div>
              </div>
              <div className='mt-tatum-md flex items-center justify-between'>
                <div>
                  <p className='text-tatum-text-md font-tatum-semibold text-tatum-gray-900'>
                    Slow
                  </p>
                  <p className='text-tatum-text-sm text-tatum-gray-600'>
                    duration-tatum-very-slow
                  </p>
                  <p className='text-tatum-text-xs text-tatum-gray-500'>
                    1500ms
                  </p>
                </div>
                <div className='h-1 w-32 overflow-hidden rounded-tatum-full bg-tatum-gray-200'>
                  <div className='h-full w-full bg-tatum-error-500'></div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </StoriesContainer>
    )
  },
}

```

## colors

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Section, StoriesContainer } from './common'

interface Props {
  colorClass: string
  colorName: string
  colorValue: string
}

const ColorSwatch = ({ colorClass, colorName, colorValue }: Props) => (
  <div className='mb-tatum-xl flex flex-col'>
    <div className={`mb-tatum-xs h-16 rounded-tatum-md ${colorClass}`}></div>
    <p className='text-tatum-text-sm font-tatum-medium'>{colorName}</p>
    <p className='text-tatum-text-xs text-tatum-gray-500'>{colorValue}</p>
  </div>
)

const meta: Meta = {
  title: 'Tailwind Plugin/Colors',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['!autodocs'],
}

export default meta
type Story = StoryObj

export const ColorPalette: Story = {
  render: () => (
    <StoriesContainer
      title='Color Palette'
      description='The complete Tatum Design System color palette for consistent UI design.'
    >
      <Section
        title='Primary Colors'
        description='Primary brand colors used across the Tatum Design System.'
      >
        <div className='grid grid-cols-2 gap-tatum-xl md:grid-cols-3 lg:grid-cols-4'>
          <ColorSwatch
            colorClass='bg-tatum-primary-50'
            colorName='tatum-primary-50'
            colorValue='rgba(235,234,255,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-primary-100'
            colorName='tatum-primary-100'
            colorValue='rgba(213,211,254,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-primary-200'
            colorName='tatum-primary-200'
            colorValue='rgba(189,184,254,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-primary-300'
            colorName='tatum-primary-300'
            colorValue='rgba(161,154,254,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-primary-400'
            colorName='tatum-primary-400'
            colorValue='rgba(126,115,253,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-primary-500'
            colorName='tatum-primary-500'
            colorValue='rgba(79,55,253,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-primary-600'
            colorName='tatum-primary-600'
            colorValue='rgba(72,50,231,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-primary-700'
            colorName='tatum-primary-700'
            colorValue='rgba(64,45,206,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-primary-800'
            colorName='tatum-primary-800'
            colorValue='rgba(56,39,179,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-primary-900'
            colorName='tatum-primary-900'
            colorValue='rgba(46,32,146,1.00)'
          />
        </div>
      </Section>

      <Section
        title='Gray Scale'
        description='Gray scale colors for text, backgrounds, and borders.'
      >
        <div className='grid grid-cols-2 gap-tatum-xl md:grid-cols-3 lg:grid-cols-4'>
          <ColorSwatch
            colorClass='bg-tatum-gray-50'
            colorName='tatum-gray-50'
            colorValue='rgba(250,250,250,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-gray-100'
            colorName='tatum-gray-100'
            colorValue='rgba(245,245,245,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-gray-200'
            colorName='tatum-gray-200'
            colorValue='rgba(233,234,235,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-gray-300'
            colorName='tatum-gray-300'
            colorValue='rgba(213,215,218,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-gray-400'
            colorName='tatum-gray-400'
            colorValue='rgba(164,167,174,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-gray-500'
            colorName='tatum-gray-500'
            colorValue='rgba(113,118,128,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-gray-600'
            colorName='tatum-gray-600'
            colorValue='rgba(83,88,98,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-gray-700'
            colorName='tatum-gray-700'
            colorValue='rgba(65,70,81,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-gray-800'
            colorName='tatum-gray-800'
            colorValue='rgba(37,43,55,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-gray-900'
            colorName='tatum-gray-900'
            colorValue='rgba(24,29,39,1.00)'
          />
        </div>
      </Section>

      <Section
        title='Secondary Colors'
        description='Secondary colors used for UI elements.'
      >
        <div className='grid grid-cols-2 gap-tatum-xl md:grid-cols-3 lg:grid-cols-4'>
          <ColorSwatch
            colorClass='bg-tatum-secondary-50'
            colorName='tatum-secondary-50'
            colorValue='rgba(233,233,235,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-secondary-100'
            colorName='tatum-secondary-100'
            colorValue='rgba(209,209,213,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-secondary-200'
            colorName='tatum-secondary-200'
            colorValue='rgba(181,182,189,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-secondary-300'
            colorName='tatum-secondary-300'
            colorValue='rgba(149,149,161,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-secondary-400'
            colorName='tatum-secondary-400'
            colorValue='rgba(107,107,126,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-secondary-500'
            colorName='tatum-secondary-500'
            colorValue='rgba(28,30,79,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-secondary-600'
            colorName='tatum-secondary-600'
            colorValue='rgba(26,27,72,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-secondary-700'
            colorName='tatum-secondary-700'
            colorValue='rgba(23,24,64,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-secondary-800'
            colorName='tatum-secondary-800'
            colorValue='rgba(20,21,56,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-secondary-900'
            colorName='tatum-secondary-900'
            colorValue='rgba(16,17,46,1.00)'
          />
        </div>
      </Section>

      <Section
        title='Tertiary Colors'
        description='Tertiary colors used for additional accents.'
      >
        <div className='grid grid-cols-2 gap-tatum-xl md:grid-cols-3 lg:grid-cols-4'>
          <ColorSwatch
            colorClass='bg-tatum-tertiary-50'
            colorName='tatum-tertiary-50'
            colorValue='rgba(234,247,241,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-tertiary-100'
            colorName='tatum-tertiary-100'
            colorValue='rgba(210,239,226,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-tertiary-200'
            colorName='tatum-tertiary-200'
            colorValue='rgba(183,231,211,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-tertiary-300'
            colorName='tatum-tertiary-300'
            colorValue='rgba(152,223,194,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-tertiary-400'
            colorName='tatum-tertiary-400'
            colorValue='rgba(111,214,175,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-tertiary-500'
            colorName='tatum-tertiary-500'
            colorValue='rgba(44,205,154,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-tertiary-600'
            colorName='tatum-tertiary-600'
            colorValue='rgba(40,187,141,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-tertiary-700'
            colorName='tatum-tertiary-700'
            colorValue='rgba(36,167,126,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-tertiary-800'
            colorName='tatum-tertiary-800'
            colorValue='rgba(31,145,109,1.00)'
          />
          <ColorSwatch
            colorClass='bg-tatum-tertiary-900'
            colorName='tatum-tertiary-900'
            colorValue='rgba(25,118,89,1.00)'
          />
        </div>
      </Section>

      <Section
        title='Feedback Colors'
        description='Colors for feedback states and notifications.'
      >
        <div className='space-y-tatum-4xl'>
          <div>
            <h3 className='mb-tatum-md text-tatum-heading-xs font-tatum-semibold'>
              Success
            </h3>
            <div className='grid grid-cols-2 gap-tatum-xl md:grid-cols-3 lg:grid-cols-4'>
              <ColorSwatch
                colorClass='bg-tatum-success-50'
                colorName='tatum-success-50'
                colorValue='rgba(236,253,243,1.00)'
              />
              <ColorSwatch
                colorClass='bg-tatum-success-100'
                colorName='tatum-success-100'
                colorValue='rgba(220,250,230,1.00)'
              />
              <ColorSwatch
                colorClass='bg-tatum-success-200'
                colorName='tatum-success-200'
                colorValue='rgba(171,239,198,1.00)'
              />
              <ColorSwatch
                colorClass='bg-tatum-success-300'
                colorName='tatum-success-300'
                colorValue='rgba(117,224,167,1.00)'
              />
              <ColorSwatch
                colorClass='bg-tatum-success-400'
                colorName='tatum-success-400'
                colorValue='rgba(71,205,137,1.00)'
              />
              <ColorSwatch
                colorClass='bg-tatum-success-500'
                colorName='tatum-success-500'
                colorValue='rgba(23,178,106,1.00)'
              />
              <ColorSwatch
                colorClass='bg-tatum-success-600'
                colorName='tatum-success-600'
                colorValue='rgba(7,148,85,1.00)'
              />
              <ColorSwatch
                colorClass='bg-tatum-success-700'
                colorName='tatum-success-700'
                colorValue='rgba(6,118,71,1.00)'
              />
            </div>
          </div>

          <div>
            <h3 className='mb-tatum-md text-tatum-heading-xs font-tatum-semibold'>
              Error
            </h3>
            <div className='grid grid-cols-2 gap-tatum-xl md:grid-cols-3 lg:grid-cols-4'>
              <ColorSwatch
                colorClass='bg-tatum-error-50'
                colorName='tatum-error-50'
                colorValue='rgba(254,243,242,1.00)'
              />
              <ColorSwatch
                colorClass='bg-tatum-error-100'
                colorName='tatum-error-100'
                colorValue='rgba(254,228,226,1.00)'
              />
              <ColorSwatch
                colorClass='bg-tatum-error-200'
                colorName='tatum-error-200'
                colorValue='rgba(254,205,202,1.00)'
              />
              <ColorSwatch
                colorClass='bg-tatum-error-300'
                colorName='tatum-error-300'
                colorValue='rgba(253,162,155,1.00)'
              />
              <ColorSwatch
                colorClass='bg-tatum-error-400'
                colorName='tatum-error-400'
                colorValue='rgba(249,112,102,1.00)'
              />
              <ColorSwatch
                colorClass='bg-tatum-error-500'
                colorName='tatum-error-500'
                colorValue='rgba(240,68,56,1.00)'
              />
              <ColorSwatch
                colorClass='bg-tatum-error-600'
                colorName='tatum-error-600'
                colorValue='rgba(217,45,32,1.00)'
              />
              <ColorSwatch
                colorClass='bg-tatum-error-700'
                colorName='tatum-error-700'
                colorValue='rgba(180,35,24,1.00)'
              />
            </div>
          </div>

          <div>
            <h3 className='mb-tatum-md text-tatum-heading-xs font-tatum-semibold'>
              Warning
            </h3>
            <div className='grid grid-cols-2 gap-tatum-xl md:grid-cols-3 lg:grid-cols-4'>
              <ColorSwatch
                colorClass='bg-tatum-warning-50'
                colorName='tatum-warning-50'
                colorValue='rgba(255,250,235,1.00)'
              />
              <ColorSwatch
                colorClass='bg-tatum-warning-100'
                colorName='tatum-warning-100'
                colorValue='rgba(254,240,199,1.00)'
              />
              <ColorSwatch
                colorClass='bg-tatum-warning-200'
                colorName='tatum-warning-200'
                colorValue='rgba(254,223,137,1.00)'
              />
              <ColorSwatch
                colorClass='bg-tatum-warning-300'
                colorName='tatum-warning-300'
                colorValue='rgba(254,200,75,1.00)'
              />
              <ColorSwatch
                colorClass='bg-tatum-warning-400'
                colorName='tatum-warning-400'
                colorValue='rgba(253,176,34,1.00)'
              />
              <ColorSwatch
                colorClass='bg-tatum-warning-500'
                colorName='tatum-warning-500'
                colorValue='rgba(247,144,9,1.00)'
              />
              <ColorSwatch
                colorClass='bg-tatum-warning-600'
                colorName='tatum-warning-600'
                colorValue='rgba(220,104,3,1.00)'
              />
              <ColorSwatch
                colorClass='bg-tatum-warning-700'
                colorName='tatum-warning-700'
                colorValue='rgba(181,71,8,1.00)'
              />
            </div>
          </div>
        </div>
      </Section>

      <Section
        title='Base Colors'
        description='Foundational colors in the system.'
      >
        <div className='grid grid-cols-1 gap-tatum-xl md:grid-cols-3'>
          <div className='flex flex-col'>
            <div className='mb-tatum-xs h-16 rounded-tatum-md border border-tatum-gray-200 bg-tatum-white'></div>
            <p className='text-tatum-text-sm font-tatum-medium'>tatum-white</p>
            <p className='text-tatum-text-xs text-tatum-gray-500'>
              rgba(255,255,255,1.00)
            </p>
          </div>
          <div className='flex flex-col'>
            <div className='mb-tatum-xs h-16 rounded-tatum-md bg-tatum-black'></div>
            <p className='text-tatum-text-sm font-tatum-medium text-tatum-black'>
              tatum-black
            </p>
            <p className='text-tatum-text-xs text-tatum-gray-500'>
              rgba(0,0,0,1.00)
            </p>
          </div>
          <div className='flex flex-col'>
            <div className='mb-tatum-xs h-16 rounded-tatum-md border border-dashed border-tatum-gray-300 bg-tatum-transparent'></div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              tatum-transparent
            </p>
            <p className='text-tatum-text-xs text-tatum-gray-500'>
              rgba(255,255,255,0.00)
            </p>
          </div>
        </div>
      </Section>
    </StoriesContainer>
  ),
}

```

## borders-shadows

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Section, StoriesContainer } from './common'

const meta: Meta = {
  title: 'Tailwind Plugin/Borders and Shadows',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['!autodocs'],
}

export default meta
type Story = StoryObj

export const BorderRadius: Story = {
  render: () => (
    <StoriesContainer
      title='Border Radius'
      description='Border radius tokens in the Tatum Design System for consistent corner rounding.'
    >
      <Section
        title='Border Radius Scale'
        description='A range of border radius options from none to full rounded.'
      >
        <div className='grid grid-cols-2 gap-tatum-xl md:grid-cols-3 lg:grid-cols-4'>
          <div className='space-y-tatum-md'>
            <div className='flex h-24 w-full items-center justify-center rounded-tatum-none border border-tatum-primary-500 bg-tatum-primary-100'>
              <p className='font-tatum-medium text-tatum-primary-800'>None</p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              rounded-tatum-none
            </p>
            <p className='text-tatum-text-xs text-tatum-gray-500'>0rem</p>
          </div>

          <div className='space-y-tatum-md'>
            <div className='flex h-24 w-full items-center justify-center rounded-tatum-xs border border-tatum-primary-500 bg-tatum-primary-100'>
              <p className='font-tatum-medium text-tatum-primary-800'>
                XS (0.25rem)
              </p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              rounded-tatum-xs
            </p>
            <p className='text-tatum-text-xs text-tatum-gray-500'>0.25rem</p>
          </div>

          <div className='space-y-tatum-md'>
            <div className='flex h-24 w-full items-center justify-center rounded-tatum-md border border-tatum-primary-500 bg-tatum-primary-100'>
              <p className='font-tatum-medium text-tatum-primary-800'>
                MD (0.5rem)
              </p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              rounded-tatum-md
            </p>
            <p className='text-tatum-text-xs text-tatum-gray-500'>0.5rem</p>
          </div>

          <div className='space-y-tatum-md'>
            <div className='flex h-24 w-full items-center justify-center rounded-tatum-lg border border-tatum-primary-500 bg-tatum-primary-100'>
              <p className='font-tatum-medium text-tatum-primary-800'>
                LG (0.625rem)
              </p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              rounded-tatum-lg
            </p>
            <p className='text-tatum-text-xs text-tatum-gray-500'>0.625rem</p>
          </div>

          <div className='space-y-tatum-md'>
            <div className='flex h-24 w-full items-center justify-center rounded-tatum-xl border border-tatum-primary-500 bg-tatum-primary-100'>
              <p className='font-tatum-medium text-tatum-primary-800'>
                XL (0.75rem)
              </p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              rounded-tatum-xl
            </p>
            <p className='text-tatum-text-xs text-tatum-gray-500'>0.75rem</p>
          </div>

          <div className='space-y-tatum-md'>
            <div className='flex h-24 w-full items-center justify-center rounded-tatum-2xl border border-tatum-primary-500 bg-tatum-primary-100'>
              <p className='font-tatum-medium text-tatum-primary-800'>
                2XL (1rem)
              </p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              rounded-tatum-2xl
            </p>
            <p className='text-tatum-text-xs text-tatum-gray-500'>1rem</p>
          </div>

          <div className='space-y-tatum-md'>
            <div className='flex h-24 w-full items-center justify-center rounded-tatum-full border border-tatum-primary-500 bg-tatum-primary-100'>
              <p className='font-tatum-medium text-tatum-primary-800'>Full</p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              rounded-tatum-full
            </p>
            <p className='text-tatum-text-xs text-tatum-gray-500'>50%</p>
          </div>
        </div>
      </Section>

      <Section
        title='Direction-Specific Border Radius'
        description='Border radius can be applied to specific corners.'
      >
        <div className='grid grid-cols-2 gap-tatum-xl md:grid-cols-2'>
          <div className='space-y-tatum-md'>
            <div className='flex h-24 w-full items-center justify-center rounded-t-tatum-xl border border-tatum-tertiary-500 bg-tatum-tertiary-100'>
              <p className='font-tatum-medium text-tatum-tertiary-800'>
                Top corners only
              </p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              rounded-t-tatum-xl
            </p>
          </div>

          <div className='space-y-tatum-md'>
            <div className='flex h-24 w-full items-center justify-center rounded-b-tatum-xl border border-tatum-tertiary-500 bg-tatum-tertiary-100'>
              <p className='font-tatum-medium text-tatum-tertiary-800'>
                Bottom corners only
              </p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              rounded-b-tatum-xl
            </p>
          </div>

          <div className='space-y-tatum-md'>
            <div className='flex h-24 w-full items-center justify-center rounded-tl-tatum-xl border border-tatum-tertiary-500 bg-tatum-tertiary-100'>
              <p className='font-tatum-medium text-tatum-tertiary-800'>
                Top-left only
              </p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              rounded-tl-tatum-xl
            </p>
          </div>

          <div className='space-y-tatum-md'>
            <div className='flex h-24 w-full items-center justify-center rounded-br-tatum-xl border border-tatum-tertiary-500 bg-tatum-tertiary-100'>
              <p className='font-tatum-medium text-tatum-tertiary-800'>
                Bottom-right only
              </p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              rounded-br-tatum-xl
            </p>
          </div>
        </div>
      </Section>
    </StoriesContainer>
  ),
}

export const BorderWidth: Story = {
  render: () => (
    <StoriesContainer
      title='Border Width'
      description='Border width tokens in the Tatum Design System for consistent borders.'
    >
      <Section
        title='Border Width Scale'
        description='A range of border width options.'
      >
        <div className='grid grid-cols-2 gap-tatum-xl md:grid-cols-3'>
          <div className='space-y-tatum-md'>
            <div className='flex h-24 w-full items-center justify-center border-tatum-xs border-tatum-primary-500 bg-tatum-white'>
              <p className='font-tatum-medium text-tatum-primary-800'>
                XS (0.0625rem)
              </p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              border-tatum-xs
            </p>
            <p className='text-tatum-text-xs text-tatum-gray-500'>0.0625rem</p>
          </div>

          <div className='space-y-tatum-md'>
            <div className='flex h-24 w-full items-center justify-center border-tatum-sm border-tatum-primary-500 bg-tatum-white'>
              <p className='font-tatum-medium text-tatum-primary-800'>
                SM (0.125rem)
              </p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              border-tatum-sm
            </p>
            <p className='text-tatum-text-xs text-tatum-gray-500'>0.125rem</p>
          </div>

          <div className='space-y-tatum-md'>
            <div className='flex h-24 w-full items-center justify-center border-tatum-md border-tatum-primary-500 bg-tatum-white'>
              <p className='font-tatum-medium text-tatum-primary-800'>
                MD (0.1875rem)
              </p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              border-tatum-md
            </p>
            <p className='text-tatum-text-xs text-tatum-gray-500'>0.1875rem</p>
          </div>

          <div className='space-y-tatum-md'>
            <div className='flex h-24 w-full items-center justify-center border-tatum-lg border-tatum-primary-500 bg-tatum-white'>
              <p className='font-tatum-medium text-tatum-primary-800'>
                LG (0.25rem)
              </p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              border-tatum-lg
            </p>
            <p className='text-tatum-text-xs text-tatum-gray-500'>0.25rem</p>
          </div>

          <div className='space-y-tatum-md'>
            <div className='flex h-24 w-full items-center justify-center border-tatum-xl border-tatum-primary-500 bg-tatum-white'>
              <p className='font-tatum-medium text-tatum-primary-800'>
                XL (0.375rem)
              </p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              border-tatum-xl
            </p>
            <p className='text-tatum-text-xs text-tatum-gray-500'>0.375rem</p>
          </div>
        </div>
      </Section>

      <Section
        title='Border Directions'
        description='Borders can be applied to specific sides.'
      >
        <div className='grid grid-cols-2 gap-tatum-xl md:grid-cols-4'>
          <div className='space-y-tatum-md'>
            <div className='flex h-24 w-full items-center justify-center border-t-tatum-md border-tatum-error-500 bg-tatum-white'>
              <p className='font-tatum-medium text-tatum-error-800'>Top only</p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              border-t-tatum-md
            </p>
          </div>

          <div className='space-y-tatum-md'>
            <div className='flex h-24 w-full items-center justify-center border-r-tatum-md border-tatum-error-500 bg-tatum-white'>
              <p className='font-tatum-medium text-tatum-error-800'>
                Right only
              </p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              border-r-tatum-md
            </p>
          </div>

          <div className='space-y-tatum-md'>
            <div className='flex h-24 w-full items-center justify-center border-b-tatum-md border-tatum-error-500 bg-tatum-white'>
              <p className='font-tatum-medium text-tatum-error-800'>
                Bottom only
              </p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              border-b-tatum-md
            </p>
          </div>

          <div className='space-y-tatum-md'>
            <div className='flex h-24 w-full items-center justify-center border-l-tatum-md border-tatum-error-500 bg-tatum-white'>
              <p className='font-tatum-medium text-tatum-error-800'>
                Left only
              </p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              border-l-tatum-md
            </p>
          </div>
        </div>
      </Section>
    </StoriesContainer>
  ),
}

export const Shadows: Story = {
  render: () => (
    <StoriesContainer
      title='Shadows'
      description='Shadow tokens in the Tatum Design System for consistent depth effects.'
    >
      <Section
        title='Box Shadows'
        description='A range of box shadow options for creating depth.'
      >
        <div className='grid grid-cols-1 gap-tatum-4xl bg-tatum-gray-100 p-tatum-4xl md:grid-cols-3'>
          <div className='flex flex-col items-center'>
            <div className='mb-tatum-md flex h-32 w-full items-center justify-center rounded-tatum-lg bg-tatum-white shadow-tatum-sm'>
              <p className='font-tatum-medium text-tatum-gray-700'>Small</p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              shadow-tatum-sm
            </p>
            <p className='text-tatum-text-xs text-tatum-gray-500'>
              0 0.0625rem 0.125rem 0 rgba(0, 0, 0, 0.05)
            </p>
          </div>

          <div className='flex flex-col items-center'>
            <div className='mb-tatum-md flex h-32 w-full items-center justify-center rounded-tatum-lg bg-tatum-white shadow-tatum-md'>
              <p className='font-tatum-medium text-tatum-gray-700'>Medium</p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              shadow-tatum-md
            </p>
            <p className='text-tatum-text-xs text-tatum-gray-500'>
              0 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1),
              <br />0 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.06)
            </p>
          </div>

          <div className='flex flex-col items-center'>
            <div className='mb-tatum-md flex h-32 w-full items-center justify-center rounded-tatum-lg bg-tatum-white shadow-tatum-lg'>
              <p className='font-tatum-medium text-tatum-gray-700'>Large</p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              shadow-tatum-lg
            </p>
            <p className='text-tatum-text-xs text-tatum-gray-500'>
              0 0.625rem 0.9375rem -0.1875rem rgba(0, 0, 0, 0.1),
              <br />0 0.25rem 0.375rem -0.125rem rgba(0, 0, 0, 0.05)
            </p>
          </div>
        </div>

        <div className='mt-tatum-4xl grid grid-cols-1 gap-tatum-4xl bg-tatum-gray-100 p-tatum-4xl md:grid-cols-3'>
          <div className='flex flex-col items-center'>
            <div className='mb-tatum-md flex h-32 w-full items-center justify-center rounded-tatum-lg bg-tatum-white shadow-tatum-xl'>
              <p className='font-tatum-medium text-tatum-gray-700'>
                Extra Large
              </p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              shadow-tatum-xl
            </p>
            <p className='text-tatum-text-xs text-tatum-gray-500'>
              0 1.25rem 1.5625rem -0.3125rem rgba(0, 0, 0, 0.1),
              <br />0 0.625rem 0.625rem -0.3125rem rgba(0, 0, 0, 0.04)
            </p>
          </div>

          <div className='flex flex-col items-center'>
            <div className='mb-tatum-md flex h-32 w-full items-center justify-center rounded-tatum-lg bg-tatum-white shadow-tatum-2xl'>
              <p className='font-tatum-medium text-tatum-gray-700'>2X Large</p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              shadow-tatum-2xl
            </p>
            <p className='text-tatum-text-xs text-tatum-gray-500'>
              0 1.5625rem 3.125rem -0.75rem rgba(0, 0, 0, 0.25)
            </p>
          </div>

          <div className='flex flex-col items-center'>
            <div className='mb-tatum-md flex h-32 w-full items-center justify-center rounded-tatum-lg bg-tatum-white shadow-tatum-inner'>
              <p className='font-tatum-medium text-tatum-gray-700'>Inner</p>
            </div>
            <p className='text-tatum-text-sm font-tatum-medium'>
              shadow-tatum-inner
            </p>
            <p className='text-tatum-text-xs text-tatum-gray-500'>
              inset 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.06)
            </p>
          </div>
        </div>
      </Section>
    </StoriesContainer>
  ),
}

```

## Introduction

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

const IntroductionComponent: React.FC = () => (
  <div>This is a placeholder component for the Introduction documentation.</div>
)

const meta: Meta<typeof IntroductionComponent> = {
  title: 'Introduction',
  component: IntroductionComponent,
  tags: ['autodocs'],
  parameters: {
    previewTabs: {
      canvas: { hidden: true },
    },
    docs: {
      description: {
        component: 'Tatum Design System documentation',
      },
      page: () => (
        <div className='mx-auto max-w-4xl p-6'>
          <img
            alt='logo'
            src='https://cdn.prod.website-files.com/62624e283b503f3e68275638/62624e283b503fde012757c1_Light.svg'
          />
          <br />
          <h1 className='text-3xl font-bold'>Tatum Design System</h1>

          <p className='mb-8 text-lg'>
            A modern, reusable component library for Tatum projects. Built with
            React, TypeScript, and a focus on developer experience.
          </p>

          <div className='rounded bg-blue-50 p-4'>
            <h2 className='mb-3 text-2xl font-semibold'>Getting Started</h2>
            <p className='mb-2'>
              Tatum Design System provides a consistent set of UI components
              that work seamlessly across all Tatum applications.
            </p>
            <p>
              Browse components in the sidebar to see usage examples,
              documentation, and design guidelines.
            </p>
            <p>
              <a href='https://tatum-desing-system-ed3d1a.gitlab.io/llms.txt'>
                llms.txt{' '}
              </a>{' '}
              for the ai agents
            </p>
          </div>
          <br />
          <h2 className='mb-3 text-2xl font-semibold'>Installation</h2>
          <ol className='mb-6 list-decimal space-y-4 pl-6'>
            <li className='sb-unstyled pl-0'>
              <p className='mb-4'>
                Add <code className='rounded bg-gray-100 px-1'>npmrc</code> to
                your project and make sure it is in{' '}
                <code className='rounded bg-gray-100 px-1'>.gitignore</code> or
                if not don&apos;t store token directly in the file:
              </p>
              <pre className='sb-unstyled my-2 rounded bg-gray-800 p-3 text-white'>
                <code>
                  @tatum-io:registry=https://gitlab.com/api/v4/projects/68384178/packages/npm/
                  <br />
                  {`//gitlab.com/api/v4/projects/68384178/packages/npm/:_authToken=\${NPM_TOKEN}`}
                </code>
              </pre>
            </li>
            <li className='sb-unstyled pl-0'>
              <p className='mb-4'>
                If you didn&apos;t add token directly to the file the better
                approach will be set your access token like it:
              </p>
              <pre className='sb-unstyled my-2 rounded bg-gray-800 p-3 text-white'>
                <code>export NPM_TOKEN=your_gitlab_token</code>
              </pre>
            </li>
            <li className='sb-unstyled pl-0'>
              <p className='mb-4'>Install the package:</p>
              <pre className='sb-unstyled my-2 overflow-x-auto rounded bg-gray-800 p-3 text-white'>
                <code>yarn add @tatum-io/tatum-design-system</code>
              </pre>
            </li>
          </ol>

          <h2 className='mb-3 text-2xl font-semibold'>Usage</h2>
          <pre className='sb-unstyled my-2 mb-6 overflow-x-auto rounded bg-gray-800 p-3 text-white'>
            <code>
              {`// Import components
import { Button, Card } from '@tatum-io/tatum-design-system';

// Import styles
import '@tatum-io/tatum-design-system/dist/styles.css';

function App() {
  return (
    <Card>
      <h2>Hello World</h2>
      <Button>Click me</Button>
    </Card>
  );
}`}
            </code>
          </pre>

          <div className='mb-6 rounded bg-gray-50 p-4'>
            <h3 className='mb-3 text-xl font-semibold'>
              Alternative Import Methods
            </h3>
            <pre className='sb-unstyled my-2 overflow-x-auto rounded bg-gray-800 p-3 text-white'>
              <code>
                {`import { Button } from '@tatum-io/tatum-design-system/components/Button';`}
              </code>
            </pre>
          </div>

          <h2 className='mb-3 text-2xl font-semibold'>Component Guidelines</h2>
          <p className='mb-2'>
            Each component in our library follows these guidelines:
          </p>
          <ul className='mb-6 list-disc space-y-1 pl-6'>
            <li className='pl-0'>
              <strong>TypeScript interfaces</strong> for props (exported)
            </li>
            <li className='pl-0'>
              <strong>Enums</strong> for data-testid attributes (exported)
            </li>
            <li className='pl-0'>
              <strong>Comprehensive tests</strong> for reliability
            </li>
            <li className='pl-0'>
              <strong>Storybook stories</strong> for documentation
            </li>
            <li className='pl-0'>
              <strong>Responsive design</strong> principles
            </li>
          </ul>

          <h2 className='mb-3 text-2xl font-semibold'>Development Workflow</h2>
          <pre className='sb-unstyled my-2 mb-6 overflow-x-auto rounded bg-gray-800 p-3 text-white'>
            <code>
              {`# Run storybook
yarn storybook

# Build the library
yarn build

# Run tests
yarn test`}
            </code>
          </pre>

          <h2 className='mb-3 text-2xl font-semibold'>Project Structure</h2>
          <pre className='sb-unstyled my-2 mb-6 overflow-x-auto rounded bg-gray-800 p-3 text-white'>
            <code>
              {`src/
├── components/     # React components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   ├── Button.stories.tsx
│   │   └── index.ts
│   └── ...
└── index.ts        # Main export file`}
            </code>
          </pre>

          <h2 className='mb-3 text-2xl font-semibold'>TypeScript Support</h2>
          <p className='mb-6'>
            All components include TypeScript definitions. For proper module
            resolution in consuming projects, we recommend using TypeScript with{' '}
            <code className='rounded bg-gray-100 px-1'>
              &quot;moduleResolution&quot;: &quot;node16&quot;
            </code>{' '}
            or{' '}
            <code className='rounded bg-gray-100 px-1'>
              &quot;bundler&quot;
            </code>
            .
          </p>

          <div className='rounded-lg bg-green-50 p-4'>
            <h2 className='mb-3 text-2xl font-semibold'>Need Help?</h2>
            <p>
              If you have questions or need assistance with the Tatum Design
              System, please contact the Ecosystem team through our internal
              Slack channel or create an issue in our GitLab repository.
            </p>
          </div>
        </div>
      ),
    },
  },
}

export default meta
type Story = StoryObj<typeof IntroductionComponent>

export const Overview: Story = {}

```

## Tooltip

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { HelpCircle } from '@untitledui-pro/icons/line'

import Tooltip from './Tooltip'

/**
 * Tooltips are used to describe or identify an element. In most scenarios,
 * tooltips help the user understand the meaning or function of an icon,
 * or display the alt text of an image.
 */
const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {},
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description:
        'The side of the trigger where the tooltip will be positioned',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'The alignment of the tooltip relative to the trigger',
    },
    delayDuration: {
      control: { type: 'number', min: 0 },
      description: 'The delay in milliseconds before the tooltip appears',
    },
    children: { control: false },
    providerProps: { control: false },
    rootProps: { control: false },
    triggerProps: { control: false },
    portalProps: { control: false },
    contentProps: { control: false },
    arrowProps: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

/**
 * Default Tooltip: Tooltips are used to describe or identify an element.
 * In most scenarios, tooltips help the user understand the meaning or function of an icon,
 * or display the alt text of an image.
 */
export const Default: Story = {
  args: {
    content: 'This is a tooltip',
  },
  render: (props) => (
    <Tooltip {...props}>
      <span className='inline-block'>
        <HelpCircle size={32} />
      </span>
    </Tooltip>
  ),
}

/**
 * Bottom Positioned Tooltip: Tooltips can have different positions.
 */
export const BottomPositioned: Story = {
  args: {
    content: 'This is a tooltip on the bottom',
    side: 'bottom',
  },
  render: (props) => (
    <Tooltip {...props}>
      <span className='inline-block'>
        <HelpCircle size={32} />
      </span>
    </Tooltip>
  ),
}

/**
 * Right Aligned Tooltip: Tooltips can have different alignments.
 */
export const RightAligned: Story = {
  args: {
    content: 'This is a tooltip aligned to center',
    side: 'right',
    align: 'center',
  },
  render: (props) => (
    <Tooltip {...props}>
      <span className='inline-block'>
        <HelpCircle size={32} />
      </span>
    </Tooltip>
  ),
}

/**
 * Custom Content Tooltip: Tooltips can have custom complex content.
 */
export const CustomContent: Story = {
  args: {
    content: (
      <div className='flex flex-col gap-1'>
        <p className='font-medium text-tatum-tertiary-700'>
          Custom tooltip content
        </p>
        <p className='text-xs opacity-80'>With multiple lines of text</p>
      </div>
    ),
  },
  render: (props) => (
    <Tooltip {...props}>
      <span className='inline-block'>
        <HelpCircle size={32} />
      </span>
    </Tooltip>
  ),
}

/**
 * Tooltip With Delay: Tooltips can have a delay before they appear.
 */
export const WithDelay: Story = {
  args: {
    content: 'This tooltip has a delay',
    delayDuration: 500,
  },
  render: (props) => (
    <Tooltip {...props}>
      <span className='inline-block'>
        <HelpCircle size={32} />
      </span>
    </Tooltip>
  ),
}

```

## Toaster

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'

import Button from '../Button'
import { toast, Toaster } from './Toaster'

const meta: Meta<typeof Toaster> = {
  component: Toaster,
  title: 'Components/Toast',
  decorators: [
    (Story) => (
      <div>
        <Story />
        <Toaster />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Toaster>

/**
 * Toast component with various types and variants. Click any button to see the toast notification.
 */
export const Default: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        maxWidth: '800px',
      }}
    >
      <Button
        style={{
          backgroundColor: '#DCFAE6',
          color: '#079455',
          border: '1px solid #079455',
        }}
        onClick={() => toast.success('Your action was completed successfully.')}
      >
        Success (Light)
      </Button>
      <Button
        style={{ backgroundColor: '#079455', color: 'white' }}
        onClick={() =>
          toast.success('Your action was completed successfully.', {
            variant: 'solid',
          })
        }
      >
        Success (Solid)
      </Button>
      <Button
        style={{
          backgroundColor: '#FEE4E2',
          color: '#D92D20',
          border: '1px solid #D92D20',
        }}
        onClick={() => toast.error('Something went wrong. Please try again.')}
      >
        Error (Light)
      </Button>
      <Button
        style={{ backgroundColor: '#D92D20', color: 'white' }}
        onClick={() =>
          toast.error('Something went wrong. Please try again.', {
            variant: 'solid',
          })
        }
      >
        Error (Solid)
      </Button>
      <Button
        style={{
          backgroundColor: '#FEF0C7',
          color: '#DC6803',
          border: '1px solid #DC6803',
        }}
        onClick={() =>
          toast.warning('There might be an issue that needs your attention.')
        }
      >
        Warning (Light)
      </Button>
      <Button
        style={{ backgroundColor: '#DC6803', color: 'white' }}
        onClick={() =>
          toast.warning('There might be an issue that needs your attention.', {
            variant: 'solid',
          })
        }
      >
        Warning (Solid)
      </Button>
      <Button
        style={{
          backgroundColor: '#D5D3FE',
          color: '#4F37FD',
          border: '1px solid #4F37FD',
        }}
        onClick={() =>
          toast.info("Here's some additional information for you.")
        }
      >
        Info (Light)
      </Button>
      <Button
        style={{ backgroundColor: '#4F37FD', color: 'white' }}
        onClick={() =>
          toast.info("Here's some additional information for you.", {
            variant: 'solid',
          })
        }
      >
        Info (Solid)
      </Button>
      <Button
        style={{
          backgroundColor: 'white',
          color: '#4F37FD',
          border: '1px solid #E5E5E5',
        }}
        onClick={() => toast.loading('Saving changes...')}
      >
        Loading (Light)
      </Button>
      <Button
        style={{ backgroundColor: '#4F37FD', color: 'white' }}
        onClick={() => toast.loading('Saving changes...', { variant: 'solid' })}
      >
        Loading (Solid)
      </Button>
      <Button
        style={{
          backgroundColor: '#DCFAE6',
          color: '#079455',
          border: '1px solid #079455',
        }}
        onClick={() =>
          toast.success('Profile updated!', {
            variant: 'light',
            duration: 10000,
            action: {
              label: 'View',
              onClick: () => alert('View Profile Clicked!'),
            },
          })
        }
      >
        With Action (Light)
      </Button>
      <Button
        style={{ backgroundColor: '#079455', color: 'white' }}
        onClick={() =>
          toast.success('Profile updated!', {
            variant: 'solid',
            duration: 10000,
            action: {
              label: 'View',
              onClick: () => alert('View Profile Clicked!'),
            },
          })
        }
      >
        With Action (Solid)
      </Button>
    </div>
  ),
}

/**
 * Toast with long content to demonstrate automatic width expansion beyond the default 28rem.
 */
export const LongContent: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Button
        style={{
          backgroundColor: '#DCFAE6',
          color: '#079455',
          border: '1px solid #079455',
        }}
        onClick={() =>
          toast.success(
            'Your action was completed successfully. The system has processed your request and all changes have been saved to the database. You can now continue with your workflow.',
          )
        }
      >
        Long Success Message
      </Button>
      <Button
        style={{
          backgroundColor: '#FEE4E2',
          color: '#D92D20',
          border: '1px solid #D92D20',
        }}
        onClick={() =>
          toast.error(
            'An unexpected error occurred while processing your request. The server encountered a problem that prevented it from completing the operation. Please check your network connection and try again. If the problem persists, contact support.',
          )
        }
      >
        Very Long Error Message (4 lines)
      </Button>
      <Button
        style={{
          backgroundColor: '#D5D3FE',
          color: '#4F37FD',
          border: '1px solid #4F37FD',
        }}
        onClick={() =>
          toast.info(
            'This is an informational message with a significant amount of text to demonstrate how the toast component handles very long content by expanding beyond its default width of 28rem.',
          )
        }
      >
        Long Info Message
      </Button>
    </div>
  ),
}

```

## Tabs

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsProps,
  TabsTrigger,
  TabsVariant,
} from '@/components/Tabs'

/**
 * Tabs organize similar content together into individual sections in the same page.
 */
const meta: Meta<typeof Tabs> = {
  component: Tabs,
  subcomponents: {
    TabsList,
    TabsTrigger,
    TabsContent,
  },
  title: 'Components/Tabs',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.keys(TabsVariant),
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
  },
  args: { variant: TabsVariant.ButtonMinimal, size: 'md' },
}

export default meta
type Story = StoryObj<typeof Tabs>

const renderTabsContent = (props: TabsProps) => (
  <Tabs defaultValue='details' {...props}>
    <TabsList>
      <TabsTrigger value='details'>My details</TabsTrigger>
      <TabsTrigger value='profile'>Profile</TabsTrigger>
      <TabsTrigger value='disabled' disabled>
        Disabled
      </TabsTrigger>
      <TabsTrigger value='team'>Team (2)</TabsTrigger>
      <TabsTrigger value='plan'>Plan</TabsTrigger>
    </TabsList>

    {['details', 'profile', 'disabled', 'team', 'plan'].map((tab) => (
      <TabsContent key={tab} value={tab}>
        <div className='p-tatum-md'>{tab} content</div>
      </TabsContent>
    ))}
  </Tabs>
)

/**
 * Horizontal tabs: Tabs organize similar content together into individual sections in the same page.
 */
export const Horizontal: Story = {
  render: (props) => renderTabsContent(props),
}

/**
 * Large horizontal tabs: Tabs organize similar content together into individual sections in the same page.
 */
export const HorizontalLarge: Story = {
  args: {
    large: true,
  },
  render: (props) => renderTabsContent(props),
}

/**
 * Sizes: Shows the different sizes
 */
export const Sizes: Story = {
  render: () => (
    <div className='space-y-tatum-lg'>
      <span>sm</span>
      {renderTabsContent({ size: 'sm' })}
      <span>md</span>
      {renderTabsContent({ size: 'md' })}
    </div>
  ),
}

```

## Table

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ColumnDef, SortingState } from '@tanstack/react-table'
import { useCallback, useEffect, useState } from 'react'

import Badge, { BadgeColor } from '@/components/Badge'
import Button, { ButtonVariant } from '@/components/Button'
import Table, { TABLE_DEFAULT_PAGE_SIZE } from '@/components/Table/Table'

/**
 * A flexible table component built with @tanstack/react-table that supports pagination, row expansion, and more.
 */
const meta: Meta<typeof Table<Person>> = {
  title: 'Components/Table',
  component: Table,
  parameters: {},
  argTypes: {
    columns: { control: false },
    data: { control: false },
    header: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof Table<Person>>

// Sample data for our table
type Person = {
  id: string
  firstName: string
  lastName: string
  age: number
  email: string
  status: 'active' | 'inactive'
}

const sampleData: Person[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    age: 28,
    email: 'john.doe@example.com',
    status: 'active',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    age: 34,
    email: 'jane.smith@example.com',
    status: 'active',
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    age: 42,
    email: 'michael.johnson@example.com',
    status: 'inactive',
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Williams',
    age: 31,
    email: 'sarah.williams@example.com',
    status: 'active',
  },
  {
    id: '5',
    firstName: 'Robert',
    lastName: 'Brown',
    age: 45,
    email: 'robert.brown@example.com',
    status: 'inactive',
  },
]

for (let i = 6; i < 100; i++) {
  const data = sampleData[i % 5]
  sampleData.push({
    ...data,
    id: i.toString(),
    age: data.age + i,
  })
}

// Define columns for our table
const columns: ColumnDef<Person>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
    enableSorting: true,
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
    enableSorting: false,
  },
  {
    accessorKey: 'age',
    header: 'Age',
    meta: {
      headerTooltip: 'Age of the person',
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge
        color={
          row.original.status === 'active'
            ? BadgeColor.Success
            : BadgeColor.Error
        }
      >
        {row.original.status}
      </Badge>
    ),
  },
]

meta.args = {
  columns: columns,
  data: sampleData,
}

/**
 * Basic Table: Whole dataset is passed to Table which by default manages pagination and sorting.
 */
export const Default: Story = {}

/**
 * Basic Table Example: Demonstrates a table with a custom header section including title, description, and action buttons.
 */
export const WithHeader: Story = {
  args: {
    header: (
      <>
        <div className='flex flex-col'>
          <h3>Team members</h3>
          <span className='text-tatum-text-sm font-tatum-regular text-tatum-gray-600'>
            List of team members
          </span>
        </div>
        <div className='mt-tatum-xl flex gap-tatum-lg sm:ml-tatum-lg sm:mt-0'>
          <Button variant={ButtonVariant.Secondary}>Filters</Button>
          <Button variant={ButtonVariant.Secondary}>Select date</Button>
          <Button variant={ButtonVariant.Outlined}>Show API call</Button>
        </div>
      </>
    ),
  },
  // `render` can be omitted if args fully define the component
}

/**
 * Loading State: Table with loading state to indicate data is being fetched.
 */
export const Loading: Story = {
  args: {
    data: [],
    isLoading: true,
  },
}

/**
 * No Data Available: Table with no data and a custom message.
 */
export const EmptyTable: Story = {
  args: {
    data: [], // Override data to be empty
    noDataLabel: 'No users found. Try adjusting your filters.',
  },
}

/**
 * Manual data handling example: This example demonstrates loading data from a server with manual sorting pagination.
 */
export const ManualDataHandling: Story = {
  render: function Render(props) {
    const [currentPage, setCurrentPage] = useState(0)
    const [tableData, setTableData] = useState<Person[]>([])
    const [sorting, setSorting] = useState<SortingState>([])
    const [loading, setLoading] = useState(false)
    // Cache to store already loaded pages
    const [pageCache, setPageCache] = useState<Record<string, Person[]>>({})

    const rowCount = 100

    const fetchData = useCallback(
      async (
        page: number,
        sort: SortingState,
        size: number = TABLE_DEFAULT_PAGE_SIZE,
      ) => {
        const sortKey = sort.map((s) => `${s.id}-${s.desc}`).join(',')
        const key = `${page}-${sortKey}`

        if (pageCache[key]) {
          setTableData(pageCache[key])
          return
        }

        setLoading(true)

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Create a copy of the data to sort
        let sortedData = [...sampleData]

        // Apply sorting if there's any sort criteria
        if (sort.length > 0) {
          sortedData = sortedData.sort((a, b) => {
            for (const sortItem of sort) {
              const columnId = sortItem.id as keyof Person
              const desc = sortItem.desc

              if (a[columnId] < b[columnId]) {
                return desc ? 1 : -1
              }
              if (a[columnId] > b[columnId]) {
                return desc ? -1 : 1
              }
            }
            return 0
          })
        }

        const start = page * size
        const end = Math.min(start + size, sampleData.length)

        const paginatedData = sortedData.slice(start, end)
        setTableData(paginatedData)
        setPageCache((prev) => ({
          ...prev,
          [key]: paginatedData,
        }))

        setLoading(false)
      },
      [pageCache],
    )

    useEffect(() => {
      fetchData(currentPage, sorting)
    }, [currentPage, sorting, fetchData])

    return (
      <Table
        {...props}
        columns={columns}
        data={tableData}
        isLoading={loading}
        manualDataHandling={{
          rowCount,
          currentPage,
          onPageChange: setCurrentPage,
          sorting,
          onSortingChange: setSorting,
        }}
      />
    )
  },
}

```

## Switch

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/internal/preview-api'

import Switch, { SwitchColor, SwitchProps } from './Switch'

/**
 * Switch component for toggling between two states.
 */
const meta: Meta<typeof Switch> = {
  component: Switch,
  title: 'Components/Switch',
  argTypes: {
    color: {
      control: { type: 'select' },
      options: Object.values(SwitchColor),
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    selectionMode: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
    onCheckedChange: { action: 'checkedChanged' },
    highlightSelectedLabel: {
      name: 'Highlight Selected Label',
      control: 'boolean',
    },
  },
  args: {
    size: 'md',
    disabled: false,
    checked: false,
    color: SwitchColor.Primary,
    highlightSelectedLabel: false,
  },
}

export default meta
type Story = StoryObj<typeof Switch>

interface InteractiveSwitchTemplateProps extends SwitchProps {
  onCheckedChange?: (checked: boolean) => void
}

const InteractiveSwitchTemplate: Story['render'] = ({
  onCheckedChange,
  ...props
}: InteractiveSwitchTemplateProps) => {
  const [, updateArgs] = useArgs<SwitchProps>()

  const handleCheckedChange = (isChecked: boolean) => {
    onCheckedChange?.(isChecked)

    updateArgs({ checked: isChecked })
  }

  return <Switch {...props} onCheckedChange={handleCheckedChange} />
}

/**
 * The default Switch component. This is the most common use case.
 */
export const Default: Story = {
  render: InteractiveSwitchTemplate,
  args: {
    label: 'Enable Notifications',
    color: SwitchColor.Success,
    checked: true,
  },
}

/**
 * The small `sm` size variant.
 */
export const Small: Story = {
  name: 'Size: Small',
  render: InteractiveSwitchTemplate,
  args: {
    size: 'sm',
    label: 'Small Switch',
    checked: true,
  },
}

/**
 * The default medium `md` size variant.
 */
export const Medium: Story = {
  name: 'Size: Medium',
  render: InteractiveSwitchTemplate,
  args: {
    size: 'md',
    label: 'Medium Switch (Default)',
    checked: true,
  },
}

/**
 * The large `lg` size variant.
 */
export const Large: Story = {
  name: 'Size: Large',
  render: InteractiveSwitchTemplate,
  args: {
    size: 'lg',
    label: 'Large Switch',
    checked: true,
  },
}

/**
 * The Switch in its disabled state.
 */
export const Disabled: Story = {
  name: 'State: Disabled',
  render: InteractiveSwitchTemplate,
  args: {
    disabled: true,
    checked: true,
    label: 'Disabled Switch',
  },
}

/**
 * Selection Mode with the Primary color.
 */
export const SelectionModePrimary: Story = {
  name: 'Selection Mode: Primary',
  render: InteractiveSwitchTemplate,
  args: {
    selectionMode: true,
    leftLabel: 'Option A',
    rightLabel: 'Option B',
    color: SwitchColor.Primary,
    checked: false,
  },
}

/**
 * Selection Mode with the Secondary color.
 */
export const SelectionModeSecondary: Story = {
  name: 'Selection Mode: Secondary',
  render: InteractiveSwitchTemplate,
  args: {
    selectionMode: true,
    leftLabel: 'List',
    rightLabel: 'Grid',
    color: SwitchColor.Secondary,
    checked: true,
  },
}

/**
 * Selection Mode with the Success color.
 */
export const SelectionModeSuccess: Story = {
  name: 'Selection Mode: Success',
  render: InteractiveSwitchTemplate,
  args: {
    selectionMode: true,
    leftLabel: 'Off',
    rightLabel: 'On',
    color: SwitchColor.Success,
    checked: true,
  },
}

/**
 * Selection Mode with the Error color.
 */
export const SelectionModeError: Story = {
  name: 'Selection Mode: Error',
  render: InteractiveSwitchTemplate,
  args: {
    selectionMode: true,
    leftLabel: 'Stop',
    rightLabel: 'Proceed',
    color: SwitchColor.Error,
    checked: false,
  },
}

/**
 * Selection Mode with the White color.
 */
export const SelectionModeWhite: Story = {
  name: 'Selection Mode: White',
  render: InteractiveSwitchTemplate,
  args: {
    selectionMode: true,
    leftLabel: 'Light',
    rightLabel: 'Dark',
    color: SwitchColor.White,
    checked: true,
  },
}

/**
 * When `highlightSelectedLabel` is true, the active label's color matches the theme.
 */
export const HighlightedToggleLabel: Story = {
  name: 'Highlighting: Toggle Mode',
  render: InteractiveSwitchTemplate,
  args: {
    label: 'Email Notifications',
    color: SwitchColor.Success,
    checked: true,
    highlightSelectedLabel: true,
  },
}

/**
 * In selection mode, the active side's label is highlighted with the theme color.
 */
export const HighlightedSelectionLabel: Story = {
  name: 'Highlighting: Selection Mode',
  render: InteractiveSwitchTemplate,
  args: {
    selectionMode: true,
    leftLabel: 'Monthly',
    rightLabel: 'Annual',
    color: SwitchColor.Primary,
    checked: true,
    highlightSelectedLabel: true,
  },
}

/**
 * The `White` theme is an exception and will not color the label white, falling back to the default gray.
 */
export const HighlightedWhiteException: Story = {
  name: 'Highlighting: White (Exception)',
  render: InteractiveSwitchTemplate,
  args: {
    selectionMode: true,
    leftLabel: 'Light',
    rightLabel: 'Dark',
    color: SwitchColor.White,
    checked: true,
    highlightSelectedLabel: true,
  },
}
/**
 * The Switch component's styles can be overridden using custom CSS classes.
 */
export const CustomSizing: Story = {
  name: 'Customization: Custom Sizing',
  render: InteractiveSwitchTemplate,
  args: {
    label: 'Large switch with small text',
    checked: true,
    customSwitchCSS: 'w-16 h-8',
    customThumbCSS: 'h-7 w-7 data-[state=checked]:translate-x-[2rem]',
    customLabelCSS: 'text-tatum-text-xs',
  },
}

```

## StripeBadges

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'

import StripeBadges from './StripeBadges'

/**
 * StripeBadges component for displaying trusted certification and partnership badges.
 */
const meta: Meta<typeof StripeBadges> = {
  component: StripeBadges,
  title: 'Components/StripeBadges',
}

export default meta
type Story = StoryObj<typeof StripeBadges>

export const Default: Story = {
  render: () => <StripeBadges />,
}

```

## SortableList

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import SortableList from './SortableList'
import SortableListItem from './SortableListItem'

/**
 * SortableList allows users to reorder items through drag and drop interactions. Each item can be dragged by its handle icon to change the order within the list. This component is useful for priority management, organizing content, and any scenario where users need to customize the sequence of items.
 */
const meta: Meta<typeof SortableList> = {
  component: SortableList,
  title: 'Components/SortableList',
}

export default meta
type Story = StoryObj<typeof SortableList>

interface Item {
  id: string
  title: string
  description: string
}

const initialItems: Item[] = [
  {
    id: '1',
    title: 'First Item',
    description: 'This is the first sortable list item',
  },
  {
    id: '2',
    title: 'Second Item',
    description: 'This is the second sortable list item',
  },
  {
    id: '3',
    title: 'Third Item',
    description: 'This is the third sortable list item',
  },
]

/**
 * Simple sortable list with 3 items.
 * Drag and drop items by their handle icon to reorder them.
 * The list is controlled, with order managed in state.
 */
export const Default: Story = {
  render: function Render() {
    const [items, setItems] = useState<Item[]>(initialItems)

    const handleReorder = (fromIndex: number, toIndex: number) => {
      const newItems = [...items]
      const [movedItem] = newItems.splice(fromIndex, 1)
      newItems.splice(toIndex, 0, movedItem)
      setItems(newItems)
    }

    return (
      <SortableList onReorder={handleReorder}>
        {items.map((item) => (
          <SortableListItem key={item.id} id={item.id}>
            <div className='ml-tatum-md flex flex-col gap-tatum-md'>
              <h3 className='text-tatum-heading-xs font-tatum-semibold text-tatum-gray-900'>
                {item.title}
              </h3>
              <p className='text-tatum-text-md text-tatum-gray-600'>
                {item.description}
              </p>
            </div>
          </SortableListItem>
        ))}
      </SortableList>
    )
  },
}

```

## Slider

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { useArgs } from 'storybook/preview-api'

import Slider, { SliderLabelType } from './Slider'

/**
 * Sliders allow users to select a range of data points. They’re useful for dynamic filtering of data.
 */
const meta: Meta<typeof Slider> = {
  component: Slider,
  title: 'Components/Slider',
  argTypes: {
    value: {
      control: { type: 'object' },
    },
    step: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    labelType: {
      control: { type: 'select' },
      options: Object.values(SliderLabelType),
    },
  },
  args: {
    value: [60],
    max: 100,
    step: 1,
  },
}

export default meta
type Story = StoryObj<typeof Slider>

/**
 * Default Slider: Standard simple slider.
 */
export const slider: Story = {
  render: function Render(props) {
    const [, updateArgs] = useArgs()

    return (
      <Slider
        {...props}
        onValueChange={(newValue) => {
          updateArgs({ value: newValue })
        }}
      />
    )
  },
}

/**
 * Slider with Floating label style
 */
export const floatingLabel: Story = {
  ...slider,
  args: {
    ...slider.args,
    labelType: SliderLabelType.Floating,
  },
}

/**
 * Example of a slider with a custom label formatter
 */
export const customLabelFormatter: Story = {
  ...slider,
  args: {
    ...slider.args,
    labelFormatter: (value) => `Value: ${value}`,
  },
}

/**
 * Two thumbs range slider: Allows users to select a range of values.
 */
export const rangeSlider: Story = {
  ...slider,
  args: {
    value: [20, 80],
    minStepsBetweenThumbs: 10,
  },
}

/**
 * Slider with custom colors: Demonstrates how to apply custom styles to the slider.
 */
export const customColors: Story = {
  ...slider,
  args: {
    customColorsClassName:
      'bg-gradient-to-r from-tatum-tertiary-500 to-tatum-primary-500',
  },
}

/**
 * Slider with marks: Displays specific values on the slider track.
 */
export const marks: Story = {
  render: function Render(props) {
    const [value, setValue] = useState([6])
    const getCustomColors = () => {
      switch (value[0]) {
        case 1:
        case 2:
        case 3:
        case 4:
          return 'bg-[linear-gradient(247deg,theme(colors.black)_-37.91%,theme(colors.tatum-primary-500)_40.42%,theme(colors.white)_144%,theme(colors.tatum-tertiary-500)_144%)]'
        case 5:
        case 6:
          return 'bg-[linear-gradient(247deg,theme(colors.black)_-37.91%,theme(colors.tatum-primary-500)_13.48%,theme(colors.tatum-tertiary-500)_86.44%)]'
        case 7:
          return 'bg-[linear-gradient(268deg,theme(colors.black)_14.51%,theme(colors.tatum-primary-500)_38.55%,theme(colors.tatum-secondary-500)_54.41%,theme(colors.tatum-primary-500)_66.02%),_linear-gradient(247deg,theme(colors.black)_-37.91%,theme(colors.tatum-primary-500)_13.48%,theme(colors.tatum-tertiary-500)_86.44%)]'
        case 8:
          return 'bg-[linear-gradient(143deg,theme(colors.tatum-gray-950)_12.32%,theme(colors.tatum-gray-400)_46.47%,theme(colors.tatum-gray-900)_91.7%,theme(colors.tatum-gray-600)_107.57%,theme(colors.tatum-gray-400)_119.95%)]'
      }
    }

    return (
      <Slider
        {...props}
        value={value}
        onValueChange={(newValue) => {
          setValue(newValue)
        }}
        customColorsClassName={getCustomColors()}
      />
    )
  },
  args: {
    min: 1,
    max: 8,
    step: 1,
    labelType: SliderLabelType.None,
    marks: [
      { value: 1, label: 'Free' },
      { value: 2, label: '2M' },
      { value: 3, label: '4M' },
      { value: 4, label: '7M' },
      { value: 5, label: '10M' },
      { value: 6, label: '15M' },
      { value: 7, label: '20M' },
      { value: 8, label: 'Custom' },
    ],
  },
}

```

## Skeleton

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'

import Skeleton from './Skeleton'

/**
 * Skeleton loaders provide visual feedback during content loading states, reducing perceived wait times
 * and improving user experience by showing a preview of the content structure before it arrives.
 */
const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton loader',
  component: Skeleton,
}

export default meta
type Story = StoryObj<typeof Skeleton>

/**
 * Skeleton examples: Skeleton can be used and customized in any component.
 */
export const Default: Story = {
  render: (props) => (
    <div className='grid grid-cols-1 gap-6'>
      <div className='rounded border border-tatum-gray-200 p-4'>
        <Skeleton className='mb-4 h-[24px] w-3/4' {...props} />
        <Skeleton className='mb-4 h-[120px] w-full' {...props} />
        <Skeleton className='mb-2 h-[16px] w-full' {...props} />
        <Skeleton className='mb-2 h-[16px] w-full' {...props} />
        <Skeleton className='mb-2 h-[16px] w-5/6' {...props} />
        <Skeleton className='mb-4 h-[16px] w-full' {...props} />
        <div className='flex items-center gap-2'>
          <Skeleton className='h-[32px] w-[80px]' {...props} />
          <Skeleton className='h-[32px] w-[80px]' {...props} />
        </div>
      </div>
    </div>
  ),
}

```

## RadioGroup

```tsx
import type { StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import Field from '@/components/Field/Field'
import { Label } from '@/components/Field/Label'
import { RadioGroupItemCard } from '@/components/RadioGroup/RadioGroupItemCard'

import RadioGroup, {
  RadioGroupItem,
  RadioGroupItemSize,
  RadioGroupProps,
} from './RadioGroup'

/**
 * Radio groups are useful for presenting a set of mutually exclusive options, allowing users to select exactly one.
 * Grouping radio buttons visually helps users understand that only one option can be selected at a time
 * and makes it easier to compare choices side by side.
 */
const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  args: {
    value: 'first',
  },
  argTypes: {
    value: {
      control: { type: 'select' },
      options: ['first', 'second', 'third'],
    },
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

const RadioGroupTemplate = (
  props: RadioGroupProps & { size?: RadioGroupItemSize; label?: string },
) => {
  const [{ value }, updateArgs] = useArgs()

  return (
    <div className='flex w-[320px] flex-col gap-y-tatum-xl'>
      <Field>
        <Label>{props.label ?? 'Options'}</Label>
        <RadioGroup
          {...props}
          value={value as string}
          onValueChange={(val: string) => updateArgs({ value: val })}
        >
          <div className='flex items-center gap-tatum-sm'>
            <RadioGroupItem value='first' id='r1' size={props.size} />
            <label
              htmlFor='r1'
              className='cursor-pointer text-tatum-text-md font-tatum-regular text-tatum-gray-700'
            >
              First
            </label>
          </div>
          <div className='flex items-center gap-tatum-sm'>
            <RadioGroupItem value='second' id='r2' size={props.size} />
            <label
              htmlFor='r2'
              className='cursor-pointer text-tatum-text-md font-tatum-regular text-tatum-gray-700'
            >
              Second
            </label>
          </div>
          <div className='flex items-center gap-tatum-sm'>
            <RadioGroupItem value='third' id='r3' size={props.size} />
            <label
              htmlFor='r3'
              className='cursor-pointer text-tatum-text-md font-tatum-regular text-tatum-gray-700'
            >
              Third
            </label>
          </div>
        </RadioGroup>
      </Field>
    </div>
  )
}

/**
 * Default radio group: A set of radio buttons with labels.
 */
export const Default: Story = {
  render: RadioGroupTemplate,
}

/**
 * RadioGroupItems used within Card component
 */
export const CardItem: Story = {
  render: function Render(props) {
    const [{ value }, updateArgs] = useArgs()

    return (
      <RadioGroup
        {...props}
        value={value as string}
        onValueChange={(val: string) => updateArgs({ value: val })}
      >
        <div className='flex flex-wrap gap-tatum-xl'>
          <RadioGroupItemCard value='first' header='First header'>
            Custom Card content
          </RadioGroupItemCard>
          <RadioGroupItemCard value='second' header='Second header'>
            Custom Card content
          </RadioGroupItemCard>
          <RadioGroupItemCard value='third' header='Third header'>
            Custom Card content
          </RadioGroupItemCard>
        </div>
      </RadioGroup>
    )
  },
}

/**
 * Disabled radio group: Shows the disabled state of radio buttons.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: RadioGroupTemplate,
}

/**
 * Sizes: Shows the different sizes
 */
export const Size: Story = {
  render: function Render() {
    const [{ value }, updateArgs] = useArgs()
    return (
      <div className='flex gap-tatum-2xl'>
        <RadioGroup
          value={value as string}
          onValueChange={(val: string) => updateArgs({ value: val })}
        >
          <div className='flex items-center gap-tatum-sm'>
            <RadioGroupItem value='first' id='sm-1' size='sm' />
            <label htmlFor='sm-1' className='text-tatum-text-sm'>
              Small
            </label>
          </div>
          <div className='flex items-center gap-tatum-sm'>
            <RadioGroupItem value='second' id='sm-2' size='sm' />
            <label htmlFor='sm-2' className='text-tatum-text-sm'>
              Small
            </label>
          </div>
        </RadioGroup>

        <RadioGroup
          value={value as string}
          onValueChange={(val: string) => updateArgs({ value: val })}
        >
          <div className='flex items-center gap-tatum-sm'>
            <RadioGroupItem value='first' id='md-1' size='md' />
            <label htmlFor='md-1' className='text-tatum-text-md'>
              Medium
            </label>
          </div>
          <div className='flex items-center gap-tatum-sm'>
            <RadioGroupItem value='second' id='md-2' size='md' />
            <label htmlFor='md-2' className='text-tatum-text-md'>
              Medium
            </label>
          </div>
        </RadioGroup>
      </div>
    )
  },
}

```

## ProgressBar

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'

import ProgressBar, {
  ProgressBarLabelPlacement,
  ProgressBarLabelType,
} from './ProgressBar'

/**
 * Progress bars indicate the percentage completed of a task. They can be useful to prompt the user to complete an action or process.
 */
const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100 },
    },
    max: {
      control: { type: 'number', min: 0, max: 100 },
    },
    labelType: {
      control: { type: 'select' },
      options: Object.values(ProgressBarLabelType),
    },
    labelPlacement: {
      control: { type: 'select' },
      options: Object.values(ProgressBarLabelPlacement),
    },
  },
}

export default meta
type Story = StoryObj<typeof ProgressBar>

/**
 * Default configuration
 * */
export const Default: Story = {
  args: {
    value: 66,
    max: 100,
    labelType: ProgressBarLabelType.None,
  },
}

/**
 * Progress bar with a basic label.
 * */
export const BasicLabel: Story = {
  args: {
    value: 42,
    max: 100,
    labelType: ProgressBarLabelType.Basic,
    labelPlacement: ProgressBarLabelPlacement.Bottom,
  },
}

/**
 * Progress bar with a floating label.
 * FloatingLabel only supports top and bottom placements.
 */
export const FloatingLabel: Story = {
  args: {
    value: 73,
    max: 100,
    labelType: ProgressBarLabelType.Floating,
    labelPlacement: ProgressBarLabelPlacement.Top,
  },
}

/**
 * Progress bar with a custom label function.
 */
export const CustomLabel: Story = {
  args: {
    value: 85,
    max: 100,
    labelType: ProgressBarLabelType.Floating,
    labelPlacement: ProgressBarLabelPlacement.Bottom,
    getValueLabel: (value) => `Custom: ${value}`,
  },
}

/**
 * Progress bar with a custom color.
 */
export const CustomColor: Story = {
  args: {
    value: 85,
    max: 100,
    labelType: ProgressBarLabelType.None,
  },
  render: (props) => (
    <ProgressBar {...props} indicatorClassName='bg-tatum-error-500' />
  ),
}

/**
 * Demonstrates all possible label placements and types.
 */
export const AllPlacements: Story = {
  args: {
    value: 66,
    max: 100,
  },
  render: (props) => (
    <div className='flex w-64 flex-col gap-4'>
      <ProgressBar
        {...props}
        labelType={ProgressBarLabelType.Basic}
        labelPlacement={ProgressBarLabelPlacement.Top}
      />
      <ProgressBar
        {...props}
        labelType={ProgressBarLabelType.Basic}
        labelPlacement={ProgressBarLabelPlacement.Bottom}
      />
      <ProgressBar
        {...props}
        labelType={ProgressBarLabelType.Basic}
        labelPlacement={ProgressBarLabelPlacement.Left}
      />
      <ProgressBar
        {...props}
        labelType={ProgressBarLabelType.Basic}
        labelPlacement={ProgressBarLabelPlacement.Right}
      />
      <ProgressBar
        {...props}
        labelType={ProgressBarLabelType.Floating}
        labelPlacement={ProgressBarLabelPlacement.Top}
      />
      <ProgressBar
        {...props}
        labelType={ProgressBarLabelType.Floating}
        labelPlacement={ProgressBarLabelPlacement.Bottom}
      />
    </div>
  ),
}

```

## PricingCard

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Announcement02,
  Dataflow03,
  FileCode01,
} from '@untitledui-pro/icons/line'
import { action } from 'storybook/actions'

import { BadgeColor } from '@/components/Badge'

import PricingCard, {
  EnabledFeatures,
  PricingFeature,
  PricingProvider,
  PricingTier,
} from './PricingCard'

/**
 * PricingCard component for displaying subscription plans.
 */
const meta: Meta<typeof PricingCard> = {
  component: PricingCard,
  title: 'Components/PricingCard',
  argTypes: {
    tier: {
      options: Object.values(PricingTier),
    },
    highlighted: {
      control: 'boolean',
    },
    features: {
      control: false,
    },
    buttonProps: {
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof PricingCard>

const freeFeatures: PricingFeature[] = [
  { text: 'Up to 3 requests/sec' },
  { text: '5 Subscriptions' },
  { text: '1-Day Notification History' },
  { text: 'Testnet Gas Coverage' },
]

const paygoFeatures: PricingFeature[] = [
  { text: '200 API requests/sec' },
  { text: '200,000 Subscriptions' },
  { text: '7-Day notification history' },
  { text: 'Archive nodes' },
  { text: 'Advanced analytics' },
  { text: 'Helpdesk priority' },
]

const paygoEnabledFeatures: EnabledFeatures = {
  title: 'Enabled features for your build',
  sections: [
    {
      title: 'RPC Nodes',
      icon: <Dataflow03 size={24} />,
      features: [{ text: 'Global geo load balancer' }, { text: '200 RPS' }],
    },
    {
      title: 'Notifications',
      icon: <Announcement02 size={24} />,
      features: [{ text: '200,000 subscriptions' }, { text: 'Retry logic' }],
    },
    {
      title: 'Data Insights',
      icon: <FileCode01 size={24} />,
      features: [
        { text: 'Wallet balanced and transactions' },
        { text: 'Ownership and history of an NFT' },
      ],
    },
  ],
}

const businessFeatures: PricingFeature[] = [
  { text: 'Unlimited API calls' },
  { text: 'Custom rate limits' },
  { text: 'Dedicated nodes' },
  { text: 'Custom notification history' },
  { text: '30-Day notification history' },
  { text: 'Professional services' },
  { text: 'Dedicated Slack Support' },
  { text: 'SLAs' },
]

/**
 * Single pricing card example.
 */
export const Default: Story = {
  render: (args) => (
    <div className='flex w-full justify-center'>
      <div className='mx-4 w-full max-w-[calc(100vw-32px)] md:mx-0 md:w-[510px] lg:w-[377px]'>
        <PricingCard {...args} />
      </div>
    </div>
  ),
  args: {
    tier: PricingTier.Free,
    description: 'Essential tools to explore and build.',
    price: '$0',
    credits: '100,000',
    features: freeFeatures,
    buttonText: 'Continue for Free',
    buttonProps: {
      onClick: action('free-plan-clicked'),
    },
  },
}

/**
 * All pricing tiers displayed together.
 */
export const AllTiers: Story = {
  render: () => (
    <div className='flex w-full justify-center'>
      <PricingProvider>
        <div className='grid w-full max-w-6xl grid-cols-1 items-start gap-6 px-4 md:gap-8 md:px-0 lg:grid-cols-3 lg:gap-tatum-3xl'>
          {/* Free Tier */}
          <PricingCard
            tier={PricingTier.Free}
            description='Essential tools to explore and build.'
            price='$0'
            credits='100,000'
            creditsDescription='lifetime credits'
            features={freeFeatures}
            buttonText='Continue for Free'
            buttonProps={{
              onClick: action('free-plan-clicked'),
            }}
          />

          {/* PayGo Tier - Highlighted */}
          <PricingCard
            tier={PricingTier.PayGo}
            description='Built for scaling production apps.'
            price='$39'
            priceUnit='/mo'
            credits='4,000,000'
            creditsDescription='credits/mo'
            creditsTooltip='Monthly credit allocation with pay-as-you-go billing for overages'
            features={paygoFeatures}
            buttonText='Subscribe'
            includedTier='Free'
            highlighted
            enabledFeatures={paygoEnabledFeatures}
            buttonProps={{
              onClick: action('paygo-plan-clicked'),
            }}
          />

          {/* Business Tier */}
          <PricingCard
            tier={PricingTier.Business}
            description='Tailored solutions for your needs.'
            price='Custom'
            priceUnit='pricing'
            creditsDescription='Custom credits'
            features={businessFeatures}
            buttonText='Contact Sales'
            includedTier='PayGo'
            buttonProps={{
              onClick: action('business-plan-clicked'),
            }}
          />
        </div>
      </PricingProvider>
    </div>
  ),
}

/**
 * This story demonstrates how the PricingProvider automatically aligns cards with different content heights.
 * The middle card has a much longer description, and the other cards adjust to match.
 */
export const DynamicAlignment: Story = {
  render: () => (
    <div className='flex w-full justify-center'>
      <PricingProvider>
        <div className='grid w-full max-w-6xl grid-cols-1 items-start gap-6 px-4 md:gap-8 md:px-0 lg:grid-cols-3 lg:gap-tatum-3xl'>
          <PricingCard
            tier={PricingTier.Free}
            description='A short and sweet description.'
            price='$0'
            credits='100,000'
            features={freeFeatures}
            buttonText='Continue for Free'
            buttonProps={{
              onClick: action('free-plan-clicked'),
            }}
          />
          <PricingCard
            tier={PricingTier.PayGo}
            description='This description is intentionally much longer to demonstrate how the other cards will dynamically adjust their layout. The alignment of the prices, credits, and buttons should remain perfect thanks to the PricingProvider wrapping this grid.'
            price='$39'
            priceUnit='/mo'
            credits='4,000,000'
            features={paygoFeatures}
            buttonText='Subscribe'
            highlighted
            buttonProps={{
              onClick: action('paygo-plan-clicked'),
            }}
          />
          <PricingCard
            tier={PricingTier.Business}
            description='This description is of a medium length.'
            price='Custom'
            priceUnit='pricing'
            credits='Custom credits'
            features={businessFeatures}
            buttonText='Contact Sales'
            buttonProps={{
              onClick: action('business-plan-clicked'),
            }}
          />
        </div>
      </PricingProvider>
    </div>
  ),
}

/**
 * Free tier pricing card.
 */
export const FreeTier: Story = {
  render: () => (
    <div className='flex w-full justify-center'>
      <div className='mx-4 w-full max-w-[calc(100vw-32px)] md:mx-0 md:w-[510px] lg:w-[377px]'>
        <PricingCard
          tier={PricingTier.Free}
          description='Essential tools to explore and build.'
          price='$0'
          credits='100,000'
          features={freeFeatures}
          buttonText='Continue for Free'
          buttonProps={{
            onClick: action('free-plan-clicked'),
          }}
        />
      </div>
    </div>
  ),
}

/**
 * PayGo tier with highlight.
 */
export const PayGoTier: Story = {
  render: () => (
    <div className='flex w-full justify-center'>
      <div className='mx-4 w-full max-w-[calc(100vw-32px)] md:mx-0 md:w-[510px] lg:w-[377px]'>
        <PricingCard
          tier={PricingTier.PayGo}
          description='Built for scaling production apps.'
          price='$39'
          priceUnit='/mo'
          credits='4,000,000'
          creditsTooltip='Monthly credit allocation with pay-as-you-go billing for overages'
          features={paygoFeatures}
          buttonText='Subscribe'
          includedTier='Free'
          highlighted
          enabledFeatures={paygoEnabledFeatures}
          buttonProps={{
            onClick: action('paygo-plan-clicked'),
          }}
        />
      </div>
    </div>
  ),
}

/**
 * Business tier with custom pricing.
 */
export const BusinessTier: Story = {
  render: () => (
    <div className='flex w-full justify-center'>
      <div className='mx-4 w-full max-w-[calc(100vw-32px)] md:mx-0 md:w-[510px] lg:w-[377px]'>
        <PricingCard
          tier={PricingTier.Business}
          description='Tailored solutions for your needs.'
          price='Custom'
          priceUnit='pricing'
          credits='Custom credits'
          features={businessFeatures}
          buttonText='Contact Sales'
          includedTier='PayGo'
          buttonProps={{
            onClick: action('business-plan-clicked'),
          }}
        />
      </div>
    </div>
  ),
}

export const CustomBadges: Story = {
  render: () => (
    <div className='flex w-full justify-center'>
      <div className='mx-4 w-full max-w-[calc(100vw-32px)] md:mx-0 md:w-[510px] lg:w-[377px]'>
        <PricingCard
          tier={PricingTier.PayGo}
          description='Built for scaling production apps.'
          price='$39'
          priceUnit='/mo'
          credits='4,000,000'
          creditsTooltip='Monthly credit allocation with pay-as-you-go billing for overages'
          features={paygoFeatures}
          buttonText='Subscribe'
          includedTier='Free'
          highlighted
          enabledFeatures={paygoEnabledFeatures}
          buttonProps={{
            onClick: action('paygo-plan-clicked'),
          }}
          customTierBadge={{
            label: 'STARTER',
            className:
              'bg-[linear-gradient(247deg,theme(colors.black)_-37.91%,theme(colors.tatum-primary-500)_40.42%,theme(colors.white)_144%,theme(colors.tatum-tertiary-500)_144%)] text-white',
          }}
          infoBadge={{
            children: 'Save 16% with Yearly',
            color: BadgeColor.Brand,
          }}
        />
      </div>
    </div>
  ),
}

```

## Pagination

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import Pagination, { PaginationProps } from '@/components/Pagination'

/**
 * Pagination provides horizontal navigation between chunks (pages) of a dataset.
 */
const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {},
}

export default meta
type Story = StoryObj<typeof Pagination>

const StoryPagination = (props: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(0)
  const noOfPages = 10

  const canGoBack = currentPage > 0
  const canGoNext = currentPage < noOfPages - 1

  const onNextPage = () => setCurrentPage((p) => Math.min(p + 1, noOfPages - 1))
  const onPrevPage = () => setCurrentPage((p) => Math.max(p - 1, 0))

  return (
    <Pagination
      {...props}
      currentPage={currentPage}
      canGoBack={canGoBack}
      canGoNext={canGoNext}
      noOfPages={noOfPages}
      onNextPage={onNextPage}
      onPrevPage={onPrevPage}
      setCurrentPage={setCurrentPage}
    />
  )
}

/**
 * Default pagination component example
 */
export const Default: Story = {
  render: (props) => {
    return <StoryPagination {...props} />
  },
}

/**
 * Pagination variants: Default, ButtonGroup
 */
export const Variants: Story = {
  render: (props) => (
    <div className='flex flex-col gap-tatum-md'>
      Default
      <StoryPagination {...props} variant='default' />
      ButtonGroup
      <StoryPagination {...props} variant='buttonGroup' />
    </div>
  ),
}

export const WithoutLabels: Story = {
  args: {
    hideLabels: true,
    variant: 'buttonGroup',
  },
  render: (props) => {
    return <StoryPagination {...props} />
  },
}

```

## MultiSelect

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import { Chain } from '@/components/ChainIcon'
import {
  getDropdownItemsData,
  MyCustomItemData,
} from '@/components/Combobox/Combobox.stories'
import { DropdownItem } from '@/components/Combobox/Combobox.types'
import { Hint } from '@/components/Field/Hint'
import { Label } from '@/components/Field/Label'

import Field from '../Field/Field'
import MultiSelect from './MultiSelect'
import { MultiSelectProps } from './MultiSelect.types'

const MultiSelectFieldTemplate = (
  props: MultiSelectProps<MyCustomItemData> & {
    value: string[]
    onChange: (items: DropdownItem<MyCustomItemData>[]) => void
  },
) => {
  const [, updateArgs] = useArgs()
  const handleChange = (items: DropdownItem<MyCustomItemData>[]) => {
    updateArgs({ value: items.map((item) => item.id) })
  }

  return (
    <div className='flex w-[320px] flex-col gap-y-tatum-xl'>
      <Field>
        <Label required htmlFor={props.id || 'multiselect'}>
          Chains
        </Label>
        <MultiSelect
          {...props}
          id={props.id || 'multiselect'}
          items={props.items}
          value={props.value}
          onChange={handleChange}
        />
        <Hint>This is a hint text to help user.</Hint>
      </Field>
    </div>
  )
}

const items = getDropdownItemsData('1rem')

/**
 * MultiSelects are used to allow users to select multiple items from a list of options. They're useful for allowing users to select multiple chains, tokens, or other items from a large set of options.
 */
const meta: Meta<typeof MultiSelect<MyCustomItemData>> = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  excludeStories: /.*Data$/,
  argTypes: {
    value: {
      control: { type: 'object' },
    },
  },
  args: {
    placeholder: 'Select chains',
    items,
  },
}

export default meta
type Story = StoryObj<typeof MultiSelect<MyCustomItemData>>

/**
 * Default MultiSelect: Standard multi-select with chain icons.
 */
export const Default: Story = {
  args: {
    value: [Chain.Bitcoin],
  },
  render: MultiSelectFieldTemplate,
}

/**
 * Disabled MultiSelect: Shows the disabled state of the MultiSelect component.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    value: [Chain.Bitcoin, Chain.Ethereum],
  },
  render: MultiSelectFieldTemplate,
}

```

## Input

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { HelpCircle, Mail01 } from '@untitledui-pro/icons/line'
import { useArgs } from 'storybook/preview-api'

import Field from '@/components/Field/Field'
import { Hint } from '@/components/Field/Hint'
import { Label } from '@/components/Field/Label'
import Tooltip from '@/components/Tooltip'

import Input from './Input'

const initialValue = 'olivia@untitledui.com'

/**
 * Input fields allow users to enter text into a UI. They typically appear in forms and dialogs.
 * Input fields on mobiles should be at least 16px text size to avoid auto zoom on mobile browsers.
 */
const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  args: {
    placeholder: 'Enter your email',
  },
}

export default meta
type Story = StoryObj<typeof Input>

/**
 * Default input field: Standard input with a placeholder and a right-aligned tooltip icon.
 */
export const Default: Story = {
  render: function Render(props) {
    const [, updateArgs] = useArgs()
    return (
      <div className='flex w-[320px] flex-col gap-y-tatum-xl'>
        <Field>
          <Label required htmlFor='default-input'>
            Email
          </Label>
          <Input
            id='default-input'
            required
            slotRight={
              <Tooltip content='This is a tooltip'>
                <HelpCircle size={20} className='text-tatum-gray-400' />
              </Tooltip>
            }
            {...props}
            value={props.value as string}
            onChange={(event) => updateArgs({ value: event.target.value })}
          />
          <Hint>This is a hint text to help user.</Hint>
        </Field>
      </div>
    )
  },
}

/**
 * Disabled input field: Shows the disabled state of the input component.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    value: initialValue,
  },
  render: function Render(props) {
    return (
      <div className='flex w-[320px] flex-col gap-y-tatum-xl'>
        <Field>
          <Label htmlFor='disabled-input'>Email</Label>
          <Input id='disabled-input' {...props} value={props.value as string} />
          <Hint>This is a hint text to help user.</Hint>
        </Field>
      </div>
    )
  },
}

/**
 * Input fields with leading icon: Inputs can include icons to help users quickly understand the input's purpose or type.
 */
export const WithLeadingIcon: Story = {
  args: {
    slotLeft: <Mail01 size={24} className='text-tatum-gray-400' />,
    value: initialValue,
  },
  render: function Render(props) {
    const [, updateArgs] = useArgs()
    return (
      <div className='flex w-[320px] flex-col gap-y-tatum-xl'>
        <Field>
          <Label required htmlFor='leading-icon-input'>
            Email
          </Label>
          <Input
            id='leading-icon-input'
            required
            {...props}
            value={props.value as string}
            onChange={(event) => updateArgs({ value: event.target.value })}
          />
          <Hint>This is a hint text to help user.</Hint>
        </Field>
      </div>
    )
  },
}

/**
 * Input with error: Showcases the error state of an input field.
 */
export const Error: Story = {
  args: {
    error: true,
  },
  render: function Render(props) {
    const [, updateArgs] = useArgs()
    return (
      <div className='flex w-[320px] flex-col gap-y-tatum-xl'>
        <Field>
          <Label required htmlFor='error-input'>
            Email
          </Label>
          <Input
            id='error-input'
            required
            {...props}
            value={props.value as string}
            onChange={(event) => updateArgs({ value: event.target.value })}
          />
          <Hint>Please enter a valid email address.</Hint>
        </Field>
      </div>
    )
  },
}

```

## GradientBorder

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'

import Alert from '@/components/Alert'
import Card from '@/components/Card'
import GradientBorder from '@/components/GradientBorder'

/**
 * CSS border doesn't allow gradient colors by default, GradientBorder component adds a gradient border around any component with proper rendering even for thin borders.
 */
const meta: Meta<typeof GradientBorder> = {
  title: 'Components/GradientBorder',
  component: GradientBorder,
  argTypes: {},
  args: {
    gradient:
      'linear-gradient(to left, #4F37FD 0%, #6B4FFE 20%, #22C55E 60%, #6B4FFE 90%, #86EFAC 100%)',
    borderSize: '1px',
  },
}

export default meta
type Story = StoryObj<typeof GradientBorder>

/**
 * Example usage of GradientBorder.
 * */
export const Default: Story = {
  render: (props) => {
    return (
      <div className='flex flex-col gap-tatum-lg'>
        <GradientBorder {...props} className='rounded-tatum-md'>
          <Card>Card component wrapped in custom GradientBorder</Card>
        </GradientBorder>

        <GradientBorder {...props} className='rounded-tatum-lg'>
          <Alert title='Alert component wrapped in custom GradientBorder' />
        </GradientBorder>
      </div>
    )
  },
}

```

## FeaturedIcon

```tsx
import { Meta, StoryObj } from '@storybook/react-vite'
import { AlertCircle } from '@untitledui-pro/icons/line'

import FeaturedIcon, {
  FeaturedIconColor,
} from '@/components/FeaturedIcon/FeaturedIcon'

/**
 * FeaturedIcon provides a styled wrapper around any icon,
 * making it stand out as a visual highlight.
 * Use it to emphasize important actions, statuses, or key elements in the UI.
 */
const meta: Meta<typeof FeaturedIcon> = {
  component: FeaturedIcon,
  title: 'Components/FeaturedIcon',
}

export default meta
type Story = StoryObj<typeof FeaturedIcon>

/**
 * Default featured icon with a simple border and shadow
 */
export const Default: Story = {
  args: {
    icon: AlertCircle,
    size: 'md',
    variant: 'default',
  },
}

/**
 * Featured icons in all the possible sizes
 */
export const Sizes: Story = {
  render: () => {
    return (
      <div className='flex items-center gap-tatum-xl'>
        <FeaturedIcon icon={AlertCircle} size='sm' />
        <FeaturedIcon icon={AlertCircle} size='md' />
        <FeaturedIcon icon={AlertCircle} size='lg' />
        <FeaturedIcon icon={AlertCircle} size='xl' />
      </div>
    )
  },
}

/**
 * Light variant with circular shape and all color options
 */
export const Variants: Story = {
  render: (props) => {
    const colors: FeaturedIconColor[] = [
      'brand',
      'gray',
      'error',
      'warning',
      'success',
    ]

    return (
      <div className='flex flex-col gap-tatum-2xl'>
        <div className='flex flex-col gap-tatum-md'>
          <h3 className='text-base font-semibold'>Default</h3>
          <div className='flex items-center gap-tatum-lg'>
            <FeaturedIcon {...props} icon={AlertCircle} variant='default' />
          </div>
        </div>
        <div className='flex flex-col gap-tatum-md'>
          <h3 className='text-base font-semibold'>Light</h3>
          <div className='flex items-center gap-tatum-lg'>
            {colors.map((color) => (
              <div
                key={color}
                className='flex flex-col items-center gap-tatum-sm'
              >
                <FeaturedIcon
                  {...props}
                  icon={AlertCircle}
                  variant='light'
                  color={color}
                />
                <span className='text-xs text-tatum-gray-600'>{color}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
}

```

## Dropdown

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  HelpCircle,
  LogOut01,
  Plus,
  Settings01,
  User01,
  Users01,
} from '@untitledui-pro/icons/line'
import { useState } from 'react'

import Button, { ButtonSize, ButtonVariant } from '@/components/Button'

import {
  DropdownMenu,
  DropdownMenuAccountItem,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSection,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './Dropdown'

/**
 * Dropdown menus are used to display a list of actions or options that a user can choose.
 * They are typically triggered by clicking a button or other interactive element.
 */
const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/Dropdown',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

/**
 * Default dropdown menu with basic items
 */
export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={ButtonVariant.Secondary}>Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSection>
          <DropdownMenuItem icon={<User01 size={20} />}>
            My Account
          </DropdownMenuItem>
          <DropdownMenuItem icon={<HelpCircle size={20} />}>
            Support
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem icon={<LogOut01 size={20} />}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuSection>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

/**
 * Dropdown with account switcher from Dashboard
 */
export const DropdownWithAccountSwitcher: Story = {
  render: function Render() {
    const [selectedTeam, setSelectedTeam] = useState('enterprise')

    const Avatar = ({
      initials,
      image,
    }: {
      initials?: string
      image?: string
    }) => (
      <div className='relative h-10 w-10 rounded-full border border-tatum-gray-200 bg-tatum-gray-100'>
        {image ? (
          <img
            src={image}
            alt=''
            className='h-full w-full rounded-full object-cover'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center text-tatum-text-md font-tatum-semibold text-tatum-gray-600'>
            {initials}
          </div>
        )}
      </div>
    )

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={ButtonVariant.Secondary}>Account Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side='right' align='end' className='w-[264px] p-0'>
          <DropdownMenuSection className='rounded-none border-b border-tatum-gray-200'>
            <DropdownMenuItem
              icon={<User01 size={20} />}
              onSelect={() => alert('My Account clicked!')}
            >
              My Account
            </DropdownMenuItem>
            <DropdownMenuItem
              icon={<Settings01 size={20} />}
              onSelect={() => alert('Support clicked!')}
            >
              Support
            </DropdownMenuItem>
          </DropdownMenuSection>

          <DropdownMenuSection className='rounded-t-none border-b border-tatum-gray-200'>
            <DropdownMenuLabel>Switch team</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={selectedTeam}
              onValueChange={(value) => {
                setSelectedTeam(value)
                alert(`Switched to: ${value}`)
              }}
            >
              <DropdownMenuAccountItem
                value='personal'
                avatar={<Avatar image='https://placehold.co/40x40' />}
                name='Rio Scott'
                description='Personal'
                selected={selectedTeam === 'personal'}
              />
              <DropdownMenuAccountItem
                value='enterprise'
                avatar={<Avatar initials='ET' />}
                name='Enterprise Team'
                description='Owner'
                selected={selectedTeam === 'enterprise'}
              />
              <DropdownMenuAccountItem
                value='base'
                avatar={<Avatar initials='BT' />}
                name="Base's Team"
                description='Member'
                selected={selectedTeam === 'base'}
              />
              <DropdownMenuAccountItem
                value='ilya'
                avatar={<Avatar initials='IT' />}
                name="Ilya's Team"
                description='Member'
                selected={selectedTeam === 'ilya'}
              />
            </DropdownMenuRadioGroup>

            <div className='mt-tatum-xs px-tatum-md pb-tatum-md pt-tatum-xs'>
              <Button
                variant={ButtonVariant.Accent}
                size={ButtonSize.Small}
                leftIcon={<Plus size={20} />}
                className='w-full !border-tatum-primary-300 !bg-tatum-white !text-tatum-primary-600 hover:!bg-tatum-gray-50'
                onClick={() => alert('Create team clicked!')}
              >
                Create team
              </Button>
            </div>

            <div className='px-tatum-md pb-tatum-md'>
              <Button
                variant={ButtonVariant.Secondary}
                size={ButtonSize.Small}
                leftIcon={<Users01 size={20} />}
                className='w-full'
                onClick={() => alert('Manage team clicked!')}
              >
                Manage team
              </Button>
            </div>
          </DropdownMenuSection>

          <div className='py-tatum-xs'>
            <DropdownMenuItem
              icon={<LogOut01 size={20} />}
              onSelect={() => alert('Sign out clicked!')}
            >
              Sign out
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

/**
 * Dropdown with checkbox items for multiple selection
 */
export const WithCheckboxes: Story = {
  render: function Render() {
    const [showStatusBar, setShowStatusBar] = useState(true)
    const [showActivityBar, setShowActivityBar] = useState(false)
    const [showPanel, setShowPanel] = useState(false)

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={ButtonVariant.Secondary}>View Options</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSection>
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
            >
              Activity Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showPanel}
              onCheckedChange={setShowPanel}
            >
              Panel
            </DropdownMenuCheckboxItem>
          </DropdownMenuSection>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

/**
 * Dropdown with submenu
 */
export const WithSubmenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={ButtonVariant.Secondary}>Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSection>
          <DropdownMenuItem>New Tab</DropdownMenuItem>
          <DropdownMenuItem>New Window</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email link</DropdownMenuItem>
                <DropdownMenuItem>Messages</DropdownMenuItem>
                <DropdownMenuItem>Notes</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Print</DropdownMenuItem>
        </DropdownMenuSection>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

/**
 * Dropdown with disabled items
 */
export const WithDisabledItems: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={ButtonVariant.Secondary}>Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSection>
          <DropdownMenuItem>Undo</DropdownMenuItem>
          <DropdownMenuItem>Redo</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>Cut</DropdownMenuItem>
          <DropdownMenuItem>Copy</DropdownMenuItem>
          <DropdownMenuItem>Paste</DropdownMenuItem>
        </DropdownMenuSection>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

/**
 * Dropdown with custom alignment options
 */
export const AlignmentOptions: Story = {
  render: () => (
    <div className='flex min-h-[400px] flex-col items-center justify-center gap-8'>
      <div className='flex gap-4'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={ButtonVariant.Secondary}>
              Default (Start/Bottom)
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSection>
              <DropdownMenuItem>Item 1</DropdownMenuItem>
              <DropdownMenuItem>Item 2</DropdownMenuItem>
              <DropdownMenuItem>Item 3</DropdownMenuItem>
            </DropdownMenuSection>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={ButtonVariant.Secondary}>Center Aligned</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='center'>
            <DropdownMenuSection>
              <DropdownMenuItem>Item 1</DropdownMenuItem>
              <DropdownMenuItem>Item 2</DropdownMenuItem>
              <DropdownMenuItem>Item 3</DropdownMenuItem>
            </DropdownMenuSection>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={ButtonVariant.Secondary}>End Aligned</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuSection>
              <DropdownMenuItem>Item 1</DropdownMenuItem>
              <DropdownMenuItem>Item 2</DropdownMenuItem>
              <DropdownMenuItem>Item 3</DropdownMenuItem>
            </DropdownMenuSection>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='flex gap-4'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={ButtonVariant.Secondary}>Top Side</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side='top'>
            <DropdownMenuSection>
              <DropdownMenuItem>Item 1</DropdownMenuItem>
              <DropdownMenuItem>Item 2</DropdownMenuItem>
              <DropdownMenuItem>Item 3</DropdownMenuItem>
            </DropdownMenuSection>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={ButtonVariant.Secondary}>Right Side</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side='right' align='end'>
            <DropdownMenuSection>
              <DropdownMenuItem>Item 1</DropdownMenuItem>
              <DropdownMenuItem>Item 2</DropdownMenuItem>
              <DropdownMenuItem>Item 3</DropdownMenuItem>
            </DropdownMenuSection>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={ButtonVariant.Secondary}>Left Side</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side='left' align='end'>
            <DropdownMenuSection>
              <DropdownMenuItem>Item 1</DropdownMenuItem>
              <DropdownMenuItem>Item 2</DropdownMenuItem>
              <DropdownMenuItem>Item 3</DropdownMenuItem>
            </DropdownMenuSection>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  ),
}

```

## Dialog

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { AlertTriangle } from '@untitledui-pro/icons/line'
import { DotsVertical } from '@untitledui-pro/icons/line'
import { useState } from 'react'

import Button, { ButtonVariant } from '@/components/Button/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSection,
  DropdownMenuTrigger,
} from '@/components/Dropdown'
import Field, { Label } from '@/components/Field'
import Input from '@/components/Input'

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './Dialog'

/**
 * Dialogs are modal overlays that provide information and request user input.
 */
const meta: Meta<typeof Dialog> = {
  component: Dialog,
  title: 'Components/Dialog',
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Dialog>

/**
 * Default Dialog: Standard dialog with header, description, and actions.
 */
export const Default: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false)

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <AlertTriangle
                size={29}
                className='mr-tatum-xs text-tatum-warning-600'
              />
              Dialog Title
            </DialogTitle>
            <DialogDescription>
              A dialog is a type of modal window that appears in front of app
              content to provide critical information or ask for a decision.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant={ButtonVariant.Secondary}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}

/**
 * Custom content: Dialog with custom content.
 */
export const CustomContent: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false)

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent width='fit-content'>
          <DialogHeader>
            <DialogTitle>
              <div className='flex w-full justify-center'>
                <h3>Sign up</h3>
              </div>
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <DialogBody>
            <div className='flex w-[550px] flex-col gap-tatum-xl'>
              <Field>
                <Label>Name</Label>
                <Input />
              </Field>
              <Field>
                <Label>Email</Label>
                <Input />
              </Field>
              <Field>
                <Label>Password</Label>
                <Input />
              </Field>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant={ButtonVariant.Secondary}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}

/**
 * Drawer from right: Off‑canvas drawer variant implemented with Dialog components.
 */
export const Drawer: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false)

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Open Drawer</Button>
        </DialogTrigger>

        <DialogContent variant='drawer' width='22rem'>
          <DialogHeader>
            <DialogTitle>Drawer title</DialogTitle>
            <DialogDescription>
              This drawer behaves like an off‑canvas panel.
            </DialogDescription>
          </DialogHeader>

          <DialogBody>
            <div className='mt-tatum-xl h-screen'>Long content example</div>
          </DialogBody>

          <DialogFooter>
            <Button
              variant={ButtonVariant.Secondary}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}

/**
 * Dialog from dropdown menu: Example of dialog triggered from dropdown menu.
 */
export const DialogFromDropdown: Story = {
  render: function Render() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={ButtonVariant.Secondary}
              aria-label='Open menu'
              className='px-2'
            >
              <DotsVertical />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuSection>
              <DropdownMenuItem onSelect={() => setIsDialogOpen(true)}>
                Open Dialog
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setIsDialogOpen(true)}>
                Also Open Dialog
              </DropdownMenuItem>
            </DropdownMenuSection>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                A dialog is a type of modal window that appears in front of app
                content to provide critical information or ask for a decision.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant={ButtonVariant.Secondary}
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  },
}

```

## DateRangePicker

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import DateRangePicker from '@/components/DateRangePicker/DateRangePicker'

/**
 * Date range pickers let users select a range of dates. They commonly appear as a dropdown, but can also be used in modals and multi-step processes.
 */
const meta: Meta<typeof DateRangePicker> = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  argTypes: {
    defaultOpen: {
      control: 'boolean',
    },
    onChange: {
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof DateRangePicker>

/**
 * Default date range picker: User can select a range of dates.
 */
export const Default: Story = {
  args: {
    defaultOpen: false,
  },
  render: function Render(props) {
    const [, updateArgs] = useArgs()

    return (
      <DateRangePicker
        {...props}
        onChange={(value) => {
          updateArgs({ value })
        }}
      />
    )
  },
}

```

## DatePicker

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import DatePicker from '@/components/DatePicker/DatePicker'

/**
 * Date pickers let users select a date. They commonly appear as a dropdown, but can also be used in modals and multi-step processes.
 */
const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  argTypes: {
    value: {
      control: 'date',
    },
    defaultOpen: {
      control: 'boolean',
    },
    onChange: {
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof DatePicker>

/**
 * Default date picker: User can select a date.
 */
export const Default: Story = {
  args: {
    defaultOpen: false,
  },
  render: function Render(props) {
    const [, updateArgs] = useArgs()

    return <DatePicker {...props} onChange={(value) => updateArgs({ value })} />
  },
}

```

## Combobox

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Mail01 } from '@untitledui-pro/icons/line'
import { TrendUp01 } from '@untitledui-pro/icons/solid'
import { useArgs } from 'storybook/preview-api'

import { Chain, ChainIcon } from '@/components/ChainIcon'
import Combobox, { ComboboxProps } from '@/components/Combobox/Combobox'
import { DropdownItem } from '@/components/Combobox/Combobox.types'
import { Hint } from '@/components/Field/Hint'
import { Label } from '@/components/Field/Label'

import Field from '../Field/Field'

// Mock data type including the custom property
export interface MyCustomItemData {
  status: string
}

// Define the items with the custom property
export const getDropdownItemsData = (
  iconSize = '1.5rem',
): DropdownItem<MyCustomItemData>[] => {
  return [
    { id: Chain.Bitcoin, label: 'Bitcoin', description: 'BTC', status: 'ok' },
    {
      id: Chain.Ethereum,
      label: 'Ethereum',
      description: 'ETH',
      status: 'error',
    },
    { id: Chain.Solana, label: 'Solana', description: 'SOL', status: 'ok' },
    { id: Chain.Base, label: 'Base', description: 'BASE', status: 'ok' },
    { id: Chain.Polygon, label: 'Polygon', description: 'MATIC', status: 'ok' },
    {
      id: Chain.Bsc,
      label: 'Binance Smart Chain',
      description: 'BNB',
      status: 'ok',
    },
    { id: Chain.Ripple, label: 'Ripple', description: 'XRP', status: 'ok' },
    { id: Chain.Litecoin, label: 'Litecoin', description: 'LTC', status: 'ok' },
    { id: Chain.Cardano, label: 'Cardano', description: 'ADA', status: 'ok' },
    { id: Chain.Polkadot, label: 'Polkadot', description: 'DOT', status: 'ok' },
  ].map((item) => {
    return {
      ...item,
      icon: <ChainIcon chain={item.id} size={iconSize} />,
    }
  })
}
export const dropdownItemsData: DropdownItem<MyCustomItemData>[] =
  getDropdownItemsData()

/**
 * Comboboxes are used to group together actions in a subview. They’re useful for allowing users to select from a large number of options, or to even search for options within the input field before selecting.
 */
const meta: Meta<typeof Combobox<MyCustomItemData>> = {
  title: 'Components/Combobox',
  component: Combobox,
  excludeStories: /.*Data$/,
  argTypes: {
    value: {
      control: { type: 'select' },
      options: dropdownItemsData.map((item) => item.id),
    },
  },
  args: {
    placeholder: 'Select chain',
    items: dropdownItemsData,
  },
}

export default meta
type Story = StoryObj<typeof Combobox<MyCustomItemData>>

const ComboboxFieldTemplate = (
  props: ComboboxProps<MyCustomItemData> & {
    value: string | null
    onChange: (item: DropdownItem<MyCustomItemData> | null) => void
  },
) => {
  const [, updateArgs] = useArgs()
  const handleChange = (item: DropdownItem<MyCustomItemData> | null) => {
    updateArgs({ value: item ? item.id : null })
  }

  return (
    <div className='flex w-[320px] flex-col gap-y-tatum-xl'>
      <Field>
        <Label required htmlFor={props.id || 'combobox'}>
          Chain
        </Label>
        <Combobox
          {...props}
          id={props.id || 'combobox'}
          items={props.items}
          value={props.value}
          onChange={handleChange}
        />
        <Hint>This is a hint text to help user.</Hint>
      </Field>
    </div>
  )
}

/**
 * Default Combobox: Standard simple combobox.
 */
export const Default: Story = {
  args: {
    value: Chain.Bitcoin,
  },
  render: ComboboxFieldTemplate,
}

/**
 * Disabled Combobox: Shows the disabled state of the Combobox component.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    value: Chain.Bitcoin,
  },
  render: ComboboxFieldTemplate,
}

/**
 * Clearable Combobox: Combobox value can be cleared when clearable is set to true.
 */
export const Clearable: Story = {
  args: {
    clearable: true,
    value: Chain.Ethereum,
  },
  render: ComboboxFieldTemplate,
}

/**
 * Combobox with leading icons: Combobox can include icons to help users quickly understand the input's purpose or type.
 */
export const WithLeadingIcon: Story = {
  args: {
    inputProps: {
      slotLeft: <Mail01 className='text-tatum-gray-700' />,
    },
  },
  render: ComboboxFieldTemplate,
}

/**
 * Combobox with custom items: Combobox items can be fully customized to fit your needs.
 */
export const CustomItemContent: Story = {
  args: {
    items: [
      { id: '0', label: 'Popular searches', description: '', status: '' },
      ...dropdownItemsData,
    ],
    downshiftProps: {
      isItemDisabled: (item) => item.id === '0',
    },
    customItemRender: (item) => {
      if (item.id !== '0') {
        return null
      }

      return (
        <div className='flex cursor-default items-center gap-tatum-md text-tatum-primary-500'>
          <TrendUp01 size={24} />
          {item.label}
        </div>
      )
    },
  },
  render: ComboboxFieldTemplate,
}

```

## CodeHighlight

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'

import { TabsVariant } from '@/components/Tabs'

import CodeHighlight, { CodeLanguage } from './CodeHighlight'

/**
 * Markdown code snippets are useful for mocking up editors or sharing examples of code.
 */
const meta: Meta<typeof CodeHighlight> = {
  title: 'Components/CodeHighlight',
  component: CodeHighlight,
}

export default meta
type Story = StoryObj<typeof CodeHighlight>

const codeExamples: CodeLanguage[] = [
  {
    id: 'javascript',
    language: 'javascript',
    label: 'JavaScript',
    code: `const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'x-api-key': 'YOUR-API-KEY'
  }
};

fetch('https://api.tatum.io/v4/data/transactions?chain=ethereum', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));`,
  },

  {
    id: 'typescript',
    language: 'typescript',
    label: 'TypeScript',
    code: `const options: RequestInit = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'x-api-key': 'YOUR-API-KEY',
  },
};

async function fetchTransactions(): Promise<TatumTxResponse> {
  const res = await fetch(
    'https://api.tatum.io/v4/data/transactions?chain=ethereum',
    options,
  );

  if (!res.ok) throw new Error(\`HTTP error \${res.status}\`);

  return res.json();
}

fetchTransactions()
  .then(console.log)
  .catch(console.error);`,
  },

  {
    id: 'node',
    language: 'javascript',
    label: 'Node.js',
    code: `import tatumdocs from '@api/tatumdocs';

tatumdocs.auth('YOUR-API-KEY');
tatumdocs.getTransactionsV4({chain: 'ethereum'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));\``,
  },
  {
    id: 'python',
    language: 'python',
    label: 'Python',
    code: `import requests

url = "https://api.tatum.io/v4/data/transactions?chain=ethereum"

headers = {
    "accept": "application/json",
    "x-api-key": "YOUR-API-KEY"
}

response = requests.get(url, headers=headers)

print(response.text)`,
  },
  {
    id: 'curl',
    language: 'bash',
    label: 'cURL',
    code: `curl --request GET \\
     --url 'https://api.tatum.io/v4/data/transactions?chain=ethereum' \\
     --header 'accept: application/json' \\
     --header 'x-api-key: YOUR-API-KEY'`,
  },
]

/**
 * Default code highlight: Shows code example for one language.
 */
export const Default: Story = {
  args: {
    languages: [codeExamples[0]],
  },
  render: (props) => <CodeHighlight {...props} />,
}

/**
 * Multiple languages: Showcases code examples in multiple programming languages, allowing users to switch between tabs to view the desired language.
 */
export const MultipleLanguages: Story = {
  args: {
    languages: codeExamples,
  },
  render: (props) => <CodeHighlight {...props} />,
}

/**
 * Customized CodeHighlight: Use wrapLongLines property to wrap long lines of code, showLineNumbers to hide line numbers, change tabs variant, add custom style to YOUR-API-KEY.
 */
export const Customization: Story = {
  args: {
    languages: codeExamples,
    customMatchers: [
      {
        matcher: 'YOUR-API-KEY',
        className: 'font-bold !text-tatum-secondary-900 bg-tatum-error-500',
      },
    ],
    tabsProps: {
      variant: TabsVariant.ButtonMinimal,
    },
    syntaxHighlighterProps: {
      wrapLongLines: true,
      showLineNumbers: false,
    },
  },
  render: (props) => <CodeHighlight {...props} />,
}

```

## Checkbox

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { useArgs } from 'storybook/preview-api'

import Checkbox from './Checkbox'

/**
 * Checkboxes allow users to select one or more items from a set, while radio buttons allow users to select just one option from a set. Both can also be used to turn an option on or off.
 */
const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    defaultChecked: false,
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

/**
 * Default checkbox: A simple checkbox with label.
 */
export const Default: Story = {
  render: function Render() {
    const [{ checked }, updateArgs] = useArgs()
    return (
      <Checkbox
        checked={checked as boolean}
        onCheckedChange={(value) => updateArgs({ checked: value })}
        label='Label'
      />
    )
  },
}

/**
 * Sizes: Shows both small and medium sized checkboxes.
 */
export const Sizes: Story = {
  render: function Render() {
    const [{ checked }, updateArgs] = useArgs()
    return (
      <div className='flex flex-col gap-y-tatum-xl'>
        <Checkbox
          size='sm'
          checked={checked as boolean}
          onCheckedChange={(value) => updateArgs({ checked: value })}
          label='Small'
        />
        <Checkbox
          size='md'
          checked={checked as boolean}
          onCheckedChange={(value) => updateArgs({ checked: value })}
          label='Medium (default)'
        />
      </div>
    )
  },
}

/**
 * Disabled: Shows the disabled state of the checkbox.
 */
export const Disabled: Story = {
  render: function Render() {
    return (
      <div className='flex flex-col gap-y-tatum-xl'>
        <Checkbox disabled label='Disabled unchecked' />
        <Checkbox disabled checked label='Disabled checked' />
      </div>
    )
  },
}

/**
 * Indeterminate: Shows the indeterminate state, useful for "select all" scenarios.
 */
export const Indeterminate: Story = {
  render: function Render() {
    const [item1, setItem1] = useState(true)
    const [item2, setItem2] = useState(true)
    const [item3, setItem3] = useState(false)

    const allChecked = item1 && item2 && item3
    const noneChecked = !item1 && !item2 && !item3

    const parentChecked = allChecked
      ? true
      : noneChecked
        ? false
        : 'indeterminate'

    const handleParentChange = (checked: boolean | 'indeterminate') => {
      const newValue = checked === true
      setItem1(newValue)
      setItem2(newValue)
      setItem3(newValue)
    }

    return (
      <div className='flex flex-col gap-y-tatum-md'>
        <Checkbox
          checked={parentChecked}
          onCheckedChange={handleParentChange}
          label='Select all'
          labelClassName='font-tatum-semibold'
        />
        <div className='ml-tatum-2xl flex flex-col gap-tatum-sm'>
          <Checkbox
            checked={item1}
            onCheckedChange={(checked) => setItem1(checked as boolean)}
            label='Item 1'
          />
          <Checkbox
            checked={item2}
            onCheckedChange={(checked) => setItem2(checked as boolean)}
            label='Item 2'
          />
          <Checkbox
            checked={item3}
            onCheckedChange={(checked) => setItem3(checked as boolean)}
            label='Item 3'
          />
        </div>
      </div>
    )
  },
}

```

## ChainIcon

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import { Chain, ChainIcon } from '@/components/ChainIcon'
import Combobox from '@/components/Combobox'

const ICON_SIZES = ['0.5rem', '1rem', '1.5rem', '2rem', '2.5rem', '3rem']

/**
 * Blockchain Icons: Use blockchain icons from https://blockchains.tatum.io/blockchains.json
 */
const meta: Meta<typeof ChainIcon> = {
  title: 'Components/ChainIcon',
  component: ChainIcon,
  argTypes: {
    chain: {
      control: { type: 'select' },
      options: Object.values(Chain),
    },
  },
  args: {
    chain: Chain.Bitcoin,
  },
}

export default meta
type Story = StoryObj<typeof ChainIcon>

/**
 * ChainIcon: ChainIcon component can be used to simply access and show blockchain icons from Tatum's blockchain icon library.
 */
export const Default: Story = {
  render: function Render(props) {
    const [, updateArgs] = useArgs()

    return (
      <div className='flex gap-tatum-xl'>
        <div className='flex gap-tatum-xl'>
          {ICON_SIZES.map((size) => (
            <ChainIcon {...props} size={size} key={size} />
          ))}
        </div>
        <Combobox
          value={props.chain}
          onChange={(val) => updateArgs({ chain: val?.id })}
          items={Object.entries(Chain).map(([key, val]) => ({
            id: val,
            label: key,
          }))}
          placeholder='Select chain'
        />
      </div>
    )
  },
}

```

## Carousel

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'

import Card from '@/components/Card'
import { clsxm } from '@/utils/classes'

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './Carousel'

/**
 * A carousel optimizes screen space by displaying a single image from a collection of images.
 * Arrows or buttons suggest additional content that is not currently visible, which encourages the user to explore.
 */
const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  argTypes: {
    plugins: {
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof Carousel>

const Colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']

const ImageItem = ({ color }: { color: string }) => {
  return (
    <CarouselItem
      className={clsxm(
        'flex h-full min-w-0 shrink-0 grow-0 basis-full items-center justify-center',
      )}
    >
      <div
        className={clsxm(
          'h-full w-1/2',
          'flex h-tatum-11xl items-center justify-center rounded-lg',
        )}
        style={{ backgroundColor: color }}
      >
        {color}
      </div>
    </CarouselItem>
  )
}

/**
 * Carousel with one item per slide.
 */
export const Default: Story = {
  render: (props) => (
    <Carousel {...props}>
      <CarouselContent className='max-h-tatum-11xl gap-tatum-xl'>
        {Colors.map((color) => (
          <ImageItem key={color} color={color} />
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  ),
}

const CardItem = ({ color }: { color: string }) => {
  return (
    <CarouselItem>
      <Card
        className='h-[10rem] w-[15rem] items-center justify-center'
        style={{
          backgroundColor: color,
        }}
      >
        {color}
      </Card>
    </CarouselItem>
  )
}

/**
 * Responsive slides per view with current slide indicator.
 * 1, 2, or 3 slides shown depending on viewport width.
 */
export const SlidesPerView: Story = {
  args: {
    opts: {
      align: 'start',
    },
  },
  render: function Render(props) {
    const [api, setApi] = useState<CarouselApi | null>(null)
    const [selected, setSelected] = useState(0)

    useEffect(() => {
      if (!api) {
        return
      }

      const update = () => {
        setSelected(api.selectedScrollSnap())
      }

      update()
      api.on('select', update)
      api.on('reInit', update)

      return () => {
        api.off('select', update)
        api.off('reInit', update)
      }
    }, [api])

    return (
      <Carousel {...props} setApi={setApi}>
        <CarouselContent className='-ml-tatum-xl'>
          {Colors.map((color) => (
            <CarouselItem
              key={color}
              className={clsxm(
                'pl-tatum-xl',
                'flex min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3',
                'items-center justify-center',
              )}
            >
              <div
                className='flex h-tatum-11xl w-full items-center justify-center rounded-lg'
                style={{ backgroundColor: color }}
              >
                {color}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <div className='absolute bottom-tatum-xl right-tatum-xl rounded-md bg-tatum-white/80 px-tatum-md py-tatum-sm text-sm font-medium'>
          {selected + 1}/{Colors.length}
        </div>
      </Carousel>
    )
  },
}

/**
 * A carousel showcasing multiple cards in a horizontal scroll layout with drag-free interaction.
 * Horizontally scrollable card list with free dragging and no snapping.
 */
export const FreeSlide: Story = {
  args: {
    opts: {
      dragFree: true,
      align: 'start',
    },
  },
  render: (props) => (
    <Carousel {...props}>
      <CarouselContent className='max-h-tatum-11xl gap-tatum-xl'>
        {Colors.map((color) => (
          <CardItem key={color} color={color} />
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

```

## Card

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bell03, Coins01, Wallet03 } from '@untitledui-pro/icons/line'
import { ArrowBlockUp } from '@untitledui-pro/icons/solid'

import Button, { ButtonVariant } from '@/components/Button'
import Skeleton from '@/components/Skeleton'

import Card from './Card'

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Components/Card',
}

export default meta
type Story = StoryObj<typeof Card>

/**
 * Simple wrapper for creating any kind of card component
 */
export const Default: Story = {
  render: () => (
    <Card className='h-[206px] w-[318px] bg-tatum-gray-50'>
      <div className='mb-tatum-md flex items-center gap-tatum-md'>
        <div className='rounded-tatum-sm border border-tatum-gray-200 bg-tatum-white p-tatum-md'>
          <Wallet03 size={16} className='text-tatum-gray-700' />
        </div>
        <span className='flex-1 text-tatum-text-md font-tatum-semibold text-tatum-gray-900'>
          Wallet Activity
        </span>
      </div>
      <span className='text-tatum-text-md font-tatum-medium text-tatum-gray-700'>
        Track all transactions for Vitalik Buterin’s wallet
      </span>
      <Button
        className='mt-auto'
        variant={ButtonVariant.Outlined}
        leftIcon={<Bell03 size={16} />}
      >
        Subscribe to Alert
      </Button>
    </Card>
  ),
}

/**
 * Metrics are useful for presenting key data points or numbers to users. They’re commonly used in dashboards to quickly summarise changes in data.
 */
export const Metric: Story = {
  render: () => (
    <Card className='bg-tatum-white'>
      <div className='mb-tatum-md flex justify-between'>
        <span className='text-tatum-text-sm font-tatum-medium text-tatum-gray-600'>
          View 24 hours
        </span>
      </div>
      <div className='flex items-end justify-between gap-tatum-xl'>
        <span className='text-tatum-heading-sm font-tatum-semibold'>
          {(2000).toLocaleString()}
        </span>
        <div className='flex items-center rounded-tatum-sm border border-tatum-gray-300 py-tatum-xxs pl-tatum-sm pr-tatum-md'>
          <ArrowBlockUp
            size={13}
            className='mr-tatum-xs text-tatum-success-500'
          />
          <span className='text-tatum-text-sm font-tatum-medium text-tatum-gray-700'>
            100%
          </span>
        </div>
      </div>
    </Card>
  ),
}

const PreparedCard = () => {
  return (
    <Card className='bg-tatum-white'>
      <div className='flex w-full'>
        <div className='mr-tatum-xl flex size-fit items-center justify-center rounded-tatum-md border border-tatum-gray-200 p-[10px]'>
          <Coins01 />
        </div>
        <div className='flex flex-auto flex-col gap-tatum-md'>
          <div className='flex justify-between'>
            <span className='text-tatum-text-sm font-tatum-semibold text-tatum-gray-500'>
              Number of Tokens
            </span>
          </div>
          <span className='text-tatum-heading-xs font-tatum-semibold text-tatum-gray-900'>
            {(198).toLocaleString()}
          </span>
        </div>
      </div>
    </Card>
  )
}

/**
 * Example how to build a group of metric cards.
 */
export const DataInsightMetricGroup: Story = {
  render: () => {
    return (
      <div className='grid grid-cols-1 justify-items-center gap-tatum-3xl md:grid-cols-2 lg:grid-cols-3'>
        <PreparedCard />
        <PreparedCard />
        <PreparedCard />
        <PreparedCard />
        <PreparedCard />
        <PreparedCard />
      </div>
    )
  },
}

const PreparedLoadingCard = () => {
  return (
    <Card className='bg-tatum-white'>
      <div className='flex w-full'>
        <Skeleton className='mr-tatum-xl size-[40px]' />
        <div className='flex flex-auto flex-col gap-tatum-md'>
          <Skeleton className='h-tatum-2xl w-full' />
          <Skeleton className='h-tatum-4xl w-full' />
        </div>
      </div>
    </Card>
  )
}

/**
 * Example how to build card with a loading state.
 */
export const Loading: Story = {
  render: () => {
    return (
      <div className='grid grid-cols-1 justify-items-center gap-tatum-3xl md:grid-cols-2 lg:grid-cols-3'>
        <PreparedLoadingCard />
        <PreparedLoadingCard />
        <PreparedLoadingCard />
        <PreparedLoadingCard />
        <PreparedLoadingCard />
        <PreparedLoadingCard />
      </div>
    )
  },
}

```

## Button

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bell01, LinkExternal02 } from '@untitledui-pro/icons/line'
import { Bell02 } from '@untitledui-pro/icons/solid'
import { action } from 'storybook/actions'

import { CopyButton } from '@/components/Button/CopyButton'
import { IconButton } from '@/components/Button/IconButton'
import { Section } from '@/tailwindPlugin/common'

import Button, {
  ButtonAsButtonProps,
  ButtonColorPalette,
  ButtonSize,
  ButtonVariant,
} from './Button'

/**
 * Buttons are interactive elements used to trigger actions or navigation.
 */
const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Button',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.values(ButtonVariant),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(ButtonSize),
    },
    onClick: {
      action: 'clicked',
      control: false,
    },
  },
  args: {
    children: 'Button Text',
    variant: ButtonVariant.Primary,
    size: ButtonSize.Medium,
    disabled: false,
    onClick: action('clicked'),
  },
}

export default meta
type Story = StoryObj<typeof Button>

/**
 * Default Button: Standard button configuration.
 */
export const Default: Story = {
  render: (args) => <Button {...(args as ButtonAsButtonProps)} />,
}

/**
 * Buttons with Icons: Buttons can include icons to visually reinforce the action.
 * Icons can be placed on either side of the button text.
 */
export const WithIcons: Story = {
  render: (args) => (
    <div className='flex w-tatum-11xl flex-col gap-tatum-2xl'>
      <Button {...args} leftIcon={<Bell02 size={16} />}>
        Left Icon
      </Button>
      <Button {...args} rightIcon={<Bell02 size={16} />}>
        Right Icon
      </Button>
      <Button
        {...args}
        leftIcon={<Bell02 size={16} />}
        rightIcon={<Bell02 size={16} />}
      >
        Both
      </Button>
    </div>
  ),
}

/**
 * Button Variants: Different visual styles for buttons.
 * Includes Primary, Secondary, Accent, Outlined, Flat, LinkPrimary, and LinkGray.
 */
export const Variants: Story = {
  render: () => (
    <>
      <Section title='Primary' description='Used for primary actions and CTAs'>
        <div className='flex flex-wrap gap-tatum-xl'>
          <Button variant={ButtonVariant.Primary}>Primary Button</Button>
          <Button
            variant={ButtonVariant.Primary}
            leftIcon={<Bell02 size={16} />}
          >
            With Icon
          </Button>
          <Button variant={ButtonVariant.Primary} focused>
            Focused
          </Button>
          <Button variant={ButtonVariant.Primary} disabled>
            Disabled
          </Button>
        </div>
      </Section>

      <Section title='Secondary' description='Used for secondary actions'>
        <div className='flex flex-wrap gap-tatum-xl'>
          <Button variant={ButtonVariant.Secondary}>Secondary Button</Button>
          <Button
            variant={ButtonVariant.Secondary}
            leftIcon={<Bell02 size={16} />}
          >
            With Icon
          </Button>
          <Button variant={ButtonVariant.Secondary} disabled>
            Disabled
          </Button>
        </div>
      </Section>

      <Section
        title='Accent'
        description='Used for secondary actions with brand colors'
      >
        <div className='flex flex-wrap gap-tatum-xl'>
          <Button variant={ButtonVariant.Accent}>Accent Button</Button>
          <Button
            variant={ButtonVariant.Accent}
            leftIcon={<Bell02 size={16} />}
          >
            With Icon
          </Button>
          <Button variant={ButtonVariant.Accent} disabled>
            Disabled
          </Button>
        </div>
      </Section>

      <Section
        title='Outlined'
        description='Used for secondary actions with outline styling'
      >
        <div className='flex flex-wrap gap-tatum-xl'>
          <Button variant={ButtonVariant.Outlined}>Outlined Button</Button>
          <Button
            variant={ButtonVariant.Outlined}
            leftIcon={<Bell02 size={16} />}
          >
            Explore All Partners
          </Button>
          <Button variant={ButtonVariant.Outlined} disabled>
            Disabled
          </Button>
        </div>
      </Section>

      <Section title='Flat' description='Used for minor actions'>
        <div className='flex flex-wrap gap-tatum-xl'>
          <Button variant={ButtonVariant.Flat}>Flat Button</Button>
          <Button variant={ButtonVariant.Flat} leftIcon={<Bell02 size={16} />}>
            With Icon
          </Button>
          <Button variant={ButtonVariant.Flat} disabled>
            Disabled
          </Button>
        </div>
      </Section>

      <Section
        title='LinkPrimary'
        description='Used for links and minor actions'
      >
        <div className='flex flex-wrap gap-tatum-xl'>
          <Button variant={ButtonVariant.LinkPrimary}>
            LinkPrimary Button
          </Button>
          <Button
            variant={ButtonVariant.LinkPrimary}
            leftIcon={<Bell02 size={16} />}
          >
            With Icon
          </Button>
          <Button variant={ButtonVariant.LinkPrimary} disabled>
            Disabled
          </Button>
        </div>
      </Section>

      <Section title='LinkGrey' description='Used for links and minor actions'>
        <div className='flex flex-wrap gap-tatum-xl'>
          <Button variant={ButtonVariant.LinkGray}>LinkGrey Button</Button>
          <Button
            variant={ButtonVariant.LinkGray}
            leftIcon={<Bell02 size={16} />}
          >
            With Icon
          </Button>
          <Button variant={ButtonVariant.LinkGray} disabled>
            Disabled
          </Button>
        </div>
      </Section>
    </>
  ),
}

/**
 * Button Sizes: Buttons come in different sizes to fit various contexts.
 * Includes all available size options.
 */
export const Sizes: Story = {
  render: (props) => (
    <div className='flex flex-col items-start gap-tatum-3xl'>
      <div className='flex items-center gap-tatum-2xl'>
        <div className='w-32 text-right text-tatum-text-sm text-tatum-gray-500'>
          Small
        </div>
        <Button
          {...props}
          size={ButtonSize.Small}
          leftIcon={<Bell02 size={16} />}
        >
          Small Button
        </Button>
      </div>
      <div className='flex items-center gap-tatum-2xl'>
        <div className='w-32 text-right text-tatum-text-sm text-tatum-gray-500'>
          Medium (Default)
        </div>
        <Button
          {...props}
          size={ButtonSize.Medium}
          leftIcon={<Bell02 size={16} />}
        >
          Medium Button
        </Button>
      </div>
      <div className='flex items-center gap-tatum-2xl'>
        <div className='w-32 text-right text-tatum-text-sm text-tatum-gray-500'>
          MediumLarge
        </div>
        <Button
          {...props}
          size={ButtonSize.MediumLarge}
          leftIcon={<Bell02 size={16} />}
        >
          MediumLarge Button
        </Button>
      </div>
      <div className='flex items-center gap-tatum-2xl'>
        <div className='w-32 text-right text-tatum-text-sm text-tatum-gray-500'>
          Large
        </div>
        <Button
          {...props}
          size={ButtonSize.Large}
          leftIcon={<Bell02 size={16} />}
        >
          Large Button
        </Button>
      </div>
      <div className='flex items-center gap-tatum-2xl'>
        <div className='w-32 text-right text-tatum-text-sm text-tatum-gray-500'>
          ExtraLarge
        </div>
        <Button
          {...props}
          size={ButtonSize.ExtraLarge}
          leftIcon={<Bell02 size={16} />}
        >
          ExtraLarge Button
        </Button>
      </div>
    </div>
  ),
}

/**
 * Custom Button Styles: Examples of buttons with custom styling applied.
 * Includes full width, rounded, custom colors, and gradient background.
 */
export const CustomStyles: Story = {
  render: () => (
    <div className='flex flex-wrap gap-tatum-xl'>
      <Button className='w-full'>Full Width</Button>
      <Button className='rounded-tatum-full'>Rounded Button</Button>
      <Button className='border-tatum-tertiary-600 bg-tatum-tertiary-500 text-tatum-white hover:bg-tatum-tertiary-600'>
        Custom Colors
      </Button>
      <Button className='border-none bg-gradient-to-r from-tatum-primary-500 to-tatum-primary-400 text-tatum-white'>
        Gradient Background
      </Button>
    </div>
  ),
}

/**
 * Busy Button: Buttons can be in a busy state, showing loading indicators.
 */
export const Busy: Story = {
  render: (props) => (
    <div className='flex flex-wrap gap-tatum-xl'>
      <Button
        {...props}
        busy
        leftIcon={<Bell02 size={16} />}
        rightIcon={<Bell02 size={16} />}
      >
        Some button with icons
      </Button>
    </div>
  ),
}

/**
 * Link Button: Buttons can be rendered as links for navigation purposes.
 * Includes an example of a disabled link.
 */
export const Link: Story = {
  render: () => (
    <div className='flex flex-col items-start gap-tatum-3xl'>
      <Button
        variant={ButtonVariant.Outlined}
        as='a'
        target='_blank'
        href='https://docs.tatum.io/'
        rightIcon={<LinkExternal02 size={16} />}
      >
        This is link
      </Button>
      <Button
        disabled
        variant={ButtonVariant.Outlined}
        as='a'
        target='_blank'
        href='https://docs.tatum.io/'
        rightIcon={<LinkExternal02 size={16} />}
      >
        Disabled link
      </Button>
    </div>
  ),
}

/**
 * Icon Button: Buttons can be used as icon buttons for actions.
 * Includes examples for Small, Medium, and Large sizes.
 */
export const iconButton: Story = {
  render: (props) => (
    <div className='flex flex-col items-start gap-tatum-3xl'>
      <div className='flex items-center gap-tatum-2xl'>
        <div className='w-32 text-right text-tatum-text-sm text-tatum-gray-500'>
          Small
        </div>
        <div className='flex flex-wrap gap-tatum-xl'>
          <IconButton {...props} size={ButtonSize.Small}>
            <Bell01 />
          </IconButton>
        </div>
      </div>
      <div className='flex items-center gap-tatum-2xl'>
        <div className='w-32 text-right text-tatum-text-sm text-tatum-gray-500'>
          Medium (Default)
        </div>
        <IconButton {...props} size={ButtonSize.Medium}>
          <Bell01 />
        </IconButton>
      </div>
      <div className='flex items-center gap-tatum-2xl'>
        <div className='w-32 text-right text-tatum-text-sm text-tatum-gray-500'>
          Large
        </div>
        <IconButton {...props} size={ButtonSize.Large}>
          <Bell01 />
        </IconButton>
      </div>
    </div>
  ),
}

/**
 * Copy Button: Buttons can be used for copy actions.
 */
export const copyButton: Story = {
  args: {
    variant: ButtonVariant.Secondary,
    children: 'Copy', // Text for the button
    value: 'copied value', // Value to be copied
  } as ButtonAsButtonProps & { value: string }, // Explicitly cast for CopyButton props
  render: (props) => (
    <div className='flex flex-col items-start gap-tatum-md'>
      <CopyButton {...(props as ButtonAsButtonProps & { value: string })} />
      <CopyButton
        {...(props as ButtonAsButtonProps & { value: string })}
        withText
      />
    </div>
  ),
}

/**
 * Destructive Color: Buttons with destructive/error color palette for destructive actions like delete, remove, etc.
 * Includes all variants with the destructive color.
 */
export const DestructiveColorPalette: Story = {
  render: () => (
    <>
      <Section
        title='Destructive Primary'
        description='Used for primary destructive actions'
      >
        <div className='flex flex-wrap gap-tatum-xl'>
          <Button
            variant={ButtonVariant.Primary}
            colorPalette={ButtonColorPalette.Destructive}
          >
            Delete Account
          </Button>
          <Button
            variant={ButtonVariant.Primary}
            colorPalette={ButtonColorPalette.Destructive}
            leftIcon={<Bell02 size={16} />}
          >
            Remove Item
          </Button>
          <Button
            variant={ButtonVariant.Primary}
            colorPalette={ButtonColorPalette.Destructive}
            focused
          >
            Focused
          </Button>
          <Button
            variant={ButtonVariant.Primary}
            colorPalette={ButtonColorPalette.Destructive}
            disabled
          >
            Disabled
          </Button>
        </div>
      </Section>

      <Section
        title='Destructive Secondary'
        description='Used for secondary destructive actions'
      >
        <div className='flex flex-wrap gap-tatum-xl'>
          <Button
            variant={ButtonVariant.Secondary}
            colorPalette={ButtonColorPalette.Destructive}
          >
            Cancel
          </Button>
          <Button
            variant={ButtonVariant.Secondary}
            colorPalette={ButtonColorPalette.Destructive}
            leftIcon={<Bell02 size={16} />}
          >
            With Icon
          </Button>
          <Button
            variant={ButtonVariant.Secondary}
            colorPalette={ButtonColorPalette.Destructive}
            disabled
          >
            Disabled
          </Button>
        </div>
      </Section>

      <Section
        title='Destructive Accent'
        description='Used for accent destructive actions'
      >
        <div className='flex flex-wrap gap-tatum-xl'>
          <Button
            variant={ButtonVariant.Accent}
            colorPalette={ButtonColorPalette.Destructive}
          >
            Warning Action
          </Button>
          <Button
            variant={ButtonVariant.Accent}
            colorPalette={ButtonColorPalette.Destructive}
            leftIcon={<Bell02 size={16} />}
          >
            With Icon
          </Button>
          <Button
            variant={ButtonVariant.Accent}
            colorPalette={ButtonColorPalette.Destructive}
            disabled
          >
            Disabled
          </Button>
        </div>
      </Section>

      <Section
        title='Destructive Outlined'
        description='Used for outlined destructive actions'
      >
        <div className='flex flex-wrap gap-tatum-xl'>
          <Button
            variant={ButtonVariant.Outlined}
            colorPalette={ButtonColorPalette.Destructive}
          >
            Remove
          </Button>
          <Button
            variant={ButtonVariant.Outlined}
            colorPalette={ButtonColorPalette.Destructive}
            leftIcon={<Bell02 size={16} />}
          >
            With Icon
          </Button>
          <Button
            variant={ButtonVariant.Outlined}
            colorPalette={ButtonColorPalette.Destructive}
            disabled
          >
            Disabled
          </Button>
        </div>
      </Section>

      <Section
        title='Destructive Flat'
        description='Used for flat destructive actions'
      >
        <div className='flex flex-wrap gap-tatum-xl'>
          <Button
            variant={ButtonVariant.Flat}
            colorPalette={ButtonColorPalette.Destructive}
          >
            Delete
          </Button>
          <Button
            variant={ButtonVariant.Flat}
            colorPalette={ButtonColorPalette.Destructive}
            leftIcon={<Bell02 size={16} />}
          >
            With Icon
          </Button>
          <Button
            variant={ButtonVariant.Flat}
            colorPalette={ButtonColorPalette.Destructive}
            disabled
          >
            Disabled
          </Button>
        </div>
      </Section>

      <Section
        title='Destructive Link'
        description='Used for link-style destructive actions'
      >
        <div className='flex flex-wrap gap-tatum-xl'>
          <Button
            variant={ButtonVariant.LinkPrimary}
            colorPalette={ButtonColorPalette.Destructive}
          >
            Delete Link
          </Button>
          <Button
            variant={ButtonVariant.LinkPrimary}
            colorPalette={ButtonColorPalette.Destructive}
            leftIcon={<Bell02 size={16} />}
          >
            With Icon
          </Button>
          <Button
            variant={ButtonVariant.LinkPrimary}
            colorPalette={ButtonColorPalette.Destructive}
            disabled
          >
            Disabled
          </Button>
        </div>
      </Section>
    </>
  ),
}

```

## Badge

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CoinsStacked04 } from '@untitledui-pro/icons/line'

import Badge, { BadgeColor, BadgeSize, BadgeVariant } from './Badge'

/**
 * Badges help highlight important information, such as notifications or new and unread messages.
 * They’re primarily used for communicating secondary or additional information to text.
 */
const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.values(BadgeVariant),
    },
    color: {
      control: { type: 'select' },
      options: Object.values(BadgeColor),
    },
    size: {
      control: { type: 'select' },
      options: Object.values(BadgeSize),
    },
  },
  args: {
    color: BadgeColor.Brand,
    variant: BadgeVariant.Default,
    size: BadgeSize.Medium,
  },
}

export default meta
type Story = StoryObj<typeof Badge>

/**
 * Badge Variants: The standard appearance of the badge component and a badge with a fully rounded, pill-like shape, often used for tags or categories.
 */
export const Variants: Story = {
  render: (props) => (
    <div className='flex gap-tatum-md'>
      <Badge {...props} variant={BadgeVariant.Default}>
        Default Badge
      </Badge>
      <Badge {...props} variant={BadgeVariant.Pill}>
        Pill Variant
      </Badge>
    </div>
  ),
}

/**
 * Badge Sizes: Choose from different badge sizes. The default is Medium. The small variant uses a more compact font and padding.
 */
export const Sizes: Story = {
  render: (props) => (
    <div className='flex items-start gap-tatum-md'>
      <Badge {...props} size={BadgeSize.Small}>
        Small Badge
      </Badge>
      <Badge {...props} size={BadgeSize.Medium}>
        Medium Badge
      </Badge>
      <Badge {...props} size={BadgeSize.Large}>
        Large Badge
      </Badge>
    </div>
  ),
}

/**
 * Badge Colors: Choose from different badge colors to indicate status or category.
 * Gray for neutral content, Brand for primary/branded elements, Success for positive outcomes,
 * Warning for cautionary information, and Error for critical issues or problems.
 */
export const Colors: Story = {
  render: () => (
    <div className='flex flex-wrap gap-tatum-md'>
      <Badge color={BadgeColor.Gray}>Gray</Badge>
      <Badge color={BadgeColor.Brand}>Brand</Badge>
      <Badge color={BadgeColor.Success}>Success</Badge>
      <Badge color={BadgeColor.Warning}>Warning</Badge>
      <Badge color={BadgeColor.Error}>Error</Badge>
      <Badge color={BadgeColor.GrayBlue}>GrayBlue</Badge>
      <Badge color={BadgeColor.BlueLight}>BlueLight</Badge>
      <Badge color={BadgeColor.Blue}>Blue</Badge>
      <Badge color={BadgeColor.Indigo}>Indigo</Badge>
      <Badge color={BadgeColor.Purple}>Purple</Badge>
      <Badge color={BadgeColor.Pink}>Pink</Badge>
      <Badge color={BadgeColor.Orange}>Orange</Badge>
      <Badge className='border-tatum-gray-900 bg-tatum-secondary-600 text-tatum-white'>
        Custom
      </Badge>
    </div>
  ),
}

/**
 * Badge with Icons: Badges can also include icons to provide additional context or visual cues.
 * Examples include icons placed to the left, right, or on both sides of the text.
 */
export const WithIcons: Story = {
  render: (props) => (
    <div className='flex gap-tatum-md'>
      <Badge className='gap-tatum-xs' {...props}>
        <CoinsStacked04 size={16} />
        Left icon
      </Badge>
      <Badge className='gap-tatum-xs' {...props}>
        Right icon
        <CoinsStacked04 size={16} />
      </Badge>
      <Badge className='gap-tatum-xs' {...props}>
        <CoinsStacked04 size={16} />
        Both
        <CoinsStacked04 size={16} />
      </Badge>
    </div>
  ),
}

```

## Autosuggest

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import Autosuggest, {
  AutosuggestProps,
} from '@/components/Autosuggest/Autosuggest'
import {
  dropdownItemsData,
  MyCustomItemData,
} from '@/components/Combobox/Combobox.stories'
import { Hint } from '@/components/Field/Hint'
import { Label } from '@/components/Field/Label'

import Field from '../Field/Field'

/**
 * Autosuggest is an input with a dropdown list that filters options as the user types.
 * It doesn’t select items but helps users quickly fill in a value by suggesting matching entries.
 */
const meta: Meta<typeof Autosuggest<MyCustomItemData>> = {
  title: 'Components/Autosuggest',
  component: Autosuggest,
  argTypes: {
    value: {
      control: { type: 'select' },
      options: dropdownItemsData.map((item) => item.label),
    },
  },
  args: {
    placeholder: 'Select chain',
    items: dropdownItemsData,
    id: 'autosuggest',
  },
}

export default meta
type Story = StoryObj<typeof Autosuggest<MyCustomItemData>>

// This template now receives value and onChange directly as props
const AutoSuggestTemplate = (props: AutosuggestProps<MyCustomItemData>) => {
  const [, updateArgs] = useArgs()

  return (
    <div className='flex w-[320px] flex-col gap-y-tatum-xl'>
      <Field>
        <Label required htmlFor={props.id}>
          Chain
        </Label>
        <Autosuggest
          {...props}
          onChange={(newValue) => {
            updateArgs({ value: newValue })
          }}
        />
        <Hint>This is a hint text to help user.</Hint>
      </Field>
    </div>
  )
}

/**
 * Default configuration: Standard autosuggest component.
 */
export const Default: Story = {
  render: AutoSuggestTemplate,
}

/**
 * Shows the disabled state of the Autosuggest component.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: AutoSuggestTemplate,
}

```

## Alert

```tsx
import { Meta, StoryObj } from '@storybook/react-vite'
import { Announcement01 } from '@untitledui-pro/icons/line'

import Alert, { AlertType } from '@/components/Alert/Alert'
import Button, { ButtonVariant } from '@/components/Button'

/**
 * Alerts are an important method of communicating with important users and providing feedback. Alerts can serve as informational messages, where they provide additional information to users that may not be tied to their current action or task.	They can also be used to provide direct feedback to users and actions.
 */
const meta: Meta<typeof Alert> = {
  component: Alert,
  title: 'Components/Alert',
  argTypes: {
    type: {
      control: { type: 'select' },
      options: Object.values(AlertType),
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

/**
 * Indicates a successful or completed action
 */
export const Success: Story = {
  args: {
    type: AlertType.Success,
    title: 'This is a success alert',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.',
    children: (
      <>
        <Button variant={ButtonVariant.LinkGray}>Dismiss</Button>
        <Button variant={ButtonVariant.LinkPrimary}>View changes</Button>
      </>
    ),
  },
}

/**
 * Alerts users about potential issues that require attention
 */
export const Warning: Story = {
  args: {
    type: AlertType.Warning,
    title: 'This is a warning alert',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.',
    children: (
      <>
        <Button variant={ButtonVariant.LinkGray}>Dismiss</Button>
        <Button variant={ButtonVariant.LinkPrimary}>View changes</Button>
      </>
    ),
  },
}

/**
 * Communicates critical problems that require immediate action
 */
export const Error: Story = {
  args: {
    type: AlertType.Error,
    title: 'This is an error alert',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.',
    children: (
      <>
        <Button variant={ButtonVariant.LinkGray}>Dismiss</Button>
        <Button variant={ButtonVariant.LinkPrimary}>View changes</Button>
      </>
    ),
  },
}

/**
 * Shows basic information to the user
 */
export const Basic: Story = {
  args: {
    type: AlertType.Default,
    icon: <Announcement01 size={20} />,
    title: 'This is an alert',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.',
    children: (
      <>
        <Button variant={ButtonVariant.LinkGray}>Dismiss</Button>
        <Button variant={ButtonVariant.LinkPrimary}>View changes</Button>
      </>
    ),
  },
}

/**
 * Simple alerts can be without description
 */
export const WithoutDescription: Story = {
  ...Success,
  args: {
    ...Success.args,
    description: undefined,
  },
}

/**
 * Alerts can be fully customized
 */
export const Custom: Story = {
  args: {
    type: AlertType.Default,
    title: 'Custom Alert',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum dolor.',
    className: 'border-none bg-tatum-primary-50',
    children: (
      <>
        <Button variant={ButtonVariant.LinkGray}>Dismiss</Button>
        <Button variant={ButtonVariant.LinkPrimary}>View changes</Button>
      </>
    ),
    icon: (
      <div className='flex size-tatum-5xl items-center justify-center rounded-full bg-tatum-primary-100 text-tatum-primary-600'>
        <Announcement01 />
      </div>
    ),
    onClose: undefined,
  },
}

```

## AddressHandle

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'

import AddressHandle from './AddressHandle'

/**
 * Shows a shortened or full version of a crypto address with a copy button.
 */
const meta: Meta<typeof AddressHandle> = {
  title: 'Components/AddressHandle',
  component: AddressHandle,
  argTypes: {
    address: {
      control: 'text',
      description: 'The crypto address to display',
    },
  },
  args: {
    address: '0x1234567890abcdef1234567890abcdef123445ab',
    showFull: false,
    showKeyIcon: false,
  },
}

export default meta
type Story = StoryObj<typeof AddressHandle>

/**
 * Default configuration
 * */
export const Default: Story = {}

/**
 * Shows the full address when showFull is true
 * */
export const fullAddress: Story = {
  args: {
    showFull: true,
  },
}

/**
 * Shows the address with a key icon
 * */
export const withIcon: Story = {
  args: {
    showKeyIcon: true,
  },
}

```
