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

