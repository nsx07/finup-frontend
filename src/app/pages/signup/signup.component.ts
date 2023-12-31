import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../../services/userService.service";
import Swal from "sweetalert2";
import { FormBaseComponent } from "../../shared/form-base.component";
import { IFormCanDeactivate } from "../../guards/iform-candeactivate";
import { FormValidators } from "../../shared/form-validators";
import { Router } from "@angular/router";

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

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      dateBirth: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [FormValidators.equalsTo("password")]],
    });

    this.form.valueChanges.subscribe(() => (this.formChanges = true));
  }

  submit() {
    this.formSubmitted = true;
    const valueSubmit = Object.assign({}, this.form.value);

    this.userService.createUser(valueSubmit).subscribe(
      (response) => {
        Swal.fire({
          title: "Sucesso!",
          text: "Usuário criado com sucesso!",
          icon: "success",
        }).then(() => {
          this.router.navigate(["/login"]);
        });
      },
      (error) => {
        console.error("Erro ao criar o usuário", error);
        Swal.fire({
          title: "Erro",
          text: "Ocorreu um erro ao criar o usuário.",
          icon: "error",
        });
      }
    );
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
