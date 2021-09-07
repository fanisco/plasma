import React from 'react';
import styled from 'styled-components';
import { Spinner } from '@sberdevices/plasma-ui';
import { HeaderProps } from '@sberdevices/plasma-ui/components/Header/Header';

import { AppStateContext } from '../PlasmaApp/AppStateContext';
import { AnyObject, AssistantInstance } from '../../types';
import { useAssistant } from '../../hooks/useAssistant';
import { last } from '../../utils/last';
import { INNER_ASSISTANT_ACTION } from '../../constants';
import { Layout } from '../../components/Layout/Layout';
import { useMount } from '../../hooks';

import { PageComponent as PageComp } from './types';

export interface PageProps<Name extends string> {
    name: Name;
    component: PageComp<AnyObject, Name>;
    fallbackComponent?: React.ReactNode;
    header?: HeaderProps;
    ignoreInsets?: boolean;
}

const StyledSpinner = styled(Spinner)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

interface GetInitialProps<P, R> {
    (context: P): Promise<R>;
    (context: P): R;
}

interface InitialPropsGetter<P, S> {
    getInitialProps?: GetInitialProps<P, S>;
}

interface PageLazyParams<
    C extends PageComp<AnyObject, string>,
    P extends React.ComponentProps<C> = React.ComponentProps<C>,
    Pp = Pick<P, 'params'>,
    Ss = P['state']
> extends InitialPropsGetter<Pp, Ss> {
    default: C & InitialPropsGetter<Pp, Ss>;
}

interface PageLazy {
    lazy<T extends PageLazyParams<PageComp<AnyObject, any>>>(
        factory: () => Promise<T>,
    ): React.LazyExoticComponent<React.MemoExoticComponent<T['default']>>;
}

interface PageFunctionComponent extends PageLazy {
    <N extends keyof AnyObject>(props: PageProps<N>): React.ReactElement;
}

export const Page: PageFunctionComponent = ({
    name,
    component: Component,
    fallbackComponent = <StyledSpinner />,
    header,
    ignoreInsets,
}) => {
    const { assistant, setAssistantState } = useAssistant();

    const sendData = React.useCallback<AssistantInstance['sendData']>(
        (params) => {
            /**
             * перехват кастомного экшена для обработки на клиенте
             * параметры экшена будут переданы в AssistantClient.onData в виде `smart_app_data` экшена
             */
            if (params.name !== INNER_ASSISTANT_ACTION) {
                assistant.sendData(params);
            } else {
                const { action } = params;

                if (window.AssistantClient?.onData) {
                    const smartAppData = {
                        type: 'type' in action ? action.type : action.action_id,
                        payload: ('type' in action ? action.payload : action.parameters) ?? {},
                    };

                    window.AssistantClient.onData({
                        type: 'smart_app_data',
                        smart_app_data: smartAppData,
                        // Для обратной совместимости
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        action: smartAppData,
                    });
                }
            }

            return () => {};
        },
        [assistant],
    );

    return (
        <React.Suspense fallback={fallbackComponent}>
            <Layout ignoreInsets={ignoreInsets}>
                <AppStateContext.Consumer>
                    {({
                        pushHistory,
                        pushScreen,
                        header: appHeader,
                        popScreen,
                        state,
                        changeActiveScreenState,
                        goToScreen,
                    }) => (
                        <Component
                            name={name}
                            params={window.history.state}
                            state={last(state.history).data}
                            assistant={assistant}
                            setAssistantState={setAssistantState}
                            changeState={changeActiveScreenState}
                            pushHistory={pushHistory}
                            pushScreen={pushScreen}
                            popScreen={popScreen}
                            goToScreen={goToScreen}
                            sendData={sendData}
                            fallbackComponent={fallbackComponent}
                            header={header ?? appHeader}
                        />
                    )}
                </AppStateContext.Consumer>
            </Layout>
        </React.Suspense>
    );
};

Page.lazy = (factory) => {
    return React.lazy(async () => {
        const { default: Component, getInitialProps } = await factory();

        const Wrapper = (props: React.ComponentProps<typeof Component>) => {
            const { state, changeState, params } = props;

            useMount(() => {
                const promiseGetter = Component.getInitialProps ?? getInitialProps;

                if (!promiseGetter || state) {
                    return;
                }

                const promise = promiseGetter({ params });

                if (typeof promise.then === 'function') {
                    promise.then(changeState);
                } else {
                    changeState(promise);
                }
            });

            if (getInitialProps && !state) {
                return null;
            }

            return <Component {...props} />;
        };

        return {
            default: React.memo(Wrapper),
        };
    });
};
