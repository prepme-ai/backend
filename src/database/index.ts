const mongoose = require('mongoose');

export default async function () {
    const dbUri = process.env.ATLAS_URI;
    console.log(dbUri)
    mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const connection = mongoose.connection;
    connection.once('open', () => console.log('Mongo is connected'));

}

