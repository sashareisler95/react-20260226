import React from 'react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <header>header</header>
      {children}
      <footer>footer</footer>
    </main>
  );
};