/* ============================================================
   BÁSICO — parte 1: variables y tipos, strings, listas, tuplas
   ============================================================ */
DOJO_PUSH("basico", [

/* ---------------- Variables y tipos ---------------- */
{
  id: "variables",
  title: "Variables y tipos",
  intro: "Una variable es un <strong>nombre</strong> que apunta a un valor. Python tiene tipado dinámico: el tipo vive en el valor, no en el nombre. Los tipos básicos: <code>int</code>, <code>float</code>, <code>str</code>, <code>bool</code>.",
  socratic: [
    {
      q: "Mucha gente dice que una variable es \"una caja donde guardás un valor\". Pero en Python es más preciso pensarla como una <strong>etiqueta</strong>. ¿Qué diferencia hay entre pegar una etiqueta sobre algo y meter algo en una caja?",
      a: "Una caja <em>contiene</em> el valor: si dos cajas tienen \"lo mismo\", son dos copias. Una etiqueta <em>apunta</em> al valor: dos etiquetas pueden apuntar al mismo objeto. En Python <code>a = b</code> no copia nada — pega una segunda etiqueta sobre el mismo objeto. Esto va a ser clave cuando veas listas."
    },
    {
      q: "En Java escribís <code>int age = 30;</code>. En Python solo <code>age = 30</code>. Si Python no te pide el tipo… ¿dónde está el tipo? ¿Lo perdió?",
      a: "No: el tipo está pegado al <strong>valor</strong>, no a la variable. <code>30</code> es un <code>int</code> lo nombres como lo nombres. Por eso podés hacer <code>x = 30</code> y después <code>x = \"hola\"</code>: la etiqueta <code>x</code> simplemente pasa a apuntar a otro objeto de otro tipo. Eso es el <em>tipado dinámico</em>."
    },
    {
      q: "Probá mentalmente: ¿qué debería dar <code>\"5\" + 3</code>? ¿8? ¿\"53\"? ¿Por qué Python decide tirar un error en vez de adivinar?",
      a: "Porque las dos interpretaciones son razonables y elegir una en silencio escondería bugs. Python sigue el principio <em>\"explicit is better than implicit\"</em>: si querés 8, escribí <code>int(\"5\") + 3</code>; si querés \"53\", escribí <code>\"5\" + str(3)</code>. El error temprano es un favor, no una molestia."
    },
    {
      q: "¿Para qué te sirve la función <code>type()</code> mientras aprendés?",
      a: "Es tu lupa: <code>type(x)</code> te dice qué es realmente el valor al que apunta <code>x</code>. La mitad de los errores de principiante son \"yo creía que esto era un número pero era un string\". Cuando dudes, imprimí <code>type(la_cosa)</code>."
    },
    {
      q: "¿Por qué <code>10 / 2</code> da <code>5.0</code> y no <code>5</code>?",
      a: "Porque <code>/</code> en Python <strong>siempre</strong> devuelve <code>float</code>, incluso si la división es exacta — así el tipo del resultado es predecible. Cuando querés división entera (sin decimales) usás <code>//</code>, que sí devuelve <code>int</code> entre enteros."
    }
  ],
  exercises: [
    {
      id: "bas-var-1",
      title: "Tus primeras variables",
      difficulty: 1,
      prompt: "<p>Creá cuatro variables, una de cada tipo básico:</p><ul><li><code>name</code>: un string con tu nombre</li><li><code>age</code>: un entero (<code>int</code>) con una edad</li><li><code>height</code>: un número con decimales (<code>float</code>) con una altura en metros</li><li><code>is_student</code>: un booleano (<code>True</code> o <code>False</code>)</li></ul><p>Después imprimí el tipo de cada una con <code>print(type(...))</code> para verlas con tus propios ojos.</p>",
      starter: "# Crea las cuatro variables aca\n\n\n# Imprimi los tipos\n",
      tests: "assert 'name' in dir() and isinstance(name, str), \"Falta 'name' o no es un string (str)\"\nassert 'age' in dir() and isinstance(age, int) and not isinstance(age, bool), \"Falta 'age' o no es un entero (int)\"\nassert 'height' in dir() and isinstance(height, float), \"Falta 'height' o no es un float (proba con un numero con punto decimal, ej. 1.75)\"\nassert 'is_student' in dir() and isinstance(is_student, bool), \"Falta 'is_student' o no es un booleano (True/False, con mayuscula)\"",
      solution: "name = \"Ada\"\nage = 36\nheight = 1.68\nis_student = True\n\nprint(type(name))\nprint(type(age))\nprint(type(height))\nprint(type(is_student))",
      explanation: "<p>No declaraste ningún tipo y sin embargo cada variable <em>tiene</em> tipo: lo determinó el valor. <code>\"Ada\"</code> con comillas es <code>str</code>, <code>36</code> sin punto es <code>int</code>, <code>1.68</code> con punto es <code>float</code>, y <code>True</code> (con mayúscula, sin comillas) es <code>bool</code>.</p><p>Detalle fino: <code>True</code> con comillas (<code>\"True\"</code>) sería un string. La diferencia entre el valor y su representación escrita es una de las primeras intuiciones que tenés que construir.</p>",
      hints: ["Los strings van entre comillas; los números no. Un float se distingue de un int por el punto decimal: 7 es int, 7.0 es float.", "Los booleanos en Python son True y False, con la primera letra en mayúscula y sin comillas."]
    },
    {
      id: "bas-var-2",
      title: "El intercambio",
      difficulty: 2,
      prompt: "<p>Tenés dos variables ya definidas: <code>a = 5</code> y <code>b = 3</code>. Intercambiá sus valores <strong>sin escribir los números de vuelta</strong> (imaginate que no sabés qué valores tienen: tu código debería funcionar con cualquier par).</p><p>En muchos lenguajes esto requiere una tercera variable auxiliar. Python tiene una forma más elegante… pero primero intentá como se te ocurra.</p>",
      starter: "a = 5\nb = 3\n\n# Intercambia los valores de a y b aca\n",
      tests: "assert a == 3, f\"a deberia valer 3 despues del intercambio, pero vale {a}\"\nassert b == 5, f\"b deberia valer 5 despues del intercambio, pero vale {b}\"",
      solution: "a = 5\nb = 3\n\na, b = b, a",
      explanation: "<p>La forma clásica usa una variable temporal: <code>temp = a</code>, <code>a = b</code>, <code>b = temp</code>. Funciona, pero Python permite <code>a, b = b, a</code> y vale entender <em>por qué</em> funciona: Python primero evalúa <strong>todo el lado derecho</strong> (crea la tupla <code>(3, 5)</code> con los valores viejos) y recién después asigna al lado izquierdo. Como el lado derecho se evalúa antes de tocar nada, no hay riesgo de pisar un valor antes de usarlo.</p><p>Esto se llama <em>tuple unpacking</em> y lo vas a ver en todos lados en Python real.</p>",
      hints: ["Si hacés a = b primero, perdés el valor original de a. ¿Cómo lo guardás antes de pisarlo?", "Python puede asignar varias variables a la vez: x, y = 1, 2. ¿Y si el lado derecho usa las variables viejas?"]
    },
    {
      id: "bas-var-3",
      title: "Conversión de tipos",
      difficulty: 2,
      prompt: "<p>Te llega un dato desde un formulario web: <code>raw_age = \"25\"</code>. Es un <strong>string</strong>, aunque parezca número.</p><ol><li>Convertilo a entero en una variable <code>age</code>.</li><li>Calculá <code>next_age</code>: la edad del año que viene.</li><li>Armá el string <code>message</code> con el texto exacto: <code>El año que viene tendrás 26</code> (construilo a partir de <code>next_age</code>, no lo escribas a mano).</li></ol>",
      starter: "raw_age = \"25\"\n\n# 1. convertir\n\n# 2. calcular\n\n# 3. armar el mensaje\n",
      tests: "assert isinstance(age, int), \"age tiene que ser un int: usa int() para convertir el string\"\nassert age == 25, f\"age deberia ser 25, es {age}\"\nassert next_age == 26, f\"next_age deberia ser 26, es {next_age}\"\nassert isinstance(message, str), \"message tiene que ser un string\"\nassert message == \"El año que viene tendrás 26\", f\"El mensaje no coincide exactamente. El tuyo: '{message}'\"\nassert \"26\" in message and \"2 6\" not in message, \"El numero tiene que salir de next_age\"",
      solution: "raw_age = \"25\"\n\nage = int(raw_age)\nnext_age = age + 1\nmessage = f\"El año que viene tendrás {next_age}\"",
      explanation: "<p>Este es el flujo más común del mundo real: <strong>los datos llegan como texto</strong> (de un formulario, un archivo, una API) y hay que convertirlos antes de operar. <code>int(\"25\")</code> hace esa conversión explícita; si el string no fuera un número válido, tiraría <code>ValueError</code> — un error ruidoso es mejor que un cálculo silenciosamente mal hecho.</p><p>Para el mensaje, <code>f\"...{next_age}\"</code> (un <em>f-string</em>) convierte el número a texto automáticamente dentro de las llaves. La alternativa <code>\"...\" + str(next_age)</code> también vale, pero el f-string es lo idiomático en Python moderno.</p>",
      hints: ["int(\"25\") convierte el string \"25\" en el número 25. Sin esa conversión, \"25\" + 1 explota.", "Para meter un número dentro de un string: f\"texto {variable}\" o \"texto \" + str(variable)."]
    },
    {
      id: "bas-var-4",
      title: "La cuenta del restaurante",
      difficulty: 3,
      prompt: "<p>Saliste a comer: el plato cuesta <code>price = 12.50</code> y pidieron <code>qty = 3</code> platos. Quieren dejar 10% de propina.</p><p>Calculá:</p><ul><li><code>subtotal</code>: precio por cantidad</li><li><code>tip</code>: el 10% del subtotal</li><li><code>total</code>: subtotal más propina, <strong>redondeado a 2 decimales</strong> con <code>round()</code></li><li><code>per_person</code>: el total dividido entre 3 personas, redondeado a 2 decimales</li></ul>",
      starter: "price = 12.50\nqty = 3\n\n# tu codigo aca\n",
      tests: "assert abs(subtotal - 37.5) < 1e-9, f\"subtotal deberia ser 37.5, es {subtotal}\"\nassert abs(tip - 3.75) < 1e-9, f\"tip deberia ser 3.75, es {tip}\"\nassert abs(total - 41.25) < 1e-9, f\"total deberia ser 41.25, es {total}\"\nassert abs(per_person - 13.75) < 1e-9, f\"per_person deberia ser 13.75, es {per_person}\"",
      solution: "price = 12.50\nqty = 3\n\nsubtotal = price * qty\ntip = subtotal * 0.10\ntotal = round(subtotal + tip, 2)\nper_person = round(total / 3, 2)",
      explanation: "<p>Dos ideas acá. Primera: <strong>nombrar los pasos intermedios</strong>. Podrías escribir todo en una línea gigante, pero <code>subtotal</code>, <code>tip</code>, <code>total</code> hacen que el código se lea como la cuenta misma — el buen código cuenta una historia.</p><p>Segunda: <code>round(x, 2)</code> existe porque los floats tienen precisión limitada (probá <code>0.1 + 0.2</code> en el editor: da <code>0.30000000000000004</code>). Para plata en sistemas reales se usa el tipo <code>Decimal</code>, pero <code>round</code> alcanza por ahora. Por esa misma imprecisión, los tests comparan con <code>abs(a - b) &lt; 0.000000001</code> en vez de <code>==</code>.</p>",
      hints: ["El 10% de algo es ese algo multiplicado por 0.10.", "round(3.14159, 2) devuelve 3.14: el segundo argumento es la cantidad de decimales."]
    },
    {
      id: "bas-var-5",
      title: "Segundos a horas, minutos y segundos",
      difficulty: 4,
      prompt: "<p>Un video dura <code>total_seconds = 7384</code> segundos. Convertí esa duración a formato horas/minutos/segundos:</p><ul><li><code>hours</code>: horas completas</li><li><code>minutes</code>: minutos restantes (0–59)</li><li><code>seconds</code>: segundos restantes (0–59)</li></ul><p>Las herramientas clave son la <strong>división entera</strong> <code>//</code> (cuántas veces entra) y el <strong>módulo</strong> <code>%</code> (cuánto sobra). 7384 segundos son 2 horas, 3 minutos y 4 segundos — pero tu código tiene que calcularlo, no escribirlo.</p>",
      starter: "total_seconds = 7384\n\n# hours = ?\n# minutes = ?\n# seconds = ?\n",
      tests: "assert hours == 2, f\"hours deberia ser 2, es {hours}\"\nassert minutes == 3, f\"minutes deberia ser 3, es {minutes}\"\nassert seconds == 4, f\"seconds deberia ser 4, es {seconds}\"\nassert isinstance(hours, int) and isinstance(minutes, int) and isinstance(seconds, int), \"Los tres valores tienen que ser enteros: usa // en vez de /\"",
      solution: "total_seconds = 7384\n\nhours = total_seconds // 3600\nminutes = (total_seconds % 3600) // 60\nseconds = total_seconds % 60",
      explanation: "<p>El patrón <code>//</code> + <code>%</code> es un clásico que vas a reusar mil veces (paginación, calendarios, monedas). La lógica:</p><p><code>7384 // 3600</code> → ¿cuántas horas <em>completas</em> entran? 2. <br><code>7384 % 3600</code> → ¿qué sobra después de sacar esas horas? 184 segundos. <br><code>184 // 60</code> → ¿cuántos minutos completos hay en lo que sobra? 3. <br><code>7384 % 60</code> → ¿qué sobra al sacar todos los minutos? 4.</p><p>Fijate que <code>seconds</code> se puede calcular directo con <code>% 60</code>: el resto de dividir por 60 ignora automáticamente horas y minutos, porque ambos son múltiplos de 60. Pensar en términos de \"cuántas veces entra\" y \"cuánto sobra\" es más útil que memorizar la fórmula.</p>",
      hints: ["Una hora tiene 3600 segundos. 7384 // 3600 te dice cuántas horas completas hay.", "Después de sacar las horas, te quedan total_seconds % 3600 segundos. ¿Cuántos minutos completos hay ahí adentro?"]
    }
  ]
},

/* ---------------- Strings ---------------- */
{
  id: "strings",
  title: "Strings",
  intro: "Texto: el tipo de dato con el que más vas a pelear en la vida real. Los strings en Python son <strong>inmutables</strong> y vienen con decenas de métodos útiles: <code>.upper()</code>, <code>.strip()</code>, <code>.split()</code>, <em>slicing</em> y los f-strings.",
  socratic: [
    {
      q: "Si hacés <code>s = \"hola\"</code> y después <code>s.upper()</code>, al imprimir <code>s</code> sigue diciendo <code>\"hola\"</code>. ¿Python está roto? ¿Qué está pasando?",
      a: "Los strings son <strong>inmutables</strong>: ningún método puede modificarlos. <code>s.upper()</code> no cambia <code>s</code> — crea y <em>devuelve</em> un string nuevo, que se perdió porque no lo guardaste. La forma correcta: <code>s = s.upper()</code>. Esta confusión causa el 80% de los bugs de principiante con strings."
    },
    {
      q: "¿Por qué la primera letra de un string está en la posición 0 y no en la 1?",
      a: "Porque el índice no es \"el número de la letra\" sino \"a cuánta distancia del inicio está\". La primera letra está a distancia 0. Esta convención hace que mucha aritmética de índices salga naturalmente: el carácter en posición <code>i</code> de un string de largo <code>n</code> existe si <code>0 &lt;= i &lt; n</code>."
    },
    {
      q: "El slice <code>s[1:4]</code> incluye las posiciones 1, 2 y 3… pero NO la 4. ¿Qué ventaja tiene que el final quede afuera?",
      a: "Varias elegancias salen gratis: <code>s[:n]</code> te da exactamente los primeros <code>n</code> caracteres; <code>s[a:b]</code> tiene largo <code>b - a</code>; y <code>s[:k] + s[k:]</code> reconstruye el string completo sin solaparse. Si el final fuera inclusivo, todas esas cuentas tendrían un molesto \"+1\" o \"-1\"."
    },
    {
      q: "¿Qué creés que hace <code>s[::-1]</code>? Desarmalo: el slice completo es <code>[inicio:fin:paso]</code>.",
      a: "Invierte el string. Inicio y fin vacíos significan \"todo\", y el paso <code>-1</code> significa \"recorrelo de atrás hacia adelante\". Es el idiom estándar en Python para dar vuelta un string (o una lista)."
    },
    {
      q: "¿Por qué <code>f\"Hola {name}\"</code> es mejor que <code>\"Hola \" + name</code>?",
      a: "Tres razones: (1) se lee como el texto final, con los huecos marcados; (2) convierte a string automáticamente — con <code>+</code>, si <code>name</code> fuera un número, explota; (3) admite expresiones adentro: <code>f\"total: {price * qty}\"</code>. Desde Python 3.6 es la forma idiomática de formatear."
    }
  ],
  exercises: [
    {
      id: "bas-str-1",
      title: "Saludo con f-string",
      difficulty: 1,
      prompt: "<p>Tenés <code>name = \"Ada\"</code>. Creá la variable <code>greeting</code> con el texto exacto <code>Hola, Ada! Bienvenida al dojo.</code> usando un <strong>f-string</strong> (el nombre tiene que salir de la variable, no escribirse a mano).</p>",
      starter: "name = \"Ada\"\n\n# greeting = ?\n",
      tests: "assert isinstance(greeting, str), \"greeting tiene que ser un string\"\nassert greeting == \"Hola, Ada! Bienvenida al dojo.\", f\"Texto exacto esperado: 'Hola, Ada! Bienvenida al dojo.' — el tuyo: '{greeting}'\"",
      solution: "name = \"Ada\"\n\ngreeting = f\"Hola, {name}! Bienvenida al dojo.\"",
      explanation: "<p>El f-string (la <code>f</code> antes de la comilla) le dice a Python: \"dentro de este texto, todo lo que esté entre llaves es código a evaluar\". <code>{name}</code> se reemplaza por el valor de la variable.</p><p>¿Por qué importa que el nombre salga de la variable? Porque en un programa real <code>name</code> viene de afuera (un usuario, una base de datos) y tu código tiene que funcionar para <em>cualquier</em> nombre. Escribir \"Ada\" a mano funciona hoy y se rompe mañana.</p>",
      hints: ["Un f-string se escribe f\"texto {variable} más texto\". La f va pegada a la comilla de apertura."]
    },
    {
      id: "bas-str-2",
      title: "Limpieza de datos",
      difficulty: 2,
      prompt: "<p>Un usuario escribió su email en un formulario con el dedo dormido: <code>raw = \"   AdA.Lovelace@Mail.COM   \"</code>.</p><p>Creá <code>clean</code> con el email normalizado: <strong>sin espacios</strong> al principio ni al final, y <strong>todo en minúsculas</strong>. Resultado esperado: <code>ada.lovelace@mail.com</code></p>",
      starter: "raw = \"   AdA.Lovelace@Mail.COM   \"\n\n# clean = ?\n",
      tests: "assert clean == \"ada.lovelace@mail.com\", f\"Esperaba 'ada.lovelace@mail.com', recibi '{clean}'\"\nassert raw == \"   AdA.Lovelace@Mail.COM   \", \"No modifiques raw: los strings son inmutables, crea uno nuevo en clean\"",
      solution: "raw = \"   AdA.Lovelace@Mail.COM   \"\n\nclean = raw.strip().lower()",
      explanation: "<p><code>.strip()</code> saca los espacios de las puntas (no los del medio), <code>.lower()</code> pasa todo a minúsculas. Lo interesante es el <strong>encadenamiento</strong>: como <code>raw.strip()</code> devuelve un string nuevo, podés llamarle <code>.lower()</code> directamente al resultado. Se lee de izquierda a derecha como una tubería: texto → sin espacios → minúsculas.</p><p>Normalizar antes de guardar es un hábito profesional: si no lo hacés, <code>\"Ada@mail.com\"</code> y <code>\"ada@mail.com \"</code> parecen dos usuarios distintos en tu base de datos.</p>",
      hints: ["Buscá los métodos .strip() y .lower(). Cada uno devuelve un string nuevo.", "Podés encadenar: raw.metodo1().metodo2() — el segundo se aplica al resultado del primero."]
    },
    {
      id: "bas-str-3",
      title: "Rebanadas (slicing)",
      difficulty: 3,
      prompt: "<p>Con <code>word = \"programacion\"</code>, extraé usando <strong>slicing</strong> (nada de escribir las letras a mano):</p><ul><li><code>first4</code>: los primeros 4 caracteres → <code>prog</code></li><li><code>last4</code>: los últimos 4 → <code>cion</code> (usá índices negativos)</li><li><code>middle</code>: del índice 3 al 6 inclusive → <code>gram</code></li><li><code>reversed_word</code>: la palabra entera al revés</li></ul>",
      starter: "word = \"programacion\"\n\n# first4 = ?\n# last4 = ?\n# middle = ?\n# reversed_word = ?\n",
      tests: "assert first4 == \"prog\", f\"first4: esperaba 'prog', recibi '{first4}'\"\nassert last4 == \"cion\", f\"last4: esperaba 'cion', recibi '{last4}'\"\nassert middle == \"gram\", f\"middle: esperaba 'gram', recibi '{middle}'\"\nassert reversed_word == \"noicamargorp\", f\"reversed_word: esperaba 'noicamargorp', recibi '{reversed_word}'\"",
      solution: "word = \"programacion\"\n\nfirst4 = word[:4]\nlast4 = word[-4:]\nmiddle = word[3:7]\nreversed_word = word[::-1]",
      explanation: "<p>La gramática del slice es <code>[inicio:fin:paso]</code> y el <strong>fin siempre queda afuera</strong>:</p><p><code>word[:4]</code> — \"desde el principio, 4 caracteres\". Inicio omitido = 0.<br><code>word[-4:]</code> — \"desde 4 posiciones antes del final, hasta el final\". Los índices negativos cuentan desde atrás.<br><code>word[3:7]</code> — para incluir el índice 6, el fin tiene que ser 7. Regla mental: el largo del resultado es <code>fin - inicio</code> (7−3 = 4 caracteres).<br><code>word[::-1]</code> — todo, con paso −1: al revés.</p><p>Que el fin quede excluido parece arbitrario hasta que notás que <code>word[:4] + word[4:]</code> reconstruye la palabra exacta, sin solapamientos ni huecos.</p>",
      hints: ["word[a:b] toma desde el índice a hasta el b SIN incluirlo. word[:4] son los primeros 4.", "Los índices negativos cuentan desde el final: word[-1] es la última letra, word[-4:] las últimas cuatro.", "El tercer número del slice es el paso: word[::2] saltea de a dos, word[::-1] va para atrás."]
    },
    {
      id: "bas-str-4",
      title: "split y join",
      difficulty: 3,
      prompt: "<p>Te llega una línea de un archivo CSV: <code>csv_line = \"ana,juan,pedro,lucia\"</code>.</p><ol><li>Creá <code>names</code>: una <strong>lista</strong> con los cuatro nombres separados (usá <code>.split()</code>).</li><li>Creá <code>pretty</code>: un solo string que los una con flechas: <code>ana -&gt; juan -&gt; pedro -&gt; lucia</code> (usá <code>.join()</code>).</li></ol>",
      starter: "csv_line = \"ana,juan,pedro,lucia\"\n\n# names = ?\n# pretty = ?\n",
      tests: "assert names == [\"ana\", \"juan\", \"pedro\", \"lucia\"], f\"names deberia ser la lista de 4 nombres, es {names}\"\nassert pretty == \"ana -> juan -> pedro -> lucia\", f\"pretty no coincide. El tuyo: '{pretty}'\"",
      solution: "csv_line = \"ana,juan,pedro,lucia\"\n\nnames = csv_line.split(\",\")\npretty = \" -> \".join(names)",
      explanation: "<p><code>split</code> y <code>join</code> son operaciones espejo: una corta un string en una lista, la otra pega una lista en un string.</p><p>La sintaxis de <code>join</code> descoloca al principio: el separador va <em>primero</em> — <code>\" -&gt; \".join(names)</code> se lee \"usando esta flecha como pegamento, uní estos nombres\". ¿Por qué está al revés? Porque <code>join</code> es un método del <em>separador</em> (que es un string), y así funciona con cualquier cosa iterable, no solo listas.</p><p>Este par aparece constantemente: parsear CSVs, armar URLs, procesar logs. Vale la pena que te quede en los dedos.</p>",
      hints: ["csv_line.split(\",\") corta el string en cada coma y devuelve una lista.", "join va al revés de lo que esperás: separador.join(lista). El separador acá es \" -> \" con espacios."]
    },
    {
      id: "bas-str-5",
      title: "Contador de vocales",
      difficulty: 4,
      prompt: "<p>Contá cuántas vocales (a, e, i, o, u) tiene la frase <code>phrase = \"La inteligencia artificial aprende de los datos\"</code>, sin distinguir mayúsculas de minúsculas. Guardá el resultado en <code>vowel_count</code>.</p><p>Pista de enfoque: el método <code>.count(x)</code> te dice cuántas veces aparece <code>x</code> en un string. ¿Cómo lo combinás para 5 vocales? ¿Y qué hacés con la <code>L</code> mayúscula del principio?</p>",
      starter: "phrase = \"La inteligencia artificial aprende de los datos\"\n\n# vowel_count = ?\n",
      tests: "assert vowel_count == 20, f\"Hay 20 vocales en la frase, contaste {vowel_count}\"",
      solution: "phrase = \"La inteligencia artificial aprende de los datos\"\n\nlower = phrase.lower()\nvowel_count = (lower.count(\"a\") + lower.count(\"e\") + lower.count(\"i\")\n               + lower.count(\"o\") + lower.count(\"u\"))",
      explanation: "<p>Dos decisiones de diseño acá:</p><p><strong>1. Normalizar primero.</strong> En vez de contar <code>\"a\"</code> y <code>\"A\"</code> por separado (10 counts), bajás todo a minúsculas una sola vez y contás 5. Transformar los datos a una forma canónica <em>antes</em> de procesarlos simplifica todo lo que viene después — este principio escala a sistemas enteros.</p><p><strong>2. Reusar <code>.count()</code>.</strong> Todavía no viste loops; con ellos esto se escribe distinto (y más general). Pero la versión con <code>count</code> es perfectamente legítima y muestra algo importante: muchos problemas se resuelven combinando métodos que ya existen, sin escribir lógica nueva. Cuando llegues a los loops, volvé y reescribilo — comparar ambas versiones te va a enseñar más que cualquiera de las dos por separado.</p>",
      hints: ["phrase.count(\"a\") cuenta las 'a' minúsculas… pero la frase empieza con 'L' mayúscula. ¿Conviene normalizar primero?", "Una suma de cinco .count(), uno por vocal, resuelve el problema."]
    }
  ]
},

/* ---------------- Listas ---------------- */
{
  id: "listas",
  title: "Listas",
  intro: "La estructura de datos más usada de Python: una secuencia <strong>ordenada y mutable</strong>. Acá aparece la diferencia clave con los strings (las listas SÍ se pueden modificar) y la trampa más famosa del lenguaje: el aliasing.",
  socratic: [
    {
      q: "Los strings son inmutables pero las listas no: <code>lst.append(x)</code> modifica la lista de verdad. ¿Por qué creés que Python decidió que las listas sean mutables?",
      a: "Porque su trabajo es distinto. Un string representa un <em>valor</em> (como un número: no \"modificás\" el 5). Una lista representa una <em>colección que evoluciona</em>: un carrito de compras, una cola de tareas. Copiar la lista entera en cada cambio sería carísimo. Mutabilidad = eficiencia + la semántica natural de \"agregar/sacar cosas\"."
    },
    {
      q: "Si <code>a = [1, 2, 3]</code> y luego <code>b = a</code>, y hacés <code>b.append(4)</code>… ¿qué creés que vale <code>a</code>? Pensalo con la metáfora de las etiquetas.",
      a: "<code>a</code> vale <code>[1, 2, 3, 4]</code>. ¡Sorpresa! <code>b = a</code> no copió nada: pegó una segunda etiqueta sobre <strong>la misma lista</strong>. Hay un solo objeto con dos nombres, así que modificar \"por b\" se ve \"por a\". Esto se llama <em>aliasing</em> y es la fuente del bug más desconcertante para quien empieza."
    },
    {
      q: "Entonces, ¿cómo conseguís una copia <em>de verdad</em>, independiente?",
      a: "Pidiéndola explícitamente: <code>b = a.copy()</code>, o <code>b = a[:]</code> (un slice de todo crea lista nueva), o <code>b = list(a)</code>. Las tres crean un objeto nuevo. Ojo: son copias <em>superficiales</em> — si la lista contiene otras listas, las internas siguen compartidas (eso es la copia profunda, <code>deepcopy</code>, tema para más adelante)."
    },
    {
      q: "<code>scores.sort()</code> y <code>sorted(scores)</code> ordenan. ¿Cuál es la diferencia y cuándo importa?",
      a: "<code>.sort()</code> modifica la lista original <em>in place</em> y devuelve <code>None</code> (¡el error clásico es <code>x = lst.sort()</code> y quedarte con None!). <code>sorted()</code> deja la original intacta y devuelve una lista nueva ordenada. Si necesitás conservar el orden original — casi siempre, cuando los datos no son tuyos — usá <code>sorted()</code>."
    },
    {
      q: "¿Por qué <code>lst[len(lst)]</code> tira <code>IndexError</code>?",
      a: "Con 5 elementos, los índices válidos son 0, 1, 2, 3, 4: el último es <code>len - 1</code>, no <code>len</code>. Por eso el idiom para el último elemento es <code>lst[-1]</code>: funciona para cualquier largo y no requiere hacer cuentas."
    }
  ],
  exercises: [
    {
      id: "bas-list-1",
      title: "Lista de tareas",
      difficulty: 1,
      prompt: "<p>Armá tu lista de pendientes:</p><ol><li>Creá <code>tasks</code>: una lista con estos tres strings: <code>\"estudiar python\"</code>, <code>\"hacer ejercicio\"</code>, <code>\"dormir\"</code>.</li><li>Agregá <code>\"repasar el dojo\"</code> al final con <code>.append()</code>.</li><li>Guardá en <code>n_tasks</code> cuántas tareas hay (sin contar a mano: pedíselo a Python).</li></ol>",
      starter: "# 1. crear la lista\n\n# 2. agregar al final\n\n# 3. contar\n",
      tests: "assert tasks == [\"estudiar python\", \"hacer ejercicio\", \"dormir\", \"repasar el dojo\"], f\"La lista no quedo como se esperaba: {tasks}\"\nassert n_tasks == 4, f\"n_tasks deberia ser 4, es {n_tasks}\"",
      solution: "tasks = [\"estudiar python\", \"hacer ejercicio\", \"dormir\"]\ntasks.append(\"repasar el dojo\")\nn_tasks = len(tasks)",
      explanation: "<p>Fijate que <code>append</code> no se asigna: <code>tasks.append(x)</code> modifica la lista en el lugar (compará con los strings, donde <code>s.upper()</code> te obligaba a guardar el resultado). Si escribís <code>tasks = tasks.append(x)</code> te quedás con <code>None</code> — es uno de los errores más comunes del primer mes.</p><p><code>len()</code> es una función, no un método (<code>len(tasks)</code>, no <code>tasks.len()</code>). Funciona sobre cualquier cosa con tamaño: listas, strings, dicts, sets — es de las funciones más usadas del lenguaje.</p>",
      hints: ["Una lista se crea con corchetes: [\"a\", \"b\", \"c\"].", "append se usa así: tasks.append(\"nueva\") — sin asignar el resultado a nada. len(tasks) te da el tamaño."]
    },
    {
      id: "bas-list-2",
      title: "Acceso por índice",
      difficulty: 2,
      prompt: "<p>Con <code>temps = [12, 15, 19, 23, 19, 14]</code> (temperaturas de la semana), extraé:</p><ul><li><code>first</code>: la primera</li><li><code>last</code>: la última, <strong>con índice negativo</strong> (tiene que funcionar aunque la lista cambie de largo)</li><li><code>third</code>: la tercera (¡ojo con el desfase del índice!)</li><li><code>second_to_last</code>: la anteúltima, también con índice negativo</li></ul>",
      starter: "temps = [12, 15, 19, 23, 19, 14]\n\n# first = ?\n# last = ?\n# third = ?\n# second_to_last = ?\n",
      tests: "assert first == 12, f\"first deberia ser 12, es {first}\"\nassert last == 14, f\"last deberia ser 14, es {last}\"\nassert third == 19, f\"third deberia ser 19 (el tercer elemento), es {third}\"\nassert second_to_last == 19, f\"second_to_last deberia ser 19, es {second_to_last}\"",
      solution: "temps = [12, 15, 19, 23, 19, 14]\n\nfirst = temps[0]\nlast = temps[-1]\nthird = temps[2]\nsecond_to_last = temps[-2]",
      explanation: "<p>El desfase clave: <strong>el tercer elemento está en el índice 2</strong>, porque los índices arrancan en 0 (\"a qué distancia del inicio está\").</p><p>¿Por qué insistir con <code>temps[-1]</code> en vez de <code>temps[5]</code>? Porque <code>temps[5]</code> codifica una suposición frágil (\"la lista tiene 6 elementos\") que se rompe en silencio o con <code>IndexError</code> cuando los datos cambian. <code>temps[-1]</code> dice lo que querés decir: \"el último, sea cual sea el largo\". Escribir código que expresa la <em>intención</em> y no la <em>coincidencia</em> es lo que lo hace robusto.</p>",
      hints: ["El primer elemento es lst[0]. ¿En qué índice está el tercero?", "Los negativos cuentan desde el final: lst[-1] es el último, lst[-2] el anteúltimo."]
    },
    {
      id: "bas-list-3",
      title: "Rebanando listas",
      difficulty: 3,
      prompt: "<p>Con <code>nums = [10, 20, 30, 40, 50, 60, 70, 80]</code>, creá usando <strong>slicing</strong>:</p><ul><li><code>first_three</code>: los primeros 3 → <code>[10, 20, 30]</code></li><li><code>last_two</code>: los últimos 2 → <code>[70, 80]</code></li><li><code>middle</code>: del tercero al sexto inclusive → <code>[30, 40, 50, 60]</code></li><li><code>every_other</code>: uno sí, uno no, empezando por el primero → <code>[10, 30, 50, 70]</code></li></ul>",
      starter: "nums = [10, 20, 30, 40, 50, 60, 70, 80]\n\n# first_three = ?\n# last_two = ?\n# middle = ?\n# every_other = ?\n",
      tests: "assert first_three == [10, 20, 30], f\"first_three: {first_three}\"\nassert last_two == [70, 80], f\"last_two: {last_two}\"\nassert middle == [30, 40, 50, 60], f\"middle: {middle}\"\nassert every_other == [10, 30, 50, 70], f\"every_other: {every_other}\"",
      solution: "nums = [10, 20, 30, 40, 50, 60, 70, 80]\n\nfirst_three = nums[:3]\nlast_two = nums[-2:]\nmiddle = nums[2:6]\nevery_other = nums[::2]",
      explanation: "<p>Exactamente la misma gramática que en strings — y esa es la lección de fondo: <strong>el slicing es una idea del lenguaje, no de un tipo</strong>. Todo lo que aprendiste con <code>word[a:b:c]</code> aplica a listas, tuplas y (más adelante) arrays de NumPy, donde se vuelve la herramienta central.</p><p>Detalle importante: cada slice crea una <strong>lista nueva</strong>. Por eso <code>nums[:]</code> es un truco común para copiar una lista entera — es \"un slice de todo\", o sea, una copia.</p>",
      hints: ["Es igual que con strings: nums[:3], nums[-2:], etc.", "\"Del tercero al sexto inclusive\": el tercero está en índice 2, y para incluir el índice 5 el fin debe ser 6.", "El paso va tercero: nums[::2] toma uno de cada dos."]
    },
    {
      id: "bas-list-4",
      title: "Ordenar sin romper",
      difficulty: 3,
      prompt: "<p>Tenés los puntajes de un torneo: <code>scores = [85, 92, 78, 95, 88]</code>. Necesitás analizarlos <strong>sin modificar el orden original</strong> (representa el orden de llegada, ¡es información!).</p><ul><li><code>ranked</code>: los puntajes de mayor a menor (lista nueva)</li><li><code>best</code> y <code>worst</code>: el máximo y el mínimo</li><li><code>average</code>: el promedio</li></ul><p>Los tests verifican que <code>scores</code> quede intacta.</p>",
      starter: "scores = [85, 92, 78, 95, 88]\n\n# ranked = ?\n# best = ?\n# worst = ?\n# average = ?\n",
      tests: "assert scores == [85, 92, 78, 95, 88], \"Modificaste scores! Usa sorted() en vez de .sort() para no tocar la original\"\nassert ranked == [95, 92, 88, 85, 78], f\"ranked deberia ir de mayor a menor: {ranked}\"\nassert best == 95, f\"best: {best}\"\nassert worst == 78, f\"worst: {worst}\"\nassert abs(average - 87.6) < 1e-9, f\"average deberia ser 87.6, es {average}\"",
      solution: "scores = [85, 92, 78, 95, 88]\n\nranked = sorted(scores, reverse=True)\nbest = max(scores)\nworst = min(scores)\naverage = sum(scores) / len(scores)",
      explanation: "<p>La decisión central: <code>sorted(scores, reverse=True)</code> y no <code>scores.sort()</code>. <code>sorted()</code> devuelve una lista nueva y deja la original en paz; <code>.sort()</code> la destruye (reordena in place). Regla práctica: <strong>si los datos no son tuyos o el orden original significa algo, nunca uses .sort()</strong>.</p><p>Para <code>best</code> y <code>worst</code>, <code>max()</code> y <code>min()</code> dicen exactamente lo que hacen — mejor que <code>ranked[0]</code> y <code>ranked[-1]</code>, que funcionan pero obligan al lector a deducir qué significan. Y el promedio es su propia definición: <code>sum / len</code>. Python premia el código que se lee como la idea.</p>",
      hints: ["sorted(lista) devuelve una copia ordenada; .sort() modifica la original. ¿Cuál te pide el problema?", "sorted acepta reverse=True para orden descendente. Y existen max(), min(), sum(), len()."]
    },
    {
      id: "bas-list-5",
      title: "La trampa del alias",
      difficulty: 5,
      prompt: "<p>Este código tiene el bug más famoso de Python. La intención era: <code>backup</code> guarda una copia de seguridad de <code>playlist</code>, y después agregamos una canción solo a <code>playlist</code>. Pero algo sale mal:</p><pre>playlist = [\"song_a\", \"song_b\", \"song_c\"]\nbackup = playlist\nplaylist.append(\"song_d\")\n# backup tambien tiene song_d !!</pre><p><strong>Arreglalo</strong>: al final, <code>playlist</code> debe tener las 4 canciones y <code>backup</code> solo las 3 originales. Antes de tocar nada, ejecutá el código tal cual está y mirá qué pasa con <code>backup</code>.</p>",
      starter: "playlist = [\"song_a\", \"song_b\", \"song_c\"]\nbackup = playlist\nplaylist.append(\"song_d\")\n\nprint(\"playlist:\", playlist)\nprint(\"backup:  \", backup)\n",
      tests: "assert playlist == [\"song_a\", \"song_b\", \"song_c\", \"song_d\"], f\"playlist debe tener las 4 canciones: {playlist}\"\nassert backup == [\"song_a\", \"song_b\", \"song_c\"], f\"backup debe conservar SOLO las 3 originales: {backup}. Pista: backup = playlist no crea una copia…\"\nassert backup is not playlist, \"backup y playlist siguen siendo EL MISMO objeto\"",
      solution: "playlist = [\"song_a\", \"song_b\", \"song_c\"]\nbackup = playlist.copy()      # tambien vale playlist[:] o list(playlist)\nplaylist.append(\"song_d\")\n\nprint(\"playlist:\", playlist)\nprint(\"backup:  \", backup)",
      explanation: "<p><code>backup = playlist</code> <strong>no copia la lista</strong>: pega una segunda etiqueta sobre el mismo objeto. Había una sola lista con dos nombres, así que el <code>append</code> \"les pasó a las dos\" — porque son la misma.</p><p>La salida es pedir una copia explícita: <code>playlist.copy()</code>, <code>playlist[:]</code> o <code>list(playlist)</code> crean un objeto nuevo e independiente.</p><p>¿Cómo verificás si dos nombres apuntan al mismo objeto? Con <code>is</code>: <code>backup is playlist</code> pregunta por <em>identidad</em> (¿mismo objeto?), mientras que <code>==</code> pregunta por <em>igualdad</em> (¿mismo contenido?). Dos listas copiadas son <code>==</code> pero no <code>is</code>. Este modelo mental — nombres que apuntan a objetos — explica la mitad de los comportamientos \"raros\" de Python.</p>",
      hints: ["Ejecutá el código original e imprimí backup. ¿Por qué tiene song_d si nunca le hiciste append?", "backup = playlist no crea una lista nueva: ambos nombres apuntan al mismo objeto. ¿Recordás del modo socrático cómo se pide una copia de verdad?"]
    }
  ]
},

/* ---------------- Tuplas ---------------- */
{
  id: "tuplas",
  title: "Tuplas",
  intro: "Una tupla es una secuencia <strong>inmutable</strong>: como una lista que no se puede modificar. Suena a limitación; en realidad es una <em>garantía</em>. Se usan para registros (un punto, una fecha, un RGB) y para el unpacking que ya viste en el intercambio de variables.",
  socratic: [
    {
      q: "Si ya existen las listas, que hacen todo lo que hacen las tuplas y más… ¿para qué molestarse en tener tuplas?",
      a: "La inmutabilidad es una <strong>garantía</strong>, no una limitación. Si una función devuelve una tupla, nadie puede corromperla por accidente. Convención de uso: la <em>lista</em> es una colección homogénea de largo variable (n canciones); la <em>tupla</em> es un registro heterogéneo de estructura fija (x, y) o (nombre, edad, email) — cada posición tiene un significado."
    },
    {
      q: "¿Qué creés que pasa si ejecutás <code>point = (3, 4)</code> y después <code>point[0] = 99</code>?",
      a: "<code>TypeError: 'tuple' object does not support item assignment</code>. La tupla no se puede modificar: ni cambiar elementos, ni append, ni sort in place. Si necesitás \"modificarla\", el camino es crear una tupla <em>nueva</em> (a veces pasando por una lista intermedia)."
    },
    {
      q: "<code>x, y = point</code> se llama <em>unpacking</em>. ¿Qué tiene que cumplirse para que funcione? ¿Y qué error esperás si no se cumple?",
      a: "La cantidad de nombres a la izquierda debe coincidir con la cantidad de elementos: <code>x, y = (3, 4)</code> , pero <code>x, y = (3, 4, 5)</code> tira <code>ValueError: too many values to unpack</code>. Ese chequeo estricto es una ventaja: detecta al instante datos con forma inesperada."
    },
    {
      q: "Las tuplas pueden ser claves de un diccionario; las listas no. ¿Qué propiedad de la tupla creés que lo hace posible?",
      a: "Su inmutabilidad la hace <em>hashable</em>: como nunca cambia, su \"huella digital\" (hash) es estable y el diccionario puede ubicarla con confianza. Una lista podría mutar después de guardada y su hash quedaría mentiroso — por eso Python directamente lo prohíbe. Ejemplo útil: <code>{(0, 0): \"origen\", (1, 2): \"destino\"}</code> para coordenadas."
    }
  ],
  exercises: [
    {
      id: "bas-tup-1",
      title: "Un punto en el plano",
      difficulty: 1,
      prompt: "<p>Representá el punto (3, 4) del plano:</p><ol><li>Creá la tupla <code>point</code> con los valores 3 y 4.</li><li>Extraé <code>x</code> e <code>y</code> con <strong>unpacking</strong> (en una sola línea, sin índices).</li><li>Calculá <code>distance</code>: la distancia al origen, que es la raíz cuadrada de x² + y² (raíz cuadrada = elevar a <code>0.5</code>).</li></ol>",
      starter: "# 1. point = ?\n\n# 2. unpacking\n\n# 3. distance = ?\n",
      tests: "assert point == (3, 4), f\"point deberia ser (3, 4), es {point}\"\nassert isinstance(point, tuple), \"point tiene que ser una tupla (parentesis), no una lista\"\nassert x == 3 and y == 4, f\"x={x}, y={y} — esperaba x=3, y=4\"\nassert abs(distance - 5.0) < 1e-9, f\"distance deberia ser 5.0, es {distance}\"",
      solution: "point = (3, 4)\nx, y = point\ndistance = (x**2 + y**2) ** 0.5",
      explanation: "<p>¿Por qué tupla y no lista? Porque un punto es un <strong>registro</strong>: tiene exactamente dos componentes y cada posición significa algo (primera = x, segunda = y). No vas a \"agregarle un tercer elemento al punto\" — esa rigidez es deseable y la tupla la expresa.</p><p><code>x, y = point</code> es el mismo unpacking del ejercicio del intercambio. Es más legible que <code>point[0]</code> y <code>point[1]</code>: le pone nombre a cada componente.</p><p>El triángulo 3-4-5 es el clásico de Pitágoras: la distancia da exactamente 5.</p>",
      hints: ["Las tuplas se crean con paréntesis: (3, 4).", "Unpacking: x, y = point asigna los dos valores de una vez. Para la raíz: valor ** 0.5."]
    },
    {
      id: "bas-tup-2",
      title: "Desempacando un color",
      difficulty: 2,
      prompt: "<p>Un color RGB viene como tupla: <code>color = (255, 130, 0)</code> (un naranja).</p><ol><li>Desempacalo en <code>r</code>, <code>g</code>, <code>b</code>.</li><li>Creá <code>brightness</code>: el promedio de los tres canales.</li><li>Creá <code>inverted</code>: la tupla del color invertido, donde cada canal vale <code>255 - original</code> → <code>(0, 125, 255)</code>.</li></ol>",
      starter: "color = (255, 130, 0)\n\n# r, g, b = ?\n# brightness = ?\n# inverted = ?\n",
      tests: "assert (r, g, b) == (255, 130, 0), f\"r={r}, g={g}, b={b}\"\nassert abs(brightness - 128.33333333) < 1e-6, f\"brightness deberia ser ~128.33, es {brightness}\"\nassert inverted == (0, 125, 255), f\"inverted deberia ser (0, 125, 255), es {inverted}\"\nassert isinstance(inverted, tuple), \"inverted tiene que ser una tupla\"",
      solution: "color = (255, 130, 0)\n\nr, g, b = color\nbrightness = (r + g + b) / 3\ninverted = (255 - r, 255 - g, 255 - b)",
      explanation: "<p>Fijate el patrón de trabajo con tuplas: <strong>desempacar → calcular → empacar una tupla nueva</strong>. Como <code>color</code> es inmutable, no \"invertís el color\": construís <em>otro</em> color. Esto, que parece un rodeo, es el estilo que domina en programación funcional y en NumPy: transformar datos creando versiones nuevas en vez de mutar las viejas hace el código mucho más fácil de razonar.</p><p>El unpacking <code>r, g, b = color</code> vuelve a ganarle a los índices: <code>255 - color[1]</code> no dice nada; <code>255 - g</code> dice \"canal verde\".</p>",
      hints: ["Tres variables a la izquierda, la tupla a la derecha: r, g, b = color.", "Para inverted, construí una tupla nueva: (255 - r, 255 - g, 255 - b)."]
    },
    {
      id: "bas-tup-3",
      title: "Tuplas anidadas",
      difficulty: 3,
      prompt: "<p>Un triángulo como tupla de puntos: <code>triangle = ((0, 0), (4, 0), (4, 3))</code>.</p><ul><li><code>vertex_b</code>: el segundo vértice completo → <code>(4, 0)</code></li><li><code>cx</code>: la coordenada x del tercer vértice → <code>4</code> (acceso encadenado, en una expresión)</li><li><code>base</code>: la distancia en x entre el primer y el segundo vértice → <code>4</code></li><li><code>height</code>: la distancia en y entre el segundo y el tercer vértice → <code>3</code></li><li><code>area</code>: base por altura sobre 2 → <code>6.0</code></li></ul>",
      starter: "triangle = ((0, 0), (4, 0), (4, 3))\n\n# vertex_b = ?\n# cx = ?\n# base = ?\n# height = ?\n# area = ?\n",
      tests: "assert vertex_b == (4, 0), f\"vertex_b: {vertex_b}\"\nassert cx == 4, f\"cx: {cx}\"\nassert base == 4, f\"base: {base}\"\nassert height == 3, f\"height: {height}\"\nassert abs(area - 6.0) < 1e-9, f\"area deberia ser 6.0, es {area}\"",
      solution: "triangle = ((0, 0), (4, 0), (4, 3))\n\nvertex_b = triangle[1]\ncx = triangle[2][0]\nbase = triangle[1][0] - triangle[0][0]\nheight = triangle[2][1] - triangle[1][1]\narea = base * height / 2",
      explanation: "<p>La clave está en <code>triangle[2][0]</code>: se lee de izquierda a derecha, paso a paso. <code>triangle[2]</code> devuelve la tupla <code>(4, 3)</code>; a ese resultado le aplicás <code>[0]</code> y obtenés <code>4</code>. No hay magia: es encadenamiento de operaciones, igual que <code>raw.strip().lower()</code>.</p><p>Las estructuras anidadas (tuplas de tuplas, listas de dicts, dicts de listas) son el pan de cada día con datos reales — un JSON de cualquier API es exactamente esto. La habilidad a desarrollar: leer la estructura de adentro hacia afuera y navegar nivel por nivel sin perderte.</p>",
      hints: ["triangle[1] te da el segundo vértice entero, que a su vez es una tupla.", "Podés encadenar índices: triangle[2][0] es \"del tercer elemento, el primero\"."]
    },
    {
      id: "bas-tup-4",
      title: "\"Modificar\" lo inmutable",
      difficulty: 3,
      prompt: "<p>Alguien cargó los meses con un error de tipeo: <code>months = (\"enero\", \"febrero\", \"marso\")</code>. Hay que corregir <code>\"marso\"</code> → <code>\"marzo\"</code>… pero las tuplas no se pueden modificar (probá <code>months[2] = \"marzo\"</code> y mirá el error, en serio, probalo con Ejecutar).</p><p>Creá <code>fixed_months</code>: una <strong>tupla</strong> con los tres meses corregidos, construida a partir de <code>months</code> (la ruta clásica pasa por una lista intermedia: tupla → lista → corregir → tupla).</p>",
      starter: "months = (\"enero\", \"febrero\", \"marso\")\n\n# Proba primero (y despues comenta esta linea):\n# months[2] = \"marzo\"\n\n# fixed_months = ?\n",
      tests: "assert fixed_months == (\"enero\", \"febrero\", \"marzo\"), f\"fixed_months: {fixed_months}\"\nassert isinstance(fixed_months, tuple), \"fixed_months tiene que ser una tupla, no una lista\"\nassert months == (\"enero\", \"febrero\", \"marso\"), \"months (la original) no se puede tocar\"",
      solution: "months = (\"enero\", \"febrero\", \"marso\")\n\ntemp = list(months)      # tupla -> lista (mutable)\ntemp[2] = \"marzo\"        # ahora si se puede corregir\nfixed_months = tuple(temp)  # lista -> tupla de nuevo",
      explanation: "<p>El error que viste — <code>TypeError: 'tuple' object does not support item assignment</code> — es la tupla cumpliendo su promesa de inmutabilidad. No es un capricho: cualquier otra parte del programa que tenga una referencia a <code>months</code> confía en que no va a cambiar.</p><p>El patrón <strong>tupla → lista → modificar → tupla</strong> respeta esa promesa: la original queda intacta y producís una versión corregida <em>nueva</em>. <code>list()</code> y <code>tuple()</code> son conversores entre los dos mundos.</p><p>(Truco alternativo de slicing: <code>fixed_months = months[:2] + (\"marzo\",)</code> — la coma en <code>(\"marzo\",)</code> es obligatoria para que sea tupla de un elemento y no un string entre paréntesis.)</p>",
      hints: ["list(months) te da una lista mutable con los mismos elementos.", "Corregí el elemento en la lista, y al final tuple(la_lista) la convierte de vuelta."]
    },
    {
      id: "bas-tup-5",
      title: "Análisis de temperaturas",
      difficulty: 4,
      prompt: "<p>Sensor de temperatura, lecturas inmutables (los datos históricos no se editan): <code>readings = (18.5, 22.1, 19.8, 22.1, 17.3, 22.1, 20.0)</code>.</p><ul><li><code>hottest</code> y <code>coldest</code>: máxima y mínima</li><li><code>spike_count</code>: cuántas veces aparece la lectura <code>22.1</code> (método de tupla)</li><li><code>first_spike</code>: el índice de la <strong>primera</strong> aparición de <code>22.1</code> (método de tupla)</li><li><code>temp_range</code>: la amplitud térmica (máxima menos mínima), redondeada a 1 decimal</li></ul>",
      starter: "readings = (18.5, 22.1, 19.8, 22.1, 17.3, 22.1, 20.0)\n\n# hottest = ?\n# coldest = ?\n# spike_count = ?\n# first_spike = ?\n# temp_range = ?\n",
      tests: "assert hottest == 22.1, f\"hottest: {hottest}\"\nassert coldest == 17.3, f\"coldest: {coldest}\"\nassert spike_count == 3, f\"spike_count deberia ser 3, es {spike_count}\"\nassert first_spike == 1, f\"first_spike deberia ser 1 (indice de la primera 22.1), es {first_spike}\"\nassert abs(temp_range - 4.8) < 1e-9, f\"temp_range deberia ser 4.8, es {temp_range}\"",
      solution: "readings = (18.5, 22.1, 19.8, 22.1, 17.3, 22.1, 20.0)\n\nhottest = max(readings)\ncoldest = min(readings)\nspike_count = readings.count(22.1)\nfirst_spike = readings.index(22.1)\ntemp_range = round(hottest - coldest, 1)",
      explanation: "<p>Las tuplas tienen exactamente <strong>dos métodos</strong>: <code>.count(x)</code> (cuántas veces aparece) y <code>.index(x)</code> (posición de la primera aparición). Compará con los ~11 métodos de las listas: todos los que faltan (<code>append</code>, <code>sort</code>, <code>remove</code>…) son los que <em>mutan</em>. La interfaz de un tipo te cuenta su filosofía.</p><p>Fijate también que <code>max()</code>, <code>min()</code>, <code>len()</code>, <code>sum()</code> funcionan igual en tuplas que en listas: son funciones sobre \"cualquier secuencia\". Elegir tupla acá comunica algo al lector: estas lecturas son un registro histórico, nadie debería editarlas.</p><p>Detalle de <code>.index()</code>: si el valor no existe, tira <code>ValueError</code> — no devuelve -1 como en otros lenguajes.</p>",
      hints: ["max() y min() funcionan con tuplas igual que con listas.", "Las tuplas tienen .count(valor) y .index(valor) — los únicos dos métodos que necesitás acá."]
    }
  ]
}
]);
