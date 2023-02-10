import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit{
  src = "https://cdn.jsdelivr.net/gh/phantomodm/nystixCDN@builders/depository/assets/images/glove-tool-intro.mp4";
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  start() {
    this.router.navigate(['wizard'], { skipLocationChange: true });
  }

  // @HostListener("document:click",["$event.target"]) click(event: any) {
  //   try {
  //     if(event.id === 'glove-designer-start-button') {
  //       this.start();

  //       document.getElementById('glove-designer-splash-screen')!.remove();
  //     } else {
  //       return;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  //}
}
