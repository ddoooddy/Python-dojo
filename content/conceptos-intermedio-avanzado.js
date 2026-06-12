/* ============================================================
   CONCEPTOS Y TUTORIALES — niveles Intermedio y Avanzado
   Asumen el nivel Básico; cada idea nueva se explica desde cero.
   ============================================================ */

/* ---------------- INTERMEDIO ---------------- */

DOJO_EXTEND("intermedio", "comprehensions", {
  concept: "<p>Ya sabés construir una lista nueva a partir de otra con el patrón loop + append:</p><pre>nums = [1, 2, 3, 4]\ndoubles = []\nfor n in nums:\n    doubles.append(n * 2)</pre><p>La <strong>list comprehension</strong> es ese patrón completo comprimido en una expresión:</p><pre>doubles = [n * 2 for n in nums]</pre><p>Se lee de adentro hacia afuera: \"<em>n por 2</em>, para cada <em>n en nums</em>\". Mismo resultado, pero declara la intención completa de entrada: esto ES una transformación, sin sorpresas escondidas.</p><h4>Con filtro</h4><p>Un <code>if</code> al final descarta elementos antes de transformarlos:</p><pre>evens_doubled = [n * 2 for n in nums if n % 2 == 0]   # [4, 8]</pre><p>Orden de ejecución: el for toma un elemento, el if decide si pasa, la expresión lo transforma. Los descartados nunca llegan a transformarse.</p><h4>La plantilla mental</h4><pre>[EXPRESION  for  ELEMENTO  in  COLECCION  if  CONDICION]\n   ¿qué produzco?   ¿de dónde saco?        ¿cuáles paso?</pre><p>El truco para escribirlas: pensá primero el loop clásico y después \"doblalo\" a la plantilla.</p><h4>También para dicts</h4><pre>words = [\"sol\", \"luna\"]\nlengths = {w: len(w) for w in words}   # {\"sol\": 3, \"luna\": 4}</pre><p>Misma idea, pero produciendo pares <code>clave: valor</code>. ¿Cuándo NO usar comprehensions? Cuando dejan de leerse de un vistazo: ante la duda, el loop clásico siempre es válido.</p>",
  tutorial: [
    {
      text: "<p>Mirá el mismo trabajo hecho de las dos formas, una arriba de la otra. Verificá que dan idéntico.</p>",
      code: "nums = [1, 2, 3, 4, 5]\n\n# forma clasica\nsquares_loop = []\nfor n in nums:\n    squares_loop.append(n * n)\n\n# comprehension\nsquares_comp = [n * n for n in nums]\n\nprint(squares_loop)\nprint(squares_comp)\nprint(squares_loop == squares_comp)",
      note: "True: son exactamente equivalentes. La comprehension no es magia nueva — es el patrón loop+append que ya dominás, plegado en una línea. Tres líneas y una variable intermedia menos."
    },
    {
      text: "<p>Agregale el filtro: el <code>if</code> al final decide qué elementos entran.</p>",
      code: "nums = [3, -7, 12, -1, 8, -4]\n\npositives = [n for n in nums if n > 0]\npositives_doubled = [n * 2 for n in nums if n > 0]\n\nprint(positives)\nprint(positives_doubled)",
      note: "La primera solo filtra (la expresión es n a secas); la segunda filtra Y transforma. Probá invertir la condición a n < 0, o cambiar la expresión a n + 100: cada parte de la plantilla es independiente."
    },
    {
      text: "<p>Dict comprehension: llaves, y la expresión es un par <code>clave: valor</code>.</p>",
      code: "words = [\"python\", \"ia\", \"datos\"]\n\nlengths = {w: len(w) for w in words}\nprint(lengths)\nprint(lengths[\"python\"])",
      note: "Construiste un diccionario completo en una línea: cada palabra quedó asociada a su largo. El patrón {algo_de_x: otra_cosa_de_x for x in coleccion} es el caballito de batalla para armar índices y tablas de búsqueda."
    }
  ]
});

