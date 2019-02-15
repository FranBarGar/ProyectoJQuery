$(function(){
    bienvenida();

    $('#img').on('click', desplegable);
    $('#titulo').on('click', setTitulo);
    $('#imagen').on('click', setImagen);
    $('#alertBoton').on('click', setAlert);

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

function setAlert(){
    $(`<form class="pre-form" name="alert">
        <p>
            <label for="setTitulo">Titulo del boton: </label>
            <input id="setTitulo" type="text">
        </p>
        <p>
            <label for="contenido">Contenido del alert: </label>
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
                <div class="draggable">
                    <button data="${$('#contenido').val()}">
                    ${$('#setTitulo').val()}
                    </button>
                </div>
            `)
            .on('click', (e)=>{
                alert($(e.target).attr('data'));
            })
            .draggable()
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
                <div class="draggable">
                    <${$('#tamaño :selected').val()}>
                    ${$('#contenido').val()}
                    </${$('#tamaño:selected').val()}>
                </div>
            `)
            .draggable()
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

    var src;

    $('#setImagen').on('change', function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('#actual').attr('src', e.target.result);
                src = e.target.result;
            }

            reader.readAsDataURL(this.files[0]);
        }
    });

    $('#confirmar').on('click', function (e) {
        e.preventDefault();
        var img = '<div class="draggable">';

        if (src) {
            img += `<img src="${src}">`
        } else {
            img += '<img src="src/photos/eduardo.png">';
        }


        if ($('#contenido').val()) {
            img+=`<figcaption>${$('#contenido').val()}</figcaption>`;
        }
        $(img+'</div>')
        .draggable()
        .appendTo('.principal');
        $(this).parent().parent().remove();
    });

    $('#cancelar').on('click', function (e) {
        e.preventDefault();
        $(this).parent().parent().remove();
    });

}
