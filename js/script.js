$(function(){
    bienvenida();
});

/**
 * Muestra la bienvenida a el Proyecto de DIW de Francisco Barba García.
 */
function bienvenida() {
    setTimeout(function(){
        $('<div>')
        .attr('id', 'inicio')
        .css({
            'background-color': '#f1f1f1',
        })
        .addClass('bienvenida')
        .append($('<h1>').html('Proyecto JQuery DIW'))
        .append($('<h2>').html('por: Francisco Barba García'))
        .appendTo('body')
        .parpadea();

        $('<nav>')
        .css('z-index', 10000000)
        .append(
            $('<img>')
            .attr({
                src: 'src/cerrado.jpg',
                alt: 'Imagen no encontrada'
            })
            .css({
                top: 0,
                position: 'relative',
                display: 'none',
                width: '50px',
                height: '50px',
            })
            .on('click', desplegable)
            .fadeIn(6000, () => {
                $('#inicio').remove();
            })
        )
        .append(
            $('<ul>')
            .css({
                top: '50px',
                display: 'none',
                'background-color': '#f1f1f1',
            })
            .attr('id', 'nav')
            .append(
                $('<li>')
                .append(
                    $('<a>')
                    .html('Articulo')
                    .on('click', setArticulo)
                )
            )
            .append(
                $('<li>')
                .append(
                    $('<a>')
                    .html('Imagen')
                    .on('click', setImagen)
                )
            )
            .append(
                $('<li>')
                .append(
                    $('<a>')
                    .html('Boton con alert')
                    .on('click', setAlert)
                )
            )
            .append(
                $('<li>')
                .append(
                    $('<a>')
                    .html('Tabla')
                    .on('click', setTabla)
                )
            )
            .append(
                $('<li>')
                .append(
                    $('<a>')
                    .attr({
                        id: 'formulario',
                        href: '#'
                    })
                    .html('Formulario')
                )
            )
        )
        .draggable()
        .appendTo('body');
    }, 2000);
}

/**
 * Se encarga de cambiar entre vista preliminar y vista diseño.
 */
function desplegable() {
    if ($(this).attr("src")=="src/abierto.png") {
        $('#nav').css("display", "none");
        $(this).attr("src", "src/cerrado.jpg");
    } else {
        $('#nav').css("display", "block");
        $(this).attr("src", "src/abierto.png");
    }
}

/**
 * Muestra un formulario que pide el titulo del boton y
 * el contenido del alert, no pudiendo dejar vacio ninguno de los dos.
 */
function setAlert(){
    $('<form>')
    .addClass('pre-form')
    .append(inputTitulo())
    .append(inputContenido())
    .append(setBotones(click))
    .appendTo('body')
    .centrar();

    /**
     * Funcion que realiza la craeción del alert.
     * @param  {Event} e Evento que ha disparado esta accion.
     */
    function click(e) {
        e.preventDefault();
        var contenido = $('#setContenido').val();
        var titulo = $('#setTitulo').val();
        if (titulo && contenido) {
            $('<div>')
            .addClass('draggable')
            .append(
                $('<button>')
                .html(titulo)
                .data('data', contenido)
                .on('click', (e)=>{
                    alert($(e.target).data('data'));
                })
            )
            .draggable()
            .appendTo('body');
            $(e.target).parent().parent().remove();
        } else {
            alert('Rellene el campo de "Titulo" y "Contenido" o pulse "Cancelar" para salir.');
        }
    }
}

/**
 * Muestra un formulario que pide el tamaño del titulo, el titulo en sí y
 * el contenido del articulo, pudiendo dejar vacio uno de los dos.
 */
function setArticulo() {
    $('<form>')
    .attr('class', 'pre-form')
    .append(
        $('<p>')
        .append($('<label>').attr('for', 'setTamaño').html('Tamaño: '))
        .append(
            $('<select>')
            .attr('id', 'setTamaño')
            .append($('<option>').attr('value', 'h1').html('H1'))
            .append($('<option>').attr('value', 'h2').html('H2'))
            .append($('<option>').attr('value', 'h3').html('H3'))
        )
    )
    .append(inputTitulo())
    .append(inputContenido())
    .append(setBotones(click))
    .appendTo('body')
    .centrar();

    /**
     * Funcion que realiza la craeción del alert.
     * @param  {Event} e Evento que ha disparado esta accion.
     */
    function click(e) {
        e.preventDefault();

        var titulo = $('#setTitulo').val();
        var contenido = $('#setContenido').val();
        if (titulo || contenido) {
            var $div = $('<div>').addClass('draggable');

            if (titulo) {
                $div.append(
                    $(`<${$('#setTamaño :selected').val()}>`)
                    .html(titulo)
                );
            }

            if (contenido) {
                $div.append($('<p>').html(contenido));
            }

            $div.draggable().appendTo('.principal');

            $(e.target).parent().parent().remove();
        } else {
            alert('Rellene el campo de "Titulo" o el de "Contenido" o pulse "Cancelar" para salir.');
        }
    }
}

