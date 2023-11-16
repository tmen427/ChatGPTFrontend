import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { FormControl } from '@angular/forms';
import { HttpService } from '../http.service';

interface UserInfo {
  username: string; 
  message: string;
  time: string;
}


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  title = 'ChatFrontend';
  username = 'Default_User';
  message = '';
  //messages = [{username: "Chris", message: "hello"}, {username: "Crisy", message: "hello there"}] ;
  messages: UserInfo[] = []; 
  currentTime: Date = new Date();
  now: string = this.currentTime.toLocaleString();  
  showTime = false; 
  ChatGpResponse: string = "";
  Subscription: any; 
  showDiv = false; 
  constructor(private http: HttpService) {
  }

  ngOnInit(): void {
   // console.log(this.messages)
  }
  
  search = new FormControl('');
  fileName = '';

  onFileSelected(event:any) {

    const file:File = event.target.files[0];

    console.log(file);

    if (file) {

        this.fileName = file.name;
        console.log(this.fileName)

        const formData = new FormData();

        formData.append("thumbnail", file);

    //const upload$ = this.http.post("/api/thumbnail-upload", formData);
    //upload$.subscribe();
    }
  }

  clearChat():void {
    this.messages = []; 
  }


  submit(): void {
    
    let searchbar = this.search.value as string;
   // console.log("the value in the search bar " + searchbar); 
    let anobject = {username: this.username, message: searchbar, time: this.now};  
    this.messages.push(anobject); 

    if(this.messages.length>=1) this.showTime = true; 

   // use this as a pseudo-progress bar for now
    let ChatResponse = {username: "ChatGPT", message: "ChatGPT is thinking...", time: this.now};
    this.messages.push(ChatResponse);

    this.Subscription = this.http.SearchBackend(searchbar).subscribe((response)=>{
      this.ChatGpResponse = response;
    

    if (this.messages[this.messages.length-1].username==="ChatGPT") {
   
      //replace the above message, with the real response
      this.messages.pop(); 
      let ChatResponse = {username: "ChatGPT", message: this.ChatGpResponse, time: this.now}; 
      this.messages.push(ChatResponse); 
      //console.log(this.messages)
      //clear the field after pressing enter
      this.search.setValue("");
    } 

    });
    

//mock response
// let ChatResponse = {username: "ChatGPT", message: "ChatGPT is thinking...", time: this.now};
// this.messages.push(ChatResponse);
// setTimeout( 
//       ()=> {
//         this.ChatGpResponse = "this is just a test message"; 
//         this.search.setValue("");
//       if (this.messages[this.messages.length-1].username==="ChatGPT") {
          
//             //replace the above message chatgpt is thinking with the real response
//             this.messages.pop(); 
//             let ChatResponse = {username: "ChatGPT", message: this.ChatGpResponse, time: this.now}; 
//             this.messages.push(ChatResponse); 
//             console.log(this.messages)
//       }
   
//     //  if(this.username==="ChatGPT") this.showDiv = true; 
      
//       }, 2000); 
  
  
  }
}
