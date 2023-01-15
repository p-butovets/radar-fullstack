const express = require('express');
const path = require('path');


const app = express();
app.use(express.json());

app.use('/api', require('./routes/auth.routes'));
app.use('/api', require('./routes/organizations.routes'));

const port = process.env.PORT ?? 5000;

if (process.env.NODE_ENV === 'production') {
    app.use("/", express.static(path.join(__dirname, "client", "build")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}

// Start the server 
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Server listening on port ${server.address().port} in ${process.env.NODE_ENV} mode`);
});
