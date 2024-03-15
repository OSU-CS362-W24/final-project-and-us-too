/**
 * @jest-environment jsdom
 */

// Require statements
const storage = require('./chartStorage');
require("@testing-library/jest-dom")

// Helper functions for simulating the DOM
function createDomWithJS(jsPath)
{
    // Clear global document object's HTML
    document.open();
    document.write('<!DOCTYPE html><html></html>');
    document.close();

    // Load JS file
    jest.isolateModules(() =>
    {
        require(jsPath)
    });
}
function resetStorageDOM()
{
    createDomWithJS('./chartStorage.js');
}

/* _/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾ saveChart tests ‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_ */
describe('saveChart tests', () =>
{
    test('saves first chart successfully', () =>
    {
        resetStorageDOM();
        // Implement me!
    });
    test('saves five charts successfully', () =>
    {
        resetStorageDOM();
        // Implement me!
    });
    test('saves & overwrites a chart successfully', () =>
    {
        resetStorageDOM();
        // Implement me!
    });
});

/* _/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾ loadAllSavedCharts tests ‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_ */
describe('loadAllSavedCharts tests', () =>
{
    test('loads single saved chart successfully', () =>
    {
        resetStorageDOM();
        // Implement me!
    });
    test('loads five saved charts successfully', () =>
    {
        resetStorageDOM();
        // Implement me!
    });
});

/* _/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾ loadSavedChart tests ‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_ */
describe('loadAllSavedCharts tests', () =>
{
    test('loads first saved chart successfully', () =>
    {
        resetStorageDOM();
        // Implement me!
    });
    test('loads sixth saved chart successfully', () =>
    {
        resetStorageDOM();
        // Implement me!
    });
});

/* _/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾ updateCurrentChartData tests ‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_ */
describe('updateCurrentChartData tests', () =>
{
    test('saves current simple chart successfully', () =>
    {
        resetStorageDOM();
        // Implement me!
    });
    test('saves current complex chart successfully', () =>
    {
        resetStorageDOM();
        // Implement me!
    });
});

/* _/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾ loadCurrentChartData tests ‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_ */
describe('loadCurrentChartData tests', () =>
{
    test('loads current simple chart successfully', () =>
    {
        resetStorageDOM();
        // Implement me!
    });
    test('loads current complex chart successfully', () =>
    {
        resetStorageDOM();
        // Implement me!
    });
});
