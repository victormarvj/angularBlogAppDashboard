import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService)

  if(authService.isLoggedInGuard) {
    // console.log('access granted');

    return true;
  }

  toastr.warning("You don't have permission to access this page", "Access denied");
  return router.parseUrl('/login');
};
