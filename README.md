# Jobfy_FrontEnd

# Sistema de Gerenciamento de Colaboradores e Empresas

Este projeto é um sistema web desenvolvido para gerenciar informações de colaboradores e empresas em uma organização. Utiliza tecnologias web modernas para oferecer funcionalidades de cadastro, edição, exclusão e listagem de colaboradores e empresas, e para ser usado é necessario fazer a clonagem do repositorio Back-End do projeto e ler as instruções: https://github.com/Pedro-Henrique-Teles/Projeto_Jobfy.git

## Funcionalidades Principais

- **Cadastro e Edição de Colaboradores:**
  - Nome, email, senha, CPF, telefone, salário, área de interesse, escolaridade, carga horária e data de nascimento.
  - Vinculação a uma empresa.
- **Cadastro e Edição de Empresas:**
  - Nome, CNPJ, email, setor de atividade e número de vagas disponíveis.
- **Listagem e Remoção de Colaboradores e Empresas:**
  - Listagem completa com opção de edição e exclusão.
- **Contagem de Colaboradores e Empresas:**
  - Exibição do total de colaboradores e empresas cadastradas.

## Tecnologias Utilizadas

- **Frontend:**
  - HTML5
  - CSS3 (Bootstrap para estilização)
  - JavaScript (jQuery para interações dinâmicas)
  - DataTables (plugin jQuery para tabelas avançadas)
- **Backend:**
  - API RESTful desenvolvida em Java (Spring Boot)
  - Banco de Dados: MySQL (ou outro SGBD compatível com JDBC)

## Pré-requisitos

- Servidor web compatível com PHP (como Apache) configurado localmente.
- MySQL instalado localmente com o banco de dados configurado conforme especificado na API.
- Java SDK e Maven para compilação e execução do backend.

## Instalação e Execução

1. **Configuração do Backend:**
   - Clone o repositório do backend.
   - Configure as propriedades de conexão com o banco de dados no arquivo `application.properties`.
   - Compile e execute a aplicação Spring Boot.

2. **Configuração do Frontend:**
   - Clone o repositório do frontend.
   - Abra o projeto em um editor de código.
   - Configure as URLs da API no código JavaScript conforme necessário.
   - Execute o frontend em um servidor web local.

3. **Acesso ao Sistema:**
   - Acesse o sistema através do navegador web utilizando o endereço configurado para o frontend.
   - Utilize as funcionalidades de cadastro, edição, exclusão e listagem conforme descrito.
   - Também pode acessar o Back-End no repositorio do GitHub https://github.com/Pedro-Henrique-Teles/Projeto_Jobfy.git
   - Login e Senha da tela inicial ->
    - Login: admin
    - Senha: admin
    
## Contribuição

Contribuições são bem-vindas. Sinta-se à vontade para abrir issues ou pull requests para melhorias no projeto.

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.

