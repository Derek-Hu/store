export default (libName) => block => {
    if (!block) {
        return;
    }
    return {
        ...block,
        name: block.key,
        __lib__: libName,
        homepage: block.previewUrl,
        repository: block.url,
        screenshot: block.img,
        category: block.tags
    }
}