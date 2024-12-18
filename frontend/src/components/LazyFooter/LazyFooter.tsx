import React, { useState, useRef, useEffect, Suspense } from "react";

const LazyFooter = React.lazy(() => import("../../components/Footer/Footer"));

const LazyFooterWrapper: React.FC = () => {
  const [shouldLoadFooter, setShouldLoadFooter] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadFooter(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {!shouldLoadFooter && (
        // The sentinel is tiny and invisible
        <div ref={sentinelRef} style={{ height: "1px", opacity: 0 }}></div>
      )}
      {shouldLoadFooter && (
        <Suspense fallback={<div>Loading footer...</div>}>
          <LazyFooter />
        </Suspense>
      )}
    </>
  );
};

export default LazyFooterWrapper;
