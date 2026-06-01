const BASE_URL = "http://localhost:3000/students";

function getToken() {
    return localStorage.getItem("token");
}

function handleAuthError(res) {
    if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "login.html";
    }
}

export async function fetchStudents() {
    const res = await fetch(BASE_URL, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    handleAuthError(res);
    return res.json();
}

export async function createStudent(data) {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(data)
    });

    handleAuthError(res);
    return res;
}

export async function updateStudent(ra, data) {
    const res = await fetch(`${BASE_URL}/${ra}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(data)
    });

    handleAuthError(res);
    return res;
}

export async function deleteStudent(ra) {
    const res = await fetch(`${BASE_URL}/${ra}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    handleAuthError(res);
    return res;
}