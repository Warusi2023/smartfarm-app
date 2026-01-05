/**
 * Mock Nodemailer
 * Mocks email sending for testing
 */

const nodemailer = {
    createTransport: jest.fn(() => ({
        sendMail: jest.fn((options, callback) => {
            const result = {
                messageId: 'test-message-id',
                accepted: [options.to],
                rejected: [],
                pending: [],
                response: '250 OK'
            };
            
            if (callback) {
                callback(null, result);
            }
            
            return Promise.resolve(result);
        }),
        verify: jest.fn((callback) => {
            if (callback) {
                callback(null, true);
            }
            return Promise.resolve(true);
        })
    }))
};

module.exports = nodemailer;

