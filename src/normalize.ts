import type { DocumentNode, ElementNode, ParserNode } from '@homebots/parse-html';

export function normalize<T extends ParserNode>(node: T) {
  if ('children' in node) {
    node.children = node.children.filter((child) => {
      if (child.type === 'text' && child.text.trim() === '') {
        return false;
      }

      normalize(child as ElementNode | DocumentNode);
      return true;
    });
  }

  return node;
}
