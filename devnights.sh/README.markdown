# Script All The Things!

La terminal se ha vuelto una herramienta indispensable para todo desarrollador web, sea front o back end, sea Node, JavaScript, Ruby, Python, etc. 

Al inicio parece una herramienta intimidante donde no tenemos la seguridad de un dialogo confirmando "Estas seguro que quieres hacer eso?". Despues econtramos algunas herramientas que nos ayudan a mejorar nuestra terminal mostrando información extra o facilitando tareas que hacíamos a mano (alias, dotfiles, etc.). Finalmente si somos consistentes llegaremos a un punto en que la terminal se vuelve rutina, incluso llega a ser algo monótono: los mismos comandos, los mismos pasos, una y otra vez.


Script All The Things!

Bueno, tal vez no todas, pero muchas de las tareas que realizamos en nuestro día a día es posible reducirlas o automatizarlas creando un script. En efecto, pareciera contradictorio que despues de tantas horas que hemos pasado en ella perdiéndole el miedo, tuneandola, queramos dejarla atrás y pasar menos tiempo en ella, pero esto no es lo que buscamos; lo que realmente buscamos como todo buen programador es que alguien más haga el trabajo por nosotros 😁, y quien mejor para hacerlo sin cansarse que la computadora. 

Es aquí cuando entramos al mundo del scripting. Cada sistema operativo, cada lenguaje de programación, incluso cada shell tiene sus propios estilos de scripting; hay tal variedad que pareciera otro mundo (y en cierta forma lo es). En Windows tenemos los batch files, VBScripts, el PowerShell, etc., en macOS (uno de los SO más automatizables) tenemos Apple Script, Automator, Bash, etc. en Linux, Bash es en mi opinion el rey; en todos los anteriores tenemos los diferentes lenguajes de programación como Perl, Python, Ruby, Node, PHP, Java, etc. 

(Si, he visto scripts de deployment y migraciones escritos en PHP; el mismo composer esta escrito en PHP).

En mi caso, mi favorito para scripting es Bash, principalmente por su portabilidad y la facilidad para interactuar con otros programas/lenguajes. 

A grandes rasgos, un script es una serie de instrucciones que le dicen a la computadora que haga algo. Puede ser tan sencillo como escribir texto en pantalla, o tan complejo como orquestar todo un deploy en servidores remotos, arrancar instancias, imprimir hacer backups, etc. Todo con 1 solo comando.

De aquí en adelante, voy a asumir que estamos en una terminal con Bash y algún sabor de *nix (Linux, macOS, git-bash en Windows, etc).

Para seguir con la tradición milenaria, hagamos un archivo hola-mundo.sh con nuestro `Hola mundo`:

```sh
#!/bin/bash
echo "Hola mundo"
```

La primera línea del archivo es algo que común mente se conoce como `shebang`, `hashbang` y otros nombres menos comunes (WikiPedia). Es en esta línea donde le decimos al shell que interprete necesitamos usar para ejecutar dicho script. Otra forma común, y mas portable, es:

```sh
#!/usr/bin/env bash
```

En esta línea en vez de asumir que `bash` esta directo en `/bin` lo que hacemos es preguntar a la herramienta de entorno la hubicacion de dicho programa, lo cual lo podemos hacer con cualquier otro:


```sh
#!/usr/bin/env ruby
```

```sh
#!/usr/bin/env python
```

```sh
#!/usr/bin/env node
```

Despues de dicha línea, lo que hacemos es empezar con nuestras instrucciones, en nuestro caso, un simple `echo`.

Antes de poder ejecutar este archivo, debemos darle permisos de ejecución. Esto se consigue (y solo se require 1 vez) con el comando `chmod`.

```sh
$ chmod +x hola-mundo.sh
```

Antes de continuar, una aclaración. En el comando anterior, vemos que inicia con un `$`. Esto **no** es parte del comando, sino que nos indica que estamos en una terminal con permisos de usuario normal. Esto es un estándar y es bueno que nos acostumbremos a verlo. En otros lugares también veremos que en lugar del `$` esta un `#` el cual significa que dicha terminal tiene permisos elevados de `root` (administrador).


Nuestro script esta listo para ejecutarse ahora:

```sh
$ ./hola-mundo.sh
```

Pero... que es ese `./`? Eso significa que le pedimos a nuestra terminal que ejecute el archivo hola mundo que esta en la carpeta actual `./`. Si por ejemplo, el script estuviera en otro lugar, como en `/opt/foo/bar/` lo puedo ejecutar así:

```sh
$ /opt/foo/bar/hola-mundo.sh
```

