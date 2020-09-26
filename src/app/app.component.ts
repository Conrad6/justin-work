import { Employee } from "../models/Employee";
import { Component, OnInit, VERSION } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  submitted = false;
  employeeForm: FormGroup;
  employeeDetails: Employee;
  displayResults = () => {
    const {
      name,
      address,
      mobile,
      salary,
      bloodGroup
    } = this.employeeForm.value;

    const employee: Employee = {
      name,
      address,
      mobile,
      salary: parseFloat(salary as string),
      bloodGroup
    };

    this.submitted = true;
    this.employeeDetails = employee;
  };

  clearForm() {
    this.employeeDetails = null;
    this.employeeForm.reset();
    this.submitted = false;
  }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      address: [null, [Validators.required]],
      mobile: [
        null,
        [
          Validators.required,
          Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$")
        ]
      ],
      salary: [null, [Validators.required]],
      bloodGroup: [null, Validators.required]
    });
  }
}
