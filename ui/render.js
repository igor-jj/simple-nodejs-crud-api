import { tbody } from "./dom.js";

export function renderUsers(users) {
    tbody.innerHTML = users.map(user => `
        <tr data-ra="${user.ra}" data-name="${user.name}" data-email="${user.email}">
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.ra}</td>
            <td>
                <button class="edit">Editar</button>
                <button class="remove">Excluir</button>
            </td>
        </tr>
    `).join("");
}