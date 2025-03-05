const display = document.getElementById("display");
const passLength = document.getElementById("passLength");
const lowercaseChecked = document.getElementById("lowercase");
const uppercaseChecked = document.getElementById("uppercase");
const numbersChecked = document.getElementById("numbers");
const symbolsChecked = document.getElementById("symbols");

/*
this function takes the input from the checkboxes and uses it in the 
password generator criteria
*/
function checkboxInput() {
  let includeLowercase = false;
  let includeUppercase = false;
  let includeNumbers = false;
  let includeSymbols = false;

  if (lowercaseChecked.checked === true) {
    includeLowercase = true;
  }

  if (uppercaseChecked.checked === true) {
    includeUppercase = true;
  }

  if (numbersChecked.checked === true) {
    includeNumbers = true;
  }

  if (symbolsChecked.checked === true) {
    includeSymbols = true;
  }

  return { includeLowercase, includeUppercase, includeNumbers, includeSymbols };
}

/*
this function generates a random password based on inputted criteria
*/
function generatePassword(
  length,
  includeLowercase,
  includeUppercase,
  includeNumbers,
  includeSymbols
) {
  //set range of chars to use in generation
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*(~)/?";

  /*let are only available inside the block where they’re defined.
  where var are available throughout the function in which they’re declared. */
  let allowedChars = "";
  let password = "";

  /*if we would want to include lower case characters, we will string
  concatenate our lowercase Chars otherwise concatenate empty string*/
  allowedChars += includeLowercase ? lowercaseChars : "";
  allowedChars += includeUppercase ? uppercaseChars : "";
  allowedChars += includeNumbers ? numberChars : "";
  allowedChars += includeSymbols ? symbolChars : "";

  //error checking
  if (length <= 5) {
    return ` password length must be over 5`;
  }
  if (allowedChars.length === 0) {
    return ` at least one set of characters needs to be selected`;
  }

  /*generates a random char for each amount of times the length of the passwrod is
   ex: password is 10, generates 10 random charcters based on the criteria by going through
   this loop 10 separate times and each time adding onto our password string
  */
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    password += allowedChars[randomIndex];
  }

  return password;
}

/*
this function shows the generated password on the display
*/
function showOnDisplay(message) {
  display.value = message;
}

/*
this function resets/clears everything on the form
*/
function resetGenerator() {
  display.value = "";
  passLength.value = 0;
  lowercaseChecked.checked = false;
  uppercaseChecked.checked = false;
  numbersChecked.checked = false;
  symbolsChecked.checked = false;
}

/*
this function gets the password length inputted by the user on the form
*/
function getPasswordLength() {
  var length = parseInt(passLength.value);

  return length;
}

document
  .getElementById("generateButton")
  .addEventListener("click", function () {
    const passwordLength = getPasswordLength();
    const {
      includeLowercase,
      includeUppercase,
      includeNumbers,
      includeSymbols,
    } = checkboxInput();
    const password = generatePassword(
      passwordLength,
      includeLowercase,
      includeUppercase,
      includeNumbers,
      includeSymbols
    );
    showOnDisplay(password);
  });
