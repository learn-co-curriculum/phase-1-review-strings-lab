# Strings Lab Introduction

## Problem Statement 
In this lab introduction, we're going to take a deep dive into strings in JavaScript by walking you through the process of running tests in the Learn environment, and submitting a lab. We're also going to familiarize ourselves with the structure and flow of the JavaScript labs in the Learn.co curriculum.

For this lab, you've just been onboarded to the dev team working on Flatbook, the world's premier Flatiron School-based social network. At the moment, the view that our users see upon logging in is pretty generic. We'd like to improve the user experience by adding some custom greeting capabilities.

The only file you need to modify is `index.js`. Save the file every time you make a change to it, and the test suite in your browser will automatically re-run itself and push the results to Learn. When all of the tests are passing at the end of the code-along, the `Run Local Tests` light on the Learn.co lesson page will turn green.

## Objectives
1. Run the test suite for a JavaScript lab on Learn.co
2. Work through failing tests in a JavaScript test suite
3. Concatenate strings with the `+` operator
4. Interpolate variables and other JavaScript expressions inside template literals
5. Read the MDN documentation on string methods and practice using a few
6. Submit a pull request after successfully completing a lab

## Run the Test Suite for a JavaScript Lab on Learn.co
To start off, let's run the test suite with the `learn` command. If you're coding along in a local environment, a browser window should automatically open when you run the command. If you're in the IDE, follow the instructions that appear after you run the `learn` command.

Once you have `index.js` open in the IDE (or your local text editor) and the correct page open in your browser, you're ready to go.

Before we've written any code, the test suite in the browser looks pretty intimidating:

![All tests failing](https://curriculum-content.s3.amazonaws.com/web-development/js/basics/strings-code-along/all_tests_failing.png)

Our code is currently failing all of the tests, but we expected that because we haven't done anything yet. Let's get to work!

Right off the bat, let's [open the browser's JavaScript console][open JS console] so that we can play around with our code as we modify `index.js`:

