import fs from "fs";
import path from "path";
import { paramCase } from "param-case";

import { toCSSVarTokenWithValue, capitalize, createThemeStyles, flattenTokenData } from "./functions";
import type { TokenGroup, TokenData, TokenType, TypoSystem, ThemeCSSObject, ThemeColorsList } from "./types";

export const ROBO_COMMENT = "// Generated by robots, do not change this manually!\n\n";
export const HTML_FONT_SIZE = 16;

type GeneratedTokenType = "value" | "css";

type GeneratedFiles = Array<{
    file: string;
    content: string;
}>;

/**
 * Генерация одиночного токена.
 * @param {TokenData<TokenType>} token Входные данные
 * @param {GeneratedTokenType} type Тип выводимого токена
 * @param {string} prefix Префикс в CSS-токене
 * @param {boolean} generateTypes Генерировать типы для токенов
 * @return {string}
 */
const generateToken = (
    { comment, value }: TokenData<TokenType>,
    type: GeneratedTokenType,
    key: string,
    prefix?: string,
    generateTypes?: boolean
) => {
    let token = "";

    if (comment) {
        token += `/** ${comment} */\n`;
    }

    if (typeof value === "string") {
        // type=css param is used for colors values only
        if (type === "css") {
            value = toCSSVarTokenWithValue(`${prefix}-${paramCase(key)}`, value);
        }
        token += `export const ${key} = '${value}';\n`;
    } else {
        // type=css param is used for typography values only
        const replacer = (k: string, val: string) => {
            if (k) {
                return toCSSVarTokenWithValue(`${prefix}-${paramCase(k)}`, val);
            }
            return val;
        };
        const objToStr = (type === "css" ? JSON.stringify(value, replacer, 4) : JSON.stringify(value, null, 4)).replace(
            /"/g,
            "'"
        );

        if (generateTypes) {
            const typeName = capitalize(key);
            token += `type ${typeName} = {\n${Object.keys(value)
                .map((k) => `    ${k}: any`)
                .join(";\n")};\n};\n\n`;
            token += `export const ${key}: ${typeName} = ${objToStr};`;
        } else {
            token += `export const ${key} = ${objToStr};`;
        }
    }
    return token;
};

/**
 * Преобразует объект токенов в CSS Properties object.
 * @param {TokenGroup<TokenType>} tokens Объект токенов
 * @param {GeneratedTokenType} type Тип выводимого токена
 * @param {string} prefix Префикс в CSS-токене
 * @param {boolean} generateTypes Генерировать типы для токенов
 * @return {string}
 */
export const generateTokens = (
    tokens: TokenGroup<TokenType>,
    type: GeneratedTokenType = "value",
    prefix?: string,
    generateTypes?: boolean
) =>
    Object.entries(tokens).reduce(
        (acc, [key, token]) => `${acc}${generateToken(token, type, key, prefix, generateTypes)}\n`,
        ROBO_COMMENT
    );

/**
 * Генерация тем на основе объекта.
 * @param {Record<string, TokenGroup<TokenType>>} themes Объект с темами
 * @param {'tokens' | 'cssobject'} type Тип генерируемого контента
 * @param {boolean} needIndex Необходима запись в `index.ts`
 * @return {GeneratedFiles}
 */
export const generateThemes = (
    themes: Record<string, TokenGroup<TokenType>>,
    type: "tokens" | "cssobject",
    needIndex = false
) => {
    const out: GeneratedFiles = [];
    let index = ROBO_COMMENT;

    for (const [name, theme] of Object.entries(themes)) {
        index += `export { ${name} } from './${name}';\n`;

        let content;

        if (type === "tokens") {
            content = generateTokens(theme);
        } else {
            const themeStyles = createThemeStyles(flattenTokenData(theme));
            content = `${ROBO_COMMENT}export const ${name} = ${JSON.stringify(themeStyles, null, 4)};\n`;
        }

        out.push({
            file: `${name}.ts`,
            content,
        });
    }

    if (needIndex) {
        out.push({
            file: "index.ts",
            content: index,
        });
    }

    return out;
};

/**
 * Генерация типографики, разложенной по типам компонентов.
 * @param {TypoSystem} Типографическая система
 * @return {GeneratedFiles}
 */
export const generateTypography = <TK extends string>(typoSystem: Pick<TypoSystem<TK>, "text">) => {
    const { text } = typoSystem;
    const out: GeneratedFiles = [];
    let index = ROBO_COMMENT;

    for (const [name, styles] of Object.entries(text)) {
        index += `export { ${name} } from './${name}';\n`;

        out.push({
            file: `${name}.ts`,
            content: generateToken({ value: styles } as TokenData, "css", name, `typo-${name}`, true),
        });
    }

    out.push({
        file: "index.ts",
        content: index,
    });

    return out;
};

/**
 * Генерация параметрической системы на основе встречающихся значений типографики.
 * @param {TypoSystem} Типографическая система
 * @return {GeneratedFiles}
 */
export const generateTypographyValues = <TK extends string>(typoSystem: Omit<TypoSystem<TK>, "text">) => {
    const { fontSizes, fonts, fontWeights, lineHeights, letterSpacings } = typoSystem;
    const out: GeneratedFiles = [];
    let index = ROBO_COMMENT;

    for (const [name, styles] of Object.entries({
        fontSizes,
        fonts,
        fontWeights,
        lineHeights,
        letterSpacings,
    })) {
        index += `export { ${name} } from './${name}';\n`;

        out.push({
            file: `${name}.ts`,
            content: generateToken({ value: styles }, "css", name, `typo-${name}`),
        });
    }

    out.push({
        file: "index.ts",
        content: index,
    });

    return out;
};

/**
 * Генерация типографики в по типам устройств для создания глобального стиля.
 * @param {Record<string, ThemeCSSObject>} typoThemes Типографика, разложенная по типам устройств
 * @return {GeneratedFiles}
 */
export const generateTypo = (typoThemes: Record<string, ThemeCSSObject>) => {
    const out: GeneratedFiles = [];
    let index = ROBO_COMMENT;

    for (const [name, themeCSS] of Object.entries(typoThemes)) {
        index += `export { ${name} } from './${name}';\n`;

        out.push({
            file: `${name}.ts`,
            content: `${ROBO_COMMENT}export const ${name} = ${JSON.stringify(themeCSS, null, 4)};\n`,
        });
    }

    out.push({
        file: "index.ts",
        content: index,
    });

    return out;
};

/**
 * Генерация Theme JSON.
 */
export const generateThemeJSON = <TK extends string>(
    typoSystem: TypoSystem<TK>,
    basicTheme: Record<keyof typeof ThemeColorsList, string>,
    otherThemes: Record<string, Record<keyof typeof ThemeColorsList, string>>
) => {
    const { fontSizes, ...rest } = typoSystem;
    // font-size is often first
    // https://system-ui.com/theme/
    const theme = {
        fontSizes,
        colors: {
            ...basicTheme,
            modes: otherThemes,
        },
        ...rest,
    };

    return `${JSON.stringify(theme, null, 4)}\n`;
};

/**
 * Запись нагенерированного в файловую систему.
 * @param {string} dir Директория для записи (если не существует, то будет создана).
 * @param {GeneratedFiles} generated Сгенерированный контент для записи.
 */
export const writeGeneratedToFS = (dir: string, generated: GeneratedFiles) => {
    fs.existsSync(dir) || fs.mkdirSync(dir);

    for (const { file, content } of generated) {
        fs.writeFileSync(path.join(dir, file), content);
    }
};
