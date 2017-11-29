import {Component, OnInit} from '@angular/core';
import {HttpclientService} from "./services/httpclient.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title: string;

  public onlineOffline: boolean = navigator.onLine;

  constructor(private httpClient: HttpclientService) {
    window.addEventListener('online', () => {
      this.onlineOffline = true; console.log("true block",this.onlineOffline)
      // PopupToast.openJamboToast('You have internet connection', this._toastrService);
    });
    window.addEventListener('offline', () => {
      this.onlineOffline = false;  console.log("false block",this.onlineOffline)
      // PopupToast.openJamboToastError('No internet connection', this._toastrService);
    });
  }

  ngOnInit(): void {

   /* this.httpClient.getMetaData('http://www.bonoboz.in').subscribe(
      data => {
        console.log(data);
      }
    );*/


    this.httpClient.getUserData().subscribe(
      data => {
       // console.log(JSON.stringify(data));
        this.title = JSON.stringify(data);
      }
    );
  }


}
