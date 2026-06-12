/* ============================================================
   CONCEPTOS Y TUTORIALES — niveles NumPy e Intro a ML
   ============================================================ */

/* ---------------- NUMPY ---------------- */

DOJO_EXTEND("numpy", "np-arrays", {
  concept: "<p><strong>NumPy</strong> es LA librería de cálculo numérico de Python, y la base de todo el mundo de los datos y la IA (pandas, scikit-learn, PyTorch: todas construidas encima). Se importa siempre igual:</p><pre>import numpy as np</pre><p>(El alias <code>np</code> es convención universal: todo el código del planeta lo usa.)</p><h4>El array: una lista con superpoderes matemáticos</h4><p>Su estructura central es el <code>ndarray</code>: una grilla de números, todos del MISMO tipo, guardados compactos en memoria. Se crea desde listas:</p><pre>vec = np.array([1, 2, 3, 4])          # 1 dimension (vector)\nmat = np.array([[1, 2, 3],\n                [4, 5, 6]])           # 2 dimensiones (matriz: filas y columnas)</pre><h4>¿Por qué no alcanzan las listas?</h4><p>Dos razones. <strong>Velocidad</strong>: las operaciones de NumPy corren en código C optimizado, decenas de veces más rápido — con millones de números es la diferencia entre posible e imposible. <strong>Comodidad</strong>: las operaciones matemáticas funcionan sobre el array ENTERO de una vez (eso es el próximo tema). Mirá la diferencia de significado:</p><pre>[1, 2, 3] * 2            # lista: REPITE -> [1, 2, 3, 1, 2, 3]\nnp.array([1, 2, 3]) * 2  # array: MULTIPLICA -> [2, 4, 6]</pre><h4>shape: la geometría del array</h4><p>Todo array sabe su forma: <code>arr.shape</code> devuelve una tupla con el tamaño de cada dimensión:</p><pre>vec.shape    # (4,)    -> 1 dimension, 4 elementos\nmat.shape    # (2, 3)  -> 2 filas, 3 columnas (filas SIEMPRE primero)</pre><p>La mitad de los problemas con NumPy se diagnostican imprimiendo shapes. En datos/ML la convención es leer <code>(filas, columnas)</code> como <code>(muestras, variables)</code>: cada fila una observación, cada columna una característica.</p>",
  tutorial: [
    {
      text: "<p>Creá tu primer array y compará su comportamiento con la lista de la que salió. (La primera ejecución de este nivel descarga NumPy: dale unos segundos.)</p>",
      code: "import numpy as np\n\nlista = [1, 2, 3, 4]\narr = np.array(lista)\n\nprint(lista)\nprint(arr)\nprint(lista * 2)\nprint(arr * 2)",
      note: "La misma operación, dos significados: la lista * 2 se REPITIÓ (operación de secuencia), el array * 2 se MULTIPLICÓ elemento a elemento (operación matemática). Ese contraste es NumPy en una línea: los operadores se vuelven matemática. Fijate también que el array se imprime sin comas."
    },
    {
      text: "<p>Arrays 2D y la propiedad más consultada del universo NumPy: <code>shape</code>.</p>",
      code: "import numpy as np\n\nmat = np.array([[1, 2, 3],\n                [4, 5, 6]])\n\nprint(mat)\nprint(\"shape:\", mat.shape)\nprint(\"dimensiones:\", mat.ndim)\nprint(\"elementos:\", mat.size)",
      note: "shape (2, 3) se lee: 2 filas, 3 columnas — filas primero, siempre. ndim cuenta las dimensiones y size los elementos totales. Cuando una operación de NumPy te dé resultados raros, lo primero es imprimir shapes: es el equivalente del print(type(x)) de tus comienzos."
    },
    {
      text: "<p>Las fábricas: arrays generados sin tipear números, y reshape para cambiarles la forma.</p>",
      code: "import numpy as np\n\nprint(np.zeros(4))\nprint(np.arange(0, 10, 2))\nprint(np.linspace(0, 1, 5))\n\nflat = np.arange(6)\nprint(flat.reshape(2, 3))",
      note: "zeros inicializa, arange genera con paso (el 10 quedó afuera, como range), linspace reparte N puntos INCLUYENDO ambos extremos. Y reshape reacomodó 6 números en 2x3 sin moverlos de la memoria: misma data, otra geometría. La única regla: las cuentas tienen que dar (probá reshape(4, 2) con 6 elementos y leé el error)."
    }
  ]
});

