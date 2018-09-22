# Drybbble

This serves as a repository for my Dribbble clone made with MongoDB/Express/React.JS/Node.js. I have previously recreated Dribbble, calling it [Drubbble](https://github.com/diope/drubbble) using Rails 4.2 back in 2016-2017 (I will be updating that to Rails 5 in the coming weeks). I'm starting Drybbble from pure scratch and building up using the least amount of packages as possible trying my best to problem solve and create the necessary functinoality from scratch, I'll try to remember to make a new git branch when working on different features but I jump around a lot. 

Feel free to clone and use for your own use. In order for authentication to work, you will need to add two files to the config file. `private.key` & `public.key` then head over to [RSA Generator](http://travistidwell.com/jsencrypt/demo/) and copy and paste the output to the respective files, to include the key headers.

## Intended 1.0 features

The intended features on first go around are as follows:
  - The basic login/logout system
  - Ability to make a post with an image
  - Ability to like a post
  - Ability to leave comments

If possible much like my Rails Dribbble clone, I will look into account information being auto populated after username creation.

## Changelog

### Sept 22:
* Added JWT token passing to login API endpoint

### Sept 21:
* A lot of refactoring, redid the user registration API endpoint and fixed user messaging to be user facing and friendly
* Added the login endpoint

### Sept 18th:
* Added User model (username, email, password) and user route (only creating a user so far)
* Added bcrypt, and passwords are being hashed before being placed on server (passwords are not in plain text anywhere, yatta!)
* Added slug to post, and the ability to retrieve a post by supplying the slug. Also added the basic comment model.
* Added delete user route

Sept 17th:
* Initial Commit
* Basic post model created (title, content)
* Added first post route (POST)
* Pulled routes out from server.js file, and created a routes folder within the API folder



