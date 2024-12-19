import React, { useState, useRef, useEffect, Suspense } from "react";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

interface LazyLoadProps<P = object> {
  importFunc: () => Promise<{ default: React.ComponentType<P> }>;
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number | number[];
  className?: string;
  componentProps?: P;
}

const LazySection: React.FC<LazyLoadProps> = ({
  importFunc,
  fallback = <LoadingSpinner />,
  rootMargin = "100px",
  threshold = 0.1,
  className,
  componentProps = {},
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const LazyComponent = React.lazy(importFunc);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  return (
    <div ref={ref} className={className}>
      {isVisible && (
        <ErrorBoundary fallback={<div>Failed to load component.</div>}>
          <Suspense fallback={fallback}>
            <LazyComponent {...componentProps} />
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  );
};

export default LazySection;
