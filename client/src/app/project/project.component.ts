import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../_services/project.service';
import {AppComponent} from '../app.component'


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  model: any ={}
  @Input('projects') appc : any
  rowData : any =[]
  constructor(private projectservice: ProjectService) { }

  ngOnInit() {
    this.getallprojects();
  }

  addproject() {
    this.projectservice.createproject(this.model).subscribe(response => {
      console.log(response);
    }, error => {console.log(error);})
  }

  getallprojects() {
    /*this.projectservice.getprojects().subscribe(response => {
      this.rowData =  response; 
     
    }, error => {console.log(error);})*/

    //this.rowData = this.appc;
    console.log("htyuty");
    console.log(this.appc);
  }
  columnDefs = [
    { field: 'id' },
    { field: 'code' },
    { field: 'description' },
    { field: 'cityId'},
    { field: 'isActive'}
];


  


}
