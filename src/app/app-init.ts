import { Showlevel1Service } from './services/showlevel1.service';
import { firstValueFrom } from 'rxjs';

export function appInitializer(showLevel1Service: Showlevel1Service) {
  console.log(environment.production);
  console.log(environment.apiUrl);
  return () => {
    console.log('APP_INITIALIZER: ejecutando deleteValues() al iniciar...');
    //return firstValueFrom(showLevel1Service.deleteValues());
  };
}
