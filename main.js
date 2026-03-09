function data_titulo(){
    const data=new Date()
    const h1=document.getElementById('titulo')
    const hora = data.toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        hour12: false
    });
     if (hora >= 6 && hora < 12) {
        h1.textContent = "Bom dia!";
    } else if (hora >= 12 && hora < 18) {
        h1.textContent = "Boa tarde!";
    } else {
        h1.textContent = "Boa noite!";
    }
  }

function mostrar() {

    const mudados=document.querySelectorAll('.mudanca')
    const form=document.getElementById('forms')
    const buttons=form.getElementsByTagName('button')
    for(let x=0;x<buttons.length; x++){
      
      buttons[x].addEventListener('click',(e)=>{
        e.preventDefault()
        for(let j =0;j<buttons.length;j++)mudados[j].classList.add('hidden');
         
        mudados[x].classList.remove('hidden')
    
      }
    )};
    
}

data_titulo();
mostrar();
setInterval(data_titulo(), 7200000);