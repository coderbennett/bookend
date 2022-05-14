const heroImg = $('#heroImg');
const button = $('#createClubBtn');
const clubName = $('#clubname');

$('#coverSelect').change(() => {
    let image = $( "select option:selected" ).data().image;

    heroImg.attr('style', 'background-image: url(/assets/' + image+ ")");
});

button.click(async (event) => {
    event.preventDefault();

    let image = $( "select option:selected" ).data().image;

    const response = await fetch("/api/club/", {
        method: 'POST',
        body: JSON.stringify({
            name: clubName.val(),
            hero_img: image }),
        headers: { 'Content-Type': 'application/json' },
    });

    if(response.ok) {
        addSelfToClub((await response.json()).id);
    }
});

async function addSelfToClub(club_id) {
    console.log(club_id);
    const response = await fetch("/api/readerclubs/", {
        method: 'POST',
        body: JSON.stringify({
            club_id
        }),
        headers: { 'Content-Type': 'application/json'},
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    }
};