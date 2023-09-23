import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { FormValidators } from "../../shared/form-validators";
import Swal from "sweetalert2";
import { FormBaseComponent } from "../../shared/form-base.component";
import { IFormCanDeactivate } from "../../guards/iform-candeactivate";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent
  extends FormBaseComponent
  implements IFormCanDeactivate
{
  private formChanges: boolean = false;
  private formSubmitted = false;

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, FormValidators.passwordValidator]],
      confirmPassword: [null, [FormValidators.equalsTo("password")]],
    });

    this.form.valueChanges.subscribe(() => (this.formChanges = true));
  }

  submit() {
    this.formSubmitted = true;
    let valueSubmit = Object.assign({}, this.form.value);
    console.log(valueSubmit);

    // TODO: Add user to database
  }

  canChangeRoute() {
    if (this.formChanges && !this.formSubmitted) {
      return new Promise<boolean>((resolve) => {
        Swal.fire({
          title: "Tem certeza que deseja sair dessa página?",
          text: "Você perderá todos os dados preenchidos!",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Sim",
          cancelButtonText: "Não",
        }).then((result) => {
          if (result.isConfirmed) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    }

    return true;
  }

  canDeactivate() {
    return this.canChangeRoute();
  }
}
