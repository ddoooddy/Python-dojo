/* ============================================================
   CONCEPTOS Y TUTORIALES — nivel Básico
   Escritos asumiendo CERO experiencia previa.
   ============================================================ */

DOJO_EXTEND("basico", "variables", {
  concept: "<p>Un programa es una lista de instrucciones que la computadora ejecuta en orden, de arriba hacia abajo. La instrucción más básica de todas es <code>print()</code>: muestra algo en pantalla.</p><pre>print(\"hola\")</pre><p>Eso, ejecutado, muestra el texto <code>hola</code> en la salida. Las comillas indican que es texto literal.</p><h4>Qué es una variable</h4><p>Una variable es un <strong>nombre que le ponés a un valor</strong> para poder usarlo después. Se crea con el signo <code>=</code>, que acá no significa \"igual\" sino \"guardá esto con este nombre\":</p><pre>age = 30\nprint(age)        # muestra 30\nprint(age + 5)    # muestra 35</pre><p>(Lo que sigue a un <code>#</code> es un comentario: una nota para humanos que Python ignora.)</p><h4>Los cuatro tipos básicos</h4><p>Los valores tienen <em>tipo</em>, y cada tipo sirve para algo distinto:</p><ul><li><code>str</code> (string): <strong>texto</strong>, siempre entre comillas. <code>\"Ana\"</code>, <code>\"hola mundo\"</code>. Para nombres, mensajes, cualquier cosa escrita.</li><li><code>int</code> (integer): <strong>número entero</strong>, sin comillas. <code>30</code>, <code>-5</code>. Para contar y calcular.</li><li><code>float</code>: <strong>número con decimales</strong>, con punto. <code>1.75</code>, <code>19.99</code>. Para medidas, precios, promedios.</li><li><code>bool</code> (booleano): un valor que solo puede ser <strong><code>True</code> (verdadero) o <code>False</code> (falso)</strong>, con mayúscula inicial y sin comillas. Sirve para responder preguntas de sí o no: ¿el usuario está logueado? ¿la luz está prendida? Más adelante vas a ver que los programas <em>deciden</em> qué hacer mirando booleanos.</li></ul><pre>name = \"Ana\"          # str: texto\nage = 30              # int: entero\nheight = 1.75         # float: con decimales\nis_student = True     # bool: verdadero o falso</pre><h4>Cómo saber el tipo de algo</h4><p>La función <code>type()</code> te lo dice:</p><pre>print(type(\"Ana\"))   # &lt;class 'str'&gt;\nprint(type(30))      # &lt;class 'int'&gt;\nprint(type(True))    # &lt;class 'bool'&gt;</pre><p>Ojo con la trampa clásica: <code>\"30\"</code> con comillas es texto (str), no un número. Y <code>\"True\"</code> con comillas es texto, no un booleano.</p>",
  tutorial: [
    {
      text: "<p>Empecemos por la instrucción más básica que existe: mostrar algo en pantalla. <code>print()</code> recibe lo que quieras mostrar entre los paréntesis.</p>",
      code: "print(\"hola, dojo\")\nprint(123)",
      note: "Salieron dos líneas: el texto (que escribiste entre comillas) y el número (sin comillas). Cada print produce una línea de salida. Probá cambiar el texto o el número y ejecutá de nuevo."
    },
    {
      text: "<p>Ahora creemos una <strong>variable</strong>: un nombre para un valor. El <code>=</code> guarda; después usás el nombre donde quieras.</p>",
      code: "name = \"Ana\"\nprint(name)\nprint(name)\nprint(name)",
      note: "Definiste el valor UNA vez y lo usaste tres veces por su nombre. Si cambiás la primera línea por otro nombre y ejecutás, las tres líneas cambian juntas: esa es la gracia de las variables. Ojo: print(name) sin comillas muestra el VALOR de la variable; print(\"name\") con comillas mostraría la palabra name literal."
    },
    {
      text: "<p>Los números no llevan comillas y se puede calcular con ellos: <code>+</code>, <code>-</code>, <code>*</code> (por), <code>/</code> (dividido).</p>",
      code: "age = 30\nprint(age + 5)\nprint(age * 2)\nprint(age / 4)",
      note: "Mirá la última línea: dio 7.5, un número con decimales (float). La división con / siempre da float en Python, aunque sea exacta. Probá: ¿qué pasa si escribís age = \"30\" con comillas y ejecutás? El error que vas a ver (no se puede sumar texto con número) es uno de los más comunes del mundo real."
    },
    {
      text: "<p>El último tipo: el <strong>booleano</strong>, que solo puede valer <code>True</code> o <code>False</code>. Aparece cuando hacés una pregunta con <code>&gt;</code>, <code>&lt;</code> o <code>==</code> (¿es igual?).</p>",
      code: "age = 30\nprint(age > 18)\nprint(age == 50)\nprint(type(age > 18))",
      note: "age > 18 es una PREGUNTA y su respuesta es un valor: True. age == 50 pregunta si age es exactamente 50: False. Estos True/False son booleanos (mirá el type), y son el combustible de las decisiones que los programas van a tomar en el tema Condicionales. Por ahora, quedate con esto: una comparación produce un bool."
    }
  ]
});

