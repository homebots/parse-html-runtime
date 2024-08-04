import type { ParserNode, ParserAttribute, CommentNode, TextNode, ElementNode } from '@homebots/parse-html';

const validAttribute = /^[a-z][a-z0-9-]+$/;
const noop = () => {};

export type Visitor = <T>(el: T, node: ParserNode) => T | null | undefined | void;

export function materialize(node: ParserNode, visitor: Visitor = noop) {
  let el: any;

  switch (node.type) {
    case 'document': {
      el = document.createDocumentFragment();
      el.append(...node.children.map((n) => materialize(n, visitor)));
      break;
    }

    case 'text':
      el = createTextNode(node);
      break;

    case 'comment':
      el = createComment(node);
      break;

    case 'element': {
      el = createElement(node);
      el.append(...node.children.map((n) => materialize(n, visitor)));
      break;
    }

    default:
      throw new Error(`Invalid node type: ${(node as any).type}`);
  }

  return visitor(el, node) || el;
}

export function createComment(node: CommentNode) {
  return document.createComment(node.text);
}

export function createTextNode(node: TextNode) {
  return document.createTextNode(node.text);
}

export function createElement(node: ElementNode) {
  const el = document.createElement(node.tag);
  el['@attributes'] = node.attributes;
  el['@node'] = node;

  node.attributes.forEach((a: ParserAttribute) => setAttribute(el, a.name, a.value));

  return el;
}

export function setAttribute(el: HTMLElement, attribute: string, value: string | number | boolean) {
  if (!validAttribute.test(attribute)) {
    return;
  }

  if (typeof value === 'boolean' && value === false) {
    el.removeAttribute(attribute);
    return;
  }

  el.setAttribute(attribute, String(value));
}

export function setProperty(el: HTMLElement, property: string, value: any) {
  el[property] = value;
}
