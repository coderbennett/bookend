const loginDialog = $("#dialog")
const loginShowDialogButton = $("#login-button");

loginDialog.dialog(
{
    autoOpen: false
});

loginShowDialogButton.click( () =>
{
    loginDialog.dialog("open");
});