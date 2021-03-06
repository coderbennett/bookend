const signupDialog = $("#signup-dialog");
const signupShowDialogButton = $("#signup-button");
const signupForm = $("#signup-form");
const signupUsernameField = $("#signup-username");
const signupEmailField = $("#signup-email");
const signupPasswordField = $("#signup-password");
const signupSubmitButton = $("#signup-submit-button");

signupDialog.dialog(
{
    autoOpen: false,
    closeText: "",
    height: 400,
    width: 500,
    modal: true,
    position: ['center']
});

signupShowDialogButton.click( () =>
{
    signupDialog.dialog("open");
});

signupForm.on("submit", async (event) =>
{
    event.preventDefault(); // Skip the standard form submission
    const response = await fetch("/api/reader/",
    {
        method: 'POST',
        body: JSON.stringify({
            username: signupUsernameField.val().trim(),
            email: signupEmailField.val().trim(),
            password: signupPasswordField.val() }),
        headers: { 'Content-Type': 'application/json' },
    });
    
    if(response.ok)
    {
        document.location.replace("/"); // Return to homepage
        document.location.reload(); // Reload session to update login state on page
        document.location.replace("/"); // Return to homepage...again. Don't ask me why this is necessary
    }
    else
    {
        alert((await response.json()).message);
    }
});