import type { TokenData, TColor } from '@sberdevices/plasma-tokens-utils';
import {
    mapDesignToBaseColors,
    mapDesignToTypography,
    humanizeColor,
    alphenColor,
    compose,
    normalizeFontNames,
    removeTypoUnnecessary,
    convertPixelsToRems,
    normalizeFontStyle,
    normalizeFontWeight,
    normalizeLetterSpace,
    FullColorsList,
} from '@sberdevices/plasma-tokens-utils';

import { DesignLanguage } from './design-language/build/diez-plasma-tokens-web-web';
import type {
    Typography as TypographySet,
    Typograph as TypographyData,
} from './design-language/build/diez-plasma-tokens-web-web';
import { dataColors } from './dataColors';

const ds = new DesignLanguage();

// because diez/ds needs document =(
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('jsdom-global')();

/* ============================================ */
/* =                 COLORS                   = */
/* ============================================ */

const baseColors = mapDesignToBaseColors(ds);

/* ======================================== */
/* =                THEMES                = */
/* ======================================== */

export type ThemeTokens = { [key in keyof typeof FullColorsList]: TokenData<TColor> };
export type ExtendedTokens = {
    link: TokenData<TColor>;
    linkHover: TokenData<TColor>;
    linkActive: TokenData<TColor>;
    linkVisited: TokenData<TColor>;
    linkVisitedHover: TokenData<TColor>;
    linkVisitedActive: TokenData<TColor>;

    buttonSecondaryHover: TokenData<TColor>;
    buttonSecondaryActive: TokenData<TColor>;

    inputBorder: TokenData<TColor>;
    inputBorderHover: TokenData<TColor>;
};

