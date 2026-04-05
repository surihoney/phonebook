import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

globalThis.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve([]),
  })
);
