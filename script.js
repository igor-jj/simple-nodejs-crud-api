import { fetchUsers, createUser, updateUser, deleteUser } from "./api/users.js";
import { state, setEditingRa, resetState } from "./state/appState.js";
import { tbody, form } from "./ui/dom.js";
import { renderUsers } from "./ui/render.js";
import { fillForm, resetFormUI } from "./ui/form.js";

async function loadUsers() {
    const users = await fetchUsers();
    renderUsers(users);
}

loadUsers();

tbody.addEventListener("click", async (event) => {
    const element = event.target;
    const row = element.closest("tr");
    if (!row) return;

    const ra = row.dataset.ra;

    if (element.classList.contains("edit")) {
        setEditingRa(ra);

        fillForm({
            ra,
            name: row.dataset.name,
            email: row.dataset.email
        });

    } else if (element.classList.contains("remove")) {
        if (!confirm("Tem certeza?")) return;

        await deleteUser(ra);
        loadUsers();
    }
});

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;

    if (!state.editingRa) {
        const ra = document.querySelector("#ra").value;

        await createUser({ name, email, ra });
    } else {
        await updateUser(state.editingRa, { name, email });
    }

    resetState();
    resetFormUI();
    loadUsers();
});

form.addEventListener("reset", () => {
    resetState();
    resetFormUI();
});