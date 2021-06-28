const express = require('express')
const app = express()
const port = 3000
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.static('public'));
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})