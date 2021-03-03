import { Component } from './component';

export function render(query: string, component: Component): HTMLElement | null {
  const root: HTMLElement | null = document.querySelector(query);

  if (root) {
    root.appendChild(component.element as Node);
  }
  return root;
}