DOJO_EXTEND("basico", "strings", {
  concept: "<p>Un <strong>string</strong> es texto: cualquier secuencia de caracteres entre comillas. <code>\"hola\"</code>, <code>\"Ana123\"</code>, <code>\"\"</code> (texto vacío). Es el tipo con el que más se trabaja en la práctica: nombres, mensajes, archivos, datos que llegan de internet — todo empieza siendo texto.</p><h4>Unir y armar textos</h4><p>Dos formas. Con <code>+</code> (pega strings entre sí), y con <strong>f-strings</strong>, la forma moderna: escribís una <code>f</code> antes de las comillas y adentro ponés variables entre llaves:</p><pre>name = \"Ana\"\nprint(\"Hola \" + name)        # con +\nprint(f\"Hola {name}, bienvenida\")  # con f-string</pre><h4>Los métodos: el punto después del valor</h4><p>Los strings traen herramientas incorporadas llamadas <em>métodos</em>, que se usan con un punto: <code>valor.metodo()</code>. Los más usados:</p><pre>s = \"  Hola Mundo  \"\nprint(s.upper())    # \"  HOLA MUNDO  \"  (mayúsculas)\nprint(s.lower())    # \"  hola mundo  \"  (minúsculas)\nprint(s.strip())    # \"Hola Mundo\"      (sin espacios en las puntas)</pre><p>Importante: el método <strong>no modifica</strong> el string original — devuelve uno nuevo. Si querés conservar el resultado, guardalo: <code>s = s.strip()</code>.</p><h4>Largo y posiciones</h4><p><code>len(s)</code> te dice cuántos caracteres tiene. Y podés acceder a cada carácter por su posición con corchetes — <strong>contando desde 0</strong>:</p><pre>word = \"python\"\nprint(len(word))    # 6\nprint(word[0])      # \"p\"  (el primero está en la posición 0)\nprint(word[1])      # \"y\"\nprint(word[-1])     # \"n\"  (negativo = desde el final)</pre><p>Que la primera letra sea la posición 0 confunde al principio; pensalo como \"a cuántos pasos del inicio está\". Esto mismo va a aplicar a las listas.</p>",
  tutorial: [
    {
      text: "<p>Probá las dos formas de armar un mensaje con una variable adentro: la suma con <code>+</code> y el f-string con llaves.</p>",
      code: "name = \"Ana\"\nprint(\"Hola \" + name)\nprint(f\"Hola {name}, bienvenida al dojo\")",
      note: "Las dos funcionan, pero mirá el f-string: se lee casi como el mensaje final, con el hueco marcado entre llaves. La f antes de las comillas es lo que activa las llaves; sin ella, {name} saldría literal. Probá sacar la f y ejecutar para verlo."
    },
    {
      text: "<p>Ahora los métodos: las herramientas que vienen con cada string, usadas con punto.</p>",
      code: "s = \"  python ES genial  \"\nprint(s.upper())\nprint(s.lower())\nprint(s.strip())\nprint(s)",
      note: "El último print muestra el string ORIGINAL, intacto, con sus espacios y mezcla de mayúsculas: los métodos no lo tocaron, devolvieron versiones nuevas. Si quisieras quedarte con la versión limpia: s = s.strip().lower() — encadenando métodos, el segundo se aplica al resultado del primero."
    },
    {
      text: "<p>Posiciones: cada carácter tiene un número, empezando por 0. Los negativos cuentan desde el final.</p>",
      code: "word = \"python\"\nprint(len(word))\nprint(word[0])\nprint(word[2])\nprint(word[-1])",
      note: "len dio 6 caracteres, pero la última posición válida es 5 (porque se cuenta desde 0). word[-1] es el truco para \"el último, mida lo que mida\". Probá word[10] y mirá el error IndexError: pedir una posición que no existe es un error clásico, mejor conocerlo de entrada."
    }
  ]
});

