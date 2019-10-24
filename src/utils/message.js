const generateMessage = (text) => {
    return {
        message: text,
        createdAt: new Date().getTime()
    };
}

const generateLocationMessage = (url) => {
    return {
        url,
        createdAt: new Date().getTime()
    };
}

module.exports = {
    generateLocationMessage, generateMessage
};