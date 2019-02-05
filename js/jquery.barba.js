jQuery.fn.parpadea = function() {
    this.each(function(){
        elem = $(this);
        elem.fadeIn(2000, function(){
            $(this).fadeOut(2000);
        });
    });
    return this;
};
