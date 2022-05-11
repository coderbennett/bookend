const reviewsDiv = $("reviews");
const commentForms = $(".comment-form");

commentForms.on("submit", async (event) =>
{
    event.preventDefault(); // Skip the standard form submission
    const commentForm = $(event.target);
    const commentField = commentForm.children("textarea");
    const response = await fetch("/api/comment/",
    {
        method: 'POST',
        body: JSON.stringify({ id: commentForm.data("reviewId"), body: commentField.val().trim() }),
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