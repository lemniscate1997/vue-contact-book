global.express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');
const helmet = require('helmet');
// const pgSession = require('connect-pg-simple')(session);
// const { Pool } = require('pg');
require('dotenv').config();
const PORT = process.env.PORT;

global.app = express();

const corsOptions = {
    origin: ['http://localhost:8080'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
}
app.use(cors(corsOptions));
app.use(helmet());
app.use(helmet.noCache());
app.use(
    session({
        // store: new pgSession({
        //     pool: new Pool({
        //         user: process.env.DATABASE_USERNAME,
        //         host: process.env.DATABASE_HOST,
        //         database: process.env.SESSION_DATABASE_NAME,
        //         password: process.env.DATABASE_PASSWORD,
        //         port: Number(process.env.DATABASE_PORT),
        //     })
        // }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: false,
            secureProxy: app.SSL,
            secure: 'auto',
            maxAge: 1000 * 30000
        }
    })
);

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'))

app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(passport.initialize());
app.use(passport.session());

require('./router');
require('./middlewares/passport').initialize();

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
});