DOJO_EXTEND("numpy", "np-vector", {
  concept: "<p>El superpoder central de NumPy: operar arrays <strong>enteros</strong> sin escribir loops. Se llama <strong>vectorización</strong>:</p><pre>a = np.array([1, 2, 3])\nb = np.array([10, 20, 30])\n\nprint(a + b)       # [11, 22, 33]  — elemento a elemento\nprint(a * b)       # [10, 40, 90]\nprint(a ** 2)      # [1, 4, 9]\nprint(np.sqrt(a))  # raiz de cada uno</pre><p>El loop existe, pero corre en C por dentro, a toda velocidad. Tu código solo declara QUÉ calcular. Regla del nivel: <em>si escribiste un for sobre un array, casi seguro había una forma vectorizada</em>.</p><h4>Broadcasting: operar formas distintas</h4><p>¿Y <code>a * 2</code>? El 2 no es un array... NumPy lo \"estira\" para que calce: eso es <strong>broadcasting</strong>. Funciona también entre matrices y vectores: una matriz (2,3) por un vector (3,) aplica el vector a CADA fila. La regla formal (alinear shapes desde la derecha; dimensión 1 o faltante se estira) la vas a ejercitar — la intuición es \"el chico se replica para acompañar al grande\".</p><h4>Estadísticas incorporadas y el eje</h4><pre>data.mean()   data.sum()   data.max()   data.std()    # sobre todo el array</pre><p>En matrices podés calcular POR fila o POR columna con <code>axis</code>:</p><pre>mat.sum(axis=0)   # colapsa las filas -> un total por COLUMNA\nmat.sum(axis=1)   # colapsa las columnas -> un total por FILA</pre><p>Regla mental: el axis que nombrás es el que DESAPARECE. Verificá siempre con la shape del resultado.</p><h4>Comparaciones que devuelven arrays</h4><pre>temps = np.array([22, 31, 18])\nprint(temps > 25)          # [False, True, False] — una mascara booleana\nprint((temps > 25).sum())  # 1 — contar los que cumplen (True vale 1)</pre><p>Esa \"máscara\" es una herramienta en sí misma: contar, filtrar (próximo tema) y reemplazar condicional con <code>np.where</code>.</p>",
  tutorial: [
    {
      text: "<p>Matemática sin loops: operá dos arrays enteros de un golpe.</p>",
      code: "import numpy as np\n\nprices = np.array([100.0, 250.0, 80.0])\nquantities = np.array([2, 1, 5])\n\ntotals = prices * quantities\nprint(totals)\nprint(\"venta total:\", totals.sum())\nprint(\"con 21% de impuesto:\", totals * 1.21)",
      note: "prices * quantities multiplicó posición por posición (100*2, 250*1, 80*5) sin que escribieras ningún for. Y totals * 1.21 es broadcasting: el escalar se aplicó a cada elemento. En Python puro esto eran dos loops con acumulador; acá, dos expresiones que se leen como la cuenta misma."
    },
    {
      text: "<p>El parámetro <code>axis</code>: la misma suma, tres preguntas distintas. Predecí las shapes antes de ejecutar.</p>",
      code: "import numpy as np\n\n# ventas: 2 sucursales (filas) x 3 productos (columnas)\nsales = np.array([[10, 25, 40],\n                  [30, 15, 20]])\n\nprint(\"todo:\", sales.sum())\nprint(\"por producto (axis=0):\", sales.sum(axis=0))\nprint(\"por sucursal (axis=1):\", sales.sum(axis=1))",
      note: "Sin axis: un solo número (140). axis=0 colapsó las filas y quedó un total por producto: [40, 40, 60], shape (3,). axis=1 colapsó las columnas: un total por sucursal, [75, 65], shape (2,). El eje que nombrás es el que se sacrifica — contraintuitivo al principio, automático a la décima vez."
    },
    {
      text: "<p>Comparaciones vectorizadas: la condición se vuelve un array de booleanos, y ese array es útil.</p>",
      code: "import numpy as np\n\ntemps = np.array([22, 31, 35, 18, 28, 40])\n\nmask = temps > 25\nprint(mask)\nprint(\"dias calurosos:\", mask.sum())\nprint(\"fraccion calurosa:\", mask.mean())\nprint(np.where(temps > 30, 30, temps))",
      note: "La comparación produjo una máscara de True/False. Sumarla cuenta (True vale 1); su media da la PROPORCIÓN que cumple — ese idiom exacto va a calcular accuracy en ML. Y np.where(condicion, a, b) es el if/else vectorizado: techo de 30 aplicado a todo el array en una llamada."
    }
  ]
});