/**
 * Muestra un formulario que permite al usuario subir una imagen en su sistema de ficheros,
 * si la imagen es correcta la muestra.
 */
function setImagen() {
    var src;

    $('<form>').attr('class', "pre-form")
    .append(
        $('<p>')
        .append($('<label>').attr('for', 'setImagen').html('Imagen: '))
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
    .append(inputContenido())
    .append(setBotones(click))
    .appendTo('body')
    .centrar();

    /**
     * Funcion que realiza la craeción del alert.
     * @param  {Event} e Evento que ha disparado esta accion.
     */
    function click(e) {
        e.preventDefault();
        var $div = $('<div>')
        .css('width', '200px')
        .addClass('draggable');
        var $fig = $('<figure>').addClass('img-insitu');

        if (src) {
            $fig.append(
                $('<img>')
                .attr('src', src)
            )
        } else {
            $fig.append(
                $('<img>')
                .attr('src', 'src/photos/eduardo.png')
            )
        }

        if ($('#setContenido').val()) {
            $fig.append(
                $('<figcaption>')
                .html($('#setContenido').val())
            )
        }

        $div
        .append($fig)
        .draggable()
        .appendTo('body');
        $(e.target).parent().parent().remove();
    }
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
    .append(setBotones(click))
    .appendTo('body')
    .centrar();

    /**
     * Funcion que realiza la craeción del alert.
     * @param  {Event} e Evento que ha disparado esta accion.
     */
    function click(e) {
        e.preventDefault();
        var filas = $('#setFila').val();
        var columnas = $('#setColumna').val();
        if (filas >=1 && columnas>=1 && filas <=20 && columnas<=20) {
            generarTabla(filas, columnas);
            $(e.target).parent().parent().remove();
        } else {
            alert('Introduzca ambos numeros positivos y enteros mayores que 1 y menores que 20.')
        }
    }

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
            $thead.append($('<th>').on('click', setContenido));
        }

        for (let i = 0; i < filas-1; i++) {
            var $tr = $('<tr>');
            for (let i = 0; i < columnas; i++) {
                $tr.append($('<td>').on('click', setContenido));
            }
            $tbody.append($tr);
        }

        $('<div>')
        .addClass('draggable')
        .append($table.append($thead).append($tbody))
        .draggable()
        .appendTo('body');

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

/**
* Boton predeterminado para cancelar un formulario.
* Deshabilita la accion por defecto del boton y elimina el formulario.
*/
function setBotones(click) {
    return $('<p>')
    .append(
        $('<input>')
        .attr({
            type: 'submit',
            value: 'Confirmar',
        })
        .on('click', (e) => {
            click(e);
        })
    )
    .append(botonCancelar());
}

/**
 * Devuelve el input encargado de recoger el titulo con su label.
 * @return {jQuery} Parrafo con label e input de tipo text.
 */
function inputTitulo() {
    return $('<p>')
    .append(
        $('<label>')
        .attr('for', 'setTitulo')
        .html('Titulo: ')
    )
    .append(
        $('<input>')
        .attr({
            id: 'setTitulo',
            type: 'text',
        })
    );
}

/**
 * Devuelve el input encargado de recoger el contenido con su label.
 * @return {jQuery} Parrafo con label e input de tipo text.
 */
function inputContenido() {
    return $('<p>')
    .append(
        $('<label>')
        .attr('for', 'setContenido')
        .html('Contenido: ')
    )
    .append(
        $('<input>')
        .attr({
            id: 'setContenido',
            type: 'text',
        })
    );
}

/**
 * Funcion que realiza la craeción del alert.
 * @param  {Event} e Evento que ha disparado esta accion.
 */
// function click(e) {
//
// }
