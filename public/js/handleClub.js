const deleteClubBtn = $('#deleteClubBtn');

deleteClubBtn.click(async (event) => {
    event.preventDefault();

    const response = await fetch("/api/club/" + deleteClubBtn.data('club'), {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } 
});