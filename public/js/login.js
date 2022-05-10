const loginDialog = $("#dialog")
const loginShowDialogButton = $("#login-button");

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