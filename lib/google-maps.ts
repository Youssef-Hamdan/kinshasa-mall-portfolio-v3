/** Google Maps iframe `src` from coordinates (no API key). */
export function googleMapsEmbedSrc(lat: number, lng: number, zoom = 14): string {
  const q = encodeURIComponent(`${lat},${lng}`);
  return `https://www.google.com/maps?q=${q}&z=${zoom}&output=embed&hl=en`;
}
