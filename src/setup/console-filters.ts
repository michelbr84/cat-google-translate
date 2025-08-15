// Development-only console noise filters for known browser extension warnings
// This does NOT affect production builds
if (import.meta && (import.meta as any).env && (import.meta as any).env.DEV) {
  const originalError = console.error.bind(console);
  const originalWarn = console.warn.bind(console);

  const blockedPatterns: RegExp[] = [
    /chrome-extension:\/\//i,
    /Unchecked runtime\.lastError/i,
    /message port closed/i,
  ];

  const shouldBlock = (args: unknown[]) => {
    try {
      const text = args.map((a) => String(a)).join(' ');
      return blockedPatterns.some((r) => r.test(text));
    } catch {
      return false;
    }
  };

  console.error = (...args: unknown[]) => {
    if (shouldBlock(args)) return;
    originalError(...args);
  };

  console.warn = (...args: unknown[]) => {
    if (shouldBlock(args)) return;
    originalWarn(...args);
  };
}