DOJO_EXTEND("basico", "listas", {
  concept: "<p>Una <strong>lista</strong> es una colección ordenada de valores bajo un solo nombre. Sin listas, para guardar 5 tareas necesitarías 5 variables; con listas, una sola:</p><pre>tasks = [\"estudiar\", \"entrenar\", \"dormir\"]\nnums = [10, 20, 30, 40]\nempty = []</pre><p>Se escriben entre <strong>corchetes</strong>, con los elementos separados por comas. Pueden tener cualquier tipo adentro (y mezclar, aunque no suele ser buena idea).</p><h4>Acceder: igual que en strings</h4><p>Cada elemento tiene su posición, desde 0. Los negativos cuentan desde el final:</p><pre>print(tasks[0])    # \"estudiar\"\nprint(tasks[-1])   # \"dormir\"\nprint(len(tasks))  # 3</pre><h4>La gran diferencia con los strings: se pueden modificar</h4><p>Las listas son <em>mutables</em>: podés agregar, cambiar y sacar elementos. Las operaciones más comunes:</p><pre>tasks.append(\"leer\")     # agrega al final\ntasks[0] = \"repasar\"     # reemplaza el primero\nprint(tasks)             # ['repasar', 'entrenar', 'dormir', 'leer']</pre><p>Fijate que <code>append</code> no necesita <code>=</code>: modifica la lista directamente, \"en el lugar\". Es distinto de los métodos de strings, que devolvían una copia. Esta diferencia (modificar vs devolver nuevo) va a aparecer una y otra vez en Python.</p><h4>Funciones útiles con listas de números</h4><pre>nums = [10, 20, 30, 40]\nprint(sum(nums))   # 100  (suma todo)\nprint(max(nums))   # 40   (el mayor)\nprint(min(nums))   # 10   (el menor)</pre>",
  tutorial: [
    {
      text: "<p>Creá tu primera lista y mirá cómo se imprime entera.</p>",
      code: "tasks = [\"estudiar\", \"entrenar\", \"dormir\"]\nprint(tasks)\nprint(len(tasks))",
      note: "print con la lista entera la muestra con corchetes y comillas, tal como se escribe en código. len cuenta los elementos (3), no las letras. Una lista es UN valor que contiene varios."
    },
    {
      text: "<p>Accedé a elementos individuales por posición, desde 0, como con las letras de un string.</p>",
      code: "tasks = [\"estudiar\", \"entrenar\", \"dormir\"]\nprint(tasks[0])\nprint(tasks[1])\nprint(tasks[-1])",
      note: "Posición 0 = el primero, -1 = el último. La misma regla de los strings: la posición es \"a cuántos pasos del inicio\". Probá tasks[5] para ver el IndexError de pedir algo que no está."
    },
    {
      text: "<p>Ahora lo nuevo: modificarla. <code>append</code> agrega al final, y la asignación con corchetes reemplaza.</p>",
      code: "tasks = [\"estudiar\", \"entrenar\", \"dormir\"]\ntasks.append(\"leer\")\nprint(tasks)\ntasks[0] = \"repasar python\"\nprint(tasks)",
      note: "La lista cambió DE VERDAD las dos veces: append le sumó un cuarto elemento y la asignación pisó el primero. Notá que en ningún momento escribiste tasks = ... después de la primera línea: las listas se modifican en el lugar. (Curiosidad para más adelante: tasks = tasks.append(x) es un error clásico — append no devuelve la lista.)"
    }
  ]
});