Para hacerme la vida más fácil, yo tengo una carpeta `bin` en mi carpeta de usuario, la cual he agregado a la variable `PATH` y así en ves de tener que escribir la ruta completa y nombre del script, solo tengo que escribir el nombre, sin importar donde me encuentre actualmente. Otro de mis tips es que omito la terminación (extension) del archivo. Al estar en mi carpeta `bin` se de antemano que se trata de algún tipo de script que puedo ejecutar.

Tener una serie de comandos juntos en un solo script es practico, pero tal y como lo hacemos en programación el verdadero potencial de nuestro script sale a relucir cuando empezamos a agregar variables y parámetros.

Por default, dentro de cualquier cualquier script tenemos acceso a las variables de entorno del sistema, así como a unas variables especiales: `@`, `1`, `2`, etc. `@` representa todos los argumentos que nos dieron en la línea de comandos, despues del nombre de nuestro script, `1` es el primero, `2` el segundo, y así sucesivamente. Si quisiera que mi script `hola-mundo.sh` saludara al usuario por su nombre, puedo modificarlo de la siguiente manera:

```sh
#!/bin/bash
echo "Hola $1"
```

y al ejecutar lo obtengo la siguiente salida

```sh
$ ./hola-mundo.sh Erick
Hola Erick
```

El "problema" es que ahora, si no le paso mi nombre, solo dice "Hola". Pero esto lo podemos arreglar usando un `if`. Cabe mencionar que los `if` se escriben bastante diferente a como lo haríamos con otros lenguajes de programación. No entrare mucho a detalle en esto pues hay muy buenas guías y documentación en línea.

```sh
#!/bin/bash

if [[ -z "$1" ]]; then
  NAME=Mundo
else
  NAME=$1
fi

echo "Hola $NAME"
```

Ese `-z` es la forma de `bash` para probar si el string que le estamos pasando mide 0 (zero) caracteres. En caso que no le pasemos un nombre a nuestro script, la variable `NAME` se asigna el valor `Mundo`, de lo contrario, se asigna lo que le hayamos pasado; finalmente hacemos un `echo` de la cadena.

Tener que recordar el orden de los parámetros que le tenemos que pasar a un script no es nada practico, tal y como pasa cuando tenemos funciones que demasiados argumentos. Para esto, existen varias herramientas que nos permiten traducir los parámetros que le hayamos pasado a nuestro script con letras, tal y como lo hacen otros comandos del sistema operativo. La que vamos a usar no requiere instalar nada pues es compatible con todos los lugares que corran `bash` pues esta integrada, y se llama `getopts`. Cabe mencionar que es básica y solo soporta parámetros "cortos" (de 1 letra).

Supongamos que queremos pasar nombre y apellido. Podemos agregar los parámetros `n` para nombre y `a` para apellido. Lo cual nos da algo así:

```sh
#!/bin/bash

while getopts "n:a:" opt; do
  case $opt in
    n) FIRST=$OPTARG ;;
    a) LAST=$OPTARG ;;
  esac
done

if [[ -z "$FIRST$LAST" ]]; then
  NAME=Mundo
else
  NAME="$FIRST $LAST"
fi

echo "Hola $NAME"
```

Aunque la sintaxis de arriba se ve "rara", si tenemos experiencia con algún lenguaje de programación nos hará sentido lo que esta pasando en el script:

`while getopts "n:a:" opt; do` - vamos a iterar cada uno de los parametros que tenemos `n:` y `a:` usando `$opts` para guardarlo (`n` o `a`). Después dentro del case, guardamos el valor con la variable especial que nos da `getopts` la cual tiene el valor actual de cada parámetro. Finalmente revisamos si tenemos algo para mostrar y sino, usamos `Mundo`.

Este comando lo podemos ahora ejecutar de diferentes formas:

```sh
$ ./hola-mundo.sh
Hola Mundo
$ ./hola-mundo.sh -n Erick
Hola Erick
$ ./hola-mundo.sh -a Ruiz
Hola  Ruiz
$ ./hola-mundo.sh -n Erick -a Ruiz
Hola Erick Ruiz
$ ./hola-mundo.sh -a Ruiz -n Erick
Hola Erick Ruiz
```

Mas información y ejemplos de `getopts`.

Todos los ejemplos hasta ahora son scripts no-interactivos, esto es, les pasamos algunos parámetros y hacen las tareas sin interrumpirnos. Pero que pasa si queremos hacer un script interactivo, tal vez para hacerlo mas amigable con el usuario? Pues para estos casos también tenemos otras opciones integradas a `bash`: `read` y `select`.

`read` va a recibir el input del usuario en forma de string; `select` nos permite hacer menus con opciones además de también permitir input arbitrario.



[shebang]: https://en.wikipedia.org/wiki/Shebang_(Unix)


---

`read` & `select`

`echo` & `printf`

`awk`

Functions

Import files

CocoaDialog

Automator

Workflow?

Pingdom

Jekyll

Coders Mexico Website
