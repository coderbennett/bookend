const declineInviteBtn = $('#declineInvitation');
const acceptInviteBtn = $('#acceptInvitation');

declineInviteBtn.click(async (event) => {
    event.preventDefault();

    const response = await fetch("/api/invites/" + declineInviteBtn.data('id'), {
        method: 'DELETE'
    });
    console.log(response);
    if(response.ok) {
        document.location.reload();
    }
});

acceptInviteBtn.click(async (event) => {
    event.preventDefault();

    const response = await fetch("/api/readerclubs", {
        method: 'POST',
        body: JSON.stringify({ club_id: acceptInviteBtn.data('club-id')}),
        headers: { 'Content-Type': 'application/json'}
    });

    if (response.ok) {
        const response2 = await fetch("/api/invites/" + acceptInviteBtn.data('id'), {
            method: 'DELETE'
        });

        if (response2.ok) {
            document.location.reload();
        } else {
            console.log(response2);
        }
    } 
})