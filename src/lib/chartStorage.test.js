/**
 * @jest-environment jsdom
 */

// Require statements
const storage = require('./chartStorage');
require("@testing-library/jest-dom")

// Helper function for simulating the DOM
function resetGlobalDOM()
{
    // Clear global document object's HTML
    document.open();
    document.write('<!DOCTYPE html><html></html>');
    document.close();
}

/* _/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾ saveChart tests ‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_ */
describe('saveChart tests', () =>
{
    test('saves first chart successfully', () =>
    {
        resetGlobalDOM();
        // Implement me!
    });
    test('saves five charts successfully', () =>
    {
        resetGlobalDOM();
        // Implement me!
    });
    test('saves & overwrites a chart successfully', () =>
    {
        resetGlobalDOM();
        // Implement me!
    });
});

/* _/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾ loadAllSavedCharts tests ‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_ */
describe('loadAllSavedCharts tests', () =>
{
    test('loads single saved chart successfully', () =>
    {
        resetGlobalDOM();
        // Implement me!
    });
    test('loads five saved charts successfully', () =>
    {
        resetGlobalDOM();
        // Implement me!
    });
});

/* _/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾ loadSavedChart tests ‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_ */
describe('loadAllSavedCharts tests', () =>
{
    test('loads first saved chart successfully', () =>
    {
        resetGlobalDOM();
        // Implement me!
    });
    test('loads sixth saved chart successfully', () =>
    {
        resetGlobalDOM();
        // Implement me!
    });
});

/* _/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾ updateCurrentChartData tests ‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_ */
describe('updateCurrentChartData tests', () =>
{
    test('saves current simple chart successfully', () =>
    {
        resetGlobalDOM();
        // Implement me!
    });
    test('saves current complex chart successfully', () =>
    {
        resetGlobalDOM();
        // Implement me!
    });
});

/* _/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾ loadCurrentChartData tests ‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_ */
describe('loadCurrentChartData tests', () =>
{
    test('loads current simple chart successfully', () =>
    {
        resetGlobalDOM();
        // Implement me!
    });
    test('loads current complex chart successfully', () =>
    {
        resetGlobalDOM();
        // Implement me!
    });
});
