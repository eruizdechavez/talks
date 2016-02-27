Templates (Plantillas)

- Introduccion (que son los templates, syntaxis basica)
- Helpers logicos (`if`, `else`, `else if`, `unless`)
- Sub-expresiones (diferencias entre `{{` y `(`)
- Iteradores (`each`)
- Creacion de un helper
- Diferencias entre `prop="foo"` y `prop=foo`
- Parciales, componentes y cuando usar cada uno
- Creacion de un componente
- Helper `action`
- Test de integracion simple

El tema de templates requiere un conocimiento previo (aunque minimo) de los siguientes conceptos:

- Saben que es Ember
- Saben que es Ember CLI

Toda aplicacion web, o por lo menos asi es hasta el dia de hoy, necesita de HTML. Diferentes frameworks tienen diferentes estilos para trabajar con el HTML, Backbone usa templates sensillos, Angular usa HTML, React lo pone en linea con el JavaScript, y en nuetro caso, Ember usa HTMLBars, el cual es una mejora sobre Handlebars (el cual a su ves es una mejora sobre Mustache).

La forma mas sencilla de una plantilla en ember es:

```
```

Aunque, para ser sincero, eso no es realmente util. Si queremos mejorar un poco, podemos tener algo asi:

```
<h1>Hola Ember!</h1>
```

Un poco mas util que la anterior, aunque sigue sin sorprendernos realmente. Subamos un poco mas el nivel.

```
<div>
  <div>Hola {{model.username}}!</div>
  <div>Bienvenido a {{meetupname}}</div>
</div>
```

— Y que es eso que esta entre `{{` y `}}`?

Aja! Se empieza a poner interesante, no? A eso se le llama un "binding" (vinculo, enlace). En un template podemos usar bindings para solicitar a ember que reemplaze, por nosotros y de forma automatica, las variables por sus respectivos valores.

Asumiendo que los valores de `model.username` y `meetupname` son `Erick` y `Ember Meetup Guatemala`, el template de arriba nos generaria algo asi:

```
<div>
  <div>Hola Erick!</div>
  <div>Bienvenido a Ember Meetup Guatemala</div>
</div>
```

— Muy chulo eso de poner variables y que Ember nos lo cambie de forma automatica! Si esto es tan practico ya imagino que tan practico sera meter mis funciones en el template directo!

Emmm... no. En HTMLBars, Handlebars y en general en Mustache y otros templates se considera una mala practica el mezclar logica y HTML. Pero no esto no significa que sea el fin del mundo. Ember tiene otras herramientas para conseguir los mismos o incluso mejores resultados. Por ejemplo, que pasa si quiero controlar la visibilidad de una seccion de mi template dependiendo del valor de una variable? Para eso vamos a utilizar algo que se conoce en Ember como "Helpers" (ayudantes, asistentes).

Un helper es basicamente una funcion que recibe algunos parametros y realiza alguna accion por nosotros dento del template sin tener que mezclar HTML y JavaScript.

Algunos de los helpers que vienen ya integrados en Ember y que usaremos constantemente son los helpers de control logico (`if`, `else`, `else if`, `unless`). Con estos, podemos controlar que algo pase (o no pase) en determinadas partes de nuestro template dependiendo del estado de los datos que lo respaldan.

Siguiendo el trabajo que llevamos en nuestro template, podemos mejorarlo de la siguiente manera:

```
<div>
  <div>Hola {{model.username}}!</div>
  {{#if isSignedIn}}
    <div>Bienvenido a {{meetupname}}</div>
  {{else}}
    <div>Inicia sesion haciendo click <button>aqui</button></div>
  {{/if}}
</div>
```

Ahora, nuestro template mostrara diferentes opciones dependiendo del valor de `isSignedIn`: Si el usuario esta en sesion, mostrara el mensaje de bienvenida, de lo contrario le dara una opcion al usuario de iniciar sesion haciendo click en un boton.

— Y que pasa si lo quiero en orden invertido?

En lugar de usar `if` podemos usar `unless` el cual es basicamente un `if not`.

```
<div>
  <div>Hola {{model.username}}!</div>
  {{#unless isSignedIn}}
    <div>Inicia sesion haciendo click <button>aqui</button></div>
  {{else}}
    <div>Bienvenido a {{meetupname}}</div>
  {{/unless}}
</div>
```

Para este momento el uso de `else if` deberia ser bastante obvio, pero como no me gusta asumir, veamos un ejemplo:

