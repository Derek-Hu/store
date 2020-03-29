export default (libName) => block => {
    if (!block) {
        return;
    }
    return {
        ...block,
        __lib__: libName,
        title: block.title || block.key || block.name,
        homepage: block.previewUrl,
        repository: block.url,
        screenshot: block.img,
        category: block.tags
    }
}

export const ICETransform = libName => block => {
    if (!block) {
        return;
    }
    block.__lib__ = libName;
    block.title = block.title || block.key || block.name;
}

export const isEmpty = v => v;