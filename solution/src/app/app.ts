import { Component } from "@angular/core";
import { OneComponent } from "./one";
import { TwoComponent } from "./two";
import { ThreeComponent } from "./three";
import { FourComponent } from "./four";
import { FiveComponent } from "./five";

@Component({
  selector: "app-root",
  imports: [
    OneComponent,
    TwoComponent,
    ThreeComponent,
    FourComponent,
    FiveComponent,
  ],
  template: `
    <five />
  `,
})
export class App {}