const light: ThemeTokens & ExtendedTokens = {
    ...baseColors,

    text: {
        value: humanizeColor(ds.theme.light_primary.color),
        comment: FullColorsList.text,
    },
    link: {
        value: dataColors.light.link,
    },
    linkHover: {
        value: dataColors.light.linkHover,
    },
    linkActive: {
        value: dataColors.light.linkActive,
    },
    linkVisited: {
        value: dataColors.light.linkVisited,
    },
    linkVisitedHover: {
        value: dataColors.light.linkVisitedHover,
    },
    linkVisitedActive: {
        value: dataColors.light.linkVisitedActive,
    },

    primary: {
        value: humanizeColor(ds.theme.light_primary.color),
        comment: FullColorsList.primary,
    },
    secondary: {
        value: humanizeColor(ds.theme.light_secondary.color),
        comment: FullColorsList.secondary,
    },
    tertiary: {
        value: humanizeColor(ds.theme.light_tertiary.color),
        comment: FullColorsList.tertiary,
    },

    paragraph: {
        value: humanizeColor(ds.theme.light_paragraph.color),
    },
    inverse: {
        value: humanizeColor(ds.theme.light_inverse.color),
    },

    background: {
        value: humanizeColor(ds.theme.light_bg.color),
        comment: FullColorsList.background,
    },

    backgroundPrimary: {
        value: humanizeColor(ds.theme.light_bg_primary.color),
        comment: FullColorsList.backgroundPrimary,
    },
    backgroundSecondary: {
        value: humanizeColor(ds.theme.light_bg_secondary.color),
        comment: FullColorsList.backgroundSecondary,
    },
    backgroundTertiary: {
        value: humanizeColor(ds.theme.light_bg_tertiary.color),
        comment: FullColorsList.backgroundTertiary,
    },

    inputBorder: {
        value: humanizeColor(ds.theme.light_input_border.color),
    },
    inputBorderHover: {
        value: humanizeColor(ds.theme.light_input_border_hover.color),
    },

    accent: {
        value: humanizeColor(ds.theme.light_accent.color),
        comment: FullColorsList.accent,
    },
    success: {
        value: humanizeColor(ds.theme.light_success.color),
        comment: FullColorsList.success,
    },
    warning: {
        value: humanizeColor(ds.theme.light_warning.color),
        comment: FullColorsList.warning,
    },
    critical: {
        value: humanizeColor(ds.theme.light_critical.color),
        comment: FullColorsList.critical,
    },

    overlay: {
        value: humanizeColor(ds.theme.light_overlay.color),
        comment: FullColorsList.overlay,
    },

    surfaceLiquid01: {
        value: humanizeColor(ds.theme.light_surface_Liquid01.color),
        comment: FullColorsList.surfaceLiquid01,
    },
    surfaceLiquid02: {
        value: humanizeColor(ds.theme.light_surface_Liquid02.color),
        comment: FullColorsList.surfaceLiquid02,
    },
    surfaceLiquid03: {
        value: humanizeColor(ds.theme.light_surface_Liquid03.color),
        comment: FullColorsList.surfaceLiquid03,
    },
    surfaceSolid01: {
        value: humanizeColor(ds.theme.light_surface_solid01.color),
        comment: FullColorsList.surfaceSolid01,
    },
    surfaceSolid02: {
        value: humanizeColor(ds.theme.light_surface_solid02.color),
        comment: FullColorsList.surfaceSolid02,
    },
    surfaceSolid03: {
        value: humanizeColor(ds.theme.light_surface_solid03.color),
        comment: FullColorsList.surfaceSolid03,
    },
    surfaceCard: {
        value: humanizeColor(ds.theme.light_surface_card.color),
        comment: FullColorsList.surfaceCard,
    },

    buttonPrimary: {
        value: humanizeColor(ds.theme.light_button_primary.color),
        comment: FullColorsList.buttonPrimary,
    },
    buttonSecondary: {
        value: humanizeColor(ds.theme.light_button_secondary.color),
        comment: FullColorsList.buttonSecondary,
    },
    buttonSecondaryHover: {
        value: alphenColor(ds.theme.light_button_secondary.color, -0.02),
    },
    buttonSecondaryActive: {
        value: alphenColor(ds.theme.light_button_secondary.color, 0.02),
    },

    buttonAccent: {
        value: humanizeColor(ds.theme.light_button_accent.color),
        comment: FullColorsList.buttonAccent,
    },
    buttonSuccess: {
        value: humanizeColor(ds.theme.light_button_success.color),
        comment: FullColorsList.buttonSuccess,
    },
    buttonWarning: {
        value: humanizeColor(ds.theme.light_button_warning.color),
        comment: FullColorsList.buttonWarning,
    },
    buttonCritical: {
        value: humanizeColor(ds.theme.light_button_critical.color),
        comment: FullColorsList.buttonCritical,
    },
    buttonChecked: {
        value: humanizeColor(ds.theme.light_button_checked.color),
        comment: FullColorsList.buttonChecked,
    },
    buttonFocused: {
        value: humanizeColor(ds.theme.light_button_focused.color),
        comment: FullColorsList.buttonFocused,
    },

    gradient: {
        value: ds.gradients.light.backgroundImageStyle.backgroundImage,
        comment: FullColorsList.gradient,
    },
    gradientDevice: {
        value: '',
    },
    voicePhraseGradient: {
        value: '',
    },
    skeletonGradient: {
        value: dataColors.light.skeletonGradient,
    },
    skeletonGradientLighter: {
        value: dataColors.light.skeletonGradientLighter,
    },

    speechBubbleSent: {
        value: '',
    },
    speechBubbleReceived: {
        value: '',
    },
};
const dark: ThemeTokens & ExtendedTokens = {
    ...baseColors,

    text: {
        value: humanizeColor(ds.theme.dark_primary.color),
        comment: FullColorsList.text,
    },
    link: {
        value: dataColors.dark.link,
    },
    linkHover: {
        value: dataColors.dark.linkHover,
    },
    linkActive: {
        value: dataColors.dark.linkActive,
    },
    linkVisited: {
        value: dataColors.dark.linkVisited,
    },
    linkVisitedHover: {
        value: dataColors.dark.linkVisitedHover,
    },
    linkVisitedActive: {
        value: dataColors.dark.linkVisitedActive,
    },

    primary: {
        value: humanizeColor(ds.theme.dark_primary.color),
        comment: FullColorsList.primary,
    },
    secondary: {
        value: humanizeColor(ds.theme.dark_secondary.color),
        comment: FullColorsList.secondary,
    },
    tertiary: {
        value: humanizeColor(ds.theme.dark_tertiary.color),
        comment: FullColorsList.tertiary,
    },

    paragraph: {
        value: humanizeColor(ds.theme.dark_paragraph.color),
    },
    inverse: {
        value: humanizeColor(ds.theme.dark_inverse.color),
    },

    background: {
        value: humanizeColor(ds.theme.dark_bg.color),
        comment: FullColorsList.background,
    },

    backgroundPrimary: {
        value: humanizeColor(ds.theme.dark_bg_primary.color),
        comment: FullColorsList.backgroundPrimary,
    },
    backgroundSecondary: {
        value: humanizeColor(ds.theme.dark_bg_secondary.color),
        comment: FullColorsList.backgroundSecondary,
    },
    backgroundTertiary: {
        value: humanizeColor(ds.theme.dark_bg_tertiary.color),
        comment: FullColorsList.backgroundTertiary,
    },

    inputBorder: {
        value: humanizeColor(ds.theme.dark_input_border.color),
    },
    inputBorderHover: {
        value: humanizeColor(ds.theme.dark_input_border_hover.color),
    },

    accent: {
        value: humanizeColor(ds.theme.dark_accent.color),
        comment: FullColorsList.accent,
    },
    success: {
        value: humanizeColor(ds.theme.dark_success.color),
        comment: FullColorsList.success,
    },
    warning: {
        value: humanizeColor(ds.theme.dark_warning.color),
        comment: FullColorsList.warning,
    },
    critical: {
        value: humanizeColor(ds.theme.dark_critical.color),
        comment: FullColorsList.critical,
    },

    overlay: {
        value: humanizeColor(ds.theme.dark_overlay.color),
        comment: FullColorsList.overlay,
    },

    surfaceLiquid01: {
        value: humanizeColor(ds.theme.dark_surface_Liquid01.color),
        comment: FullColorsList.surfaceLiquid01,
    },
    surfaceLiquid02: {
        value: humanizeColor(ds.theme.dark_surface_Liquid02.color),
        comment: FullColorsList.surfaceLiquid02,
    },
    surfaceLiquid03: {
        value: humanizeColor(ds.theme.dark_surface_Liquid03.color),
        comment: FullColorsList.surfaceLiquid03,
    },
    surfaceSolid01: {
        value: humanizeColor(ds.theme.dark_surface_solid01.color),
        comment: FullColorsList.surfaceSolid01,
    },
    surfaceSolid02: {
        value: humanizeColor(ds.theme.dark_surface_solid02.color),
        comment: FullColorsList.surfaceSolid02,
    },
    surfaceSolid03: {
        value: humanizeColor(ds.theme.dark_surface_solid03.color),
        comment: FullColorsList.surfaceSolid03,
    },
    surfaceCard: {
        value: humanizeColor(ds.theme.dark_surface_card.color),
        comment: FullColorsList.surfaceCard,
    },

    buttonPrimary: {
        value: humanizeColor(ds.theme.dark_button_primary.color),
        comment: FullColorsList.buttonPrimary,
    },
    buttonSecondary: {
        value: humanizeColor(ds.theme.dark_button_secondary.color),
        comment: FullColorsList.buttonSecondary,
    },
    buttonSecondaryHover: {
        value: alphenColor(ds.theme.dark_button_secondary.color, 0.04),
    },
    buttonSecondaryActive: {
        value: alphenColor(ds.theme.dark_button_secondary.color, -0.02),
    },

    buttonAccent: {
        value: humanizeColor(ds.theme.dark_button_accent.color),
        comment: FullColorsList.buttonAccent,
    },
    buttonSuccess: {
        value: humanizeColor(ds.theme.dark_button_success.color),
        comment: FullColorsList.buttonSuccess,
    },
    buttonWarning: {
        value: humanizeColor(ds.theme.dark_button_warning.color),
        comment: FullColorsList.buttonWarning,
    },
    buttonCritical: {
        value: humanizeColor(ds.theme.dark_button_critical.color),
        comment: FullColorsList.buttonCritical,
    },
    buttonChecked: {
        value: humanizeColor(ds.theme.dark_button_checked.color),
        comment: FullColorsList.buttonChecked,
    },
    buttonFocused: {
        value: humanizeColor(ds.theme.dark_button_focused.color),
        comment: FullColorsList.buttonFocused,
    },

    gradient: {
        value: ds.gradients.dark.backgroundImageStyle.backgroundImage,
        comment: FullColorsList.gradient,
    },
    gradientDevice: {
        value: '',
    },
    voicePhraseGradient: {
        value: '',
    },
    skeletonGradient: {
        value: dataColors.dark.skeletonGradient,
    },
    skeletonGradientLighter: {
        value: dataColors.dark.skeletonGradientLighter,
    },

    speechBubbleSent: {
        value: '',
    },
    speechBubbleReceived: {
        value: '',
    },
};

export const themes = {
    light,
    dark,
};

/* ======================================== */
/* =         TYPOGRAPHY & FONTS           = */
/* ======================================== */

export type TypographyTypes = keyof TypographySet;

// right to left: first we transform "LetterSpace" only then we scale "fontSize"
const normalizeTypographyStyle = compose(
    convertPixelsToRems,
    normalizeFontNames,
    removeTypoUnnecessary,
    normalizeFontStyle,
    normalizeFontWeight,
    normalizeLetterSpace,
);

export const typoSystem = mapDesignToTypography<TypographyTypes, TypographyData>(ds, normalizeTypographyStyle);
