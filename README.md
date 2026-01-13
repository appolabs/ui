# @appolabs/ui

React UI component library for Appo Labs, built with Radix UI primitives and Tailwind CSS.

## Installation

```bash
npm install @appolabs/ui
# or
yarn add @appolabs/ui
# or
pnpm add @appolabs/ui
```

## Setup

### 1. Configure Tailwind CSS

Add `@appolabs/ui` to your Tailwind CSS content configuration to enable class scanning for animations and component styles:

```js
// tailwind.config.js
export default {
  content: [
    // ... your other content paths
    './node_modules/@appolabs/ui/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [
    require('tailwindcss-animate'),
    // ... your other plugins
  ],
};
```

### 2. Import Global Styles (optional)

If you want to use the default theme variables:

```js
import '@appolabs/ui/styles/globals.css';
```

Or just the CSS variables:

```js
import '@appolabs/ui/styles/variables.css';
```

## Usage

```tsx
import { Button, Toast, Toaster, useToast } from '@appolabs/ui';

function App() {
  const { toast } = useToast();

  return (
    <>
      <Button onClick={() => toast({ title: 'Hello!' })}>
        Show Toast
      </Button>
      <Toaster />
    </>
  );
}
```

### Toast Notifications

The toast system requires a single `<Toaster />` component at the root of your app:

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

Then use the `useToast` hook anywhere in your app:

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

  return <button onClick={handleClick}>Submit</button>;
}
```

## Components

This library includes components based on shadcn/ui patterns:

- Accordion
- Alert Dialog
- Avatar
- Button
- Card
- Checkbox
- Dialog
- Dropdown Menu
- Form
- Input
- Label
- Popover
- Progress
- Radio Group
- Select
- Separator
- Slider
- Switch
- Tabs
- Textarea
- Toast
- Tooltip
- And more...

## License

MIT
