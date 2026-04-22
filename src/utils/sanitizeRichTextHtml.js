import DOMPurify from "dompurify";

// Keep in sync with TipTap extensions in src/components/RichText/RichTextInput.jsx
// (StarterKit + Link).
const RICH_TEXT_SANITIZE = {
  ALLOWED_TAGS: [
    "a",
    "b",
    "blockquote",
    "br",
    "code",
    "dd",
    "dl",
    "dt",
    "em",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "i",
    "li",
    "ol",
    "p",
    "pre",
    "s",
    "strike",
    "strong",
    "ul",
  ],
  // Avoid event handlers, inline styles, and unknown attributes.
  ALLOWED_ATTR: ["href", "target", "rel"],
  ALLOWED_URI_REGEXP:
    /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
};

DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  if (node.nodeName === "A" && node.getAttribute) {
    const target = node.getAttribute("target");
    if (target === "_blank") {
      const rel = node.getAttribute("rel") || "";
      if (!rel.includes("noopener")) {
        node.setAttribute("rel", `${rel} noopener noreferrer`.trim());
      }
    } else {
      const href = node.getAttribute("href");
      if (href && /^https?:/i.test(href)) {
        const rel = node.getAttribute("rel") || "";
        if (!rel.includes("noopener") && !rel.includes("noreferrer")) {
          node.setAttribute("rel", `${rel} noopener noreferrer`.trim());
        }
      }
    }
  }
});

/**
 * Returns true when HTML has no visible text (matches TipTap empty-doc patterns).
 * @param {string} html
 * @returns {boolean}
 */
export function isEffectivelyEmptyRichText(html) {
  if (html == null || html === "") {
    return true;
  }
  return html.replace(/<[^>]*>/g, "").trim() === "";
}

/**
 * @param {string} dirty
 * @returns {string} Sanitized HTML safe for use with read-only RichTextView or innerHTML
 */
export function sanitizeRichTextHtml(dirty) {
  if (dirty == null || typeof dirty !== "string") {
    return "";
  }
  return DOMPurify.sanitize(dirty, RICH_TEXT_SANITIZE);
}

export { RICH_TEXT_SANITIZE };
