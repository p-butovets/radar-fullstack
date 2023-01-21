const express = require('express');
const path = require('path');
const mongoose = require('mongoose');


const app = express();
app.use(express.json());

app.use('/api', require('./routes/auth.routes'));
app.use('/api', require('./routes/organizations.routes'));
app.use('/admin', require('./routes/user.routes'));

const port = process.env.PORT ?? 5000;

if (process.env.NODE_ENV === 'production') {
    app.use("/", express.static(path.join(__dirname, "client", "build")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
}

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        // Start the server 
        const server = app.listen(port, (error) => {
            if (error) return console.log(`Error: ${error}`);
            console.log(`Server listening on port ${server.address().port} in ${process.env.NODE_ENV} mode`);
        });
    } catch (error) {
        console.log('Server error: ' + error.message);
        process.exit(1);
    }
};

start();


