# @appolabs/ui

React UI component library for Appo Labs, built with Radix UI primitives and Tailwind CSS. Features glassmorphism design system with full light/dark mode support.

## Installation

```bash
npm install @appolabs/ui
# or
yarn add @appolabs/ui
# or
pnpm add @appolabs/ui
```

## Setup

### 1. Import CSS Variables

Import the CSS variables in your main stylesheet before Tailwind directives:

```css
/* app.css or globals.css */
@import '@appolabs/ui/styles/variables.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 2. Configure Tailwind CSS

Use the `@appolabs/ui` preset for full theme support including glass utilities:

```js
// tailwind.config.js
import { appolabsUIPreset } from '@appolabs/ui/tailwind';

export default {
  presets: [appolabsUIPreset],
  content: [
    // ... your content paths
    './node_modules/@appolabs/ui/dist/**/*.{js,cjs}',
  ],
  // ... rest of your config
};
```

The preset includes:
- Color system (primary, secondary, muted, accent, destructive)
- Glass colors and utilities (`bg-glass`, `backdrop-blur-glass`, `shadow-glass`)
- Appo brand colors
- Animations (accordion, fade, scale, shimmer, glow-pulse)
- Border radius tokens

### 3. Add Toaster Component

Add the `<Toaster />` component at the root of your app for toast notifications:

```tsx
// app.tsx or layout.tsx
import { Toaster } from '@appolabs/ui';

function App({ children }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
```

## Usage

### Basic Components

```tsx
import { Button, Input, Card } from '@appolabs/ui';

function MyForm() {
  return (
    <Card>
      <Input placeholder="Enter your email" />
      <Button>Submit</Button>
    </Card>
  );
}
```

### Glass Components

Glass components provide a frosted glass aesthetic with backdrop blur:

```tsx
import { GlassCard, Input } from '@appolabs/ui';

function AuthForm() {
  return (
    <GlassCard variant="auth" padding="lg">
      <Input variant="glass" placeholder="Email" />
      <Input variant="glass" type="password" placeholder="Password" />
      <Button>Sign In</Button>
    </GlassCard>
  );
}
```

### Toast Notifications

```tsx
import { useToast } from '@appolabs/ui';

function MyComponent() {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: 'Success',
      description: 'Operation completed',
      variant: 'default', // or 'destructive'
    });
  };

  return <Button onClick={handleClick}>Submit</Button>;
}
```

## Components

### Core Components
- Accordion
- Alert Dialog
- Avatar
- Button
- Card
- Checkbox
- Dialog
- Dropdown Menu
- Form (with react-hook-form integration)
- Input (with `glass` variant)
- Label
- Popover
- Progress
- Radio Group
- Select
- Separator (with `glass` variant)
- Slider
- Switch
- Tabs
- Textarea
- Toast / Toaster
- Tooltip

### Glass Components
- GlassCard - Translucent card with backdrop blur
- Input `variant="glass"` - Glass-styled input field
- Separator `variant="glass"` - Glass-styled separator

## Theme Customization

The library uses CSS variables for theming. Override them in your CSS:

```css
:root {
  --primary: 230 100% 77%;
  --primary-foreground: 230 30% 15%;
  /* ... other variables */
}

.dark {
  --primary: 230 100% 77%;
  --primary-foreground: 230 30% 10%;
  /* ... dark mode variables */
}
```

See `@appolabs/ui/styles/variables.css` for all available variables.

## License

MIT
