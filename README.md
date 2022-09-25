# An assessment webapp, made using reactjs
A quiz app, uses *opentrivia* database for various questions.
For Images *pixels* is used.
All the login credentials, along with the attempts are saved in *firebase*.

## What I learned
While making this project I learned about the firebase integration with the webapp.
Along with that I learned various react best practices.

## How it works
When visiting the website, the user is asked for the credentials, a single uuid is required
for logging in. If its his/her first time, they can create a new uuid which will be saved in the firebase 
realtime database and on the local storage of the user machine, saving the time for memorinzing the 
long uuid. As the user attempts the tests, the result is saveed along with the date.

## Technologies used
* Firebase
* ReactJs

<!--     What the project does
    Why the project is useful
    How users can get started with the project
    Where users can get help with your project
    Who maintains and contributes to the project -->
