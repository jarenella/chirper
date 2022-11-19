//function that authenticates if the user is currently logged in

const authLogIn = (req, res, next) => {
    if (!req.session.logged_in) { //if user not logged in
        res.redirect('/login'); // then send them to the login page
    }
    else { //if they are logged in
        next(); //continue on to the next function
    }
};

module.exports = authLogIn;