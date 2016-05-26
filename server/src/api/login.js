import auth0 from 'auth0';
import config from '../config/config';

var auth = new auth0.AuthenticationClient({
  domain: config.AUTH0_DOMAIN,
  clientId: config.AUTH0_CLIENT_ID
});

export default async function(req, res) {
  const { email, login, password } = req.body;

  auth.database.signIn({username: login, email, password, scope: 'openid email'}, (err, userData) => {
    if (err) return res.status(err.statusCode).json({ success: false, message: err.name });
    res.status(200).json({
      success: true,
      token: userData.id_token
    });
  });
}
