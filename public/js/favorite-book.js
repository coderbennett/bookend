const favoriteButton = $("#favorite-book");

favoriteButton.on("click", async (event) =>
{
    let response;
    if(favoriteButton.data("favorite"))
    {
        response = await fetch("/api/favorites/" + favoriteButton.data("bookId"),
        {
            method: 'DELETE'
        });
    }
    else
    {
        response = await fetch("/api/favorites/",
        {
            method: 'POST',
            body: JSON.stringify({ book_id: favoriteButton.data("bookId") }),
            headers: { 'Content-Type': 'application/json' },
        });
    }
    
    if(response.ok)
    {
        document.location.reload(); // Reload session to update state on page
    }
    else
    {
        alert((await response.json()).message);
    }
});