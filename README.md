# Phone Catalog Frontend

A modern, responsive e-commerce frontend application for browsing and purchasing phones, tablets, and accessories.

## Deployed Version

[Live Preview](https://devs-team-5.github.io/phone-catalog-frontend/)

## Features

- **Product Catalog:** Browse through different categories (Phones, Tablets, Accessories) with pagination, sorting, and filtering options.
- **Product Details:** View comprehensive details, image galleries, and technical specifications for each product.
- **Shopping Cart & Checkout:** Add items to the cart, manage quantities, and securely checkout using **Stripe**.
- **Favorites:** Save favorite items for quick access.
- **Authentication & Database:** Powered by **Supabase** for backend services, database management, and user authentication.
- **Delivery Integration:** Integrated with the **Nova Post API** for seamless delivery selection (`Nova Poshta`).
- **Internationalization:** Multi-language support implemented with `i18next`.
- **Responsive UI:** Fully responsive and accessible layout built with **Tailwind CSS** and **Radix UI** primitives.

## Tech Stack

- **Framework:** React 19, Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, Radix UI, SCSS
- **State Management:** Zustand, React Context
- **Routing:** React Router v7
- **Backend/DB/Auth:** Supabase (`@supabase/supabase-js`)
- **Payments:** Stripe (`@stripe/react-stripe-js`, `@stripe/stripe-js`)
- **i18n:** `i18next`, `react-i18next`
- **Code Quality:** ESLint, Prettier, Husky, lint-staged

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (or yarn)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/devs-team-5/phone-catalog-frontend.git
   cd phone-catalog-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the necessary configuration keys for Supabase, Stripe, and the Nova Post API, as referenced in the project.

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Starts the local development server using Vite.
- `npm run build`: Compiles TypeScript and builds the app for production.
- `npm run preview`: Bootstraps a local static web server that serves the files of the production build.
- `npm run lint`: Runs ESLint to check for code issues.
- `npm run format`: Formats code using Prettier.
- `npm run fix-style`: Formats code and fixes linting issues simultaneously.
