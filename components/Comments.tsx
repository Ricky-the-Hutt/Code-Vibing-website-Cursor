import React from 'react';
import { ReactCusdis } from 'react-cusdis';
import { useTheme } from 'next-themes';

interface CommentsProps {
  appId: string;
  host?: string;
  pageId: string;
  pageTitle: string;
  pageUrl: string;
}

export default function Comments({ appId, host = 'https://cusdis.com', pageId, pageTitle, pageUrl }: CommentsProps) {
  const { theme, systemTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const cusdisTheme = currentTheme === 'dark' ? 'dark' : 'light';

  return (
    <div className="mt-8">
      <ReactCusdis
        attrs={{
          host,
          appId,
          pageId,
          pageTitle,
          pageUrl,
          theme: cusdisTheme,
        }}
      />
    </div>
  );
}