DOJO_EXTEND("intermedio", "hof", {
  concept: "<p>La idea que cambia todo: en Python, <strong>una función es un valor</strong>, como un número o un string. Se puede guardar en una variable, pasar como argumento a otra función, y devolver.</p><pre>f = len            # SIN paréntesis: la función misma, no su resultado\nprint(f(\"hola\"))   # 4 — f ahora ES len</pre><p>Esa distinción es la clave del tema: <code>len</code> es la máquina; <code>len(\"hola\")</code> es la máquina funcionando una vez. Cuando pases funciones por ahí, siempre va SIN paréntesis.</p><h4>lambda: funciones de bolsillo</h4><p>Para funciones chiquitas que se usan una sola vez, escribir <code>def</code> con nombre es burocracia. La <code>lambda</code> es una función anónima de una sola expresión:</p><pre>double = lambda x: x * 2     # parámetro: expresión (sin return: la expresión ES el retorno)\nprint(double(5))             # 10</pre><h4>¿Y para qué pasar funciones? El ejemplo estrella: sorted con key</h4><pre>players = [(\"ana\", 340), (\"beto\", 580)]\nby_score = sorted(players, key=lambda p: p[1])</pre><p><code>sorted</code> sabe ordenar; lo que no sabe es <em>por qué criterio</em>. El parámetro <code>key</code> recibe UNA FUNCIÓN que le dice: \"a cada elemento, juzgalo por esto\" (acá, su segundo campo). Vos ponés el criterio, sorted pone el algoritmo.</p><h4>map y filter</h4><p>Dos clásicos que reciben funciones: <code>map(f, lista)</code> aplica f a cada elemento; <code>filter(f, lista)</code> se queda con los que f aprueba. Devuelven objetos \"perezosos\": envolvelos en <code>list()</code> para ver el resultado. (En Python real las comprehensions suelen ganarles en legibilidad, pero el concepto — transformar y filtrar pasando funciones — es el idioma de todo el mundo de los datos.)</p>",
  tutorial: [
    {
      text: "<p>Comprobá que una función es un valor: guardala en otra variable y usala desde ahí.</p>",
      code: "f = len\nprint(f(\"hola\"))\nprint(f([10, 20, 30]))\n\nprint(len)\nprint(len(\"abc\"))",
      note: "f y len son ahora dos nombres para la misma máquina. Mirá la diferencia crucial: print(len) muestra la función como objeto (algo como <built-in function len>); print(len(\"abc\")) la EJECUTA y muestra 3. Paréntesis = ejecutar; sin paréntesis = la función como cosa."
    },
    {
      text: "<p>Escribí tu primera lambda y comparala con el def equivalente.</p>",
      code: "def double_def(x):\n    return x * 2\n\ndouble_lambda = lambda x: x * 2\n\nprint(double_def(5))\nprint(double_lambda(5))\nprint((lambda x: x + 100)(1))",
      note: "Idénticas en comportamiento. La última línea es una lambda creada y llamada al instante, sin nombre siquiera — legal, aunque poco común. La lambda brilla cuando la función es tan corta y local que un def sería ruido: la vas a ver sobre todo dentro de sorted, map y filter."
    },
    {
      text: "<p>El uso real: <code>sorted</code> con <code>key</code>. Ordenar gente por puntaje, no alfabéticamente.</p>",
      code: "players = [(\"ana\", 340), (\"beto\", 580), (\"carla\", 220)]\n\nprint(sorted(players))\nprint(sorted(players, key=lambda p: p[1]))\nprint(sorted(players, key=lambda p: p[1], reverse=True))",
      note: "Sin key, sorted ordenó por nombre (compara las tuplas desde el primer campo). Con key=lambda p: p[1], juzgó cada tupla por su puntaje. La lambda recibe UN elemento y devuelve el valor por el que ordenarlo — sorted la llama por vos para cada uno. Eso es pasar una función como argumento, trabajando."
    }
  ]
});

DOJO_EXTEND("intermedio", "errores", {
  concept: "<p>Cuando algo sale mal, Python lanza una <strong>excepción</strong>: detiene el programa y muestra un <em>traceback</em> (el reporte del error). Ya viste varias: <code>TypeError</code> al modificar una tupla, <code>KeyError</code> con una clave inexistente, <code>IndexError</code> con una posición que no está.</p><h4>Leer un traceback (de abajo hacia arriba)</h4><pre>ZeroDivisionError: division by zero</pre><p>La <strong>última línea</strong> dice QUÉ pasó (el tipo de error y su mensaje); las anteriores dicen DÓNDE. Leerlo sin pánico es media carrera: el error no es un castigo, es información precisa.</p><h4>try / except: manejar el fallo en vez de morir</h4><p>Cuando un fallo es <em>esperable</em> (el usuario tipea basura, un archivo no existe), lo envolvés en <code>try</code> y atendés el problema en <code>except</code>:</p><pre>raw = \"hola\"\ntry:\n    n = int(raw)            # esto puede fallar...\n    print(\"numero:\", n)\nexcept ValueError:           # ...y si falla ASI, hago esto\n    print(\"eso no era un numero\")\nprint(\"el programa sigue vivo\")</pre><p>Sin el try, <code>int(\"hola\")</code> mataría el programa. Con él, el error se atrapa, el except responde, y la vida continúa.</p><h4>Atrapar específico, no todo</h4><p><code>except ValueError:</code> atrapa SOLO ese tipo. Es deliberado: si atraparas todo (<code>except:</code> pelado), también te tragarías errores que no imaginaste — bugs tuyos disfrazados de caso manejado. Regla: atrapá exactamente lo que sabés manejar; el resto, que explote y te enteres.</p><h4>raise: lanzar tus propios errores</h4><pre>def set_age(age):\n    if age < 0:\n        raise ValueError(\"la edad no puede ser negativa\")\n    return age</pre><p>Tu función también puede negarse a trabajar con datos inválidos. Un error ruidoso y temprano es mil veces mejor que un dato corrupto avanzando en silencio.</p>",
  tutorial: [
    {
      text: "<p>Primero, provocá un error a propósito y LEELO. Vas a dividir por cero — tranquilo, acá romper es gratis.</p>",
      code: "a = 10\nb = 0\nprint(\"antes de la division\")\nresult = a / b\nprint(\"esto nunca se ejecuta\")",
      note: "Mirá la salida: el primer print salió, el último no — el programa murió en la división. Y la última línea del error lo dice clarísimo: ZeroDivisionError: division by zero. Tipo de error + explicación. Todos los tracebacks se leen así: última línea primero."
    },
    {
      text: "<p>Ahora el mismo código, protegido con try/except. Compará los finales.</p>",
      code: "a = 10\nb = 0\n\ntry:\n    result = a / b\n    print(\"division ok:\", result)\nexcept ZeroDivisionError:\n    print(\"no se puede dividir por cero, uso 0\")\n    result = 0\n\nprint(\"el programa sigue:\", result)",
      note: "El fallo ocurrió igual, pero esta vez alguien lo estaba esperando: el except lo atrapó, asignó un valor de respaldo y el programa llegó al final. Probá cambiar b a 2: el except ni se ejecuta — solo corre cuando hay fallo. try = \"esto puede fallar\", except = \"y si falla así, hago esto\"."
    },
    {
      text: "<p>Atrapar el tipo CORRECTO importa. Acá el except espera un error... que no es el que ocurre.</p>",
      code: "data = {\"name\": \"Ana\"}\n\ntry:\n    print(data[\"email\"])\nexcept ValueError:\n    print(\"hubo un ValueError\")",
      note: "El programa murió igual: el acceso a una clave inexistente lanza KeyError, y tu except solo cazaba ValueError — el error pasó de largo. Corregí el except a KeyError y ejecutá de nuevo. Lección doble: los except filtran por tipo, y por eso atrapar específico te protege sin esconder lo inesperado."
    }
  ]
});

