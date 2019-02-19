$(function(){
    bienvenida();

    $('#img').on('click', desplegable);
    $('#articulo').on('click', setArticulo);
    $('#imagen').on('click', setImagen);
    $('#alertBoton').on('click', setAlert);
    $('#tabla').on('click', setTabla);

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
                .on('click', "button", (e)=>{
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

function setArticulo() {
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
    var src;

    $('<form>').attr('class', "pre-form")
    .append(
        $('<p>')
        .append(
            $('<label>')
            .attr('for', 'setImagen')
            .html('Imagen: ')
        )
        .append(
            $('<input>')
            .attr({
                id: 'setImagen',
                type: 'file',
                accept: 'image/x-png,image/gif,image/jpeg',
            })
            .on('change', (e) => {
                if (e.target.files && e.target.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function(e) {
                        $('#actual').attr('src', e.target.result);
                        src = e.target.result;
                    }

                    reader.readAsDataURL(e.target.files[0]);
                }
            })
        )
    )
    .append(
        $('<p>').append(
            $('<img>')
            .attr({
                id: 'actual',
                class: 'img-insitu',
                src: 'src/photos/eduardo.png',
            })
        )
    )
    .append(
        $('<p>')
        .append(
            $('<label>')
            .attr('for', 'setContenido')
            .html('Pié de imagen: ')
        )
        .append(
            $('<input>')
            .attr({
                id: 'setContenido',
                type: 'text',
            })
        )
    ).append(
        $('<p>')
        .append(
            $('<input>')
            .attr({
                type: 'submit',
                value: 'Confirmar',
            })
            .on('click', (e) => {
                e.preventDefault();
                var img = '<div class="draggable">';

                if (src) {
                    img += `<img src="${src}">`
                } else {
                    img += '<img class="img-insitu" src="src/photos/eduardo.png">';
                }


                if ($('#contenido').val()) {
                    img+=`<figcaption>${$('#contenido').val()}</figcaption>`;
                }
                $(img+'</div>')
                .draggable()
                .appendTo('.principal');
                $(this).parent().parent().remove();
            })
        )
        .append(botonCancelar())
    )
    .appendTo('.principal')
    .centrar();
}

/**
* Muestra un formulario que pide al usuario las dimensiones de la tabla,
* si son correctas, pinta una tabla vacia que se puede rellenar haciendo
* click en alguna de sus celdas.
* En caso de error se le pide al usuarios que vuelva a ingresas los parametros
* de la tabla o cancele la operación.
*/
function setTabla() {
    $('<form>')
    .addClass('pre-form')
    .append(
        $('<p>')
        .append($('<label>').attr('for', 'setFila'))
        .html('Numero de filas:')
        .append(
            $('<input>')
            .attr({
                id: 'setFila',
                type: 'number',
            })
        )
    )
    .append(
        $('<p>')
        .append($('<label>')
        .attr('for', 'setColumna'))
        .html('Numero de columnas:')
        .append(
            $('<input>')
            .attr({
                id: 'setColumna',
                type: 'number',
                min: 0,
            })
        )
    )
    .append(
        $('<p>')
        .append(
            $('<input>')
            .attr({
                type: 'submit',
                value: 'Confirmar',
            })
            .on('click', (e) => {
                e.preventDefault();
                if (filas >=1 && columnas>=1) {
                    generarTabla(
                        $('#setFila').val(),
                        $('#setColumna').val()
                    );
                    $(e.target).parent().parent().remove();
                } else {
                    alert('Introduzca ambos numeros positivos y enteros mayores que 1.')
                }
            })
        )
        .append(botonCancelar())
    )
    .appendTo('.principal')
    .centrar();

    /**
    * Genera una tabla dadas las filas y las comumnas deseadas, añade
    * dicha tabla a .principal tras generarla.
    * @param  {int} filas    Numero de filas que tiene la tabla.
    * @param  {int} columnas Numero de columnas que tiene la tabla
    */
    function generarTabla(filas, columnas) {
        var $table = $('<table>');
        var $thead = $('<thead>');
        var $tbody = $('<tbody>');

        for (let i = 0; i < columnas; i++) {
            $thead.append(
                $('<th>')
                .on('click', setContenido)
            );
        }

        for (let i = 0; i < filas-1; i++) {
            var $tr = $('<tr>');
            for (let i = 0; i < columnas; i++) {
                $tr.append(
                    $('<td>')
                    .on('click', setContenido)
                );
            }
            $tbody.append($tr);
        }

        $table
        .append($thead)
        .append($tbody)
        .draggable()
        .appendTo('.principal');

        /**
        * Encargado de rellenar las celdas de la tabla cuando se hace
        * click en ellas.
        * @param {Event} e Evento que dispara este metodo.
        */
        function setContenido(e) {
            var str = prompt('Introduzca lo que desea guardar en la celda seleccionada.');
            $(e.target).html(str);
        }
    }
}

/**
* Boton predeterminado para cancelar un formulario.
* Deshabilita la accion por defecto del boton y elimina el formulario.
*/
function botonCancelar() {
    return $('<input>')
    .attr({
        type: 'submit',
        value: 'Cancelar',
    })
    .on('click', (e) => {
        e.preventDefault();
        $(e.target).parent().parent().remove();
    });
}
