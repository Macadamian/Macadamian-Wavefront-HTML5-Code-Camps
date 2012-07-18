/*
 * Copyright (c) 2012 Macadamian Technologies Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

$(document).ready(function() {
    // 2D transforms and transitions available?
    if (!Modernizr.csstransforms || !Modernizr.csstransitions) {
        $("[role=main]").html("This browser does not support CSS transforms or transitions which are required for this demo.");
    }
    else {
        // bind functionality to buttons                
        $("#btnRotateIt").click(function() {
            $("#btnRotateIt").attr("disabled", "true");
            $("#imgHTML5Logo").toggleClass("rotated-90deg");
        });
        
        // bind function to end event for webkit and mozilla
        function onAnimationEnd(event) {
            $("#btnRotateIt").removeAttr('disabled');
        }
        $("#imgHTML5Logo").bind("webkitTransitionEnd", onAnimationEnd);
        $("#imgHTML5Logo").bind("transitionend", onAnimationEnd);

    }
});