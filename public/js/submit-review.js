const reviewForm = $("#review-form");
const reviewTitleField = $("#review-title-field");
const reviewBodyField = $("#review-body-field");

reviewForm.on("submit", async (event) =>
{
    event.preventDefault(); // Skip the standard form submission
    console.log(reviewForm.data("bookId"));
    const response = await fetch("/api/review/",
    {
        method: 'POST',
        body: JSON.stringify({ id: reviewForm.data("bookId"), title: reviewTitleField.val().trim(), body: reviewBodyField.val().trim() }),
        headers: { 'Content-Type': 'application/json' },
    });
    
    if(response.ok)
    {
        //document.location.replace("/"); // Return to homepage
        //document.location.reload(); // Reload session to update login state on page
        //document.location.replace("/"); // Return to homepage...again. Don't ask me why this is necessary
    }
    else
    {
        alert((await response.json()).message);
    }
});