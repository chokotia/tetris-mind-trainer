interface BootstrapModal {
  show: () => void;
  hide: () => void;
}

interface BootstrapModalConstructor {
  new (element: HTMLElement, options?: unknown): BootstrapModal;
  getInstance(element: HTMLElement): BootstrapModal | null;
}

declare global {
  interface Window {
    bootstrap?: {
      Modal: BootstrapModalConstructor;
    };
  }
}

export type { BootstrapModal, BootstrapModalConstructor };
