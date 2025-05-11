// utilities/api.js
const { request } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

/**
 * Creates a unique user via API
 * @returns {Promise<{email: string, username: string, password: string, token: string}>}
 */
async function registerNewUser() {
    const timestamp = new Date().getTime();
    const randomValue = Math.floor(Math.random() * 1000000);

    const username = `user_${timestamp}_${randomValue}`;
    const email = `user_${timestamp}_${randomValue}@example.com`;
    const password = faker.internet.password();

    const apiContext = await request.newContext({
        baseURL: 'https://conduit.mate.academy',
    });

    const registerResponse = await apiContext.post('/api/users', {
        data: {
            user: {
                username,
                email,
                password,
            }
        }
    });

    if (!registerResponse.ok()) {
        throw new Error(`Failed to register: Status ${registerResponse.status()} - ${registerResponse.statusText()}`);
    }

    const responseData = await registerResponse.json();
    const token = responseData.user.token;

    await apiContext.dispose();

    return {
        username,
        email,
        password,
        token
    };
}

module.exports = {
    registerNewUser
};