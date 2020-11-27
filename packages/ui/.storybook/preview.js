import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { text, background, gradient } from '@sberdevices/plasma-tokens';
import { darkEva, darkJoy, darkSber, lightEva, lightJoy, lightSber } from '@sberdevices/plasma-tokens/themes';

import { DeviceDetectionProvider } from '../src/components/Device';

const DocumentStyle = createGlobalStyle`
    /* stylelint-disable-next-line selector-nested-pattern */
    html:root {
        min-height: 100vh;
        color: ${text};
        background-color: ${background};
        background-image: ${gradient};
    }

    /* stylelint-disable-next-line selector-nested-pattern */
    body {
        margin: 0;
        padding: 16px !important;

        /* stylelint-disable-next-line string-quotes */
        font-family: "SB Sans Text", Helvetica, Arial, sans-serif;
    }
`;

const themes = {
    darkSber: createGlobalStyle(darkSber),
    darkEva: createGlobalStyle(darkEva),
    darkJoy: createGlobalStyle(darkJoy),
    lightSber: createGlobalStyle(lightSber),
    lightEva: createGlobalStyle(lightEva),
    lightJoy: createGlobalStyle(lightJoy),
};

const withTheme = (Story, context) => {
    const Theme = themes[context.globals.theme];

    return (
        <>
            <DeviceDetectionProvider detectDeviceCallback={() => context.globals.typoSize}>
                <Theme />
                <DocumentStyle />
                <Story {...context} />
            </DeviceDetectionProvider>
        </>
    );
};

addDecorator(withKnobs);
addDecorator(withTheme);

addParameters({
    viewport: {
        defaultViewport: 'SberBox',
        viewports: {
            '360': {
                name: '360',
                styles: {
                    width: '360px',
                    height: '640px',
                },
            },
            '720': {
                name: '720',
                styles: {
                    width: '720px',
                    height: '405px',
                },
            },
            '860': {
                name: '860',
                styles: {
                    width: '860px',
                    height: '640px',
                },
            },
            '1024': {
                name: '1024',
                styles: {
                    width: '1024px',
                    height: '768px',
                },
            },
            SberPortal: {
                name: 'SberPortal',
                styles: {
                    width: '1280px',
                    height: '720px',
                },
            },
            SberBox: {
                name: 'SberBox',
                styles: {
                    width: '1920px',
                    height: '1080px',
                },
            },
        },
    },
});

export const globalTypes = {
    theme: {
        name: 'Theme',
        description: 'Global theme for components',
        defaultValue: 'darkSber',
        toolbar: {
            items: ['darkSber', 'darkJoy', 'darkEva', 'lightSber', 'lightJoy', 'lightEva'],
        },
    },
    typoSize: {
        name: 'Device kind',
        description: 'Global typography size for components',
        defaultValue: 'sberBox',
        toolbar: {
            items: ['touch', 'sberBox', 'sberPortal'],
        },
    },
};
