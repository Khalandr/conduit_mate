const { faker } = require('@faker-js/faker');

function generateUserData() {
    const timestamp = new Date().getTime();
    const randomValue = Math.floor(Math.random() * 1000000);

    return {
        username: `user_${timestamp}_${randomValue}`,
        email: `user_${timestamp}_${randomValue}@example.com`,
        password: faker.internet.password()
    };
}

function generateArticleData() {
    return {
        title: faker.lorem.sentence(4).substring(0, 50),
        description: faker.lorem.sentence(8),
        body: faker.lorem.paragraphs(2),
        tagList: [faker.word.sample()]
    };
}

const invalidArticleData = {
    emptyTitle: {
        title: '',
        description: 'This is a description for an article with empty title',
        body: 'This is the body content for testing validation of the title field.',
        tagList: ['test'],
        expectedError: 'Article title cannot be empty'
    },
    emptyDescription: {
        title: 'Article with Empty Description',
        description: '',
        body: 'This is the body content for testing validation of the description field.',
        tagList: ['test'],
        expectedError: 'Article description cannot be empty'
    },
    emptyBody: {
        title: 'Article with Empty Body',
        description: 'This is a description for an article with empty body',
        body: '',
        tagList: ['test'],
        expectedError: 'Article body cannot be empty'
    }
};

const invalidLoginData = {
    wrongCredentials: {
        email: 'nonexistent@example.com',
        password: 'wrongpassword',
        expectedError: 'is invalid'
    },
    emptyEmail: {
        email: '',
        password: 'anypassword',
        expectedError: 'can\'t be blank'
    },
    emptyPassword: {
        email: 'test@example.com',
        password: '',
        expectedError: 'can\'t be blank'
    }
};

module.exports = {
    generateUserData,
    generateArticleData,
    invalidArticleData,
    invalidLoginData
};