DOJO_EXTEND("intermedio", "archivos", {
  concept: "<p>Todo lo que hiciste hasta ahora vive en la memoria y desaparece al terminar el programa. Los <strong>archivos</strong> son la persistencia: datos que sobreviven. (Acá los archivos viven en un disco virtual del navegador — la sintaxis es idéntica a la real.)</p><h4>El ritual: with open</h4><pre>with open(\"notas.txt\", \"w\") as f:\n    f.write(\"primera linea\\n\")\n    f.write(\"segunda linea\\n\")</pre><p>Desarmado: <code>open(nombre, modo)</code> abre el archivo; <code>as f</code> le da un nombre; el bloque <code>with</code> garantiza que se cierre solo al salir, pase lo que pase (un archivo sin cerrar puede perder datos). Siempre, siempre con <code>with</code>.</p><h4>Los tres modos</h4><ul><li><code>\"r\"</code> (read): leer. Falla si el archivo no existe. Es el modo por defecto.</li><li><code>\"w\"</code> (write): escribir <strong>desde cero</strong>. CUIDADO: si el archivo existía, lo vacía al instante de abrirlo.</li><li><code>\"a\"</code> (append): agregar al final, preservando lo anterior. El modo de los registros y logs.</li></ul><h4>Leer</h4><pre>with open(\"notas.txt\") as f:\n    content = f.read()       # TODO el archivo como un string\n\nwith open(\"notas.txt\") as f:\n    for line in f:            # o linea por linea\n        print(line.strip())</pre><p>Dos detalles que muerden a todos: (1) lo que leés es SIEMPRE string — un \"42\" del archivo necesita <code>int()</code> para calcular; (2) cada línea llega con su salto de línea <code>\\n</code> pegado al final — <code>.strip()</code> lo saca.</p><p>(<code>\\n</code> dentro de un string es el carácter \"salto de línea\": invisible, pero ocupa lugar y rompe comparaciones.)</p>",
  tutorial: [
    {
      text: "<p>El ciclo completo en miniatura: escribir un archivo y volver a leerlo.</p>",
      code: "with open(\"diario.txt\", \"w\") as f:\n    f.write(\"dia 1: aprendi archivos\\n\")\n    f.write(\"dia 2: practique loops\\n\")\n\nwith open(\"diario.txt\") as f:\n    content = f.read()\n\nprint(content)",
      note: "Escribiste, cerraste (el with lo hizo solo al terminar el bloque), reabriste y leíste: el texto sobrevivió entre las dos aperturas. Los \\n que escribiste son los saltos de línea — por eso la salida tiene dos renglones."
    },
    {
      text: "<p>El peligro del modo <code>\"w\"</code>: ejecutá y mirá qué quedó del contenido anterior.</p>",
      code: "with open(\"diario.txt\", \"w\") as f:\n    f.write(\"contenido nuevo\\n\")\n\nwith open(\"diario.txt\") as f:\n    print(f.read())",
      note: "Los dos días del paso anterior desaparecieron: \"w\" vació el archivo EN EL MOMENTO de abrirlo, antes de escribir nada. Para agregar sin destruir existe \"a\" (append) — cambiá la \"w\" por \"a\", ejecutá dos veces seguidas, y mirá cómo ahora el contenido se acumula."
    },
    {
      text: "<p>Leer línea por línea, limpiando los saltos: el patrón de procesamiento más común.</p>",
      code: "with open(\"compras.txt\", \"w\") as f:\n    f.write(\"pan\\n\")\n    f.write(\"cafe\\n\")\n    f.write(\"yerba\\n\")\n\nwith open(\"compras.txt\") as f:\n    items = [line.strip() for line in f]\n\nprint(items)\nprint(len(items), \"items\")",
      note: "El archivo es directamente recorrible con for (línea por línea), y la comprehension con .strip() limpió los \\n de un golpe. Probá sacarle el .strip() y mirá la lista resultante: vas a ver los '\\n' colgando de cada item — el bug silencioso clásico de leer archivos."
    }
  ]
});

