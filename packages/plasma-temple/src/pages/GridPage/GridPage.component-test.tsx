import { navigate } from '../../../../../cypress/support/commands';
import { wrapComponent, startApp } from '../../testHelpers/testRenderHelpers';

import { GridPage } from './GridPage';
import { GridPageState } from './types';

interface State {
    list: GridPageState;
}

const imageSrc = 'https://plasma.sberdevices.ru/ui-storybook/images/320_320_0.jpg';

describe('GridPage', () => {
    let stubbedCallback: Function;

    const stubbedData = Array.from({ length: 10 }, (_, i) => ({
        text: `Title ${i + 1}`,
        position: i + 1,
        image: {
            src: imageSrc,
        },
        id: String(i),
    }));

    beforeEach(() => {
        cy.intercept(imageSrc, (req) => {
            req.reply({
                fixture: 'images/320_320_0.jpg',
            });
        });

        stubbedCallback = cy.stub();

        startApp<keyof State, State>(
            [
                {
                    name: 'list',
                    component: wrapComponent(GridPage, () => ({
                        onItemShow: stubbedCallback,
                        onScrollBottom: stubbedCallback,
                        header: {
                            title: 'Cypress Test',
                        },
                    })),
                },
            ],
            ({ pushHistory }) => {
                pushHistory('list', {
                    items: stubbedData,
                });
            },
            {
                ignoreInsets: true,
            },
        );
    });

    afterEach(() => {
        // cy.get('body').matchImageSnapshot();
    });

    it('render', () => {
        cy.get('[data-cy="grid-item-card"]').should('be.exist');
    });

    it('card click', () => {
        cy.get('[data-cy="grid-item-card"]').first().focus();
        cy.sendNavigateAction([navigate.ENTER]).then(() => {
            expect(stubbedCallback).to.be.calledWith(stubbedData[0]);
        });
    });

    it('card another click', () => {
        cy.get('[data-cy="grid-item-card"]').first().focus();
        cy.focused()
            .click()
            .then(() => {
                expect(stubbedCallback).to.be.calledWith(stubbedData[0]);
            });
    });

    it.only('trigger infinite scroll', { scrollBehavior: 'top' }, () => {
        cy.get('[data-cy="grid-item-card"]:last')
            .scrollIntoView({ duration: 500 })
            .trigger('scroll', { scrollBehavior: 'bottom' })
            .then(() => {
                expect(stubbedCallback).to.be.calledOnce;
            });
    });
});