DOJO_EXTEND("basico", "tuplas", {
  concept: "<p>Una <strong>tupla</strong> es como una lista, pero <strong>inmutable</strong>: una vez creada, no se puede modificar — ni agregar, ni cambiar, ni sacar. Se escribe con <strong>paréntesis</strong>:</p><pre>point = (3, 4)\nrgb = (255, 130, 0)</pre><h4>¿Y para qué quiero algo que no puedo modificar?</h4><p>Para representar cosas cuya estructura es fija. Un punto del plano SIEMPRE tiene dos coordenadas; un color RGB siempre tres canales. La tupla expresa eso: \"esto es un paquete cerrado de N valores, cada posición significa algo\". Además, ser inmutable es una <em>garantía</em>: cualquier parte del programa puede confiar en que nadie la cambió.</p><p>Regla mental: <strong>lista</strong> = colección de cosas parecidas que crece y cambia (canciones, tareas). <strong>Tupla</strong> = registro fijo donde cada posición tiene su rol (x e y, día-mes-año).</p><h4>Leerlas: igual que las listas</h4><pre>point = (3, 4)\nprint(point[0])    # 3\nprint(point[1])    # 4</pre><p>Pero si intentás <code>point[0] = 99</code>, Python tira un error (<code>TypeError</code>): la tupla cumple su promesa.</p><h4>Unpacking: la joya de las tuplas</h4><p>Podés \"desempacar\" una tupla en varias variables de una sola vez:</p><pre>point = (3, 4)\nx, y = point\nprint(x)    # 3\nprint(y)    # 4</pre><p>Se lee: \"poné el primer valor en x y el segundo en y\". Es muchísimo más claro que andar escribiendo <code>point[0]</code> y <code>point[1]</code> por todos lados, y lo vas a usar constantemente.</p>",
  tutorial: [
    {
      text: "<p>Creá una tupla y leé sus valores. Hasta acá, se siente igual que una lista.</p>",
      code: "point = (3, 4)\nprint(point)\nprint(point[0])\nprint(point[1])",
      note: "Paréntesis en vez de corchetes, mismo acceso por posición. La diferencia todavía no se ve... viene en el paso siguiente."
    },
    {
      text: "<p>Ahora intentá modificarla. Esto VA a fallar — y el objetivo es que veas el error con tus propios ojos.</p>",
      code: "point = (3, 4)\npoint[0] = 99",
      note: "TypeError: 'tuple' object does not support item assignment — la tupla no acepta cambios, ese es su contrato. Los errores con nombre (TypeError, IndexError...) no son castigos: son Python explicándote qué regla se rompió. Leerlos sin miedo es una habilidad que vale oro."
    },
    {
      text: "<p>El truco estrella: <strong>unpacking</strong>. Abrí la tupla en dos variables de un solo golpe.</p>",
      code: "point = (3, 4)\nx, y = point\nprint(f\"x vale {x}\")\nprint(f\"y vale {y}\")",
      note: "Una línea, dos asignaciones: x recibió el primer valor e y el segundo. Tiene que coincidir la cantidad (probá x, y, z = point y mirá el ValueError). Este gesto aparece por todo Python real: funciones que devuelven varios valores, recorrer pares, intercambiar variables."
    }
  ]
});

