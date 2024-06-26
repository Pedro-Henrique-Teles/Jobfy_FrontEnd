var modo = null;

function listarColaboradores() {
    $.ajax({
        url: 'http://localhost:8080/api/colaborador',
        type: 'get',
        dataType: 'json',
        success: function (result) {
            console.log(result);
            var html = '';
            $.each(result, function (_i, data) {
                var datetime = new Date(data.dataNascimento);
                var date = datetime.toISOString().split('T')[0];
                html += `<tr><td>` + data.name + `</td>`;
                html += `<td>` + data.email + `</td>`;
                html += `<td>` + data.senha + `</td>`;
                html += `<td>` + data.cpf + `</td>`;
                html += `<td>` + data.telefone + `</td>`;
                html += `<td>` + data.salario + `</td>`;
                html += `<td>` + data.areaInteresse + `</td>`;
                html += `<td>` + data.escolaridade + `</td>`;
                html += `<td>` + data.cargaHoraria + `</td>`;
                html += `<td>` + date + `</td>`;
                html += `<td>` + (data.empresa ? data.empresa.name : 'N/A') + `</td>`;
                html += `<td>`; 
                html += `<button class="btn" data-bs-toggle="modal" data-bs-target="#myModal" onclick="preencherModal(decodeURIComponent('` + encodeURIComponent(JSON.stringify(data)) + `'), ` + data.id + `)"><i class="fa fa-edit"></i></button> `;
                html += `<button onclick="removerColaborador(` + data.id + `)"><i class="fa fa-trash"></i></button>`;
                html += `</td></tr>`;
            });

            $("#TableColaboratorBody").html(html);

            // Inicialização da Tabela
            $('#TableColaborator').DataTable();
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

function preencherModal(data, id) {
    data = JSON.parse(data);
    console.log(data);
    modo = "Editar";
    $("#editColab").text(modo + " Colaborador");
    $("#nome").val(data.name);
    $("#email").val(data.email);
    $("#senha").val(data.senha);
    $("#cpf").val(data.cpf);
    $("#telefone").val(data.telefone);
    $("#salario").val(data.salario);
    $("#areaInteresse").val(data.areaInteresse);
    $("#escolaridade").val(data.escolaridade);
    $("#cargaHoraria").val(data.cargaHoraria);
    $("#dataNascimento").val(formatDate(new Date(data.dataNascimento)));
    carregarEmpresas(data.empresa.id); // Carregar as empresas e selecionar a atual
    colaboradorId = id;
    console.log(colaboradorId);
}

function limparModal() {
    modo = "Cadastrar";
    $("#editColab").text(modo + " Colaborador");
    $("#nome").val('');
    $("#email").val('');
    $("#senha").val('');
    $("#cpf").val('');
    $("#telefone").val('');
    $("#salario").val('');
    $("#areaInteresse").val('');
    $("#cargaHoraria").val('');
    $("#escolaridade").val('');
    $("#dataNascimento").val('');
    $('#idEmpresa').val('');
    colaboradorId = null;
    carregarEmpresas(); // Carregar as empresas quando limpar o modal
    console.log(colaboradorId);
}

$("#modalCadastro").click(limparModal);

$(document).ready(listarColaboradores);

var colaboradorId = null;

$("#salvarBotao").click(function(event) {
    event.preventDefault();

    var colaborador = {
        'name': $("#nome").val(),
        'email': $("#email").val(),
        'senha': $("#senha").val(),
        'cpf': $("#cpf").val(),
        'telefone': $("#telefone").val(),
        'salario': $("#salario").val(),
        'areaInteresse': $("#areaInteresse").val(),
        'cargaHoraria': $("#cargaHoraria").val(),
        'escolaridade': $("#escolaridade").val(),
        'dataNascimento': $("#dataNascimento").val(),
        'empresa': {
            'id': $("#idEmpresa").val()
        }
    };

    var url = 'http://localhost:8080/api/colaborador';
    var type = 'post';

    if (colaboradorId !== null) {
        url += '/' + colaboradorId;
        type = 'put';
    }

    $.ajax({
        url: url,
        type: type,
        contentType: 'application/json',
        data: JSON.stringify(colaborador),
        success: function() {
            var message = colaboradorId === null ? 'Colaborador criado com sucesso!' : 'Colaborador atualizado com sucesso!';
            alert(message);
            $('#myModal').modal('hide');
            listarColaboradores();
            colaboradorId = null;  // Limpe o colaboradorId após a operação bem-sucedida
        },
        error: function(res) {
            var message = colaboradorId === null ? 'Erro ao criar o colaborador!' : 'Erro ao atualizar o colaborador!';
            console.log(res.responseText);
            alert(message + " - "+ res.responseText);
        }
    });
});

function removerColaborador(id) {
    if (confirm('Tem certeza de que deseja remover este colaborador?')) {
        $.ajax({
            url: 'http://localhost:8080/api/colaborador/' + id,
            type: 'DELETE',
            success: function(result) {
                // Atualize a tabela ou faça algo
                alert('Colaborador removido com sucesso!');
                listarColaboradores();
            },
            error: function(request,msg,error) {
                // Trate o erro
                alert('Erro ao remover o colaborador!');
            }
        });
    }
}

$.ajax({
    url: 'http://localhost:8080/api/colaborador/cont',
    type: 'get',
    success: function(result) {
        $('#countColab').text(result);
    },
    error: function() {
        console.log('Erro ao obter a contagem de colaboradores');
    }
});

function carregarEmpresas(selectedEmpresaId) {
    $.ajax({
        url: 'http://localhost:8080/api/empresa',
        type: 'get',
        dataType: 'json',
        success: function (result) {
            var select = $("#idEmpresa");
            select.empty();  // Limpar as opções atuais
            select.append('<option value="" disabled>Selecione uma empresa</option>');

            $.each(result, function (_i, data) {
                var selected = data.id == selectedEmpresaId ? 'selected' : '';
                select.append('<option value="' + data.id + '" ' + selected + '>' + data.name + '</option>');
            });

            if (!selectedEmpresaId) {
                select.val('');
                select.prop('selectedIndex', 0);  // Volta para a primeira opção se nenhuma empresa for selecionada
            }
        },
        error: function() {
            console.log('Erro ao carregar as empresas');
        }
    });
}
