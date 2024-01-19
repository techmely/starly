/**
 * Given a slot, this function iterates over all of its assigned element and text nodes and returns the concatenated
 * HTML as a string. This is useful because we can't use slot.innerHTML as an alternative.
 */
export function getInnerHTML(slot: HTMLSlotElement): string {
  const nodes = slot.assignedNodes({ flatten: true });
  let html = "";

  for (const node of nodes) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      html += (node as HTMLElement).outerHTML;
    }

    if (node.nodeType === Node.TEXT_NODE) {
      html += node.textContent;
    }
  }

  return html;
}

/**
 * Given a slot, this function iterates over all of its assigned text nodes and returns the concatenated text as a
 * string. This is useful because we can't use slot.textContent as an alternative.
 */
export function getTextContent(slot: HTMLSlotElement | undefined | null): string {
  if (!slot) {
    return "";
  }
  const nodes = slot.assignedNodes({ flatten: true });
  let text = "";

  for (const node of nodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent;
    }
  }

  return text;
}