DOJO_EXTEND("basico", "dicts", {
  concept: "<p>Un <strong>diccionario</strong> (<code>dict</code>) guarda pares <strong>clave → valor</strong>, como una agenda: buscás por nombre (la clave) y obtenés el dato (el valor). Se escribe con llaves:</p><pre>person = {\"name\": \"Grace\", \"age\": 36, \"city\": \"Rosario\"}</pre><p>Compará con una lista: en la lista accedés por <em>posición</em> (<code>[0]</code>, que no significa nada por sí misma); en el dict accedés por <em>nombre</em>, que documenta qué estás pidiendo:</p><pre>print(person[\"name\"])   # \"Grace\"\nprint(person[\"age\"])    # 36</pre><h4>Agregar y modificar</h4><p>La misma sintaxis de corchetes escribe: si la clave no existía la crea, y si existía la pisa:</p><pre>person[\"email\"] = \"grace@dev.com\"   # nueva clave\nperson[\"age\"] = 37                   # modifica la existente</pre><h4>Claves que pueden no estar</h4><p>Pedir una clave inexistente con corchetes da error (<code>KeyError</code>). Cuando no estás seguro, tenés dos herramientas:</p><pre>print(\"email\" in person)          # True/False: ¿existe la clave?\nprint(person.get(\"phone\", \"-\"))   # el valor, o \"-\" si no está</pre><h4>Sets: colecciones sin repetidos</h4><p>Un <strong>set</strong> es una bolsa de valores únicos, sin orden. Su superpoder: eliminar duplicados y comparar grupos:</p><pre>emails = [\"a@x.com\", \"b@x.com\", \"a@x.com\"]\nunique = set(emails)        # {'a@x.com', 'b@x.com'} — el duplicado desapareció\n\nteam_a = {\"ana\", \"beto\"}\nteam_b = {\"beto\", \"carla\"}\nprint(team_a & team_b)      # {'beto'}: en AMBOS equipos (intersección)\nprint(team_a | team_b)      # los tres, sin repetir (unión)</pre>",
  tutorial: [
    {
      text: "<p>Creá un diccionario y leé valores por su clave. Fijate cómo el nombre de la clave hace que el código se explique solo.</p>",
      code: "person = {\"name\": \"Grace\", \"age\": 36}\nprint(person[\"name\"])\nprint(person[\"age\"])\nprint(person)",
      note: "person[\"name\"] se lee \"el name de person\" — compará con una lista, donde sería person[0] y tendrías que recordar qué había en la posición 0. Esa legibilidad es la razón de ser del dict."
    },
    {
      text: "<p>Agregá una clave nueva y pisá una existente: misma sintaxis para ambas.</p>",
      code: "person = {\"name\": \"Grace\", \"age\": 36}\nperson[\"city\"] = \"Rosario\"\nperson[\"age\"] = 37\nprint(person)",
      note: "El dict ahora tiene tres claves, y age cambió a 37. Los dicts son mutables como las listas: se modifican en el lugar. Probá ahora pedir una clave que no existe — print(person[\"email\"]) — y mirá el KeyError: así avisa Python que pediste algo que no está."
    },
    {
      text: "<p>Sets: pasale una lista con repetidos a <code>set()</code> y mirá qué pasa.</p>",
      code: "votes = [\"ana\", \"beto\", \"ana\", \"carla\", \"beto\", \"ana\"]\nunique_voters = set(votes)\nprint(unique_voters)\nprint(len(votes), \"votos de\", len(unique_voters), \"personas\")",
      note: "Los duplicados se evaporaron: el set garantiza valores únicos. Detalle: el orden en que se imprimen puede no ser el original — los sets no tienen orden, a cambio de responder \"¿está o no está?\" a velocidad instantánea. Deduplicar con set(lista) es uno de los trucos más usados de Python."
    }
  ]
});

