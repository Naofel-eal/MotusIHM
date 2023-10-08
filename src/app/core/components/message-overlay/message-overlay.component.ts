import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-overlay',
  templateUrl: './message-overlay.component.html',
  styleUrls: ['./message-overlay.component.css']
})
export class MessageOverlayComponent {
  @Input() public title!: string;
  @Input() public message!: string;
  @Input() public isVisible: boolean = false;
  @Input() public width: string | number = '50%';
  @Input() public height: string | number = '30%';
  @Input() public borderRadius: string = '10px';
  @Input() public hasBackground: boolean = true;
  @Input() public hasBlur: boolean = true;
  @Input() public hasShadow: boolean = true;
  @Input() public backgroundColor: string = 'white';

  public constructor() { }
}
