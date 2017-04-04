class: center, middle

# Script All The Things!

**Erick Ruiz de Chavez**

*eruizdechavez*

???

- Agradecer a los organizadores por la invitación
- Agradecer a los presentes por su atención
- Twitter, GitHub y Slack de Coders Mexico
- Libres de interrumpir con preguntas en cualquier momento

---
class: center, middle

# Que es un Script?

???

Conjunto de comandos agrupados en un solo archivo para facilitar tareas comunes.

---

class: center, middle

```shell
#!/bin/bash

# Your commands here...
```

???

Shebang, hashbang, etc. Llama el comando actual. 

--

```shell
#!/usr/bin/env bash

# Your commands here...
```

???

Si no conocemos el path, podemos usar `/usr/bin/env`

--

```shell
$ chmod +x my-script
```

???

Cambiar permisos del archivo para dar permiso de ejecucion.
 
--

```shell
$ ./path/to/my/my-script
```

???

Correr el script en la carpeta actual
--

```shell
$ my-script
```

???

O mejor aun, ponerlo en el system path y correrlo donde sea.

---

# Tips, Tricks

- `$@`, `$1`, `$2`, etc.

???

`@` es todo el input del usuario despues de nuestro comando, o `1`, `2`, `3`, etc. cada uno de los argumentos separados por espacios.

--

- `echo`, `printf`

???

`echo` es mas basico, pero menos consistente entre sistemas.

--

- `if/elif/else`  `[]`, `[[]]`

???

`if` tiene una syntaxis "rara" en comparacion a otros lenguages, pero es facil de aprender. No olviden los espacios!

--

- `while` + `getopts`

???

`getopts` es parte de `bash`, no es el mas flexible o completo, pero es el mas compatible sin dependencias adicionales.

--

- `read`, `select`

???

`read` para inputs, `select` para menus

--

- `sed`, `awk`

???

`sed` para regex, `awk` para columnas

--

- CocoaDialog, Automator, Alfred

???

macOS only.

-- 

- Workflow

???

iOS only.

---

class: center, middle

Code Time

---

class: center, middle

# Preguntas ?

.left[*There are naive questions, tedious questions, ill-phrased questions, questions put after inadequate self-criticism. But every question is a cry to understand the world. **There is no such thing as a dumb question.***]

.right[— Carl Sagan]

???

Hay preguntas ingenuas, preguntas tediosas, preguntas mal readactadas, preguntas formuladas ante una autocritica inadecuada. Pero cada pregunta es un grito para entender el mundo. **No existe tal cosa como una pregunta tonta**.

The Demon-Haunted World: Science as a Candle in the Dark

https://www.goodreads.com/quotes/538156-there-are-naive-questions-tedious-questions-ill-phrased-questions-questions-put

