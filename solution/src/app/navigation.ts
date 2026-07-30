import { Component, input, model, signal } from "@angular/core";

@Component({
  selector: "navigation",
  imports: [],
  template: `
    <button (click)="skip.update(prev=>prev-1)" [disabled]="skip()===0">previous</button>
    recipe {{ skip()+1 }}/{{ total() }}
    <button (click)="skip.update(prev=>prev+1)" [disabled]="skip()===total()-1">next</button>
  `,
})
export class NavigationComponent {
  skip = model<number>(0); // input + output
  total = input<number>(0);
}
