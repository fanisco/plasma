import styled from 'styled-components';
import { Price as BasePrice } from '@sberdevices/plasma-core';
import type { PriceProps as BaseProps } from '@sberdevices/plasma-core';

export interface PriceProps extends BaseProps {}

/**
 * Компонент для отображения цены / стоимости / суммы.
 */
export const Price = styled(BasePrice)``;
