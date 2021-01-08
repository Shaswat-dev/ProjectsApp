import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../_services/project.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  model: any ={}
  
  rowData : any =[]
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
      //this.rowData =  response; 
     
    }, error => {console.log(error);})
  }
  columnDefs = [
    { field: 'id' },
    { field: 'code' },
    { field: 'description' },
    { field: 'cityId'},
    { field: 'isActive'}
];


  


}
