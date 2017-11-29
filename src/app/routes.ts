import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./auth.guard";

export const routes: Routes = [
  {path: '', redirectTo: 'home', canActivate: [AuthGuard], pathMatch: 'full'},

  {path: 'home', component: HomeComponent ,canActivate: [AuthGuard]},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const Routing = RouterModule.forRoot(routes,{
  useHash: true
});