```
<div>
  {{#if model.firstname}}
    <div>Hola {{model.firstname}}!</div>
  {{else if model.username}}
    <div>Hola {{model.username}}!</div>
  {{else}}
    <div>Hola Invitado!</div>
  {{/if}}

  {{#unless isSignedIn}}
    <div>Inicia sesion haciendo click <button>aqui</button></div>
  {{else}}
    <div>Bienvenido a {{meetupname}}</div>
  {{/unless}}
</div>
```

— Erick, estas siendo muy repetitivo con ese HTML, no hay mejor una forma de solo cambiar el nombre en vez de repetir todo el `div`?

Claro que la hay. Los helpers, asi como los componentes (los cuales veremos mas adelante) se pueden usar de dos formas, en linea y en bloque.

Ya hemos visto como usar un `if` en bloque: usando `{{`, seguido de un `#` y el nombre del helper/componente `if` y para cerrarlo es lo mismo, solo reemplazamos el `#` por un `/`. Si nuestro helper/componente soporta el uso en lina, lo unico que aremos sera omitir el `#` y el tag de cierre. Veamos como lo hariamos con ese nombre:

```
<div>
  {{#unless isSignedIn}}
    <div>Hola Invitado!</div>
  {{else}}
    <div>Hola {{if model.firstname model.firstname model.username}}!</div>
  {{/unless}}

  {{#unless isSignedIn}}
    <div>Inicia sesion haciendo click <button>aqui</button></div>
  {{else}}
    <div>Bienvenido a {{meetupname}}</div>
  {{/unless}}
</div>
```

En el caso de `if` la sintaxis para usarlo en linea es: `{{if condicion valorVerdadero valorFalso}}`. El mismo orden aplica para `unless`.

— Y no seria genial si pudieramos de alguna forma usarlos en conjunto?

Si, y claro que se puede. Esto se conoce como sub-expresiones y consiste basicamente en reemplazar los `{{` y `}}` por `(` y `)` cuando ya estamos dentro de un binding:

```
<div>
  <div>Hola {{if isSignedIn (if model.firstname model.firstname model.username) "Invitado"}}!</div>

  {{#unless isSignedIn}}
    <div>Inicia sesion haciendo click <button>aqui</button></div>
  {{else}}
    <div>Bienvenido a {{meetupname}}</div>
  {{/unless}}
</div>
```

— Mind. Blown.

Lo se. Para evitar confuciones, aclaremos un poco que fue lo que paso ahi. Ya sabemos que nuestro `if` en linea recibe tres parametros: 1. condicion, 2. valor a usar si la condicion es verdadera, y 3. valor a usar si la condicion es falsa; en el template de arriba, usamos un segundo `if` como una sub-expresion cuyo resultado sera usado en caso que nuestro usuario este en sesion, de lo contrario se usara la cadena `"Invitado"`.

Las sub-expresiones no estan limitadas al los helpers logicos, cualquier helper que se use en linea puede ser usado tambien como una sub-expresion.

Pero esto no termina aqui. Ember estaria muy limitado si solo tuviera estos helpers y tuvieramos nosotros que implementar otros tantos basicos. Otro helper que tambien van a usar bastante es `each`, el cual nos sirve para repetir bloques de nuestro HTML para cada elemento dentro de una coleccion (listas, tablas, etc).

Mejoremos un poco nuestro template asumiendo que nuestros datos incluyen tambien un arreglo llamado `favoriteFood` con alguna de mi comida favorita:

```
<div>
  <div>Hola {{if isSignedIn (if model.firstname model.firstname model.username) "Invitado"}}!</div>

  {{#unless isSignedIn}}
    <div>Inicia sesion haciendo click <button>aqui</button></div>
  {{else}}
    <div>Bienvenido a {{meetupname}}</div>
  {{/unless}}

  {{#if isSignedIn}}
    <div>
      Aqui esta tu comida favorita (en caso que se te olvide):
      <ul>
      {{#each model.favoriteFood as | dishName |}}
        <li>{{dishName}}</li>
      {{/each}}
      </ul>
    </div>
  {{/if}}
</div>
```

Asumiendo que estoy en sesion y que entre mis comidas favoritas estan: Pizzas, Hamburguesas y Hot-Dogs (yo lo se, super saludable!), El resultado seria algo asi:

```
<div>
  <div>Hola Erick!</div>
  <div>Bienvenido a Ember Meetup Guatemala</div>

  <div>
    Aqui esta tu comida favorita (en caso que se te olvide):
    <ul>
      <li>Pizzas</li>
      <li>Hamburguesas</li>
      <li>Hot-Dogs</li>
    </ul>    
  </div>
</div>
```

Recapitulemos lo que hemos aprendido hasta el momento:

