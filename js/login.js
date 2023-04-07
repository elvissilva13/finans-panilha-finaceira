


const login = document.getElementById('login');


login.addEventListener("submit", (evento) =>{
    evento.preventDefault()
    const emailArray = JSON.parse(localStorage.getItem("chave")) || [];
    const email = evento.target.elements['emailLogin'];
    const senha = evento.target.elements['loginSenha'];

    const emailCadastrado = {
        "email": email.value,
        "senha": senha.value
    }
           validaEmail(email.value,senha.value);

    for (let index = 0; index < emailArray.length; index++) {
        const element = emailArray[index];
     
       
            comparaEmail(element, email, senha);
        
    }
    
        
})


function comparaEmail(element, email, senha) {
   
     if ((element.email == email.value) && (element.senha == senha.value)) {
        const x =document.getElementById('botaoLogin');
        
        window.location.href = "planilha.html"

    }
    

  
}

    
function validaEmail(email,senha){

    if((email === "") || (senha == "")){
        alert("precisa entrar com e-mail e senha")
    }
}