DOJO_EXTEND("basico", "condicionales", {
  concept: "<p>Hasta ahora tus programas ejecutan TODAS las líneas, siempre, en orden. Los <strong>condicionales</strong> les dan la capacidad de <strong>decidir</strong>: ejecutar unas líneas u otras según una condición.</p><h4>La anatomía del if</h4><pre>age = 20\n\nif age >= 18:\n    print(\"puede entrar\")\nelse:\n    print(\"no puede entrar\")</pre><p>Piezas clave:</p><ul><li>La <strong>condición</strong> (<code>age &gt;= 18</code>) es una pregunta que produce un booleano — los <code>True</code>/<code>False</code> del primer tema, acá está su propósito.</li><li>Los <strong>dos puntos</strong> al final de la línea del if (y del else) son obligatorios.</li><li>La <strong>indentación</strong> (los 4 espacios) no es decorativa: es como Python sabe qué líneas están \"adentro\" del if. Todo lo indentado se ejecuta solo si la condición es verdadera.</li></ul><h4>Los comparadores</h4><pre>==   ¿es igual?       (OJO: dos signos. Uno solo asigna)\n!=   ¿es distinto?\n&gt;    mayor      &gt;=   mayor o igual\n&lt;    menor      &lt;=   menor o igual</pre><p>El error más clásico del primer mes: escribir <code>if x = 5</code> (asignación) en vez de <code>if x == 5</code> (pregunta). Python lo rechaza con un error de sintaxis.</p><h4>Más de dos caminos: elif</h4><pre>if score >= 90:\n    grade = \"A\"\nelif score >= 80:      # \"si no, ¿y esto?\"\n    grade = \"B\"\nelse:                  # \"si nada de lo anterior\"\n    grade = \"C\"</pre><p>Python evalúa de arriba hacia abajo y entra en la PRIMERA condición verdadera; el resto se ignora. Por eso el orden importa.</p><h4>Combinar condiciones</h4><pre>if age >= 18 and country == \"AR\":   # ambas deben cumplirse\nif day == \"sab\" or day == \"dom\":     # alcanza con una\nif not is_blocked:                    # invierte: si NO está bloqueado</pre>",
  tutorial: [
    {
      text: "<p>Tu primer if. Ejecutalo tal cual, y después cambiá <code>age</code> a 15 y ejecutá de nuevo: mirá qué línea sale y cuál no.</p>",
      code: "age = 20\n\nif age >= 18:\n    print(\"mayor de edad\")\nelse:\n    print(\"menor de edad\")\n\nprint(\"esto sale siempre\")",
      note: "Con 20 entró por el if; con 15 habría entrado por el else — UNA de las dos ramas corre, nunca ambas. La última línea, sin indentación, está FUERA del condicional: corre siempre. La indentación define qué pertenece a qué: es la gramática de Python."
    },
    {
      text: "<p>Cadena con <code>elif</code>: varios casos en orden. Probá con distintos valores de <code>score</code>: 95, 85, 40.</p>",
      code: "score = 85\n\nif score >= 90:\n    print(\"A: excelente\")\nelif score >= 80:\n    print(\"B: muy bien\")\nelif score >= 60:\n    print(\"C: aprobado\")\nelse:\n    print(\"F: a repasar\")",
      note: "Con 85: la primera condición (>= 90) falló, la segunda (>= 80) acertó, y ahí TERMINÓ — las demás ni se miraron. Por eso 85 no imprime también \"C\" aunque 85 >= 60 sea cierto: en una cadena if/elif entra exactamente una rama, la primera que dé True."
    },
    {
      text: "<p>Condiciones combinadas con <code>and</code> y <code>or</code>. Jugá con los valores hasta lograr que cada print salga.</p>",
      code: "age = 25\nhas_ticket = True\n\nif age >= 18 and has_ticket:\n    print(\"puede pasar al recital\")\n\nday = \"dom\"\nif day == \"sab\" or day == \"dom\":\n    print(\"es fin de semana\")",
      note: "and exige que AMBAS condiciones sean verdaderas (probá has_ticket = False y mirá cómo el primer print desaparece); or se conforma con una. Fijate también que has_ticket ya ES un booleano, así que se usa directo en el if, sin comparar con nada — \"if has_ticket\" se lee como castellano."
    }
  ]
});

