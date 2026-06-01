import { raInput, modeText, form } from "./dom.js";

export function fillForm(student) {
    document.querySelector("#name").value = student.name;
    document.querySelector("#email").value = student.email;

    raInput.value = student.ra;
    raInput.disabled = true;

    modeText.textContent = "Editar Aluno";
}

export function resetFormUI() {
    form.reset();
    raInput.disabled = false;
    modeText.textContent = "Cadastrar Aluno";
}