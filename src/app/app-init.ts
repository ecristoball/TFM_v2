import { Showlevel1Service } from './services/showlevel1.service';
import { firstValueFrom } from 'rxjs';

export function appInitializer(showLevel1Service: Showlevel1Service) {
  return () => {
    console.log('APP_INITIALIZER: ejecutando deleteValues() al iniciar...');
    return firstValueFrom(showLevel1Service.deleteValues());
  };
}