DOJO_EXTEND("basico", "loops", {
  concept: "<p>Un <strong>loop</strong> (bucle) repite un bloque de código sin que tengas que copiarlo y pegarlo. Hay dos, y la diferencia es qué saben de antemano.</p><h4>for: repetir sobre una colección conocida</h4><p>El <code>for</code> recorre algo (una lista, un texto, un rango de números) y ejecuta el bloque indentado una vez <strong>por cada elemento</strong>:</p><pre>tasks = [\"estudiar\", \"entrenar\", \"dormir\"]\nfor task in tasks:\n    print(f\"pendiente: {task}\")</pre><p>En cada vuelta, la variable <code>task</code> ES el elemento de turno: primera vuelta \"estudiar\", segunda \"entrenar\", tercera \"dormir\". Vos elegís el nombre.</p><p>Para repetir N veces o recorrer números, está <code>range()</code>:</p><pre>for n in range(5):        # 0, 1, 2, 3, 4  (el 5 queda afuera)\n    print(n)\nfor n in range(1, 4):     # 1, 2, 3</pre><h4>while: repetir hasta que algo cambie</h4><p>El <code>while</code> repite <em>mientras</em> su condición sea verdadera — útil cuando no sabés cuántas vueltas harán falta:</p><pre>energy = 3\nwhile energy > 0:\n    print(f\"quedan {energy} intentos\")\n    energy = energy - 1</pre><p>Cuidado: si el bloque nunca hace que la condición se vuelva falsa, el loop no termina jamás (y en esta herramienta, congela la pestaña — si te pasa, recargá la página: tu progreso está a salvo).</p><h4>El patrón acumulador</h4><p>El uso más importante de los loops: ir juntando un resultado vuelta a vuelta. La variable acumuladora nace ANTES del loop y se actualiza adentro:</p><pre>total = 0\nfor price in [120, 80, 45]:\n    total = total + price\nprint(total)    # 245</pre><p>Sumar, contar, buscar el máximo: todos son variantes de este patrón. Va a estar en el 80% de los programas que escribas.</p>",
  tutorial: [
    {
      text: "<p>Tu primer for: una vuelta por cada elemento de la lista. Antes de ejecutar, predecí cuántas líneas van a salir.</p>",
      code: "animals = [\"gato\", \"perro\", \"pez\"]\nfor animal in animals:\n    print(f\"un {animal}\")\n\nprint(\"fin del loop\")",
      note: "Tres elementos, tres vueltas, tres líneas — y la del final, sin indentar, salió una sola vez porque está FUERA del loop. La variable animal fue tomando cada valor por turno. Agregale un cuarto animal a la lista y ejecutá: el loop se adapta solo, sin tocar nada más."
    },
    {
      text: "<p><code>range()</code> genera números para repetir N veces. Ojo con dónde termina.</p>",
      code: "for n in range(5):\n    print(n)\n\nprint(\"---\")\n\nfor n in range(1, 6):\n    print(n)",
      note: "range(5) dio 0,1,2,3,4 — empieza en 0 y el 5 queda AFUERA (son 5 números igual). range(1, 6) dio 1 a 5: el inicio entra, el fin no. Esta regla de \"el final queda afuera\" es universal en Python; equivocarse por uno acá es el error más cometido de la historia de la programación."
    },
    {
      text: "<p>El patrón acumulador: una variable que junta el resultado a través de las vueltas.</p>",
      code: "prices = [120, 80, 45, 200]\n\ntotal = 0\nfor price in prices:\n    total = total + price\n    print(f\"despues de sumar {price}, llevo {total}\")\n\nprint(f\"TOTAL: {total}\")",
      note: "Mirá la película en la salida: total arrancó en 0 y fue creciendo vuelta a vuelta — 120, 200, 245, 445. La clave es que total = 0 está ANTES del loop (si estuviera adentro, se reiniciaría en cada vuelta; probalo, es revelador). total = total + price también se escribe total += price."
    },
    {
      text: "<p>El <code>while</code>: repite mientras la condición sea verdadera. Esencial que algo cambie adentro.</p>",
      code: "countdown = 5\nwhile countdown > 0:\n    print(countdown)\n    countdown = countdown - 1\n\nprint(\"despegue\")",
      note: "Cada vuelta imprimió y descontó; cuando countdown llegó a 0, la condición countdown > 0 dio False y el loop terminó. La línea que descuenta es VITAL: sin ella la condición sería verdadera para siempre (loop infinito, pestaña congelada — no lo pruebes acá). Regla: todo while necesita que su cuerpo lo acerque al final."
    }
  ]
});

