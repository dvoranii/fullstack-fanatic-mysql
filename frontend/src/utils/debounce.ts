export function debounce<T extends (arg: string) => void>(
  func: T,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout>;

  return (arg: string): void => {
    clearTimeout(timer);
    timer = setTimeout(() => func(arg), delay);
  };
}
