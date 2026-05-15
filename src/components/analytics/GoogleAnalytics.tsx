"use client";

import Script from "next/script";
import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  gaId: string;
};

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams?.toString() ?? "";
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;
    if (typeof window === "undefined" || !window.gtag) return;

    const url = pathname + (search ? `?${search}` : "");

    if (previousPath.current === null) {
      previousPath.current = url;
      return;
    }
    if (previousPath.current === url) return;
    previousPath.current = url;

    window.gtag("event", "page_view", {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, search]);

  return null;
}

export function GoogleAnalytics({ gaId }: Props) {
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${JSON.stringify(gaId)});
        `}
      </Script>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}
