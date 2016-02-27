Templates (Plantillas)

- Introducción (que son los templates, sintaxis básica)
- Helpers lógicos (`if`, `else`, `else if`, `unless`)
- Sub-expresiones (diferencias entre `{{` y `(`)
- Iteradores (`each`)
- Creación de un helper
- Diferencias entre `prop="foo"` y `prop=foo`
- Parciales, componentes y cuando usar cada uno
- Creación de un componente
- Helper `action`
- Test de integración simple

El tema de templates requiere un conocimiento previo (aunque mínimo) de los siguientes conceptos:

- Saben que es Ember
- Saben que es Ember CLI

Toda aplicación Web, o por lo menos así es hasta el día de hoy, necesita de HTML. Diferentes frameworks tienen diferentes estilos para trabajar con el HTML, Backbone usa templates sencillos, Angular usa HTML, React lo pone en línea con el JavaScript, y en nuestro caso, Ember usa HTMLBars, el cual es una mejora sobre Handlebars (el cual a su ves es una mejora sobre Mustache).

La forma mas sencilla de una plantilla en Ember es:

```
```

Aunque, para ser sincero, eso no es realmente útil. Si queremos mejorar un poco, podemos tener algo así:

```
<h1>Hola Ember!</h1>
```

Un poco mas útil que la anterior, aunque sigue sin sorprendernos realmente. Subamos un poco mas el nivel.

```
<div>
  <div>Hola {{model.username}}!</div>
  <div>Bienvenido a {{meetupname}}</div>
</div>
```

— Y que es eso que esta entre `{{` y `}}`?

Aja! Se empieza a poner interesante, no? A eso se le llama un "binding" (vinculo, enlace). En un template podemos usar bindings para solicitar a Ember que reemplace, por nosotros y de forma automática, las variables por sus respectivos valores.

Asumiendo que los valores de `model.username` y `meetupname` son `Erick` y `Ember Meetup Guatemala`, el template de arriba nos generaría algo así:

```
<div>
  <div>Hola Erick!</div>
  <div>Bienvenido a Ember Meetup Guatemala</div>
</div>
```

— Muy chulo eso de poner variables y que Ember nos lo cambie de forma automática! Si esto es tan practico ya imagino que tan practico será meter mis funciones en el template directo!

Emmm... no. En HTMLBars, Handlebars y en general en Mustache y otros templates se considera una mala practica el mezclar lógica y HTML. Pero no esto no significa que sea el fin del mundo. Ember tiene otras herramientas para conseguir los mismos o incluso mejores resultados. Por ejemplo, que pasa si quiero controlar la visibilidad de una sección de mi template dependiendo del valor de una variable? Para eso vamos a utilizar algo que se conoce en Ember como "Helpers" (ayudantes, asistentes).

Un helper es básicamente una función que recibe algunos parámetros y realiza alguna acción por nosotros dentro del template sin tener que mezclar HTML y JavaScript.

Algunos de los helpers que vienen ya integrados en Ember y que usaremos constantemente son los helpers de control lógico (`if`, `else`, `else if`, `unless`). Con estos, podemos controlar que algo pase (o no pase) en determinadas partes de nuestro template dependiendo del estado de los datos que lo respaldan.

Siguiendo el trabajo que llevamos en nuestro template, podemos mejorarlo de la siguiente manera:

```
<div>
  <div>Hola {{model.username}}!</div>
  {{#if isSignedIn}}
    <div>Bienvenido a {{meetupname}}</div>
  {{else}}
    <div>Inicia sesión haciendo clic <button>aquí</button></div>
  {{/if}}
</div>
```

Ahora, nuestro template mostrara diferentes opciones dependiendo del valor de `isSignedIn`: Si el usuario esta en sesión, mostrara el mensaje de bienvenida, de lo contrario le dará una opción al usuario de iniciar sesión haciendo clic en un botón.

— Y que pasa si lo quiero en orden invertido?

En lugar de usar `if` podemos usar `unless` el cual es básicamente un `if not`.

