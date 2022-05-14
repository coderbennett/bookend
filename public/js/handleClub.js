const deleteClubBtn = $('#deleteClubBtn');
const addBookBtn = $('#addBookBtn');

deleteClubBtn.click(async (event) => {
    event.preventDefault();

    const response = await fetch("/api/club/" + deleteClubBtn.data('club'), {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } 
});

addBookBtn.click(async (event) => {
    event.preventDefault();
    let isbn = $('#isbn').val();
    let title= $('#title').val().trim();
    let author = $('#author').val().trim();
    let description = $('#description').val().trim();
    let page_count = $('#page_count').val().trim();

    const response = await fetch("/api/book/", {
        method: 'POST',
        body: JSON.stringify({
            isbn,
            title,
            author,
            description,
            cover_img: "bookcover.png",
            page_count,
            club_id: addBookBtn.data('club')
        }),
        headers: { 'Content-Type': 'application/json'}
    });

    if (response.ok) {
        document.location.reload();
    }
})