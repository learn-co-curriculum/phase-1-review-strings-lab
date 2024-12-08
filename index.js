// Write your code in this file!
// Define the currentUser variable
const currentUser = 'Grace Hopper';

// Define the welcomeMessage variable, concatenating strings
const welcomeMessage = 'Welcome to Flatbook, ' + currentUser;

// Define the excitedWelcomeMessage variable, converting the welcomeMessage to uppercase
const excitedWelcomeMessage = welcomeMessage.toUpperCase();

// Define the shortGreeting variable, using only the first letter of currentUser
const shortGreeting = `Welcome, ${currentUser.slice(0, 1)}!`;
