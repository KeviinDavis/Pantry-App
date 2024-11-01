// module.exports = (req, res, next) => {
//   if (!req.session.user) {
//       console.log("Redirecting to sign-in, user not found in session.");
//       return res.redirect('/auth/sign-in');
//   }
//   console.log("User session found, continuing to next middleware.");
//   next();
// };
