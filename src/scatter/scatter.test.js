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

// 1. 初始状态测试
test('initially there is only one pair of X and Y input fields', () => {
    initDomFromFiles(path.resolve(__dirname, './scatter.html'), path.resolve(__dirname, './scatter.js'));

    const xInputFields = document.querySelectorAll('.x-value input[type="number"]');
    const yInputFields = document.querySelectorAll('.y-value input[type="number"]');

    expect(xInputFields).toHaveLength(1);
    expect(yInputFields).toHaveLength(1);
});

// 2. 单次点击“添加值”按钮
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

// 3. 多次点击“添加值”按钮
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

// 4. 已有数据不受影响测试
test('existing data in input fields remains unchanged after adding more input fields', async () => {
    initDomFromFiles(path.resolve(__dirname, './scatter.html'), path.resolve(__dirname, './scatter.js'));
    const user = userEvent.setup();
    const addValuesBtn = document.getElementById('add-values-btn');

    const firstXInput = document.querySelector('.x-value input[type="number"]');
    const firstYInput = document.querySelector('.y-value input[type="number"]');
    await user.type(firstXInput, '5');
    await user.type(firstYInput, '10');

    await user.click(addValuesBtn);
    expect(firstXInput).toHaveValue(5); // 使用数字而不是字符串
    expect(firstYInput).toHaveValue(10);
    
});

// 5. 输入字段的标识验证
// 这个测试取决于你如何实现输入字段的添加。假设每个新添加的输入字段都有一个唯一的 ID 或类名，可以编写测试来验证这一点。

// 没有提供坐标轴标签时尝试生成图表
test('alerts when trying to generate chart without axis labels', async () => {
    initDomFromFiles(path.resolve(__dirname, './scatter.html'), path.resolve(__dirname, './scatter.js'));
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const user = userEvent.setup();
    const generateChartBtn = document.getElementById('generate-chart-btn');

    // 清空坐标轴标签输入框
    const xLabelInput = document.getElementById('x-label-input');
    const yLabelInput = document.getElementById('y-label-input');
    await user.clear(xLabelInput);
    await user.clear(yLabelInput);

    // 尝试生成图表
    await user.click(generateChartBtn);

    // 检查是否调用了 alert 方法
    expect(alertSpy).toHaveBeenCalled();

    // 清理 mock
    alertSpy.mockRestore();
});

// 没有提供任何数据点时尝试生成图表
test('alerts when trying to generate chart without any data points', async () => {
    initDomFromFiles(path.resolve(__dirname, './scatter.html'), path.resolve(__dirname, './scatter.js'));
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const user = userEvent.setup();
    const generateChartBtn = document.getElementById('generate-chart-btn');

    // 填写坐标轴标签，但不添加数据点
    const xLabelInput = document.getElementById('x-label-input');
    const yLabelInput = document.getElementById('y-label-input');
    await user.type(xLabelInput, 'X Axis');
    await user.type(yLabelInput, 'Y Axis');

    // 尝试生成图表
    await user.click(generateChartBtn);

    // 检查是否调用了 alert 方法
    expect(alertSpy).toHaveBeenCalled();

    // 清理 mock
    alertSpy.mockRestore();
});

test('clearing chart data resets all inputs and data points', async () => {
    // 初始化 DOM 和加载 JavaScript
    initDomFromFiles(path.resolve(__dirname, './scatter.html'), path.resolve(__dirname, './scatter.js'));
    const user = userEvent.setup();

    // 先添加一些数据以便清除
    const chartTitleInput = document.getElementById('chart-title-input');
    const chartColorInput = document.getElementById('chart-color-input');
    const xLabelInput = document.getElementById('x-label-input');
    const yLabelInput = document.getElementById('y-label-input');
    const addValuesBtn = document.getElementById('add-values-btn');
    
    await user.type(chartTitleInput, 'Test Chart');
    await user.type(xLabelInput, 'Test X Label');
    await user.type(yLabelInput, 'Test Y Label');
    await user.click(addValuesBtn); // 添加一对额外的数据点输入

    // 获取并点击“清除图表数据”按钮
    const clearChartBtn = document.getElementById('clear-chart-btn');
    await user.click(clearChartBtn);

    // 检查所有输入是否被清除并重置
    expect(chartTitleInput).toHaveValue('');
    expect(chartColorInput).toHaveValue('#ff4500'); // 假设默认颜色为黑色，根据实际情况调整
    expect(xLabelInput).toHaveValue('');
    expect(yLabelInput).toHaveValue('');

    // 检查数据点输入是否被重置到只有一对
    const xInputFields = document.querySelectorAll('.x-value input[type="number"]');
    const yInputFields = document.querySelectorAll('.y-value input[type="number"]');
    expect(xInputFields).toHaveLength(1);
    expect(yInputFields).toHaveLength(1);
});

const chartUtils = require('../chartBuilder');

test('user input data is correctly sent to the chart generation function', async () => {
    // 初始化 DOM 和加载 JavaScript
    initDomFromFiles(path.resolve(__dirname, './scatter.html'), path.resolve(__dirname, './scatter.js'));
    const user = userEvent.setup();

    // 在 generateChartImg 函数上设置 spy，并提供一个 mock 实现
    const generateChartImgSpy = jest.spyOn(chartUtils, 'generateChartImg').mockImplementation(() => 'http://placekitten.com/480/480');

    // 填写一些图表数据
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

    // 获取并点击“生成图表”按钮
    const generateChartBtn = document.getElementById('generate-chart-btn');
    await user.click(generateChartBtn);

    // 检查 generateChartImg 是否被正确调用，以及调用时的参数
    expect(generateChartImgSpy).toHaveBeenCalled();
    expect(generateChartImgSpy).toHaveBeenCalledWith(
        expect.any(String), // 传递给 generateChartImg 的第一个参数（图表类型）
        expect.objectContaining({ // 传递给 generateChartImg 的第二个参数（图表数据）
            title: 'Test Chart',
            xLabel: 'Test X Label',
            yLabel: 'Test Y Label',
            data: expect.arrayContaining([
                expect.objectContaining({ x: '5', y: '10' })
            ])
        }),
        expect.anything(), // 传递给 generateChartImg 的其他参数（如果有的话）
    );

    // 清理 mock
    generateChartImgSpy.mockRestore();
});