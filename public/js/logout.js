const logoutButton = $("#logout-button");

logoutButton.click( async (event) =>
{
    const response = await fetch("/api/readers/logout/", { method: 'POST' });
    
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