![JavaScript console open](https://curriculum-content.s3.amazonaws.com/web-development/js/basics/strings-code-along/javascript_console_open.png)

## Work Through Failing Tests in a JavaScript Test Suite
#### `currentUser`
The first test is telling us that `currentUser` is not defined. Let's verify that in the console by typing `currentUser`:

![Checking the value of currentUser in the console](https://curriculum-content.s3.amazonaws.com/web-development/js/basics/strings-code-along/checking_values_in_console.png)

This gives us a `ReferenceError`. In this case, the `ReferenceError` is telling us that `currentUser` is undefined. That lets us know that we need to declare a new variable named `currentUser`. Let's go to `index.js` and write the following code:
```js
const currentUser = 'Grace Hopper';
```

***NOTE***: Generally, when Learn asks you to define something, you want to define it exactly as Learn asks you to define it. But in this case, you don't have to write `'Grace Hopper'`, because the important part is the variable name: *currentUser*.  You can use your own name, your pet's name, your favorite programmer's name — whatever you'd like.

If we save `index.js` after writing that code, the test suite will automatically re-run itself in the browser, and we should now see one passing test:

![One passing test](https://curriculum-content.s3.amazonaws.com/web-development/js/basics/strings-code-along/one_passing_test.png)

Congratulations! You've just written your first passing JavaScript test!


#### `welcomeMessage`
The next failing test is similarly helpful, telling us exactly what we have to fix: `welcomeMessage contains "Welcome to Flatbook, "`.

Let's return to `index.js` and define our second variable below where we declared `currentUser`:
```js
const currentUser = 'Grace Hopper';

const welcomeMessage = 'Welcome to Flatbook, ';
```

When we save `index.js`, we should see a second passing test:
![Two passing tests](https://curriculum-content.s3.amazonaws.com/web-development/js/basics/strings-code-along/two_passing_tests.png)

The third test tells us that `welcomeMessage` should contain the value stored in `currentUser`. This seems like it might contradict the second test a bit, but let's try it out. Let's erase `'Welcome to Flatbook, '` and set `welcomeMessage` equal to `currentUser` instead:
```js
const currentUser = 'Grace Hopper';

const welcomeMessage = currentUser;
```

When we save the file and look back at the browser, we still have two passing tests. But now the first and third tests are passing instead of the first and second! That doesn't seem quite right.

It turns out that the tests want `welcomeMessage` to include _both_ `'Welcome to Flatbook, '` and the value stored in `currentUser`. Maybe we can include both of them in a single string?
```js
const currentUser = 'Grace Hopper';

const welcomeMessage = 'Welcome to Flatbook, currentUser';
```

After saving the file, we're once again passing the second test, but we're back to failing the third test. The new error message for the third test gives us a hint about what's happening:
```js
AssertionError: expected 'Welcome to Flatbook, currentUser' to contain 'Grace Hopper'
```
When JavaScript is expecting a variable to contain one thing, and it does not, that is known as an `AssertionError`. The test suite looked at the value stored in `welcomeMessage` and expected to find the string `'Grace Hopper'`, which is the value stored in `currentUser`. Instead, `welcomeMessage` contains the literal string `"currentUser"`. It's important to understand the distinction:
- `currentUser` is a _variable_ that contains a string (`'Grace Hopper'` in our examples).
- `'currentUser'` is a _string_, ***not a variable***.

The JavaScript engine sees a matching pair of single quotes (`' '`), creates a new string, and assumes that _everything_ in between the matching punctuation marks is part of that string. For example, if we add quotation marks around the first line of code that we wrote, it becomes a simple string consisting of 35 characters:
```js
typeof "const currentUser = 'Grace Hopper';";
//=> "string"

"const currentUser = 'Grace Hopper';".length;
//=> 35

currentUser;
//=> Uncaught ReferenceError: currentUser is not defined
```

As demonstrated by the last line in that snippet, because we turned our code into a string it no longer functions as JavaScript code for declaring and assigning a `currentUser` variable.

Since we want `welcomeMessage` to contain both `'Welcome to Flatbook, '` and the value stored in `currentUser`, we have two options: **concatenation** and **interpolation**.

## Concatenate Strings with the `+` Operator
String concatenation is a way to take two strings and add one to the other, creating a single, longer string. The easiest way to concatenate strings in JavaScript is with the `+` operator, like so:
```js
"High " + "five!";
//=> "High five!"

"We" + ' ' + `can` + " " + 'concat' + `enate` + " as many strings " + 'as our heart ' + `desires.`;
//=> "We can concatenate as many strings as our heart desires."
```

Since our `currentUser` variable contains a string, we can concatenate it to the end of `'Welcome to Flatbook, '` to dynamically create a new string based on whatever value `currentUser` contains at a given moment:
```js
const currentUser = 'Grace Hopper';

const welcomeMessage = 'Welcome to Flatbook, ' + currentUser;
```

If we run the test suite with our updated code, we'll see both the second and third tests passing! However, before we move on, let's talk about interpolation.

## Interpolate Variables and Other JavaScript Expressions Inside Template Literals 
String interpolation lets us dynamically insert values in the middle of a string. Before ES2015, we could accomplish this with concatenation:
```js
const myString = 'concatenat';
//=> undefined

const myNumber = 20;
//=> undefined

const myBoolean = true;
//=> undefined

"It's " + myBoolean + ' that we can ' + myString + 'e values of any data type into one long ' + typeof myString + '. We could even ' + myString + 'e ' + (22 + myNumber) + " things together if we wanted to. We don't have to convert things like " + typeof myNumber + 's or ' + typeof myBoolean + 's prior to ' + myString + 'ing them. ' +

'Even if we ' + myString + 'e across multiple lines, the return value is still a single, one-line ' + typeof myString + '.';
//=> "It's true that we can concatenate values of any data type into one long string. We could even concatenate 42 things together if we wanted to. We don't have to convert things like numbers or booleans prior to concatenating them. Even if we concatenate across multiple lines, the return value is still a single, one-line string."
```

ES2015 introduced [template literals][template literals], which removed the need for concatenation. No more `+` operators needed; instead variables are interpolated in by wrapping them in curly braces preceded by a dollar sign: `${yourVariable}`. One other important thing: Template literals *must* use backticks in order to be interpreted correctly. Using single or double quotes will cause the dollar sign, curly braces and variable to be interpreted as regular string data.

```js
const myString = 'template literal';

const myNumber = 10;

const myBoolean = false;

`Saying that interpolation with ${myString}s is better than concatenation ${90 + myNumber}% of the time is simply ${myBoolean}. But it is pretty cool!

Beware that new lines inside of a ${myString} will be preserved as new lines in the resulting ${typeof myString}!`;
//=> "Saying that interpolation with template literals is better than concatenation 100% of the time is simply false. But it is pretty cool!

// Beware that new lines inside of a template literal will be preserved as new lines in the resulting string!"
```

Let's rewrite our `welcomeMessage` to use a template literal:
```js
const currentUser = 'Grace Hopper';

const welcomeMessage = `Welcome to Flatbook, ${currentUser}`;
```

The first three tests are still passing, but the fourth wants our `welcomeMessage` to end with an exclamation point. The fix is as simple as adding a `!` as the last character in the template literal:
```js
const currentUser = 'Grace Hopper';

const welcomeMessage = `Welcome to Flatbook, ${currentUser}!`;
```

Four tests down, six to go!

## Read the MDN Documentation on String Methods and Practice Using a Few
#### `excitedWelcomeMessage`
Sometimes we get so excited when someone logs into their Flatbook account that we just want to shout out loud. We *could* copy over most of the code from `welcomeMessage` and then change every character to its uppercase equivalent, but as developers we try not to repeat ourselves. Instead, let's use the `.toUpperCase()` string method:
```js
const currentUser = 'Grace Hopper';

const welcomeMessage = `Welcome to Flatbook, ${currentUser}!`;

const excitedWelcomeMessage = welcomeMessage.toUpperCase();
```

All strings in JavaScript have access to the same set of default methods, which are common operations like changing and returning a new string, searching through a string for specific character(s) and returning the match, and so on. For example, we can use [`.toUpperCase()`][toUpperCase] and [`.toLowerCase()`][toLowerCase] on a string to make the entire string uppercase or lowercase. There are lots of other [string methods][string methods] that you'll find useful at various points throughout your JavaScript programming career.

If you save `index.js` after adding the code for `excitedWelcomeMessage` and then flip back to the browser-based test suite, we should see the first seven tests passing. Woohoo!

#### `shortGreeting`
The mobile team at Flatbook is busy redesigning the site for smaller devices, and they're a bit concerned about how much real estate the `welcomeMessage` takes up on the screen. They want us to create a shorter version that truncates the `currentUser`'s name into just their first initial:
```js
const currentUser = 'Edsger Dijkstra';

...

const shortGreeting = ... ;

shortGreeting;
//=> "Welcome, E!"
```

Returning to the test suite in the browser, the JavaScript engine is telling us that it can't find `shortGreeting`:
```js
shortGreeting
  contains "Welcome, "
    ReferenceError: shortGreeting is not defined
```

Once we define it in `index.js`:
```js
...

const shortGreeting = '';
```

we see a new error from the test suite:
```js
shortGreeting
  contains "Welcome, "
    AssertionError: expected '' to contain 'Welcome, '
```

It expected `shortGreeting` to contain the string `"Welcome, "`, but `shortGreeting` is currently an empty string, `''`. We can fix that now:
```js
...

const shortGreeting = 'Welcome, ';
```

Next up is another `AssertionError`, this one checking that `shortGreeting` contains the first letter from `currentUser`:
```js
shortGreeting
  contains the first initial of the name stored in the 'currentUser' variable
    AssertionError: expected 'Welcome, ' to contain 'G'
```

To get a sense of how specific the tests are, let's start by adding the entirety of `currentUser` to `shortGreeting`:
```js
const currentUser = 'Grace Hopper';

...

const shortGreeting = `Welcome, ${currentUser}`;
```

Notice that we changed the single quotes to backticks, which allows us to interpolate with `${ }`.

The new error reads as follows:
```js
shortGreeting
  contains the first initial of the name stored in the 'currentUser' variable
    AssertionError: expected 'Welcome, Grace Hopper' to not contain 'race Hopper'
```

The test suite checks that `shortGreeting` contains the first character in `currentUser` (`G` in our example) and that it *doesn't* contain the rest of the string (`race Hopper`).

There are a few different ways we could get just the first character of `currentUser`. The easiest would be to use [bracket notation or the `.charAt()` method][character access] to grab the character at index `0`:
```js
'Edsger Dijkstra'[0];
//=> "E"

'Edsger Dijkstra'.charAt(0);
//=> "E"
```

However, it's a good practice to make our code flexible and future-proof it a bit. What if our product team decides it would be better to shorten `currentName` to two characters instead of one? Or three characters?

For the added flexibility, we're going to use `.slice()`, but you can always explore the [MDN documentation on string methods][string methods] to pick out your own strategy.

#### `.slice()`
Let's take a look at the documentation for [`.slice()`][slice]:

[![String.prototype.slice() documentation on MDN](https://curriculum-content.s3.amazonaws.com/web-development/js/basics/strings-code-along/MDN_string_slice_documentation.png)][slice]

>The **slice()** method extracts a section of a string and returns it as a new string.

The method takes two arguments, the indexes at which the extraction should begin and before which it should end. When we talk about indexes of a string, we're talking about how to access specific characters at various points within the string. Remember, computers start counting at 0, where humans start counting at 1. Because we start at index `0` instead of `1`, the index of each character in a string is always one less than the character's place in the string. The second character is at index `1`, the fifth at index `4`, the twelfth at index `11`, and so on. The index of the last character is always one less than the [length][length] of the string:
```js
'Edsger Dijkstra'.length;
//=> 15

'Edsger Dijkstra'[15];
//=> undefined

'Edsger Dijkstra'[14];
//=> "a"
```

If we omit both arguments, `.slice()` will return a full copy of the original string:
```js
'Edsger Dijkstra'.slice();
//=> "Edsger Dijkstra"
```

If we provide a single argument, `.slice()` will return a copy from that index to the end of the string. For example, to grab Dijkstra's last name we could start the slice on index `7`:
```js
'Edsger Dijkstra'.slice(7);
//=> "Dijkstra"
```

If we wanted the first three characters of Dijkstra's name, we would specify `0` as the first argument, the index at which to start, and `3` as the second argument, the index before which to end:
```js
'Edsger Dijkstra'.slice(0, 3);
//=> "Eds"
```

To satisfy our team's current specifications for `shortGreeting`, we need to start our slice at index `0` and end it before index `1`:
```js
currentUser.slice(0, 1);
```

Now, when our product team asks us to use the first two characters of `currentUser`, the change is as simple as `currentUser.slice(0, 1)` --> `currentUser.slice(0, 2)`.

Add an exclamation point to the end, and the entire test suite should be passing:
```js
const currentUser = 'Grace Hopper';

...

const shortGreeting = `Welcome, ${currentUser.slice(0, 1)}!`;
```

![All tests passing](https://curriculum-content.s3.amazonaws.com/web-development/js/basics/strings-code-along/all_tests_passing.png)

Nice job!

## Conclusion

When all of the tests are passing, the `Run Local Tests` light on the Learn.co lesson page should turn green, and you can close the browser tab that contains the test suite. Flip back to the terminal and press the `Control` and `C` keys at the same time to halt the test server.

We're ready to submit our passing code and move on to the next lesson. Type `learn submit` in your terminal to submit your lab!

Great work!

## Resources
- [StackExchange – How to open the JavaScript console][open JS console]
- [MDN — Template literals][template literals]
- [DRY — Don't Repeat Yourself][DRY]
- [MDN — String — `.length`][length]
- [MDN — String — Character access][character access]
- [MDN — String — Methods][string methods]
  + [MDN — `.toUpperCase()`][toUpperCase]
  + [MDN — `.toLowerCase()`][toLowerCase]
  + [MDN — `.slice()`][slice]

[open JS console]: https://webmasters.stackexchange.com/questions/8525/how-do-i-open-the-javascript-console-in-different-browsers/77337#77337
[template literals]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[DRY]: https://en.wikipedia.org/wiki/Don%27t_repeat_yourself
[string methods]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Methods_2
[length]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length
[character access]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Character_access
[toUpperCase]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase
[toLowerCase]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase
[charAt]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
[slice]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
[manual PR instructions]: http://help.learn.co/workflow-tips/github/how-to-manually-submit-a-lab

<p class='util--hide'>View <a href='https://learn.co/lessons/js-basics-strings-code-along'>Strings Code-along</a> on Learn.co and start learning to code for free.</p>
