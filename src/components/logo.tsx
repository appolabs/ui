export interface LogoProps {
  /** Logo size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Additional CSS classes */
  className?: string;
  /** Custom logo source (URL or data URI) */
  src?: string;
  /** Alt text for accessibility */
  alt?: string;
}

const sizes = {
  sm: { height: 24 },
  md: { height: 32 },
  lg: { height: 40 },
  xl: { height: 48 },
};

export function Logo({ size = 'md', className = '', src, alt = 'Logo' }: LogoProps) {
  const height = sizes[size].height;

  if (!src) {
    // Default placeholder - users should provide their own logo
    return (
      <div
        className={`flex items-center justify-center rounded bg-muted text-muted-foreground ${className}`}
        style={{ height: `${height}px`, width: `${height * 3}px` }}
      >
        <span className="text-xs font-medium">Logo</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={src}
        alt={alt}
        style={{ height: `${height}px` }}
        className="max-w-none"
      />
    </div>
  );
}