DOJO_EXTEND("basico", "funciones", {
  concept: "<p>Una <strong>función</strong> es un bloque de código con nombre, que recibe datos, hace su trabajo y devuelve un resultado. Es la herramienta más importante de la programación: escribís la lógica UNA vez y la usás mil veces.</p><h4>Anatomía</h4><pre>def greet(name):                  # def + nombre + parámetros\n    return f\"Hola, {name}\"        # return = el resultado que entrega\n\nmessage = greet(\"Ana\")            # llamarla: el resultado queda en message\nprint(message)                    # Hola, Ana\nprint(greet(\"Luis\"))              # Hola, Luis — misma máquina, otro dato</pre><ul><li><code>def</code> DEFINE la función (la máquina queda lista, pero no corre todavía).</li><li><code>name</code> es un <strong>parámetro</strong>: el hueco donde entra el dato. Al llamar <code>greet(\"Ana\")</code>, name vale \"Ana\" durante esa ejecución.</li><li><code>return</code> ENTREGA el resultado a quien llamó, y termina la función ahí mismo.</li></ul><h4>return no es print — la confusión número 1</h4><p><code>print</code> solo MUESTRA en pantalla; <code>return</code> ENTREGA el valor para que el programa lo use: guardarlo, compararlo, pasárselo a otra función. Una función que imprime en vez de retornar es un callejón sin salida — su resultado se ve pero no se puede usar:</p><pre>def double_bad(n):\n    print(n * 2)        # muestra... y no entrega nada\n\ndef double_good(n):\n    return n * 2        # entrega\n\nx = double_bad(5)       # x quedó en None (= \"nada\")\ny = double_good(5)      # y vale 10, usable: y + 1, etc.</pre><h4>Varios parámetros y valores por defecto</h4><pre>def power(base, exp=2):     # exp tiene default: si no lo pasan, vale 2\n    return base ** exp\n\nprint(power(5))       # 25  (usó el default)\nprint(power(2, 10))   # 1024</pre>",
  tutorial: [
    {
      text: "<p>Definí una función y llamala varias veces con datos distintos. Fijate que el <code>def</code> solo la PREPARA: nada corre hasta que la llamás.</p>",
      code: "def greet(name):\n    return f\"Hola, {name}!\"\n\nprint(greet(\"Ana\"))\nprint(greet(\"Luis\"))\nprint(greet(\"Grace\"))",
      note: "Una sola definición, tres usos con resultados distintos: eso es una función — lógica escrita una vez, aplicada a cualquier dato. El parámetro name fue tomando cada valor. Si copiar/pegar código te parecía normal hasta hoy, esto es lo que lo reemplaza."
    },
    {
      text: "<p>El experimento más importante del tema: <code>return</code> vs <code>print</code>. Ejecutá y mirá con atención qué vale cada variable.</p>",
      code: "def double_with_print(n):\n    print(n * 2)\n\ndef double_with_return(n):\n    return n * 2\n\na = double_with_print(5)\nb = double_with_return(5)\n\nprint(f\"a vale: {a}\")\nprint(f\"b vale: {b}\")\nprint(f\"b + 1 vale: {b + 1}\")",
      note: "El 10 de la primera línea lo imprimió la función... pero a quedó en None (\"nada\"): print muestra y descarta. En cambio b vale 10 de verdad — usable, sumable, comparable. Cuando una variable tuya valga None misteriosamente, 9 de cada 10 veces es una función que imprime en vez de retornar."
    },
    {
      text: "<p>Parámetros con valor por defecto: el caso común corto, el caso especial posible.</p>",
      code: "def power(base, exp=2):\n    return base ** exp\n\nprint(power(5))\nprint(power(5, 3))\nprint(power(2, 10))",
      note: "power(5) usó exp=2 (el default: elevar al cuadrado); las otras llamadas lo pisaron. Así se diseñan funciones cómodas: lo frecuente sin esfuerzo, lo especial disponible. Lo viste en round(x) vs round(x, 2) — ahora sabés cómo se construye."
    }
  ]
});

DOJO_EXTEND("basico", "proyecto-basico", {
  concept: "<p>Un proyecto no es un ejercicio más largo: es la primera vez que las piezas trabajan <strong>juntas</strong>. Vas a usar listas de tuplas (los gastos), loops con acumulador (sumar), dicts (agrupar por categoría), condicionales (filtrar) y funciones (organizar todo).</p><h4>Cómo encararlo</h4><ul><li><strong>Una función a la vez</strong>, en el orden en que están: la primera es la más fácil. No intentes resolver todo de un tirón.</li><li><strong>Ejecutá seguido</strong>: el starter trae prints de prueba — usalos después de cada función para ver qué va saliendo.</li><li><strong>Trabado en una función</strong>: identificá QUÉ pieza te falta (¿el loop? ¿el dict?) y volvé al Concepto de ese tema. Releer con un problema en la cabeza enseña el doble.</li><li>Verificá recién cuando las cuatro funciones te den resultados que parezcan razonables.</li></ul><p>Si te toma más de una sesión, es normal: los proyectos están para eso.</p>"
});
