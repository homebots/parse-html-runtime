import type { ParserNode, ParserAttribute, CommentNode, TextNode, ElementNode } from '@homebots/parse-html';

const validAttribute = /^[a-zA-Z_][a-zA-Z0-9\-_:.]*$/;

export type Visitor = <T>(el: T, node: ParserNode) => T | null | undefined | void;

let namespace = '';

export function materialize(node: ParserNode, visitor: Visitor|null = null) {
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
      if (node.tag === 'svg') {
        namespace = 'http://www.w3.org/2000/svg'
      }

      el = createElement(node);
      el.append(...node.children.map((n) => materialize(n, visitor)));

      if (node.tag === 'svg') {
        namespace = 'http://www.w3.org/2000/svg'
      }
      break;
    }

    default:
      throw new Error(`Invalid node type: ${(node as any).type}`);
  }

  return visitor && visitor(el, node) || el;
}

export function createComment(node: CommentNode) {
  return document.createComment(node.text);
}

export function createTextNode(node: TextNode) {
  return document.createTextNode(node.text);
}

export function createElement(node: ElementNode) {
  const el = namespace ? document.createElementNS(namespace, node.tag) : document.createElement(node.tag);

  node.attributes.forEach((a: ParserAttribute) => setAttribute(el, a.name, a.value));

  return el;
}

export function setAttribute(el: Element, attribute: string, value: string | number | boolean) {
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
