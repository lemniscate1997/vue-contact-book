const contact = require('./features/contact/contactApi');

require('./utils/auth');

app.all('*', (request, response, next) => {
    if (request.isAuthenticated()) {
        console.log(request.user);
        next();
    } else {
        response.status(404).json({ message: 'Unauthorized request' });
    }
});

app.use('/contact', contact);

require('./utils/error');