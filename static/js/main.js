function init(){
    $(".poster").click(function (e){addGallery()})
    $(".chapter a").click(function(e) {
        var height = $(this).parent().find("div").first().height();
        if( height > 0 ) {
            $(this).parent().find("div").first().css('height','0');
        } else {
            $(this).parent().find("div").first().css({'position':'absolute','visibility':'hidden','height':'auto'});
            var newHeight = $(this).parent().find("div").first().height();
            $(this).parent().find("div").first().css({'position':'static','visibility':'visible','height':'0'});
            $(this).parent().find("div").first().css('height',newHeight + 'px');
        }

        e.preventDefault();
    })
}
$(document).ready(function() {
    init()
});

$(function() {

    // Find all YouTube videos
    var $allVideos = $("iframe[src^='http://www.youtube.com']")
    var $allPics= $(".poster")
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
        $allPics.each(function() {
            $(this).css("max-width",newWidth+"px")
        });
        // Kick off one resize to fix all videos on page load
    }).resize();

});

function addGallery(){
    var picArray=[]
    for(var i=0;i<$(".poster").length;i++){
        var obj={}
        obj.url=$(".poster").eq(i).attr("src")
        obj.caption = ""
        picArray.push(obj)
    }
    var options = {
            margin: 20,
            getImageSource: function(obj){
                return obj.url;
            },
            getImageCaption: function(obj){
                return obj.caption;
            }
        },
        instance = Code.PhotoSwipe.attach(
            picArray,
            options
        );
    instance.show(0);
}

