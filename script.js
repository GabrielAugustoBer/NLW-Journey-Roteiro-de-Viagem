// Bibliotecas e codigos de terceiros
const formatador = (data) => {
    return {
        dia: {
            numerico: dayjs(data).format('DD'),
            semana: {
                curto: dayjs(data).format('ddd'),
                longo: dayjs(data).format('dddd'),
            }
        },
        mes: dayjs(data).format('MMMM'),
        hora: dayjs(data).format('HH:mm')
    }
};

//object
const atividade = {
    nome: "Almoço",
    data: new Date("2024-08-02  11:00"),
    finalizada: false
};

// array
let atividades = [
    atividade,
    {
        nome: 'Academia em grupo',
        data: new Date("2024-08-10  15:00"),
        finalizada: false
    },
    {
        nome: 'Gaming session',
        data: new Date("2024-08-25  20:00"),
        finalizada: false
    },

]

// arrow function
const criarItemDeAtividade = (atividade) => {
    let input = `<input type="checkbox" onchange="concluirAtividade(event)" value="${atividade.data}" `

    if (atividade.finalizada) {
        input += 'checked'
    }
    input += '>'

    const formatar = formatador(atividade.data);
    return `
    <div>
        ${input}
        <span>${atividade.nome}</span>
        <time>
            ${formatar.dia.semana.longo},
            dia ${formatar.dia.numerico}
            de ${formatar.mes}
            às ${formatar.hora}h 
        </time>
    </div>
    `    
};

const atualizarListaDeAtividades = () => {
    const section = document.querySelector('section');
    section.innerHTML = ''

    // verificar se a minha lista está vazia
    if(atividades.length == 0) {
        section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`
        return
    }

    for (let atividade of atividades) {
        section.innerHTML += criarItemDeAtividade(atividade)
    }

};
atualizarListaDeAtividades()

const salvarAtividade = (event) => {
    event.preventDefault()
    const dadosDoFormulario = new FormData(event.target)

    const nome = dadosDoFormulario.get('atividade')
    const dia = dadosDoFormulario.get('dia')
    const hora = dadosDoFormulario.get('hora')
    const data = `${dia} ${hora}`

    const novaAtividade = {
    nome,
    data,
    finalizada: false
    };

    const atividadeExiste = atividades.find((atividade) => {
        return atividade.data == novaAtividade.data
    })

    if(atividadeExiste) {
        return alert('Dia/Hora não disponível.')
    }

    atividades = [novaAtividade, ...atividades]
    atualizarListaDeAtividades()
};

const criarDiasSelecao = () => {
    const dias = [
    "2024-07-15",
    "2024-08-21",
    "2024-09-14",
    "2024-10-05",
    "2024-11-17",
    "2024-12-23",
    "2025-01-09",
    "2025-02-19",
    "2025-03-25",
    "2025-04-11",
    "2024-07-20",
    "2024-08-30",
    "2024-09-17",
    "2024-10-12",
    "2024-11-25",
    "2024-12-05",
    "2025-01-15",
    "2025-02-22",
    "2025-03-18",
    "2025-04-23",
    ]

    let diasSelecao = ''

    for(let dia of dias) {
        const formatar = formatador(dia)

        const diaFormatado = `
        ${formatar.dia.numerico} de 
        ${formatar.mes}
        `

        diasSelecao += `
        <option value="${dia}">${diaFormatado}</option>`
    }

    document.querySelector('select[name="dia"]').innerHTML = diasSelecao

};
criarDiasSelecao();

const criarHorasSelecao = () => {
    let horasDisponiveis = ''

    for(let i = 5; i < 23; i++) {
        const hora = String(i).padStart(2, '0')
        horasDisponiveis += `<option value="${hora}:00">${hora}:00</option>`
        horasDisponiveis += `<option value="${hora}:30">${hora}:30</option>`
    }

    document.querySelector('select[name="hora"]').innerHTML = horasDisponiveis
};
criarHorasSelecao()

const concluirAtividade = (event) => {
    const input = event.target
    const dataDesteInput = input.value

    const atividade = atividade.find((atividade) => {
        return atividade.data == dataDesteInput
    })

    if(!atividade) {
        return
    }

    atividade.finalizada = !atividade.finalizada
};