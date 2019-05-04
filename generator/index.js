// generator/index.js
module.exports = (api, options, rootOptions) => {
    // 引入依赖
    api.extendPackage({
        dependencies: {
            "axios": "0.17.1",
            "element-ui": "2.5.4",
            "lodash": "4.17.11",
            "reset-css": "4.0.1"
        },
        scripts: {
            "serve": "vue-cli-service serve --open",
            "testBuild": "vue-cli-service build --mode=test"
        },
    });
    // 引入文件
    let rxLines = `\nimport 'reset-css'\nimport Element from 'element-ui'\n\nVue.use(Element)`;
    api.onCreateComplete(() => {
        const fs = require('fs');
        const mainPath = api.resolve('./src/main.js');
        // 获取内容
        let contentMain = fs.readFileSync(mainPath, { encoding: 'utf-8' });
        const lines = contentMain.split(/\r?\n/g).reverse();
        // 注入import
        const lastImportIndex = lines.findIndex(line => line.match(/^import/));
        lines[lastImportIndex] += rxLines;
        // 修改应用
        contentMain = lines.reverse().join('\n');
        fs.writeFileSync(mainPath, contentMain, { encoding: 'utf-8' });
    });
    // 添加模板文件
    if (options.addExample) {
        api.render('./template');
    }
}
