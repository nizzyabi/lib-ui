# Lib UI (Alpha)

> ⚠️ **Note:** This project is currently in active development. APIs and features may change.

Lib UI is an innovative fullstack component library for Next.js that adds both UI components and their corresponding backend logic directly into your project. Unlike traditional component libraries, Lib UI uses a CLI to add production-ready, fullstack features directly into your codebase - giving you complete control over both the UI and logic. Our goal with this project is to give developers control over what they build and speed up development process by not worrying about the setup process but get straight to building.

## How It Works

When you add a Lib UI feature, our CLI:
1. Adds the UI components to your `/components` directory
2. Installs the necessary backend logic in your project structure
3. Sets up any required configurations
4. Gives you full ownership of the code

```bash
# Add authentication to your project
npx lib-ui add auth

# This will:
# ✓ Add auth UI components to /components/auth
# ✓ Set up NextAuth.js configuration
# ✓ Add API routes for authentication
# ✓ Create necessary database schemas
# ✓ Add type definitions
```

## Installation

```bash
npm install lib-ui-cli -D
# or
yarn add lib-ui-cli -D
# or
pnpm add lib-ui-cli -D
```

## Usage

### Adding Authentication

```bash
npx lib-ui add auth

# This creates:
# /components/auth/
#   ├── sign-in-form.tsx
#   ├── sign-up-form.tsx
#   ├── auth-provider.tsx
#   └── ...
# 
# /app/api/auth/
#   ├── [...nextauth]/route.ts
#   └── ...
#
# /lib/auth/
#   ├── config.ts
#   └── utils.ts
```

Then use it in your code:

```tsx
import { SignInForm } from '@/components/auth/sign-in-form'

export default function LoginPage() {
  return <SignInForm />
}
```

### Adding Payments

```bash
npx lib-ui add payments

# This creates:
# /components/payments/
#   ├── payment-form.tsx
#   ├── pricing-table.tsx
#   └── ...
#
# /app/api/payments/
#   ├── webhook/route.ts
#   ├── create-checkout/route.ts
#   └── ...
#
# /lib/payments/
#   ├── stripe.ts
#   └── utils.ts
```

## Planned Features

Each feature can be added individually through our CLI:

- 🔒 `npx lib-ui add auth` - Authentication with NextAuth.js
- 💳 `npx lib-ui add payments` - Stripe payments integration
- 📝 `npx lib-ui add forms` - Form components with validation
- 📊 `npx lib-ui add dashboard` - Admin dashboard components
- 📧 `npx lib-ui add email` - Email templates and sending logic
- 🔍 `npx lib-ui add search` - Search functionality with various backends

## Benefits

- 🎨 **Own Your UI** - All components are added to your codebase
- ⚡ **Full Control** - Modify any part of the code to suit your needs
- 🔧 **No Lock-in** - Once installed, components don't depend on Lib UI
- 📦 **Type Safe** - Full TypeScript support
- 🚀 **Best Practices** - Following latest Next.js patterns

## Development Roadmap

1. **Q1 2024**
   - CLI development
   - Auth component generation
   - Basic documentation
   
2. **Q2 2024**
   - Payment components
   - Email integration
   - Interactive component customization
   
3. **Q3 2024**
   - Additional modules
   - Beta release

## Contributing

We're building this in public and welcome contributions! While we're still setting up our contribution guidelines, feel free to:
- Star the repo to show your interest
- Open issues for feature requests or bugs
- Submit PRs for improvements
- Join our discussions

## Stay Updated

- Follow us on Twitter [@LibUI](https://twitter.com/libui)
- Join our Discord community (coming soon)
- Star this repository for updates

## License

MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">Built with ❤️ for the Next.js community</p>