DOJO_EXTEND("numpy", "np-indexing", {
  concept: "<p>Seleccionar datos es la mitad del trabajo. NumPy extiende el indexing que ya sabés con tres herramientas.</p><h4>1. Coordenadas con coma (2D)</h4><p>En matrices, los corchetes aceptan <code>[fila, columna]</code>, y cada posición admite índices o slices. El <code>:</code> solo significa \"todo este eje\":</p><pre>m = np.array([[1, 2, 3],\n              [4, 5, 6],\n              [7, 8, 9]])\n\nm[1]        # fila entera: [4, 5, 6]\nm[1, 2]     # un elemento: 6\nm[:, 0]     # columna entera: [1, 4, 7]   <- imposible con listas!\nm[0:2, 1:]  # submatriz (rectangulo)</pre><p>La lectura en datos: una fila = una muestra; una columna = una variable de todas las muestras.</p><h4>2. Máscaras booleanas: filtrar por condición</h4><p>La joya del análisis de datos — una condición ADENTRO del corchete:</p><pre>scores = np.array([55, 82, 91, 40])\nscores[scores >= 70]      # [82, 91] — solo los que cumplen</pre><p>Funciona porque <code>scores &gt;= 70</code> produce la máscara <code>[False, True, True, False]</code>, y el corchete selecciona donde hay True. Para condiciones combinadas: <code>&amp;</code> (y), <code>|</code> (o), cada condición ENTRE PARÉNTESIS — los <code>and</code>/<code>or</code> de Python no funcionan con arrays:</p><pre>scores[(scores >= 60) & (scores < 90)]</pre><h4>3. Fancy indexing: una lista de posiciones</h4><pre>arr = np.array([10, 20, 30, 40])\narr[[0, 2]]               # [10, 30] — las posiciones que pidas, en ese orden</pre><p>Su socio es <code>np.argsort</code>, que devuelve los ÍNDICES que ordenarían el array — y esos índices podés aplicarlos a OTRO array paralelo (nombres ordenados por puntaje, por ejemplo). El combo argsort + fancy indexing es el \"top-k de cualquier cosa\".</p>",
  tutorial: [
    {
      text: "<p>Coordenadas con coma: practicá leer filas, columnas y celdas de una matriz.</p>",
      code: "import numpy as np\n\nm = np.array([[1, 2, 3],\n              [4, 5, 6],\n              [7, 8, 9]])\n\nprint(\"fila 1:\", m[1])\nprint(\"celda 1,2:\", m[1, 2])\nprint(\"columna 0:\", m[:, 0])\nprint(\"submatriz:\")\nprint(m[0:2, 1:])",
      note: "m[:, 0] es la operación nueva: \"todas las filas, columna 0\" — extraer una columna entera, imposible con listas anidadas. Y la submatriz combinó un slice por eje: un rectángulo recortado. En datasets reales esto es \"dame la variable precio de todas las muestras\" o \"las primeras 100 filas\"."
    },
    {
      text: "<p>Filtrado booleano: la condición adentro del corchete. El gesto más usado del análisis de datos.</p>",
      code: "import numpy as np\n\nages = np.array([15, 32, 8, 47, 22, 65, 12])\n\nprint(ages[ages >= 18])\nprint(ages[(ages >= 18) & (ages < 60)])\nprint(\"menores:\", (ages < 18).sum())",
      note: "Primera línea: solo los mayores. Segunda: dos condiciones con & y sus paréntesis obligatorios (probá con 'and' y vas a ver el error famoso: truth value is ambiguous). Tercera: la máscara sumada cuenta sin filtrar. Filtrar-por-condición es el WHERE de las bases de datos, y en pandas va a ser idéntico."
    },
    {
      text: "<p>argsort: índices que ordenan — y que podés aplicar a un array PARALELO.</p>",
      code: "import numpy as np\n\nnames = np.array([\"ana\", \"beto\", \"carla\"])\nscores = np.array([72, 95, 58])\n\norder = np.argsort(scores)[::-1]\nprint(\"indices de mejor a peor:\", order)\nprint(\"ranking:\", names[order])\nprint(\"podio:\", names[order[:2]])",
      note: "argsort no ordenó los puntajes: devolvió EN QUÉ ORDEN habría que tomarlos ([::-1] lo invirtió a descendente). Y la magia: esos índices, calculados sobre scores, se aplicaron sobre names — porque van en paralelo, el ranking quedó coherente. sort() te daría los números ordenados pero huérfanos: ¿de quién era cada puntaje?"
    }
  ]
});

