$(function(){
    bienvenida();

    $('#img').on('click', desplegable);
    $('#titulo').on('click', setTitulo);
    $('#imagen').on('click', setImagen);

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
    .appendTo('.principal')
    .centrar();

    $('#confirmar').on('click', function (e) {
        e.preventDefault();
        if ($('#contenido').val()) {
            $(`
                <${$('#tamaño :selected').val()}>
                ${$('#contenido').val()}
                </${$('#tamaño:selected').val()}>
            `)
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

function setImagen() {
    $(`<form class="pre-form" name="titulo">
        <p>
            <label for="setImagen">Imagen: </label>
            <input id="setImagen" type="file" accept="image/x-png,image/gif,image/jpeg"/>
        </p>
        <p>
            <img id="actual" class="img-insitu" src="src/photos/eduardo.png">
        </p>
        <p>
            <label for="contenido">Pié de imagen: </label>
            <input id="contenido" type="text">
        </p>
        <p>
            <input id="confirmar" type="submit" value="Confirmar">
            <input id="cancelar" type="submit" value="Cancelar">
        </p>
    </form>`)
    .appendTo('.principal')
    .centrar();

    $('#setImagen').on('change', function () {
        $('#actual').attr('src', `${$('#setImagen').val()}`);
    });

    $('#confirmar').on('click', function (e) {
        e.preventDefault();
        var img = `<img src="src/photos/${$('#setImagen :selected').val()}">`;

        if ($('#contenido').val()) {
            img+=`<figcaption>${$('#contenido').val()}</figcaption>`;
        }
        $(img).appendTo('.principal');
        $(this).parent().parent().remove();
    });

    $('#cancelar').on('click', function (e) {
        e.preventDefault();
        $(this).parent().parent().remove();
    });

}
