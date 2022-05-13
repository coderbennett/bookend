const inviteDialog = $('#inviteDialog');
const inviteBtn = $('#inviteBtn');
const inviteInput = $('#invite-username');
const inviteModalBtn = $('#inviteModalBtn');

inviteDialog.dialog(
    {
        autoOpen: false,
        closeText: "",
        height: 350,
        width: 500,
        modal: true,
        position: ['center']
    }
);

inviteModalBtn.click( () => {
    inviteDialog.dialog("open");
});

inviteBtn.on("click", async (event) => {
    event.preventDefault();
    
    const response = await fetch("/api/invites/", {
        method: 'POST',
        body: JSON.stringify({ username: inviteInput.val().trim(), club_id: inviteBtn.data('club')}),
        headers: { 'Content-Type': 'application/json'}
    });

    if (response.ok)
    {
        document.location.reload();
    } else {
        alert((await response.json()).message);
    }
});