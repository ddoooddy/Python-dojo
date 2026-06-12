/* ============================================================
   BÁSICO — parte 2: dicts y sets, condicionales, loops,
   funciones y proyecto integrador
   ============================================================ */
DOJO_PUSH("basico", [

/* ---------------- Diccionarios y sets ---------------- */
{
  id: "dicts",
  title: "Diccionarios y sets",
  intro: "El diccionario (<code>dict</code>) asocia <strong>claves con valores</strong> y es, junto con la lista, la estructura central de Python. El <code>set</code> es una colección sin orden ni duplicados, ideal para preguntas de pertenencia y operaciones de conjuntos.",
  socratic: [
    {
      q: "Podrías guardar nombres en una lista y edades en otra: <code>names[3]</code> va con <code>ages[3]</code>. ¿Qué problemas le ves a ese diseño frente a un diccionario <code>{nombre: edad}</code>?",
      a: "Las listas paralelas son frágiles: si ordenás una y no la otra, o insertás en una sola, la correspondencia se rompe en silencio. Además buscar la edad de \"ana\" obliga a recorrer toda la lista. El dict hace la asociación <em>explícita e indestructible</em>, y encuentra cualquier clave casi al instante, tenga 10 entradas o 10 millones."
    },
    {
      q: "¿Qué creés que pasa si pedís <code>person[\"salario\"]</code> y esa clave no existe? ¿Y qué harías cuando \"puede o no estar\"?",
      a: "Tira <code>KeyError</code> — ruidoso a propósito: pediste algo que no está. Cuando la ausencia es un caso esperado, usás <code>person.get(\"salario\")</code>, que devuelve <code>None</code> (o un default: <code>person.get(\"salario\", 0)</code>) en vez de explotar. La elección entre <code>[]</code> y <code>.get()</code> comunica si la clave <em>debería</em> existir o no."
    },
    {
      q: "¿Por qué un dict puede tener como clave un string o una tupla, pero no una lista?",
      a: "El dict ubica cada clave calculando su <em>hash</em>, una huella numérica que debe ser estable para siempre. Los objetos mutables (listas, otros dicts) podrían cambiar después de guardados y su huella quedaría desactualizada — el dict ya no los encontraría. Por eso solo los inmutables (str, int, tuple…) pueden ser claves."
    },
    {
      q: "Tenés 10.000 emails y querés saber si <code>\"x@y.com\"</code> está. ¿Lista o set? ¿Por qué?",
      a: "Set, sin dudarlo. <code>email in lista</code> revisa elemento por elemento (hasta 10.000 comparaciones); <code>email in conjunto</code> usa hashing y responde casi instantáneo, sin importar el tamaño. Regla práctica: si la pregunta principal es \"¿está o no está?\" o necesitás eliminar duplicados, es un set."
    },
    {
      q: "<code>{1, 2, 3}</code> es un set y <code>{\"a\": 1}</code> es un dict — los dos usan llaves. ¿Y <code>{}</code> a secas, qué crea?",
      a: "Un <strong>dict vacío</strong> — el dict llegó primero al lenguaje y se quedó con la sintaxis. Para un set vacío tenés que escribir <code>set()</code>. Es una trampa menor pero clásica de entrevista."
    }
  ],
  exercises: [
    {
      id: "bas-dict-1",
      title: "Ficha de una persona",
      difficulty: 1,
      prompt: "<p>Armá la ficha de un usuario:</p><ol><li>Creá el dict <code>person</code> con las claves <code>\"name\"</code> → <code>\"Grace\"</code>, <code>\"age\"</code> → <code>36</code>, <code>\"city\"</code> → <code>\"Rosario\"</code>.</li><li>Guardá en <code>person_name</code> el valor de la clave <code>\"name\"</code>.</li><li>Agregale al dict la clave <code>\"email\"</code> con el valor <code>\"grace@hopper.dev\"</code> (los dicts sí son mutables).</li></ol>",
      starter: "# 1. crear el dict\n\n# 2. leer una clave\n\n# 3. agregar la clave email\n",
      tests: "assert person.get(\"name\") == \"Grace\" and person.get(\"age\") == 36 and person.get(\"city\") == \"Rosario\", f\"El dict no tiene las claves/valores esperados: {person}\"\nassert person_name == \"Grace\", f\"person_name: {person_name}\"\nassert person.get(\"email\") == \"grace@hopper.dev\", \"Falta agregar la clave 'email' despues de crear el dict\"\nassert len(person) == 4, f\"person deberia tener 4 claves, tiene {len(person)}\"",
      solution: "person = {\"name\": \"Grace\", \"age\": 36, \"city\": \"Rosario\"}\nperson_name = person[\"name\"]\nperson[\"email\"] = \"grace@hopper.dev\"",
      explanation: "<p>La sintaxis simétrica es la gracia: <code>person[\"name\"]</code> <em>lee</em> y <code>person[\"email\"] = ...</code> <em>escribe</em> — si la clave no existía, la crea; si existía, la pisa.</p><p>Fijate el contraste con las listas: ahí accedés por <em>posición</em> (que no significa nada por sí misma), acá por <em>nombre</em> (que documenta qué es cada cosa). Un dict es la traducción directa de un objeto JSON, el formato en que viaja prácticamente toda la información en la web — por eso dominar dicts es dominar el 80% del trabajo con APIs.</p>",
      hints: ["Sintaxis: {\"clave\": valor, \"otra\": valor}. Las claves string van con comillas.", "Para agregar una clave nueva: person[\"email\"] = \"...\" — igual que para modificar una existente."]
    },
    {
      id: "bas-dict-2",
      title: "Claves que pueden faltar",
      difficulty: 2,
      prompt: "<p>Tenés el stock de una librería: <code>stock = {\"python crash course\": 3, \"fluent python\": 0, \"clean code\": 7}</code>.</p><ul><li><code>fluent_stock</code>: el stock de <code>\"fluent python\"</code> (acceso normal).</li><li><code>dune_stock</code>: el stock de <code>\"dune\"</code>… que no está en el dict. Usá <code>.get()</code> para obtener <code>0</code> en vez de un error (probá primero con corchetes y mirá el <code>KeyError</code>).</li><li><code>has_clean_code</code>: un booleano: ¿está <code>\"clean code\"</code> en el stock? (operador <code>in</code>)</li><li>Eliminá <code>\"fluent python\"</code> del dict con <code>del</code> (se agotó y descatalogó).</li></ul>",
      starter: "stock = {\"python crash course\": 3, \"fluent python\": 0, \"clean code\": 7}\n\n# fluent_stock = ?\n# dune_stock = ?  (sin que explote)\n# has_clean_code = ?\n# eliminar \"fluent python\"\n",
      tests: "assert fluent_stock == 0, f\"fluent_stock: {fluent_stock}\"\nassert dune_stock == 0, f\"dune_stock deberia ser 0 (default de .get), es {dune_stock}\"\nassert has_clean_code is True, f\"has_clean_code deberia ser True, es {has_clean_code}\"\nassert \"fluent python\" not in stock, \"Falta eliminar 'fluent python' con del\"\nassert len(stock) == 2, f\"El dict deberia quedar con 2 claves: {stock}\"",
      solution: "stock = {\"python crash course\": 3, \"fluent python\": 0, \"clean code\": 7}\n\nfluent_stock = stock[\"fluent python\"]\ndune_stock = stock.get(\"dune\", 0)\nhas_clean_code = \"clean code\" in stock\ndel stock[\"fluent python\"]",
      explanation: "<p>Tres maneras de preguntar, cada una con su contrato:</p><p><code>stock[clave]</code> — \"esta clave <strong>tiene</strong> que estar; si no está, es un bug y quiero el <code>KeyError</code>\". <br><code>stock.get(clave, default)</code> — \"puede no estar, y en ese caso este valor me sirve\". <br><code>clave in stock</code> — \"solo quiero saber si está\" (nota: <code>in</code> pregunta por las <em>claves</em>, no los valores).</p><p>Elegir la forma correcta es documentación gratis: quien lee <code>.get(\"dune\", 0)</code> entiende al instante que la ausencia es un caso normal del negocio, no un error.</p>",
      hints: ["stock.get(clave, valor_default) nunca explota: si la clave falta, devuelve el default.", "El operador in con dicts pregunta por claves: \"clean code\" in stock. Para borrar: del stock[clave]."]
    },
    {
      id: "bas-dict-3",
      title: "Sets: la máquina de deduplicar",
      difficulty: 3,
      prompt: "<p>Dos cursos comparten alumnos:</p><pre>python_course = [\"ana\", \"beto\", \"carla\", \"ana\", \"david\", \"beto\"]\nml_course = [\"carla\", \"eva\", \"david\", \"franco\"]</pre><ul><li><code>python_students</code>: un <strong>set</strong> con los alumnos únicos del curso de Python (la lista tiene duplicados por un bug del sistema de inscripción).</li><li><code>both</code>: set con quienes cursan <strong>ambos</strong> (intersección, operador <code>&amp;</code>).</li><li><code>everyone</code>: set con todos los alumnos de los dos cursos, sin repetir (unión, operador <code>|</code>).</li><li><code>only_python</code>: quienes están en Python pero <strong>no</strong> en ML (diferencia, operador <code>-</code>).</li></ul>",
      starter: "python_course = [\"ana\", \"beto\", \"carla\", \"ana\", \"david\", \"beto\"]\nml_course = [\"carla\", \"eva\", \"david\", \"franco\"]\n\n# python_students = ?\n# both = ?\n# everyone = ?\n# only_python = ?\n",
      tests: "assert python_students == {\"ana\", \"beto\", \"carla\", \"david\"}, f\"python_students: {python_students}\"\nassert both == {\"carla\", \"david\"}, f\"both: {both}\"\nassert everyone == {\"ana\", \"beto\", \"carla\", \"david\", \"eva\", \"franco\"}, f\"everyone: {everyone}\"\nassert only_python == {\"ana\", \"beto\"}, f\"only_python: {only_python}\"",
      solution: "python_course = [\"ana\", \"beto\", \"carla\", \"ana\", \"david\", \"beto\"]\nml_course = [\"carla\", \"eva\", \"david\", \"franco\"]\n\npython_students = set(python_course)\nml_students = set(ml_course)\nboth = python_students & ml_students\neveryone = python_students | ml_students\nonly_python = python_students - ml_students",
      explanation: "<p><code>set(lista)</code> elimina duplicados en una sola operación — el idiom estándar de deduplicación (con la advertencia de que el orden se pierde: los sets no tienen orden).</p><p>Lo potente son los operadores de conjunto: <code>&amp;</code> (intersección), <code>|</code> (unión), <code>-</code> (diferencia). Sin sets, \"¿quiénes cursan ambos?\" sería un loop anidado comparando todos contra todos; con sets es <em>una expresión que se lee como la pregunta</em>. Cuando un problema se enuncia con palabras como \"en común\", \"todos sin repetir\", \"los que faltan\" — es teoría de conjuntos, y Python la trae incorporada.</p>",
      hints: ["set(lista) crea un set descartando los duplicados automáticamente.", "Con sets: A & B = en ambos, A | B = en alguno, A - B = en A pero no en B."]
    },
    {
      id: "bas-dict-4",
      title: "Estructuras anidadas (como un JSON real)",
      difficulty: 4,
      prompt: "<p>Así llega la respuesta de una API típica — dicts adentro de dicts, con listas en el medio:</p><pre>response = {\n    \"user\": {\n        \"name\": \"turing\",\n        \"skills\": [\"python\", \"logic\", \"crypto\"],\n        \"address\": {\"city\": \"Londres\", \"zip\": \"NW1\"}\n    },\n    \"active\": True\n}</pre><ul><li><code>city</code>: la ciudad del usuario (navegación encadenada).</li><li><code>second_skill</code>: la segunda skill de la lista.</li><li><code>n_skills</code>: cuántas skills tiene.</li><li>Agregá la skill <code>\"ai\"</code> al final de la lista de skills <strong>dentro de la estructura</strong>.</li></ul>",
      starter: "response = {\n    \"user\": {\n        \"name\": \"turing\",\n        \"skills\": [\"python\", \"logic\", \"crypto\"],\n        \"address\": {\"city\": \"Londres\", \"zip\": \"NW1\"}\n    },\n    \"active\": True\n}\n\n# city = ?\n# second_skill = ?\n# n_skills = ?\n# agregar \"ai\" a las skills dentro de response\n",
      tests: "assert city == \"Londres\", f\"city: {city}\"\nassert second_skill == \"logic\", f\"second_skill: {second_skill}\"\nassert n_skills == 3, f\"n_skills deberia ser 3 (antes de agregar 'ai'), es {n_skills}\"\nassert response[\"user\"][\"skills\"] == [\"python\", \"logic\", \"crypto\", \"ai\"], f\"Las skills dentro de response deberian terminar con 'ai': {response['user']['skills']}\"",
      solution: "response = {\n    \"user\": {\n        \"name\": \"turing\",\n        \"skills\": [\"python\", \"logic\", \"crypto\"],\n        \"address\": {\"city\": \"Londres\", \"zip\": \"NW1\"}\n    },\n    \"active\": True\n}\n\ncity = response[\"user\"][\"address\"][\"city\"]\nsecond_skill = response[\"user\"][\"skills\"][1]\nn_skills = len(response[\"user\"][\"skills\"])\nresponse[\"user\"][\"skills\"].append(\"ai\")",
      explanation: "<p>La técnica es leer el encadenamiento de izquierda a derecha, un nivel por vez: <code>response[\"user\"]</code> es un dict → <code>[\"address\"]</code> es otro dict → <code>[\"city\"]</code> es el string. Cada paso te deja parado en una estructura más interna.</p><p>El último punto esconde la idea más profunda: <code>response[\"user\"][\"skills\"]</code> te devuelve <strong>la lista misma, no una copia</strong> — es el aliasing de las listas jugando a tu favor. Hacerle <code>.append(\"ai\")</code> modifica la lista \"dentro\" de la estructura, porque es la misma lista. También podrías guardarla primero (<code>skills = response[\"user\"][\"skills\"]</code>) y mutarla por esa referencia: mismo efecto.</p>",
      hints: ["Encadená corchetes: response[\"user\"][\"address\"][\"city\"] — un nivel por vez.", "response[\"user\"][\"skills\"] ES la lista (no una copia): podés hacerle .append() directamente."]
    },
    {
      id: "bas-dict-5",
      title: "Configuración y asistencia",
      difficulty: 4,
      prompt: "<p>Dos mini-problemas del mundo real:</p><p><strong>A)</strong> Tu app tiene configuración por defecto, y el usuario pisó algunas opciones:</p><pre>defaults = {\"theme\": \"light\", \"font_size\": 14, \"autosave\": True}\nuser_prefs = {\"theme\": \"dark\", \"font_size\": 16}</pre><p>Creá <code>config</code>: un dict <strong>nuevo</strong> donde las preferencias del usuario pisan a los defaults (resultado: theme dark, font_size 16, autosave True). Ni <code>defaults</code> ni <code>user_prefs</code> deben modificarse.</p><p><strong>B)</strong> <code>invited = {\"ana\", \"beto\", \"carla\", \"david\"}</code> y <code>confirmed = {\"beto\", \"david\"}</code>. Creá <code>missing</code>: el set de invitados que todavía no confirmaron.</p>",
      starter: "defaults = {\"theme\": \"light\", \"font_size\": 14, \"autosave\": True}\nuser_prefs = {\"theme\": \"dark\", \"font_size\": 16}\n\n# config = ?\n\ninvited = {\"ana\", \"beto\", \"carla\", \"david\"}\nconfirmed = {\"beto\", \"david\"}\n\n# missing = ?\n",
      tests: "assert config == {\"theme\": \"dark\", \"font_size\": 16, \"autosave\": True}, f\"config: {config}\"\nassert defaults == {\"theme\": \"light\", \"font_size\": 14, \"autosave\": True}, \"No modifiques defaults: crea un dict nuevo\"\nassert user_prefs == {\"theme\": \"dark\", \"font_size\": 16}, \"No modifiques user_prefs\"\nassert missing == {\"ana\", \"carla\"}, f\"missing: {missing}\"",
      solution: "defaults = {\"theme\": \"light\", \"font_size\": 14, \"autosave\": True}\nuser_prefs = {\"theme\": \"dark\", \"font_size\": 16}\n\nconfig = {**defaults, **user_prefs}\n# alternativa: config = defaults.copy(); config.update(user_prefs)\n\ninvited = {\"ana\", \"beto\", \"carla\", \"david\"}\nconfirmed = {\"beto\", \"david\"}\n\nmissing = invited - confirmed",
      explanation: "<p><strong>A)</strong> <code>{**defaults, **user_prefs}</code> desempaca ambos dicts dentro de uno nuevo, en orden: primero entran los defaults, después las preferencias del usuario <strong>pisando las claves repetidas</strong>. El orden es la lógica: \"lo específico le gana a lo genérico\". Este patrón (defaults + overrides) está en cada sistema de configuración que existe. La alternativa clásica — <code>copy()</code> + <code>update()</code> — hace lo mismo en dos pasos; el detalle crucial es el <code>.copy()</code>: <code>update</code> muta, y sin copia destruirías los defaults.</p><p><strong>B)</strong> <code>invited - confirmed</code>: la diferencia de conjuntos <em>es</em> la pregunta \"¿quiénes faltan?\". Cuando modelás con la estructura correcta, la respuesta es un operador.</p>",
      hints: ["Para fusionar sin tocar los originales: {**dict1, **dict2} — el de la derecha gana en las claves repetidas.", "\"Invitados que no confirmaron\" es una diferencia de conjuntos: ¿qué operador era?"]
    }
  ]
},

/* ---------------- Condicionales ---------------- */
{
  id: "condicionales",
  title: "Condicionales",
  intro: "Acá el código empieza a <strong>decidir</strong>: <code>if</code>, <code>elif</code>, <code>else</code>, los operadores de comparación y los lógicos <code>and</code>, <code>or</code>, <code>not</code>.",
  socratic: [
    {
      q: "¿Por qué Python usa <code>==</code> para comparar si <code>=</code> ya existe? ¿Qué haría <code>if x = 5:</code> si se permitiera?",
      a: "<code>=</code> <em>asigna</em> y <code>==</code> <em>pregunta</em>. Si <code>if x = 5:</code> se permitiera (como en C), un dedo dormido convertiría una pregunta en una asignación silenciosa: x pasaría a valer 5 y la condición sería siempre verdadera. Python directamente lo hace error de sintaxis — elimina una clase entera de bugs."
    },
    {
      q: "En una cadena <code>if / elif / elif / else</code>, ¿cuántas ramas se ejecutan como máximo? ¿Y qué cambia si en vez de <code>elif</code> escribís varios <code>if</code> seguidos?",
      a: "Exactamente <strong>una</strong>: Python evalúa de arriba hacia abajo y al primer verdadero entra, ejecuta y <em>sale de toda la cadena</em>. Varios <code>if</code> independientes, en cambio, se evalúan todos — pueden ejecutarse varios. <code>elif</code> dice \"estas opciones son mutuamente excluyentes\"; <code>if</code>s sueltos dicen \"chequeos independientes\". Elegir mal entre ambos es un bug clásico."
    },
    {
      q: "El orden de los <code>elif</code> importa. Si clasificás notas con <code>if score &gt;= 60</code> primero y <code>elif score &gt;= 90</code> después, ¿qué nota recibe un 95?",
      a: "La del 60, ¡incorrecta! Como 95 ≥ 60 es verdadero, entra en la primera rama y nunca llega a evaluar la del 90. Regla: cuando las condiciones se solapan, ordenalas de la <strong>más específica/exigente a la más general</strong>. El <code>else</code> final atrapa todo lo que no matcheó."
    },
    {
      q: "Python deja escribir <code>if name:</code> sin comparar con nada. ¿Qué significa? ¿Qué valores son \"falsos\"?",
      a: "Todo valor tiene un \"valor de verdad\" (truthiness). Son falsos: <code>0</code>, <code>0.0</code>, <code>\"\"</code>, <code>[]</code>, <code>{}</code>, <code>set()</code>, <code>None</code> y <code>False</code> — en esencia, \"lo vacío y lo nulo\". Todo lo demás es verdadero. <code>if name:</code> se lee \"si hay nombre\" y es más idiomático que <code>if name != \"\"</code>."
    },
    {
      q: "¿Qué devuelve <code>x = \"mayor\" if age &gt;= 18 else \"menor\"</code>? ¿Cuándo conviene esta forma y cuándo NO?",
      a: "Es el <em>operador ternario</em>: una expresión que vale una cosa u otra según la condición — perfecta para elegir <strong>un valor</strong> en una línea. Conviene cuando es corta y clara. NO conviene anidarla o meterle lógica compleja: en cuanto cuesta leerla de un vistazo, volvé al if normal. La legibilidad manda."
    }
  ],
  exercises: [
    {
      id: "bas-cond-1",
      title: "Positivo, negativo o cero",
      difficulty: 1,
      prompt: "<p>Clasificá el número <code>n</code>: guardá en <code>result</code> el string <code>\"positivo\"</code>, <code>\"negativo\"</code> o <code>\"cero\"</code> según corresponda, usando <code>if</code> / <code>elif</code> / <code>else</code>.</p><p>El starter trae <code>n = -7</code>, pero escribí la lógica de forma que funcione con <em>cualquier</em> valor: nada de <code>result = \"negativo\"</code> a mano. Cuando pases los tests, cambiá n a 5 y a 0 y volvé a ejecutar para ver las tres ramas en acción.</p>",
      starter: "n = -7\n\n# if / elif / else\n",
      tests: "assert result == \"negativo\", f\"Con n = -7, result deberia ser 'negativo', es '{result}'\"",
      solution: "n = -7\n\nif n > 0:\n    result = \"positivo\"\nelif n < 0:\n    result = \"negativo\"\nelse:\n    result = \"cero\"",
      explanation: "<p>La estructura cubre los tres casos posibles sin dejar huecos ni solapamientos: mayor que cero, menor que cero, y el <code>else</code> atrapa lo único que queda (el cero exacto).</p><p>Fijate que el <code>else</code> no dice <code>elif n == 0</code> — podría, pero el <code>else</code> comunica mejor: \"todo lo demás\". Cuando las ramas son lógicamente exhaustivas, el else final te garantiza que <code>result</code> siempre se asigna, pase lo que pase. Si usaras tres <code>if</code> con condiciones que no cubren todo, podrías terminar con <code>result</code> sin definir — un <code>NameError</code> esperando su momento.</p><p>La <strong>indentación</strong> no es decorativa: los 4 espacios son la sintaxis con la que Python sabe qué línea pertenece a qué rama.</p>",
      hints: ["Estructura: if condicion: / elif otra: / else: — y el cuerpo de cada rama va indentado con 4 espacios.", "Las tres condiciones: n > 0, n < 0, y el resto (else) solo puede ser cero."]
    },
    {
      id: "bas-cond-2",
      title: "De puntaje a letra",
      difficulty: 2,
      prompt: "<p>Convertí puntajes a calificación con esta escala: 90+ → <code>\"A\"</code>, 80–89 → <code>\"B\"</code>, 70–79 → <code>\"C\"</code>, 60–69 → <code>\"D\"</code>, menos de 60 → <code>\"F\"</code>.</p><p>Aplicá la <strong>misma cadena if/elif</strong> dos veces (copiala, o mejor: notá lo incómodo de copiarla — en el tema funciones vas a poder evitarlo):</p><ul><li><code>grade1</code>: la letra para <code>score1 = 87</code></li><li><code>grade2</code>: la letra para <code>score2 = 45</code></li></ul><p>El orden de los <code>elif</code> importa: pensá qué pasa si chequeás <code>&gt;= 60</code> antes que <code>&gt;= 90</code>.</p>",
      starter: "score1 = 87\nscore2 = 45\n\n# grade1 = ?\n\n# grade2 = ?\n",
      tests: "assert grade1 == \"B\", f\"Con 87, grade1 deberia ser 'B', es '{grade1}'\"\nassert grade2 == \"F\", f\"Con 45, grade2 deberia ser 'F', es '{grade2}'\"",
      solution: "score1 = 87\nscore2 = 45\n\nif score1 >= 90:\n    grade1 = \"A\"\nelif score1 >= 80:\n    grade1 = \"B\"\nelif score1 >= 70:\n    grade1 = \"C\"\nelif score1 >= 60:\n    grade1 = \"D\"\nelse:\n    grade1 = \"F\"\n\nif score2 >= 90:\n    grade2 = \"A\"\nelif score2 >= 80:\n    grade2 = \"B\"\nelif score2 >= 70:\n    grade2 = \"C\"\nelif score2 >= 60:\n    grade2 = \"D\"\nelse:\n    grade2 = \"F\"",
      explanation: "<p>El truco de diseño: como la cadena va <strong>de mayor a menor</strong>, cada <code>elif</code> ya sabe que las condiciones anteriores fallaron. <code>elif score &gt;= 80</code> no necesita decir \"y menor que 90\" — si fuera 90 o más, jamás habría llegado hasta acá. El orden descendente hace que cada condición sea simple.</p><p>Si lo hubieras escrito ascendente (<code>&gt;= 60</code> primero), un 87 entraría en la primera rama y saldría con \"D\". Mismo código, otro orden, bug silencioso.</p><p>Y sí: copiar la cadena dos veces <em>duele</em>. Ese dolor tiene nombre — violación del principio DRY (Don't Repeat Yourself) — y su cura es la función, que está a tres temas de distancia. Acordate de este ejercicio cuando llegues.</p>",
      hints: ["Ordená de la nota más alta a la más baja: if >= 90, elif >= 80, … y else para la F.", "Si un 95 te da \"D\", el orden de tus condiciones está al revés."]
    },
    {
      id: "bas-cond-3",
      title: "Validador de username",
      difficulty: 3,
      prompt: "<p>Un username es válido si cumple <strong>todas</strong> estas reglas:</p><ul><li>No está vacío</li><li>No contiene espacios</li><li>Está todo en minúsculas</li><li>Tiene como máximo 15 caracteres</li></ul><p>Calculá <code>is_valid</code> (booleano) para <code>username = \"ada lovelace\"</code> usando <strong>una sola expresión</strong> con <code>and</code> (sin if). Ayudas: <code>\" \" in s</code>, <code>s == s.lower()</code>, <code>len(s)</code>.</p>",
      starter: "username = \"ada lovelace\"\n\n# is_valid = ?  (una expresion booleana, sin if)\n",
      tests: "assert is_valid == False, f\"'ada lovelace' tiene un espacio: is_valid deberia ser False, es {is_valid}\"\nusername2 = \"ada_lovelace\"\nis_valid2 = len(username2) > 0 and \" \" not in username2 and username2 == username2.lower() and len(username2) <= 15\nassert is_valid2 == True, \"chequeo interno\"",
      solution: "username = \"ada lovelace\"\n\nis_valid = (\n    len(username) > 0\n    and \" \" not in username\n    and username == username.lower()\n    and len(username) <= 15\n)",
      explanation: "<p>Una condición compuesta con <code>and</code> es ella misma un valor booleano — no necesitás <code>if cond: is_valid = True else: is_valid = False</code>, que es el rodeo más común del primer año. La expresión <em>ya es</em> el booleano.</p><p>Detalles finos: <code>\" \" not in username</code> se lee como castellano (\"espacio no está en username\"). Y el chequeo de minúsculas por comparación — <code>username == username.lower()</code> — es un truco elegante: si bajarlo a minúsculas no lo cambia, es que ya estaba en minúsculas.</p><p>Bonus de eficiencia: <code>and</code> hace <em>short-circuit</em> — apenas una condición da falso, las siguientes ni se evalúan.</p>",
      hints: ["No hace falta if: una expresión con and ya ES un booleano. is_valid = cond1 and cond2 and …", "\"Sin espacios\" es: \" \" not in username. \"Todo minúsculas\": username == username.lower()."]
    },
    {
      id: "bas-cond-4",
      title: "El operador ternario",
      difficulty: 3,
      prompt: "<p>Sistema de entradas de un cine, con <code>age = 15</code>:</p><ul><li><code>category</code>: <code>\"mayor\"</code> si age es 18 o más, si no <code>\"menor\"</code> — <strong>en una sola línea</strong>, con la forma <code>valor_si if condicion else valor_no</code>.</li><li><code>price</code>: los mayores pagan 100, los menores 60 — también en una línea (reusá <code>category</code> o la condición, como prefieras).</li><li><code>label</code>: el string <code>menor - $60</code> armado con un f-string a partir de las dos variables anteriores.</li></ul>",
      starter: "age = 15\n\n# category = ?  (ternario, una linea)\n# price = ?     (ternario, una linea)\n# label = ?     (f-string)\n",
      tests: "assert category == \"menor\", f\"category: {category}\"\nassert price == 60, f\"price: {price}\"\nassert label == \"menor - $60\", f\"label deberia ser 'menor - $60', es '{label}'\"",
      solution: "age = 15\n\ncategory = \"mayor\" if age >= 18 else \"menor\"\nprice = 100 if age >= 18 else 60\nlabel = f\"{category} - ${price}\"",
      explanation: "<p>El ternario de Python se lee en orden natural: \"<em>mayor</em>, si la edad da, sino <em>menor</em>\" — primero el valor optimista, después la condición, después la alternativa. (Compará con el <code>cond ? a : b</code> de otros lenguajes, que pone la condición primero.)</p><p>¿Cuándo usarlo? Cuando elegís <strong>un valor</strong> entre dos según una condición simple — exactamente este caso. ¿Cuándo no? Cuando hay efectos (prints, appends), más de dos opciones, o lógica anidada: ahí el if clásico de varias líneas es más honesto. El ternario es una herramienta de <em>expresividad</em>, no un desafío de compresión.</p>",
      hints: ["La forma es: resultado = valor_a if condicion else valor_b — todo en una línea.", "Para el f-string con el signo pesos: f\"{category} - ${price}\" — el $ es un carácter común dentro del texto."]
    },
    {
      id: "bas-cond-5",
      title: "FizzBuzz (la entrevista clásica)",
      difficulty: 4,
      prompt: "<p>El problema de entrevista más famoso del mundo, en versión \"clasificar un número\": dado <code>n</code>, el resultado es <code>\"FizzBuzz\"</code> si es divisible por 3 <strong>y</strong> por 5, <code>\"Fizz\"</code> si solo por 3, <code>\"Buzz\"</code> si solo por 5, y el número como string si no es divisible por ninguno.</p><p>Aplicalo a estos cuatro casos (sí, copiando la lógica — última vez, lo prometo):</p><ul><li><code>r1</code> para <code>9</code> → <code>\"Fizz\"</code></li><li><code>r2</code> para <code>10</code> → <code>\"Buzz\"</code></li><li><code>r3</code> para <code>30</code> → <code>\"FizzBuzz\"</code></li><li><code>r4</code> para <code>7</code> → <code>\"7\"</code></li></ul><p>La trampa que filtra candidatos: ¿qué pasa si chequeás \"divisible por 3\" <em>antes</em> que \"divisible por ambos\"?</p>",
      starter: "# r1 -> para n = 9\n# r2 -> para n = 10\n# r3 -> para n = 30\n# r4 -> para n = 7\n",
      tests: "assert r1 == \"Fizz\", f\"r1 (9): esperaba 'Fizz', recibi '{r1}'\"\nassert r2 == \"Buzz\", f\"r2 (10): esperaba 'Buzz', recibi '{r2}'\"\nassert r3 == \"FizzBuzz\", f\"r3 (30): esperaba 'FizzBuzz', recibi '{r3}' — pista: el caso 'divisible por ambos' tiene que chequearse PRIMERO\"\nassert r4 == \"7\", f\"r4 (7): esperaba el string '7', recibi {repr(r4)} — tiene que ser string, usa str(n)\"",
      solution: "def fizzbuzz(n):\n    if n % 3 == 0 and n % 5 == 0:\n        return \"FizzBuzz\"\n    elif n % 3 == 0:\n        return \"Fizz\"\n    elif n % 5 == 0:\n        return \"Buzz\"\n    else:\n        return str(n)\n\nr1 = fizzbuzz(9)\nr2 = fizzbuzz(10)\nr3 = fizzbuzz(30)\nr4 = fizzbuzz(7)",
      explanation: "<p>La trampa: 30 es divisible por 3, así que si <code>n % 3 == 0</code> está primero, atrapa al 30 y devuelve \"Fizz\" — nunca llega al caso combinado. Regla general que ya viste con las notas: <strong>en una cadena elif, el caso más específico va primero</strong>. \"Divisible por ambos\" es más específico que \"divisible por 3\".</p><p>En la solución me adelanté y usé una <strong>función</strong> — el tema que viene. Mirala bien: la lógica está escrita <em>una sola vez</em> y se aplica cuatro veces. Eso que te hizo copiar y pegar tres ejercicios seguidos, desaparece. Si la escribiste cuatro veces a mano: perfecto, ahora sabés exactamente qué problema resuelven las funciones.</p><p>(<code>n % 3 == 0</code> es EL idiom de divisibilidad: \"el resto de dividir por 3 es cero\".)</p>",
      hints: ["\"Divisible por 3\" se escribe n % 3 == 0 (resto cero).", "El orden: primero el caso doble (por 3 Y por 5), después los simples. Si 30 te da \"Fizz\", caíste en la trampa.", "Para el caso sin divisores: str(n) convierte el número a string."]
    }
  ]
},

/* ---------------- Loops ---------------- */
{
  id: "loops",
  title: "Loops",
  intro: "Repetir sin copiar y pegar: <code>for</code> para recorrer cosas, <code>while</code> para repetir hasta que algo cambie, y las válvulas de escape <code>break</code> y <code>continue</code>.",
  socratic: [
    {
      q: "Python tiene <code>for</code> y <code>while</code>. Si los dos repiten código… ¿por qué dos? ¿Qué pregunta te hacés para elegir?",
      a: "La pregunta es: <strong>¿sé de antemano sobre qué estoy iterando?</strong> Si recorrés algo concreto (una lista, un rango, un archivo) → <code>for</code>. Si repetís \"hasta que pase algo\" sin saber cuántas vueltas tomará (hasta que converja, hasta que el usuario salga) → <code>while</code>. En Python real, el for domina 9 a 1: casi siempre estás recorriendo datos."
    },
    {
      q: "El <code>for</code> de Python no es como el de C (<code>for i=0; i&lt;n; i++</code>). ¿Qué recorre realmente <code>for x in lista:</code>?",
      a: "Recorre <strong>los elementos mismos</strong>, no los índices: en cada vuelta, <code>x</code> ES el elemento. Si venís de otro lenguaje, el reflejo de escribir <code>for i in range(len(lista)): lista[i]</code> es casi siempre innecesario y considerado anti-idiomático. Pedís los índices solo cuando de verdad los necesitás (y para eso está <code>enumerate</code>, que viene pronto)."
    },
    {
      q: "¿Por qué <code>range(1, 101)</code> para los números del 1 al 100? ¿Y qué genera <code>range(5)</code> a secas?",
      a: "Mismo contrato que el slicing: <strong>el final queda afuera</strong> — consistencia total en el lenguaje. <code>range(5)</code> genera 0, 1, 2, 3, 4: empieza en 0 por defecto y son exactamente 5 números. La coherencia inicio-incluido/fin-excluido hace que <code>range(len(x))</code> dé índices válidos siempre."
    },
    {
      q: "El patrón \"acumulador\": <code>total = 0</code> antes del loop, <code>total += x</code> adentro. ¿Por qué la inicialización va AFUERA?",
      a: "Si <code>total = 0</code> estuviera dentro del loop, se reiniciaría a cero en <em>cada vuelta</em> y al final valdría solo el último elemento. El acumulador vive fuera porque su trabajo es <em>sobrevivir</em> a las vueltas, juntando información de todas. Este patrón (inicializar → acumular → usar) es la base de sumas, conteos, máximos, y de medio machine learning."
    },
    {
      q: "¿Qué diferencia hay entre <code>break</code> y <code>continue</code>? ¿Y para qué los usarías en una búsqueda?",
      a: "<code>break</code> abandona el loop entero (\"ya está, encontré lo que buscaba\"); <code>continue</code> salta a la vuelta siguiente (\"este elemento no me interesa, el próximo\"). En una búsqueda típica: <code>continue</code> para saltear inválidos, <code>break</code> apenas aparece el resultado — sin recorrer el resto al cuete."
    }
  ],
  exercises: [
    {
      id: "bas-loop-1",
      title: "La suma de Gauss",
      difficulty: 1,
      prompt: "<p>Cuenta la leyenda que a Gauss, de niño, lo castigaron a sumar todos los números del 1 al 100 — y respondió en segundos. Vos tenés un loop: sumá los números del 1 al 100 (inclusive) con <code>for</code> y <code>range</code>, acumulando en <code>total</code>.</p><p>(Gauss notó que 1+100 = 2+99 = … = 101, cincuenta veces: 5050. Verificá que tu loop le dé la razón.)</p>",
      starter: "total = 0\n\n# for ... in range(...):\n#     ...\n",
      tests: "assert total == 5050, f\"total deberia ser 5050, es {total}\"",
      solution: "total = 0\n\nfor n in range(1, 101):\n    total += n",
      explanation: "<p>El patrón <strong>acumulador</strong> en su forma más pura: <code>total</code> nace en 0 <em>antes</em> del loop, y cada vuelta le suma un número. Al final, <code>total</code> resume las 100 vueltas.</p><p>El detalle a internalizar: <code>range(1, 101)</code> — el 101 es porque el final queda excluido, igual que en slicing. Escribir <code>range(1, 100)</code> y sumar hasta 99 es el <em>off-by-one error</em>, el bug más cometido en la historia de la programación. Cuando un loop \"da casi bien\", sospechá de los bordes del range.</p><p>(<code>total += n</code> es atajo de <code>total = total + n</code>.)</p>",
      hints: ["range(1, 101) genera del 1 al 100: el final queda afuera, como en slicing.", "Patrón acumulador: total = 0 afuera del loop, total += n adentro."]
    },
    {
      id: "bas-loop-2",
      title: "Bacterias duplicándose",
      difficulty: 2,
      prompt: "<p>Una colonia arranca con <code>population = 1</code> bacteria y se <strong>duplica cada día</strong>. ¿Cuántos días tarda en superar las 1000?</p><p>Acá no sabés de antemano cuántas vueltas hacen falta — es trabajo para <code>while</code>. Arrancá con <code>days = 0</code> y repetí \"duplicar y contar un día\" <em>mientras</em> la población no haya superado 1000. Resultado esperado: <code>days = 10</code> y <code>population = 1024</code>.</p>",
      starter: "population = 1\ndays = 0\n\n# while ...:\n#     ...\n",
      tests: "assert days == 10, f\"days deberia ser 10, es {days}\"\nassert population == 1024, f\"population deberia terminar en 1024, es {population}\"",
      solution: "population = 1\ndays = 0\n\nwhile population <= 1000:\n    population *= 2\n    days += 1",
      explanation: "<p>La anatomía de un <code>while</code> sano tiene tres partes: <strong>estado inicial</strong> (population=1, days=0), <strong>condición de corte</strong> (¿seguimos? mientras population ≤ 1000) y — la que siempre se olvida — <strong>progreso dentro del cuerpo</strong>: <code>population *= 2</code> acerca el loop a su final en cada vuelta. Si el cuerpo no modificara la condición, el loop sería infinito (y en esta herramienta, congelaría la pestaña — el while exige ese cuidado).</p><p>Sutileza de borde: la condición es <code>&lt;= 1000</code> y no <code>&lt; 1000</code> porque \"superar 1000\" significa estrictamente más de 1000: con exactamente 1000 bacterias habría que seguir. Los bordes de la condición del while merecen el mismo respeto que los del range.</p>",
      hints: ["while population <= 1000: — el loop sigue mientras NO haya superado las mil.", "Adentro: duplicar (population *= 2) y contar el día (days += 1). Si te olvidás de duplicar, loop infinito."]
    },
    {
      id: "bas-loop-3",
      title: "El máximo, a mano",
      difficulty: 3,
      prompt: "<p><code>max()</code> existe, pero hoy no: encontrá el valor más grande de <code>nums = [23, 7, 91, 4, 56, 91, 12]</code> con un loop, guardándolo en <code>biggest</code>. De paso contá en <code>comparisons</code> cuántos elementos miraste (debería dar 7).</p><p>¿Por qué a mano? Porque este patrón — \"el mejor hasta ahora\" — es el corazón de la optimización en machine learning, y tenés que poder escribirlo dormido.</p>",
      starter: "nums = [23, 7, 91, 4, 56, 91, 12]\n\n# biggest = ?\n# comparisons = ?\n",
      tests: "assert biggest == 91, f\"biggest deberia ser 91, es {biggest}\"\nassert comparisons == 7, f\"comparisons deberia ser 7 (un vistazo por elemento), es {comparisons}\"",
      solution: "nums = [23, 7, 91, 4, 56, 91, 12]\n\nbiggest = nums[0]\ncomparisons = 0\nfor n in nums:\n    comparisons += 1\n    if n > biggest:\n        biggest = n",
      explanation: "<p>El patrón \"<strong>mejor hasta ahora</strong>\": arrancás asumiendo que el primero es el máximo, y cada elemento nuevo desafía al campeón — si lo supera, lo destrona. Al terminar el recorrido, el campeón es el máximo global.</p><p>La decisión sutil está en la inicialización: <code>biggest = nums[0]</code> y no <code>biggest = 0</code>. ¿Por qué? Probá mentalmente con <code>nums = [-5, -2, -9]</code>: con biggest=0, ¡el resultado sería 0, un número que ni está en la lista! Inicializar con un elemento real hace al algoritmo correcto para cualquier entrada. Este tipo de razonamiento — \"¿con qué entrada se rompe?\" — es el músculo que distingue a quien programa de quien tipea.</p>",
      hints: ["Arrancá con biggest = nums[0] (el primero es el campeón provisional) y recorré desafiándolo.", "Adentro del loop: if n > biggest: biggest = n. Y no te olvides de contar cada vuelta."]
    },
    {
      id: "bas-loop-4",
      title: "break y continue",
      difficulty: 4,
      prompt: "<p>Dos misiones en el mismo ejercicio:</p><p><strong>A)</strong> <code>readings = [12, -1, 30, -99, 18, 25]</code> trae lecturas de sensor; las negativas son errores de medición. Sumá <strong>solo las válidas</strong> en <code>valid_sum</code>, salteando las negativas con <code>continue</code>. → <code>85</code></p><p><strong>B)</strong> Encontrá el <strong>primer</strong> múltiplo de 7 mayor que 100, en <code>first_multiple</code>: recorré <code>range(101, 200)</code> y cortá con <code>break</code> apenas lo encuentres. → <code>105</code></p>",
      starter: "readings = [12, -1, 30, -99, 18, 25]\n\n# A) valid_sum con continue\n\n# B) first_multiple con break\n",
      tests: "assert valid_sum == 85, f\"valid_sum deberia ser 85 (12+30+18+25), es {valid_sum}\"\nassert first_multiple == 105, f\"first_multiple deberia ser 105, es {first_multiple}\"",
      solution: "readings = [12, -1, 30, -99, 18, 25]\n\nvalid_sum = 0\nfor r in readings:\n    if r < 0:\n        continue\n    valid_sum += r\n\nfor n in range(101, 200):\n    if n % 7 == 0:\n        first_multiple = n\n        break",
      explanation: "<p><strong>continue como guardia:</strong> el <code>if r &lt; 0: continue</code> al principio del cuerpo descarta los casos inválidos de entrada, y el resto del loop queda limpio, sin anidar. La alternativa (<code>if r &gt;= 0: valid_sum += r</code>) hace lo mismo; el estilo \"guardia + continue\" gana cuando el procesamiento posterior es largo — evita que todo viva un nivel de indentación adentro.</p><p><strong>break como eficiencia y semántica:</strong> sin el break, el loop seguiría recorriendo hasta 199 y <code>first_multiple</code> terminaría valiendo el <em>último</em> múltiplo (196), no el primero. El break acá no es solo optimización: <em>es la corrección del algoritmo</em>. \"El primero que cumple\" se traduce siempre a \"asignar y break\".</p>",
      hints: ["A) Si la lectura es negativa: continue (saltar a la siguiente). Si no, acumular.", "B) Probá n % 7 == 0 para cada n; al primer acierto guardá y break. Sin el break te quedás con el ÚLTIMO múltiplo, no el primero."]
    },
    {
      id: "bas-loop-5",
      title: "Pares que suman 10 (loops anidados)",
      difficulty: 5,
      prompt: "<p>Dado <code>nums = [3, 7, 1, 9, 5, 5, 2]</code>, contá en <code>pairs</code> cuántos <strong>pares de posiciones distintas</strong> suman exactamente 10. Acá son 3: (3,7), (1,9) y (5,5).</p><p>Vas a necesitar un loop adentro de otro. El detalle difícil: no contar dos veces el mismo par — el truco es que el segundo índice arranque <strong>después</strong> del primero: <code>range(i + 1, len(nums))</code>. Acá sí necesitás índices, no elementos: ¿se entiende por qué?</p>",
      starter: "nums = [3, 7, 1, 9, 5, 5, 2]\n\npairs = 0\n# for i in range(...):\n#     for j in range(...):\n#         ...\n",
      tests: "assert pairs == 3, f\"pairs deberia ser 3, es {pairs}. Si te dio 6, estas contando cada par dos veces; si te dio 4, estas emparejando elementos consigo mismos.\"",
      solution: "nums = [3, 7, 1, 9, 5, 5, 2]\n\npairs = 0\nfor i in range(len(nums)):\n    for j in range(i + 1, len(nums)):\n        if nums[i] + nums[j] == 10:\n            pairs += 1",
      explanation: "<p>¿Por qué índices y no elementos? Porque el par (5, 5) usa <strong>dos posiciones distintas con el mismo valor</strong> — con elementos solos no podés distinguir \"el primer 5\" del \"segundo 5\".</p><p>El corazón del ejercicio es <code>range(i + 1, ...)</code>: el segundo puntero solo mira <em>hacia adelante</em> del primero. Eso garantiza dos cosas a la vez: nunca emparejás un elemento consigo mismo (j ≠ i) y nunca contás (3,7) y (7,3) como pares diferentes (j siempre &gt; i). Una sola decisión de diseño elimina ambos bugs.</p><p>Costo: con n elementos, esto hace ~n²/2 comparaciones. Para 7 números es nada; para un millón sería un problema serio — y la solución eficiente usa… un set (¿te acordás de \"¿está o no está?\" instantáneo?). Lo vas a poder escribir en el nivel Intermedio.</p>",
      hints: ["Esqueleto: for i in range(len(nums)): / for j in range(i + 1, len(nums)):", "La condición es nums[i] + nums[j] == 10. El range del j arrancando en i+1 evita duplicados y auto-pares.", "¿Te dio 6? Estás recorriendo j desde 0: contás cada par en los dos órdenes."]
    }
  ]
},

/* ---------------- Funciones ---------------- */
{
  id: "funciones",
  title: "Funciones",
  intro: "La herramienta más importante de la programación: empaquetar lógica con un <strong>nombre</strong>, parámetros de entrada y un valor de retorno. Acá se cura el dolor de copiar y pegar que sufriste en condicionales.",
  socratic: [
    {
      q: "En el ejercicio de las notas copiaste la misma cadena if/elif dos veces. ¿Qué problemas concretos trae el código duplicado, más allá de lo estético?",
      a: "El peor: <strong>las copias divergen</strong>. Encontrás un bug, lo arreglás en una copia, te olvidás de la otra — ahora tu programa se comporta distinto según el camino. Además, duplicar multiplica el costo de cada cambio futuro. Una función es el antídoto: la lógica vive en UN lugar, con un nombre, y se invoca desde donde haga falta."
    },
    {
      q: "¿Cuál es la diferencia entre <code>print(x)</code> y <code>return x</code> dentro de una función? Es LA confusión del primer año.",
      a: "<code>print</code> muestra el valor a un humano y se evapora: el programa no puede usarlo. <code>return</code> <em>entrega</em> el valor a quien llamó: <code>y = doble(4)</code> hace que y valga 8. Una función que solo imprime es un callejón sin salida — su resultado no se puede guardar, comparar ni encadenar. Prueba de fuego: si <code>resultado = mi_funcion()</code> te da <code>None</code>, tu función imprime en vez de retornar."
    },
    {
      q: "¿Qué pasa con la ejecución de la función cuando llega a un <code>return</code>? ¿Y qué devuelve una función que termina sin return?",
      a: "<code>return</code> termina la función <strong>al instante</strong> — el código que sigue no se ejecuta. Por eso los patrones \"return temprano\" funcionan: <code>if caso_invalido: return ...</code> y el resto sigue sin else. Y una función sin return (o que cae por el final) devuelve <code>None</code> — silenciosamente. Mitad de los \"¿por qué me da None?\" se explican acá."
    },
    {
      q: "Las variables creadas dentro de una función, ¿existen afuera? ¿Por qué eso es bueno?",
      a: "No: tienen <em>alcance local</em> — nacen al llamar la función y mueren al retornar. Es una bendición: cada función es un mundo aislado, sus variables no pisan las tuyas ni las de otras funciones. Podés usar <code>total</code> en tres funciones distintas sin conflicto. Sin scopes, todo programa grande sería un campo minado de nombres compartidos."
    },
    {
      q: "<code>def power(base, exp=2):</code> — ¿qué significa ese <code>=2</code> y cuándo conviene usarlo?",
      a: "Es un <em>valor por defecto</em>: si el llamador no pasa <code>exp</code>, vale 2. Permite que el caso común sea corto (<code>power(5)</code> → 25) sin perder flexibilidad (<code>power(5, 3)</code> → 125). API design en miniatura: los parámetros con default expresan \"esto es configurable, pero casi nadie necesita tocarlo\"."
    }
  ],
  exercises: [
    {
      id: "bas-fun-1",
      title: "Tu primera función",
      difficulty: 1,
      prompt: "<p>Definí la función <code>greet(name)</code> que <strong>devuelva</strong> (no imprima) el string <code>Hola, X! Bienvenido al dojo.</code> donde X es el nombre recibido.</p><p>Los tests la van a llamar con varios nombres distintos — eso es lo nuevo: tu código ya no resuelve <em>un</em> caso, resuelve <em>todos</em>.</p>",
      starter: "def greet(name):\n    # tu codigo (acordate: return, no print)\n    pass\n",
      tests: "assert greet(\"Ada\") == \"Hola, Ada! Bienvenido al dojo.\", f\"greet('Ada') devolvio: {repr(greet('Ada'))}\"\nassert greet(\"Linus\") == \"Hola, Linus! Bienvenido al dojo.\", f\"greet('Linus') devolvio: {repr(greet('Linus'))}\"\nassert greet(\"\") == \"Hola, ! Bienvenido al dojo.\", \"Tiene que funcionar incluso con string vacio\"",
      solution: "def greet(name):\n    return f\"Hola, {name}! Bienvenido al dojo.\"",
      explanation: "<p>Mirá el salto conceptual: hasta ahora escribías código que corría una vez con valores fijos. Una función es una <strong>máquina</strong>: definís el mecanismo una vez y funciona para infinitos inputs. Los tests llamaron <code>greet</code> tres veces con nombres distintos y las tres funcionaron — eso jamás lo lograbas con <code>name = \"Ada\"</code> fijo.</p><p>Y la distinción crucial: <code>return</code> entrega el string al llamador, que puede guardarlo, compararlo (como hacen los tests con <code>==</code>) o pasarlo a otra función. Con <code>print</code>, los tests habrían recibido <code>None</code> y fallado — probalo si querés ver el error con tus propios ojos: es instructivo.</p><p>(El <code>pass</code> del starter es un \"no hacer nada\" sintácticamente válido — existe porque un cuerpo de función no puede estar vacío.)</p>",
      hints: ["return f\"Hola, {name}! ...\" — la función ENTREGA el valor, no lo muestra.", "Si los tests dicen que recibieron None, estás usando print en vez de return."]
    },
    {
      id: "bas-fun-2",
      title: "Parámetros con default",
      difficulty: 2,
      prompt: "<p>Escribí <code>power(base, exp=2)</code>: eleva <code>base</code> a la potencia <code>exp</code>, y si no le pasan <code>exp</code>, calcula el cuadrado.</p><ul><li><code>power(5)</code> → <code>25</code></li><li><code>power(2, 10)</code> → <code>1024</code></li><li><code>power(9, 0.5)</code> → <code>3.0</code> (¡los exponentes fraccionarios son raíces!)</li></ul>",
      starter: "# def power(...):\n",
      tests: "assert power(5) == 25, f\"power(5) deberia ser 25, dio {power(5)}\"\nassert power(3) == 9, f\"power(3) deberia ser 9, dio {power(3)}\"\nassert power(2, 10) == 1024, f\"power(2, 10) deberia ser 1024, dio {power(2, 10)}\"\nassert abs(power(9, 0.5) - 3.0) < 1e-9, f\"power(9, 0.5) deberia ser 3.0, dio {power(9, 0.5)}\"",
      solution: "def power(base, exp=2):\n    return base ** exp",
      explanation: "<p>Una línea de cuerpo, pero el diseño de la <em>firma</em> es la lección: <code>exp=2</code> hace que el caso más frecuente (elevar al cuadrado) sea el más corto de escribir. Así se diseñan las buenas APIs — mirá las funciones de Python que ya usaste: <code>round(x)</code> redondea a entero salvo que pidas decimales, <code>sorted(lst)</code> ordena ascendente salvo que pidas <code>reverse=True</code>. Mismo principio.</p><p>Regla sintáctica: los parámetros con default van <strong>después</strong> de los obligatorios — <code>def f(exp=2, base)</code> es error de sintaxis, porque Python no sabría a quién va <code>f(5)</code>.</p>",
      hints: ["La firma es def power(base, exp=2): — el =2 es el valor si no te pasan exp.", "Potencia en Python: base ** exp."]
    },
    {
      id: "bas-fun-3",
      title: "Devolver más de una cosa",
      difficulty: 3,
      prompt: "<p>Escribí <code>min_max(nums)</code> que devuelva <strong>una tupla</strong> con el mínimo y el máximo de una lista: <code>min_max([4, 1, 9, 7])</code> → <code>(1, 9)</code>.</p><p>Conectá las piezas que ya tenés: las funciones devuelven UN valor… pero una tupla es un valor que contiene varios. Quien la llama puede desempacar: <code>lo, hi = min_max(datos)</code>.</p>",
      starter: "# def min_max(nums):\n",
      tests: "assert min_max([4, 1, 9, 7]) == (1, 9), f\"min_max([4,1,9,7]) dio {min_max([4, 1, 9, 7])}\"\nassert min_max([5]) == (5, 5), f\"Con un solo elemento, min y max son el: {min_max([5])}\"\nassert min_max([-3, -8, -1]) == (-8, -1), f\"Con negativos: {min_max([-3, -8, -1])}\"\nlo, hi = min_max([10, 20, 30])\nassert lo == 10 and hi == 30, \"El resultado tiene que poder desempacarse en dos variables\"",
      solution: "def min_max(nums):\n    return min(nums), max(nums)",
      explanation: "<p><code>return min(nums), max(nums)</code> — esa coma crea una tupla (los paréntesis son opcionales al retornar). Técnicamente la función sigue devolviendo <em>un</em> valor; conceptualmente devuelve dos, y el unpacking del llamador (<code>lo, hi = ...</code>) completa la ilusión. Este patrón es Python idiomático puro: lo vas a ver en <code>divmod()</code>, en train/test splits de ML, en todos lados.</p><p>¿Por qué tupla y no lista? Volvé a la semántica: (mínimo, máximo) es un <strong>registro</strong> — dos posiciones con significado fijo — no una colección de largo variable. La tupla lo comunica.</p>",
      hints: ["min() y max() ya existen: tu función solo tiene que combinarlas.", "return a, b devuelve la tupla (a, b) — la coma hace la magia."]
    },
    {
      id: "bas-fun-4",
      title: "Cantidad variable de argumentos",
      difficulty: 4,
      prompt: "<p>Escribí <code>average(*grades)</code> que acepte <strong>cualquier cantidad</strong> de notas y devuelva el promedio:</p><ul><li><code>average(8, 9, 10)</code> → <code>9.0</code></li><li><code>average(7)</code> → <code>7.0</code></li><li><code>average()</code> → <code>0</code> (sin notas, promedio cero — ¡y sin dividir por cero!)</li></ul><p>El asterisco en <code>*grades</code> junta todos los argumentos en una tupla. Adentro de la función, <code>grades</code> es una tupla común.</p>",
      starter: "# def average(*grades):\n",
      tests: "assert average(8, 9, 10) == 9.0, f\"average(8, 9, 10) dio {average(8, 9, 10)}\"\nassert average(7) == 7.0, f\"average(7) dio {average(7)}\"\nassert average() == 0, f\"average() sin argumentos deberia dar 0, dio {average()}\"\nassert abs(average(1, 2) - 1.5) < 1e-9, f\"average(1, 2) dio {average(1, 2)}\"",
      solution: "def average(*grades):\n    if not grades:\n        return 0\n    return sum(grades) / len(grades)",
      explanation: "<p>Dos ideas:</p><p><strong>El empaquetado <code>*args</code>.</strong> <code>average(8, 9, 10)</code> hace que adentro <code>grades</code> sea la tupla <code>(8, 9, 10)</code>. Así funciona <code>print()</code>, que acepta lo que le tires. Usalo cuando la cantidad es genuinamente abierta; si siempre son dos cosas, nombralas.</p><p><strong>El caso borde primero.</strong> <code>if not grades: return 0</code> es un <em>return temprano</em>: despacha el caso problemático (tupla vacía → división por cero) en la puerta de entrada, y el camino principal queda limpio abajo, sin else. Fijate también el truthiness: <code>not grades</code> es verdadero cuando la tupla está vacía — más idiomático que <code>len(grades) == 0</code>.</p><p>Preguntarse \"¿y si me llaman sin nada?\" <em>antes</em> de que pase es el hábito que separa código de juguete de código confiable.</p>",
      hints: ["Adentro de la función, grades es una tupla: sum(grades) / len(grades) hace casi todo.", "¿Qué pasa con average() vacío? len es 0 y la división explota. Atajalo primero: if not grades: return 0."]
    },
    {
      id: "bas-fun-5",
      title: "Funciones que usan funciones",
      difficulty: 5,
      prompt: "<p>El gran final del tema: componer.</p><ol><li><code>is_prime(n)</code>: devuelve <code>True</code> si n es primo (divisible solo por 1 y por sí mismo). Los menores que 2 no son primos. Para chequear: probá divisores desde 2; si alguno divide exacto, no es primo. (Alcanza probar hasta la raíz de n, pero hasta <code>n - 1</code> también vale.)</li><li><code>count_primes(limit)</code>: cuántos primos hay entre 2 y <code>limit</code> inclusive — <strong>llamando a</strong> <code>is_prime</code>, no repitiendo su lógica.</li></ol><p><code>count_primes(20)</code> → <code>8</code> (son 2, 3, 5, 7, 11, 13, 17, 19).</p>",
      starter: "def is_prime(n):\n    # menores que 2: no son primos\n    # probar divisores\n    pass\n\ndef count_primes(limit):\n    # usar is_prime, no copiar su logica\n    pass\n",
      tests: "assert is_prime(2) is True, \"2 es primo (el unico par)\"\nassert is_prime(7) is True, \"7 es primo\"\nassert is_prime(9) is False, \"9 = 3*3, no es primo\"\nassert is_prime(1) is False, \"1 no se considera primo\"\nassert is_prime(0) is False and is_prime(-5) is False, \"menores que 2: no primos\"\nassert count_primes(20) == 8, f\"count_primes(20) deberia ser 8, dio {count_primes(20)}\"\nassert count_primes(2) == 1, f\"count_primes(2) deberia ser 1, dio {count_primes(2)}\"\nassert count_primes(1) == 0, f\"count_primes(1) deberia ser 0, dio {count_primes(1)}\"",
      solution: "def is_prime(n):\n    if n < 2:\n        return False\n    for d in range(2, int(n ** 0.5) + 1):\n        if n % d == 0:\n            return False\n    return True\n\ndef count_primes(limit):\n    count = 0\n    for n in range(2, limit + 1):\n        if is_prime(n):\n            count += 1\n    return count",
      explanation: "<p>Esto es <strong>descomposición</strong>, la habilidad central de la ingeniería: <code>count_primes</code> no sabe qué es un primo — delega esa pregunta a <code>is_prime</code> y se concentra en contar. Cada función hace UNA cosa, y el programa es la conversación entre ellas. Si mañana optimizás <code>is_prime</code>, <code>count_primes</code> mejora gratis, sin tocarla.</p><p>Detalles de <code>is_prime</code>: el return temprano <code>if n &lt; 2: return False</code> despacha los casos raros primero. Después, el loop con su propia elegancia: <code>return False</code> apenas aparece un divisor (no hay nada más que ver), y el <code>return True</code> final solo se alcanza si <em>ningún</em> divisor cortó antes — la posición del return ES la lógica. Probar hasta <code>int(n**0.5) + 1</code> reduce el trabajo de n pasos a √n: con eso, chequear un número de 12 dígitos pasa de un billón de vueltas a un millón.</p><p>Convención de nombres que vale oro: las funciones que devuelven booleanos se llaman <code>is_...</code> o <code>has_...</code> — se leen como preguntas: <code>if is_prime(n):</code>.</p>",
      hints: ["is_prime: primero el caso n < 2 (False). Después un for de 2 en adelante: si n % d == 0, return False. Si el loop termina sin encontrar divisores, return True.", "El return True va DESPUÉS del loop, no adentro — si está adentro del for, decidís con el primer divisor probado.", "count_primes: un acumulador y un loop que pregunta if is_prime(n)."]
    }
  ]
},

/* ---------------- PROYECTO BÁSICO ---------------- */
{
  id: "proyecto-basico",
  title: "Proyecto: Analizador de gastos",
  isProject: true,
  intro: "Llegó la hora de combinar <strong>todo el nivel</strong>: listas de tuplas, dicts, condicionales, loops y funciones, trabajando juntos en un programa con sentido. Tomate tu tiempo: un proyecto no se resuelve en una pasada.",
  socratic: [
    {
      q: "Antes de escribir una línea: el problema pide cuatro funciones. ¿Por qué cuatro funciones chicas en vez de un solo bloque de código que haga todo?",
      a: "Porque cada función se puede <strong>pensar, probar y arreglar por separado</strong>. Si el total da mal, el bug está en <code>total_spent</code> — 4 líneas — y no \"en algún lugar\" de 40. Además las piezas se reusan: <code>by_category</code> podría servirle mañana a un gráfico. Dividir el problema ES resolver el problema: la mitad de la ingeniería es decidir dónde cortar."
    },
    {
      q: "Para <code>by_category</code> necesitás sumar montos POR categoría. ¿Qué estructura acumula naturalmente \"un total por cada nombre\"? ¿Y qué problema aparece la primera vez que ves una categoría?",
      a: "Un dict: <code>{categoria: total}</code>. El problema clásico: la primera vez que aparece \"comida\", la clave no existe — <code>totals[\"comida\"] += 50</code> tira KeyError. Soluciones: preguntar <code>if cat not in totals: totals[cat] = 0</code> primero, o el elegante <code>totals[cat] = totals.get(cat, 0) + amount</code>, donde .get con default 0 resuelve ambos casos en una línea."
    },
    {
      q: "¿Cómo recorrés una lista de tuplas como <code>[(\"comida\", 1200), ...]</code> con elegancia?",
      a: "Unpacking directo en el for: <code>for category, amount in expenses:</code> — cada tupla se desempaca sola en dos nombres con significado. Compará con <code>for e in expenses:</code> y andar escribiendo <code>e[0]</code> y <code>e[1]</code>: funciona, pero obliga al lector a recordar qué es cada índice."
    }
  ],
  exercises: [
    {
      id: "bas-proj-1",
      title: "Analizador de gastos personales",
      difficulty: 5,
      prompt: "<p>Tu app de finanzas recibe los gastos del mes como lista de tuplas <code>(categoria, monto)</code>. Implementá las cuatro funciones (los tests las prueban con <strong>varios datasets distintos</strong>, no solo el de ejemplo):</p><ol><li><code>total_spent(expenses)</code> → la suma de todos los montos. Lista vacía → <code>0</code>.</li><li><code>by_category(expenses)</code> → dict <code>{categoria: total}</code> sumando los gastos de cada categoría.</li><li><code>biggest_expense(expenses)</code> → la <strong>tupla completa</strong> del gasto más grande (patrón \"mejor hasta ahora\"). Lista vacía → <code>None</code>.</li><li><code>categories_over(expenses, limit)</code> → lista <strong>ordenada alfabéticamente</strong> de las categorías cuyo total supera <code>limit</code> (reusá <code>by_category</code>: no repitas lógica).</li></ol><p>Dataset de ejemplo en el starter para que pruebes con Ejecutar mientras desarrollás.</p>",
      starter: "expenses = [\n    (\"comida\", 1200),\n    (\"transporte\", 300),\n    (\"comida\", 800),\n    (\"ocio\", 450),\n    (\"transporte\", 150),\n    (\"comida\", 500),\n]\n\ndef total_spent(expenses):\n    pass\n\ndef by_category(expenses):\n    pass\n\ndef biggest_expense(expenses):\n    pass\n\ndef categories_over(expenses, limit):\n    pass\n\n# proba mientras desarrollas:\nprint(total_spent(expenses))\nprint(by_category(expenses))\nprint(biggest_expense(expenses))\nprint(categories_over(expenses, 400))\n",
      tests: "_e1 = [(\"comida\", 1200), (\"transporte\", 300), (\"comida\", 800), (\"ocio\", 450), (\"transporte\", 150), (\"comida\", 500)]\nassert total_spent(_e1) == 3400, f\"total_spent: esperaba 3400, dio {total_spent(_e1)}\"\nassert total_spent([]) == 0, \"total_spent de lista vacia deberia ser 0\"\nassert by_category(_e1) == {\"comida\": 2500, \"transporte\": 450, \"ocio\": 450}, f\"by_category: {by_category(_e1)}\"\nassert by_category([]) == {}, \"by_category de lista vacia: dict vacio\"\nassert biggest_expense(_e1) == (\"comida\", 1200), f\"biggest_expense: {biggest_expense(_e1)}\"\nassert biggest_expense([]) is None, \"biggest_expense de lista vacia: None\"\nassert categories_over(_e1, 400) == [\"comida\", \"ocio\", \"transporte\"], f\"categories_over 400: {categories_over(_e1, 400)}\"\nassert categories_over(_e1, 1000) == [\"comida\"], f\"categories_over 1000: {categories_over(_e1, 1000)}\"\nassert categories_over(_e1, 99999) == [], \"con limite altisimo: lista vacia\"\n_e2 = [(\"libros\", 100), (\"libros\", 50)]\nassert total_spent(_e2) == 150 and by_category(_e2) == {\"libros\": 150}, \"fallo con un segundo dataset\"\nassert biggest_expense(_e2) == (\"libros\", 100), \"biggest con segundo dataset\"",
      solution: "def total_spent(expenses):\n    total = 0\n    for category, amount in expenses:\n        total += amount\n    return total\n\ndef by_category(expenses):\n    totals = {}\n    for category, amount in expenses:\n        totals[category] = totals.get(category, 0) + amount\n    return totals\n\ndef biggest_expense(expenses):\n    if not expenses:\n        return None\n    biggest = expenses[0]\n    for expense in expenses:\n        if expense[1] > biggest[1]:\n            biggest = expense\n    return biggest\n\ndef categories_over(expenses, limit):\n    totals = by_category(expenses)\n    result = []\n    for category in totals:\n        if totals[category] > limit:\n            result.append(category)\n    return sorted(result)",
      explanation: "<p>Repasemos qué músculo usó cada función:</p><p><strong><code>total_spent</code></strong>: el acumulador de loops + unpacking de tuplas en el for. (También valía <code>sum</code> con una técnica de Intermedio — la vas a ver pronto.)</p><p><strong><code>by_category</code></strong>: la joya del proyecto. <code>totals.get(category, 0) + amount</code> resuelve en una línea el problema de \"la primera vez que veo esta clave\": si no existe, .get devuelve 0 y la suma arranca de cero. Este patrón — <em>contar/agrupar con un dict</em> — es probablemente el más usado de todo Python aplicado a datos.</p><p><strong><code>biggest_expense</code></strong>: \"mejor hasta ahora\" sobre tuplas, comparando por el monto (<code>expense[1]</code>), más el return temprano para la lista vacía. Devolver <code>None</code> para \"no hay respuesta\" es la convención estándar.</p><p><strong><code>categories_over</code></strong>: la lección de arquitectura — <strong>llama a <code>by_category</code></strong> en vez de repetir el loop de agrupado. Si mañana cambia cómo se agrupa, hay un solo lugar que tocar. Filtrar + <code>sorted()</code> al final.</p><p>Si llegaste hasta acá resolviéndolo vos: ya pensás como programador. Lo que sigue es pulir el estilo — de eso se trata el nivel Intermedio.</p>",
      hints: ["Encará una función a la vez, en orden: total_spent es la más fácil. Usá los print del starter para ver qué va saliendo.", "by_category: el patrón es totals[cat] = totals.get(cat, 0) + amount dentro del loop.", "biggest_expense compara tuplas POR EL MONTO: expense[1]. Y el caso lista vacía va primero con return None.", "categories_over: primero llamá by_category(expenses), después recorré ese dict filtrando, y devolvé sorted(resultado)."]
    }
  ]
}
]);
