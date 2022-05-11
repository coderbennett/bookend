const reviewId = document.querySelector('input[name="review-id"]').value;


const editFormHandler = async (event) => {
    event.preventDefault();

    const review_title = document.querySelector('input[name="review-title"]').value;
    const review_body = document.querySelector('textarea[name="review-body"]').value;


    const response = await fetch(`/api/review/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify({
            review_title,
            review_body,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Unable to update review');
    }
    document.location.replace('/dashboard');
};

const deleteButtonHandler = async () => {
    await fetch(`/api/review/${reviewId}`, {
        method: 'DELETE'
    });
    document.location.replace('/dashboard');
};

document
    .querySelector('#edit-review-form')
    .addEventListener('submit', editFormHandler);
document
    .querySelector('#delete-btn')
    .addEventListener('click', deleteButtonHandler);