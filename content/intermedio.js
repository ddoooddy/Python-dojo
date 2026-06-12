/* ============================================================
   INTERMEDIO: comprehensions, lambdas y HOF, errores,
   archivos, módulos y proyecto integrador
   ============================================================ */
DOJO_PUSH("intermedio", [

/* ---------------- Comprehensions ---------------- */
{
  id: "comprehensions",
  title: "Comprensión de listas y dicts",
  intro: "La firma estilística de Python: <code>[expresion for item in iterable if condicion]</code> construye una lista nueva en una sola expresión declarativa. Domina esto y tu código empieza a parecer de alguien que <em>vive</em> en Python.",
  socratic: [
    {
      q: "Este loop construye una lista: <code>result = []</code>, <code>for x in nums: result.append(x * 2)</code>. La comprehension equivalente es <code>[x * 2 for x in nums]</code>. Más allá de ahorrar líneas… ¿qué comunica una que no comunica la otra?",
      a: "La comprehension declara la <strong>intención completa de entrada</strong>: \"esto ES una transformación de nums, nada más\". El loop es una promesa abierta — el lector debe verificar que adentro no pase nada raro (un break, un if escondido, dos appends). La comprehension es una garantía sintáctica: transformar, filtrar, juntar. Menos posibilidades = más fácil de leer."
    },
    {
      q: "¿En qué orden se leen las tres partes de <code>[x * 2 for x in nums if x &gt; 0]</code>? ¿De dónde viene esa sintaxis rara?",
      a: "Se lee: \"dame <em>x por 2</em>, para cada <em>x en nums</em>, siempre que <em>x sea positivo</em>\". Viene de la notación matemática de conjuntos: {2x | x ∈ nums, x &gt; 0}. La expresión va primero (qué produzco), el for en el medio (de dónde saco), el if al final (cuáles paso). El truco para escribirlas: escribí primero el loop mentalmente y después doblalo."
    },
    {
      q: "¿Cuándo NO deberías usar una comprehension?",
      a: "Cuando deja de leerse de un vistazo: condiciones múltiples enredadas, expresiones largas, o tres niveles de anidamiento. Y cuando el objetivo no es construir una colección — si solo querés ejecutar algo por cada elemento (imprimir, guardar), usá un for normal: una comprehension que se descarta es un abuso. La regla de oro sigue siendo legibilidad, no compresión."
    },
    {
      q: "¿Qué creés que construye <code>{w: len(w) for w in words}</code>? ¿Y en qué se diferencia de la de listas?",
      a: "Un <strong>dict</strong>: la dict comprehension produce pares <code>clave: valor</code> en vez de elementos sueltos. Misma mecánica (for + if opcional), pero con dos expresiones separadas por dos puntos. También existe la set comprehension <code>{x * 2 for x in nums}</code> — llaves sin los dos puntos. Las tres comparten la gramática; cambia qué colección arman."
    }
  ],
  exercises: [
    {
      id: "int-comp-1",
      title: "Tu primera comprehension",
      difficulty: 1,
      prompt: "<p>Creá <code>squares</code>: los cuadrados de los números del 1 al 10 → <code>[1, 4, 9, ..., 100]</code> — en <strong>una sola línea</strong>, con una list comprehension.</p><p>Si te sale el reflejo del loop con append, escribilo primero… y después doblalo a la forma <code>[expresion for x in ...]</code>.</p>",
      starter: "# squares = [... for ... in ...]\n",
      tests: "assert squares == [1, 4, 9, 16, 25, 36, 49, 64, 81, 100], f\"squares: {squares}\"",
      solution: "squares = [x ** 2 for x in range(1, 11)]",
      explanation: "<p>Compará las dos versiones del mismo pensamiento:</p><pre>squares = []\nfor x in range(1, 11):\n    squares.append(x ** 2)</pre><p>contra <code>[x ** 2 for x in range(1, 11)]</code>. No es solo brevedad: la comprehension no necesita la lista vacía inicial ni el append — dos oportunidades menos de error, y el resultado se puede asignar, retornar o pasar como argumento directamente, porque es una <em>expresión</em>, no un bloque.</p>",
      hints: ["La plantilla: [EXPRESION for VARIABLE in ITERABLE]. Acá la expresión es x ** 2.", "Del 1 al 10 inclusive: range(1, 11)."]
    },
    {
      id: "int-comp-2",
      title: "Filtrar con if",
      difficulty: 2,
      prompt: "<p>De <code>temps = [22, -5, 19, -1, 30, 12, -8, 25]</code> (hay lecturas inválidas negativas):</p><ul><li><code>valid</code>: solo las temperaturas válidas (no negativas) → <code>[22, 19, 30, 12, 25]</code></li><li><code>in_fahrenheit</code>: las válidas convertidas a Fahrenheit con <code>c * 9 / 5 + 32</code> → <code>[71.6, 66.2, 86.0, 53.6, 77.0]</code> — transformación Y filtro en la misma comprehension.</li></ul>",
      starter: "temps = [22, -5, 19, -1, 30, 12, -8, 25]\n\n# valid = ?\n# in_fahrenheit = ?\n",
      tests: "assert valid == [22, 19, 30, 12, 25], f\"valid: {valid}\"\nassert all(abs(a - b) < 1e-9 for a, b in zip(in_fahrenheit, [71.6, 66.2, 86.0, 53.6, 77.0])), f\"in_fahrenheit: {in_fahrenheit}\"\nassert len(in_fahrenheit) == 5, f\"in_fahrenheit deberia tener 5 elementos, tiene {len(in_fahrenheit)}\"",
      solution: "temps = [22, -5, 19, -1, 30, 12, -8, 25]\n\nvalid = [t for t in temps if t >= 0]\nin_fahrenheit = [t * 9 / 5 + 32 for t in temps if t >= 0]",
      explanation: "<p>La segunda comprehension hace las dos cosas a la vez — y el <strong>orden de ejecución</strong> es la clave: primero el <code>for</code> toma un elemento, después el <code>if</code> decide si pasa, y solo entonces la expresión lo transforma. Los descartados jamás llegan a convertirse.</p><p>Fijate que es el patrón <code>continue</code> de los loops, comprimido: \"saltear los inválidos, procesar el resto\". En el mundo de datos esto se llama <em>filter-map</em> y es posiblemente la operación más ejecutada del planeta — cada query SQL con WHERE y SELECT hace exactamente esto.</p>",
      hints: ["El if va al final: [t for t in temps if t >= 0].", "Para la segunda, cambiá la expresión inicial por la fórmula: [t * 9 / 5 + 32 for t in temps if t >= 0]."]
    },
    {
      id: "int-comp-3",
      title: "Limpieza de datos en una línea",
      difficulty: 3,
      prompt: "<p>Nombres cargados a mano, un desastre: <code>raw = [\"  ana \", \"BETO\", \"x\", \"  CARLA\", \"\", \"david  \", \"z\"]</code>.</p><p>Creá <code>clean</code>: los nombres con espacios recortados y capitalizados (primera mayúscula, resto minúscula, método <code>.capitalize()</code>), descartando los que — ya recortados — tengan menos de 3 letras. Resultado: <code>[\"Ana\", \"Beto\", \"Carla\", \"David\"]</code>.</p><p>Sutileza: el <code>strip()</code> aparece dos veces, en la expresión y en el filtro… ¿o hay forma de evitarlo? (Probá; las dos respuestas valen.)</p>",
      starter: "raw = [\"  ana \", \"BETO\", \"x\", \"  CARLA\", \"\", \"david  \", \"z\"]\n\n# clean = ?\n",
      tests: "assert clean == [\"Ana\", \"Beto\", \"Carla\", \"David\"], f\"clean: {clean}\"",
      solution: "raw = [\"  ana \", \"BETO\", \"x\", \"  CARLA\", \"\", \"david  \", \"z\"]\n\nclean = [n.strip().capitalize() for n in raw if len(n.strip()) >= 3]\n\n# alternativa sin repetir strip(): dos pasadas\n# stripped = [n.strip() for n in raw]\n# clean = [n.capitalize() for n in stripped if len(n) >= 3]",
      explanation: "<p>La versión de una línea repite <code>n.strip()</code> porque la comprehension no permite variables intermedias… casi: desde Python 3.8 existe el <em>walrus operator</em> — <code>[s.capitalize() for n in raw if len(s := n.strip()) &gt;= 3]</code> — que asigna dentro de la expresión. Elegante pero discutido; muchos equipos prefieren la alternativa de <strong>dos pasadas</strong>: una comprehension que limpia, otra que filtra y transforma. Dos líneas claras le ganan a una críptica.</p><p>La lección transferible: cuando una comprehension te obliga a repetir un cálculo, es señal de que el pipeline tiene dos etapas conceptuales — y está perfecto escribirlas como dos pasos. Los pipelines de datos reales (pandas, Spark) se construyen exactamente así: transformaciones encadenadas, cada una simple.</p>",
      hints: ["Estructura: [n.strip().capitalize() for n in raw if CONDICION].", "La condición tiene que medir el largo DESPUÉS de recortar: len(n.strip()) >= 3 — si medís antes, \"  x \" pasa el filtro."]
    },
    {
      id: "int-comp-4",
      title: "Dict comprehensions",
      difficulty: 4,
      prompt: "<p>Dos transformaciones de diccionario:</p><p><strong>A)</strong> De <code>words = [\"python\", \"numpy\", \"ai\", \"data\"]</code>, creá <code>lengths</code>: <code>{\"python\": 6, \"numpy\": 5, \"ai\": 2, \"data\": 4}</code>.</p><p><strong>B)</strong> De <code>prices = {\"laptop\": 1000, \"mouse\": 25, \"monitor\": 300}</code>, creá <code>with_tax</code>: los mismos productos con 21% de impuesto, redondeado a 2 decimales → <code>{\"laptop\": 1210.0, \"mouse\": 30.25, \"monitor\": 363.0}</code>. Para iterar pares clave-valor: <code>prices.items()</code>.</p>",
      starter: "words = [\"python\", \"numpy\", \"ai\", \"data\"]\n\n# lengths = ?\n\nprices = {\"laptop\": 1000, \"mouse\": 25, \"monitor\": 300}\n\n# with_tax = ?\n",
      tests: "assert lengths == {\"python\": 6, \"numpy\": 5, \"ai\": 2, \"data\": 4}, f\"lengths: {lengths}\"\nassert with_tax == {\"laptop\": 1210.0, \"mouse\": 30.25, \"monitor\": 363.0}, f\"with_tax: {with_tax}\"\nassert prices == {\"laptop\": 1000, \"mouse\": 25, \"monitor\": 300}, \"No modifiques prices: construi un dict nuevo\"",
      solution: "words = [\"python\", \"numpy\", \"ai\", \"data\"]\nlengths = {w: len(w) for w in words}\n\nprices = {\"laptop\": 1000, \"mouse\": 25, \"monitor\": 300}\nwith_tax = {name: round(price * 1.21, 2) for name, price in prices.items()}",
      explanation: "<p><strong>A)</strong> es el patrón \"derivar un índice\": de una lista, construir un dict que precalcula algo sobre cada elemento. <code>{w: len(w) ...}</code> — clave a la izquierda de los dos puntos, valor a la derecha.</p><p><strong>B)</strong> introduce el combo <code>.items()</code> + unpacking: <code>for name, price in prices.items()</code> desempaca cada par en dos nombres, igual que con las tuplas del proyecto de gastos. Transformar los valores dejando las claves quietas es EL caso de uso de la dict comprehension.</p><p>Nota el <code>round(..., 2)</code> ya metido en la expresión: las comprehensions componen bien — cualquier expresión válida puede ir del lado del valor.</p>",
      hints: ["Dict comprehension: {CLAVE: VALOR for x in iterable} — con dos puntos entre clave y valor.", "Para recorrer un dict de a pares: for name, price in prices.items()."]
    },
    {
      id: "int-comp-5",
      title: "Matrices: aplanar y transponer",
      difficulty: 5,
      prompt: "<p>Con la matriz <code>matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]</code> (lista de filas):</p><ul><li><code>flat</code>: todos los números en una lista plana → <code>[1, 2, ..., 9]</code>. Sintaxis del doble for: <code>[x for row in matrix for x in row]</code> — los for van <strong>en el mismo orden</strong> que en el loop anidado equivalente. Escribilo entendiéndolo, no copiándolo.</li><li><code>transposed</code>: la matriz transpuesta (filas ↔ columnas) → <code>[[1, 4, 7], [2, 5, 8], [3, 6, 9]]</code>. Acá el resultado es lista <em>de listas</em>: una comprehension cuya expresión es otra comprehension.</li></ul><p>Este ejercicio es un puente directo a NumPy, donde <code>flatten</code> y <code>.T</code> hacen esto sobre millones de números.</p>",
      starter: "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\n\n# flat = ?\n# transposed = ?\n",
      tests: "assert flat == [1, 2, 3, 4, 5, 6, 7, 8, 9], f\"flat: {flat}\"\nassert transposed == [[1, 4, 7], [2, 5, 8], [3, 6, 9]], f\"transposed: {transposed}\"",
      solution: "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\n\nflat = [x for row in matrix for x in row]\n\ntransposed = [[row[i] for row in matrix] for i in range(len(matrix[0]))]",
      explanation: "<p><strong>Aplanar:</strong> <code>[x for row in matrix for x in row]</code> se traduce mecánicamente al loop anidado leyendo los for de izquierda a derecha:</p><pre>for row in matrix:      # for de afuera primero\n    for x in row:       # for de adentro despues\n        agregar x</pre><p>El error universal es invertirlos (<code>for x in row for row in matrix</code>) — NameError, porque <code>row</code> se usa antes de definirse. Orden de lectura = orden de anidamiento.</p><p><strong>Transponer:</strong> el pensamiento es \"la columna i de la matriz vieja es la fila i de la nueva\". La comprehension interna <code>[row[i] for row in matrix]</code> junta el elemento i de cada fila — eso ES la columna i. La externa repite para cada i. Cuando esto te resulte natural, el indexing de NumPy te va a parecer un regalo.</p>",
      hints: ["flat: dos for seguidos dentro de los corchetes, en el mismo orden que el loop anidado: primero for row in matrix, después for x in row.", "transposed: la expresión de afuera produce LISTAS (una por columna): [[row[i] for row in matrix] for i in range(3)].", "¿NameError con 'row'? Tenés los for en el orden invertido."]
    }
  ]
},

/* ---------------- Lambdas y HOF ---------------- */
{
  id: "hof",
  title: "Lambdas y funciones de orden superior",
  intro: "Las funciones en Python son <strong>valores</strong>: se guardan en variables, se pasan como argumentos, se devuelven. Sobre esa idea se montan <code>lambda</code>, <code>sorted(key=...)</code>, <code>map</code>, <code>filter</code> y <code>reduce</code> — el dialecto funcional de Python.",
  socratic: [
    {
      q: "¿Qué significa que en Python las funciones sean \"ciudadanos de primera clase\"? ¿Qué te permite hacer que en otros lenguajes viejos no podías?",
      a: "Que una función es un valor más, como un int o una lista: <code>f = len</code> la guarda en una variable (sin paréntesis: ¡con paréntesis la llamás!), <code>sorted(data, key=f)</code> la pasa como argumento, y una función puede fabricar y devolver otra. Esto habilita un estilo entero: en vez de decirle a Python <em>cómo</em> iterar, le pasás <em>qué hacer</em> con cada elemento."
    },
    {
      q: "<code>lambda x: x * 2</code> hace lo mismo que un <code>def</code> de dos líneas. ¿Para qué existe entonces? ¿Y cuál es su límite?",
      a: "Existe para las funciones tan chicas y de uso tan local que ponerles nombre y lugar propio es burocracia: el caso típico es el <code>key=</code> de sorted. Su límite es duro: una lambda solo puede contener <strong>una expresión</strong> — sin asignaciones, sin if/else de bloque, sin loops. Si necesitás más, es señal de que merece un def con nombre. Regla práctica: si la lambda no entra cómoda en la misma línea que la usa, def."
    },
    {
      q: "¿Qué hace exactamente el parámetro <code>key</code> en <code>sorted(people, key=lambda p: p[1])</code>? ¿Qué recibe y qué devuelve esa función?",
      a: "Para cada elemento, sorted llama a tu función y ordena según <strong>lo que devuelve</strong> — no compara los elementos, compara sus \"puntajes\". <code>lambda p: p[1]</code> dice \"a cada tupla, juzgala por su segundo campo\". Es una inversión de control elegante: sorted pone el algoritmo (timsort, óptimo), vos ponés el criterio. Un parámetro reemplaza infinitas variantes de la función."
    },
    {
      q: "<code>map(f, lista)</code> y <code>[f(x) for x in lista]</code> hacen lo mismo. ¿Cuál es más \"pythónica\" hoy? ¿Por qué igual conviene conocer map/filter?",
      a: "La comprehension ganó la batalla del estilo en Python (más legible, no necesita lambda para expresiones). Pero map/filter siguen importando por tres razones: aparecen en muchísimo código existente; son <em>lazy</em> (no computan hasta que los consumís); y el <strong>concepto</strong> es universal — map/filter/reduce son los nombres con que el mundo de los datos piensa: Spark, pandas, JavaScript, todos hablan ese idioma."
    },
    {
      q: "reduce \"colapsa\" una lista a un solo valor. ¿Cómo funciona <code>reduce(lambda a, b: a + b, [1, 2, 3, 4])</code> paso a paso?",
      a: "La función recibe SIEMPRE dos cosas: el acumulado y el siguiente elemento. Paso a paso: (1+2)=3 → (3+3)=6 → (6+4)=10. Es el patrón acumulador de los loops, abstraído: vos das la operación de combinar, reduce hace el recorrido. sum(), max(), all() son reduces preempaquetados — por eso reduce explícito se usa poco en Python… pero en ML lo vas a reconocer en cada agregación de gradientes."
    }
  ],
  exercises: [
    {
      id: "int-hof-1",
      title: "Funciones como valores",
      difficulty: 1,
      prompt: "<p>Tres pasos para internalizar que una función es un valor:</p><ol><li><code>double</code>: una lambda que recibe x y devuelve el doble.</li><li><code>is_even</code>: una lambda que recibe n y devuelve <code>True</code> si es par (<code>n % 2 == 0</code> ya es la expresión booleana).</li><li><code>shout</code>: asignale la función <code>str.upper</code> SIN llamarla (sin paréntesis) — después los tests harán <code>shout(\"hola\")</code> → <code>\"HOLA\"</code>.</li></ol>",
      starter: "# double = lambda ...\n# is_even = ?\n# shout = ?\n",
      tests: "assert double(5) == 10 and double(0) == 0, f\"double(5) dio {double(5)}\"\nassert is_even(4) is True and is_even(7) is False, f\"is_even(4)={is_even(4)}, is_even(7)={is_even(7)}\"\nassert shout(\"hola\") == \"HOLA\", f\"shout('hola') dio {shout('hola')}\"\nassert callable(shout), \"shout tiene que SER una funcion, no el resultado de llamarla\"",
      solution: "double = lambda x: x * 2\nis_even = lambda n: n % 2 == 0\nshout = str.upper",
      explanation: "<p>La anatomía: <code>lambda PARAMETROS: EXPRESION</code> — sin return (la expresión ES el retorno), sin nombre propio (por eso \"función anónima\"), aunque acá le pegamos una etiqueta con la asignación.</p><p>El paso 3 es el más conceptual: <code>shout = str.upper</code> copia <em>la función misma</em> a otro nombre. La diferencia entre <code>str.upper</code> (la máquina) y <code>str.upper(\"x\")</code> (la máquina funcionando una vez) es exactamente la diferencia que necesitás para todo lo que viene: a <code>sorted</code>, <code>map</code> y los decoradores se les pasa la máquina, no su producto.</p><p>(Confesión idiomática: <code>is_even = lambda n: ...</code> en código real sería <code>def is_even(n):</code> — PEP 8 prefiere def para lambdas con nombre. Acá lo hacemos por el músculo.)</p>",
      hints: ["lambda x: x * 2 — parámetro, dos puntos, expresión. Sin return.", "Para shout: el nombre de la función SIN paréntesis. str.upper es la función; str.upper() sería llamarla."]
    },
    {
      id: "int-hof-2",
      title: "Ordenar con criterio propio",
      difficulty: 2,
      prompt: "<p>Resultados de un torneo: <code>players = [(\"ana\", 340), (\"beto\", 580), (\"carla\", 220), (\"david\", 580), (\"eva\", 410)]</code>.</p><ul><li><code>by_score</code>: jugadores ordenados por puntaje <strong>de mayor a menor</strong> (con <code>key=</code> y una lambda; sin key, sorted ordenaría por nombre).</li><li><code>podium</code>: los nombres (solo nombres) de los 3 primeros → <code>[\"beto\", \"david\", \"ana\"]</code> — combiná slicing con una comprehension.</li></ul>",
      starter: "players = [(\"ana\", 340), (\"beto\", 580), (\"carla\", 220), (\"david\", 580), (\"eva\", 410)]\n\n# by_score = ?\n# podium = ?\n",
      tests: "assert by_score == [(\"beto\", 580), (\"david\", 580), (\"eva\", 410), (\"ana\", 340), (\"carla\", 220)], f\"by_score: {by_score}\"\nassert podium == [\"beto\", \"david\", \"ana\"], f\"podium: {podium}\"\nassert players[0] == (\"ana\", 340), \"No modifiques players: usa sorted(), no .sort()\"",
      solution: "players = [(\"ana\", 340), (\"beto\", 580), (\"carla\", 220), (\"david\", 580), (\"eva\", 410)]\n\nby_score = sorted(players, key=lambda p: p[1], reverse=True)\npodium = [name for name, score in by_score[:3]]",
      explanation: "<p><code>key=lambda p: p[1]</code> le enseña a sorted a juzgar cada tupla por su puntaje. Detalle elegante del resultado: beto y david empatan en 580, y quedaron en su orden original (beto primero) — sorted es <em>estable</em>: ante empate, respeta el orden de llegada. Esa garantía permite ordenar por criterios sucesivos sin que se pisen.</p><p>Para <code>podium</code>, la cadena <code>by_score[:3]</code> → comprehension con unpacking (<code>for name, score in ...</code>) muestra cómo las herramientas de los temas anteriores se componen: slicing + unpacking + comprehension en una línea perfectamente legible.</p>",
      hints: ["sorted(players, key=lambda p: p[1], reverse=True) — la lambda extrae el campo por el que ordenar.", "podium: tomá los 3 primeros con [:3] y sacales el nombre con una comprehension con unpacking."]
    },
    {
      id: "int-hof-3",
      title: "map: transformar en masa",
      difficulty: 3,
      prompt: "<p>Precios sin IVA: <code>prices = [100, 250, 80, 1200]</code>.</p><ul><li><code>with_tax</code>: cada precio con 21% agregado, como <strong>lista</strong>, usando <code>map</code> y una lambda → <code>[121.0, 302.5, 96.8, 1452.0]</code>. Ojo: <code>map</code> devuelve un objeto perezoso; convertilo con <code>list()</code>.</li><li><code>labels</code>: cada precio final como string <code>\"$121.0\"</code>, aplicando <code>map</code> <strong>sobre el resultado anterior</strong> → encadenamiento.</li></ul>",
      starter: "prices = [100, 250, 80, 1200]\n\n# with_tax = ?\n# labels = ?\n",
      tests: "assert with_tax == [121.0, 302.5, 96.8, 1452.0], f\"with_tax: {with_tax}\"\nassert labels == [\"$121.0\", \"$302.5\", \"$96.8\", \"$1452.0\"], f\"labels: {labels}\"",
      solution: "prices = [100, 250, 80, 1200]\n\nwith_tax = list(map(lambda p: round(p * 1.21, 2), prices))\nlabels = list(map(lambda p: f\"${p}\", with_tax))",
      explanation: "<p><code>map(funcion, iterable)</code> aplica la función a cada elemento… pero no inmediatamente: devuelve un objeto <em>lazy</em> que recién computa cuando alguien lo consume (acá, <code>list()</code>). Esa pereza es una virtud con datos grandes: podés encadenar tres maps sobre un millón de elementos sin crear listas intermedias — solo la materialización final paga el costo.</p><p>Comparación honesta con la comprehension: <code>[round(p * 1.21, 2) for p in prices]</code> es igual de clara y no necesita lambda. En Python real, comprehension casi siempre; map brilla cuando la función YA existe (<code>list(map(str, nums))</code> es más limpio que la comprehension equivalente) y en el ecosistema de datos donde \"mapear\" es el verbo nativo.</p>",
      hints: ["map(lambda p: ..., prices) aplica la lambda a cada precio. Envolvé con list() para materializar.", "El segundo map corre sobre with_tax, no sobre prices. La lambda del f-string: lambda p: f\"${p}\"."]
    },
    {
      id: "int-hof-4",
      title: "filter + map en cadena",
      difficulty: 4,
      prompt: "<p>De <code>words = [\"sol\", \"computadora\", \"ia\", \"algoritmo\", \"red\", \"tensor\"]</code>, construí <code>result</code>: las palabras de 5 letras o más, en MAYÚSCULAS → <code>[\"COMPUTADORA\", \"ALGORITMO\", \"TENSOR\"]</code>.</p><p>Hacelo con el pipeline funcional: <code>filter</code> primero (¿cuáles pasan?), <code>map</code> después (¿cómo se transforman?), <code>list</code> al final. Una sola expresión anidada.</p><p>Después — opcional pero recomendado — escribí en un comentario la comprehension equivalente y decidí cuál te gusta más.</p>",
      starter: "words = [\"sol\", \"computadora\", \"ia\", \"algoritmo\", \"red\", \"tensor\"]\n\n# result = list(map(..., filter(..., words)))\n",
      tests: "assert result == [\"COMPUTADORA\", \"ALGORITMO\", \"TENSOR\"], f\"result: {result}\"",
      solution: "words = [\"sol\", \"computadora\", \"ia\", \"algoritmo\", \"red\", \"tensor\"]\n\nresult = list(map(lambda w: w.upper(), filter(lambda w: len(w) >= 5, words)))\n\n# equivalente con comprehension:\n# result = [w.upper() for w in words if len(w) >= 5]",
      explanation: "<p>La expresión se lee <strong>de adentro hacia afuera</strong>: filter selecciona → map transforma → list materializa. Es el mismo filter-map de la comprehension <code>[w.upper() for w in words if len(w) &gt;= 5]</code>, con la tubería explícita.</p><p>¿Cuál es \"mejor\"? Para Python puro, la comprehension: una sola construcción, sin lambdas, se lee de un tirón. Pero el pipeline anidado que acabás de escribir es <em>conceptualmente</em> el más importante de los dos: cuando llegues a datos en serio vas a escribir <code>df.filter(...).map(...)</code> en Spark, <code>dataset.filter(...).map(...)</code> en TensorFlow — la industria entera de los datos habla en filter y map encadenados. Hoy entrenaste la gramática.</p>",
      hints: ["De adentro hacia afuera: primero filter(lambda w: len(w) >= 5, words), eso va como segundo argumento del map.", "map necesita la transformación: lambda w: w.upper(). Y todo envuelto en list()."]
    },
    {
      id: "int-hof-5",
      title: "reduce: colapsar a un valor",
      difficulty: 5,
      prompt: "<p><code>reduce</code> vive en <code>functools</code> (necesitás <code>from functools import reduce</code>). Tres reducciones, de menor a mayor dificultad:</p><ol><li><code>product</code>: el producto de <code>nums = [2, 3, 4, 5]</code> → <code>120</code>. (La función combinadora recibe acumulado y siguiente.)</li><li><code>longest</code>: la palabra más larga de <code>words = [\"ia\", \"tensor\", \"algoritmo\", \"red\"]</code> → <code>\"algoritmo\"</code> — la lambda elige entre dos candidatas con un ternario.</li><li><code>total</code>: la suma de <code>nums</code> pero arrancando desde <code>100</code> (reduce acepta un tercer argumento: el valor inicial) → <code>114</code>.</li></ol>",
      starter: "from functools import reduce\n\nnums = [2, 3, 4, 5]\nwords = [\"ia\", \"tensor\", \"algoritmo\", \"red\"]\n\n# product = ?\n# longest = ?\n# total = ?  (con valor inicial 100)\n",
      tests: "assert product == 120, f\"product: {product}\"\nassert longest == \"algoritmo\", f\"longest: {longest}\"\nassert total == 114, f\"total: {total}\"",
      solution: "from functools import reduce\n\nnums = [2, 3, 4, 5]\nwords = [\"ia\", \"tensor\", \"algoritmo\", \"red\"]\n\nproduct = reduce(lambda acc, n: acc * n, nums)\nlongest = reduce(lambda a, b: a if len(a) >= len(b) else b, words)\ntotal = reduce(lambda acc, n: acc + n, nums, 100)",
      explanation: "<p>Seguí la mecánica de <code>product</code> a mano: acc=2, llega 3 → 6; llega 4 → 24; llega 5 → 120. Reduce es el patrón acumulador con la operación <em>parametrizada</em>: cambiás la lambda y el mismo esqueleto suma, multiplica, busca el máximo o concatena.</p><p><code>longest</code> muestra que el \"acumulado\" no tiene por qué ser un número: acá es \"la mejor candidata hasta ahora\" — tu viejo amigo el patrón campeón, en una línea. El <code>&gt;=</code> (y no <code>&gt;</code>) decide los empates a favor de la primera, consistente con max().</p><p>El valor inicial del tercer caso resuelve además un peligro: <code>reduce</code> sobre lista vacía explota… salvo que haya inicial, que entonces es la respuesta. ¿Te suena? Es el <code>if not grades: return 0</code> de tu función average, institucionalizado.</p><p>En Python idiomático: <code>sum(nums)</code>, <code>max(words, key=len)</code> — los reduces famosos ya vienen hechos. Pero ahora sabés qué son por dentro.</p>",
      hints: ["reduce(lambda acc, x: COMBINACION, lista) — la lambda SIEMPRE recibe dos: lo acumulado y lo nuevo.", "Para longest, la lambda decide entre dos palabras: a if len(a) >= len(b) else b.", "El valor inicial va tercero: reduce(funcion, lista, 100)."]
    }
  ]
},

/* ---------------- Manejo de errores ---------------- */
{
  id: "errores",
  title: "Manejo de errores",
  intro: "Los errores no son fracasos: son <strong>información</strong>. Python los modela como excepciones que viajan por el programa hasta que alguien las atiende. <code>try</code>/<code>except</code>/<code>else</code>/<code>finally</code> y <code>raise</code> son el vocabulario.",
  socratic: [
    {
      q: "Cuando una línea tira una excepción y nadie la atrapa, el programa muere con un traceback. ¿Por qué eso es MEJOR que seguir ejecutando como si nada?",
      a: "Porque un programa que sigue con datos corruptos hace daño silencioso: guarda basura en la base de datos, cobra mal, entrena un modelo con datos rotos. El crash ruidoso te avisa <em>en el momento y lugar exactos</em> del problema. La filosofía Python: \"errors should never pass silently\". try/except no es para callar errores — es para manejarlos <em>a propósito</em>."
    },
    {
      q: "¿Por qué <code>except ValueError:</code> es mejor que el genérico <code>except:</code> a secas?",
      a: "El <code>except:</code> pelado atrapa TODO — incluso errores que no imaginaste (un typo tuyo que da NameError, un Ctrl+C del usuario) — y los disfraza del caso que creías manejar. Atrapar específico es declarar: \"espero ESTE fallo y sé qué hacer con él; cualquier otro, que explote y me entere\". Cada except amplio es un lugar donde los bugs van a esconderse."
    },
    {
      q: "El bloque <code>else</code> del try corre solo si NO hubo excepción. ¿Qué aporta, si podrías poner ese código adentro del try?",
      a: "Precisión sobre QUÉ estás vigilando. Si metés diez líneas en el try, un except ValueError puede atrapar un ValueError de la línea ocho que no tiene nada que ver con el que esperabas de la línea uno. El patrón sano: try con la ÚNICA línea riesgosa, except para su fallo, else para el camino feliz que depende de que haya salido bien. El try angosto es a los errores lo que el except específico a los tipos."
    },
    {
      q: "¿Para qué sirve <code>raise</code>? ¿Por qué una función tuya tiraría un error a propósito en vez de devolver None o -1?",
      a: "Porque el error con nombre y mensaje es <em>imposible de ignorar</em>, mientras que el None silencioso viaja por el programa hasta explotar lejos de su origen (el famoso \"NoneType has no attribute...\" tres archivos después). <code>raise ValueError(\"edad negativa\")</code> detiene el problema en la frontera, con contexto. Validar temprano y fuerte es defender a tu yo del futuro."
    },
    {
      q: "<code>finally</code> corre SIEMPRE: con éxito, con excepción, incluso con return en el medio. ¿Qué tipo de código merece ese privilegio?",
      a: "La limpieza: cerrar archivos, liberar conexiones, soltar locks. Cosas que deben pasar <em>pase lo que pase</em>, porque dejarlas abiertas filtra recursos. De hecho este patrón es tan importante que Python le construyó sintaxis dedicada: el <code>with</code> que ya usaste con archivos es un try/finally disfrazado — lo vas a abrir al medio en el nivel Avanzado."
    }
  ],
  exercises: [
    {
      id: "int-err-1",
      title: "División a prueba de ceros",
      difficulty: 1,
      prompt: "<p>Escribí <code>safe_divide(a, b)</code>: devuelve <code>a / b</code>, pero si <code>b</code> es cero — en vez de explotar con <code>ZeroDivisionError</code> — devuelve <code>None</code>.</p><p>Usá <code>try</code>/<code>except</code>, no un <code>if b == 0</code> (ambos funcionan acá, pero el objetivo es el músculo del try; la diferencia filosófica viene en la explicación).</p>",
      starter: "def safe_divide(a, b):\n    # try / except ZeroDivisionError\n    pass\n",
      tests: "assert safe_divide(10, 2) == 5.0, f\"safe_divide(10, 2) dio {safe_divide(10, 2)}\"\nassert safe_divide(7, 0) is None, f\"safe_divide(7, 0) deberia dar None, dio {safe_divide(7, 0)}\"\nassert safe_divide(0, 5) == 0.0, f\"safe_divide(0, 5) dio {safe_divide(0, 5)}\"",
      solution: "def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return None",
      explanation: "<p>Dos filosofías con nombre propio: <strong>LBYL</strong> (\"look before you leap\": <code>if b == 0</code> antes de saltar) y <strong>EAFP</strong> (\"easier to ask forgiveness than permission\": intentá y atajá). Python favorece EAFP por dos razones: el camino feliz queda primero y limpio (la división, que es de lo que se trata la función), y no hay carrera entre el chequeo y la acción — con condiciones que pueden cambiar entre el if y el uso (archivos, red), chequear antes no garantiza nada.</p><p>Fijate también que <code>return None</code> acá es una decisión de <em>interfaz</em>: esta función promete \"número o None\", y el llamador decide qué hacer. En el ejercicio 4 vas a ver la alternativa: no devolver nada y relanzar el problema con raise.</p>",
      hints: ["Estructura: try: return a / b / except ZeroDivisionError: return None.", "El nombre exacto de la excepción es ZeroDivisionError — probá dividir por cero con Ejecutar para verlo."]
    },
    {
      id: "int-err-2",
      title: "Parsear lo imparseable",
      difficulty: 2,
      prompt: "<p>Datos de un formulario: a veces <code>\"42\"</code>, a veces <code>\"3.14\"</code>, a veces <code>\"hola\"</code>. Escribí <code>parse_number(s)</code>:</p><ul><li>Si el string es un entero válido → devolvé el <code>int</code>: <code>parse_number(\"42\")</code> → <code>42</code></li><li>Si no, pero es float válido → devolvé el <code>float</code>: <code>parse_number(\"3.14\")</code> → <code>3.14</code></li><li>Si tampoco → <code>None</code>: <code>parse_number(\"hola\")</code> → <code>None</code></li></ul><p>La excepción que tiran <code>int()</code> y <code>float()</code> ante basura es <code>ValueError</code>. Vas a necesitar un try adentro de otro (o dos seguidos).</p>",
      starter: "def parse_number(s):\n    pass\n",
      tests: "assert parse_number(\"42\") == 42 and isinstance(parse_number(\"42\"), int), f\"parse_number('42') dio {repr(parse_number('42'))}\"\nassert parse_number(\"3.14\") == 3.14 and isinstance(parse_number(\"3.14\"), float), f\"parse_number('3.14') dio {repr(parse_number('3.14'))}\"\nassert parse_number(\"hola\") is None, f\"parse_number('hola') dio {repr(parse_number('hola'))}\"\nassert parse_number(\"-7\") == -7 and isinstance(parse_number(\"-7\"), int), \"los enteros negativos tambien son enteros\"\nassert parse_number(\"\") is None, \"string vacio: None\"",
      solution: "def parse_number(s):\n    try:\n        return int(s)\n    except ValueError:\n        pass\n    try:\n        return float(s)\n    except ValueError:\n        return None",
      explanation: "<p>Una <strong>cascada de intentos</strong>, del formato más estricto al más laxo: primero int (porque <code>float(\"42\")</code> también funcionaría y te daría 42.0, perdiendo el tipo exacto), después float, después la rendición ordenada.</p><p>El <code>except ValueError: pass</code> del primer bloque merece atención: \"si no era int, no pasa nada, sigamos\". Ese <code>pass</code> es de los pocos lugares donde tragarse una excepción es correcto — porque el plan B está explícito justo abajo. Tragársela sin plan B es el antipatrón #1 del manejo de errores.</p><p>Y notá que los <code>return</code> tempranos hacen el control de flujo: si <code>int(s)</code> funciona, la función ya salió; el segundo try ni existe para ella.</p>",
      hints: ["Primer intento: try: return int(s), except ValueError: pass — y el código sigue de largo.", "Segundo intento igual con float(s), pero su except sí devuelve None: es el final de la cascada.", "El orden importa: si probás float primero, \"42\" te da 42.0 (float) y el test de tipo falla."]
    },
    {
      id: "int-err-3",
      title: "La coreografía completa: else y finally",
      difficulty: 3,
      prompt: "<p>Vas a trazar el orden exacto de ejecución. Completá <code>attempt_load(data, key)</code> que intenta leer <code>data[key]</code> y registra cada paso en la lista <code>trace</code> (ya creada afuera):</p><ul><li>En el <code>try</code>: leé <code>value = data[key]</code> y agregá <code>\"try\"</code> a trace.</li><li>En el <code>except KeyError</code>: agregá <code>\"except\"</code> y poné <code>value = None</code>.</li><li>En el <code>else</code>: agregá <code>\"else\"</code> (solo corre si NO hubo excepción).</li><li>En el <code>finally</code>: agregá <code>\"finally\"</code> (corre siempre).</li><li>Al final devolvé <code>value</code>.</li></ul><p>Predecí ANTES de verificar: ¿qué secuencia deja una clave que existe? ¿Y una que no?</p>",
      starter: "trace = []\n\ndef attempt_load(data, key):\n    # try / except KeyError / else / finally\n    pass\n",
      tests: "trace.clear()\nv1 = attempt_load({\"a\": 10}, \"a\")\nassert v1 == 10, f\"con clave existente deberia devolver 10, dio {v1}\"\nassert trace == [\"try\", \"else\", \"finally\"], f\"con exito la secuencia es try, else, finally — la tuya: {trace}\"\ntrace.clear()\nv2 = attempt_load({\"a\": 10}, \"zzz\")\nassert v2 is None, f\"con clave inexistente deberia devolver None, dio {v2}\"\nassert trace == [\"try\", \"except\", \"finally\"], f\"con fallo la secuencia es try, except, finally — la tuya: {trace}\"",
      solution: "trace = []\n\ndef attempt_load(data, key):\n    try:\n        value = data[key]\n        trace.append(\"try\")\n    except KeyError:\n        trace.append(\"except\")\n        value = None\n    else:\n        trace.append(\"else\")\n    finally:\n        trace.append(\"finally\")\n    return value",
      explanation: "<p>Las dos secuencias que registraron tus tests cuentan toda la historia:</p><p>Éxito: <code>try → else → finally</code>. Fallo: <code>try → except → finally</code> (el \"try\" se registró igual… ¿seguro? No: con clave inexistente, <code>data[key]</code> explota ANTES del append — por eso pusimos el append <em>después</em> de la línea riesgosa y el trace empieza con \"try\" solo a medias. Releé tu test: en el fallo el primer elemento es \"try\"… porque el orden del starter pone el append después del acceso — si te dio distinto, mirá dónde pusiste el append: la posición de cada línea dentro del try importa).</p><p><code>else</code> y <code>except</code> son mutuamente excluyentes — exactamente uno corre. <code>finally</code> es incondicional: éxito, fallo, hasta un return en el medio no lo esquiva. Por eso es EL lugar de la limpieza de recursos.</p><p>Este ejercicio parece artificial pero el patrón es real: \"intentar, manejar el fallo, continuar con el éxito, limpiar siempre\" es la estructura de cada operación con archivos, red o bases de datos que vas a escribir.</p>",
      hints: ["El orden sintáctico es fijo: try, except, else, finally — Python no acepta otro.", "En el try, el append va DESPUÉS de value = data[key]... aunque pensá qué pasa con el orden inverso y por qué los tests piden este.", "¿El except no se dispara? La excepción de clave inexistente en dict es KeyError, no IndexError."]
    },
    {
      id: "int-err-4",
      title: "raise: errores propios",
      difficulty: 4,
      prompt: "<p>Sos la frontera de tu sistema: nada inválido pasa. Escribí <code>register_user(name, age)</code> que:</p><ul><li>Si <code>name</code> está vacío (o es solo espacios) → <code>raise ValueError(\"name vacio\")</code></li><li>Si <code>age</code> no es int → <code>raise TypeError(\"age debe ser int\")</code> (chequeá con <code>isinstance</code>; ojo que <code>True</code> es técnicamente int — no hace falta cubrir ese caso)</li><li>Si <code>age</code> es negativo o mayor a 130 → <code>raise ValueError(\"age fuera de rango\")</code></li><li>Si todo está bien → devolvé el dict <code>{\"name\": name_limpio, \"age\": age}</code> con el nombre sin espacios en las puntas.</li></ul>",
      starter: "def register_user(name, age):\n    pass\n",
      tests: "assert register_user(\"  Ada \", 36) == {\"name\": \"Ada\", \"age\": 36}, f\"caso valido: {register_user('  Ada ', 36)}\"\ntry:\n    register_user(\"\", 30)\n    assert False, \"con name vacio deberia tirar ValueError\"\nexcept ValueError:\n    pass\ntry:\n    register_user(\"   \", 30)\n    assert False, \"con name de solo espacios deberia tirar ValueError\"\nexcept ValueError:\n    pass\ntry:\n    register_user(\"Ada\", \"36\")\n    assert False, \"con age string deberia tirar TypeError\"\nexcept TypeError:\n    pass\ntry:\n    register_user(\"Ada\", -1)\n    assert False, \"con age negativo deberia tirar ValueError\"\nexcept ValueError:\n    pass\ntry:\n    register_user(\"Ada\", 500)\n    assert False, \"con age 500 deberia tirar ValueError\"\nexcept ValueError:\n    pass",
      solution: "def register_user(name, age):\n    if not name.strip():\n        raise ValueError(\"name vacio\")\n    if not isinstance(age, int):\n        raise TypeError(\"age debe ser int\")\n    if age < 0 or age > 130:\n        raise ValueError(\"age fuera de rango\")\n    return {\"name\": name.strip(), \"age\": age}",
      explanation: "<p>El patrón se llama <strong>guard clauses</strong>: una batería de chequeos al inicio, cada uno con su raise, y el camino feliz al final sin un solo else. La función se lee como un control de aduana: requisito, requisito, requisito, bienvenido.</p><p>La elección del tipo de excepción es semántica, no decorativa: <code>TypeError</code> = \"me diste la <em>clase</em> de cosa equivocada\" (string donde iba int); <code>ValueError</code> = \"el tipo está bien pero el <em>valor</em> es inaceptable\" (int, pero -1). Respetar esa convención permite al llamador atrapar fino — quizás quiere manejar valores fuera de rango pero dejar que los errores de tipo (bugs, probablemente) exploten.</p><p>Mirá cómo los tests verifican que una función falle: <code>try → llamada → assert False (\"no debería llegar acá\") → except esperado → pass</code>. Probar los fallos es tan importante como probar los éxitos — los frameworks de testing tienen herramientas dedicadas (pytest.raises) para esto.</p>",
      hints: ["raise ValueError(\"mensaje\") corta la función ahí mismo, como un return pero por la puerta de emergencia.", "\"Vacío o solo espacios\" en un solo chequeo: if not name.strip(): — el string vacío es falsy.", "isinstance(age, int) pregunta el tipo. Los chequeos van en orden, cada uno con su raise; sin else."]
    },
    {
      id: "int-err-5",
      title: "Varios except, una función robusta",
      difficulty: 5,
      prompt: "<p>Escribí <code>safe_get(container, index, default=None)</code>: devuelve <code>container[index]</code>, pero sobrevive a todo lo razonable:</p><ul><li><code>safe_get([10, 20, 30], 1)</code> → <code>20</code> (caso normal)</li><li><code>safe_get([10, 20, 30], 99)</code> → <code>None</code> (índice fuera de rango: <code>IndexError</code>)</li><li><code>safe_get([10, 20], 1.5)</code> → <code>None</code> (índice no entero: <code>TypeError</code>)</li><li><code>safe_get({\"a\": 1}, \"z\", default=0)</code> → <code>0</code> (clave inexistente: <code>KeyError</code> — sí, también debe funcionar con dicts)</li><li>Los tres errores pueden compartir manejo: un except puede atrapar una <strong>tupla de tipos</strong>.</li></ul>",
      starter: "def safe_get(container, index, default=None):\n    pass\n",
      tests: "assert safe_get([10, 20, 30], 1) == 20, f\"caso normal: {safe_get([10, 20, 30], 1)}\"\nassert safe_get([10, 20, 30], 99) is None, f\"indice fuera de rango: {safe_get([10, 20, 30], 99)}\"\nassert safe_get([10, 20, 30], -1) == 30, \"los indices negativos validos deben funcionar normal\"\nassert safe_get([10, 20], 1.5) is None, f\"indice float: {safe_get([10, 20], 1.5)}\"\nassert safe_get({\"a\": 1}, \"a\") == 1, f\"dict con clave existente: {safe_get({'a': 1}, 'a')}\"\nassert safe_get({\"a\": 1}, \"z\", default=0) == 0, f\"dict con clave inexistente y default: {safe_get({'a': 1}, 'z', default=0)}\"\nassert safe_get([1, 2, 3], 99, default=\"N/A\") == \"N/A\", \"el default personalizado debe respetarse\"",
      solution: "def safe_get(container, index, default=None):\n    try:\n        return container[index]\n    except (IndexError, KeyError, TypeError):\n        return default",
      explanation: "<p>Cuatro líneas que condensan el tema entero. La elegancia central: <code>except (IndexError, KeyError, TypeError)</code> — una tupla de tipos, un solo manejo, porque para esta función los tres fallos <em>significan lo mismo</em>: \"eso no está\". Agrupar por significado, no por pereza.</p><p>Y notá lo que NO atrapamos: si le pasás un int como container (<code>safe_get(5, 0)</code>), el TypeError… uy, también lo atraparíamos. Decisión de diseño discutible — una versión más estricta atraparía solo IndexError y KeyError, dejando los errores de \"container inválido\" explotar como bugs. Este tipo de trade-off (¿cuán tolerante ser?) no tiene respuesta única: lo importante es decidirlo a consciencia y no por accidente.</p><p>El polimorfismo gratuito es puro Python: la misma <code>container[index]</code> funciona con listas (por posición) y dicts (por clave) porque ambos implementan el operador corchetes. Tu función sirve para ambos sin un solo if — eso se llama <em>duck typing</em> y es el corazón del diseño Python (lo formalizamos en Avanzado).</p>",
      hints: ["El cuerpo entero es un try con return container[index], y un except que devuelve default.", "Varios tipos en un except: except (IndexError, KeyError, TypeError): — con paréntesis, es una tupla."]
    }
  ]
},

/* ---------------- Archivos ---------------- */
{
  id: "archivos",
  title: "Manejo de archivos",
  intro: "Persistencia: que los datos sobrevivan al programa. <code>open()</code>, los modos <code>r</code>/<code>w</code>/<code>a</code>, el bloque <code>with</code>, y los formatos de texto que mueven el mundo (líneas, CSV, JSON). Acá los archivos viven en un sistema virtual del navegador — la API es idéntica a la real.",
  socratic: [
    {
      q: "¿Por qué <code>with open(...) as f:</code> en vez de <code>f = open(...)</code> y listo? ¿Qué puede salir mal con la segunda?",
      a: "Un archivo abierto es un recurso prestado por el sistema operativo. Con la forma simple, si tu código explota antes del <code>f.close()</code>, el archivo queda colgado: datos a medio escribir, recursos filtrados. El <code>with</code> garantiza el cierre <strong>pase lo que pase</strong> — éxito, excepción o return — porque es un try/finally con sintaxis amable. Regla sin excepciones: archivos, siempre con with."
    },
    {
      q: "Los modos: <code>\"r\"</code>, <code>\"w\"</code>, <code>\"a\"</code>. ¿Cuál es el peligroso y por qué?",
      a: "<code>\"w\"</code>: si el archivo existe, lo <strong>vacía instantáneamente al abrirlo</strong> — antes de que escribas nada. Un <code>open(\"datos_importantes.txt\", \"w\")</code> por error y el contenido ya no existe. <code>\"r\"</code> solo lee (falla si no existe), <code>\"a\"</code> agrega al final preservando lo anterior. La pregunta antes de cada open: ¿quiero reemplazar o agregar?"
    },
    {
      q: "Cuando leés un archivo de números, <code>f.read()</code> te da… ¿qué tipo? ¿Qué implica para tu código?",
      a: "Siempre <strong>string</strong>. Un archivo de texto no sabe de ints ni floats: es una tira de caracteres con saltos de línea (<code>\\n</code>) adentro. Todo lo que leés necesita parseo: <code>split</code> para cortar, <code>int()</code>/<code>float()</code> para convertir, <code>strip()</code> para sacar el \\n final que casi siempre viene pegado. El 90% de los bugs con archivos son olvidarse de alguno de esos tres."
    },
    {
      q: "¿Qué es JSON y por qué le ganó a todos los formatos para intercambiar datos?",
      a: "Texto que representa estructuras: objetos (dicts), arrays (listas), strings, números, booleanos, null. Le ganó a XML por legibilidad y simpleza, y mapea casi 1 a 1 con los tipos de Python: <code>json.dump(dict, f)</code> guarda, <code>json.load(f)</code> recupera — round-trip perfecto. Toda API web habla JSON; saber traducir mentalmente JSON ↔ dicts de Python es alfabetización básica."
    }
  ],
  exercises: [
    {
      id: "int-file-1",
      title: "Escribir y volver a leer",
      difficulty: 1,
      prompt: "<p>El ciclo completo de la persistencia, en miniatura:</p><ol><li>Escribí el texto <code>\"hola archivo\"</code> en <code>notes.txt</code> (modo <code>\"w\"</code>, dentro de un <code>with</code>).</li><li>En OTRO bloque <code>with</code>, abrilo en modo lectura y cargá su contenido en <code>content</code>.</li></ol><p>Dos with separados a propósito: escribir y leer son operaciones distintas, cada una abre y cierra.</p>",
      starter: "# 1. escribir\n# with open(\"notes.txt\", \"w\") as f:\n#     ...\n\n# 2. leer\n# content = ?\n",
      tests: "assert content == \"hola archivo\", f\"content: {repr(content)}\"\nwith open(\"notes.txt\") as _f:\n    assert _f.read() == \"hola archivo\", \"el archivo en disco no tiene el contenido esperado\"",
      solution: "with open(\"notes.txt\", \"w\") as f:\n    f.write(\"hola archivo\")\n\nwith open(\"notes.txt\", \"r\") as f:\n    content = f.read()",
      explanation: "<p>La mecánica del <code>with</code>: <code>open()</code> entrega el archivo, <code>as f</code> lo nombra, y al salir del bloque — por la razón que sea — Python lo cierra solo. El cierre tras escribir no es burocracia: hasta que se cierra (o hace flush), lo escrito puede estar en un buffer en memoria y no en el disco. El segundo with encontró el contenido porque el primero cerró de verdad.</p><p><code>f.read()</code> sin argumentos trae el archivo completo como un solo string — perfecto para archivos chicos, peligroso para gigantes (va todo a memoria). Para los grandes hay alternativas línea a línea que ves en el próximo ejercicio.</p>",
      hints: ["Escribir: with open(\"notes.txt\", \"w\") as f: / f.write(\"hola archivo\").", "Leer: otro with en modo \"r\" (o sin modo: r es el default), y content = f.read()."]
    },
    {
      id: "int-file-2",
      title: "Líneas, la unidad natural",
      difficulty: 2,
      prompt: "<p>El starter escribe una lista de compras, un ítem por línea. Tu parte:</p><ol><li>Leé el archivo y armá <code>items</code>: una lista con cada línea <strong>limpia</strong> (sin el <code>\\n</code> del final) → <code>[\"pan\", \"leche\", \"cafe\", \"yerba\"]</code>.</li><li>Armá <code>n_items</code> con la cantidad.</li></ol><p>El detalle educativo: cada línea leída viene con su salto de línea pegado (<code>\"pan\\n\"</code>). Mirá qué pasa si no lo sacás.</p>",
      starter: "with open(\"shopping.txt\", \"w\") as f:\n    f.write(\"pan\\n\")\n    f.write(\"leche\\n\")\n    f.write(\"cafe\\n\")\n    f.write(\"yerba\\n\")\n\n# items = ?\n# n_items = ?\n",
      tests: "assert items == [\"pan\", \"leche\", \"cafe\", \"yerba\"], f\"items: {items} — si ves cosas como 'pan\\\\n', falta limpiar los saltos de linea\"\nassert n_items == 4, f\"n_items: {n_items}\"",
      solution: "with open(\"shopping.txt\", \"w\") as f:\n    f.write(\"pan\\n\")\n    f.write(\"leche\\n\")\n    f.write(\"cafe\\n\")\n    f.write(\"yerba\\n\")\n\nwith open(\"shopping.txt\") as f:\n    items = [line.strip() for line in f]\n\nn_items = len(items)",
      explanation: "<p>La perla de la solución: <code>for line in f</code> — el archivo es directamente iterable, línea por línea, sin cargar todo a memoria. Combinado con una comprehension, \"leer y limpiar todas las líneas\" es una línea de código. Este idiom procesa igual de cómodo 4 líneas que 40 millones.</p><p>Alternativas que vas a cruzar: <code>f.readlines()</code> (todas las líneas a una lista, CON sus \\n) y <code>f.read().splitlines()</code> (todo el texto, cortado en líneas YA sin \\n). Las tres valen; la comprehension sobre el archivo es la más versátil porque podés filtrar al pasar (<code>if line.strip()</code> saltea líneas vacías — lo vas a necesitar en el proyecto).</p>",
      hints: ["Un archivo abierto se puede recorrer directo: for line in f — cada vuelta es una línea.", "Cada línea trae su \\n: line.strip() lo elimina. Comprehension: [line.strip() for line in f]."]
    },
    {
      id: "int-file-3",
      title: "Modo append: el diario de a bordo",
      difficulty: 3,
      prompt: "<p>El starter crea un log con dos eventos viejos. Tu programa corre después y debe:</p><ol><li>Agregar los eventos <code>\"user login\"</code> y <code>\"file saved\"</code> al final, <strong>sin destruir los anteriores</strong> (elegí bien el modo: probá qué pasa con <code>\"w\"</code> — en serio, probalo primero y mirá el desastre).</li><li>Releer el archivo completo y armar <code>all_events</code> (lista limpia) y <code>n_events</code>.</li></ol><p>Esperado: <code>[\"app started\", \"config loaded\", \"user login\", \"file saved\"]</code>.</p>",
      starter: "with open(\"events.log\", \"w\") as f:\n    f.write(\"app started\\n\")\n    f.write(\"config loaded\\n\")\n\n# 1. agregar los dos eventos nuevos SIN borrar los viejos\n\n# 2. releer todo\n# all_events = ?\n# n_events = ?\n",
      tests: "assert all_events == [\"app started\", \"config loaded\", \"user login\", \"file saved\"], f\"all_events: {all_events} — si faltan los dos primeros, usaste modo 'w' y los destruiste\"\nassert n_events == 4, f\"n_events: {n_events}\"",
      solution: "with open(\"events.log\", \"w\") as f:\n    f.write(\"app started\\n\")\n    f.write(\"config loaded\\n\")\n\nwith open(\"events.log\", \"a\") as f:\n    f.write(\"user login\\n\")\n    f.write(\"file saved\\n\")\n\nwith open(\"events.log\") as f:\n    all_events = [line.strip() for line in f]\n\nn_events = len(all_events)",
      explanation: "<p>Si hiciste el experimento con <code>\"w\"</code>: viste cómo los dos eventos originales se evaporaron en el instante del open, antes de cualquier write. Esa es la lección que vale el ejercicio — el modo <code>\"w\"</code> trunca al abrir, no al escribir.</p><p><code>\"a\"</code> (append) posiciona el cursor al final y todo write suma. Es EL modo de los logs: cada ejecución del programa agrega su historia sin tocar la anterior. Los archivos de log reales (los <code>server.log</code> que vas a procesar en el proyecto) se construyen exactamente así, por procesos que abren en append, escriben su línea y cierran.</p><p>Tercera apertura para leer: tres aperturas, tres propósitos, tres modos. Un archivo no se abre \"en general\" — se abre para algo.</p>",
      hints: ["El modo append es \"a\": open(\"events.log\", \"a\") — escribe al final, preserva lo anterior.", "No te olvides los \\n al escribir: sin ellos, las cuatro líneas son una sola.", "La relectura es igual al ejercicio anterior: comprehension con strip."]
    },
    {
      id: "int-file-4",
      title: "CSV artesanal",
      difficulty: 4,
      prompt: "<p>El starter escribe <code>team.csv</code> con encabezado y tres filas (<code>name,role,age</code>). Parsealo a mano — sin la librería csv, para entender qué hace por vos:</p><ol><li><code>team</code>: una lista de <strong>dicts</strong>, uno por fila (sin el encabezado): <code>[{\"name\": \"ada\", \"role\": \"engineer\", \"age\": 36}, ...]</code> — con <code>age</code> convertida a <code>int</code>.</li><li><code>avg_age</code>: el promedio de edades → <code>41.0</code></li></ol><p>Pasos sugeridos: leer líneas → descartar la primera → por cada una, <code>split(\",\")</code> → armar el dict convirtiendo la edad.</p>",
      starter: "with open(\"team.csv\", \"w\") as f:\n    f.write(\"name,role,age\\n\")\n    f.write(\"ada,engineer,36\\n\")\n    f.write(\"alan,scientist,41\\n\")\n    f.write(\"grace,admiral,46\\n\")\n\n# team = ?\n# avg_age = ?\n",
      tests: "assert team == [{\"name\": \"ada\", \"role\": \"engineer\", \"age\": 36}, {\"name\": \"alan\", \"role\": \"scientist\", \"age\": 41}, {\"name\": \"grace\", \"role\": \"admiral\", \"age\": 46}], f\"team: {team}\"\nassert all(isinstance(p[\"age\"], int) for p in team), \"age tiene que ser int, no string\"\nassert abs(avg_age - 41.0) < 1e-9, f\"avg_age: {avg_age}\"",
      solution: "with open(\"team.csv\", \"w\") as f:\n    f.write(\"name,role,age\\n\")\n    f.write(\"ada,engineer,36\\n\")\n    f.write(\"alan,scientist,41\\n\")\n    f.write(\"grace,admiral,46\\n\")\n\nteam = []\nwith open(\"team.csv\") as f:\n    lines = [line.strip() for line in f]\n\nfor line in lines[1:]:          # saltear el encabezado\n    name, role, age = line.split(\",\")\n    team.append({\"name\": name, \"role\": role, \"age\": int(age)})\n\navg_age = sum(p[\"age\"] for p in team) / len(team)",
      explanation: "<p>Acabás de escribir un parser — la transformación texto → estructura que está debajo de toda la ingeniería de datos. Las piezas:</p><p><code>lines[1:]</code> — saltear el encabezado por slicing. <code>name, role, age = line.split(\",\")</code> — split corta, el unpacking nombra: tres operaciones mentales en una línea legible. <code>int(age)</code> — LA conversión que todos olvidan: del archivo todo sale string, y un <code>\"36\"</code> sin convertir arruinaría el promedio de formas creativas (¿te acordás de <code>\"5\" + 3</code> del primer día?).</p><p><code>sum(p[\"age\"] for p in team)</code> es una <em>generator expression</em>: como una comprehension pero sin corchetes, alimenta a sum sin construir lista intermedia — adelanto del nivel Avanzado.</p><p>El módulo <code>csv</code> de la librería estándar hace esto manejando los casos horribles (comas dentro de comillas, etc.). Usalo en producción — pero ahora sabés qué problema resuelve.</p>",
      hints: ["Leé todas las líneas limpias primero; el encabezado se descarta con lines[1:].", "Por cada línea: name, role, age = line.split(\",\") — unpacking del resultado del split.", "La edad sale del archivo como STRING: int(age) antes de meterla al dict, o el promedio va a fallar feo."]
    },
    {
      id: "int-file-5",
      title: "JSON: el formato del mundo",
      difficulty: 5,
      prompt: "<p>Tu app guarda su configuración en JSON. Implementá el ciclo completo con el módulo <code>json</code> (importalo):</p><ol><li>Guardá el dict <code>settings</code> del starter en <code>config.json</code> (<code>json.dump(obj, f)</code>).</li><li>Releelo a la variable <code>loaded</code> (<code>json.load(f)</code>) y comprobá imprimiéndolo que el round-trip fue perfecto.</li><li>Simulá una actualización del usuario: en <code>loaded</code>, cambiá <code>theme</code> a <code>\"dark\"</code> y agregá <code>\"version\": 2</code>. Guardalo de nuevo en el mismo archivo.</li><li>Releé una vez más a <code>final</code> para verificar la persistencia del cambio.</li></ol>",
      starter: "import json\n\nsettings = {\n    \"theme\": \"light\",\n    \"font_size\": 14,\n    \"plugins\": [\"linter\", \"autocomplete\"],\n    \"autosave\": True\n}\n\n# 1. guardar settings en config.json\n# 2. releer a loaded\n# 3. modificar loaded y volver a guardar\n# 4. releer a final\n",
      tests: "assert loaded[\"theme\"] in (\"light\", \"dark\"), \"loaded deberia ser el dict leido del archivo\"\nassert final[\"theme\"] == \"dark\", f\"final['theme'] deberia ser 'dark', es {final.get('theme')}\"\nassert final[\"version\"] == 2, f\"final['version'] deberia ser 2, es {final.get('version')}\"\nassert final[\"font_size\"] == 14 and final[\"plugins\"] == [\"linter\", \"autocomplete\"], \"los demas valores deben sobrevivir el round-trip\"\nassert final[\"autosave\"] is True, \"el booleano debe volver como booleano, no como string\"\nimport json as _json\nwith open(\"config.json\") as _f:\n    _on_disk = _json.load(_f)\nassert _on_disk == final, \"lo que esta en el archivo no coincide con final\"",
      solution: "import json\n\nsettings = {\n    \"theme\": \"light\",\n    \"font_size\": 14,\n    \"plugins\": [\"linter\", \"autocomplete\"],\n    \"autosave\": True\n}\n\nwith open(\"config.json\", \"w\") as f:\n    json.dump(settings, f)\n\nwith open(\"config.json\") as f:\n    loaded = json.load(f)\n\nloaded[\"theme\"] = \"dark\"\nloaded[\"version\"] = 2\n\nwith open(\"config.json\", \"w\") as f:\n    json.dump(loaded, f)\n\nwith open(\"config.json\") as f:\n    final = json.load(f)",
      explanation: "<p>El milagro silencioso del ejercicio: <code>autosave</code> entró como <code>True</code> (booleano de Python), viajó por el archivo como <code>true</code> (JSON), y volvió como <code>True</code>. Lo mismo la lista, los números, los strings — <code>json.dump</code> y <code>json.load</code> traducen entre los dos mundos sin que pienses en ello. Compará con tu parser CSV del ejercicio anterior, donde cada conversión de tipo era tu problema: eso es lo que un formato con tipos te regala.</p><p>El patrón de los pasos 2-3-4 — <strong>load, modificar en memoria, dump completo</strong> — es como se actualizan los archivos de configuración en la práctica: no se \"edita\" el archivo, se reemplaza por la versión nueva del estado. (Así guarda tu progreso este mismo dojo, dicho sea de paso: un JSON en el localStorage del navegador.)</p><p>Tip para humanos: <code>json.dump(obj, f, indent=2)</code> escribe con sangría legible. Sin indent, todo en una línea — válido pero hostil.</p>",
      hints: ["json.dump(settings, f) escribe; json.load(f) lee. dump/load van con archivos (dumps/loads, con s, van con strings).", "Cada guardado es un open en \"w\" nuevo: el archivo se reemplaza entero, no se edita.", "Modificá loaded como cualquier dict: loaded[\"theme\"] = \"dark\", loaded[\"version\"] = 2."]
    }
  ]
},

/* ---------------- Módulos ---------------- */
{
  id: "modulos",
  title: "Módulos e imports",
  intro: "No estás solo: la <em>standard library</em> de Python trae \"baterías incluidas\" — <code>math</code>, <code>random</code>, <code>datetime</code>, <code>collections</code>, <code>json</code>… — y el sistema de imports te deja organizar TU código en módulos también.",
  socratic: [
    {
      q: "¿Qué diferencia práctica hay entre <code>import math</code> y <code>from math import sqrt</code>? ¿Cuándo conviene cada una?",
      a: "<code>import math</code> trae el módulo entero y usás <code>math.sqrt(x)</code> — verboso pero transparente: siempre se ve de dónde viene cada cosa. <code>from math import sqrt</code> trae solo ese nombre, pelado: <code>sqrt(x)</code>. La segunda es cómoda para nombres muy usados; la primera escala mejor en archivos grandes con muchos imports. El consenso profesional: import del módulo por defecto, from para los 2 o 3 nombres que usás constantemente. Y <code>from math import *</code>: jamás — llena tu espacio de nombres con sorpresas."
    },
    {
      q: "¿Qué ES un módulo, físicamente? Cuando escribís <code>import mymath</code>, ¿qué hace Python?",
      a: "Un módulo es… un archivo <code>.py</code>. Nada más místico que eso. <code>import mymath</code> busca <code>mymath.py</code> (en el directorio actual y en la lista <code>sys.path</code>), lo <strong>ejecuta de arriba a abajo una vez</strong>, y te entrega el resultado como un objeto cuyos atributos son lo que el archivo definió. Por eso un print suelto en un módulo se imprime al importarlo: importar ES ejecutar."
    },
    {
      q: "Si importás el mismo módulo en cinco archivos distintos, ¿se ejecuta cinco veces?",
      a: "No: una sola. Python cachea los módulos importados en <code>sys.modules</code>; los imports siguientes reciben el objeto ya cargado. Es eficiencia y también semántica: el estado del módulo (sus variables) es compartido — todos ven el mismo. Detalle de laboratorio: por ese caché, si modificás un módulo a mitad de sesión, re-importarlo no recarga los cambios (necesitás importlib.reload). Esta herramienta limpia el caché entre ejecuciones para que no te muerda."
    },
    {
      q: "¿Por qué <code>random.seed(42)</code> hace que los números \"aleatorios\" se repitan exactos? ¿Y por qué eso es ORO en machine learning?",
      a: "Porque random no tira dados: genera una secuencia matemática determinista que PARECE azar, arrancando de una semilla. Misma semilla → misma secuencia, siempre. En ML esto es sagrado: tu experimento debe ser <em>reproducible</em> — si el modelo dio 87% de accuracy, vos (o tu revisor) tiene que poder obtener exactamente 87% corriéndolo de nuevo. Todo paper serio fija sus semillas. Te vas a reencontrar con seed en el nivel NumPy y en cada notebook de ML de tu vida."
    }
  ],
  exercises: [
    {
      id: "int-mod-1",
      title: "math: la calculadora científica",
      difficulty: 1,
      prompt: "<p>Importá <code>math</code> y calculá:</p><ul><li><code>diagonal</code>: la diagonal de una pantalla de 16:9 — <code>math.sqrt(16**2 + 9**2)</code></li><li><code>circle_area</code>: el área de un círculo de radio 3, con el <code>math.pi</code> de verdad</li><li><code>floor_val</code> y <code>ceil_val</code>: el piso y el techo de <code>7.3</code> (funciones <code>floor</code> y <code>ceil</code>)</li></ul>",
      starter: "import math\n\n# diagonal = ?\n# circle_area = ?\n# floor_val = ?\n# ceil_val = ?\n",
      tests: "import math as _m\nassert abs(diagonal - _m.sqrt(337)) < 1e-9, f\"diagonal: {diagonal}\"\nassert abs(circle_area - _m.pi * 9) < 1e-9, f\"circle_area: {circle_area}\"\nassert floor_val == 7, f\"floor_val: {floor_val}\"\nassert ceil_val == 8, f\"ceil_val: {ceil_val}\"",
      solution: "import math\n\ndiagonal = math.sqrt(16**2 + 9**2)\ncircle_area = math.pi * 3**2\nfloor_val = math.floor(7.3)\nceil_val = math.ceil(7.3)",
      explanation: "<p>El prefijo <code>math.</code> en cada uso es la gracia, no la molestia: en un archivo de 500 líneas, <code>math.sqrt</code> no deja dudas de dónde viene. Y <code>math.pi</code> no es una función sino una constante del módulo — los módulos exportan de todo: funciones, constantes, clases.</p><p>floor vs ceil vs round vs int — el cuarteto que confunde: <code>floor(7.8)</code>=7 (siempre abajo), <code>ceil(7.2)</code>=8 (siempre arriba), <code>round(7.5)</code>=8 (al más cercano), <code>int(7.9)</code>=7 (corta hacia cero, que con negativos difiere de floor: <code>int(-7.9)</code>=-7 pero <code>floor(-7.9)</code>=-8). Elegir el redondeo equivocado en código financiero ha costado fortunas reales.</p>",
      hints: ["Todo con prefijo: math.sqrt(...), math.pi, math.floor(...), math.ceil(...).", "math.pi es una constante, va sin paréntesis."]
    },
    {
      id: "int-mod-2",
      title: "random con reproducibilidad",
      difficulty: 2,
      prompt: "<p>Simulá una tirada de dados <strong>reproducible</strong>:</p><ol><li>Importá <code>random</code> y fijá la semilla: <code>random.seed(42)</code>.</li><li><code>rolls</code>: una lista de 5 tiradas de dado (<code>random.randint(1, 6)</code> — ambos extremos INCLUIDOS, una rareza de randint) usando una comprehension.</li><li><code>total</code>: la suma de las tiradas.</li></ol><p>Los tests reproducen tu secuencia con la misma semilla — si fijaste seed(42) ANTES de tirar, van a coincidir exactamente. Probá cambiar la semilla y mirá cómo cambian los \"dados\"… y volvé a 42.</p>",
      starter: "import random\n\n# 1. fijar la semilla\n# 2. rolls = ?\n# 3. total = ?\n",
      tests: "import random as _r\n_r.seed(42)\n_expected = [_r.randint(1, 6) for _ in range(5)]\nassert rolls == _expected, f\"rolls: {rolls} — esperaba {_expected}. ¿Fijaste random.seed(42) ANTES de generar?\"\nassert total == sum(_expected), f\"total: {total}\"",
      solution: "import random\n\nrandom.seed(42)\nrolls = [random.randint(1, 6) for _ in range(5)]\ntotal = sum(rolls)",
      explanation: "<p>Tu computadora no sabe tirar dados: <code>random</code> genera una secuencia perfectamente determinista que pasa todos los tests estadísticos de azar. La semilla elige el punto de partida — misma semilla, misma \"suerte\". Es la única razón por la que los tests pudieron verificar tus tiradas \"aleatorias\".</p><p>El <code>_</code> en <code>for _ in range(5)</code> es convención: \"necesito iterar 5 veces pero el índice no me interesa\". Comunica intención, como todo buen nombre — incluso cuando el nombre es \"esto no importa\".</p><p>Guardá este patrón: <code>seed → generar → verificar</code>. En NumPy va a ser <code>np.random.seed(42)</code> y en cada experimento de ML que publiques, fijar las semillas será la diferencia entre ciencia y anécdota.</p>",
      hints: ["random.seed(42) va PRIMERO — la semilla afecta lo que se genera después.", "Comprehension con descarte: [random.randint(1, 6) for _ in range(5)]."]
    },
    {
      id: "int-mod-3",
      title: "datetime: aritmética de fechas",
      difficulty: 3,
      prompt: "<p>Con <code>from datetime import date, timedelta</code>:</p><ul><li><code>moon_landing</code>: el 20 de julio de 1969 (<code>date(anio, mes, dia)</code>).</li><li><code>python_birth</code>: el 20 de febrero de 1991.</li><li><code>days_between</code>: cuántos días pasaron entre ambos — restá las fechas y mirá qué tipo de objeto sale; el atributo <code>.days</code> extrae el número → <code>7885</code>.</li><li><code>hundred_days_later</code>: la fecha 100 días después del alunizaje (sumale un <code>timedelta(days=100)</code>) → <code>date(1969, 10, 28)</code>.</li></ul>",
      starter: "from datetime import date, timedelta\n\n# moon_landing = ?\n# python_birth = ?\n# days_between = ?\n# hundred_days_later = ?\n",
      tests: "from datetime import date as _d\nassert moon_landing == _d(1969, 7, 20), f\"moon_landing: {moon_landing}\"\nassert python_birth == _d(1991, 2, 20), f\"python_birth: {python_birth}\"\nassert days_between == 7885, f\"days_between: {days_between}\"\nassert hundred_days_later == _d(1969, 10, 28), f\"hundred_days_later: {hundred_days_later}\"",
      solution: "from datetime import date, timedelta\n\nmoon_landing = date(1969, 7, 20)\npython_birth = date(1991, 2, 20)\ndays_between = (python_birth - moon_landing).days\nhundred_days_later = moon_landing + timedelta(days=100)",
      explanation: "<p>Lo notable: <code>python_birth - moon_landing</code> — ¡restaste fechas con el operador menos! El resultado es un <code>timedelta</code>, un objeto que representa una <em>duración</em> (no una fecha), y su <code>.days</code> da el número. La suma simétrica también funciona: fecha + duración = nueva fecha, con todos los años bisiestos y largos de meses resueltos por la librería.</p><p>Esto se llama <em>sobrecarga de operadores</em>: los tipos de datetime definen qué significan + y − para ellos. Lo vas a hacer con tus propias clases en el nivel Avanzado, y NumPy lo explota a fondo (sumar arrays enteros con +).</p><p>Moraleja profesional: JAMÁS hagas aritmética de fechas a mano (\"un mes = 30 días\" es un bug en 7 de cada 12 meses). datetime existe porque el calendario es un campo minado: bisiestos, husos, cambios de hora. Delegá.</p>",
      hints: ["date(1969, 7, 20) — año, mes, día como tres argumentos int.", "La resta de dos dates da un timedelta; su atributo .days es el entero que buscás.", "Para sumar días: moon_landing + timedelta(days=100)."]
    },
    {
      id: "int-mod-4",
      title: "collections.Counter: contar sin esfuerzo",
      difficulty: 4,
      prompt: "<p>¿Te acordás del patrón <code>totals.get(key, 0) + 1</code> del proyecto de gastos? La librería estándar lo tiene institucionalizado: <code>Counter</code>.</p><p>Con el texto del starter:</p><ol><li><code>words</code>: la lista de palabras del texto en minúsculas (split + lower).</li><li><code>counts</code>: un <code>Counter</code> de esas palabras (pasale la lista entera al constructor).</li><li><code>top_word</code> y <code>top_count</code>: la palabra más frecuente y su cantidad — explorá el método <code>.most_common(n)</code>, mirá QUÉ estructura devuelve (imprimila), y desempacá.</li></ol>",
      starter: "from collections import Counter\n\ntext = \"la ia aprende y la ia mejora porque la practica y los datos mejoran la ia\"\n\n# words = ?\n# counts = ?\n# top_word, top_count = ?\n",
      tests: "assert words[:3] == [\"la\", \"ia\", \"aprende\"], f\"words deberia arrancar con ['la', 'ia', 'aprende']: {words[:6]}\"\nassert counts[\"la\"] == 4 and counts[\"ia\"] == 3, f\"counts['la']={counts['la']}, counts['ia']={counts['ia']}\"\nassert top_word == \"la\" and top_count == 4, f\"top: {top_word} x{top_count}\"\nassert counts[\"inexistente\"] == 0, \"bonus descubierto: Counter devuelve 0 para lo que no existe, sin KeyError\"",
      solution: "from collections import Counter\n\ntext = \"la ia aprende y la ia mejora porque la practica y los datos mejoran la ia\"\n\nwords = text.lower().split()\ncounts = Counter(words)\ntop_word, top_count = counts.most_common(1)[0]",
      explanation: "<p><code>Counter(words)</code> reemplaza el loop entero de conteo: le das un iterable, te da un dict de frecuencias (es literalmente una subclase de dict). <code>.most_common(1)</code> devuelve <code>[(\"la\", 4)]</code> — una <strong>lista de tuplas</strong>, aunque pidas una — de ahí el <code>[0]</code> para sacar la tupla y el unpacking para abrirla: tres estructuras anidadas navegadas en una línea, todas viejas conocidas tuyas.</p><p>El bonus que delató el último test: <code>counts[\"lo_que_sea\"]</code> con clave inexistente da <code>0</code> en vez de KeyError — semántica perfecta para un contador (\"¿cuántas veces apareció? cero\").</p><p>Moraleja del módulo collections (que también trae <code>defaultdict</code>, <code>namedtuple</code>, <code>deque</code>): antes de escribir un patrón a mano por tercera vez, buscá si la standard library ya lo trae pulido. \"Batteries included\" es la promesa de Python — conocer las baterías es parte del oficio. En ML: contar frecuencias de palabras es el paso uno de medio NLP clásico.</p>",
      hints: ["words = text.lower().split() — split sin argumentos corta por espacios.", "Counter(words) y listo: el constructor cuenta solo.", "most_common(1) devuelve [(palabra, cantidad)] — lista DE tuplas. [0] saca la tupla, el unpacking la abre."]
    },
    {
      id: "int-mod-5",
      title: "Tu propio módulo",
      difficulty: 5,
      prompt: "<p>Un módulo es un archivo .py — así que podés <em>fabricar uno</em> con lo que sabés de archivos, e importarlo:</p><ol><li>Escribí (con <code>open</code>/<code>write</code>) el archivo <code>geometry.py</code> con este contenido: una constante <code>PI = 3.14159</code>, una función <code>circle_area(r)</code> que devuelva <code>PI * r * r</code>, y una función <code>rectangle_area(w, h)</code>. Cuidá la indentación dentro del string (usá <code>\\n</code> y cuatro espacios literales).</li><li><code>import geometry</code> y usalo: <code>area1 = geometry.circle_area(10)</code> → <code>314.159</code>, <code>area2 = geometry.rectangle_area(3, 4)</code> → <code>12</code>, y <code>pi_value = geometry.PI</code>.</li></ol><p>El momento \"aaah\": tu import funciona EXACTAMENTE igual que <code>import math</code>. No hay magia — nunca la hubo.</p>",
      starter: "module_code = \"\"\"PI = 3.14159\n\ndef circle_area(r):\n    return PI * r * r\n\ndef rectangle_area(w, h):\n    return w * h\n\"\"\"\n\n# 1. escribir module_code en geometry.py\n\n# 2. importarlo y usarlo\n# area1 = ?\n# area2 = ?\n# pi_value = ?\n",
      tests: "assert abs(area1 - 314.159) < 1e-6, f\"area1: {area1}\"\nassert area2 == 12, f\"area2: {area2}\"\nassert abs(pi_value - 3.14159) < 1e-9, f\"pi_value: {pi_value}\"\nimport os as _os\nassert _os.path.exists(\"geometry.py\"), \"el archivo geometry.py tiene que existir en disco\"",
      solution: "module_code = \"\"\"PI = 3.14159\n\ndef circle_area(r):\n    return PI * r * r\n\ndef rectangle_area(w, h):\n    return w * h\n\"\"\"\n\nwith open(\"geometry.py\", \"w\") as f:\n    f.write(module_code)\n\nimport geometry\n\narea1 = geometry.circle_area(10)\narea2 = geometry.rectangle_area(3, 4)\npi_value = geometry.PI",
      explanation: "<p>Desmitificación completa: escribiste texto en un archivo, le pusiste extensión .py, y el import lo encontró (porque está en el directorio actual, que integra la ruta de búsqueda), lo ejecutó de arriba a abajo — definiendo PI y las dos funciones — y te entregó el objeto módulo. <code>geometry.circle_area</code> es un atributo de ese objeto, exactamente como <code>math.sqrt</code> lo es del suyo.</p><p>En un proyecto real no generás los módulos con write, claro: simplemente creás <code>geometry.py</code> en tu editor, al lado de tu <code>main.py</code>, y los imports funcionan igual. De ahí escala la organización de todo proyecto Python: módulos (archivos) agrupados en paquetes (carpetas con <code>__init__.py</code>), hasta llegar a los que se publican en PyPI e instalás con pip. Es la misma idea en todos los tamaños: código con nombre, en archivos, que se importa.</p><p>(El string triple-comillas <code>\"\"\"...\"\"\"</code> del starter permite escribir texto multilínea con saltos reales — más legible que encadenar \\n.)</p>",
      hints: ["Paso 1 es un with open(\"geometry.py\", \"w\") y f.write(module_code) — el starter ya te dio el contenido.", "Paso 2: import geometry (sin .py) y usá geometry.lo_que_sea, como con math."]
    }
  ]
},

/* ---------------- PROYECTO INTERMEDIO ---------------- */
{
  id: "proyecto-intermedio",
  title: "Proyecto: Procesador de logs",
  isProject: true,
  intro: "Un servidor escupió su <code>server.log</code>: líneas con formato <code>fecha | nivel | mensaje</code>… y algunas corruptas, porque la vida real es así. Tu misión: parsear defensivamente, analizar con comprehensions y Counter, y exportar un reporte JSON. Todo el nivel Intermedio, junto.",
  socratic: [
    {
      q: "El archivo trae líneas corruptas (campos de menos, basura). Tenés dos filosofías: que el parser explote al encontrarlas, o que las saltee. ¿Cuándo es correcta cada una?",
      a: "Depende del contrato. Pipeline de datos masivos (logs, scraping): saltear y, idealmente, <em>contar</em> lo descartado — un log corrupto entre millones no puede frenar el análisis, pero un 40% descartado es señal de que algo anda mal aguas arriba. Datos críticos (transacciones bancarias): explotar — cada registro importa y la corrupción es una emergencia, no ruido. Acá elegimos saltear devolviendo None: el llamador filtra. Lo profesional es que sea una DECISIÓN, documentada en el contrato de la función."
    },
    {
      q: "¿Por qué conviene que <code>parse_line</code> sea una función separada, en vez de parsear adentro del loop de lectura?",
      a: "Tres razones: (1) se testea sola — le pasás un string raro y ves qué hace, sin archivos de por medio; (2) el \"qué es una línea válida\" queda definido en UN lugar; (3) la función de carga queda trivial: leer, parsear cada línea, filtrar los None — una comprehension. Separar el parseo del I/O es de las divisiones de responsabilidad más rendidoras que existen."
    },
    {
      q: "Para \"cuántos logs de cada nivel\" ya conocés dos caminos: el dict con .get(key, 0) y Counter. En el reporte JSON final, ¿hay alguna trampa con Counter?",
      a: "Una sutil: Counter ES un dict (subclase), así que json.dump lo serializa sin drama. La trampa inversa: al cargar el JSON vuelve como dict común, no Counter — el round-trip pierde la clase. Para este reporte da igual (solo importan los datos), pero el principio general importa: JSON solo conoce SUS tipos; todo lo demás se aplana al guardar."
    }
  ],
  exercises: [
    {
      id: "int-proj-1",
      title: "Procesador de logs del servidor",
      difficulty: 5,
      prompt: "<p>El starter genera <code>server.log</code> (con 3 líneas corruptas incluidas). Implementá:</p><ol><li><code>parse_line(line)</code> → dict <code>{\"date\": ..., \"level\": ..., \"message\": ...}</code> o <code>None</code> si la línea es corrupta. Formato válido: <code>fecha | NIVEL | mensaje</code> — exactamente 3 campos al hacer <code>split(\" | \")</code>, y el nivel debe ser uno de <code>INFO</code>, <code>WARN</code>, <code>ERROR</code>. Limpiá espacios/saltos de línea.</li><li><code>load_logs(path)</code> → lista de dicts parseados, <strong>salteando</strong> corruptas y líneas vacías (leé el archivo, aplicá parse_line, filtrá los None — una comprehension puede con casi todo).</li><li><code>count_levels(logs)</code> → dict/Counter <code>{nivel: cantidad}</code>.</li><li><code>error_messages(logs)</code> → lista con los mensajes (solo el texto) de los logs nivel ERROR.</li><li><code>save_report(path, logs)</code> → escribe un JSON con la forma <code>{\"total\": N, \"by_level\": {...}, \"errors\": [...]}</code> usando las funciones anteriores. Devolvé el dict del reporte.</li></ol>",
      starter: "import json\nfrom collections import Counter\n\nlog_content = \"\"\"2026-06-01 | INFO | server started\n2026-06-01 | INFO | user alice connected\n2026-06-01 | WARN | high memory usage\nesto no es un log valido\n2026-06-02 | ERROR | database timeout\n2026-06-02 | INFO | user bob connected\n2026-06-02 | | linea rota\n2026-06-02 | ERROR | disk full\notra linea corrupta | sin nivel\n2026-06-03 | WARN | slow response\n2026-06-03 | INFO | backup completed\n\"\"\"\n\nwith open(\"server.log\", \"w\") as f:\n    f.write(log_content)\n\ndef parse_line(line):\n    pass\n\ndef load_logs(path):\n    pass\n\ndef count_levels(logs):\n    pass\n\ndef error_messages(logs):\n    pass\n\ndef save_report(path, logs):\n    pass\n\n# proba mientras desarrollas:\nlogs = load_logs(\"server.log\")\nprint(len(logs), \"logs validos\")\nprint(count_levels(logs))\nprint(error_messages(logs))\n",
      tests: "_logs = load_logs(\"server.log\")\nassert len(_logs) == 8, f\"deberian quedar 8 logs validos (hay 3 corruptos), quedaron {len(_logs)}\"\nassert _logs[0] == {\"date\": \"2026-06-01\", \"level\": \"INFO\", \"message\": \"server started\"}, f\"primer log: {_logs[0]}\"\nassert parse_line(\"esto no es un log valido\") is None, \"linea sin separadores: None\"\nassert parse_line(\"2026-06-02 | | linea rota\") is None, \"nivel vacio: None\"\nassert parse_line(\"a | NOPE | b\") is None, \"nivel desconocido: None\"\nassert parse_line(\"2026-01-01 | ERROR | x\") == {\"date\": \"2026-01-01\", \"level\": \"ERROR\", \"message\": \"x\"}\n_counts = count_levels(_logs)\nassert dict(_counts) == {\"INFO\": 4, \"WARN\": 2, \"ERROR\": 2}, f\"count_levels: {dict(_counts)}\"\nassert error_messages(_logs) == [\"database timeout\", \"disk full\"], f\"error_messages: {error_messages(_logs)}\"\n_report = save_report(\"report.json\", _logs)\nassert _report[\"total\"] == 8 and _report[\"by_level\"][\"ERROR\"] == 2, f\"report: {_report}\"\nimport json as _json\nwith open(\"report.json\") as _f:\n    _on_disk = _json.load(_f)\nassert _on_disk[\"total\"] == 8 and _on_disk[\"errors\"] == [\"database timeout\", \"disk full\"], \"el JSON en disco no coincide\"",
      solution: "import json\nfrom collections import Counter\n\ndef parse_line(line):\n    parts = line.strip().split(\" | \")\n    if len(parts) != 3:\n        return None\n    date, level, message = [p.strip() for p in parts]\n    if level not in (\"INFO\", \"WARN\", \"ERROR\"):\n        return None\n    if not date or not message:\n        return None\n    return {\"date\": date, \"level\": level, \"message\": message}\n\ndef load_logs(path):\n    with open(path) as f:\n        parsed = [parse_line(line) for line in f if line.strip()]\n    return [log for log in parsed if log is not None]\n\ndef count_levels(logs):\n    return Counter(log[\"level\"] for log in logs)\n\ndef error_messages(logs):\n    return [log[\"message\"] for log in logs if log[\"level\"] == \"ERROR\"]\n\ndef save_report(path, logs):\n    report = {\n        \"total\": len(logs),\n        \"by_level\": dict(count_levels(logs)),\n        \"errors\": error_messages(logs),\n    }\n    with open(path, \"w\") as f:\n        json.dump(report, f)\n    return report",
      explanation: "<p>Mirá el pipeline completo que armaste: <strong>texto crudo → parseo defensivo → estructuras limpias → análisis → reporte serializado</strong>. Eso es, sin exagerar, la arquitectura de la ingeniería de datos entera — de un script de 50 líneas a un cluster de Spark.</p><p><strong><code>parse_line</code></strong> es la frontera: guard clauses en cascada (¿3 campos? ¿nivel conocido? ¿campos no vacíos?) y solo entonces el dict. Todo lo que pasa esa puerta es confiable — por eso el resto de las funciones no necesitan ni un try.</p><p><strong><code>load_logs</code></strong>: dos comprehensions encadenadas — parsear (salteando vacías con el if) y filtrar Nones. El detalle <code>if log is not None</code> en vez de <code>if log</code>: son equivalentes acá, pero el explícito documenta QUÉ filtrás.</p><p><strong><code>count_levels</code></strong>: Counter alimentado por una generator expression — ni siquiera construye la lista intermedia de niveles.</p><p><strong><code>save_report</code></strong> compone TODO: llama a las otras funciones (cero lógica repetida), arma el dict y lo serializa. Fijate <code>dict(count_levels(...))</code>: convierte el Counter a dict puro para un JSON predecible.</p><p>Si este proyecto te salió — aunque haya costado — ya escribís Python idiomático de verdad. El nivel Avanzado te va a dar las herramientas de arquitectura: clases, decoradores, generadores.</p>",
      hints: ["Empezá por parse_line sola: probala con Ejecutar contra líneas buenas y corruptas antes de seguir.", "parse_line: split(\" | \"), chequear len == 3, validar el nivel contra (\"INFO\", \"WARN\", \"ERROR\"), y recién armar el dict. Ante cualquier problema: return None.", "load_logs: [parse_line(l) for l in f if l.strip()] te da dicts y Nones; una segunda comprehension filtra los None.", "save_report NO recalcula nada: llama a count_levels y error_messages, arma el dict, json.dump, y devuelve el dict."]
    }
  ]
}
]);
