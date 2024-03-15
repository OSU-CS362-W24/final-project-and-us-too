/* 
 * Unit tests for sortPoints.js
 */

// Import sortPoints module
const sort = require('./sortPoints');

// Simple non-sorting-based tests
test("returns the same array object", () =>
{
    // Initialize array
    var arr =
    [
        {x: 1, y: 2},
        {x: 3, y: 4},
    ];
    
    // Call function
    var arr2 = sort(arr);

    // Assert that references are the same
    expect(arr).toBe(arr2);
});

test("doesn't change the length of the array", () =>
{
    // Initialize array
    var arr =
    [
        {x: 1, y: 2}, {x: 3, y: 4}, {x: 5, y: 6},
        {x: 7, y: 8}, {x: 9, y: 0}, {x: 9, y: 8},
        {x: 7, y: 6}, {x: 5, y: 4}, {x: 3, y: 2},
    ];
    var initialLength = arr.length;
    
    // Call function
    sort(arr);

    // Assert that length is the same
    expect(arr).toHaveLength(initialLength);
});

// Sorting-based tests
test("correctly sorts a short array", () =>
{
    // Initialize array
    var arr =
    [
        {x: 5, y: 0},
        {x: 1, y: 0},
        {x: 3, y: 0},
        {x: -15, y: 0},
    ];
    
    // Call function
    sort(arr);

    // Assert that list is sorted
    for (let i = 0; i < arr.length - 1; i++)
        expect(arr[i]).toBeLessThanOrEqual(arr[i + 1]);
});

test("correctly sorts a longer array", () =>
{
    // Initialize array
    var arr =
    [
        {x: 6, y: 0}, {x: 15, y: 0},
        {x: 3, y: 0}, {x: -235, y: 0},
        {x: 8, y: 0}, {x: 2.63, y: 0},
        {x: -2, y: 0}, {x: 0.1, y: 0},
        {x: 13, y: 0}, {x: -2.6, y: 0},
        {x: -1, y: 0}, {x: 62, y: 0},
        {x: 9, y: 0}, {x: 0.5, y: 0},
        {x: -23, y: 0}, {x: 17, y: 0},
        {x: 1, y: 0}, {x: -73, y: 0},
        {x: 156, y: 0}, {x: -1.63, y: 0},
    ];
    
    // Call function
    sort(arr);

    // Assert that list is sorted
    for (let i = 0; i < arr.length - 1; i++)
        expect(arr[i]).toBeLessThanOrEqual(arr[i + 1]);
});

test("correctly sorts an array with repeat values", () =>
{
    // Initialize array
    var arr =
    [
        {x: 2, y: 0},
        {x: 1, y: 0},
        {x: 1, y: 0},
        {x: 3, y: 0},
        {x: 2, y: 0},
        {x: 3, y: 0},
        {x: 1, y: 0},
        {x: 2, y: 0},
        {x: 1, y: 0},
    ];
    
    // Call function
    sort(arr);

    // Assert that list is sorted
    for (let i = 0; i < arr.length - 1; i++)
        expect(arr[i]).toBeLessThanOrEqual(arr[i + 1]);
});
