function init(){
    $(".chapter a").click(function(e) {
      // $(this).parent().find("div").first().slideToggle("fast");

        $(this).parent().find("div").first().slideToggle("fast", function(){
            if($(this).parent().find("div").first().is(":visible")){
                $("html, body").animate({scrollTop: $(this).parent().offset().top});
            }
        });
        e.preventDefault();
    })
}
$(document).ready(function() {
    init()
});

$(function() {

    // Find all YouTube videos
    var $allVideos = $("iframe[src^='http://www.youtube.com']"),

    // The element that is fluid width
        $fluidEl = $(".inner_chapter").first();

    // Figure out and save aspect ratio for each video
    $allVideos.each(function() {

        $(this)
            .data('aspectRatio', this.height / this.width)

            // and remove the hard coded width/height
            .removeAttr('height')
            .removeAttr('width');

    });

    // When the window is resized
    // (You'll probably want to debounce this)
    $(window).resize(function() {

        var newWidth = 500;
        if($("body").width()<newWidth){
            newWidth=$("body").width()
        }

        // Resize all videos according to their own aspect ratio
        $allVideos.each(function() {

            var $el = $(this);
            $el
                .width(newWidth)
                .height(newWidth * $el.data('aspectRatio'));

        });

        // Kick off one resize to fix all videos on page load
    }).resize();

});