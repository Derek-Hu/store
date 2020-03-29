// overwrite the `languages` property to use a custom getter
Object.defineProperty(navigator, "languages", {
    get: function () {
        return ["zh-CN", "zh"];
    }
});