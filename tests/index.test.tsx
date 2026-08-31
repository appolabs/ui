import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  cn,
  Button,
  Input,
  Label,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Checkbox,
  Separator,
  Skeleton,
  CookieBanner,
} from '../src/index';

describe('@appolabs/ui', () => {
  describe('cn utility', () => {
    it('merges class names', () => {
      const result = cn('foo', 'bar');
      expect(result).toBe('foo bar');
    });

    it('handles conditional classes', () => {
      const result = cn('base', false && 'hidden', true && 'visible');
      expect(result).toBe('base visible');
    });

    it('merges tailwind classes correctly', () => {
      const result = cn('px-2 py-1', 'px-4');
      expect(result).toBe('py-1 px-4');
    });
  });

  describe('Button', () => {
    it('renders with children', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('Click me');
    });

    it('renders with variant', () => {
      render(<Button variant="destructive">Delete</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders as disabled', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('Input', () => {
    it('renders with placeholder', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders with type', () => {
      render(<Input type="email" placeholder="Email" />);
      expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email');
    });
  });

  describe('Label', () => {
    it('renders with text', () => {
      render(<Label>Username</Label>);
      expect(screen.getByText('Username')).toBeInTheDocument();
    });
  });

  describe('Badge', () => {
    it('renders with text', () => {
      render(<Badge>New</Badge>);
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('renders with variant', () => {
      render(<Badge variant="secondary">Secondary</Badge>);
      expect(screen.getByText('Secondary')).toBeInTheDocument();
    });
  });

  describe('Card', () => {
    it('renders card with content', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardContent>Content</CardContent>
        </Card>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Checkbox', () => {
    it('renders checkbox', () => {
      render(<Checkbox aria-label="Accept terms" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });
  });

  describe('Separator', () => {
    it('renders separator', () => {
      render(<Separator data-testid="separator" />);
      expect(screen.getByTestId('separator')).toBeInTheDocument();
    });
  });

  describe('Skeleton', () => {
    it('renders skeleton', () => {
      render(<Skeleton data-testid="skeleton" className="h-4 w-20" />);
      expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    });
  });

  describe('CookieBanner', () => {
    const handlers = {
      onAccept: () => {},
      onReject: () => {},
      onManage: () => {},
    };

    it('falls back to the Italian defaults when no labels are given', () => {
      render(<CookieBanner visible cookiePolicyUrl="https://example.test/cookie" {...handlers} />);
      expect(screen.getByRole('button', { name: 'Accetta tutto' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Rifiuta' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Gestisci' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Cookie policy' })).toBeInTheDocument();
    });

    it('renders the labels it is given', () => {
      render(
        <CookieBanner
          visible
          cookiePolicyUrl="https://example.test/cookie"
          labels={{
            message: 'We use cookies to improve your experience.',
            policyLink: 'Cookie policy',
            manage: 'Manage',
            reject: 'Reject',
            accept: 'Accept all',
          }}
          {...handlers}
        />
      );
      expect(screen.getByText('We use cookies to improve your experience.')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Accept all' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Reject' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Manage' })).toBeInTheDocument();
    });

    it('merges a partial label set over the defaults', () => {
      render(
        <CookieBanner
          visible
          cookiePolicyUrl="https://example.test/cookie"
          labels={{ accept: 'Accept all' }}
          {...handlers}
        />
      );
      expect(screen.getByRole('button', { name: 'Accept all' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Rifiuta' })).toBeInTheDocument();
    });
  });
});