DOJO_EXTEND("intermedio", "modulos", {
  concept: "<p>Python trae \"baterías incluidas\": cientos de herramientas listas, organizadas en <strong>módulos</strong> que activás con <code>import</code>. Un módulo es, físicamente, un archivo .py con funciones y constantes adentro — incluidos los tuyos.</p><h4>Las dos formas de importar</h4><pre>import math                  # trae el modulo entero\nprint(math.sqrt(16))         # se usa con prefijo: math.cosa\n\nfrom math import sqrt, pi    # trae nombres sueltos\nprint(sqrt(16))              # sin prefijo</pre><p>¿Cuál usar? <code>import math</code> por defecto (siempre se ve de dónde viene cada cosa); <code>from</code> para los dos o tres nombres que uses muchísimo. <code>from math import *</code>: nunca — llena tu programa de nombres misteriosos.</p><h4>Los módulos que vas a usar ya</h4><ul><li><code>math</code>: matemática — <code>sqrt</code>, <code>pi</code>, <code>floor</code>, <code>ceil</code>.</li><li><code>random</code>: azar — <code>randint(1, 6)</code> (dado), <code>choice(lista)</code>. Con un detalle profundo: la computadora no tira dados de verdad — genera secuencias que PARECEN azar desde una semilla. <code>random.seed(42)</code> fija la semilla y el \"azar\" se vuelve repetible: misma semilla, misma secuencia. Esto, que suena a trampa, es ORO en ciencia de datos: experimentos reproducibles.</li><li><code>json</code>: guardar/cargar estructuras (dicts, listas) como texto.</li><li><code>collections.Counter</code>: contar frecuencias sin escribir el loop.</li></ul><h4>La gran desmitificación</h4><p>Cuando hacés <code>import math</code>, Python busca un archivo, lo ejecuta una vez, y te entrega sus contenidos. Si vos creás <code>mymodule.py</code> con funciones adentro, <code>import mymodule</code> funciona EXACTAMENTE igual. No hay dos categorías de código — el de Python y el tuyo son la misma cosa.</p>",
  tutorial: [
    {
      text: "<p>Importá math y usá sus herramientas. Fijate que <code>pi</code> es una constante (sin paréntesis) y <code>sqrt</code> una función.</p>",
      code: "import math\n\nprint(math.pi)\nprint(math.sqrt(144))\nprint(math.floor(7.8))\nprint(math.ceil(7.2))",
      note: "El prefijo math. te dice de dónde sale cada cosa — en un programa largo, eso es legibilidad pura. floor baja siempre (7.8 → 7), ceil sube siempre (7.2 → 8): distintos de round, que va al más cercano."
    },
    {
      text: "<p>random: ejecutá esto VARIAS veces seguidas y mirá los resultados.</p>",
      code: "import random\n\nprint(random.randint(1, 6))\nprint(random.randint(1, 6))\nprint(random.choice([\"rojo\", \"verde\", \"azul\"]))",
      note: "Cada ejecución dio valores distintos: azar (simulado). randint(1, 6) incluye AMBOS extremos — rareza de randint, casi todo lo demás en Python excluye el final. Ahora viene lo interesante: el paso siguiente doma este azar."
    },
    {
      text: "<p>La semilla: agregá <code>random.seed(42)</code> arriba y ejecutá varias veces. ¿Qué cambió?</p>",
      code: "import random\n\nrandom.seed(42)\nprint(random.randint(1, 6))\nprint(random.randint(1, 6))\nprint(random.randint(1, 6))",
      note: "Ahora las tiradas son SIEMPRE las mismas, ejecutes cuando ejecutes: la semilla fijó el punto de partida de la secuencia pseudo-aleatoria. Cambiá el 42 por otro número: otra secuencia, también repetible. En los niveles de NumPy y ML vas a fijar semillas en cada experimento — es lo que hace que la ciencia de datos sea ciencia y no anécdota."
    }
  ]
});

DOJO_EXTEND("intermedio", "proyecto-intermedio", {
  concept: "<p>Este proyecto es un <strong>pipeline de datos</strong> en miniatura: texto crudo que entra, información confiable que sale. Es la arquitectura de la ingeniería de datos real, a escala de juguete.</p><h4>El mapa de las piezas</h4><ul><li><code>parse_line</code> usa <strong>strings</strong> (split, strip) y <strong>guard clauses</strong> (errores): es la aduana — nada inválido pasa.</li><li><code>load_logs</code> usa <strong>archivos</strong> y <strong>comprehensions</strong>: leer, parsear, filtrar.</li><li><code>count_levels</code> usa <strong>Counter</strong> (módulos).</li><li><code>save_report</code> usa <strong>json</strong> y compone las funciones anteriores.</li></ul><h4>Estrategia</h4><p>Empezá por <code>parse_line</code> sola y probala contra líneas buenas Y corruptas con Ejecutar, antes de seguir: es la base de todo lo demás. Si una pieza no sale, su tema tiene Concepto y tutorial para volver. El orden de las funciones en el enunciado es el orden recomendado de trabajo.</p>"
});

/* ---------------- AVANZADO ---------------- */

