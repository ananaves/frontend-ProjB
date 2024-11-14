async function enviarFormulario() {

    const emprestimoDTO = {
        "idAlumo": document.querySelectorAll("input")[0].value,
        "idLivro": document.querySelectorAll("input")[1].value,
        "dataEmprestimo": new Date(document.querySelectorAll("input")[2].value).toISOString().split('T')[0],
        "dataDevolucao": new Date(document.querySelectorAll("input")[3].value).toISOString().split('T')[0],
        "statusEmprestimo": new Date(document.querySelectorAll("input")[4].value).toISOString().split('T')[0],

    }
    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/emprestimo", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emprestimoDTO)
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o servidor. Contrate o administrador do sistema");
        }
        alert("Emprestimo cadastrado com sucesso!");

    }catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

async function recuperarListaEmprestimo() {
    try {
        const respostaSevidor = await fetch("http://localhost:3333/lista/emprestimo");

        if (!respostaSevidor.ok) {
            throw new Error('Erro ao comunicar com o servidor');
        }

        const listaDeEmprestimo = await respostaSevidor.json();
        criarTabelaEmprestimo(listaDeEmprestimo)
        console.log(listaDeEmprestimo)

    } catch (error) {
        console.log('erro ao comunicar com o servidor');
        console.log(error);
    }
}

function criarTabelaEmprestimo(emprestimos) {
    const tabela = document.getElementById('tabelaEmprestimo');

    emprestimos.forEach(emprestimo => {
        const row = document.createElement('tr');

        const idAluno = document.createElement('td');
        idAluno.textContent = emprestimo.idAluno;
        row.appendChild(idAluno);

        const idLivro = document.createElement('td');
        idLivro.textContent = emprestimo.idLivro;
        row.appendChild(idLivro);

        const dataEmprestimo = document.createElement('td');
        dataEmprestimo.textContent = emprestimo.dataDevolucao;
        row.appendChild(dataEmprestimo);

        const dataDevolucao = document.createElement('td');
        dataDevolucao.textContent = emprestimo.dataDevolucao;
        row.appendChild(dataDevolucao);

        const statusEmprestimo = document.createElement('td');
        statusEmprestimo.textContent = emprestimo.statusEmprestimo;
        row.appendChild(statusEmprestimo);

        const acoesTd = document.createElement('td');

        const atualizarIcon = document.createElement('img');
        atualizarIcon.src = 'img/editar.png';
        atualizarIcon.alt = 'icone de editar';
        acoesTd.appendChild(atualizarIcon);

        const excluirIcon = document.createElement('img');
        excluirIcon.src = 'img/lixeira.png';
        excluirIcon.alt = 'icone de excluir';
        acoesTd.appendChild(excluirIcon);
        row.appendChild(acoesTd);

        tabela.appendChild(row);

    });
};

