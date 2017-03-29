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







---

$@

$1, $2, ...

`getopts`

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
