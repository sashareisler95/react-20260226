import { PropsWithChildren } from 'react';
import ScrollProgressBar from './ScrollProgressBar';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main>
      <ScrollProgressBar/>
      <header>header</header>
      {children}
      <footer>footer</footer>
    </main>
  );
};