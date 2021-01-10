import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = 'https://localhost:5001/API/';
  constructor(private http: HttpClient) { }

  getprojects()
  {return this.http.get(this.baseUrl+ 'Projects')}

  createproject(model: any)
  {
      return this.http.post(this.baseUrl + 'Projects/addprojects', model);

  }

  putproject(model: any)
  {
      return this.http.put(this.baseUrl + 'Projects/' +model.id, model);

  }

  deleteproject(model: any)
  {  console.log(model.id);
      return this.http.delete(this.baseUrl + 'Projects/' +model.id);

  }
}
