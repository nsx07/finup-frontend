import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FormBaseComponent } from "../../shared/form-base.component";
import { UserService } from "../../services/userService.service";
import Swal from "sweetalert2";
import { AuthService } from "../../services/auth-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent extends FormBaseComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  submit() {
    if (this.form.valid) {
      let valueSubmit = Object.assign({}, this.form.value);
      console.log(valueSubmit);

      // TODO: Adicione a lógica de validação do login
      // Verifique se o email e a senha são válidos
      if (isValidLogin(valueSubmit.email, valueSubmit.password)) {
        this.authService.login(valueSubmit.email, valueSubmit.password).subscribe(
          (response) => {
            Swal.fire({
              title: "Sucesso!",
              text: "Login Realizado com sucesso!",
              icon: "success",
            }).then(() => {
              this.router.navigate(["/user"]);
            });
          },
          (error) => {
            console.error("Erro ao logar na conta", error);
            Swal.fire({
              title: "Erro",
              text: "Ocorreu um erro ao logar na conta.",
              icon: "error",
            });
          }
        );
      } else {
        Swal.fire({
          title: "Erro",
          text: "Credenciais inválidas. Verifique seu email e senha.",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Erro",
        text: "Por favor, preencha todos os campos corretamente.",
        icon: "error",
      });
    }
  }
}

function isValidLogin(email: string, password: string): boolean {
  const validEmail = "";
  const validPassword = "";

  
  if (email === validEmail && password === validPassword) {
    return true;
  } else {
    return false;
  }
}