- Los templates de Ember son basicamente HTML con algunas cosas chulas gracias a HTMLBars, el cual es hijo de Handlebars y nieto de Mustache.
- Podemos hacer bindings de variables simplemente encerrandolas entre `{{` y `}}`.
- Tenemos tambien a la mano varios helpers predefinidos en Ember, como lo son `if`, `else`, `else if`, `unless`, `each`.
- Algunos de estos helpers pueden ser usados tanto en forma de bloque, como en linea.
- Generalmente, los helpers que pueden ser usados en linea, tambien pueden mezclarse en forma de sub-expresiones mediante el uso de `(` y `)`.

Como en todo framework, el uso de las herramientas que nos provee es la mitad del trabajo, y la otra mitad es extender dichas herramientas para crear las nuestras. Este es el caso de los helpers. La creacion de un helper es bastante sencilla, basta con usar el generador que viene incluido en la herramienta de linea de comando `ember-cli`.

```
ember generate helper nombre-de-usuario
```

Este comando nos va a generar una serie de archivos necesarios para nuestro helper. Especificamente y en la version 1.13 que es la que estoy ocupando, obtendremos 2:

```
app/helpers/nombre-de-usuario.js
tests/unit/helpers/nombre-de-usuario-test.js
```

El contenido de nuestro nuevo helper luce algo asi:

```
import Ember from 'ember';

export function nombreDeUsuario(params/*, hash*/) {
  return params;
}

export default Ember.Helper.helper(nombreDeUsuario);
```

Como lo habia comentado, un helper no es otra cosa que una function que recibe parametros y regresa un resultado en forma de cadena de texto. Podemos ver que la firma de la funcion espera dos posibles parametros, `params` y en caso que lo necesitemos `hash`.

— Pero que diferencia hay entre uno y otro?

Facil, `params` es equivalente a lo que en JavaScript recibimos en nuestras funciones con el nombre de `arguments`; `hash` sera un objeto con valores a los cuales podemos accesar por nombre y que ademas podemos usar para bindings. La forma en que me gusta verlo es: `params` es lo necesario para el resultado del helper (nuestro usuario) y `hash` para configurar los resultados del mismo.

Hagamos nuestro helper primero con `params` solamente y despues usemos `hash`.

```
import Ember from 'ember';

export function nombreDeUsuario([isSignedIn, {username, firstname}]) {
  if (!isSignedIn) {
    return 'Invitado';
  }

  return firstname ? firstname : username;
}

export default Ember.Helper.helper(nombreDeUsuario);
```

Y ahora podemos usarlo asi:

```
<div>Hola {{nombre-de-usuario isSignedIn model}}!</div>
```

Aunque esta version funciona bien, tenemos que recordar el orden de los parametros, y esto podria empezar a volverse un poco enredado si queremos agregar tambien un nombre opcional en lugar de 'Invitado'. Pero, como sabemos que tenemos `hash` a nuestra disposicion, usemoslo:

```
import Ember from 'ember';

export function nombreDeUsuario([{username, firstname}], {isSignedIn: isSignedIn = false, guestName: guestName = 'Invitado'}) {
  if (!isSignedIn) {
    return guestName;
  }

  return firstname ? firstname : username;
}

export default Ember.Helper.helper(nombreDeUsuario);
```

El cual puede ser usado asi:

```
<div>Hola {{nombre-de-usuario model isSignedIn=isSignedIn}}!</div>
```

Y tambien asi:

```
<div>Hola {{nombre-de-usuario model isSignedIn=isSignedIn guestName='Embereño'}}!</div>
```

— Wow! Oye, porque tienes `isSignedIn=isSignedIn` sin comillas, pero `guestName='Embereño'` con comillas?

Ah! Eso es porque cuando estamos agregando atributos dentro de un template, un helper o un componente tambien podemos hacer bindeos de sus valores. En este caso, estoy haciendo un bindeo de `isSignedIn` para que, cuando cambie su valor, se ejecute de nuevo el helper, y en el caso de `guestName` solo estoy pasando un string.

— Asi que, cuando quiero tener un template dentro de otro template, puedo usar helpers! Eso es cool!

Si... y no. Un helper no es realmente un template dentro de otro template. Si no que te ayuda a dar formato o mantener consistencia en diferentes partes de tu template y tu aplicacion. Si lo que quieres es reutilizar bloques grandes de un template en varios templates tienes otras dos opciones diferentes: `partials` y `components`.

Un `partial` (plantilla parcial) es para casos sencillos, en los que quires evitar principalmente el copy & paste de un template (o una porcion del mismo) sin logica.

