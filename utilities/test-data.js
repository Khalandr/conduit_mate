// utilities/test-data.js
const { faker } = require('@faker-js/faker');

/**
 * Generate test data for article creation
 * @returns {Object} Article data with title, description, body, and tags
 */
function generateArticleData() {
    return {
        title: faker.lorem.sentence(4).substring(0, 50),
        description: faker.lorem.sentence(8),
        body: faker.lorem.paragraphs(2),
        tagList: [faker.word.sample()]
    };
}

/**
 * Test data for login negative tests
 */
const invalidLoginData = {
    wrongCredentials: {
        email: 'nonexistent@example.com',
        password: 'wrongpassword',
        expectedError: 'is invalid'  // Part of "email or password is invalid"
    },
    emptyEmail: {
        email: '',
        password: 'anypassword',
        expectedError: "can't be blank"  // For email errors
    },
    emptyPassword: {
        email: 'test@example.com',
        password: '',
        expectedError: "can't be blank"  // For password errors
    }
};

module.exports = {
    generateArticleData,
    invalidLoginData
};

