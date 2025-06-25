import { afterEveryRender, afterNextRender, Component, effect, signal } from '@angular/core';
import { Title } from '../../components/title/title';

const log = (...messages: string[]) => {
  console.log(`${messages[0]} %c${messages.slice(1).join(', ')}`, 'color: #bada55');
}

@Component({
  selector: 'app-home-page',
  imports: [ Title],
  templateUrl: './home-page.html'
})
export class HomePage {

  traditionalProperty = 'Fernando';
  signalProperty = signal('Fernando');

  constructor() {
    log('Constructor Llamado');

    /*setTimeout(() => {
      //this.traditionalProperty = 'Otro Usuario';//No se refleja el cambio porque aqui angular no esta trabajando con zone.js
      console.log('Hecho!!!');
      this.signalProperty.set('Otro Usuario');//Se refleja el cambio porque aqui angular esta trabajando con zoneless
    }, 2000);*/
  }

  changeTraditional() {
    this.traditionalProperty = 'Divier C.';
  }

  changeSignal() {
    this.signalProperty.set('Divier C.');
  }

  basicEffect = effect( (onCleanup) => {
    log('effect', 'Se utiliza para disparar efectos secundarios, se ejecuta tanto pronto el componente es inicializado');

    onCleanup(() => {
      log('onCleanUP', 'Se ejecuta cuando el efecto se va a destruir');
    })
  });

  ngOnInit() {
    log('ngOnInit', 'Se ejecuta una vez después de que Angular haya inicializado todas los input del componente');
  }

  ngOnChanges() {
    log('ngOnChanges', 'Se ejecuta cada vez que cambia algun input del componente');
  }

  ngDoCheck() {
    log('ngDoCheck', 'Se ejecuta cada vez que se comprueba si hay cambios en el componente.');
  }

  ngAfterContentInit() {
    log('ngAfterContentInit', 'Se ejecuta una vez después de que se haya inicializado el contenido del componente');
  }

  ngAfterContentChecked() {
    log('ngAfterContentChecked', 'Se ejecuta cada vez que se verifica si se han producido cambios en el contenido del componente');
  }

  ngAfterViewInit() {
    log('ngAfterViewInit', 'Se ejecuta una vez después de que se haya inicializado la vista del componente');
  }

  ngAfterViewChecked() {
    log('ngAfterViewChecked', 'Se ejecuta cada vez que se verifica si hay cambios en la vista del componente');
  }

  ngOnDestroy() {
    log('ngOnDestroy', 'Se ejecuta una vez antes de que se destruya el componente');
  }

  afterNextRenderEffect = afterNextRender(() => {
    log('afterNextRender', 'Se ejecuta una vez que todos los componentes se hayan representado en el DOM');
  });

  afterEveryRenderEffect = afterEveryRender(() => {
    log('afterEveryRender', 'Se ejecuta cada vez que todos los componentes se han representado en el DOM');
  });
}