Un ejempl de un template podria ser nuestro saludo si es que lo quicieramos usar en diferentes partes de nuestra app. Asumiendo que tomamos el siguiente bloque de HTML y lo guardamos en el archivo `app/templates/saludo.hbs` ahora podemos usarlo en cualquier template con un `{{partial 'saludo'}}`.

— Y como le pasamos las variables?

Ahi esta el detalle, un parcial no esta pensado para usos complejos y va a obtener acceso a las variables que esten en el template en el que lo uses, lo cual nos obligaria a tener disponible `isSignedIn` y `model` en donde lo usemos.

Por otro lado, tenemos los `components` (componentes) que son mucho mas flexibles y potentes que un template aunque tambien algo mas complejos de usar (no te edivtes, no es tan complejo).

Supongamos que queremos hacer un componente para la lista de mi comida favorita. Lo primero que haremos sera usar la linea de comando:

```
ember generate component comida-favorita
```

Esto nos genera los siguientes archivos:

```
app/components/comida-favorita.js
app/templates/components/comida-favorita.hbs
tests/integration/components/comida-favorita-test.js
```

Nuestros archivos del componente y template lucen algo asi:

```
import Ember from 'ember';

export default Ember.Component.extend({
});
```

y asi:

```
{{yield}}
```

En el caso del JavaScrit no tiene nada especial, solo estamos extendiendo la clase componente de Ember y esta listo para la accion. En el caso del template, tiene una palabra especial `yield`. Ese `yield` lo vamos a usar solamente cuando nuestros componentes se comporten como bloqes (asi como `if` o `each`).

Siguiente paso, tomar lo que tenemos en el template de la aplicacion y pasarlo al del componente:

```
<div>
  <div>Hola {{nombre-de-usuario model isSignedIn=isSignedIn guestName='Embereño'}}!</div>

  {{#unless isSignedIn}}
    <div>Inicia sesion haciendo click <button>aqui</button></div>
  {{else}}
    <div>Bienvenido a {{meetupname}}</div>
  {{/unless}}

  {{#if isSignedIn}}
    {{comida-favorita favoriteFood=model.favoriteFood}}
  {{/if}}
</div>
```

```
Aqui esta tu comida favorita (en caso que se te olvide):
<ul>
{{#each favoriteFood as | dishName |}}
  <li>{{dishName}}</li>
{{/each}}
</ul>
```

Ahora, para poner un ejemplo de un componente de bloque, hagamos uno que oculte el contenido si nuestro usuario no esta en sesion.

```
ember generate component solo-en-sesion
```

Nuestro componente se vera asi:

```
{{#if isSignedIn}}
  {{yield}}
{{else}}
  Este contenido requiere que incies sesion.
{{/if}}
```

Y lo usaremos de la siguiente forma:

```
<div>
  <div>Hola {{nombre-de-usuario model isSignedIn=isSignedIn guestName='Embereño'}}!</div>

  {{#unless isSignedIn}}
    <div>Inicia sesion haciendo click <button>aqui</button></div>
  {{else}}
    <div>Bienvenido a {{meetupname}}</div>
  {{/unless}}

  {{#solo-en-sesion isSignedIn=isSignedIn}}
    {{comida-favorita favoriteFood=model.favoriteFood}}
  {{/solo-en-sesion}}
</div>
```

Los componentes no solo nos sirven como `if` con esteroides como ya lo habran imaginado. Que utilidad tendrian si no pudieramos hacer cosas mas complejas?! Para un ejemplo un poco mas elaborado, hagamos un componente para iniciar y cerrar nuestra sesion de ejemplo.

```
ember generate component control-de-sesion
```

Modificamos el template de nuestro componente para que se vea asi:

```
{{#unless isSignedIn}}
  <div>Inicia sesion haciendo click <button {{action toggleSession}}>aqui</button></div>
{{else}}
  <div>Bienvenido a {{meetupname}} <button {{action toggleSession}}>cerrar sesion</button></div>
{{/unless}}
```

Cambiamos el template de nuestra aplicacion para usar ahora el nuevo componente:

```
<div>
  <div>Hola {{nombre-de-usuario model isSignedIn=isSignedIn guestName='Embereño'}}!</div>

  {{control-de-sesion isSignedIn=isSignedIn meetupname=meetupname toggleSession=(action "iniciarCerrarSesion")}}

  {{#solo-en-sesion isSignedIn=isSignedIn}}
    {{comida-favorita favoriteFood=model.favoriteFood}}
  {{/solo-en-sesion}}
</div>
```

Y finalmente, algo que no hemos visto, pero que explicare a continuacion: agregaremos una accion.

```
actions: {
  iniciarCerrarSesion() {
    this.toggleProperty("isSignedIn");
  },
},
```

