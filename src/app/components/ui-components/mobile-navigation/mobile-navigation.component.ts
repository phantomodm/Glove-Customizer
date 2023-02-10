import { Component, Input, OnInit } from '@angular/core';
import { MobileService } from './mobile.service';

@Component({
  selector: 'app-mobile-navigation',
  templateUrl: './mobile-navigation.component.html',
  styleUrls: ['./mobile-navigation.component.scss'],
})
export class MobileNavigationComponent implements OnInit {
  @Input() title!: string;
  @Input() index!: number;
  @Input() sectionLength = 0;
  @Input() lastStep = false;
  currentTab: number = 0;

  constructor(public nav: MobileService) {}

  ngOnInit(): void {
    this.nav.currentTab.next(0)
    this.nav.currentTab$.subscribe((n) => {
      this.currentTab = n;
      this.showTab(n);
      //this.enableBtnSlider(n);
    });
  }

  onSwipeRight(event: any) {
    this.showTab(-1);
  }

  onSwipeLeft(event: any) {
    this.showTab(1);
  }

  nextPrev(n: number) {
    if (this.currentTab === 0 && n === -1) {
      return;
    }
    // This function will figure out which tab to display
    var x = document.getElementsByClassName(
      'tab'
    ) as HTMLCollectionOf<HTMLElement>;
    // Exit the function if any field in the current tab is invalid:

    // Hide the current tab:
    x[this.currentTab].style.display = 'none';

    // Increase or decrease the current tab by 1:
    this.nav.nextPrev(this.currentTab + n);
    this.currentTab = this.currentTab + n;

    if (this.currentTab >= x.length) {

      return false;
    }

    return false;
  }

  enableBtnSlider(n:number){
    const q = document.getElementsByClassName(`draggable`) as HTMLCollectionOf<HTMLElement>;
    const draggable = q.length;
    console.log(draggable)
    for (let i = 0; i < draggable; i++) {
      if (i === n) {

        q[i].classList.remove('active')
      }
    }
    q[n].classList.add('active');
  }

  showTab(n: number) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName(
      'tab'
    ) as HTMLCollectionOf<HTMLElement>;
    let prev = document.getElementById('m-prevBtn') as HTMLElement;
    let next = document.getElementById('m-nextBtn') as HTMLElement;
    const q = document.querySelectorAll('button#m-nextBtn') as unknown as HTMLCollectionOf<HTMLElement>;

    x[n].style.display = 'block';
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
      prev.style.display = 'none';
    } else {
      prev.style.display = 'inline';
    }
    if (n == x.length - 1) {
      next.style.display = 'none';
      q[q.length - 1].style.display = 'none';
    }else{
      next.style.display = 'inline';
    }
    // ... and run a function that displays the correct step indicator:
  }
}