DOJO_EXTEND("avanzado", "oop", {
  concept: "<p>Hasta ahora, datos (dicts, listas) y comportamiento (funciones) viven separados. Una <strong>clase</strong> los une: define un tipo de objeto con sus datos Y sus operaciones, juntos.</p><h4>Molde e instancias</h4><pre>class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        return f\"{self.name} dice guau\"\n\nrex = Dog(\"Rex\")        # una instancia\nluna = Dog(\"Luna\")      # otra, independiente\nprint(rex.bark())       # Rex dice guau\nprint(luna.bark())      # Luna dice guau</pre><p>La clase es el <strong>molde</strong>; <code>rex</code> y <code>luna</code> son <strong>objetos</strong> salidos de él, cada uno con sus propios datos. Las funciones definidas adentro se llaman <strong>métodos</strong> — el famoso punto que venís usando hace niveles: <code>\"hola\".upper()</code>, <code>lista.append()</code>... siempre fueron métodos de clases. Hoy aprendés a fabricar los tuyos.</p><h4>Las dos piezas misteriosas</h4><ul><li><code>__init__</code> es el <strong>inicializador</strong>: corre automáticamente al crear cada objeto (<code>Dog(\"Rex\")</code>), y su trabajo es guardar los datos iniciales.</li><li><code>self</code> es <strong>el objeto mismo</strong>: cuando llamás <code>rex.bark()</code>, dentro del método <code>self</code> ES rex. Por eso <code>self.name = name</code> guarda el nombre EN ese objeto y no en otro. Todo método lo declara como primer parámetro, pero al llamar no lo pasás: Python lo enchufa solo.</li></ul><h4>Herencia: clases que extienden clases</h4><pre>class Puppy(Dog):                  # Puppy ES UN Dog...\n    def whine(self):               # ...con algo extra\n        return f\"{self.name} llora\"</pre><p><code>Puppy</code> hereda todo lo de Dog (init, bark) gratis, y agrega lo suyo. Es el mecanismo con que los frameworks te prestan funcionalidad: tu clase hereda de la de ellos.</p>",
  tutorial: [
    {
      text: "<p>Tu primera clase. Creá dos perros y comprobá que cada uno recuerda SU nombre.</p>",
      code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        return f\"{self.name} dice guau\"\n\nrex = Dog(\"Rex\")\nluna = Dog(\"Luna\")\n\nprint(rex.bark())\nprint(luna.bark())\nprint(rex.name)",
      note: "Un solo método bark, escrito una vez — pero cada llamada usó los datos del objeto correcto, porque self era rex en una y luna en la otra. Estado propio (name) + comportamiento compartido (bark): eso es una clase. Creá un tercer perro para sentirlo."
    },
    {
      text: "<p>Los métodos pueden MODIFICAR el estado del objeto. Un contador de caricias:</p>",
      code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n        self.pets_received = 0\n\n    def pet(self):\n        self.pets_received += 1\n        return f\"{self.name} recibio {self.pets_received} caricias\"\n\nrex = Dog(\"Rex\")\nprint(rex.pet())\nprint(rex.pet())\nprint(rex.pet())",
      note: "El contador subió entre llamadas: el objeto tiene MEMORIA — su estado vive en self y persiste mientras el objeto exista. Esto es lo que una función suelta no puede hacer (sus variables mueren al retornar). Objeto = datos que perduran + operaciones que los cuidan."
    },
    {
      text: "<p>Herencia: una clase hija recibe todo lo de la madre y suma lo suyo.</p>",
      code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        return f\"{self.name} dice guau\"\n\nclass Puppy(Dog):\n    def whine(self):\n        return f\"{self.name} hace pucheros\"\n\np = Puppy(\"Toby\")\nprint(p.bark())\nprint(p.whine())\nprint(isinstance(p, Dog))",
      note: "Puppy no definió ni __init__ ni bark, y sin embargo p.bark() funcionó: lo heredó de Dog. isinstance confirma la relación: un Puppy ES UN Dog, y donde el programa espere un Dog, un Puppy sirve. La sintaxis es solo class Hija(Madre) — el resto cae por gravedad."
    }
  ]
});

