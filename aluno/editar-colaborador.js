function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

var id_colaborador = GetURLParameter("id");

//Processar formulário
$('#form-editar-colaborador').submit(function (event) {

    event.preventDefault();

    dataNascimento = new Date($('#input-dataNascimento').val());

    //Criar formData
    var formData = {
        'id': id_colaborador,
        'name': $('#input-name').val(),
        'telefone': $('#input-telefone').val(),
        'cargaHoraria': $('#input-cargaHoraria').val(),
        'salario': $('#input-salario').val(),
        'escolaridade': $('#input-escolaridade').val(),
        'email': $('#input-email').val(),
        'senha': $('#input-senha').val(),
        'areaInteresse': $('#input-areaInteresse').val(),
        'dataNascimento': dataNascimento.toISOString(),
        'cpf': $('#input-cpf').val()
    };

    console.log(JSON.stringify(formData));

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: 'PUT',
        url: 'http://localhost:8080/api/colaborador/edit',
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function (data) {
            location.href = 'listar-colaboradores.html';
        },
        error: function (data) {
            $('#div-alert-message').prepend(data.responseText);
            $('#div-alert-message').fadeIn();
        }
    });
 });

 function esconderAlert() {
    $('#div-alert-message').html("<a class='close' onclick='esconderAlert()'>×</a>");
    $('#div-alert-message').hide();
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getUTCMonth() + 1),
        day = '' + d.getUTCDate(),
        year = d.getUTCFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:8080/api/colaborador/getById/' + id_colaborador,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#input-name").val(data.name);
            $("#input-telefone").val(data.telefone);
            $("#input-cargaHoraria").val(data.cargaHoraria);
            $("#input-salario").val(data.salario);
            $("#input-escolaridade").val(data.escolaridade);
            $("#input-email").val(data.email);
            $("#input-senha").val(data.senha);
            $("#input-areaInteresse").val(data.areaInteresse);
            $("#input-dataNascimento").val(formatDate(new Date(data.dataNascimento)));
            $("#input-cpf").val(data.cpf);
        }
    })

});
