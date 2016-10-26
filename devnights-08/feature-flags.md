class: center, middle

# Feature Flags

**Erick Ruiz de Chavez**

*eruizdechavez*

???

- Agradecer a los organizadores por la invitacion
- Agradever a los presentes por su atencion
- Twitter, GitHub y Slack de Coders Mexico

---

# Diferentes nombres

- Feature flag
- Feature flip
- Feature toggle
- Feature switch
- Feature flipper
- Conditional feature
- ...

.footnote[https://en.wikipedia.org/wiki/Feature_toggle]

???

Tienen diferentes nombres aunque todos se refieren a la misma idea.

- Flag
- Flip
- Toggle
- Switch
- Flipper
- Conditional feature
- ...
 
---

class: center, middle

# Alternativa a los feature branches 

(GitFlow)

???

Alternativa a los feature branches.

Comunes en GitFlow.

Esto hace dificil la implementacion de integracion continua.

---

class: center, middle

# Activar, Desactivar, Ocultar

???

Usados para activar, desactivar u ocultar funcionalidad.

Enviar a produccion codigo incompleto, siempre que estas no rompan el funcionamiento actual.

---

# If / Else

```javascript
  if (feature === true) {
    // codigo nuevo
  } else {
    // codigo viejo
  }
```

```handlebars
  {{#if feature}}
    secciones nuevas y/o mejoradas
  {{else}}
    secciones originales
  {{/if}}
```

???

Variables usadas en condicionales.

Dichos bloques se ejecutan o no dependiendo del estado del flags.

---

class: center, middle

# Housekeeping

???

Periodos de limpieza necesarios periodicamente.

Remover el codigo de los flags que han sido activados permanentemente.

---

# Principales usos

- Agregar nueva funcionalidad
- Mejorar alguna funcionalidad existente
- Ocultar o desactuvar alguna funcionalidad
- Extender alguna interfaz

???

Principales casos de uso:

- Agregar
- Mejorar
- Ocultar / desactuvar
- Extender

---

layout: true
class: center, middle

# Otros usos y aplicaciones

---

## Feature Groups

???

Feature flags agroupados (Grupos)

---

## Role features

???

Activar algunas funciones por tipo de usuario

---

## Rollout Porcentual

???

Activar funcionalidad de forma progresiva (Twitter, Facebook, etc.)

---

layout: false

# Ejemplo 1

```javascript
{
  foo: true,
  bar: false,
  baz: true
}
```
---

# Ejemplo 2

```javascript
[{
  id: foo,
  enabled: true,
}, {
  id: bar,
  enabled: false,
}, {
  id: baz,
  enabled: true,
}]
```

---
layout: true

# Ejemplo 3

---

```javascript
[{
  id: foo,
  enabled: true,
  whitelist: [],
  blacklist: [],
}, {
  id: bar,
  enabled: false,
  whitelist: [],
  blacklist: [],
}, {
  id: baz,
  enabled: true,
  whitelist: [],
  blacklist: [],
}]
```

---

```javascript
db.getCollection('flags')
  .find({
    enabled: true,
    $and: [
      {
        $or: [
          { whitelist: { $size: 0 } },
*         { whitelist: 1 }
        ]
      },
      {
        $or: [
          { blacklist: { $size: 0 } },
*         { blacklist: { $ne: 1 } }
        ]
      }
    ]
  }, { _id: 1 })
```

---

layout: false
class: center, middle

# Demo

---

# Algunos recursos

- Feature Flags Resources - http://featureflags.io
- LaunchDarkly - https://launchdarkly.com
- Split - http://www.split.io

---

class: center, middle

# Preguntas ?

.left[*There are naive questions, tedious questions, ill-phrased questions, questions put after inadequate self-criticism. But every question is a cry to understand the world. **There is no such thing as a dumb question.***]

.right[— Carl Sagan]

???

Hay preguntas ingenuas, preguntas tediosas, preguntas mal readactadas, preguntas formuladas ante una autocritica inadecuada. Pero cada pregunta es un grito para entender el mundo. **No existe tal cosa como una pregunta tonta**.

The Demon-Haunted World: Science as a Candle in the Dark

https://www.goodreads.com/quotes/538156-there-are-naive-questions-tedious-questions-ill-phrased-questions-questions-put

