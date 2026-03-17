loadUsers();

let editingRa = null;

const tbody = document.querySelector("tbody");
const modeText = document.querySelector("#modeText");
const raInput = document.querySelector("#ra");

async function loadUsers() {
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();

    //console.log(users);

    tbody.innerHTML = "";
    let row = "";

    users.forEach(user => {
        row += `
        <tr data-ra="${user.ra}" data-name="${user.name}" data-email="${user.email}">
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.ra}</td>
            <td>
                <button class="edit" >Editar</button>    
                <button class="remove" >Excluir</button>
            </td>
        </tr>
        `;
    });

    tbody.innerHTML = row;
}

tbody.addEventListener("click", async (event) => {
    // event.target retorna qual botao foi pressionado
    // classList.contais("") é para procurar uma classe
    // no caso foi usado junto com event.target para verificar qual dos botoes foi pressionado

    const element = event.target; // qual botao foi pressionado
    const row = element.closest("tr"); // em qual linha esse botao foi pressionado
    if( !row) return; // para a funcao caso nao tenha pressionado nenhuma linha
    const ra = row.dataset.ra; // qual o ra correspondente ao botao pressionado

    if (element.classList.contains("edit")) {
        editingRa = ra;

        const name = row.dataset.name;
        const email = row.dataset.email;

        document.querySelector("#name").value = name;    
        document.querySelector("#email").value = email;
        raInput.value = ra;

        raInput.disabled = true;
        modeText.textContent = "Editar Aluno";

    } else if (element.classList.contains("remove")) {
        if (!confirm("Tem certeza que deseja excluir esse aluno?")) {
            return;
        }

        const response = await fetch(`http://localhost:3000/users/${ra}`, {
            method: "DELETE"
        });

        await loadUsers();
    }
});

// pega o form e adiciona um listener nele para o submit
const form = document.querySelector("form");
form.addEventListener("submit", async (event) => {
    console.log("submit");
    // previne a página de recarregar
    event.preventDefault();

    // pega os dados
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;

    if (!editingRa) { // POST
        const ra = raInput.value;
        // envia para o backend
        await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                ra
            })
        });
    } else { // PUT
        await fetch(`http://localhost:3000/users/${editingRa}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email
            })
        });
    }

    await loadUsers();
    raInput.disabled = false;
    modeText.innerHTML = "Cadastrar Aluno";
    form.reset();
    editingRa = null;
});