//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
require('dotenv').config()
const { conn } = require('./src/db.js');
const createTypes = require('./src/Seeders/createTypes.js')
const port = process.env.PORT || 3001
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(port, () => {
    createTypes() //cada vez que se inicie el sv se crea la tabla types
    console.log('Server listening at Port 3001'); // eslint-disable-line no-console
  });
});
