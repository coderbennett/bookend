const loginDialog = $("#login-dialog");
const loginShowDialogButton = $("#login-button");
const loginForm = $("#login-form");
const loginEmailField = $("#login-email");
const loginPasswordField = $("#login-password");
const loginSubmitButton = $("#login-submit-button");

loginDialog.dialog(
{
    autoOpen: false,
    closeText: "",
    height: 350,
    width: 500
});

loginShowDialogButton.click( () =>
{
    loginDialog.dialog("open");
});

loginForm.on("submit", async (event) =>
{
    event.preventDefault(); // Skip the standard form submission
    const response = await fetch("/api/reader/login/",
    {
        method: 'POST',
        body: JSON.stringify({ email: loginEmailField.val().trim(), password: loginPasswordField.val() }),
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