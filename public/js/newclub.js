const selectCover = $('#coverSelect');
const heroImg = $('#heroImg')



$('#coverSelect').change(() => {
    let image = $( "select option:selected" ).data();

    console.log(image);
    console.log(image.image);

    heroImg.attr('style', 'background-image: url(/assets/' + image.image+ ")");
})