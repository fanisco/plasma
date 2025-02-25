import React from 'react';
import styled from 'styled-components';
import { Button } from '@sberdevices/plasma-ui';

import { useInsets } from '../../../../hooks';

import { DeliveryPrice, CartOrderProps, Discount, CartAmount } from './CartOrder@common';

const StyledDeliveryPrice = styled(DeliveryPrice)`
    margin-top: 0.25rem;
`;

const StyledDiscount = styled(Discount)`
    margin-top: 1rem;
`;

const StyledButton = styled(Button)<{ bottom: number }>`
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: ${({ bottom }) => bottom}px;
    left: var(--plasma-grid-margin);
    width: calc(100% - 2 * var(--plasma-grid-margin));
`;

const StyledContainer = styled.div`
    padding-bottom: 3.5rem;
`;

export const CartOrderMobile: React.FC<CartOrderProps> = ({
    amount,
    currency,
    disabled,
    deliveryPrice,
    minDeliveryPrice,
    discount,
    orderButtonText,
    children,
    onMakeOrder,
}) => {
    const { bottom } = useInsets();

    return (
        <StyledContainer>
            <StyledDeliveryPrice
                currency={currency}
                minDeliveryPrice={minDeliveryPrice}
                deliveryPrice={deliveryPrice}
            />
            <StyledDiscount currency={currency} discount={discount} />
            {/*
                bottom / 2 - хак деление полученного отступа на два, т.к. на текущий момент
                получаем большой отступ, кнопка фиксируется слишком высоко над нативной панелью
            */}
            <StyledButton
                view="primary"
                stretch
                onClick={onMakeOrder}
                disabled={disabled}
                size="m"
                bottom={bottom / 2}
                data-cy="CartOrder-button"
            >
                {orderButtonText}
                <CartAmount amount={amount} discount={discount} />
            </StyledButton>
            {children}
        </StyledContainer>
    );
};
