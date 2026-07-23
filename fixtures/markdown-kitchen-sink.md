# Markdown kitchen sink

Post de prueba para revisar tipografía, espaciado, contraste y todos los elementos que renderiza Scribo.

## Párrafos e inline

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

Texto con **negrita**, *cursiva*, ***negrita cursiva***, ~~tachado~~, `código inline` y una [relación a docs](https://developer.mozilla.org/).

También autolinks: https://scribo.example y contacto@ejemplo.com.

Combinaciones: **negrita con `código`**, *cursiva con [link](https://example.com)*, y ~~tachado con **negrita**~~.

Abreviaturas tipográficas: H<sub>2</sub>O, E=mc<sup>2</sup>, atajo <kbd>⌘</kbd> + <kbd>K</kbd>, y una cita corta <q>así se ve</q>.

---

## Encabezados

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

Texto debajo de un H6 para ver el ritmo vertical.

## Heading 2 seguido de párrafo

Un párrafo inmediato después del heading. El tracking y el line-height deberían sentirse cómodos, sin apretar ni dejar huecos raros.

### Heading 3 con lista debajo

- Primer ítem
- Segundo ítem
- Tercero con **énfasis**

---

## Blockquotes

> Una cita simple. El borde izquierdo y el color muted deberían marcar jerarquía sin gritar.

> Cita con varios párrafos.
>
> Segundo párrafo dentro del mismo blockquote. Ideal para ver padding interno y tipografía italic/serif si aplica.

> Cita anidada de nivel 1
>
> > Nivel 2 anidado
> >
> > > Nivel 3 — ¿se sigue leyendo bien?

> Cita con lista:
>
> 1. Primero
> 2. Segundo
> 3. Tercero con `código`

---

## Listas

### No ordenada

- Alpha
- Bravo
  - Bravo nested
  - Otro nested
    - Tercer nivel
- Charlie con **bold** y [link](https://example.com)

### Ordenada

1. Primero
2. Segundo
   1. Nested A
   2. Nested B
3. Tercero
4. Cuarto con `inline code`

### Mixta

1. Paso uno
   - Detalle
   - Otro detalle
2. Paso dos
   - [ ] Tarea pendiente dentro de lista
   - [x] Tarea hecha dentro de lista

### Task list

- [x] Tipografía de body
- [x] Encabezados serif
- [ ] Contraste de links
- [ ] Tables en mobile (scroll)
- [x] Code blocks light/dark
- [ ] Imágenes con caption visual

---

## Tablas

| Feature | Status | Notes |
| --- | --- | --- |
| Headings | OK | Instrument Serif |
| Body | OK | DM Sans |
| Code | WIP | Shiki dual theme |
| Tables | Check | overflow-x on narrow |
| Images | Check | lazy load |

Tabla angosta alineada:

| Left | Center | Right |
| :--- | :---: | ---: |
| izq | centro | der |
| `code` | **bold** | *italic* |
| 12 | 34 | 56 |

Tabla ancha (probar scroll horizontal en mobile):

| Col A | Col B | Col C | Col D | Col E | Col F | Col G | Col H |
| --- | --- | --- | --- | --- | --- | --- | --- |
| lorem | ipsum | dolor | sit | amet | consectetur | adipiscing | elit |
| sed | do | eiusmod | tempor | incididunt | ut | labore | dolore |

---

## Código

Inline en párrafo: `const answer = 42` y `pnpm dev`.

### TypeScript

```ts
type Post = {
  id: string;
  title: string;
  published: boolean;
};

export function formatTitle(post: Post): string {
  return post.published ? post.title : `[Draft] ${post.title}`;
}

const sample: Post = {
  id: "abc",
  title: "Kitchen sink",
  published: true,
};

console.log(formatTitle(sample));
```

### JavaScript

```js
function greet(name) {
  return `Hello, ${name}!`;
}

greet("Scribo");
```

### CSS

```css
.prose-scribo :where(h1) {
  font-size: clamp(2rem, 1.6rem + 1.4vw, 2.75rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
}
```

### JSON

```json
{
  "title": "Kitchen sink",
  "tags": ["markdown", "qa", "typography"],
  "draft": false
}
```

### Bash

```bash
pnpm install
pnpm dev
curl -s http://localhost:3000/api/health | jq .
```

### Plain / sin lenguaje

```
line 1
line 2 with    spaced    columns
line 3 — characters: <>&"'
```

### Bloque largo (scroll / wrap)

```ts
const veryLongIdentifierThatShouldNotBreakTheLayout = "abcdefghijklmnopqrstuvwxyz0123456789".repeat(4);

export function computeSomethingQuiteElaborate(input: string): string {
  return input
    .split("")
    .reverse()
    .join("")
    .toUpperCase();
}
```

---

## Imágenes

Imagen remota (placeholder):

![Un paisaje abstracto de prueba](https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80)

Imagen con alt vacío (solo decorativa en markup):

![](https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80)

Texto después de imagen para ver el margen inferior.

---

## Separadores

Párrafo antes del HR.

---

Párrafo después del HR.

***

Otro estilo de regla (asteriscos).

___

Y otro (underscores).

---

## Footnotes

Aquí hay una nota al pie[^1] y otra[^segunda].

Texto intermedio para separar las referencias del listado de notas.

[^1]: Primera nota al pie. Puede incluir **markdown** y un [link](https://example.com).
[^segunda]: Segunda nota, con nombre no numérico.

---

## HTML permitido (sanitize)

<details>
<summary>Details / summary — expandir</summary>

Contenido dentro de details. Útil para ver si el bloque respeta tipografía prose.

- Ítem uno
- Ítem dos

</details>

Párrafo con <ins>insertado</ins> y <del>borrado</del>.

Definiciones:

<dl>
  <dt>Scribo</dt>
  <dd>Espacio editorial para notas técnicas.</dd>
  <dt>Prose</dt>
  <dd>Estilos tipográficos del cuerpo del post.</dd>
</dl>

---

## Densidad de lectura

Párrafo corto.

Párrafo mediano con un poco más de contenido para revisar `text-pretty` y el ancho de medida. La idea es que las líneas no se sientan interminables ni demasiado cortas en desktop.

Párrafo largo: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.

Fin del kitchen sink.
