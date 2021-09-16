const HttpError = require("../models/http-error");
const jwt = require('jsonwebtoken');
const User = require("../models/user");


// const login = (req, res, next) => {
//   const {email, password} = req.body;
//   const identifiedUser = DUMMER_USERS.find(u => u.email === email);
//   if (!identifiedUser) {
//     throw new HttpError('Could not identify user, credentials seem to be wrong', 401);
//   }
//   res.json({message: 'logged in'});
// };

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }
  
  if (!existingUser) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  const isValidPassword = (password === existingUser.password);

  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  console.log(existingUser);

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  console.log(email);
  res.json({
    userId: existingUser.uid,
    email: existingUser.email,
    token: token
  });
};

exports.login = login;