DOJO_EXTEND("numpy", "np-linalg", {
  concept: "<p>El álgebra lineal es el idioma matemático del machine learning — una red neuronal es, literalmente, una cadena de multiplicaciones de matrices. Acá, el vocabulario mínimo.</p><h4>El producto punto (dot product)</h4><p>Entre dos vectores: multiplicar posición por posición y SUMAR todo. Da un solo número:</p><pre>u = np.array([1, 2, 3])\nv = np.array([4, 5, 6])\nprint(u @ v)              # 1*4 + 2*5 + 3*6 = 32</pre><p>¿Qué mide? Cuánto \"se parecen\" dos vectores: grande si apuntan parecido, cero si son perpendiculares. Los buscadores semánticos comparan textos así, y cada neurona artificial calcula exactamente esto.</p><h4>La multiplicación de matrices: @ no es *</h4><p>Dos operaciones DISTINTAS que es vital no confundir:</p><ul><li><code>A * B</code>: elemento a elemento — cada casilla con su casilla.</li><li><code>A @ B</code>: multiplicación DE MATRICES — cada celda del resultado es el producto punto de una fila de A con una columna de B.</li></ul><p>Con matrices cuadradas ambas corren sin error y dan resultados distintos: el bug silencioso más caro de ML. Para que <code>A @ B</code> exista, las dimensiones internas deben calzar: <code>(m,n) @ (n,p) → (m,p)</code> — los n se \"consumen\".</p><h4>El resto del kit</h4><pre>A.T                    # transpuesta: filas <-> columnas\nnp.eye(3)              # matriz identidad (el \"1\" de las matrices)\nnp.linalg.solve(A, b)  # resuelve el sistema de ecuaciones Ax = b\nnp.linalg.inv(A)       # matriz inversa\nnp.linalg.norm(v)      # longitud de un vector (Pitagoras generalizado)</pre><p>Regla de cultura numérica: los resultados son floats con redondeo — se verifican con <code>np.allclose(x, y)</code> (¿iguales dentro de la tolerancia?), nunca con <code>==</code>.</p>",
  tutorial: [
    {
      text: "<p>El producto punto, calculado a mano y con el operador. Verificá que es lo mismo.</p>",
      code: "import numpy as np\n\nu = np.array([1, 2, 3])\nv = np.array([4, 5, 6])\n\nmanual = (u * v).sum()\nprint(\"a mano:\", manual)\nprint(\"con @ :\", u @ v)\n\nprint(\"perpendiculares:\", np.array([1, 0]) @ np.array([0, 5]))",
      note: "Multiplicar y sumar: 4 + 10 + 18 = 32, igual por ambos caminos. Y el caso perpendicular dio 0: vectores en ángulo recto no \"colaboran\" nada — el dot mide alineación. Cuando leas que un buscador compara embeddings, es esta línea con vectores de 1000 dimensiones."
    },
    {
      text: "<p>La diferencia crítica: <code>*</code> contra <code>@</code>. Mismo par de matrices, dos resultados.</p>",
      code: "import numpy as np\n\nA = np.array([[1, 2],\n              [3, 4]])\nB = np.array([[10, 20],\n              [30, 40]])\n\nprint(\"A * B (elemento a elemento):\")\nprint(A * B)\nprint(\"A @ B (multiplicacion de matrices):\")\nprint(A @ B)",
      note: "A * B: casilla por casilla (1*10=10 arriba a la izquierda). A @ B: la celda [0,0] es fila [1,2] punto columna [10,30] = 70. Ningún error te avisó de la diferencia — por eso conviene verificar UNA celda a mano cuando una operación matricial te importe. En ML, @ es la estrella: cada capa de red es W @ x."
    },
    {
      text: "<p>Resolver un sistema de ecuaciones de verdad: 2 manzanas + 1 banana = 5; 1 manzana + 3 bananas = 10.</p>",
      code: "import numpy as np\n\nA = np.array([[2, 1],\n              [1, 3]])\nb = np.array([5, 10])\n\nprices = np.linalg.solve(A, b)\nprint(\"manzana, banana:\", prices)\nprint(\"verificacion:\", A @ prices)\nprint(\"coincide con b?\", np.allclose(A @ prices, b))",
      note: "solve despejó las incógnitas: manzana $1, banana $3 (comprobalo de cabeza). La verificación con allclose es el hábito profesional: A @ x reconstruye b, dentro de la tolerancia de los floats. \"Encontrá los parámetros que satisfacen estos datos\" — que es entrenar un modelo — es un primo de este problema de frutas."
    }
  ]
});

