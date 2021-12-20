import React from 'react';
import { createAssistantHostMock } from '@sberdevices/assistant-client';
import { mount } from '@sberdevices/plasma-cy-utils';

import { OnStartFn, PlasmaApp } from '../components/PlasmaApp/PlasmaApp';
import { Page, PageProps } from '../components/Page/Page';
import { PageComponent } from '../components/Page/types';

interface OuterProps<T> {
    (props: T): Partial<T>;
}

export function wrapComponent<T extends React.ComponentType<any>>(
    Component: React.ComponentType<React.ComponentProps<T>>,
    outerProps?: OuterProps<React.ComponentProps<T>> | Partial<React.ComponentProps<T>>,
) {
    const component: React.FC<React.ComponentProps<T> & ReturnType<OuterProps<React.ComponentProps<T>>>> = (props) => {
        let renderProps = {
            ...props,
        };

        if (typeof outerProps === 'function') {
            renderProps = {
                ...renderProps,
                ...outerProps(props),
            };
        } else {
            renderProps = {
                ...props,
                ...outerProps,
            };
        }

        return <Component {...renderProps} />;
    };

    component.displayName = Component.displayName ?? 'WrappedComponent';

    return component;
}

const appProps = {
    header: {
        title: 'Cypress Test',
    },
    assistantParams: {
        initPhrase: 'запусти тестирование плазма храма',
    },
};

interface SingleScreen<K extends string, S extends { [key in K]: unknown }, P = { [key in K]?: unknown }> {
    name: K;
    component: PageComponent<S, K, P>;
}

interface StartApp {
    <K extends string, S extends { [key in K]: unknown }, P = { [key in K]?: unknown }>(
        pages: Array<SingleScreen<K, S, P>>,
        onStart: OnStartFn<S, P>,
        pageProps?: Partial<PageProps<K>>,
    ): Cypress.Chainable<void>;
}

export const startApp: StartApp = (pages, onStart, pageProps = {}) =>
    cy.window({ log: false }).then((win) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        win.appInitialData = [
            {
                type: 'insets',
                insets: {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 144,
                },
                // eslint-disable-next-line @typescript-eslint/camelcase
                sdk_meta: {
                    mid: String(Date.now()),
                    requestId: '-1',
                },
            },
        ];

        createAssistantHostMock({ context: win });

        return new Cypress.Promise<void>((resolve) => {
            mount(
                <PlasmaApp {...appProps} onStart={onStart}>
                    {pages.map((page) => {
                        return <Page key={page.name} name={page.name} component={page.component} {...pageProps} />;
                    })}
                </PlasmaApp>,
                {
                    alias: 'PlasmaApp',
                },
            );

            resolve();
        });
    });
