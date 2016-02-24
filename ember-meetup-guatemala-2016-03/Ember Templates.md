Templates (Plantillas)

- Introduccion (que son los templates, syntaxis basica)
- Helpers logicos (`if`, `else`, `else if`, `unless`)
- Sub-expresiones (diferencias entre `{{` y `(`)
- Iteradores (`each`)
- Creacion de un helper
- Parciales, componentes y cuando usarl cada uno
- Creacion de un componente
- Diferencias entre `prop="foo"` y `prop=foo`
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

Un poco mas util que la anterior, aunque sigue sin sorprendernos realmente. Subamos un poco mas el nivel:

```
<div>
  <span>Hola {{username}}!</span>
  <span>Bienvenido a {{meetupname}}</span>
</div>
```

— Y que es eso que esta entre `{{` y `}}`?

Aja! Se empieza a poner interesante, no? A eso se le llama un "binding" (vinculo, enlace). En un template podemos usar bindings para solicitar a ember que reemplaze, por nosotros y de forma automatica, las variables por sus respectivos valores.

Asumiendo que los valores de `username` y `meetupname` son `Erick` y `Ember Meetup Guatemala`, el template de arriba nos generaria algo asi:

```
<div>
  <span>Hola Erick!</span>
  <span>Bienvenido a Ember Meetup Guatemala</span>
</div>
```

— Muy chulo eso de poner variables y que Ember nos lo cambie de forma automatica! Si esto es tan practico ya imagino que tan practico sera meter mis funciones en el template directo!

Emmm... no. En HTMLBars, Handlebars y en general en Mustache y otros templates se considera una mala practica el mezclar logica y HTML. Pero no esto no significa que sea el fin del mundo. Ember tiene otras herramientas para conseguir los mismos o incluso mejores resultados. Por ejemplo, que pasa si quiero controlar la visibilidad de una seccion de mi template dependiendo del valor de una variable? Para eso vamos a utilizar algo que se conoce en Ember como "Helpers" (ayudantes, asistentes).

Un helper es basicamente una funcion que recibe algunos parametros y realiza alguna accion por nosotros dento del template sin tener que mezclar HTML y JavaScript.

Algunos de los helpers que vienen ya integrados en Ember y que usaremos constantemente son los helpers de control logico (`if`, `else`, `else if`, `unless`). Con estos, podemos controlar que algo pase (o no pase) en determinadas partes de nuestro template dependiendo del estado de los datos que lo respaldan.

Siguiendo el trabajo que llevamos en nuestro template, podemos mejorarlo de la siguiente manera:

```
<div>
  <span>Hola {{username}}!</span>
  {{#if isSignedIn}}
    <span>Bienvenido a {{meetupname}}</span>
  {{else}}
    <span>Inicia sesion haciendo click <button>aqui</button></span>
  {{/if}}
</div>
```

Ahora, nuestro template mostrara diferentes opciones dependiendo del valor de `isSignedIn`: Si el usuario esta en sesion, mostrara el mensaje de bienvenida, de lo contrario le dara una opcion al usuario de iniciar sesion haciendo click en un boton.

— Y que pasa si lo quiero en orden invertido?

En lugar de usar `if` podemos usar `unless` el cual es basicamente un `if not`.

```
<div>
  <span>Hola {{username}}!</span>
  {{#unless isSignedIn}}
    <span>Inicia sesion haciendo click <button>aqui</button></span>
  {{else}}
    <span>Bienvenido a {{meetupname}}</span>
  {{/unless}}
</div>
```

Para este momento el uso de `else if` deberia ser bastante obvio, pero como no me gusta asumir, veamos un ejemplo:

```
<div>
  {{#if firstname}}
    <span>Hola {{firstname}}!</span>
  {{else if username}}
    <span>Hola {{username}}!</span>
  {{else}}
    <span>Hola Invitado!</span>
  {{/if}}

  {{#unless isSignedIn}}
    <span>Inicia sesion haciendo click <button>aqui</button></span>
  {{else}}
    <span>Bienvenido a {{meetupname}}</span>
  {{/unless}}
</div>
```

