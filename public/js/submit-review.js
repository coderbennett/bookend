const reviewForm = $("#review-form");
const reviewTitleField = $("#review-title-field");
const reviewBodyField = $("#review-body-field");

reviewForm.on("submit", async (event) =>
{
    event.preventDefault(); // Skip the standard form submission
    const response = await fetch("/api/review/",
    {
        method: 'POST',
        body: JSON.stringify({ id: reviewForm.data("bookId"), title: reviewTitleField.val().trim(), body: reviewBodyField.val().trim() }),
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