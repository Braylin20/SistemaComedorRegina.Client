import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'index-title',
  imports: [
    RouterLink
  ],
  templateUrl: './title.component.html',
})
export class TitleComponent {

  title = input.required<string>();
}
