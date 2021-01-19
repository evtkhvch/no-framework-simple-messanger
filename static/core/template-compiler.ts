// @ts-ignore
const {compile} = window.Handlebars;

export const templateCompiler = <T>(template: string, context: T): string => {
    return compile(template)(context);
};
