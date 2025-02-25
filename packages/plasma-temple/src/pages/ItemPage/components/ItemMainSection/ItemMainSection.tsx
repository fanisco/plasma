import React from 'react';
import styled from 'styled-components';
import { Cell, TextBox, TextBoxLabel, TextBoxTitle, Button, ButtonProps } from '@sberdevices/plasma-ui';
import { IconPlay } from '@sberdevices/plasma-icons/Icons/IconPlay';

import { isSberBoxLike } from '../../../../utils/deviceFamily';
import { FullScreenBackground } from '../FullScreenBackground/FullScreenBackground';
import { useFocusOnMount } from '../../../../hooks/useFocusOnMount';
import { UnifiedComponentProps } from '../../../../registry/types';
import { SectionProps } from '../Section/Section';

interface ItemCellProps {
    title: React.ReactNode;
    content: React.ReactNode;
}
export interface ItemMainSectionProps {
    title: string;
    subtitle: string;
    cover?: string;
    description?: ItemCellProps[];
    itemShowButtonText: string;
    onItemShow: () => void;
    additionalButons?: ButtonProps[];
}

const StyledRow = styled.div`
    display: flex;
    align-items: flex-start;

    margin-bottom: 64px;
`;

const StyledTextBox = styled(Cell)`
    min-width: 200px;
    margin-left: 1rem;

    &:first-child {
        margin-left: 0;
    }
`;

const ItemCell: React.FC<ItemCellProps> = ({ title, content }) => (
    <StyledTextBox
        content={
            <TextBox>
                <TextBoxLabel>{title}</TextBoxLabel>
                <TextBoxTitle>{content}</TextBoxTitle>
            </TextBox>
        }
    />
);

type PlatformComponents = {
    Container: SectionProps;
    Title: void;
    Subtitle: void;
};

export const ItemMainSection: React.FC<UnifiedComponentProps<ItemMainSectionProps, PlatformComponents>> = ({
    title,
    subtitle,
    description,
    itemShowButtonText,
    onItemShow,
    cover,
    platformComponents: { Container, Title, Subtitle },
    additionalButons = [],
}) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    useFocusOnMount<HTMLButtonElement>(buttonRef, {
        delay: 250,
    });

    const renderButton = (props: ButtonProps, index: number) => (
        <Button key={`ItemMainSection-Button-${index}`} {...props} />
    );

    return (
        <Container withSpatNav>
            {cover && <FullScreenBackground src={cover} />}
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
            {description && (
                <StyledRow>
                    {description.map(
                        ({ title: descTitle, content }, index) =>
                            content && (
                                <ItemCell key={`ItemPageDescription${index}`} title={descTitle} content={content} />
                            ),
                    )}
                </StyledRow>
            )}
            <Button
                size="s"
                onClick={onItemShow}
                ref={buttonRef}
                contentLeft={<IconPlay size="s" />}
                outlined={isSberBoxLike()}
                text={itemShowButtonText}
            />
            {additionalButons.map(renderButton)}
        </Container>
    );
};
