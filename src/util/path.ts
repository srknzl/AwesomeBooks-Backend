import * as path from "path";
export const baseDirectory = process.mainModule ? path.dirname(process.mainModule.filename) : '';
