const BASE_URL = "http://localhost:3000/students";

export async function fetchStudents() {
    const res = await fetch(BASE_URL);
    return res.json();
}

export async function createStudent(data) {
    return fetch(BASE_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
}

export async function updateStudent(ra, data) {
    return fetch(`${BASE_URL}/${ra}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
}

export async function deleteStudent(ra) {
    return fetch(`${BASE_URL}/${ra}`, {
        method: "DELETE"
    });
}