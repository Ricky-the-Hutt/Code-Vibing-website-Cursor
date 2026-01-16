import React, { useEffect, useRef } from 'react';

interface CommentsProps {
  repo: string; // Format: "username/repo"
  repoId: string; // Repository ID from Giscus
  category: string; // Category ID from Giscus
  categoryId: string; // Category ID from Giscus
}

export default function Comments({ repo, repoId, category, categoryId }: CommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!commentsRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', 'en');
    script.crossOrigin = 'anonymous';
    script.async = true;

    commentsRef.current.appendChild(script);

    return () => {
      if (commentsRef.current && commentsRef.current.contains(script)) {
        commentsRef.current.removeChild(script);
      }
    };
  }, [repo, repoId, category, categoryId]);

  return <div ref={commentsRef} className="mt-8" />;
}
