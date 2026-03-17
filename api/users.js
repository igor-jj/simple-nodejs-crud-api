const BASE_URL = "http://localhost:3000/users";

export async function fetchUsers() {
    const res = await fetch(BASE_URL);
    return res.json();
}

export async function createUser(data) {
    return fetch(BASE_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
}

export async function updateUser(ra, data) {
    return fetch(`${BASE_URL}/${ra}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
}

export async function deleteUser(ra) {
    return fetch(`${BASE_URL}/${ra}`, {
        method: "DELETE"
    });
}