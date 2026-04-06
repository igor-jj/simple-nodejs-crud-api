import * as studentService from "../services/studentService.js";

export async function getAllStudents(req, res) {
  try {
    const students = await studentService.getAllStudents();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(students));
  } catch (err) {
    res.statusCode = 500;
    return res.end("Internal Server Error");
  }
}

export async function createStudent(req, res, data) {
  if (!data.ra || !data.name || !data.email) {
    res.statusCode = 400;
    return res.end("Bad request");
  }

  try {
    const student = await studentService.createStudent(data);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      id: student.id,
      email: student.email
    }));
  } catch (err) {
    res.statusCode = 500;
    return res.end("Internal Server Error");
  }
}

export async function updateStudent(req, res, ra, data) {
  try {
    const student = await studentService.updateStudent(ra, data);
    if (!student) {
      res.statusCode = 404;
      return res.end("Student not found");
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(student));
  } catch (err) {
    res.statusCode = 500;
    return res.end("Internal Server Error");
  }
}

export async function deleteStudent(req, res, ra) {
  try {
    const student = await studentService.deleteStudent(ra);
    if (!student) {
      res.statusCode = 404;
      return res.end("Student not found");
    }

    res.statusCode = 204;
    res.end();
  } catch (err) {
    res.statusCode = 500;
    return res.end("Internal Server Error");
  }
}
