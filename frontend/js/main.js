import {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "./api/students.js";

import { logoutRequest } from "./api/auth.api.js";
import { getToken, requireAuth } from "./utils/auth.js";

import { state, setEditingRa, resetState } from "./state/appState.js";
import { tbody, form } from "./ui/dom.js";
import { renderStudents } from "./ui/render.js";
import { fillForm, resetFormUI } from "./ui/form.js";

requireAuth(); // 🔐 proteção de rota

const token = getToken();

async function loadStudents() {
  const students = await fetchStudents();
  renderStudents(students);
}

loadStudents();

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
      email: row.dataset.email,
    });
  } else if (element.classList.contains("remove")) {
    if (!confirm("Tem certeza?")) return;

    await deleteStudent(ra);
    loadStudents();
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;

  if (!state.editingRa) {
    const ra = document.querySelector("#ra").value;
    await createStudent({ name, email, ra });
  } else {
    await updateStudent(state.editingRa, { name, email });
  }

  resetState();
  resetFormUI();
  loadStudents();
});

form.addEventListener("reset", () => {
  resetState();
  resetFormUI();
});

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await logoutRequest(token);
  localStorage.removeItem("token");
  window.location.href = "login.html";
});