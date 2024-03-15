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


/* _/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾ loadSavedChart tests ‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_ */


/* _/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾ updateCurrentChartData tests ‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_ */


/* _/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾ loadCurrentChartData tests ‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_ */

