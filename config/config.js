const conf = {};

const SECRET_KEY = process.env.SECRET_KEY;
const ENCODING = process.env.ENCODING;

conf.auth = {
  secret: Buffer.from(SECRET_KEY, ENCODING),
  tokenType: 'Bearer',
  algorithm: 'HS256',
  verifyOptions: { algorithms: [ 'HS256' ] }
};

conf.database = {
  uri: process.env.MONGO_DB_URI,
  options: {
    keepAlive: 300000,
    connectTimeoutMS: 300000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    promiseLibrary: global.Promise,
    useFindAndModify: false,
    useCreateIndex: true
  }
};

conf.pusher = {
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  encrypted: true
};

conf.firebase = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_DATABASE_URL
};


module.exports = conf;