import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { FutureComponent } from './future/future.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'Chat', component: ChatComponent },
  {path: 'Future', component: FutureComponent}, 
  {path: '**', component: ErrorComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
