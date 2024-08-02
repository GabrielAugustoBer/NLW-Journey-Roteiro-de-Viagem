//object {}
const atividade = {
    nome: "Almoço",
    data: new Date("2024-08-02  11:00"),
    finalizada: true
};

// array
const atividades = [
    atividade,
    {
        nome: 'Academia em grupo',
        data: new Date("2024-08-10  15:00"),
        finalizada: false
    },
    {
        nome: 'Gaming session',
        data: new Date("2024-08-25  20:00"),
        finalizada: true
    },

]

// arrow function
const criarItemDeAtividade = (atividade) => {

    let input = '<input type="checkbox" '

    if (atividade.finalizada) {
        input += 'checked'
    }

    input += '>'

    return `
     <div>
            ${input}
            <span>${atividade.nome}</span>
            <time>${atividade.data}</time>
        </div>
    `    
}

const section = document.querySelector('section');
for (let atividade of atividades) {
    section.innerHTML += criarItemDeAtividade(atividade)
}

