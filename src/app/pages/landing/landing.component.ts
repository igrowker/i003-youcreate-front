import { Component, OnInit, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {
  images: string[] = [
    'assets/banner01.png',
    'assets/banner02.png',
    'assets/banner03.png'
  ];
  currentSlide = 0;
  autoSlideInterval: any;

  constructor(private router: Router) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.startAutoSlide();
    }
  }

  ngOnDestroy() {
    clearInterval(this.autoSlideInterval);
  }
  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000); 
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    clearInterval(this.autoSlideInterval); 
    this.startAutoSlide(); 
  }

  goToRegister(){
    this.router.navigate(["/auth/register"])
  }
}
