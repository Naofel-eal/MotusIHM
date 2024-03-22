import { Component } from '@angular/core';
import pkg from '../../../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public readonly title: string = 'Motus';
  public readonly version: string = pkg.version;
}