import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CRUD-Operation';
  userlists: any[] = [];
  public userList: any = {
    id: 0,
    name: '',
    email: '',
    lastname: '',
    gender: '',
    number: 0,
    address: ''
  };
  public datasources = new MatTableDataSource();


  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
  constructor() {
    this.datasources = new MatTableDataSource(this.userlists)
  }
  ngOnInit(): void {
    // const locla = localStorage.getItem("dataSource")
    // if(locla != null ){
    //   this.userlists = JSON.parse(locla);
    // }
    this.getUserList();
  }


  public displayColumn = ['action', 'name', 'email', 'number'];

  getUserList() {
    let data = window.localStorage.getItem("dataSource");
    if (data != null) {
      this.userlists = JSON.parse(data);
      this.datasources.data = JSON.parse(data);
    }
  }

  saveUser() {
    this.userList.id = this.userlists.length + 1;
    this.userlists.push(this.userList);
    localStorage.setItem("dataSource", JSON.stringify(this.userlists));
    this.getUserList();
    this.resetUser();
    alert("User Saved Successfully");
  }

  resetUser() {
    this.userList = Object.assign({}, null)
    this.userList.id = 0;
    this.userList.gender = null;
  }

  delete(id: number) {
    for (let i = 0; i < this.userlists.length; i++) {
      if (this.userlists[i].id == id) {
        this.userlists.splice(i, 1);
      }
    }
    localStorage.setItem("dataSource", JSON.stringify(this.userlists));
  }

  edit(data: any) {
    alert(1)
    this.userList = Object.assign({}, data);
  }

  updateUser() {
    const records = this.userlists.find(temp => temp.id == this.userList.id)
    records.name = this.userList.name;
    records.email = this.userList.email;
    records.lastname = this.userList.lastname;
    records.gender = this.userList.gender;
    records.number = this.userList.number;
    records.address = this.userList.address;

    localStorage.setItem("dataSource", JSON.stringify(this.userlists));
    this.resetUser();


  }
}
