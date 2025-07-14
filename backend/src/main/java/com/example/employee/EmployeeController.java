package com.example.employee;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private List<Employee> employees = new ArrayList<>();

    @PostMapping
    public String saveEmployee(@RequestBody Employee employee) {
        employees.add(employee);
        return "Employee details saved successfully!";
    }

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employees;
    }
}
