import React, { PropsWithChildren } from 'react';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main>
      <header>header</header>
      {children}
      <footer>footer</footer>
    </main>
  );
};