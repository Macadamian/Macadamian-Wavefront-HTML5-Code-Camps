$(document).ready(function() {
    // 2D transforms
    if (!Modernizr.csstransforms) {
        document.writeln('css transforms not supported :(');
    }
    else {
        document.writeln('css transforms supported :)');
    }
    document.writeln("<br>");
    
    // 3D transforms
    if (!Modernizr.csstransforms3d) {
        document.writeln('css 3d transitions not supported :(');
    }
    else {
        document.writeln('css 3d transitions supported :)');
    }
    document.writeln("<br>");

    // transitions
    if (!Modernizr.csstransitions) {
        document.writeln('css transitions not supported :(');
    }
    else {
        document.writeln('css transitions supported :)');
    }
    document.writeln("<br>");

    // animations
    if (!Modernizr.cssanimations) {
        document.writeln('css animations not supported :(');
    }
    else {
        document.writeln('css animations supported :)');
    }
});