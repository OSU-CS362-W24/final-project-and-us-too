/**
 * @jest-environment jsdom
 */


const fs = require("fs");
const path = require("path");
const domTesting = require('@testing-library/dom');
require('@testing-library/jest-dom');
const userEvent = require("@testing-library/user-event").default;

function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8');
    document.open();
    document.write(html);
    document.close();
    jest.isolateModules(function() {
        require(jsPath);
    });
}

// 1. Initial state test
test('initially there is only one pair of X and Y input fields', () => {
    initDomFromFiles(path.resolve(__dirname, './scatter.html'), path.resolve(__dirname, './scatter.js'));

    const xInputFields = document.querySelectorAll('.x-value input[type="number"]');
    const yInputFields = document.querySelectorAll('.y-value input[type="number"]');

    expect(xInputFields).toHaveLength(1);
    expect(yInputFields).toHaveLength(1);
});

// 2. Single click on "Add Values" button
test('clicking the add values button adds one more pair of X and Y input fields', async () => {
    initDomFromFiles(path.resolve(__dirname, './scatter.html'), path.resolve(__dirname, './scatter.js'));
    const user = userEvent.setup();
    const addValuesBtn = document.getElementById('add-values-btn');

    await user.click(addValuesBtn);

    const xInputFields = document.querySelectorAll('.x-value input[type="number"]');
    const yInputFields = document.querySelectorAll('.y-value input[type="number"]');

    expect(xInputFields).toHaveLength(2);
    expect(yInputFields).toHaveLength(2);
});

// 3. Multiple clicks on "Add Values" button
test('clicking the add values button multiple times adds multiple pairs of X and Y input fields', async () => {
    initDomFromFiles(path.resolve(__dirname, './scatter.html'), path.resolve(__dirname, './scatter.js'));
    const user = userEvent.setup();
    const addValuesBtn = document.getElementById('add-values-btn');

    await user.click(addValuesBtn);
    await user.click(addValuesBtn);

    const xInputFields = document.querySelectorAll('.x-value input[type="number"]');
    const yInputFields = document.querySelectorAll('.y-value input[type="number"]');

    expect(xInputFields).toHaveLength(3);
    expect(yInputFields).toHaveLength(3);
});

// 4. Test to ensure existing data remains unchanged after adding more input fields
test('existing data in input fields remains unchanged after adding more input fields', async () => {
    initDomFromFiles(path.resolve(__dirname, './scatter.html'), path.resolve(__dirname, './scatter.js'));
    const user = userEvent.setup();
    const addValuesBtn = document.getElementById('add-values-btn');

    const firstXInput = document.querySelector('.x-value input[type="number"]');
    const firstYInput = document.querySelector('.y-value input[type="number"]');
    await user.type(firstXInput, '5');
    await user.type(firstYInput, '10');

    await user.click(addValuesBtn);
    expect(firstXInput).toHaveValue(5); // Using number instead of string
    expect(firstYInput).toHaveValue(10);
    
});

// 5. Test to verify identification of input fields
// This test depends on how you implement the addition of input fields. Assuming that each newly added input field has a unique ID or class name, a test can be written to verify this.

// Alerts when trying to generate chart without axis labels
test('alerts when trying to generate chart without axis labels', async () => {
    initDomFromFiles(path.resolve(__dirname, './scatter.html'), path.resolve(__dirname, './scatter.js'));
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const user = userEvent.setup();
    const generateChartBtn = document.getElementById('generate-chart-btn');

    // Clearing the axis label input fields
    const xLabelInput = document.getElementById('x-label-input');
    const yLabelInput = document.getElementById('y-label-input');
    await user.clear(xLabelInput);
    await user.clear(yLabelInput);

    // Attempting to generate the chart
    await user.click(generateChartBtn);

    // Checking if the alert method was called
    expect(alertSpy).toHaveBeenCalled();

    // Cleaning up the mock
    alertSpy.mockRestore();
});

