

$(function(){
    setTimeout(function(){
        $('.bienvenida').parpadea();
    }, 2000);

    $('#img').click(function(){
        if ($(this).attr("src")=="src/abierto.png") {
            $('#nav').css("display", "none");
            $(this).attr("src", "src/cerrado.jpg");
        } else {
            $('#nav').css("display", "block");
            $(this).attr("src", "src/abierto.png");
        }
    });


});

function botonAlert(){

    var button = $(`<button>`);
    $('body').append()
}
