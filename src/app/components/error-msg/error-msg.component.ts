import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { FormValidators } from "../../shared/form-validators";

@Component({
  selector: "app-error-msg",
  templateUrl: "./error-msg.component.html",
})
export class ErrorMsgComponent implements OnInit {
  @Input() control!: FormControl | any;
  @Input() label!: string;

  constructor() {}

  ngOnInit() {}

  get errorMsg() {
    for (let propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched
      ) {
        return FormValidators.getErrorMsg(
          this.label,
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }

    return null;
  }
}
