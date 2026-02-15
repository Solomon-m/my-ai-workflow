---
description: "Generate a React component with TypeScript, hooks, tests, and Storybook story following best practices."
temperature: 0.5
---

# Create React Component

Generate a production-ready React component with tests and documentation.

## What You'll Create

1. **Component** - TypeScript functional component
2. **Types** - Props interface
3. **Styles** - CSS Module or Styled Components
4. **Tests** - React Testing Library tests
5. **Storybook** - Component story (if Storybook is configured)

## Usage

```
@workspace /create-react-component <ComponentName> <type>
```

**Component Types:**

- `simple` - Presentational component
- `form` - Form with validation
- `modal` - Modal dialog
- `list` - Data list with pagination
- `card` - Card component

## Example

```
@workspace /create-react-component UserCard card
```

## File Structure

```
src/components/UserCard/
├── UserCard.tsx
├── UserCard.module.css
├── UserCard.test.tsx
├── UserCard.stories.tsx
└── index.ts
```

## Component Template

```typescript
import { FC } from 'react';
import styles from './UserCard.module.css';

export interface UserCardProps {
  /** User's display name */
  name: string;
  /** User's email address */
  email: string;
  /** Optional avatar URL */
  avatarUrl?: string;
  /** Click handler */
  onClick?: () => void;
}

export const UserCard: FC<UserCardProps> = ({
  name,
  email,
  avatarUrl,
  onClick,
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
      {avatarUrl && (
        <img src={avatarUrl} alt={name} className={styles.avatar} />
      )}
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.email}>{email}</p>
      </div>
    </div>
  );
};
```

## Test Template

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { UserCard } from './UserCard';

describe('UserCard', () => {
  it('renders user information', () => {
    render(<UserCard name="John" email="john@example.com" />);

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<UserCard name="John" email="john@example.com" onClick={onClick} />);

    fireEvent.click(screen.getByText('John'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

## Best Practices Applied

- ✅ TypeScript with JSDoc props
- ✅ CSS Modules for scoped styles
- ✅ Accessible markup
- ✅ Comprehensive tests
- ✅ Named exports
- ✅ Barrel export (index.ts)
