import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Projects App';
  projects: any;

  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.getProjects();

  
  }

  getProjects() {

    this.http.get('https://localhost:5001/API/Projects').subscribe(response => {
     this.projects = response;
  }, error => {
     console.log(error);

  })
  }
}
