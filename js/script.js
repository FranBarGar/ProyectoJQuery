/**
 * Constantes relacionadas con los titulos.
 */
const INTIT = 'setTitulo', INCOTIT = 'setColorTitulo', INTAM = 'setTamaño';
const TAMANYO = {
    'H1': 'h1',
    'H2': 'h2',
    'H3': 'h3',
};

/**
 * Constantes relacionadas con los contenidos de formato texto.
 */
const INCONT = 'setContenido', INCOCONT = 'setColorContenido';
const INALI = 'setAlineacion', INTILE = 'setTipoLetra';
const ALINE = {
    'Justificada': 'justify',
    'Centrada': 'center',
    'Izquierda': 'left',
    'Derecha': 'right',
};
const TILE = {
    'Arial': 'arial',
    'Calibri': 'calibri',
    'Courier': 'courier',
    'Helvetica': 'helvetica',
    'Verdana': 'verdana',
};

/**
 * Constantes relacionadas con los contenidos de formato texto.
 */
const INTILI = 'setTipoLista';
const TILI = {
    'Numerada': 'ol',
    'No numerada': 'ul'
};

/**
 * Constantes relacionadas con los formularios.
 */
const FORMTYP = {
    'Texto': 'text',
    'Numero': 'number',
    'Fichero': 'file',
    'Color': 'color'
};

/**
 * Constantes relacionadas con los bordes.
 */
const INBORDER = 'setBorder', INCOBORD = 'setColorBorder', INTABORD = 'setTamañoBorder';
const BORDER = {
    'Sin marco': '',
    'Solido': 'solid',
    'Punteado': 'dotted',
    'Doble': 'double',
};

/**
 * Constantes relacionadas con las tablas.
 */
const INFILA = 'setFila', INCOLUM = 'setColumna';

/**
 * Constantes relacionadas con los gradiantes.
 */
const INGRAD = 'setGradient';
const FORMGRAD = {
    'Lineal': 'linear',
    'Radial': 'radial'
};
const ORIGRAD = {
    'Horizontal': 'to bottom',
    'Vertical': 'to right'
};

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
        .addClass('bienvenida')
        .append($('<h1>').html('Proyecto JQuery DIW'))
        .append($('<h2>').html('por: Francisco Barba García'))
        .appendTo('body')
        .parpadea();

        $('<nav>')
        .css('width', '100px')
        .append(
            $('<img>')
            .attr({
                id: 'desplegable',
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
            })
            .attr('id', 'nav')
            .append(
                $('<p>')
                .css('margin', '5px')
                .html('Añadir: ')
            )
            .append(createOpcion('· Articulo', setArticulo))
            .append(createOpcion('· Enlace', setEnlace))
            .append(createOpcion('· Boton con alert', setAlert))
            .append(createOpcion('· Lista', setLista))
            .append(createOpcion('· Formulario', setFormulario))
            .append(createOpcion('· Tabla', setTabla))
            .append(createOpcion('· Imagen', setImagen))
            .append(
                $('<p>')
                .css('margin', '5px')
                .html('Fondo: ')
            )
            .append(createOpcion('· Imagen', setImagenFondo))
            .append(createOpcion('· Un color', setColorFondo))
            .append(createOpcion('· Dos colores', setColorFondoDos))
            .append(createOpcion('· Tres colores', setColorFondoTres))
            .append(
                createOpcion('Terminar', (e) => {
                    if ($('.principal').children().length > 0) {
                        $('nav').remove();
                        $('.diseño').remove();
                        $('.pre-form').remove();
                        $('table *').off();
                        $( ".draggable" ).draggable( "destroy" );
                    } else {
                        alert('Para terminar e ir a la vista final debes introducir al menos un elemento.');
                    }
                })
            )
        )
        .draggable()
        .appendTo('body');

        $('<div>').addClass('principal').appendTo('body');
    }, 2000);
}

/**
 * Se encarga de cambiar entre vista preliminar y vista diseño.
 */
function desplegable() {
    if ($(this).attr("src")=="src/abierto.png") {
        $(this).attr("src", "src/cerrado.jpg");
        $('#nav').hide();
        $('.diseño').hide();
        $('.pre-form').hide();
        $( ".draggable" ).draggable( "disable" );
    } else {
        $(this).attr("src", "src/abierto.png");
        $('#nav').show();
        $('.diseño').show();
        $('.pre-form').show();
        $( ".draggable" ).draggable( "enable" );
    }
}

