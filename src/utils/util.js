export const copyFirebaseObjWithoutKey = (item, key) => {
    const copyItem = Object.assign({}, item);
    delete copyItem['.key'];
    copyItem[key.key] = !copyItem[key.key];
    return copyItem;
};