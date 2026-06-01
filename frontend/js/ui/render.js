import { tbody } from "./dom.js";

export function renderStudents(students) {
    tbody.innerHTML = students.map(student => `
        <tr data-ra="${student.ra}" data-name="${student.name}" data-email="${student.email}">
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.ra}</td>
            <td>
                <button class="edit">Editar</button>
                <button class="remove">Excluir</button>
            </td>
        </tr>
    `).join("");
}