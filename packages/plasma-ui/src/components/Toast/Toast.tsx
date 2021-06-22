import React from 'react';
import styled from 'styled-components';
import { black, white } from '@sberdevices/plasma-tokens';

import { Footnote1 } from '../Typography';

export type ToastProps = {
    text: string;
};

const StyledRoot = styled(Footnote1)`
    display: inline-block;
    padding: 0.75rem 1.25rem;
    border-radius: 1.25rem;

    background: ${black};
    color: ${white};

    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

/**
 * Короткие текстовые подсказки.
 * Вызываются только в текущем запущенном приложении как реакция на выполнение действия пользователем.
 */
export const Toast: React.FC<ToastProps> = ({ text }) => <StyledRoot>{text}</StyledRoot>;