— Erick, estas siendo muy repetitivo con ese HTML, no hay mejor una forma de solo cambiar el nombre en vez de repetir todo el `span`?

Claro que la hay. Los helpers, asi como los componentes (los cuales veremos mas adelante) se pueden usar de dos formas, en linea y en bloque.

Ya hemos visto como usar un `if` en bloque: usando `{{`, seguido de un `#` y el nombre del helper/componente `if` y para cerrarlo es lo mismo, solo reemplazamos el `#` por un `/`. Si nuestro helper/componente soporta el uso en lina, lo unico que aremos sera omitir el `#` y el tag de cierre. Veamos como lo hariamos con ese nombre:

```
<div>
  {{#unless isSignedIn}}
    <span>Hola Invitado!</span>
  {{else}}
    <span>Hola {{if firstname firstname username}}!</span>
  {{/unless}}

  {{#unless isSignedIn}}
    <span>Inicia sesion haciendo click <button>aqui</button></span>
  {{else}}
    <span>Bienvenido a {{meetupname}}</span>
  {{/unless}}
</div>
```

En el caso de `if` la sintaxis para usarlo en linea es: `{{if condicion valorVerdadero valorFalso}}`. El mismo orden aplica para `unless`.

— Y no seria genial si pudieramos de alguna forma usarlos en conjunto?

Si, y claro que se puede. Esto se conoce como sub-expresiones y consiste basicamente en reemplazar los `{{` y `}}` por `(` y `)` cuando ya estamos dentro de un binding:

```
<div>
  <span>Hola {{if isSignedIn (if firstname firstname username) "Invitado"}}!</span>

  {{#unless isSignedIn}}
    <span>Inicia sesion haciendo click <button>aqui</button></span>
  {{else}}
    <span>Bienvenido a {{meetupname}}</span>
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
  <span>Hola {{if isSignedIn (if firstname firstname username) "Invitado"}}!</span>

  {{#unless isSignedIn}}
    <span>Inicia sesion haciendo click <button>aqui</button></span>
  {{else}}
    <span>Bienvenido a {{meetupname}}</span>
  {{/unless}}

  {{#if isSignedIn}}
    <div>
      Aqui esta tu comida favorita (en caso que se te olvide):
      <ul>
      {{#each favoriteFood as | dishName |}}
        <li>{{dishName}}</li>
      {{/each}}
      </ul>
    <div>
  {{/if}}
</div>
```

Asumiendo que estoy en sesion y que entre mis comidas favoritas estan: Pizzas, Hamburguesas y Hot-Dogs (yo lo se, super saludable!), El resultado seria algo asi:

```
<div>
  <span>Hola Erick!</span>
  <span>Bienvenido a Ember Meetup Guatemala</span>

  <div>
    Aqui esta tu comida favorita (en caso que se te olvide):
    <ul>
      <li>Pizzas</li>
      <li>Hamburguesas</li>
      <li>Hot-Dogs</li>
    </ul>    
</div>
```

Recapitulemos lo que hemos aprendido hasta el momento:

- Los templates de Ember son basicamente HTML con algunas cosas chulas gracias a HTMLBars, el cual es hijo de Handlebars y nieto de Mustache.
- Podemos hacer bindings de variables simplemente encerrandolas entre `{{` y `}}`.
- Tenemos tambien a la mano varios helpers predefinidos en Ember, como lo son `if`, `else`, `else if`, `unless`, `each`.
- Algunos de estos helpers pueden ser usados tanto en forma de bloque, como en linea.
- Generalmente, los helpers que pueden ser usados en linea, tambien pueden mezclarse en forma de sub-expresiones mediante el uso de `(` y `)`.
