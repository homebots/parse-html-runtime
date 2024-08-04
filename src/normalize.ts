import type { CommentNode, DocumentNode, ElementNode, TextNode } from "@homebots/parse-html";

export function normalize(node: ElementNode | DocumentNode | CommentNode | TextNode) {
  if ('children' in node === false) {
    return node;
  }

  node.children = node.children.filter((child) => {
    if (child.type === "text" && child.text.trim() === "") {
      return false;
    }

    normalize(child);
    return true;
  });

  return node;
}
