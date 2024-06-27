// empresa.js

var modo = null;

function listarEmpresas() {
    $.ajax({
        url: 'http://localhost:8080/api/empresa',
        type: 'get',
        dataType: 'json',
        success: function (result) {
            console.log(result);
            var html = '';
            $.each(result, function (_i, data) {
                html += `<tr><td>` + data.name + `</td>`;
                html += `<td>` + data.cnpj + `</td>`;
                html += `<td>` + data.email + `</td>`;
                html += `<td>` + data.setorAtividade + `</td>`;
                html += `<td>` + data.vagas + `</td>`;
                html += `<td>`;
                html += `<button class="btn" data-bs-toggle="modal" data-bs-target="#myModal" onclick="preencherModal(decodeURIComponent('` + encodeURIComponent(JSON.stringify(data)) + `'), ` + data.id + `)"><i class="fa fa-edit"></i></button> `;
                html += `<button onclick="removerEmpresa(` + data.id + `)"><i class="fa fa-trash"></i></button>`;
                html += `</td></tr>`;
            });

            $("#TableEmpresaBody").html(html);

            // Inicialização da Tabela
            $('#TableEmpresa').DataTable();
        }
    });
}

function preencherModal(data, id) {
    data = JSON.parse(data);
    console.log(data);
    modo = "Editar";
    $("#editEmpresa").text(modo + " Empresa");
    $("#nome").val(data.name);
    $("#cnpj").val(data.cnpj);
    $("#email").val(data.email);
    $("#setorAtividade").val(data.setorAtividade);
    $("#vagas").val(data.vagas);
    empresaId = id;
    console.log(empresaId);
}

function limparModal() {
    modo = "Cadastrar";
    $("#editEmpresa").text(modo + " Empresa");
    $("#nome").val('');
    $("#email").val('');
    $("#cnpj").val('');
    $("#setorAtividade").val('');
    $("#vagas").val('');
    empresaId = null;
}

$("#modalCadastro").click(limparModal);

$(document).ready(listarEmpresas);

var empresaId = null;

$("#salvarBotao").click(function(event) {
    event.preventDefault();

    var empresa = {
        'name': $("#nome").val(),
        'email': $("#email").val(),
        'cnpj': $("#cnpj").val(),
        'setorAtividade': $("#setorAtividade").val(),
        'vagas': $("#vagas").val(),
    };

    var url = 'http://localhost:8080/api/empresa';
    var type = 'post';

    if (empresaId !== null) {
        url += '/' + empresaId;
        type = 'put';
    }

    $.ajax({
        url: url,
        type: type,
        contentType: 'application/json',
        data: JSON.stringify(empresa),
        success: function() {
            var message = empresaId === null ? 'Empresa criada com sucesso!' : 'Empresa atualizada com sucesso!';
            alert(message);
            $('#myModal').modal('hide');
            listarEmpresas();
            empresaId = null;  // Limpe o empresaId após a operação bem-sucedida
        },
        error: function(res) {
            var message = empresaId === null ? 'Erro ao criar a empresa!' : 'Erro ao atualizar a empresa!';
            console.log(res.responseText);
            alert(message + " - " + res.responseText);
        }
    });
});

function removerEmpresa(id) {
    if (confirm('Tem certeza de que deseja remover esta empresa?')) {
        $.ajax({
            url: 'http://localhost:8080/api/empresa/' + id,
            type: 'DELETE',
            success: function(result) {
                // Atualize a tabela ou faça algo
                alert('Empresa removida com sucesso!');
                listarEmpresas();
            },
            error: function(request, msg, error) {
                // Trate o erro
                console.log('Erro ao remover a empresa!', request);
                alert('Erro ao remover a empresa - Há funcionarios nela');
            }
        });
    }
}


$.ajax({
    url: 'http://localhost:8080/api/empresa/cont',
    type: 'get',
    success: function(result) {
        $('#countEmpresas').text(result);
    },
    error: function() {
        console.log('Erro ao obter a contagem de empresas');
    }
});