DOJO_EXTEND("numpy", "proyecto-numpy", {
  concept: "<p>Un dataset real en miniatura: la matriz de notas (5 estudiantes x 4 exámenes) y todas las preguntas que un analista le haría. La regla del proyecto: <strong>cero loops</strong> — cada respuesta es una operación vectorizada.</p><h4>El mapa</h4><ul><li>Promedios por estudiante y por examen: <code>mean</code> con su <code>axis</code> (¿cuál sobrevive? razonalo con shapes).</li><li>Mejor estudiante / examen más difícil: <code>argmax</code> / <code>argmin</code> — índices, no valores.</li><li>La curva con techo: broadcasting + <code>np.clip</code>.</li><li>Aprobados: máscara sobre promedios, aplicada a las FILAS de la matriz.</li><li>Estandarización por examen: broadcasting de (5,4) contra (4,).</li></ul><p>Trabajá variable por variable, ejecutando y mirando shapes en cada paso. Si un axis te confunde, el tutorial de Operaciones vectorizadas tiene el experimento exacto para repasarlo.</p>"
});

/* ---------------- INTRO A ML ---------------- */

DOJO_EXTEND("ml", "ml-intro", {
  concept: "<p><strong>Machine learning en una frase:</strong> en vez de escribir las reglas a mano, le das ejemplos a la máquina y ella encuentra los números que mejor los explican.</p><h4>Desarmemos la frase</h4><p>Un <strong>modelo</strong> es una función con números ajustables llamados <strong>parámetros</strong>. El más simple del mundo:</p><pre>precio = w * superficie + b     # w y b son los parametros</pre><p>Con w=1200 y b=50000 tenés UNA versión del modelo; con w=1850, otra. ¿Cuál es mejor? La que menos se equivoca contra los ejemplos reales. Y \"equivocarse\" se mide con un número:</p><h4>El error (MSE)</h4><p>Para cada ejemplo: cuánto difiere la predicción de la realidad. Se elevan al cuadrado (para que dé igual errar por arriba o por abajo, y para castigar MÁS los errores grandes) y se promedian:</p><pre>errores = predicciones - reales\nmse = (errores ** 2).mean()      # mean squared error</pre><p><strong>Entrenar = buscar los parámetros que minimizan ese número.</strong> Probá valores, medí el error, quedate con lo mejor. Eso es TODO el machine learning — el resto son formas más astutas de buscar.</p><h4>El vocabulario de los datos</h4><ul><li><code>X</code> — <strong>features</strong>: las variables de entrada (superficie, ambientes...). Matriz: una fila por ejemplo.</li><li><code>y</code> — <strong>target</strong>: lo que querés predecir (el precio). Un valor por ejemplo.</li></ul><h4>El control de sanidad: el baseline</h4><p>Antes de festejar un modelo, compararlo contra la predicción más tonta posible: decir siempre el promedio. Si tu modelo no le gana CÓMODO a eso, no aprendió nada. Todo número de error es relativo a esa vara.</p>",
  tutorial: [
    {
      text: "<p>Un modelo escrito a mano: parámetros inventados por un humano. Tasá tres casas con él.</p>",
      code: "import numpy as np\n\n# el \"modelo\" de la inmobiliaria: $1200 el metro, $50000 de base\nw = 1200\nb = 50000\n\nareas = np.array([50, 80, 120])\npredictions = w * areas + b\nprint(predictions)",
      note: "Una función lineal con dos parámetros tasó tres casas (vectorización mediante). Esto YA es un modelo — solo que w y b salieron de la intuición de alguien. La pregunta que abre todo el nivel: ¿y si los datos reales dijeran que el metro vale 1850? ¿Cómo lo descubrimos? Midiendo errores. Siguiente paso."
    },
    {
      text: "<p>Midamos qué tan mal tasa: el MSE contra precios reales conocidos.</p>",
      code: "import numpy as np\n\nareas = np.array([50.0, 80.0, 120.0])\nreal_prices = np.array([95000.0, 152000.0, 230000.0])\n\nfor w in [1000, 1500, 1900, 2400]:\n    predictions = w * areas\n    mse = ((predictions - real_prices) ** 2).mean()\n    print(f\"w={w}: error {mse:,.0f}\")",
      note: "Cuatro candidatos para w, cuatro errores — y hay un claro ganador (mirá cuál da el error mínimo). Acabás de ver la esencia del entrenamiento: probar parámetros y elegir el de menor error. Lo que cambia en ML real es solo la elegancia de la búsqueda: en vez de 4 candidatos a mano, millones de ajustes automáticos."
    },
    {
      text: "<p>La vara de todo modelo: el baseline de \"predecir siempre el promedio\".</p>",
      code: "import numpy as np\n\nreal = np.array([10.0, 12.0, 11.0, 9.0, 13.0])\nmodel_preds = np.array([9.8, 12.3, 10.9, 9.4, 12.6])\n\nbaseline = np.full(5, real.mean())\nbaseline_mse = ((baseline - real) ** 2).mean()\nmodel_mse = ((model_preds - real) ** 2).mean()\n\nprint(\"baseline (la media):\", baseline_mse)\nprint(\"modelo:\", model_mse)\nprint(\"mejora:\", baseline_mse / model_mse, \"veces\")",
      note: "El modelo le ganó al baseline por varias veces: aprendió algo real. Si hubiera empatado o perdido, sus predicciones serían humo aunque parecieran sofisticadas. Este ritual — baseline primero, modelo después, comparar — es lo que separa al profesional del entusiasta. Hacelo SIEMPRE."
    }
  ]
});

