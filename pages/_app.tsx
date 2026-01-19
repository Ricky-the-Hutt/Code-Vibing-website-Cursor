import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Layout from '@/components/Layout';
import CountlyAnalytics from '@/components/CountlyAnalytics';
import CookieConsentBanner from '@/components/CookieConsent';
import { ThemeProvider } from 'next-themes';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ThemeProvider attribute="class">
      <Layout>
        <CountlyAnalytics />
        <SpeedInsights />
        <Component {...pageProps} key={router.asPath} />
        <CookieConsentBanner />
      </Layout>
    </ThemeProvider>
  );
}
