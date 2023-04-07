const form =document.getElementById('formulario');
const arrayEmail = JSON.parse(localStorage.getItem("chave")) || [];



form.addEventListener("submit", (evento)=>{
    evento.preventDefault(); //interrompe o lancemento do formulario para cabeçalho da pagina
    
    
        const email = evento.target.elements['email']
        const senha = evento.target.elements['senha']

         const emailCadastrado = {
            "email": email.value,
            "senha": senha.value
        }
        if ((email.value === "") || (email.value.match(/@/) == null) || (senha.value =="")) {
            alert("Por favor digite em@il e senha correto")
        }else{
                arrayEmail.push(emailCadastrado); 

                localStorage.setItem("chave", JSON.stringify(arrayEmail));

                email.value = "";
                senha.value = "";
        }
       

})



//pagina login




