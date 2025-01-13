import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employeecrud',
  imports: [HttpClientModule,CommonModule,FormsModule],
  templateUrl: './employeecrud.component.html',
  styleUrl: './employeecrud.component.scss'
})
export class EmployeecrudComponent {

  employees : any[] =[];
  isResultLoaded = false;
  isUpdateFormActive = false;

  employeeName: string = '';
  employeeId: string = '';
  department: string = '';
  editId: any='';

  constructor(private http:HttpClient){
    this.getAllEmployee();
  }

  ngOnInit(): void{

  }

  getAllEmployee(){
    this.getAllEmployeeUrl().subscribe((resultData: any)=>{
        console.log(resultData);
        this.employees=resultData;
     });
  }

  deleteEmployee(employee: any): void {
    this.deleteEmployeeUrl(employee.id).subscribe((resultData:any)=>{
      console.log(resultData);
      this.getAllEmployee();
    });
    
  }

  updateEmployee(employee: any): void {
    this.employeeName=employee.name;
    this.employeeId=employee.empid;
    this.department=employee.department;
    this.editId=employee.id;
    this.isUpdateFormActive = true;
  }

  saveEmployee(): void {

    if(this.isUpdateFormActive){
      this.updateEmployeeUrl().subscribe((resultData:any)=>{
        console.log(resultData);
        this.getAllEmployee();
        this.employeeName='';
        this.employeeId='';
        this.department='';
        this.editId='';
        this.isUpdateFormActive=false;
      });

    }else{
      this.saveEmployeeUrl().subscribe((resultData:any)=>{
        console.log(resultData);
        this.getAllEmployee();
        this.employeeName='';
        this.employeeId='';
        this.department='';
      });
    }
  }


  getAllEmployeeUrl(){
    return this.http.get("http://localhost:3000/getEmployees");
  }

  deleteEmployeeUrl(employeeId: any){
    return this.http.delete("http://localhost:3000/deleteEmployee/"+employeeId,{observe:'response'});
  }

  saveEmployeeUrl() {
    let bodyData ={
      "name" :  this.employeeName,
      "empid" : this.employeeId,
      "department"   : this.department
    }
    return this.http.post("http://localhost:3000/createEmployee",bodyData,{observe:'response'});

  }

  updateEmployeeUrl() {
    let bodyData ={
      "name" :  this.employeeName,
      "empid" : this.employeeId,
      "department"   : this.department
    }
    return this.http.put("http://localhost:3000/updateEmployee/"+this.editId,bodyData,{observe:'response'});

  }


}