— Momento, momento, mas despacio cerebrito!

Ok, vemos la repeticion instantanea :)

Primero, movi la seccion que mostraba el boton para iniciar sesion, incluyendo el `unless` al template del componente y agregue lo que en Ember se conoce como `{{action}}` esta es la forma en la que Ember agrega `onclick` a los elementos del HTML. Tambien lo podemos usar en otros eventos que no sean `onclick`, haciendo `onblur={{action 'miFuncion'}}`.

Despues, modifique el template de nuestra aplicacion para usar nuestro nuevo componente y le pase algunos valores requeridos: `isSignedIn` para saber si esta en sesion, `meetupname` para que muestre el texto correcto y `toggleSession=(action "iniciarCerrarSesion")` para controlar la accion.

— Aja! Pero... tu nos explicaste `{{action}}` pero estas usando tambien `(action)`

Es cierto! Esto es nuevo en Ember 1.13 y es una chulada. Antes, si querias mandar acciones desde dentro de tu componente hacia fuera del mismo, especialmente si estabas dentro de un componente que estaba dentro de otro componente (y asi sucesivamente varios niveles) tenias que recibir manualmente acciones en JavaScript y retransmitirlas en cada nivel de anidacion. Teniendo `action` como sub-expresion nos permite omitir todo esto y pasarle (injectar) la funcion directamente al componente. Con esto ademas obtenemos componentes totalmente desacoplados pues no saben ni les interesa que realizara esta accion injectada, solo se encargan de hacer su trabajo en su mundo aislado y notificar cuando han terminado.

Recapitulemos nuevamente lo que hemos visto hasta ahora:

- Ember CLI es nuestro pan de cada dia para nuevos archivos
- `ember generate helper` se usa para crear nuevos helpers
- `ember generate component` se usa para generar nuevos components
- `{{action}}` es la forma de ember de escuchar eventos en el HTML
- `(action)` se usa para inyectar funciones externas a un componente

Finalmente, algo que hemos olvidado hacer desde la primera ves que usamos Ember CLI: probar nuestro codigo. Afortunadamente Ember es muy serio en cuanto a pruebas se refiere y el CLI viene listo para empezar a probar sin tener que configurar nada mas. De hecho habras notado que cada ves que usamos el CLI para generar algo, siempre se generan tambien sus archivos para tests.

Test de nombde de usuario:

```
test('it works', function(assert) {
  assert.equal(nombreDeUsuario([{}], {}), 'Invitado', 'Nombre es Invitado');
  assert.equal(nombreDeUsuario([{}], {guestName: 'Foo'}), 'Foo', 'Nombre es Foo');
  assert.equal(nombreDeUsuario([{username: 'foo'}], {}), 'Invitado', 'Nombre es Invitado');
  assert.equal(nombreDeUsuario([{username: 'foo'}], {isSignedIn: true}), 'foo', 'Nombre es foo');
  assert.equal(nombreDeUsuario([{username: 'foo', firstname: 'Bar'}], {isSignedIn: true}), 'Bar', 'Nombre es Bar');
});
```

Test de comida favorita:

```
test('it renders', function(assert) {
  this.set("favoriteFood", ['Foo', 'Bar']);

  this.render(hbs`{{comida-favorita favoriteFood=favoriteFood}}`);

  assert.equal(this.$('li:first').text().trim(), 'Foo');
  assert.equal(this.$('li:last').text().trim(), 'Bar');
});
```

Test de solo en sesion:

```
test('it renders', function(assert) {
  this.set('isSignedIn', false);

  this.render(hbs`
    {{#solo-en-sesion isSignedIn=isSignedIn}}
      Hola!
    {{/solo-en-sesion}}
  `);

  assert.equal(this.$().text().trim(), 'Este contenido requiere que incies sesion.');

  this.set('isSignedIn', true);

  assert.equal(this.$().text().trim(), 'Hola!');

});
```

Y finalmente, test de control de sesion:

```
test('it renders', function(assert) {
  let done = assert.async();

  this.setProperties({
    isSignedIn: false,
    meetupname: 'Foo',
    actions: {
      testingToggle() {
        assert.ok(true);
        done();
      },
    },
  });


  this.render(hbs`{{control-de-sesion isSignedIn=isSignedIn meetupname=meetupname toggleSession=(action 'testingToggle')}}`);

  assert.ok(this.$().text().trim().indexOf('Inicia') === 0);

  this.set("isSignedIn", true);
  assert.ok(this.$().text().trim().indexOf('Bienvenido') === 0);

  this.$('button').click();
});
```
