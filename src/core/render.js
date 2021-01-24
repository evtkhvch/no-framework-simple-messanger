export function render(query, component) {
    const root = document.querySelector(query);
    if (root) {
        root.appendChild(component.element);
    }
    return root;
}
//# sourceMappingURL=render.js.map