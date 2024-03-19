/* 
 * Unit tests for generateChartImg.js
 */

// Import module for testing
const generateChart = require('./generateChartImg');

test('correctly returns valid URL to image for simple chart', async () =>
{
    // Setup input data
    const type = 'pie';
    const data = [{x:1, y:1}, {x:2, y:2}];
    const xLabel = 'independent';
    const yLabel = 'dependent';

    // Call & wait for image generation
    const imgURL = await generateChart(type, data, xLabel, yLabel);

    // Assert that URL exists
    expect(imgURL).toBeTruthy();

    // Assert that URL actually points to a valid URL
    // THIS IS FLAKY! But nothing we can do about it really.
    const res = await fetch(imgURL);
    expect(res.ok).toBeTruthy();
});

test('correctly returns valid URL to image for complex chart', async () =>
{
    // Setup input data
    const type = 'scatter';
    const data =
    [
        {x:-25.293, y:349}, {x:2, y:39}, {x:0.35, y:-35.2},
        {x:53, y:34}, {x:9, y:9}, {x:9, y:-8},
        {x:834, y:7}, {x:6, y:-34.35}, {x:-2.5, y:12},
        {x:1, y:4}, {x:25, y:834}, {x:1/2948, y:125},
        {x:64.23, y:-34.6}, {x:-235, y:62}, {x:203.5, y:-50.3},
    ];
    const xLabel = 'independent';
    const yLabel = 'dependent';
    const title = 'complex chart';
    const color = 'azure';

    // Call & wait for image generation
    const imgURL = await generateChart(type, data, xLabel, yLabel, title, color);

    // Assert that URL exists
    expect(imgURL).toBeTruthy();

    // Assert that URL actually points to a valid URL
    // THIS IS FLAKY! But nothing we can do about it really.
    const res = await fetch(imgURL);
    expect(res.ok).toBeTruthy();
});
