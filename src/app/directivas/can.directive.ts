import { Directive, TemplateRef, ViewContainerRef, Input, OnDestroy  } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appCan]'
})
export class CanDirective implements OnDestroy {
  private rolesAllowed: Array< number> = [];
  private sub?: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  @Input()
  set appCan(roles:  number | Array< number>) {
    
    this.rolesAllowed = Array.isArray(roles) ? roles : [roles]; //Normaliza el argumento a un array. Si se pasa 1 lo convierte en [1]. Si se pasa [1,2] lo deja igual.
    // Desuscribirse si ya había una subscripción
    if (this.sub) {
      this.sub.unsubscribe();
    }

    // Suscribirse al currentUser observable
    this.sub = this.authService.user$.subscribe(user => {
      this.viewContainer.clear();
      if (!user) return;

      const userRole = user.role_id;

      if (this.rolesAllowed.includes(userRole)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}