DOJO_EXTEND("ml", "ml-model", {
  concept: "<p>Tu primer modelo entrenado de verdad: la <strong>regresión lineal</strong> — encontrar la recta <code>y = w·x + b</code> que mejor atraviesa una nube de puntos. La vas a entrenar por DOS caminos, y que lleguen al mismo destino es la gracia del tema.</p><h4>Camino 1: la fórmula cerrada</h4><p>Para este modelo (y casi ningún otro) existe la respuesta exacta en un paso:</p><pre>w = mean((x - x.mean()) * (y - y.mean())) / mean((x - x.mean()) ** 2)\nb = y.mean() - w * x.mean()</pre><p>El numerador mide \"cuando x sube, ¿y sube?\" (covarianza); el denominador normaliza. No hace falta memorizarla — hace falta saber que existe, como verdad de referencia.</p><h4>Camino 2: gradient descent — el motor universal</h4><p>Para los modelos donde NO hay fórmula (o sea: casi todos, redes neuronales incluidas), se busca a pasitos:</p><ol><li>Arrancá con parámetros cualquiera (w=0, b=0).</li><li>Calculá el error.</li><li>Calculá el <strong>gradiente</strong>: hacia dónde crece el error si movés cada parámetro. (Las fórmulas, derivadas del MSE: <code>dw = 2·mean((pred−y)·x)</code>, <code>db = 2·mean(pred−y)</code>.)</li><li>Mové cada parámetro EN CONTRA de su gradiente, un pasito: <code>w = w − lr·dw</code>. El <code>lr</code> (learning rate) es el tamaño del paso.</li><li>Repetí cientos de veces (cada vuelta se llama <em>época</em>).</li></ol><p>La metáfora exacta: bajar una montaña con niebla — sentís la pendiente bajo los pies (gradiente) y das un paso cuesta abajo (update). El learning rate importa: muy chico y tardás una eternidad; muy grande y rebotás de ladera en ladera hasta salir despedido (el error DIVERGE).</p><p>El registro del error por época se llama <em>curva de pérdida</em> (loss curve): si baja y se aplana, vas bien. Es el electrocardiograma del entrenamiento — vas a mirar miles en tu vida ML.</p>",
  tutorial: [
    {
      text: "<p>Fabricá un dataset donde VOS conocés la verdad (w=2.5, b=10 más ruido). Así podés verificar que el entrenamiento la redescubre.</p>",
      code: "import numpy as np\n\nnp.random.seed(42)\nx = np.random.rand(80) * 10\ny = 2.5 * x + 10 + np.random.randn(80)\n\nprint(\"primeras x:\", x[:3].round(2))\nprint(\"primeras y:\", y[:3].round(2))\nprint(\"si x=4, 'la verdad' diria y =\", 2.5 * 4 + 10)",
      note: "80 puntos alrededor de la recta y = 2.5x + 10, con ruido gaussiano encima (como los datos reales, que nunca caen exactos). La semilla 42 hace todo reproducible. Datos sintéticos con verdad conocida: el laboratorio perfecto para aprender, porque cuando el modelo diga w≈2.5 vas a SABER que funcionó."
    },
    {
      text: "<p>La fórmula cerrada: dos líneas que encuentran la mejor recta. ¿Recupera el 2.5 y el 10?</p>",
      code: "import numpy as np\n\nnp.random.seed(42)\nx = np.random.rand(80) * 10\ny = 2.5 * x + 10 + np.random.randn(80)\n\ndx = x - x.mean()\ndy = y - y.mean()\nw = (dx * dy).mean() / (dx ** 2).mean()\nb = y.mean() - w * x.mean()\n\nprint(\"w encontrado:\", round(w, 3), \"(verdad: 2.5)\")\nprint(\"b encontrado:\", round(b, 3), \"(verdad: 10)\")",
      note: "De 80 puntos ruidosos, la fórmula extrajo w≈2.5 y b≈10: la verdad subyacente, recuperada a pesar del ruido. Esto es exactamente lo que hace LinearRegression().fit() de scikit-learn por dentro. No fue magia: covarianza dividida varianza — \"cuánta y por unidad de x\"."
    },
    {
      text: "<p>Gradient descent en vivo: mirá el error desplomarse época a época hacia el mismo destino.</p>",
      code: "import numpy as np\n\nnp.random.seed(42)\nx = np.random.rand(80) * 10\ny = 2.5 * x + 10 + np.random.randn(80)\n\nw, b, lr = 0.0, 0.0, 0.02\nfor epoch in range(300):\n    preds = w * x + b\n    errors = preds - y\n    if epoch % 60 == 0:\n        print(f\"epoca {epoch}: error {(errors ** 2).mean():.2f}\")\n    w = w - lr * 2 * (errors * x).mean()\n    b = b - lr * 2 * errors.mean()\n\nprint(\"final: w =\", round(w, 2), \" b =\", round(b, 2))",
      note: "El error arrancó enorme (~560) y se desplomó hacia ~1 (el piso: el ruido que ningún modelo puede explicar). Y los parámetros finales: w≈2.5, b cerca de 10 — el MISMO destino que la fórmula, alcanzado a pasitos ciegos. Este loop de cuatro líneas (predecir, medir, gradiente, paso) es estructuralmente IDÉNTICO al que entrena una red de mil millones de parámetros. Jugá con lr: probá 0.001 (lento) y 0.04 (al borde del rebote)."
    }
  ]
});

