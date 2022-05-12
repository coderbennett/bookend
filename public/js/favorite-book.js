const favoriteButton = $("#favorite-book");

favoriteButton.on("click", async (event) =>
{
    const response = await fetch("/api/favorites/",
    {
        method: 'POST',
        body: JSON.stringify({ book_id: favoriteButton.data("bookId") }),
        headers: { 'Content-Type': 'application/json' },
    });
    
    if(response.ok)
    {
        document.location.reload(); // Reload session to update state on page
    }
    else
    {
        alert((await response.json()).message);
    }
});