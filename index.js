$(document).ready(onInit);

function onInit() {
    
    $.ajax({
        url: "http://localhost:8080/api/colaborador/cont",
        type: "get",
        dataType: "json",
        success: function (res) {
            $("#div-total-alunos").html(res);
        }
    });

}