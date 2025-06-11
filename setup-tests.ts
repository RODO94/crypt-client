import "@testing-library/jest-dom/vitest";
import { token } from "./src/store/__tests__/userMocks";
import { vi } from "vitest";

// Mock sessionStorage for all tests
Object.defineProperty(global, "sessionStorage", {
  value: {
    getItem: vi.fn((key) => {
      // Return the mock token for the 'token' key, null for everything else
      if (key === "token") {
        return token;
      }
      return null;
    }),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    length: 0,
    key: vi.fn(),
  },
  writable: true,
});
