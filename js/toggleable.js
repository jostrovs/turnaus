// Toggleable.js

(function toggleable(){
    var toggleableAutoId = 1;
    $(document).ready(function(){
        $(".toggleable").each(function( index ) {
            var id = this.id;
            if(id === undefined || id === ""){
                let newId = "toggleableAutoId_" + (toggleableAutoId++).toString();
                $(this).attr("id", newId);
                id = this.id;
            }

            let id2 = id + "_toggle";
            $("<a id= " + id2 + ">Toggle on</a>").insertBefore($(this));
            $("#" + id2).click(function(){
                $("#"+id).toggle();
            });

            $(this).css("display", "none");

        });
        //$("<a>Linkki</a>").insertBefore(".toggleable");
    });
})();