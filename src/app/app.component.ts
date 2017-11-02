import {Component, OnInit} from '@angular/core';
import {HttpclientService} from "./services/httpclient.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title: string;

  constructor(private httpClient: HttpclientService) {

  }

  ngOnInit(): void {
    this.httpClient.getUserData().subscribe(
      data => {
        console.log(JSON.stringify(data));
        this.title = JSON.stringify(data);
      }
    );
  }


}