DOJO_EXTEND("avanzado", "decoradores", {
  concept: "<p>Un <strong>decorador</strong> envuelve una función para agregarle comportamiento — medir tiempo, registrar llamadas, cachear resultados — <strong>sin tocar su código</strong>. Antes de la sintaxis, las dos ideas que lo hacen posible (ambas las viste en funciones de orden superior):</p><ul><li>Las funciones son valores: se pasan y se devuelven.</li><li>Una función definida ADENTRO de otra recuerda las variables de su creadora, incluso después de que esta terminó. Eso se llama <em>closure</em>.</li></ul><h4>El patrón completo</h4><pre>def shout(func):                  # recibe una funcion...\n    def wrapper():\n        result = func()           # ...la llama por adentro...\n        return result.upper()     # ...y le agrega su gracia\n    return wrapper                # devuelve la envoltura\n\ndef greet():\n    return \"hola\"\n\ngreet = shout(greet)    # reemplazo greet por su version envuelta\nprint(greet())          # HOLA</pre><p>El wrapper \"recuerda\" a la func original gracias al closure, y el nombre <code>greet</code> ahora apunta a la envoltura.</p><h4>La arroba es solo azúcar</h4><pre>@shout\ndef greet():\n    return \"hola\"</pre><p><code>@shout</code> arriba del def significa EXACTAMENTE <code>greet = shout(greet)</code>. Nada más. Si entendés esa traducción, entendés todos los decoradores que existen — incluidos los <code>@app.route</code> y <code>@cache</code> que vas a cruzar en frameworks reales.</p><p>El detalle final para decorar cualquier función, tenga los parámetros que tenga: el wrapper se declara <code>def wrapper(*args, **kwargs)</code> (\"acepto lo que venga\") y reenvía con <code>func(*args, **kwargs)</code>.</p>",
  tutorial: [
    {
      text: "<p>Primero el ingrediente: una función que FABRICA funciones. La fabricada recuerda el dato con que nació (closure).</p>",
      code: "def make_multiplier(factor):\n    def multiplier(x):\n        return x * factor\n    return multiplier\n\ntriple = make_multiplier(3)\ndouble = make_multiplier(2)\n\nprint(triple(10))\nprint(double(10))\nprint(triple(7))",
      note: "make_multiplier terminó de ejecutarse hace rato... y sin embargo triple sigue sabiendo que su factor es 3, y double que el suyo es 2. Cada llamada a la fábrica creó una función nueva con su entorno capturado: eso es un closure, y es la memoria que los decoradores necesitan."
    },
    {
      text: "<p>Ahora un decorador a mano, SIN arroba, para ver el mecanismo desnudo.</p>",
      code: "def shout(func):\n    def wrapper():\n        result = func()\n        return result.upper() + \"!!\"\n    return wrapper\n\ndef greet():\n    return \"hola dojo\"\n\nprint(greet())\n\ngreet = shout(greet)\nprint(greet())",
      note: "Antes del reemplazo: \"hola dojo\". Después: \"HOLA DOJO!!\". La línea greet = shout(greet) es TODO el truco — el nombre greet pasó a apuntar al wrapper, que tiene a la original guardada en su closure. La función original no se editó: se envolvió."
    },
    {
      text: "<p>Lo mismo con la arroba — y comprobá que es idéntico.</p>",
      code: "def shout(func):\n    def wrapper():\n        result = func()\n        return result.upper() + \"!!\"\n    return wrapper\n\n@shout\ndef greet():\n    return \"hola dojo\"\n\n@shout\ndef farewell():\n    return \"hasta la proxima\"\n\nprint(greet())\nprint(farewell())",
      note: "@shout hizo por vos el greet = shout(greet) del paso anterior, en el momento de la definición. Y mirá el poder: el mismo decorador sirvió para dos funciones distintas — comportamiento agregado en masa, cero código repetido. Eso es lo que los frameworks explotan."
    }
  ]
});

DOJO_EXTEND("avanzado", "generadores", {
  concept: "<p>Una función normal calcula TODO su resultado y lo entrega de una vez. Un <strong>generador</strong> entrega los valores <strong>de a uno, a pedido</strong>, pausándose entre medio. La palabra clave es <code>yield</code> (\"ceder\"):</p><pre>def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1</pre><h4>La mecánica de la pausa</h4><p>Llamar <code>countdown(3)</code> NO ejecuta nada: devuelve un objeto generador, congelado al inicio. Cada vez que alguien le pide un valor (un for, o <code>next()</code>), el cuerpo corre hasta el próximo <code>yield</code>, entrega, y <strong>se congela ahí</strong> — con sus variables vivas — hasta el próximo pedido:</p><pre>gen = countdown(3)\nprint(next(gen))    # 3  (corrio hasta el yield, pausa)\nprint(next(gen))    # 2  (desperto, otra vuelta, pausa)\nlist(countdown(3))  # [3, 2, 1] — list() pide todo</pre><h4>¿Para qué sirve la pereza?</h4><p><strong>Memoria.</strong> Una lista de un millón de elementos ocupa memoria por el millón; un generador que los produce ocupa la memoria de UNO — el actual. Procesar archivos gigantes línea a línea, alimentar un modelo con datos infinitos: todo eso son generadores. Y permite algo imposible para las listas: secuencias <strong>infinitas</strong> (<code>while True: yield ...</code>), de las que cada consumidor toma cuanto necesita.</p><h4>La versión expresión</h4><p>Cambiale los corchetes a una comprehension por paréntesis y tenés un <em>generator expression</em>: misma sintaxis, evaluación perezosa:</p><pre>squares_list = [x * x for x in range(1000000)]   # el millon, en memoria, YA\nsquares_gen = (x * x for x in range(1000000))     # una receta; nada calculado aun\ntotal = sum(squares_gen)                          # sum los va pidiendo de a uno</pre><p>Advertencia única de los generadores: se <strong>agotan</strong> — recorrerlos dos veces no funciona, la segunda pasada está vacía. Son un stream, no un almacén.</p>",
  tutorial: [
    {
      text: "<p>Mirá la pausa en cámara lenta: los prints DENTRO del generador delatan cuándo corre y cuándo duerme.</p>",
      code: "def counter():\n    print(\"  [gen] arranco\")\n    yield 1\n    print(\"  [gen] me despertaron\")\n    yield 2\n    print(\"  [gen] ultima vez\")\n    yield 3\n\ngen = counter()\nprint(\"creado (nada corrio aun)\")\nprint(\"pido uno:\", next(gen))\nprint(\"pido otro:\", next(gen))",
      note: "Seguí la salida con el dedo: al crear el generador no salió NINGÚN print interno — el cuerpo no corrió. El primer next lo despertó hasta el primer yield; el segundo lo reanudó EXACTAMENTE donde se había pausado (por eso salió '[gen] me despertaron'). Una función pausable: ese es todo el secreto."
    },
    {
      text: "<p>Los generadores se recorren con for como cualquier colección — y se agotan.</p>",
      code: "def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\ngen = countdown(4)\n\nfor value in gen:\n    print(value)\n\nprint(\"segunda pasada:\")\nfor value in gen:\n    print(value)\nprint(\"(no salio nada: el generador se agoto)\")",
      note: "La primera pasada consumió los cuatro valores; la segunda encontró el stream vacío. Los generadores no rebobinan: si necesitás los valores de nuevo, creás otro generador (countdown(4) otra vez) o los guardás en una lista. Stream, no almacén."
    },
    {
      text: "<p>Generator expression: paréntesis en vez de corchetes, y el consumidor tira del hilo.</p>",
      code: "nums = range(1, 11)\n\nas_list = [x * x for x in nums]\nas_gen = (x * x for x in nums)\n\nprint(as_list)\nprint(as_gen)\nprint(sum(as_gen))",
      note: "La lista se imprime con sus valores (ya existen todos); el generador se imprime como objeto críptico (no calculó nada todavía). Recién sum() lo puso a trabajar, pidiendo valores de a uno. Con 10 números da igual; con 10 millones, la versión paréntesis usa la memoria de un solo elemento."
    }
  ]
});

