function listarColaboradores() {
    $.ajax({
        url: 'http://localhost:8080/api/colaborador',
        type: 'get',
        dataType: 'json',
        success: function (result) {
            console.log(result);
            var html = '';
            $.each(result, function (i, data) {
                var datetime = new Date(data.dataNascimento);
                var date = datetime.toISOString().split('T')[0];
                html += `<tr><td>` + data.name + `</td>`;
                html += `<td>` + data.email + `</td>`;
                html += `<td>` + data.cpf + `</td>`;
                html += `<td>` + data.telefone + `</td>`;
                html += `<td>` + data.salario + `</td>`;
                html += `<td>` + data.areaInteresse + `</td>`;
                html += `<td>` + data.cargaHoraria + `</td>`;
                html += `<td>` + date + `</td>`;
                html += `<td>` + data.empresa.name + `</td>`;
                html += `<td>`; 
                html += `<button class="btn" data-bs-toggle="modal" data-bs-target="#myModal" onclick="preencherModal(decodeURIComponent('` + encodeURIComponent(JSON.stringify(data)) + `'))"><i class="fa fa-edit"></i></button> `;
                html += `<a href="#" onclick="removerColaborador(` + data.id + `)"><i class="fa fa-trash"></i></a>`;
                html += `</td></tr>`;
            });

            $("#TableColaboratorBody").html(html);

            // Inicialização da Tabela
            $('#TableColaborator').DataTable();
        }
    });
}

function listarEmpresas() {
    $.ajax({
        url: 'http://localhost:8080/api/empresa', 
        type: 'get',
        dataType: 'json',
        success: function (result) {
            var select = $('#nomeEempresa'); 
            $.each(result, function (i, data) {
                select.append($('<option>', {
                    value: data.id,
                    text: data.name
                }));
            });
        }
    });
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
function preencherModal(data) {
    data = JSON.parse(data);
    console.log(data);
    $("#nome").val(data.name);
    $("#email").val(data.email);
    $("#cpf").val(data.cpf);
    $("#telefone").val(data.telefone);
    $("#salario").val(data.salario);
    $("#areaInteresse").val(data.areaInteresse);
    $("#cargaHoraria").val(data.cargaHoraria);
    $("#dataNascimento").val(formatDate(new Date(data.dataNascimento)));
    $("#nomeEmpresa").val(data.empresa.name);
    
}

function limparModal() {
    $("#nome").val('');
    $("#email").val('');
    $("#cpf").val('');
    $("#telefone").val('');
    $("#salario").val('');
    $("#areaInteresse").val('');
    $("#cargaHoraria").val('');
    $("#dataNascimento").val('');
    $('#nomeEmpresa').val('');
}

$("#modalCadastro").click(limparModal);




$(document).ready(listarColaboradores);
