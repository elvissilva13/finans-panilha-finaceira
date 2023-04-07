class Despesas{
    constructor(ano,mes,dia,tipo,descricao,valor){
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }
   validarDados(){
    for(let i in this){
        if(this[i] == undefined || this[i] == null || this[i] == ''){
            return false
        }
    }
    return true
   }

}
class Bd{
    constructor(){
        let id = localStorage.getItem('id');
        if(id === null){
            localStorage.setItem('id',0)
        }    
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId) + 1;
    }
    gravar(d) {
        let id = this.getProximoId();
        localStorage.setItem(id, JSON.stringify(d));
        localStorage.setItem('id',id);
    }

    recuperarTodosRegristro(){
        //array de despesas
        let despesas = Array();

       let id = localStorage.getItem('id');
        //recuperar todas as despeasas cadstratadas em localStorage
        for(let i = 1; i <= id; i++){
            //recupear a despesa
            let despesa = JSON.parse(localStorage.getItem(i));

            //existe a possibilidades de haver indice que foram pulados/removidos
            //neste casos nós vamos pular esses indices
            if (despesa === null) {
                continue
                
            }

            despesa.id = i;//recuperando o id , para facilitar no botao de exclusão
            despesas.push(despesa);

        }
            return despesas;
    }
//metodo de pesquisar despesas
    pesquisar(despesa){
        let despesasFiltradas = Array();

       despesasFiltradas = this.recuperarTodosRegristro();

       console.log(despesasFiltradas);

       //filtro ano
       if(despesa.ano != ''){
        console.log('filtro ano')
       despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano);
       }
       //filtro mes
       if(despesa.mes != ''){
        console.log('filtro mes');
        despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes);
        }
        //filtro dia
       if(despesa.dia != ''){
        console.log('filtro dia');
        despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia);
        }
       //filtro tipo
       if(despesa.tipo != ''){
        console.log('filtro tipo');
        despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo);
        }
       //filtro descriçao
       if(despesa.descricao != ''){
        console.log('filtro descricao');
        despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao);
        }
       //filtro valor
       if(despesa.valor != ''){
        console.log('filtro valor');
        despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor);
        }

        return despesasFiltradas
    }

    //metodo para o botão de remoção
    remover(id){ 
        localStorage.removeItem(id);
    }
}
let bd = new Bd();



function cadastrarDespesas() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

let despesas= new Despesas(
            ano.value,
            mes.value,
            dia.value,
            tipo.value,
            descricao.value,
            valor.value);

   if(despesas.validarDados()){ 
        bd.gravar(despesas);
        //dialog de sucesso
        document.getElementById("idCor").className ="modal-header  text-success"
        document.getElementById("btn").className ="btn btn-success"
        document.getElementById("btn").innerHTML ="Voltar"
        document.getElementById("idMensagem").innerHTML ="Despesas cadastradas com sucesso!! "
        document.getElementById("idDisparo").innerHTML =" Registro inserido com sucesso  "
        
        $('#modalResgistrarDespesas').modal('show');

        ///limpar o fomúlario value
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''


        
    
   }else{
        //dialog de errro
         document.getElementById("idCor").className ="modal-header text-danger"
         document.getElementById("btn").className ="btn btn-danger"
         document.getElementById("btn").innerHTML ="Voltar e corrigir"
         document.getElementById("idMensagem").innerHTML =" Existem campos obrigatórios que não foram preenchidos  "
         document.getElementById("idDisparo").innerHTML =" Erro na gravação "
         
         $('#modalResgistrarDespesas').modal('show')
            
       
     }

}

function carregaListaDespesas(despesas = Array(),filtro = false) {

    if(despesas.length == 0 && filtro == false){
            despesas= bd.recuperarTodosRegristro();

   }
//selecionando o elmento tbody da tabela
   let listaDespesas = document.getElementById("listaDespesas");
   listaDespesas.innerHTML = ''

    //percorrrer o array despesas , listando cada despesa de forma dinâmica
    despesas.forEach(function(d){
        

        //criando a linha (tr)
        let linha = listaDespesas.insertRow();

        //criar as colunas com os valores(td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}` 
        
        //ajustar o tipo
        switch (d.tipo) {
            case '1':
                d.tipo = 'Alimentação'
                   break;
            case '2':
                d.tipo = 'Educação'
                   break;
            case '3':
                d.tipo = 'Lazer'
                   break;
            case '4':
                d.tipo = 'Saúde'
                   break;
            case '5':
                 d.tipo = 'Transporte'
                   break;
                        
    
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
        //criar botão de exclusão
        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id =`id_despesas_${d.id}` 
        btn.onclick = function(){       
            let id = this.id.replace('id_despesas_','')
            
        //remover a despesa 
        bd.remover(id)
            window.location.reload()
        }

        linha.insertCell(4).append(btn)
        console.log(d)



    })
}

function pesquisarDespesas() {
    
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')
    
    let despesa= new Despesas(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value);

        let despesas = bd.pesquisar(despesa);
        carregaListaDespesas(despesas,true);
}

  
