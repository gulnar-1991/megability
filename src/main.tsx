import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import PricingPage from './PricingPage.tsx';
import DemoPage from './DemoPage.tsx';
import Loader from './components/Loader';
import {usePathname} from './router';
import './index.css';

function Root() {
  const path = usePathname();
  const page = path === '/pricing'
    ? <PricingPage />
    : path === '/demo'
      ? <DemoPage />
      : <App />;
  return (
    <>
      <Loader />
      {page}
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
