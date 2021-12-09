import { navigate } from '../../../../../cypress/support/commands';
import { wrapComponent, startApp } from '../../testHelpers/testRenderHelpers';

import { GalleryPage } from './GalleryPage';
import { GalleryPageState } from './types';

interface State {
    gallery: GalleryPageState<{}>;
}

const imageSrc = 'https://plasma.sberdevices.ru/ui-storybook/images/320_320_0.jpg';

describe('GalleryPage', () => {
    describe('Single Gallery on Page', () => {
        let stubbedOnCardClick: Function;

        const stubbedData = Array.from({ length: 10 }, (_, i) => ({
            label: `Title ${i + 1}`,
            description: `Decription for Card ${i + 1}`,
            id: i,
            position: i + 1,
            image: {
                src: imageSrc,
            },
        }));

        beforeEach(() => {
            cy.intercept(imageSrc, (req) => {
                req.reply({
                    fixture: 'images/320_320_0.jpg',
                });
            });

            stubbedOnCardClick = cy.stub();

            startApp<keyof State, State>(
                [
                    {
                        name: 'gallery',
                        component: wrapComponent(GalleryPage, () => ({
                            onCardClick: stubbedOnCardClick,
                        })),
                    },
                ],
                ({ pushHistory }) => {
                    pushHistory('gallery', {
                        activeGalleryIndex: 0,
                        gallery: {
                            items: stubbedData,
                            activeCardIndex: 0,
                        },
                    });
                },
            );
        });

        afterEach(() => {
            cy.get('body').matchImageSnapshot();
        });

        it('screen rendered', () => {
            cy.get('[data-cy="gallery-0"] [tabindex="0"]').should('be.exist');
        });

        it('click on card', () => {
            cy.sendNavigateAction([navigate.RIGHT, navigate.ENTER]).then(() => {
                expect(stubbedOnCardClick).to.be.calledWith(stubbedData[1]);
            });
        });
    });

    describe('Single Gallery with title on Page', () => {
        let stubbedOnCardClick: Function;

        const stubbedData = Array.from({ length: 10 }, (_, i) => ({
            label: `Title ${i + 1}`,
            description: `Decription for Card ${i + 1}`,
            id: i,
            position: i + 1,
            image: {
                src: imageSrc,
            },
        }));

        beforeEach(() => {
            cy.intercept(imageSrc, (req) => {
                req.reply({
                    fixture: 'images/320_320_0.jpg',
                });
            });

            stubbedOnCardClick = cy.stub();

            startApp<keyof State, State>(
                [
                    {
                        name: 'gallery',
                        component: wrapComponent(GalleryPage, () => ({
                            onCardClick: stubbedOnCardClick,
                        })),
                    },
                ],
                ({ pushHistory }) => {
                    pushHistory('gallery', {
                        activeGalleryIndex: 0,
                        gallery: {
                            title: 'Cypress Gallery',
                            items: stubbedData,
                            activeCardIndex: 0,
                        },
                    });
                },
            );
        });

        afterEach(() => {
            cy.get('body').matchImageSnapshot();
        });

        it('screen rendered', () => {
            cy.get('[data-cy="gallery-0"] [tabindex="0"]').should('be.exist');
        });

        it('click on card', () => {
            cy.sendNavigateAction([navigate.RIGHT, navigate.ENTER]).then(() => {
                expect(stubbedOnCardClick).to.be.calledWith(stubbedData[1]);
            });
        });
    });

    describe('Multiple Galleries on Page', () => {
        let stubbedOnCardClick: Function;

        const stubbedData = Array.from({ length: 10 }, (_, i) => ({
            label: `Title ${i + 1}`,
            description: `Decription for Card ${i + 1}`,
            id: i,
            position: i + 1,
            image: {
                src: imageSrc,
            },
        }));

        const galleries = [
            {
                title: 'Cypress Gallery 1',
                id: 'first',
                activeCardIndex: 0,
                items: stubbedData.map((item) => ({
                    ...item,
                    time: '3h 42min',
                })),
            },
            {
                title: 'Cypress Gallery 2',
                id: 'second',
                activeCardIndex: 0,
                items: stubbedData,
            },
            {
                title: 'Cypress Gallery 3',
                id: 'third',
                activeCardIndex: 0,
                items: stubbedData.map((item, index) => ({
                    ...item,
                    tag: `Tag ${index + 1}`,
                })),
            },
        ];

        beforeEach(() => {
            cy.intercept(imageSrc, (req) => {
                req.reply({
                    fixture: 'images/320_320_0.jpg',
                });
            });

            stubbedOnCardClick = cy.stub();

            startApp<keyof State, State>(
                [
                    {
                        name: 'gallery',
                        component: wrapComponent(GalleryPage, () => ({
                            onCardClick: stubbedOnCardClick,
                        })),
                    },
                ],
                ({ pushHistory }) => {
                    pushHistory('gallery', {
                        activeGalleryIndex: 0,
                        gallery: galleries,
                    });
                },
            );
        });

        afterEach(() => {
            cy.get('body').matchImageSnapshot();
        });

        it('screen rendered', () => {
            cy.get('[data-cy="gallery-0"] [tabindex="0"]').should('be.exist');
        });

        it('click on card', () => {
            cy.sendNavigateAction([
                navigate.DOWN,
                navigate.RIGHT,
                navigate.DOWN,
                navigate.UP,
                navigate.RIGHT,
                navigate.ENTER,
            ]).then(() => {
                expect(stubbedOnCardClick).to.be.calledWith(stubbedData[2]);
            });
        });
    });
});