DOJO_EXTEND("avanzado", "context", {
  concept: "<p>El <code>with open(...) as f:</code> que usás desde Intermedio no es sintaxis especial de archivos: es un protocolo abierto, los <strong>context managers</strong>. La idea: hay recursos que SIEMPRE deben liberarse — archivos que cerrar, conexiones que soltar — incluso si el código del medio explota.</p><h4>El problema que resuelve</h4><pre>f = open(\"datos.txt\")\nresultado = procesar(f)     # ¿y si esto tira una excepcion?\nf.close()                   # ...esta linea nunca corre: archivo colgado</pre><p>La solución artesanal es try/finally (el finally corre pase lo que pase). El with empaqueta ese patrón:</p><pre>with open(\"datos.txt\") as f:\n    resultado = procesar(f)\n# saliste del bloque: f esta cerrado, con o sin excepcion. Garantizado.</pre><h4>Cómo funciona por dentro</h4><p>Cualquier objeto con dos métodos especiales puede usarse en un with:</p><ul><li><code>__enter__</code>: corre al ENTRAR al bloque; lo que devuelve es lo que captura el <code>as</code>.</li><li><code>__exit__</code>: corre al SALIR — por las buenas o por excepción. Acá vive la limpieza.</li></ul><pre>class Session:\n    def __enter__(self):\n        print(\"abriendo\")\n        return self\n    def __exit__(self, exc_type, exc_value, tb):\n        print(\"cerrando (pase lo que pase)\")\n\nwith Session() as s:\n    print(\"trabajando\")</pre><p>Salida: abriendo, trabajando, cerrando. Y si \"trabajando\" explotara, \"cerrando\" saldría IGUAL — esa es toda la promesa del patrón: <em>adquirir y liberar, con garantía</em>.</p><p>Los tres parámetros extra de __exit__ describen la excepción si la hubo (None si no): un manager avanzado puede inspeccionarla y hasta decidir suprimirla. Eso lo explorás en los ejercicios.</p>",
  tutorial: [
    {
      text: "<p>Construí el context manager más simple posible y mirá el orden de los prints.</p>",
      code: "class Session:\n    def __enter__(self):\n        print(\"1. entrando (enter)\")\n        return self\n\n    def __exit__(self, exc_type, exc_value, tb):\n        print(\"3. saliendo (exit)\")\n\nwith Session() as s:\n    print(\"2. adentro del bloque\")\n\nprint(\"4. despues del with\")",
      note: "El orden fue exactamente 1-2-3-4: enter al entrar, tu bloque, exit al salir, y la vida sigue. El as s capturó lo que __enter__ devolvió (el return self). Hasta acá parece ceremonial — el valor aparece en el paso siguiente, cuando algo sale mal."
    },
    {
      text: "<p>La prueba de fuego: el bloque EXPLOTA en el medio. ¿Corre igual el exit?</p>",
      code: "class Session:\n    def __enter__(self):\n        print(\"entrando\")\n        return self\n\n    def __exit__(self, exc_type, exc_value, tb):\n        print(\"saliendo IGUAL, con excepcion y todo\")\n\ntry:\n    with Session() as s:\n        print(\"trabajando...\")\n        raise ValueError(\"algo salio mal\")\n        print(\"esto nunca corre\")\nexcept ValueError:\n    print(\"excepcion atrapada afuera\")",
      note: "Mirá la secuencia: trabajando → explosión → y el __exit__ corrió IGUAL antes de que la excepción siguiera viaje. Esa es la garantía completa: la limpieza no depende de que el código del medio se porte bien. Con archivos reales, esto es la diferencia entre datos guardados y datos corruptos."
    },
    {
      text: "<p>El caso real que ya venías usando sin saberlo: with open. Ahora sabés exactamente qué hace.</p>",
      code: "with open(\"prueba.txt\", \"w\") as f:\n    f.write(\"linea uno\\n\")\n    print(\"archivo abierto?\", not f.closed)\n\nprint(\"archivo abierto?\", not f.closed)",
      note: "Adentro del with: abierto. Una línea después de salir: cerrado — nadie escribió close(), lo hizo el __exit__ del archivo. Cada with open que escribiste desde Intermedio era este protocolo trabajando. Desmitificado: ahora podés construir los tuyos (Timer, Transaction, conexiones...), que es justo lo que piden los ejercicios."
    }
  ]
});

