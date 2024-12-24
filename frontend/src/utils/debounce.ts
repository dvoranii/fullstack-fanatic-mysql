export function debounce<T extends unknown[], R>(
  func: (...args: T) => R,
  delay: number
): ((...args: T) => void) & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debouncedFunction = (...args: T): void => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => func(...args), delay);
  };

  debouncedFunction.cancel = (): void => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debouncedFunction as ((...args: T) => void) & { cancel: () => void };
}
