import { compile } from 'handlebars';

export const templateCompiler = <T>(template: string, context: T): string => {
  return compile(template)(context);
};