DOJO_EXTEND("ml", "ml-split", {
  concept: "<p>La pregunta final, y la más importante de todo el nivel: tu modelo, ¿<strong>aprendió el patrón</strong> o <strong>memorizó los ejemplos</strong>? Parecen lo mismo y son opuestos.</p><h4>La trampa de evaluar con lo que entrenaste</h4><p>Un modelo con suficiente memoria puede clavar error CERO en los datos que vio... y ser inútil con datos nuevos. Como un alumno que memorizó las respuestas del examen de práctica: 10 en el ensayo, desastre en el examen real. Evaluar con los datos de entrenamiento siempre da números optimistas — no es evidencia de nada.</p><h4>La solución: esconder datos</h4><p>ANTES de entrenar, partís el dataset en dos:</p><ul><li><strong>Train</strong> (típicamente 75-80%): para entrenar. El modelo los ve.</li><li><strong>Test</strong> (el resto): bajo llave. El modelo JAMÁS los ve durante el entrenamiento. Al final, se evalúa ahí — y ese es el único número honesto.</li></ul><p>Mecánica: se barajan los ÍNDICES con una permutación aleatoria (con semilla, para reproducir) y se reparte. Barajar importa: los datos suelen venir ordenados (por fecha, por tamaño), y cortar sin mezclar te dejaría entrenando con un tipo de casos y evaluando con otro.</p><h4>Cómo leer los dos errores</h4><ul><li>train ≈ test, ambos razonables → el modelo <strong>generaliza</strong>: aprendió el patrón.</li><li>train bajísimo, test alto → <strong>overfitting</strong>: memorizó. La brecha es el síntoma.</li></ul><h4>Para clasificadores: accuracy</h4><p>Cuando se predicen categorías (spam/no spam), la métrica natural es la fracción de aciertos — tu viejo idiom de máscaras:</p><pre>accuracy = (predictions == y_real).mean()</pre><p>Con su trampa conocida: si el 99% de los casos son de una clase, \"predecir siempre esa clase\" acierta 99% sin saber nada. El baseline, siempre el baseline.</p>",
  tutorial: [
    {
      text: "<p>La mecánica del split: barajar índices y repartir. Con 10 elementos se ve entera.</p>",
      code: "import numpy as np\n\nnp.random.seed(0)\nindices = np.random.permutation(10)\nprint(\"barajados:\", indices)\n\ntest_idx = indices[:2]\ntrain_idx = indices[2:]\nprint(\"test :\", test_idx)\nprint(\"train:\", train_idx)",
      note: "permutation(10) devolvió los números 0-9 en orden aleatorio (reproducible por la semilla), y el slicing los repartió: 2 para test, 8 para train, sin repetidos ni faltantes. No se barajan los datos: se barajan los ÍNDICES — así el mismo reparto se aplica coherentemente a x, a y, y a lo que haga falta."
    },
    {
      text: "<p>El experimento del nivel: el modelo \"loro\" que memoriza todo contra la humilde recta. Mirá los cuatro números con atención.</p>",
      code: "import numpy as np\n\nnp.random.seed(42)\nx = np.random.rand(80) * 10\ny = 2.5 * x + 10 + np.random.randn(80)\n\nnp.random.seed(0)\nidx = np.random.permutation(80)\nx_tr, x_te = x[idx[20:]], x[idx[:20]]\ny_tr, y_te = y[idx[20:]], y[idx[:20]]\n\ndef memo_predict(q):\n    return y_tr[np.argmin(np.abs(x_tr - q))]\n\nmemo_train = np.array([memo_predict(q) for q in x_tr])\nmemo_test = np.array([memo_predict(q) for q in x_te])\n\nprint(\"loro en train:\", ((memo_train - y_tr) ** 2).mean())\nprint(\"loro en test :\", ((memo_test - y_te) ** 2).mean())",
      note: "El loro (que ante cada consulta devuelve el y del punto más parecido que memorizó) dio error 0.0 EXACTO en train — cada punto se encontró a sí mismo. Perfección total... y en test, error grande: ante datos nuevos devuelve el valor de OTRO punto, ruido incluido. Eso es overfitting puro: la brecha train/test lo delata. Solo el test set cuenta la verdad."
    },
    {
      text: "<p>Cierre: accuracy de un clasificador con el idiom de máscaras que conocés hace un nivel.</p>",
      code: "import numpy as np\n\ny_real = np.array([1, 0, 1, 1, 0, 1, 0, 0])\ny_pred = np.array([1, 0, 1, 0, 0, 1, 1, 0])\n\nhits = y_pred == y_real\nprint(\"aciertos:\", hits)\nprint(\"accuracy:\", hits.mean())\n\nbaseline = np.zeros(8)\nprint(\"baseline (todo 0):\", (baseline == y_real).mean())",
      note: "(pred == real).mean(): la comparación da la máscara de aciertos, la media da la fracción — 75% acá. Y el baseline tonto (predecir siempre 0) saca 50%: tu clasificador deberá ganarle a eso para presumir. Con esto tenés el kit completo: modelo, error, split honesto y métrica. El proyecto final los junta todos."
    }
  ]
});

DOJO_EXTEND("ml", "proyecto-ml", {
  concept: "<p>El examen final del dojo: el pipeline completo de un proyecto de ML, en el orden profesional exacto — datos → split → entrenar (solo con train) → evaluar (train y test) → comparar contra baseline → predecir un caso nuevo.</p><h4>Las reglas de oro que el proyecto verifica</h4><ul><li>El split va ANTES de todo: el test set queda bajo llave hasta el final. Hasta la media del baseline se calcula con train.</li><li>Cada función ya la escribiste en los temas: el proyecto es reconstruirlas de memoria y conectarlas. Espiá solo después de intentar.</li><li>El reporte final importa: activá los prints y LEÉ tus números — ¿w recuperó el precio por metro? ¿train y test se parecen? ¿el baseline quedó aplastado? Si las tres respuestas son sí, tu pipeline es real.</li></ul><p>Cuando este proyecto pase los tests, vas a haber implementado, entendiendo cada línea, lo que la industria hace con scikit-learn a diario. Ese era el objetivo del dojo entero.</p>"
});
