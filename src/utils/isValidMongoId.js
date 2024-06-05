
const isValidMongoId = (id) => {
    const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    return checkForHexRegExp.test(id);
};

export default isValidMongoId;