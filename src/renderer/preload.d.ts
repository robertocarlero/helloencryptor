declare global {
  interface Window {
    electron: {
      storage: {
        setItem(path: string, content: string): void;
        getItem(path: string): string;
        removeItem(path: string): void;
        clear(): void;
      };
    };
  }
}

export {};
