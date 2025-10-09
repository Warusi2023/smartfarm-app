// Simple test to verify Jest is working
describe('Basic Test Suite', () => {
    it('should pass basic arithmetic', () => {
        expect(2 + 2).toBe(4);
        expect(10 - 5).toBe(5);
        expect(3 * 4).toBe(12);
        expect(15 / 3).toBe(5);
    });

    it('should handle string operations', () => {
        expect('Hello' + ' ' + 'World').toBe('Hello World');
        expect('SmartFarm'.length).toBe(9);
        expect('test'.toUpperCase()).toBe('TEST');
    });

    it('should work with arrays and objects', () => {
        const array = [1, 2, 3, 4, 5];
        expect(array.length).toBe(5);
        expect(array[0]).toBe(1);
        expect(array.includes(3)).toBe(true);

        const obj = { name: 'Test', value: 42 };
        expect(obj.name).toBe('Test');
        expect(obj.value).toBe(42);
        expect(Object.keys(obj)).toHaveLength(2);
    });

    it('should handle async operations', async () => {
        const result = await Promise.resolve('success');
        expect(result).toBe('success');
    });
});
