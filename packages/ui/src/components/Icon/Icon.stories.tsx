import React from 'react';
import styled from 'styled-components';

import Icon, { iconSet, IconName } from './Icon';

const StyledContainer = styled.div`
    padding: 10px;
    display: inline-block;
`;

export default {
    title: 'Icon',
};

export const Default = () => (
    <>
        {Object.keys(iconSet).map((icon) => (
            <StyledContainer key={icon}>
                <Icon icon={icon as IconName} size="m" />
            </StyledContainer>
        ))}
    </>
);

export const Small = () => (
    <>
        {Object.keys(iconSet).map((icon) => (
            <StyledContainer key={icon}>
                <Icon icon={icon as IconName} size="s" />
            </StyledContainer>
        ))}
    </>
);

export const Large = () => (
    <>
        {Object.keys(iconSet).map((icon) => (
            <StyledContainer key={icon}>
                <Icon icon={icon as IconName} size="l" />
            </StyledContainer>
        ))}
    </>
);

export const ExtraLarge = () => (
    <>
        {Object.keys(iconSet).map((icon) => (
            <StyledContainer key={icon}>
                <Icon icon={icon as IconName} size="xxl" />
            </StyledContainer>
        ))}
    </>
);
