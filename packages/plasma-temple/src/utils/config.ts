import React from 'react';

import { CanvasAppConfig, Screen } from '../types';

export const defaultConfig: CanvasAppConfig = {
    routes: [
        {
            type: Screen.gallery,
            component: React.lazy(() => import('../templates/GalleryList/GalleryList')),
        },
        {
            type: Screen.entity,
            component: React.lazy(() => import('../templates/Item/Item'))
        },
        {
            type: Screen.detail,
        },
        {
            type: Screen.video,
            component: React.lazy(() => import('../templates/Video/Video')),
        }
    ],
    header: {
        title: 'SmartApp Simple Temlate',
    },
    assistant: {
        initPhrase: 'Привет!',
        nativePanel: {
            defaultText: 'Привет!',
        },
    },
};
