$(document).ready(function () {
    fetchStudents();
});

function fetchStudents() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/v1/students",
        success: function (response) {
            displayStudents(response);
        }
    });
}

function displayStudents(students) {
    let studentList = '';
    students.forEach(student => {
        studentList += `
            <div>
                ${student.firstName} ${student.lastName} - ${student.email}
                <button onclick="deleteStudent(${student.studentId})">Eliminar</button>
                <button onclick="editStudent(${student.studentId})">Editar</button>
            </div>`;
    });
    $('#students').html(studentList);
}

function saveOrUpdate() {
    const data = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        email: $('#email').val()
    };

    const studentId = $('#studentId').val(); // Obtén el ID del estudiante (si existe)

    // Determina si estás creando un nuevo estudiante o actualizando uno existente
    const url = studentId ? `http://localhost:8080/api/v1/students/${studentId}` : "http://localhost:8080/api/v1/students";

    const method = studentId ? "PUT" : "POST"; // Usa PUT para actualizar, POST para crear

    $.ajax({
        type: method,
        url: url,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function () {
            fetchStudents();
            $('#firstName').val('');
            $('#lastName').val('');
            $('#email').val('');
            $('#studentId').val(''); // Restablece el ID del estudiante
            $('#saveOrUpdateBtn').text('Guardar').off('click').on('click', function () {
                saveOrUpdate();
            });
        }
    });
}

function deleteStudent(studentId) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/api/v1/students/${studentId}`,
        success: function () {
            fetchStudents();
        }
    });
}

function editStudent(studentId) {
    // Realiza una solicitud GET al backend para obtener los detalles del estudiante que se va a editar
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/v1/students/${studentId}`,
        success: function (student) {
            // Llena el formulario de edición con los detalles del estudiante
            $('#firstName').val(student.firstName);
            $('#lastName').val(student.lastName);
            $('#email').val(student.email);
            $('#studentId').val(student.studentId); // Establece el ID del estudiante
            // Cambia el texto del botón de guardar a "Actualizar" y agrega un manejador de eventos para actualizar el estudiante
            $('#saveOrUpdateBtn').text('Actualizar').off('click').on('click', function () {
                updateStudent(studentId);
            });
        }
    });
}

function updateStudent(studentId) {
    const data = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        email: $('#email').val()
    };

    // Envía una solicitud PUT al backend para actualizar el estudiante
    $.ajax({
        type: "PUT",
        url: `http://localhost:8080/api/v1/students/${studentId}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function () {
            // Una vez que se actualiza el estudiante, vuelve a cargar la lista de estudiantes y restablece el formulario
            fetchStudents();
            $('#firstName').val('');
            $('#lastName').val('');
            $('#email').val('');
            $('#studentId').val(''); // Restablece el ID del estudiante
            // Cambia el botón de guardar de nuevo a "Guardar" y restablece el manejador de eventos original
            $('#saveOrUpdateBtn').text('Guardar').off('click').on('click', function () {
                saveOrUpdate();
            });
        }
    });
}
