import React from 'react';
import styled from 'styled-components';
import { Row, Col, Image } from '@sberdevices/plasma-ui';

import { Header } from '../Header/Header';
import { UnifiedComponentProps } from '../../registry/types';
import { useInsets } from '../../hooks';
import { FullScreenBackground } from '../FullScreenBackground/FullScreenBackground';

import { StateLayoutCommonProps } from './types';

type StateLayoutProps = UnifiedComponentProps<
    StateLayoutCommonProps,
    'Headline' | 'Text' | 'TextWrapper' | 'ImageContainer'
>;

const StyledHeaderContainer = styled.div`
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0;
    padding-left: var(--plasma-grid-margin);
    padding-right: var(--plasma-grid-margin);
`;

const StyledContainer = styled(Row)<{ offset?: number }>`
    box-sizing: border-box;
    height: 100vh;

    align-items: center;

    ${({ offset }) =>
        offset && {
            paddingBottom: `${offset}px`,
        }}
`;

const StyledWrapper = styled.div`
    position: relative;
    margin: 0 calc(var(--plasma-grid-margin) * -1);
    padding: 0 var(--plasma-grid-margin);
`;

export const StateLayout: React.FC<StateLayoutProps> = ({
    title,
    text,
    button,
    image,
    background,
    header,
    platformComponents: { Headline, ImageContainer, Text, TextWrapper },
}) => {
    const insets = useInsets();

    return (
        <StyledWrapper>
            {background && <FullScreenBackground src={background} />}
            {header && (
                <StyledHeaderContainer>
                    <Header {...header} />
                </StyledHeaderContainer>
            )}
            <StyledContainer offset={insets.bottom || 144}>
                <Col sizeXL={6} sizeM={3}>
                    <TextWrapper>
                        <Headline>{title}</Headline>
                        {text && <Text>{text}</Text>}
                    </TextWrapper>
                    {button}
                </Col>
                {image && (
                    <Col sizeXL={6} sizeM={3}>
                        <ImageContainer>
                            <Image base="div" src={image} ratio="1 / 1" />
                        </ImageContainer>
                    </Col>
                )}
            </StyledContainer>
        </StyledWrapper>
    );
};
