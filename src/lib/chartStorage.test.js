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
        // Initializes DOM & creates chart
        resetGlobalDOM();
        var chart =
        {
            type: 'bar',
            data:
            {
              labels: ['label1', 'label2', 'label3'],
              datasets:
              [{
                label: 'Data',
                data: [9, 235, 52],
              }]
            }
        };

        // Save the chart
        storage.saveChart(chart, 0);

        // Load saved chart and asserts that loaded is the same
        var chart2 = JSON.parse(window.localStorage.getItem("savedCharts"))[0];
        expect(chart2).toEqual(chart);
    });
    test('saves five charts successfully', () =>
    {
        // Initializes DOM & creates charts
        resetGlobalDOM();
        var charts =
        [
            {
                type: 'bar',
                data:
                {
                  labels: ['label1', 'label2', 'label3'],
                  datasets:
                  [{ label: 'Data', data: [9, 235, 52], }]
                }
            },
            {
                type: 'line',
                data:
                {
                  labels: ['l1', 'l2', 'l3', 'l4', 'l5', 'l5', 'lLongNum'],
                  datasets:
                  [{ label: 'Data', data: [1, 2, 3, 4, 5, 6, 23952.35], }]
                }
            },
            {
                type: 'bar',
                data:
                {
                  labels: ['label5', 'label9', 'l4bel52', 'label-28'],
                  datasets:
                  [{ label: 'Nums', data: [5.2, 9, 52, -28], }]
                }
            },
            {
                type: 'line',
                data:
                {
                  labels: ['label'],
                  datasets:
                  [{ label: 'Date', data: [2024], }]
                }
            },
            {
                type: 'pie',
                data:
                {
                  labels: ['section1', 'section2'],
                  datasets:
                  [{ data: [65, 35], }]
                }
            },
        ];

        // Saves the charts
        for (var i = 0; i < charts.length; i++)
            storage.saveChart(charts[i], i);

        // Load saved charts and asserts that loaded ones are the same
        for (var i = 0; i < charts.length; i++)
        {
            var chart2 = JSON.parse(window.localStorage.getItem("savedCharts"))[i];
            expect(chart2).toEqual(charts[i]);
        }
    });
    test('saves & overwrites a chart successfully', () =>
    {
        // Initializes DOM & creates charts
        resetGlobalDOM();
        var chart1 =
        {
            type: 'bar',
            data:
            {
              labels: ['label1', 'label2', 'label3', 'label4'],
              datasets:
              [{
                label: 'Data',
                data: [20, -902, 19, 23],
              }]
            }
        };
        var chart2 =
        {
            type: 'pie',
            data:
            {
              labels: ['group 1', 'group 2', 'group 3'],
              datasets:
              [{ data: [12, 52, 36] }]
            }
        };

        // Saves chart 1 in index 0
        storage.saveChart(chart1, 0);
        // Overwrites chart in index 0 with index 2
        storage.saveChart(chart2, 0);

        // Load saved chart and asserts that it is the most recent one
        var loaded = JSON.parse(window.localStorage.getItem("savedCharts"))[0];
        expect(loaded).not.toEqual(chart1);
        expect(loaded).toEqual(chart2);
    });
});

/* _/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾ loadAllSavedCharts tests ‾\_/‾\_/‾\_/‾\_/‾\_/‾\_/‾\_ */
describe('loadAllSavedCharts tests', () =>
{
    test('loads single saved chart successfully', () =>
    {
        // Initializes DOM & creates chart
        resetGlobalDOM();
        var chart =
        {
            type: 'bar',
            data:
            {
              labels: ['label1', 'label2', 'label3'],
              datasets:
              [{
                label: 'Data',
                data: [9, 235, 52],
              }]
            }
        };

        // Save the chart
        storage.saveChart(chart, 0);
        // Loads it back
        var chart2 = storage.loadSavedChart(0);

        // Assert that charts remain the same
        expect(chart2).toEqual(chart);
    });
    test('loads five saved charts successfully', () =>
    {
        // Initializes DOM & creates charts
        resetGlobalDOM();
        var charts =
        [
            {
                type: 'bar',
                data:
                {
                  labels: ['label1', 'label2', 'label3'],
                  datasets:
                  [{ label: 'Data', data: [9, 235, 52], }]
                }
            },
            {
                type: 'line',
                data:
                {
                  labels: ['l1', 'l2', 'l3', 'l4', 'l5', 'l5', 'lLongNum'],
                  datasets:
                  [{ label: 'Data', data: [1, 2, 3, 4, 5, 6, 23952.35], }]
                }
            },
            {
                type: 'bar',
                data:
                {
                  labels: ['label5', 'label9', 'l4bel52', 'label-28'],
                  datasets:
                  [{ label: 'Nums', data: [5.2, 9, 52, -28], }]
                }
            },
            {
                type: 'line',
                data:
                {
                  labels: ['label'],
                  datasets:
                  [{ label: 'Date', data: [2024], }]
                }
            },
            {
                type: 'pie',
                data:
                {
                  labels: ['section1', 'section2'],
                  datasets:
                  [{ data: [65, 35], }]
                }
            },
        ];

        // Saves the charts
        for (var i = 0; i < charts.length; i++)
            storage.saveChart(charts[i], i);
        var charts2 = Array(charts.length);
        // Loads each chart
        for (var i = 0; i < charts.length; i++)
            charts2[i] = storage.loadSavedChart(i);

        // Assert that every loaded chart is equivalent
        for (var i = 0; i < charts.length; i++)
        {
            expect(charts2[i]).toEqual(charts[i]);
        }
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
