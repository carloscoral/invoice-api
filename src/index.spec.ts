import { suma } from './index';

describe('Suma function', () => {
    test('Suma dos numeros', () => {
        expect(suma(1, 2)).toBe(3);
    });
});