```
<div>
  <div>Hola {{model.username}}!</div>
  {{#unless isSignedIn}}
    <div>Inicia sesión haciendo clic <button>aquí</button></div>
  {{else}}
    <div>Bienvenido a {{meetupname}}</div>
  {{/unless}}
</div>
```

Para este momento el uso de `else if` debería ser bastante obvio, pero como no me gusta asumir, veamos un ejemplo:

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
    <div>Inicia sesión haciendo clic <button>aquí</button></div>
  {{else}}
    <div>Bienvenido a {{meetupname}}</div>
  {{/unless}}
</div>
```

— Erick, estas siendo muy repetitivo con ese HTML, no hay mejor una forma de solo cambiar el nombre en vez de repetir todo el `div`?

Claro que la hay. Los helpers, así como los componentes (los cuales veremos mas adelante) se pueden usar de dos formas, en línea y en bloque.

Ya hemos visto como usar un `if` en bloque: usando `{{`, seguido de un `#` y el nombre del helper/componente `if` y para cerrarlo es lo mismo, solo reemplazamos el `#` por un `/`. Si nuestro helper/componente soporta el uso en línea, lo único que aremos será omitir el `#` y el tag de cierre. Veamos como lo haríamos con ese nombre:

```
<div>
  {{#unless isSignedIn}}
    <div>Hola Invitado!</div>
  {{else}}
    <div>Hola {{if model.firstname model.firstname model.username}}!</div>
  {{/unless}}

  {{#unless isSignedIn}}
    <div>Inicia sesión haciendo clic <button>aquí</button></div>
  {{else}}
    <div>Bienvenido a {{meetupname}}</div>
  {{/unless}}
</div>
```

En el caso de `if` la sintaxis para usarlo en línea es: `{{if condición valorVerdadero valorFalso}}`. El mismo orden aplica para `unless`.

— Y no seria genial si pudiéramos de alguna forma usarlos en conjunto?

Si, y claro que se puede. Esto se conoce como sub-expresiones y consiste básicamente en reemplazar los `{{` y `}}` por `(` y `)` cuando ya estamos dentro de un binding:

```
<div>
  <div>Hola {{if isSignedIn (if model.firstname model.firstname model.username) "Invitado"}}!</div>

  {{#unless isSignedIn}}
    <div>Inicia sesión haciendo clic <button>aquí</button></div>
  {{else}}
    <div>Bienvenido a {{meetupname}}</div>
  {{/unless}}
</div>
```

— Mind. Blown.

Lo se. Para evitar confusiones, aclaremos un poco que fue lo que paso ahí. Ya sabemos que nuestro `if` en línea recibe tres parámetros: 1. condición, 2. valor a usar si la condición es verdadera, y 3. valor a usar si la condición es falsa; en el template de arriba, usamos un segundo `if` como una sub-expresión cuyo resultado será usado en caso que nuestro usuario este en sesión, de lo contrario se usara la cadena `"Invitado"`.

Las sub-expresiones no están limitadas al los helpers lógicos, cualquier helper que se use en línea puede ser usado también como una sub-expresión.

Pero esto no termina aquí. Ember estaría muy limitado si solo tuviera estos helpers y tuviéramos nosotros que implementar otros tantos básicos. Otro helper que también van a usar bastante es `each`, el cual nos sirve para repetir bloques de nuestro HTML para cada elemento dentro de una colección (listas, tablas, etc.).

Mejoremos un poco nuestro template asumiendo que nuestros datos incluyen también un arreglo llamado `favoriteFood` con alguna de mi comida favorita:

```
<div>
  <div>Hola {{if isSignedIn (if model.firstname model.firstname model.username) "Invitado"}}!</div>

  {{#unless isSignedIn}}
    <div>Inicia sesión haciendo clic <button>aquí</button></div>
  {{else}}
    <div>Bienvenido a {{meetupname}}</div>
  {{/unless}}

  {{#if isSignedIn}}
    <div>
      Aquí esta tu comida favorita (en caso que se te olvide):
      <ul>
      {{#each model.favoriteFood as | dishName |}}
        <li>{{dishName}}</li>
      {{/each}}
      </ul>
    </div>
  {{/if}}
</div>
```

Asumiendo que estoy en sesión y que entre mis comidas favoritas están: Pizzas, Hamburguesas y Hot-Dogs (yo lo se, súper saludable!), El resultado seria algo así:

```
<div>
  <div>Hola Erick!</div>
  <div>Bienvenido a Ember Meetup Guatemala</div>

  <div>
    Aquí esta tu comida favorita (en caso que se te olvide):
    <ul>
      <li>Pizzas</li>
      <li>Hamburguesas</li>
      <li>Hot-Dogs</li>
    </ul>    
  </div>
</div>
```

Recapitulemos lo que hemos aprendido hasta el momento:

- Los templates de Ember son básicamente HTML con algunas cosas chulas gracias a HTMLBars, el cual es hijo de Handlebars y nieto de Mustache.
- Podemos hacer bindings de variables simplemente encerrándolas entre `{{` y `}}`.
- Tenemos también a la mano varios helpers predefinidos en Ember, como lo son `if`, `else`, `else if`, `unless`, `each`.
- Algunos de estos helpers pueden ser usados tanto en forma de bloque, como en línea.
- Generalmente, los helpers que pueden ser usados en línea, también pueden mezclarse en forma de sub-expresiones mediante el uso de `(` y `)`.

Como en todo framework, el uso de las herramientas que nos provee es la mitad del trabajo, y la otra mitad es extender dichas herramientas para crear las nuestras. Este es el caso de los helpers. La creación de un helper es bastante sencilla, basta con usar el generador que viene incluido en la herramienta de línea de comando `ember-cli`.

```
ember generate helper nombre-de-usuario
```

Este comando nos va a generar una serie de archivos necesarios para nuestro helper. Específicamente y en la versión 1.13 que es la que estoy ocupando, obtendremos 2:

```
app/helpers/nombre-de-usuario.js
tests/unit/helpers/nombre-de-usuario-test.js
```

El contenido de nuestro nuevo helper luce algo así:

```
import Ember from 'ember';

export function nombreDeUsuario(params/*, hash*/) {
  return params;
}

export default Ember.Helper.helper(nombreDeUsuario);
```

Como lo había comentado, un helper no es otra cosa que una function que recibe parámetros y regresa un resultado en forma de cadena de texto. Podemos ver que la firma de la función espera dos posibles parámetros, `params` y en caso que lo necesitemos `hash`.

— Pero que diferencia hay entre uno y otro?

Fácil, `params` es equivalente a lo que en JavaScript recibimos en nuestras funciones con el nombre de `arguments`; `hash` será un objeto con valores a los cuales podemos usar por nombre y que ademas podemos usar para bindings. La forma en que me gusta verlo es: `params` es lo necesario para el resultado del helper (nuestro usuario) y `hash` para configurar los resultados del mismo.

Hagamos nuestro helper primero con `params` solamente y después usemos `hash`.

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

Y ahora podemos usarlo así:

```
<div>Hola {{nombre-de-usuario isSignedIn model}}!</div>
```

Aunque esta versión funciona bien, tenemos que recordar el orden de los parámetros, y esto podría empezar a volverse un poco enredado si queremos agregar también un nombre opcional en lugar de 'Invitado'. Pero, como sabemos que tenemos `hash` a nuestra disposición, usémoslo:

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

El cual puede ser usado así:

```
<div>Hola {{nombre-de-usuario model isSignedIn=isSignedIn}}!</div>
```

Y también así:

```
<div>Hola {{nombre-de-usuario model isSignedIn=isSignedIn guestName='Embereño'}}!</div>
```

— Wow! Oye, porque tienes `isSignedIn=isSignedIn` sin comillas, pero `guestName='Embereño'` con comillas?

Ah! Eso es porque cuando estamos agregando atributos dentro de un template, un helper o un componente también podemos hacer bindeos de sus valores. En este caso, estoy haciendo un bindeo de `isSignedIn` para que, cuando cambie su valor, se ejecute de nuevo el helper, y en el caso de `guestName` solo estoy pasando un string.

— Así que, cuando quiero tener un template dentro de otro template, puedo usar helpers! Eso es cool!

Si... y no. Un helper no es realmente un template dentro de otro template. Si no que te ayuda a dar formato o mantener consistencia en diferentes partes de tu template y tu aplicación. Si lo que quieres es reutilizar bloques grandes de un template en varios templates tienes otras dos opciones diferentes: `partials` y `components`.

Un `partial` (plantilla parcial) es para casos sencillos, en los que quieres evitar principalmente el copy & paste de un template (o una porción del mismo) sin lógica.

Un ejemplo de un template podría ser nuestro saludo si es que lo quisiéramos usar en diferentes partes de nuestra app. Asumiendo que tomamos el siguiente bloque de HTML y lo guardamos en el archivo `app/templates/saludo.hbs` ahora podemos usarlo en cualquier template con un `{{partial 'saludo'}}`.

— Y como le pasamos las variables?

Ahí esta el detalle, un parcial no esta pensado para usos complejos y va a obtener acceso a las variables que estén en el template en el que lo uses, lo cual nos obligaría a tener disponible `isSignedIn` y `model` en donde lo usemos.

Por otro lado, tenemos los `components` (componentes) que son mucho mas flexibles y potentes que un template aunque también algo mas complejos de usar (no te espantes, no es tan complejo).

Supongamos que queremos hacer un componente para la lista de mi comida favorita. Lo primero que haremos será usar la línea de comando:

```
ember generate component comida-favorita
```

Esto nos genera los siguientes archivos:

```
app/components/comida-favorita.js
app/templates/components/comida-favorita.hbs
tests/integration/components/comida-favorita-test.js
```

Nuestros archivos del componente y template lucen algo así:

```
import Ember from 'ember';

export default Ember.Component.extend({
});
```

y así:

```
{{yield}}
```

En el caso del JavaScript no tiene nada especial, solo estamos extendiendo la clase componente de Ember y esta listo para la acción. En el caso del template, tiene una palabra especial `yield`. Ese `yield` lo vamos a usar solamente cuando nuestros componentes se comporten como bloques (así como `if` o `each`).

Siguiente paso, tomar lo que tenemos en el template de la aplicación y pasarlo al del componente:

```
<div>
  <div>Hola {{nombre-de-usuario model isSignedIn=isSignedIn guestName='Embereño'}}!</div>

  {{#unless isSignedIn}}
    <div>Inicia sesión haciendo clic <button>aquí</button></div>
  {{else}}
    <div>Bienvenido a {{meetupname}}</div>
  {{/unless}}

  {{#if isSignedIn}}
    {{comida-favorita favoriteFood=model.favoriteFood}}
  {{/if}}
</div>
```

```
Aquí esta tu comida favorita (en caso que se te olvide):
<ul>
{{#each favoriteFood as | dishName |}}
  <li>{{dishName}}</li>
{{/each}}
</ul>
```

Ahora, para poner un ejemplo de un componente de bloque, hagamos uno que oculte el contenido si nuestro usuario no esta en sesión.

```
ember generate component solo-en-sesión
```

Nuestro componente se vera así:

```
{{#if isSignedIn}}
  {{yield}}
{{else}}
  Este contenido requiere que inicies sesión.
{{/if}}
```

Y lo usaremos de la siguiente forma:

```
<div>
  <div>Hola {{nombre-de-usuario model isSignedIn=isSignedIn guestName='Embereño'}}!</div>

  {{#unless isSignedIn}}
    <div>Inicia sesión haciendo clic <button>aquí</button></div>
  {{else}}
    <div>Bienvenido a {{meetupname}}</div>
  {{/unless}}

  {{#solo-en-sesión isSignedIn=isSignedIn}}
    {{comida-favorita favoriteFood=model.favoriteFood}}
  {{/solo-en-sesión}}
</div>
```

Los componentes no solo nos sirven como `if` con asteroides como ya lo habrán imaginado. Que utilidad tendrían si no pudiéramos hacer cosas mas complejas?! Para un ejemplo un poco mas elaborado, hagamos un componente para iniciar y cerrar nuestra sesión de ejemplo.

```
ember generate component control-de-sesión
```

Modificamos el template de nuestro componente para que se vea así:

```
{{#unless isSignedIn}}
  <div>Inicia sesión haciendo clic <button {{action toggleSession}}>aquí</button></div>
{{else}}
  <div>Bienvenido a {{meetupname}} <button {{action toggleSession}}>cerrar sesión</button></div>
{{/unless}}
```

Cambiamos el template de nuestra aplicación para usar ahora el nuevo componente:

```
<div>
  <div>Hola {{nombre-de-usuario model isSignedIn=isSignedIn guestName='Embereño'}}!</div>

  {{control-de-sesión isSignedIn=isSignedIn meetupname=meetupname toggleSession=(action "iniciarCerrarSesion")}}

  {{#solo-en-sesión isSignedIn=isSignedIn}}
    {{comida-favorita favoriteFood=model.favoriteFood}}
  {{/solo-en-sesión}}
</div>
```

Y finalmente, algo que no hemos visto, pero que explicare a continuación: agregaremos una acción.

```
actions: {
  iniciarCerrarSesion() {
    this.toggleProperty('isSignedIn');
  },
},
```

— Momento, momento, mas despacio cerebrito!

OK, vemos la repetición instantánea :)

Primero, moví la sección que mostraba el botón para iniciar sesión, incluyendo el `unless` al template del componente y agregue lo que en Ember se conoce como `{{action}}` esta es la forma en la que Ember agrega `onclick` a los elementos del HTML. También lo podemos usar en otros eventos que no sean `onclick`, haciendo `onblur={{action 'miFuncion'}}`.

Despues, modifique el template de nuestra aplicación para usar nuestro nuevo componente y le pase algunos valores requeridos: `isSignedIn` para saber si esta en sesión, `meetupname` para que muestre el texto correcto y `toggleSession=(action 'iniciarCerrarSesion')` para controlar la acción.

— Aja! Pero... tu nos explicaste `{{action}}` pero estas usando también `(action)`

Es cierto! Esto es nuevo en Ember 1.13 y es una chulada. Antes, si querías mandar acciones desde dentro de tu componente hacia fuera del mismo, especialmente si estabas dentro de un componente que estaba dentro de otro componente (y así sucesivamente varios niveles) tenias que recibir manualmente acciones en JavaScript y retransmitirlas en cada nivel de anidación. Teniendo `action` como sub-expresión nos permite omitir todo esto y pasarle (inyectar) la función directamente al componente. Con esto ademas obtenemos componentes totalmente desacoplados pues no saben ni les interesa que realizara esta acción inyectada, solo se encargan de hacer su trabajo en su mundo aislado y notificar cuando han terminado.

Recapitulemos nuevamente lo que hemos visto hasta ahora:

- Ember CLI es nuestro pan de cada día para nuevos archivos
- `Ember generate helper` se usa para crear nuevos helpers
- `Ember generate component` se usa para generar nuevos components
- `{{action}}` es la forma de Ember de escuchar eventos en el HTML
- `(action)` se usa para inyectar funciones externas a un componente

Finalmente, algo que hemos olvidado hacer desde la primera ves que usamos Ember CLI: probar nuestro código. Afortunadamente Ember es muy serio en cuanto a pruebas se refiere y el CLI viene listo para empezar a probar sin tener que configurar nada mas. De hecho habrás notado que cada ves que usamos el CLI para generar algo, siempre se generan también sus archivos para tests.

Test de nombre de usuario:

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

Test de solo en sesión:

```
test('it renders', function(assert) {
  this.set('isSignedIn', false);

  this.render(hbs`
    {{#solo-en-sesión isSignedIn=isSignedIn}}
      Hola!
    {{/solo-en-sesión}}
  `);

  assert.equal(this.$().text().trim(), 'Este contenido requiere que inicies sesión.');

  this.set('isSignedIn', true);

  assert.equal(this.$().text().trim(), 'Hola!');

});
```

Y finalmente, test de control de sesión:

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
