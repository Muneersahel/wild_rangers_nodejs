const path = require('path');
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const sequelizeConnectSession = require('connect-session-sequelize');

const { config } = require('./src/config/variables.config');
const db = require('./src/models/index.model');

const authRoutes = require('./src/routes/auth.routes');
const rangerRoutes = require('./src/routes/ranger.routes');

const isProduction = config.nodeEnv === 'production';

const app = express();
const port = config.server.port;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', 'src/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'src/public')));

const SequelizeStore = sequelizeConnectSession(session.Store);
app.use(
    session({
        secret: config.secretKey,
        store: new SequelizeStore({
            db: db.sequelize,
            expiration: 1000 * 60 * 60 * 24, // 1 day
        }),
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        resave: false,
        saveUninitialized: false,
    })
);

app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isAuthenticated;
    res.locals.user = req.session.user;
    next();
});

app.use(authRoutes);
app.use(rangerRoutes);

app.all('*', (req, res, next) => {
    res.redirect('/dashboard');
});

//Error handlers & middlewares
if (!isProduction) {
    app.use((err, req, res) => {
        res.status(err.status || 500);

        res.json({
            errors: {
                message: err.message,
                error: err,
            },
        });
    });
}

app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
        errors: {
            message: err.message,
            error: {},
        },
    });
});

db.sequelize
    .sync()
    .then(() => {
        console.info('Database connected successfully');
        app.listen(port, 'localhost', () => {
            console.info(`Server is running on port: ${port}`);
        });
    })
    .catch((err) => {
        console.error('Database connection failed', err);
    });