// Alerts when trying to generate chart without any data points
test('alerts when trying to generate chart without any data points', async () => {
    initDomFromFiles(path.resolve(__dirname, './scatter.html'), path.resolve(__dirname, './scatter.js'));
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const user = userEvent.setup();
    const generateChartBtn = document.getElementById('generate-chart-btn');

    // Filling in the axis labels, but not adding any data points
    const xLabelInput = document.getElementById('x-label-input');
    const yLabelInput = document.getElementById('y-label-input');
    await user.type(xLabelInput, 'X Axis');
    await user.type(yLabelInput, 'Y Axis');

    // Attempting to generate the chart
    await user.click(generateChartBtn);

    // Checking if the alert method was called
    expect(alertSpy).toHaveBeenCalled();

    // Cleaning up the mock
    alertSpy.mockRestore();
});

test('clearing chart data resets all inputs and data points', async () => {
    // Initializing DOM and loading JavaScript
    initDomFromFiles(path.resolve(__dirname, './scatter.html'), path.resolve(__dirname, './scatter.js'));
    const user = userEvent.setup();

    // Adding some data for clearance
    const chartTitleInput = document.getElementById('chart-title-input');
    const chartColorInput = document.getElementById('chart-color-input');
    const xLabelInput = document.getElementById('x-label-input');
    const yLabelInput = document.getElementById('y-label-input');
    const addValuesBtn = document.getElementById('add-values-btn');
    
    await user.type(chartTitleInput, 'Test Chart');
    await user.type(xLabelInput, 'Test X Label');
    await user.type(yLabelInput, 'Test Y Label');
    await user.click(addValuesBtn); // Adding an extra pair of data point inputs

    // Getting and clicking the "clear chart data" button
    const clearChartBtn = document.getElementById('clear-chart-btn');
    await user.click(clearChartBtn);

    // Checking if all inputs have been cleared and reset
    expect(chartTitleInput).toHaveValue('');
    expect(chartColorInput).toHaveValue('#ff4500'); // Assuming default color is black, adjust according to actual situation
    expect(xLabelInput).toHaveValue('');
    expect(yLabelInput).toHaveValue('');

    // Checking if data point inputs have been reset to just one pair
    const xInputFields = document.querySelectorAll('.x-value input[type="number"]');
    const yInputFields = document.querySelectorAll('.y-value input[type="number"]');
    expect(xInputFields).toHaveLength(1);
    expect(yInputFields).toHaveLength(1);
});

test('user input data is correctly sent to the chart generation function', async () => {
    // Setting up a spy on the generateChartImg function and providing a mock implementation
    jest.mock('../lib/generateChartImg.js');
    const generateChartImgMock = require('../lib/generateChartImg');
    generateChartImgMock.mockImplementation(() => 'http://placekitten.com/480/480');

    // Initializing DOM and loading JavaScript
    initDomFromFiles(path.resolve(__dirname, './scatter.html'), path    .resolve(__dirname, './scatter.js'));
    const user = userEvent.setup();

    // Filling in some chart data
    const chartTitleInput = document.getElementById('chart-title-input');
    const xLabelInput = document.getElementById('x-label-input');
    const yLabelInput = document.getElementById('y-label-input');
    const xValueInput = document.querySelector('.x-value input[type="number"]');
    const yValueInput = document.querySelector('.y-value input[type="number"]');
    
    await user.type(chartTitleInput, 'Test Chart');
    await user.type(xLabelInput, 'Test X Label');
    await user.type(yLabelInput, 'Test Y Label');
    await user.type(xValueInput, '5');
    await user.type(yValueInput, '10');

    // Getting and clicking the "generate chart" button
    const generateChartBtn = document.getElementById('generate-chart-btn');
    await user.click(generateChartBtn);

    // Checking if generateChartImg was correctly called and with the correct parameters
    expect(generateChartImgMock).toHaveBeenCalled();
    expect(generateChartImgMock).toHaveBeenCalledWith(
        expect.any(String), // The first argument passed to generateChartImg (chart type)
        [ // Second argument should be data for the chart
            expect.objectContaining({ x: '5', y: '10' })
        ],
        'Test X Label', // Third argument should be label for X axis
        'Test Y Label', // Fourth argument should be label for Y axis
        'Test Chart', // Fifth argument should be title for chart itself
        expect.anything() // Any other arguments passed to generateChartImg (if any)
    );

    // Cleaning up the mock
    generateChartImgMock.mockRestore();
});

