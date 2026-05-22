import $ from "jquery";

export const events_front = {
    jquerySortable: (diagrama) => {
        $(".sortable").sortable({
            scroll: false,
            handle: ".handle",
            opacity: 0.7,
            scrollSensitivity: 2,
            scrollSpeed: 5,
            update: (event, ui) => {
                let div = event.target.className.split(" ")[1];
                let clasEdit = event.target.className.split(" ")[1].replace('sortable-','');
                let divLi= $(`.${div} li`)
                let listAttributes = []

                divLi.each((index, element)=>{
                    listAttributes.push(element.classList[0].replace('sa-',''))
                })

                diagrama.reorderAttributes(clasEdit, listAttributes)

                //console.log(divLi)
            }
        });
    },
    popover: () => {
        $(function () {
            $('.pov').popover({
                container: 'body',
                trigger: 'hover'
            })
        })
    }
}