/**
* Muestra un formulario que pide el tamaño del titulo, el titulo en sí y
* el contenido del articulo, pudiendo dejar vacio uno de los dos.
*/
function setArticulo() {
    if (comprobarFormulario()) {
        $('<form>')
        .attr('class', 'pre-form')
        .append(createSelect(INTAM, TAMANYO, 'Tamaño del titulo'))
        .append(createSelect(INALI, ALINE, 'Alineación'))
        .append(createSelect(INTILE, TILE, 'Tipo de letra'))
        .append(createInput(INTIT, 'text', 'Titulo'))
        .append(createInput(INCOTIT, 'color', 'Color del titulo'))
        .append(
            $('<p>')
            .append($('<label>').attr('for', INCONT).html('Contenido: '))
            .append($('<textarea>').attr('id', INCONT))
        )
        .append(createInput(INCOCONT, 'color', 'Color del contenido'))
        .append(createSelect(INBORDER, BORDER, 'Marco'))
        .append(createInput(INTABORD, 'number', 'Grosor del marco'))
        .append(createInput(INCOBORD, 'color', 'Color del marco'))
        .append(inputBotones(click))
        .appendTo('body');
    }

    /**
    * Funcion que realiza la craeción del alert.
    * @param  {Event} e Evento que ha disparado esta accion.
    */
    function click(e) {
        e.preventDefault();

        var titulo = $('#'+INTIT).val();
        var contenido = $('#'+INCONT).val();

        if (titulo || contenido) {
            var $div = divDraggable().css({
                'max-width': '70%',
                'text-align': $('#'+INALI).val(),
                'font-family': $(`#${INTILE} :selected`).val(),
                border: `${$('#'+INTABORD).val()}px ${$(`#${INBORDER} :selected`).val()} ${$(`#${INCOBORD}`).val()}`,
            });

            if (titulo) {
                $div.append(
                    $(`<${$(`#${INTAM} :selected`).val()}>`)
                    .css('color', $('#'+INCOTIT).val())
                    .append(titulo)
                );
            }

            if (contenido) {
                $div
                .append(
                    $('<p>')
                    .css({
                        'white-space': 'wrap',
                        color: $('#'+INCOCONT).val(),
                    })
                    .text(contenido)
                );
            }

            $div
            .append(botonEliminar())
            .appendTo('.principal');

            $(e.target).parents('form').remove();
        } else {
            alert('Rellene el campo de "Titulo" o el de "Contenido" o pulse "Cancelar" para salir.');
        }
    }
}

/**
* Muestra un formulario que pide el titulo del enlace y el enlace
*/
function setEnlace() {
    if (comprobarFormulario()) {
        $('<form>')
        .attr('class', 'pre-form')
        .append(createInput(INTIT, 'text', 'Titulo'))
        .append(createSelect(INTILE, TILE, 'Tipo de letra'))
        .append(createInput(INCOTIT, 'color', 'Color del titulo'))
        .append(createInput(INCONT, 'text', 'Contenido'))
        .append(inputBotones(click))
        .appendTo('body');
    }

    /**
     * Funcion que realiza la craeción del alert.
     * @param  {Event} e Evento que ha disparado esta accion.
     */
    function click(e) {
        e.preventDefault();

        var titulo = $('#'+INTIT).val();
        var contenido = $('#'+INCONT).val();

        if (titulo && contenido) {
            divDraggable()
            .append(
                $(`<a>`)
                .attr({
                    href: contenido,
                    target: '_blank'
                })
                .css({
                    color: $('#'+INCOTIT).val(),
                    'font-family': $(`#${INTILE} :selected`).val(),
                })
                .html(titulo)
            )
            .append(botonEliminar())
            .appendTo('.principal');

            $(e.target).parents('form').remove();
        } else {
            alert('Rellene el campo de "Titulo" o el de "Contenido" o pulse "Cancelar" para salir.');
        }
    }
}

/**
 * Muestra un formulario que pide el titulo del boton y
 * el contenido del alert, no pudiendo dejar vacio ninguno de los dos.
 */
function setAlert(){
    if (comprobarFormulario()) {
        $('<form>')
        .addClass('pre-form')
        .append(createInput(INTIT, 'text', 'Titulo del boton'))
        .append(createInput(INCONT, 'text', 'Contenido del alert'))
        .append(inputBotones(click))
        .appendTo('body');
    }

    /**
     * Funcion que realiza la craeción del alert.
     * @param  {Event} e Evento que ha disparado esta accion.
     */
    function click(e) {
        e.preventDefault();
        var contenido = $('#'+INCONT).val();
        var titulo = $('#'+INTIT).val();
        if (titulo && contenido) {
            divDraggable()
            .append(
                $('<button>')
                .html(titulo)
                .data('data', contenido)
                .on('click', (e)=>{
                    alert($(e.target).data('data'));
                })
            )
            .append(botonEliminar())
            .appendTo('.principal');
            $(e.target).parents('form').remove();
        } else {
            alert('Rellene el campo de "Titulo" y "Contenido" o pulse "Cancelar" para salir.');
        }
    }
}

/**
* Muestra un formulario que pide al usuario el tipo de lista y la añade.
*/
function setLista() {
    if (comprobarFormulario()) {
        $('<form>')
        .addClass('pre-form')
        .append(createSelect(INTILI, TILI, 'Tipo de lista'))
        .append(createSelect(INTILE, TILE, 'Tipo de letra'))
        .append(inputBotones(click))
        .appendTo('body');
    }

    /**
    * Funcion que realiza la craeción de la lista.
    * @param  {Event} e Evento que ha disparado esta accion.
    */
    function click(e) {
        e.preventDefault();

        var tipo = $(`#${INTILI} :selected`).val();
        divDraggable()
        .css({
            'text-align': 'left',
            'max-width': '70%',
            'font-family': $(`#${INTILE} :selected`).val(),
        })
        .append($(`<${tipo}>`))
        .append($('<input>').attr('type', 'text').addClass('diseño'))
        .append(
            $('<input>')
            .attr({
                type: 'submit',
                value: 'Añadir'
            })
            .addClass('diseño')
            .on('click', {tipo: tipo}, (e) => {
                e.preventDefault();

                var $text = $(e.target).siblings('input');
                $(e.target).siblings(tipo).append($('<li>').html($text.val()));
                $text.val('');
            })
        )
        .append(botonEliminar())
        .appendTo('.principal');

        $(e.target).parents('form').remove();

    }
}

/**
* Muestra un formulario que pide al usuario el tipo de lista y la añade.
*/
function setFormulario() {
    if (comprobarFormulario()) {
        $('<form>')
        .addClass('pre-form')
        .append(createSelect(INTILE, TILE, 'Tipo de letra'))
        .append(createInput(INCOCONT, 'color', 'Color del contenido'))
        .append(createSelect(INBORDER, BORDER, 'Marco'))
        .append(createInput(INTABORD, 'number', 'Grosor del marco'))
        .append(createInput(INCOBORD, 'color', 'Color del marco'))
        .append(inputBotones(click))
        .appendTo('body');
    }

    /**
    * Funcion que realiza la craeción de la lista.
    * @param  {Event} e Evento que ha disparado esta accion.
    */
    function click(e) {
        e.preventDefault();

        divDraggable()
        .css({
            'text-align': 'left',
            'width': '400px',
            'font-family': $(`#${INTILE} :selected`).val(),
        })
        .append(
            $(`<form>`)
            .css({
                color: $('#'+INCOCONT).val(),
                border: `${$('#'+INTABORD).val()}px ${$(`#${INBORDER} :selected`).val()} ${$(`#${INCOBORD}`).val()}`,
            })
            .append($('<button>').html('Enviar'))
            .append($('<button>').html('Cancelar'))
            .on('submit', (e) => {
                e.preventDefault();
            })
        )
        .append(
            $('<span>')
            .addClass('diseño')
            .html('Etiqueta: ')
            .append($('<input>').attr('type', 'text'))
            .append(createSelect('', FORMTYP, 'Tipo'))
            .append(
                $('<input>')
                .attr({
                    type: 'submit',
                    value: 'Añadir'
                })
                .on('click', (e) => {
                    e.preventDefault();

                    var $select = $(e.target).siblings('p').find('select :selected');
                    var $text = $(e.target).siblings('input');
                    $(e.target)
                    .parent()
                    .siblings('form')
                    .prepend(createInput('', $select.val(), $text.val()));
                    $text.val('');
                })
            )
        )
        .append(botonEliminar())
        .appendTo('.principal');

        $(e.target).parents('form').remove();

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
    if (comprobarFormulario()) {
        $('<form>')
        .addClass('pre-form')
        .append(createInput(INFILA, 'number', 'Numero de filas'))
        .append(createInput(INCOLUM, 'number', 'Numero de columnas'))
        .append(createSelect(INTILE, TILE, 'Tipo de letra'))
        .append(createSelect(INBORDER, BORDER, 'Marco'))
        .append(createInput(INTABORD, 'number', 'Grosor del marco'))
        .append(createInput(INCOBORD, 'color', 'Color del marco'))
        .append(inputBotones(click))
        .appendTo('body');
    }

    /**
    * Funcion que realiza la craeción del alert.
    * @param  {Event} e Evento que ha disparado esta accion.
    */
    function click(e) {
        e.preventDefault();
        var filas = $('#'+INFILA).val();
        var columnas = $('#'+INCOLUM).val();
        if (filas >=1 && columnas>=1 && filas <=20 && columnas<=20) {
            generarTabla(filas, columnas);
            $(e.target).parents('form').remove();
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
            $thead.append(
                $('<th>')
                .css({
                    'font-family': $(`#${INTILE} :selected`).val(),
                    border: `${$('#'+INTABORD).val()}px ${$(`#${INBORDER} :selected`).val()} ${$(`#${INCOBORD}`).val()}`,
                })
                .on('click', setContenido)
            );
        }

        for (let i = 0; i < filas-1; i++) {
            var $tr = $('<tr>');
            for (let i = 0; i < columnas; i++) {
                $tr.append(
                    $('<td>')
                    .css({
                        'font-family': $(`#${INTILE} :selected`).val(),
                        border: `${$('#'+INTABORD).val()}px ${$(`#${INBORDER} :selected`).val()} ${$(`#${INCOBORD}`).val()}`,
                    })
                    .on('dblclick', setContenido)
                );
            }
            $tbody.append($tr);
        }

        divDraggable()
        .append($table.append($thead).append($tbody))
        .append(botonEliminar())
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
 * Muestra un formulario que permite al usuario subir una imagen en su sistema de ficheros,
 * si la imagen es correcta la muestra.
 */
function setImagen() {
    var src;

    if (comprobarFormulario()) {
        $('<form>')
        .attr('class', "pre-form")
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
        .append(createInput(INCONT, 'text', 'Pie de foto'))
        .append(createSelect(INTILE, TILE, 'Tipo de letra'))
        .append(createInput(INCOCONT, 'color', 'Color del pie de foto'))
        .append(createSelect(INBORDER, BORDER, 'Marco'))
        .append(createInput(INTABORD, 'number', 'Grosor del marco'))
        .append(createInput(INCOBORD, 'color', 'Color del marco'))
        .append(inputBotones(click))
        .appendTo('body');
    }

    /**
     * Funcion que realiza la craeción del alert.
     * @param  {Event} e Evento que ha disparado esta accion.
     */
    function click(e) {
        e.preventDefault();
        var $div = divDraggable().css({
            width: '250px',
            border: `${$('#'+INTABORD).val()}px ${$(`#${INBORDER} :selected`).val()} ${$(`#${INCOBORD}`).val()}`,
        });
        var $fig = $('<figure>');

        if (src) {
            $fig.append(
                $('<img>')
                .attr('src', src)
                .css('width', '250px')
            )
        } else {
            $fig.append(
                $('<img>')
                .attr('src', 'src/photos/eduardo.png')
            )
        }

        if (contenido = $('#'+INCONT).val()) {
            $fig.append(
                $('<figcaption>')
                .css({
                    'white-space': 'wrap',
                    'font-family': $(`#${INTILE} :selected`).val(),
                    color: $('#'+INCOCONT).val(),
                })
                .html(contenido)
            )
        }

        $div
        .append($fig)
        .append(botonEliminar())
        .appendTo('.principal');
        $(e.target).parents('form').remove();
    }
}

/**
 * Muestra un formulario que permite al usuario subir una imagen en su sistema de ficheros,
 * si la imagen es correcta, la pone de fondo de pante.
 */
function setImagenFondo() {
    var src;

    if (comprobarFormulario()) {
        $('<form>')
        .attr('class', "pre-form")
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
        .append(inputBotones(click))
        .append(
            $('<input>')
            .attr({
                type: 'submit',
                value: 'Quitar Imagen',
            })
            .on('click', (e) => {
                e.preventDefault();
                $('body').css('background-image', '');
                $(e.target).parents('form').remove();
            })
        )
        .appendTo('body');
    }

    /**
     * Funcion que pone la imagen indicada de fondo.
     * @param  {Event} e Evento que ha disparado esta accion.
     */
    function click(e) {
        e.preventDefault();

        if (!src) {
            src = 'src/photos/eduardo.png'
        }

        $('body').css({
            'background-image': 'url('+src+')',
            'background-repeat': 'repeat',
            height: '100%',
            'background-size': 'cover',
        })

        $(e.target).parents('form').remove();
    }
}

/**
 * Pone un color de fondo a elegir por el usuario.
 */
function setColorFondoTres() {
    if (comprobarFormulario()) {
        $('<form>')
        .attr('class', "pre-form")
        .on('change', 'input[type=color], select', (e) => {
            var co1 = $('#'+INCOTIT+1).val();
            var co2 = $('#'+INCOTIT+2).val();
            var co3 = $('#'+INCOTIT+3).val();
            var form = $('#'+INGRAD+1+' :selected').val();
            var ali = (form != 'radial') ? $('#'+INGRAD+2+' :selected').val()+', ' : '';
            $('#actual').css({
                'background-image': ''+form+'-gradient('+ali+co1+', '+co2+', '+co3+')'
            })
        })
        .append(createSelect(INGRAD+1, FORMGRAD, 'Forma'))
        .append(createSelect(INGRAD+2, ORIGRAD, 'Alineación'))
        .append(createInput(INCOTIT+1, 'color', 'Color1 del radiante'))
        .append(createInput(INCOTIT+2, 'color', 'Color2 del radiante'))
        .append(createInput(INCOTIT+3, 'color', 'Color3 del radiante'))
        .append(
            $('<p>').append(
                $('<div>')
                .attr({
                    id: 'actual',
                })
                .css({
                    height: '200px',
                    width: '200px',
                    'background-image': 'linear-gradient(black, black, black)',
                })
            )
        )
        .append(inputBotones(click))
        .appendTo('body');
    }

    /**
     * Funcion que pone la imagen indicada de fondo.
     * @param  {Event} e Evento que ha disparado esta accion.
     */
    function click(e) {
        e.preventDefault();

        var co1 = $('#'+INCOTIT+1).val();
        var co2 = $('#'+INCOTIT+2).val();
        var co3 = $('#'+INCOTIT+3).val();
        var form = $('#'+INGRAD+1+' :selected').val();
        var ali = (form != 'radial') ? $('#'+INGRAD+2+' :selected').val()+', ' : '';

        $('body').css({
            'background-image': ''+form+'-gradient('+ali+co1+', '+co2+', '+co3+')',
            height: '100vh',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
        })

        $(e.target).parents('form').remove();
    }
}

/**
 * Pone un color de fondo a elegir por el usuario.
 */
function setColorFondoDos() {
    if (comprobarFormulario()) {
        $('<form>')
        .attr('class', "pre-form")
        .on('change', 'input[type=color], select', (e) => {
            var co1 = $('#'+INCOTIT+1).val();
            var co2 = $('#'+INCOTIT+2).val();
            var form = $('#'+INGRAD+1+' :selected').val();
            var ali = (form != 'radial') ? $('#'+INGRAD+2+' :selected').val()+', ' : '';
            $('#actual').css({
                'background-image': ''+form+'-gradient('+ali+co1+', '+co2+')'
            })
        })
        .append(createSelect(INGRAD+1, FORMGRAD, 'Forma'))
        .append(createSelect(INGRAD+2, ORIGRAD, 'Alineación'))
        .append(createInput(INCOTIT+1, 'color', 'Color1 del radiante'))
        .append(createInput(INCOTIT+2, 'color', 'Color2 del radiante'))
        .append(
            $('<p>').append(
                $('<div>')
                .attr({
                    id: 'actual',
                })
                .css({
                    height: '200px',
                    width: '200px',
                    'background-image': 'linear-gradient(black, black)',
                })
            )
        )
        .append(inputBotones(click))
        .appendTo('body');
    }

    /**
     * Funcion que pone la imagen indicada de fondo.
     * @param  {Event} e Evento que ha disparado esta accion.
     */
    function click(e) {
        e.preventDefault();

        var co1 = $('#'+INCOTIT+1).val();
        var co2 = $('#'+INCOTIT+2).val();
        var form = $('#'+INGRAD+1+' :selected').val();
        var ali = (form != 'radial') ? $('#'+INGRAD+2+' :selected').val()+', ' : '';

        $('body').css({
            'background-image': ''+form+'-gradient('+ali+co1+', '+co2+')',
            height: '100vh',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
        })

        $(e.target).parents('form').remove();
    }
}

/**
 * Pone un color de fondo a elegir por el usuario.
 */
function setColorFondo() {
    if (comprobarFormulario()) {
        $('<form>')
        .attr('class', "pre-form")
        .on('change', 'input[type=color]', (e) => {
            $('#actual').css({
                'background-color': $('#'+INCOTIT).val()
            })
        })
        .append(createInput(INCOTIT, 'color', 'Color del fondo'))
        .append(
            $('<p>').append(
                $('<div>')
                .attr({
                    id: 'actual',
                })
                .css({
                    height: '200px',
                    width: '200px',
                    'background-color': 'black',
                })
            )
        )
        .append(inputBotones(click))
        .appendTo('body');
    }

    /**
     * Funcion que pone la imagen indicada de fondo.
     * @param  {Event} e Evento que ha disparado esta accion.
     */
    function click(e) {
        e.preventDefault();

        $('body').css({
            'background-color': $('#'+INCOTIT).val(),
            height: '100vh',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
        })

        $(e.target).parents('form').remove();
    }
}

/**
* Boton predeterminado para cancelar un formulario.
* Deshabilita la accion por defecto del boton y elimina el formulario.
* @return {JQuery}       Input completo.
*/
function inputCancelar(value = 'Cancelar') {
    return $('<input>')
    .attr({
        type: 'submit',
        value: value,
    })
    .on('click', (e) => {
        e.preventDefault();
        $(e.target).parent().parent().remove();
    });
}

/**
* Boton predeterminado para cancelar o completar un formulario.
* Deshabilita la accion por defecto del boton y elimina o completa el formulario.
* @param  {callback} click Funcion que completa el formulario.
* @return {JQuery}         Todos los inputs.
*/
function inputBotones(click) {
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
    .append(inputCancelar());
}

/**
 * Boton que elimina el div padre del padre.
 * @return {JQuery}         Boton.
 */
function botonEliminar() {
    return $('<p>')
        .addClass('diseño')
        .append(inputCancelar('Eliminar'));
}

/**
 * Creador base de inputs.
 * @param  {string} id    ID que se le añadirá al input.
 * @param  {string} type  Tipo del input.
 * @param  {string} texto Contenido del label.
 * @return {JQuery}       Input completo.
 */
function createInput(id, type, texto) {
    return $('<p>')
        .append(
            $('<label>')
            .attr('for', id)
            .html(texto+': ')
        )
        .append(
            $('<input>')
            .attr({
                id: id,
                type: type,
            })
        );
}

/**
 * Craedor base de etiquetas select, con sus option incluidos.
 * @param  {string} id    id del select.
 * @param  {array} array Array de las opciones, la clave es lo que se muestra y el valor es el value.
 * @param  {string} texto Texto que se muestra en el label.
 * @return {JQuery}       Select con sus opciones.
 */
function createSelect(id, array, texto) {
    var $p = $('<p>')
    .append(
        $('<label>')
        .attr('for', id)
        .html(texto+': ')
    );

    var $select = $('<select>').attr('id', id);
    for (var key in array) {
        $select.append($('<option>').attr('value', array[key]).html(key));
    }

    return $p.append($select);
}

/**
 * Crea una opcion de la barra de navegación.
 * @param  {string}   texto    Texto descriptivo de la opcion de la barra de navegación.
 * @param  {Function} callback Funcion ligada a la opción.
 * @return {JQuery}            Opción ya creada.
 */
function createOpcion(texto, callback) {
    return $('<li>')
        .append(
            $('<a>')
            .html(texto)
            .on('click', callback)
        );
}

/**
 * Creacion de divs dragables con la clase draggable para
 * evitar repetir codigo.
 * @return {JQuery} Div draggable.
 */
function divDraggable() {
    return $('<div>')
    .addClass('draggable')
    .css({
        position: 'absolute',
        top: '50px',
        left: '200px',
        'min-width': '100px'
    })
    .draggable();
}

/**
 * Comprueba si ya existe un formulario.
 * @return {Boolean} Si existe devuelve falso, si no true.
 */
function comprobarFormulario() {
    if ($('.pre-form').length > 0) {
        alert('Cierre el formulario anterior antes de abrir otro.');
        return false;
    }
    return true;
}
