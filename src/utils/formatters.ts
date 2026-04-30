import { Location } from "../types";

/**
 * Formats a location object into a standard bin location string.
 * Format: Z:{zone} A:{aisle} S:{shelf} B:{bin}
 */
export const formatBinLocation = (location: Location): string => {
  return `Z:${location.zone} A:${location.aisle} S:${location.shelf} B:${location.bin}`;
};
