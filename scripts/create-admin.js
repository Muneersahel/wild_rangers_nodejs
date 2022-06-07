const prompt = require('prompt');
const { user: User } = require('../src/models/index.model');

const schema = {
    properties: {
        name: {
            pattern: /^[a-zA-Z\s\-]+$/,
            message: 'Name must contain only letters, spaces, or dashes.',
            required: true,
            description: 'Enter name',
        },
        email: {
            pattern:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            message: 'Email must be a valid email address.',
            required: true,
            description: 'Enter email',
        },
        password: {
            hidden: true,
            required: true,
            description: 'Enter password',
        },

        confirmPassword: {
            hidden: true,
            required: true,
            description: 'Confirm password',
        },
    },
};

prompt.start();
prompt.get(schema, async (_err, result) => {
    if (result.password === result.confirmPassword) {
        const user = await User.findOne({
            where: {
                email: result.email,
            },
        });

        if (user) {
            console.log(`User with email ${result.email} already exists`);
        } else {
            const newUser = await User.create({
                name: result.name,
                email: result.email,
                password: result.password,
                isAdmin: true,
            });
            console.log(
                `Admin with email ${newUser.email} created successfully`
            );
        }
    } else {
        console.log('Error - passwords do not match');
    }
});
