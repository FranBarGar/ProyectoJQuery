$(function(){
    bienvenida();

    $('#img').on('click', desplegable);
    $('#titulo').on('click', setTitulo);

});

function bienvenida() {
    setTimeout(function(){
        $('.bienvenida').parpadea();
        $('#img').show(4000);
    }, 2000);
}

function desplegable() {
    if ($(this).attr("src")=="src/abierto.png") {
        $('#nav').css("display", "none");
        $(this).attr("src", "src/cerrado.jpg");
    } else {
        $('#nav').css("display", "block");
        $(this).attr("src", "src/abierto.png");
    }
}

function botonAlert(){
    var button = $(`<button>`);
    $('.principal').append()
}

function setTitulo() {
    $(`<form class="pre-form" name="titulo">
        <p>
            <label for="tamaño">Tamaño: </label>
            <select id="tamaño">
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
            </select>
        </p>
        <p>
            <label for="contenido">Titulo: </label>
            <input id="contenido" type="text">
        </p>
        <p>
            <input id="confirmar" type="submit" value="Confirmar">
            <input id="cancelar" type="submit" value="Cancelar">
        </p>
    </form>`)
    .appendTo('.principal');

    $('#confirmar').on('click', function (e) {
        e.preventDefault();
        if ($('#contenido').val()) {
            $(`<${$('#tamaño :selected').val()}>${$('#contenido').val()}</${$('#tamaño:selected').val()}>`)
            .appendTo('.principal');
            $(this).parent().parent().remove();
        } else {
            alert('Rellene el campo de "Titulo" o pulse "Cancelar" para salir.');
        }
    });

    $('#cancelar').on('click', function (e) {
        e.preventDefault();
        $(this).parent().parent().remove();
    });

}
