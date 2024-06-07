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
            });

            $("#TableColaboratorBody").html(html);

            // Inicialize a tabela como uma tabela DataTables aqui
            $('#TableColaborator').DataTable();
        }
    });
}

$(document).ready(listarColaboradores);
