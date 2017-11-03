import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/of";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/forkJoin";
import "rxjs/add/operator/map";
import "rxjs/add/operator/shareReplay";
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest} from "@angular/common/http";

@Injectable()
export class HttpclientService {

  courses$: Observable<Course[]>;

  constructor(private http: HttpClient) { }

  getUserData() {
    return this.http.get('https://api.github.com/users/seeschweiler');
  }

  longRequest() {

    const request = new HttpRequest(
      "POST", "/api/test-request", {},
      {reportProgress: true});

    this.http.request(request)
      .subscribe(
        event => {

          if (event.type === HttpEventType.DownloadProgress) {
            console.log("Download progress event", event);
          }

          if (event.type === HttpEventType.UploadProgress) {
            console.log("Upload progress event", event);
          }

          if (event.type === HttpEventType.Response) {
            console.log("response received...", event.body);
          }

        }
      );
  }

  throwError() {

    this.http
      .get("/api/simulate-error")
      .catch( error => {
        // here we can show an error message to the user,
        // for example via a service
        console.error("error catched", error);

        return Observable.of({description: "Error Value Emitted"});
      })
      .subscribe(
        val => console.log('Value emitted successfully', val),
        error => {
          console.error("This line is never called ",error);
        },
        () => console.log("HTTP Observable completed...")
      );
  }

  sequentialRequests() {

    const sequence$ = this.http.get<Course>(
      '/courses/-KgVwEBq5wbFnjj7O8Fp.json')
      .switchMap(course => {
          course.description+= ' - TEST ';
          return this.http.put('/courses/-KgVwEBq5wbFnjj7O8Fp.json', course)
        },
        (firstHTTPResult, secondHTTPResult)  =>
          [firstHTTPResult, secondHTTPResult]);

    sequence$.subscribe(
      values => console.log("result observable ", values)
    );

  }

  sequentialRequests1() {

    const sequence$ = this.http.get<Course>(
      '/courses/-KgVwEBq5wbFnjj7O8Fp.json')
      .switchMap(course => {

        course.description+= ' - TEST ';

        return this.http.put(
          '/courses/-KgVwEBq5wbFnjj7O8Fp.json',
          course)
      });
    sequence$.subscribe();

  }

  parallelRequests() {

    const parallel$ = Observable.forkJoin(
      this.http.get('/courses/-KgVwEBq5wbFnjj7O8Fp.json'),
      this.http.get('/courses/-KgVwECOnlc-LHb_B0cQ.json')
    );

    parallel$.subscribe(
      values => {
        console.log("all values", values)
      }
    );
  }

  shareReply() {
    const httpGet$ = this.http
      .get("/courses.json")
      .map(data => data)
      .shareReplay();
  }

  duplicateRequestsExample() {

    const httpGet$ = this.http
      .get("/courses.json")
      .map(data => data);

    httpGet$.subscribe(
      (val) => console.log("logging GET value", val)
    );

   // this.courses$ = httpGet$;
  }

  httpPostExample() {

    this.http.post("/courses/-KgVwECOnlc-LHb_B0cQ.json",
      {
        "courseListIcon": "...",
        "description": "TEST",
        "iconUrl": "..",
        "longDescription": "...",
        "url": "new-url"
      })
      .subscribe(
        (val) => {
          console.log("POST call successful value returned in body",
            val);
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  httpDeleteExample() {

    this.http.delete("/courses/-KgVwECOnlc-LHb_B0cQ.json")
      .subscribe(
        (val) => {
          console.log("DELETE call successful value returned in body",
            val);
        },
        response => {
          console.log("DELETE call in error", response);
        },
        () => {
          console.log("The DELETE observable is now completed.");
        });
  }

  httpPatchExample() {

    this.http.patch("/courses/-KgVwECOnlc-LHb_B0cQ.json",
      {
        "description": "Angular Tutorial For Beginners PATCH TEST",
      })
      .subscribe(
        (val) => {
          console.log("PATCH call successful value returned in body",
            val);
        },
        response => {
          console.log("PATCH call in error", response);
        },
        () => {
          console.log("The PATCH observable is now completed.");
        });
  }

  httpPutExample() {

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    this.http.put("/courses/-KgVwECOnlc-LHb_B0cQ.json",
      {
        "courseListIcon": ".../main-page-logo-small-hat.png",
        "description": "Angular Tutorial For Beginners TEST",
        "iconUrl": ".../angular2-for-beginners.jpg",
        "longDescription": "...",
        "url": "new-value-for-url"
      },
      {headers})
      .subscribe(
        val => {
          console.log("PUT call successful value returned in body",
            val);
        },
        response => {
          console.log("PUT call in error", response);
        },
        () => {
          console.log("The PUT observable is now completed.");
        }
      );
  }

}

interface Course {
  description: string;
  courseListIcon:string;
  iconUrl:string;
  longDescription:string;
  url:string;
}
