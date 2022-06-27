import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConnectorService } from './connector.service'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LocationDetector';
constructor( private  http: HttpClient ,private connectorservice:ConnectorService  ) { }
  


  ngOnInit(): void {
    this.mydata()
  
  }
  
  mydata()
  {
  this.connectorservice.getData().subscribe(
    res=>{
  console.log("yup",res)
    },
    err=>
    {
  console.log(err)
    }
  )
  } 
  }
  
  