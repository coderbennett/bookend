const heroImg = $('#heroImg')
const button = $('#createClubBtn');
const clubName = $('#clubname');

$('#coverSelect').change(() => {
    let image = $( "select option:selected" ).data().image;

    heroImg.attr('style', 'background-image: url(/assets/' + image+ ")");
});

button.on("click", async () => {
    let image = $( "select option:selected" ).data().image;

    const response = await fetch("/api/club/", {
        method: 'POST',
        body: JSON.stringify({
            name: clubName.val(),
            hero_img: image }),
        headers: { 'Content-Type': 'application/json' },
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Unable to create club!');
    }
});