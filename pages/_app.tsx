import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Layout from '@/components/Layout';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { ThemeProvider } from 'next-themes';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ThemeProvider attribute="class">
      <Layout>
        <GoogleAnalytics />
        <SpeedInsights />
        <Component {...pageProps} key={router.asPath} />
      </Layout>
    </ThemeProvider>
  );
}
