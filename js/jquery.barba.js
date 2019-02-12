$.fn.parpadea = function() {
    this.each(function(){
        elem = $(this);
        elem.fadeIn(2000, function(){
            $(this).fadeOut(2000);
        });
    });

    $.fn.centrar=function(){
        var elemento=$(this);
        cambiarCss();

        $(window).on("resize", cambiarCss);

        function cambiarCss(){
            var altoVentana=$(window).height();
            var anchoVentana=$(window).width();

            $(elemento).css({
                "position":"absolute",
                "left": anchoVentana/2-200,
                "top": altoVentana/2-200,
            });
        };

    };
};
