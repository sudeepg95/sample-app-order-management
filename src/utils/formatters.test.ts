import { describe, it, expect } from "vitest";
import { formatBinLocation } from "./formatters";
import { Location } from "../types";

describe("formatBinLocation", () => {
  it("formats a standard location correctly", () => {
    const location: Location = { zone: "A", aisle: 3, shelf: "B", bin: 12 };
    expect(formatBinLocation(location)).toBe("Z:A A:3 S:B B:12");
  });

  it("handles single-digit aisle and bin values", () => {
    const location: Location = { zone: "Z", aisle: 1, shelf: "A", bin: 1 };
    expect(formatBinLocation(location)).toBe("Z:Z A:1 S:A B:1");
  });

  it("handles multi-character zone strings", () => {
    const location: Location = { zone: "XY", aisle: 10, shelf: "C", bin: 99 };
    expect(formatBinLocation(location)).toBe("Z:XY A:10 S:C B:99");
  });

  it("preserves zone case as-is", () => {
    const location: Location = { zone: "a", aisle: 2, shelf: "b", bin: 5 };
    expect(formatBinLocation(location)).toBe("Z:a A:2 S:b B:5");
  });
});
