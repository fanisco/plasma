import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

describe('plasma-core: Tabs', () => {
    const Tabs = getComponent('Tabs');
    const TabItem = getComponent('TabItem');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Tabs>
                    <TabItem>Joy</TabItem>
                    <TabItem isActive>Sber</TabItem>
                    <TabItem>Eva</TabItem>
                </Tabs>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('scrollable', () => {
        const Container = ({ children }) => {
            return <div style={{ width: '75px' }}>{children}</div>;
        };

        mount(
            <CypressTestDecorator>
                <Container>
                    <Tabs>
                        <TabItem>Joy</TabItem>
                        <TabItem isActive>Sber</TabItem>
                        <TabItem>Eva</TabItem>
                    </Tabs>
                </Container>
            </CypressTestDecorator>,
        );

        cy.get('[role="tablist"]').parent().scrollTo(500, 0);

        cy.matchImageSnapshot();
    });

    it('_stretch', () => {
        mount(
            <CypressTestDecorator>
                <Tabs stretch>
                    <TabItem>Joy</TabItem>
                    <TabItem isActive>Sber</TabItem>
                    <TabItem>Eva</TabItem>
                </Tabs>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
