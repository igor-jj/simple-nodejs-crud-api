import { raInput, modeText, form } from "./dom.js";

export function fillForm(user) {
    document.querySelector("#name").value = user.name;
    document.querySelector("#email").value = user.email;

    raInput.value = user.ra;
    raInput.disabled = true;

    modeText.textContent = "Editar Aluno";
}

export function resetFormUI() {
    form.reset();
    raInput.disabled = false;
    modeText.textContent = "Cadastrar Aluno";
}