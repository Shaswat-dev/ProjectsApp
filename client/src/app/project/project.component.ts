import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../_services/project.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  model: any ={}
  constructor(private projectservice: ProjectService) { }

  ngOnInit() {
  }

  addproject() {
    this.projectservice.createproject(this.model).subscribe(response => {
      console.log(response);
    }, error => {console.log(error);})
  }

  getallprojects() {
    this.projectservice.getprojects().subscribe(response => {
      this.model = response;
    }, error => {console.log(error);})
  }
  columnDefs = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price'}
];

rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
];

  
}
