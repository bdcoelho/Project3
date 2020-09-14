$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const firstNameInput = $("input#firstname-input");
  const lastNameInput = $("input#lastname-input");
  const stNumInput = $("input#st-num-input");
  const stNameInput = $("input#st-name-input");
  const suburbInput = $("input#suburb-input");
  const stateInput = $("input#state-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", (event) => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      stNum: stNumInput.val().trim(),
      stName: stNameInput.val().trim(),
      suburb: suburbInput.val().trim(),
      state: stateInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData);
  });
  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(userData) {
    $.post("/api/signup", userData)
      .then(() => {
        loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password,
    })
      .then((req, res) => {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLoginErr(err) {
    $("#alert.msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
