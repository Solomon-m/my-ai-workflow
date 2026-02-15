---
description: "React 19+ development patterns including functional components, hooks, Server Components, performance optimization, accessibility, and modern frontend best practices with TypeScript."
applyTo: "**/*.jsx, **/*.tsx"
---

# React Development Standards

## Component Structure

### Functional Components with TypeScript

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({ children, variant = 'primary', onClick, disabled }: ButtonProps) => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};
```

## Hooks Best Practices

### Custom Hooks

```typescript
function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchUser = async () => {
      try {
        const data = await api.getUser(userId);
        if (!cancelled) {
          setUser(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  return { user, loading, error };
}
```

## State Management

### Use useState for Local State

```typescript
const [count, setCount] = useState(0);
const [user, setUser] = useState<User | null>(null);
```

### Use Context for Global State

```typescript
const ThemeContext = createContext<
  | {
      theme: "light" | "dark";
      toggleTheme: () => void;
    }
  | undefined
>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
```

## Performance

### Memoization

```typescript
// Memo for expensive computations
const sortedItems = useMemo(
  () => items.sort((a, b) => a.name.localeCompare(b.name)),
  [items],
);

// Callback for stable references
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);

// Memo components
const MemoizedChild = memo(Child);
```

## Accessibility

### Semantic HTML and ARIA

```typescript
<button aria-label="Close dialog" onClick={onClose}>
  <X />
</button>

<div role="alert" aria-live="polite">
  {errorMessage}
</div>

<form onSubmit={handleSubmit}>
  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="email"
    aria-required="true"
    aria-invalid={!!errors.email}
  />
</form>
```

## File Naming

- **Components**: PascalCase (Button.tsx, UserProfile.tsx)
- **Hooks**: camelCase with "use" prefix (useAuth.ts, useDebounce.ts)
- **Utils**: camelCase (formatDate.ts)
- **Types**: PascalCase (User.types.ts)
