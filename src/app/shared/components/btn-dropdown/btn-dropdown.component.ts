import { CommonModule } from '@angular/common';
import { Component, HostListener, ElementRef, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'btn-dropdown',
  standalone: true,
  imports: [ CommonModule,  ],
  templateUrl: './btn-dropdown.component.html',
  styleUrl: './btn-dropdown.component.css'
})
export class BtnDropdownComponent implements OnInit{

  isOpen = false;
  selectedOption: string = '';

  @Input({required: true}) options:string[] = [];
  @Input({required: true}) label!:string;
  @Input() type:string = 'normal';
  @Output() selectedValue = new EventEmitter<string>();


  constructor( private elementRef: ElementRef ) {}

  ngOnInit(): void {
    this.selectedOption = this.label;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedValue.emit(option);
    this.selectedOption = option;
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {

    if( !this.elementRef.nativeElement.contains(event.target) ){
      this.isOpen = false;
    }

  };

  getClassType(type: string) {
    switch(type) {
      case 'filter':
        return 'filter-btn';
      case 'months':
        return 'btn-months';
      default:
        return 'btn-base';
    }

  }
}
