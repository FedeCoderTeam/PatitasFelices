const { conn } = require('./src/database/db')
const server = require('./src/app')

conn.sync({force: true}).then(() => {
    server.listen(3001, () => {
        console.log('listening at 3001');
    })
})