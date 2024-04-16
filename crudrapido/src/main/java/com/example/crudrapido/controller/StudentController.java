package com.example.crudrapido.controller;

import com.example.crudrapido.entity.Student;
import com.example.crudrapido.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path="api/v1/students")
@CrossOrigin(origins = "http://localhost")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping
    public List<Student> getAll() {
        return studentService.getStudents();
    }

    @GetMapping("/{studentId}")
    public Optional<Student> getById(@PathVariable("studentId") Long studentId) {
        return studentService.getStudent(studentId);
    }

    @PostMapping
    public void save(@RequestBody Student student) {
        studentService.saveOrUpdate(student);
    }

    @PutMapping("/{studentId}")
    public void update(@PathVariable("studentId") Long studentId, @RequestBody Student student) {
        // Verificar si el estudiante con el ID proporcionado existe
        Optional<Student> existingStudent = studentService.getStudent(studentId);
        if (existingStudent.isPresent()) {
            // Actualizar los datos del estudiante
            student.setStudentId(studentId); // Asegúrate de establecer el ID del estudiante
            studentService.saveOrUpdate(student);
        } else {
            // Manejar el caso en el que el estudiante no existe
            // Puedes lanzar una excepción o manejarlo de otra manera según tus necesidades
            // En este ejemplo, simplemente se ignora la solicitud de actualización
            System.out.println("El estudiante con ID " + studentId + " no existe.");
        }
    }

    @DeleteMapping("/{studentId}")
    public void delete(@PathVariable("studentId") Long studentId) {
        studentService.delete(studentId);
    }
}





