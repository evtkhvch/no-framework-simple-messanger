// @ts-ignore
const { compile } = window.Handlebars;
export const templateCompiler = (template, context) => {
    return compile(template)(context);
};
//# sourceMappingURL=template-compiler.js.map