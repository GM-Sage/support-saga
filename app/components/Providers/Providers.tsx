// components/Providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from 'react-redux';
import store from '../store'; // Adjust the path as necessary

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <SessionProvider>
        {children}
      </SessionProvider>
    </Provider>
  );
}