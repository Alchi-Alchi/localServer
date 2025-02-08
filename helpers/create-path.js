const path = require ('path');
const createPath = (page) => path.resolve(__dirname, '../pages', `${page}.ejs`);
module.exports = createPath;