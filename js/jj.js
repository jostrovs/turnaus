// Toggleable.js

(function ($) {
    var handledIds = [];

    var toggleableAutoId = 1;

    var getSettings = function(options){
        let settings = $.extend({
            hideOnStart: true,
            addToggleElement: true,
            useHeaderElement: true
        }, options);
        if (!settings.addToggleElement) settings.useToggleElement = true;
        return settings;
    }

    $.fn.jjToggleable = function (options) {
        let settings = getSettings(options);

        // this osoittaa diviin, joka toggletetaan.
        
        let $headerElement = $(this).prev();

        makeToggleable($headerElement, settings);

        return this;
    };

    $.fn.jjNextToggleable = function (options) {
        let settings = getSettings(options);

        // this osoittaa header-elementtiin

        $.each(this, function (index, element) {
            makeToggleable(element, settings);
        });

        return this;
    };

    var makeToggleable = function (header_element, settings) {
        // element osoittaa toggle-elementtiin
        let $toggledDiv = $(header_element).next("div");

        let id = $toggledDiv.attr("id");
        if (id === undefined || id === "") {
            id = "jjtoggleableAutoId_" + (toggleableAutoId++).toString();
            $toggledDiv.attr("id", id);
        }

        // Ei käsitellä montaa kertaa
        if($.inArray(id, handledIds) > -1) return;
        handledIds.push(id);

        let idShow = id + "_show";
        let idHide = id + "_hide";

        let toggle = function (e) {
            $("#" + idShow).toggle();
            $("#" + idHide).toggle();
            $("#" + id).toggle("slow");
            e.stopPropagation();
        };

        if (settings.addToggleElement) {
            // Lisätään + ja - elementit
            $(header_element).append("<span class='jj-toggle-show' id= " + idShow + ">+</span>");
            $(header_element).append("<span class='jj-toggle-hide' id= " + idHide + ">-</span>");

        }

        if (settings.useHeaderElement) {
            // Käytetään suoraan header-elementtiä
            $(header_element).click(toggle);
            // Laitetaan elementin kursoriksi sormi
            $(header_element).css("cursor", "pointer");
        }

        if (settings.hideOnStart) {
            $toggledDiv.css("display", "none");
            $("#" + idHide).css("display", "none");
        } else {
            $("#" + idShow).css("display", "none");
        }

        $("#" + idShow).click(toggle);
        $("#" + idHide).click(toggle);

        return this;

    };

    $(document).ready(function () {

    });
})(jQuery);

var jj_init = function(){
        $(".jj-toggle").each(function (index) {
            $(this).jjToggleable({hideOnStart: false});
        });
        $(".jj-toggle-next").each(function (index) {
            $(this).jjNextToggleable({hideOnStart: false});
        });
};