const { request } = require('@playwright/test');
const { generateUserData } = require('./test-data');

async function registerNewUser() {
    const userData = generateUserData();

    const apiContext = await request.newContext({
        baseURL: 'https://conduit.mate.academy',
    });

    const registerResponse = await apiContext.post('/api/users', {
        data: {
            user: {
                username: userData.username,
                email: userData.email,
                password: userData.password
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
        username: userData.username,
        email: userData.email,
        password: userData.password,
        token
    };
}

module.exports = {
    registerNewUser
};