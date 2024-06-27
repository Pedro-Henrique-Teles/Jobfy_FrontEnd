document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin') {
        alert('Login successful!');
        window.location.href = '../empresa/empresa.html';
    } else {
        alert('Invalid username or password');
    }
});

function typeWriter(element, text, speed) {
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

    window.onload = function() {
    const welcomeText = "Olá, Seja Bem Vindo ao Jobfy";
    const descriptionText = "Jobfy é um CRUD, que foi feito em duas etapas, back-end em Java, Springboot e PostgreeSQL. Front-End em HTML, CSS, " +
    "Javascript, Bootstrap e JQuery, para mais informações sobre o projeto, basta acessar o meu repositorio no github : https://github.com/Pedro-Henrique-Teles/Jobfy_FrontEnd.git, o login e senha está no README.MD do projeto";
    const welcomeElement = document.getElementById('welcome-text');
    const descriptionElement = document.getElementById('description-text');

    typeWriter(welcomeElement, welcomeText, 100);
    setTimeout(() => typeWriter(descriptionElement, descriptionText, 50), welcomeText.length * 100);
};
