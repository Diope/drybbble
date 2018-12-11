# Drybbble

This serves as a repository for my Dribbble clone made with MongoDB/Express/React.JS/Node.js. I have previously recreated Dribbble, calling it [Drubbble](https://github.com/diope/drubbble) using Rails 4.2 back in 2016-2017 (I will be updating that to Rails 5 in the coming weeks). I'm starting Drybbble from pure scratch and building up using the least amount of packages as possible trying my best to problem solve and create the necessary functinoality from scratch, I'll try to remember to make a new git branch when working on different features but I jump around a lot. 

### Important Note
Feel free to clone and use for your own use. In order for authentication to work, you will need to add two files to the config file. `private.key` & `public.key` then head over to [RSA Generator](http://travistidwell.com/jsencrypt/demo/) and copy and paste the output to the respective files, to include the key headers.

## Intended 1.0 features

The intended features on first go around are as follows:
  - The basic login/logout system
  - Ability to make a post with an image
  - Ability to leave comments

If possible much like my Rails Dribbble clone, I will look into account information being auto populated after username creation.

## Changelog

## December 10
* Ah I finally figured out why errors weren't displaying, in my `combinedReducer` I didn't set `errors` to `errorsReducer` as in `errors: errorsReducer` you can see how that would cause an issue when I'm looking for the related state called...`errors`.

## December 6th
* Added ability to edit user profile and refactored
* Added client side via CRA and creating the basic UI elements (login, signup, general auth form)
* Redux has been added as well, created store and and actions and reducers related to errors (easiest part to do atm)

### December 2nd
* Figured a way around multer not working with PUT/PATCH requests, thank you to my friend Jade who said random things that made me think of this.

### General October/November updates:
* Seems you cannot use multer on PUT/PATCH requests, so editing a post to change the photo is out until I can find a way around this.
* Added libraries for testing.
* Refactored many of the requests to be async/await instead of .then/.catch

### Sept 28:
* Image uploading has been added for posts, using Cloudinary for image hosting in lieu of storing locally. Unfortunately I'm having issues in regards to updating the user profile, avatar and background. 


### Sept 27:
* Refactored register route, having route (will pull out and make controller later) to handle validation before DB validation kicks in

### Sept 25:
* Refactored Post GET route to account for entering the wrong slug.
* Added ability to leave comments on posts.

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

### Sept 17th:
* Initial Commit
* Basic post model created (title, content)
* Added first post route (POST)
* Pulled routes out from server.js file, and created a routes folder within the API folder



