/**
 * Smooth-scroll to an element by id, or to the top when id is empty.
 */
export function scrollToHashId(id: string) {
  if (!id) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