DOJO_EXTEND("avanzado", "typehints", {
  concept: "<p>Python no te pide declarar tipos... pero te deja <strong>anotarlos</strong>:</p><pre>def greet(name: str, times: int) -> str:\n    return f\"hola {name}\" * times</pre><p>Se lee: \"name es un str, times un int, y la función devuelve un str\". Las piezas: <code>parametro: tipo</code> y <code>-&gt; tipo</code> para el retorno.</p><h4>La regla de oro: Python los IGNORA al ejecutar</h4><p>Las anotaciones no validan nada en tiempo de ejecución — podés pasarle un número donde dice str y Python ni se inmuta (fallará después, o no). ¿Para qué sirven entonces?</p><ul><li><strong>Para humanos</strong>: la firma documenta el contrato completo sin leer el cuerpo. Documentación que vive pegada al código.</li><li><strong>Para herramientas</strong>: tu editor autocompleta mejor, y verificadores como <code>mypy</code> revisan TODO el programa sin ejecutarlo, marcando cada llamada con tipos incompatibles. Es atrapar bugs en el editor en vez de en producción.</li></ul><h4>El vocabulario que vas a usar</h4><pre>def f(nums: list[int]) -> dict[str, float]:   # colecciones CON su contenido\ndef g(x: int | None) -> str:                   # \"int o None\": el dato puede faltar</pre><p>Ese <code>| None</code> es de los más valiosos: declara honestamente \"esto puede no haber\", y obliga a quien llama a manejar el caso — el bug del None inesperado, cazado por contrato.</p><h4>El premio: dataclasses</h4><p>Las anotaciones habilitan magia real. Una <code>@dataclass</code> genera el __init__, el __repr__ y la comparación por igualdad a partir de los campos anotados:</p><pre>from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: float\n    y: float\n\np = Point(3.0, 4.0)    # init gratis\nprint(p)               # Point(x=3.0, y=4.0) — repr gratis</pre>",
  tutorial: [
    {
      text: "<p>Anotá una función y comprobá las dos cosas: las anotaciones quedan guardadas, pero Python NO las valida al ejecutar.</p>",
      code: "def repeat(word: str, times: int) -> str:\n    return (word + \" \") * times\n\nprint(repeat(\"eco\", 3))\nprint(repeat.__annotations__)\n\ntry:\n    repeat(5, 3)\nexcept TypeError as e:\n    print(\"TypeError:\", e)\n\nprint(\"el error vino de la SUMA, no de la anotacion\")",
      note: "Pasaste un int donde la firma decía str, y Python ni se inmutó al llamar: la función arrancó igual, y recién explotó adentro al intentar sumar 5 + \" \" (un TypeError de la operación, no del contrato). Las anotaciones no validan en ejecución: son para tu editor, para mypy y para humanos. Esa es LA regla del tema."
    },
    {
      text: "<p>El contrato del \"puede faltar\": <code>| None</code> y el chequeo obligado.</p>",
      code: "def find(items: list[str], target: str) -> int | None:\n    for i, item in enumerate(items):\n        if item == target:\n            return i\n    return None\n\npos = find([\"ana\", \"beto\"], \"beto\")\nmissing = find([\"ana\", \"beto\"], \"zoe\")\n\nprint(pos)\nprint(missing)\nif missing is not None:\n    print(\"encontrado en\", missing)\nelse:\n    print(\"no estaba — y el tipo me obligo a contemplarlo\")",
      note: "La firma -> int | None avisa: \"puedo devolver un índice... o nada\". Quien llama DEBE bifurcar antes de usar el resultado (el if del final). Un verificador de tipos rechaza el código que use missing como int sin chequear — el clásico 'NoneType' object has no... cazado antes de ejecutar."
    },
    {
      text: "<p>La dataclass: una clase entera generada desde campos anotados.</p>",
      code: "from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: float\n    y: float\n\na = Point(3.0, 4.0)\nb = Point(3.0, 4.0)\n\nprint(a)\nprint(a == b)\nprint(a.x + a.y)",
      note: "Sin escribir __init__ ni nada: constructor, impresión legible y comparación por contenido (a == b dio True: misma data, aunque sean dos objetos). Compará con tus clases del tema OOP, donde todo eso era manual. Acá las anotaciones dejaron de ser comentarios: son la DEFINICIÓN de la clase. Python moderno corre por esta vía."
    }
  ]
});

DOJO_EXTEND("avanzado", "proyecto-avanzado", {
  concept: "<p>Este proyecto es de <strong>arquitectura</strong>: las piezas no se suman, colaboran. Una dataclass para los datos (Book), una excepción propia para los fallos del dominio (BookNotAvailable), una clase con estado para las reglas (Library), un generador para las búsquedas perezosas (search) y un context manager para la garantía de devolución (LoanSession).</p><h4>Orden de construcción recomendado</h4><ol><li><code>Book</code> y <code>BookNotAvailable</code>: seis líneas entre ambas. Probalas con Ejecutar.</li><li><code>Library</code> sin search: add, __len__, borrow, give_back. Consejo de oro del enunciado: escribí un helper <code>_find</code> que borrow y give_back compartan.</li><li><code>search</code> como generador (repasá el tutorial de generadores si hace falta: es un for con yield).</li><li><code>LoanSession</code> al final: es el tutorial de context managers aplicado — registrar en take, devolver todo en __exit__.</li></ol><p>Probá cada etapa con los prints del starter antes de verificar. Si una pieza se resiste, su tema tiene Concepto, tutorial y modo socrático esperándote.</p>"
});
