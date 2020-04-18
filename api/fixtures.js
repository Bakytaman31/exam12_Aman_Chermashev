const mongoose = require('mongoose');
const config = require('./config');
const {nanoid} = require("nanoid");

const User = require('./models/User');
const Picture = require('./models/Picture');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [user1, user2, user3] = await User.create({
        username: 'user1',
        password: 'user',
        displayName: 'User1',
        token: nanoid()
    }, {
        username: 'user2',
        password: 'user',
        displayName: 'User2',
        token: nanoid()
    }, {
        username: 'user3',
        password: 'user',
        displayName: 'User3',
        token: nanoid()
    });

    await Picture.create({
        title: 'Image 1',
        image: 'uploads/fixtures/img1.jpeg',
        author: user1
    }, {
        title: 'Image 2',
        image: 'uploads/fixtures/img2.jpeg',
        author: user1
    }, {
        title: 'Image 3',
        image: 'uploads/fixtures/img3.jpeg',
        author: user2
    }, {
        title: 'Image 4',
        image: 'uploads/fixtures/img4.jpeg',
        author: user2
    }, {
        title: 'Image 5',
        image: 'uploads/fixtures/img5.jpeg',
        author: user3
    }, {
        title: 'Image 6',
        image: 'uploads/fixtures/img6.jpeg',
        author: user3
    });

    mongoose.connection.close();
};

run().catch(e => {
    mongoose.connection.close();
    throw e;
});