/* ============================================================
   NUMPY: arrays, operaciones vectorizadas, indexing,
   álgebra lineal y proyecto integrador
   (la primera ejecución de este nivel descarga NumPy: paciencia)
   ============================================================ */
DOJO_PUSH("numpy", [

/* ---------------- Arrays ---------------- */
{
  id: "np-arrays",
  title: "Arrays: la estructura de la IA",
  intro: "El <code>ndarray</code> de NumPy es una grilla de números del MISMO tipo, compacta en memoria y operable en bloque. Todo el stack de IA — pandas, scikit-learn, PyTorch — habla este idioma. La primera ejecución descarga NumPy (~10 MB): dale unos segundos.",
  socratic: [
    {
      q: "Ya tenés listas de Python, que aceptan números. ¿Por qué la ciencia de datos entera se montó sobre OTRO contenedor?",
      a: "Por memoria y velocidad, con la misma raíz: una lista de Python guarda PUNTEROS a objetos int dispersos por la memoria (cada uno con su overhead); un array guarda los números crudos, contiguos, todos del mismo tipo. Eso permite que las operaciones corran en C sobre bloques compactos — 10 a 100 veces más rápido — y que un dataset quepa en RAM. Con 3 números da igual; con 30 millones de parámetros de un modelo, es la diferencia entre posible e imposible."
    },
    {
      q: "¿Qué te dice <code>arr.shape</code>? ¿Y por qué (4,), (4, 1) y (1, 4) son TRES formas distintas?",
      a: "La shape es la geometría: cuántas dimensiones y cuánto mide cada una. <code>(4,)</code> es un vector plano de 4; <code>(4, 1)</code> es una matriz columna; <code>(1, 4)</code> una matriz fila — mismos 4 números, geometrías distintas, y las operaciones entre arrays dependen de la geometría (lo vas a sufrir y amar con broadcasting). La mitad de los bugs de NumPy se diagnostican imprimiendo .shape."
    },
    {
      q: "Si metés un float en un array de ints — <code>np.array([1, 2, 3.5])</code> — ¿qué hace NumPy? ¿Por qué no puede simplemente mezclar?",
      a: "Promociona TODO a float64: el array es homogéneo por contrato (esa es la base de su eficiencia — elementos del mismo tamaño, operaciones uniformes), así que ante la mezcla, elige el tipo que no pierde información. El dtype es el tipo único compartido. Corolario práctico: un solo valor raro puede cambiarte el dtype del dataset entero — por eso siempre se chequea al cargar datos."
    },
    {
      q: "<code>reshape(3, 4)</code> reorganiza 12 números en 3 filas de 4. ¿Copia los datos? ¿Y qué hace el -1 en reshape(3, -1)?",
      a: "No copia (casi nunca): devuelve una VISTA — los mismos bytes con otra geometría encima; por eso es gratis incluso en arrays gigantes. El -1 es \"calculalo vos\": con 12 elementos y 3 filas, NumPy deduce 4 columnas. Imprescindible cuando una dimensión depende del tamaño de los datos (batch de tamaño variable en ML, por ejemplo)."
    }
  ],
  exercises: [
    {
      id: "np-arr-1",
      title: "Del list al ndarray",
      difficulty: 1,
      prompt: "<p>Importá NumPy con su alias universal (<code>import numpy as np</code>) y creá:</p><ul><li><code>vec</code>: un array a partir de la lista <code>[3, 1, 4, 1, 5, 9]</code></li><li><code>mat</code>: un array 2D a partir de <code>[[1, 2, 3], [4, 5, 6]]</code></li><li><code>vec_shape</code>, <code>mat_shape</code>: las shapes de ambos (atributo, no función)</li><li><code>mat_dims</code>: el número de dimensiones de mat (atributo <code>ndim</code>)</li></ul><p>Imprimí todo: mirá cómo se ve un array 2D al imprimirse.</p>",
      starter: "import numpy as np\n\n# vec = ?\n# mat = ?\n# vec_shape = ?\n# mat_shape = ?\n# mat_dims = ?\n",
      tests: "import numpy as _np\nassert isinstance(vec, _np.ndarray), \"vec debe ser un ndarray: np.array(lista)\"\nassert vec.tolist() == [3, 1, 4, 1, 5, 9], f\"vec: {vec}\"\nassert mat.tolist() == [[1, 2, 3], [4, 5, 6]], f\"mat: {mat}\"\nassert vec_shape == (6,), f\"vec_shape: {vec_shape}\"\nassert mat_shape == (2, 3), f\"mat_shape: {mat_shape}\"\nassert mat_dims == 2, f\"mat_dims: {mat_dims}\"",
      solution: "import numpy as np\n\nvec = np.array([3, 1, 4, 1, 5, 9])\nmat = np.array([[1, 2, 3], [4, 5, 6]])\n\nvec_shape = vec.shape\nmat_shape = mat.shape\nmat_dims = mat.ndim",
      explanation: "<p>Dos lecturas de shape para fijar la convención: <code>(6,)</code> — UNA dimensión de 6 elementos (la coma delata que es una tupla de un elemento, ¿la recordás de Básico?); <code>(2, 3)</code> — 2 filas, 3 columnas, SIEMPRE en ese orden: filas primero. En ML lo vas a leer como <code>(n_samples, n_features)</code>: cada fila una observación, cada columna una variable — grabate esa lectura, es el formato universal de los datasets.</p><p><code>shape</code> y <code>ndim</code> son atributos (sin paréntesis): datos que el array ya conoce, no cálculos.</p>",
      hints: ["np.array(lista) convierte; np.array(lista_de_listas) crea 2D.", "shape y ndim van sin paréntesis: son atributos, no métodos."]
    },
    {
      id: "np-arr-2",
      title: "Fábricas de arrays",
      difficulty: 2,
      prompt: "<p>Casi nunca tipeás los números a mano. Las fábricas:</p><ul><li><code>zeros_v</code>: 5 ceros — <code>np.zeros(5)</code></li><li><code>ones_m</code>: matriz 2×3 de unos — la shape va como TUPLA: <code>np.ones((2, 3))</code></li><li><code>evens</code>: los pares de 0 a 8 con <code>np.arange(inicio, fin, paso)</code> → <code>[0, 2, 4, 6, 8]</code></li><li><code>grid</code>: 5 puntos equiespaciados entre 0 y 1 INCLUSIVE con <code>np.linspace</code> → <code>[0, 0.25, 0.5, 0.75, 1]</code></li></ul><p>arange vs linspace: uno fija el PASO (fin excluido, como range), el otro fija la CANTIDAD (fin incluido). Elegir mal es un clásico.</p>",
      starter: "import numpy as np\n\n# zeros_v = ?\n# ones_m = ?\n# evens = ?\n# grid = ?\n",
      tests: "import numpy as _np\nassert zeros_v.tolist() == [0.0] * 5, f\"zeros_v: {zeros_v}\"\nassert ones_m.shape == (2, 3) and ones_m.tolist() == [[1.0, 1.0, 1.0], [1.0, 1.0, 1.0]], f\"ones_m: {ones_m}\"\nassert evens.tolist() == [0, 2, 4, 6, 8], f\"evens: {evens}\"\nassert _np.allclose(grid, [0, 0.25, 0.5, 0.75, 1]), f\"grid: {grid}\"",
      solution: "import numpy as np\n\nzeros_v = np.zeros(5)\nones_m = np.ones((2, 3))\nevens = np.arange(0, 10, 2)\ngrid = np.linspace(0, 1, 5)",
      explanation: "<p>Cada fábrica tiene su escenario: <code>zeros</code> inicializa acumuladores (los gradientes de una red arrancan en cero), <code>ones</code> crea máscaras y bias, <code>arange</code> genera índices con paso conocido, <code>linspace</code> muestrea intervalos para graficar funciones (\"dame 100 puntos entre -π y π\").</p><p>El contraste clave quedó a la vista: <code>arange(0, 10, 2)</code> NO incluye el 10 (herencia directa de range), <code>linspace(0, 1, 5)</code> SÍ incluye el 1 — porque pediste \"5 puntos del 0 al 1\", y sin los extremos el pedido no tendría sentido. Y el detalle de la doble paréntesis en <code>ones((2, 3))</code>: la shape es UN argumento (una tupla), no dos sueltos.</p>",
      hints: ["La shape multidimensional va como tupla: np.ones((2, 3)) — paréntesis dobles.", "arange excluye el fin (como range): para llegar al 8 con paso 2, el fin es 10 (o 9).", "linspace(inicio, fin, cantidad) — y el fin SÍ entra."]
    },
    {
      id: "np-arr-3",
      title: "reshape: misma data, otra geometría",
      difficulty: 3,
      prompt: "<p>Partí de <code>flat = np.arange(12)</code> (0 a 11) y:</p><ul><li><code>mat3x4</code>: reorganizalo en 3 filas × 4 columnas</li><li><code>mat6x2</code>: en 6×2 usando <code>-1</code> para que NumPy calcule las filas: <code>reshape(-1, 2)</code></li><li><code>back</code>: aplaná mat3x4 de vuelta a 1D (método <code>.flatten()</code> o <code>.reshape(-1)</code>)</li><li><code>attempt</code>: ¿qué pasa con <code>flat.reshape(5, 3)</code>? Probalo, mirá el error, y dejá en attempt el string <code>\"imposible\"</code> — 12 elementos no entran en 15 casillas.</li></ul>",
      starter: "import numpy as np\n\nflat = np.arange(12)\n\n# mat3x4 = ?\n# mat6x2 = ?\n# back = ?\n\n# proba flat.reshape(5, 3), mira el error, y despues:\n# attempt = \"imposible\"\n",
      tests: "import numpy as _np\nassert mat3x4.shape == (3, 4), f\"mat3x4.shape: {mat3x4.shape}\"\nassert mat3x4.tolist() == [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]], f\"mat3x4: {mat3x4}\"\nassert mat6x2.shape == (6, 2), f\"mat6x2.shape: {mat6x2.shape}\"\nassert back.shape == (12,) and back.tolist() == list(range(12)), f\"back: {back}\"\nassert attempt == \"imposible\", \"proba el reshape invalido y asigna attempt = 'imposible'\"",
      solution: "import numpy as np\n\nflat = np.arange(12)\n\nmat3x4 = flat.reshape(3, 4)\nmat6x2 = flat.reshape(-1, 2)\nback = mat3x4.flatten()\n\n# flat.reshape(5, 3) -> ValueError: cannot reshape array of size 12 into shape (5,3)\nattempt = \"imposible\"",
      explanation: "<p>Fijate CÓMO llenó NumPy la matriz: fila por fila, de izquierda a derecha (orden \"C\" o <em>row-major</em>) — el 0,1,2,3 en la primera fila. Los datos en memoria jamás se movieron: reshape les puso otro sistema de coordenadas encima. La única ley es la conservación: 12 elementos son 3×4, 6×2, 2×6, 12×1… pero nunca 5×3 — y el error que viste lo dice con todas las letras.</p><p>El <code>-1</code> (\"deducí esta dimensión\") es pan de cada día en ML: <code>X.reshape(-1, n_features)</code> dice \"las features son n, las muestras… las que haya\". Y reshape/flatten son las dos direcciones del mismo viaje — imagen 28×28 ↔ vector de 784 para alimentar una red, ida y vuelta.</p>",
      hints: ["flat.reshape(3, 4) — sobre el array, no sobre np.", "reshape(-1, 2): el -1 le pide a NumPy que calcule esa dimensión.", "Para volver a 1D: .flatten() o .reshape(-1)."]
    },
    {
      id: "np-arr-4",
      title: "dtype: el tipo único",
      difficulty: 4,
      prompt: "<p>Explorá el contrato de homogeneidad:</p><ul><li><code>ints</code>: <code>np.array([1, 2, 3])</code> y <code>kind_i</code>: su <code>dtype.kind</code> (va a ser <code>\"i\"</code> de integer)</li><li><code>promoted</code>: <code>np.array([1, 2, 3.5])</code> y <code>kind_p</code>: su kind — ¿qué hizo NumPy con tus dos enteros? (<code>\"f\"</code> de float)</li><li><code>as_float</code>: convertí <code>ints</code> a float con <code>.astype(float)</code></li><li><code>as_bool</code>: convertí <code>np.array([0, 1, 2, 0])</code> a booleanos con astype — ¿qué regla sigue? → <code>[False, True, True, False]</code></li><li><code>truncated</code>: convertí <code>np.array([1.9, -1.9, 0.5])</code> a int — ¿redondea o corta? → <code>[1, -1, 0]</code></li></ul>",
      starter: "import numpy as np\n\n# ints, kind_i = ?\n# promoted, kind_p = ?\n# as_float = ?\n# as_bool = ?\n# truncated = ?\n",
      tests: "import numpy as _np\nassert kind_i == \"i\", f\"kind_i: {kind_i}\"\nassert kind_p == \"f\", f\"kind_p: {kind_p} — el 3.5 contagio a todo el array\"\nassert as_float.dtype.kind == \"f\" and as_float.tolist() == [1.0, 2.0, 3.0], f\"as_float: {as_float}\"\nassert as_bool.tolist() == [False, True, True, False], f\"as_bool: {as_bool}\"\nassert truncated.tolist() == [1, -1, 0], f\"truncated: {truncated} — astype(int) corta hacia cero, no redondea\"",
      solution: "import numpy as np\n\nints = np.array([1, 2, 3])\nkind_i = ints.dtype.kind\n\npromoted = np.array([1, 2, 3.5])\nkind_p = promoted.dtype.kind\n\nas_float = ints.astype(float)\nas_bool = np.array([0, 1, 2, 0]).astype(bool)\ntruncated = np.array([1.9, -1.9, 0.5]).astype(int)",
      explanation: "<p>Tres reglas que acabás de demostrar empíricamente: (1) <strong>promoción</strong> — ante la mezcla, gana el tipo más expresivo: un solo 3.5 volvió float a todo el array; (2) <strong>truthiness numérico</strong> — astype(bool) aplica la regla de siempre: cero es False, todo lo demás True (¡la misma de los if de Básico!); (3) <strong>truncamiento</strong> — astype(int) CORTA los decimales hacia cero, no redondea: 1.9 → 1, y −1.9 → −1 (no −2). Para redondear de verdad: <code>np.round(x).astype(int)</code>.</p><p>¿Por qué obsesionarse con dtypes? Porque en datos reales un CSV con un \"N/A\" perdido te convierte la columna entera a tipo object, las operaciones se rompen o se vuelven lentas, y nadie te avisa. Chequear <code>arr.dtype</code> al cargar es reflejo profesional.</p>",
      hints: ["dtype.kind es un atributo del dtype: arr.dtype.kind.", "astype devuelve un array NUEVO convertido: arr.astype(float), arr.astype(bool), arr.astype(int)."]
    },
    {
      id: "np-arr-5",
      title: "Apilar arrays",
      difficulty: 5,
      prompt: "<p>Dos sensores registraron 3 mediciones en 2 momentos:</p><pre>a = np.array([[1, 2, 3], [4, 5, 6]])      # sensor A, shape (2, 3)\nb = np.array([[10, 20, 30], [40, 50, 60]])  # sensor B, shape (2, 3)</pre><ul><li><code>tall</code>: apilalos VERTICALMENTE (uno arriba del otro) con <code>np.vstack</code> → shape <code>(4, 3)</code></li><li><code>wide</code>: lado a lado con <code>np.hstack</code> → shape <code>(2, 6)</code></li><li><code>tall2</code>: lo mismo que tall pero con <code>np.concatenate((a, b), axis=?)</code> — descubrí qué axis apila filas</li><li><code>new_row</code>: agregale la fila <code>[7, 8, 9]</code> al final de <code>a</code> (vstack acepta shapes compatibles) → shape <code>(3, 3)</code></li></ul>",
      starter: "import numpy as np\n\na = np.array([[1, 2, 3], [4, 5, 6]])\nb = np.array([[10, 20, 30], [40, 50, 60]])\n\n# tall = ?\n# wide = ?\n# tall2 = ?\n# new_row = ?\n",
      tests: "import numpy as _np\nassert tall.shape == (4, 3), f\"tall.shape: {tall.shape}\"\nassert tall.tolist() == [[1, 2, 3], [4, 5, 6], [10, 20, 30], [40, 50, 60]], f\"tall: {tall}\"\nassert wide.shape == (2, 6), f\"wide.shape: {wide.shape}\"\nassert wide.tolist() == [[1, 2, 3, 10, 20, 30], [4, 5, 6, 40, 50, 60]], f\"wide: {wide}\"\nassert (tall2 == tall).all(), \"tall2 (concatenate) debe dar lo mismo que tall (vstack)\"\nassert new_row.shape == (3, 3) and new_row[2].tolist() == [7, 8, 9], f\"new_row: {new_row}\"",
      solution: "import numpy as np\n\na = np.array([[1, 2, 3], [4, 5, 6]])\nb = np.array([[10, 20, 30], [40, 50, 60]])\n\ntall = np.vstack((a, b))\nwide = np.hstack((a, b))\ntall2 = np.concatenate((a, b), axis=0)\nnew_row = np.vstack((a, [7, 8, 9]))",
      explanation: "<p>La revelación es que vstack y hstack son atajos de UNA operación: <code>concatenate</code> con distinto <code>axis</code>. Y acá nace la regla mental más importante de NumPy: <strong>axis=0 recorre las filas (vertical), axis=1 las columnas (horizontal)</strong>. Apilar \"a lo alto\" agranda el eje 0; \"a lo ancho\", el eje 1. Esta misma regla gobierna las agregaciones del próximo tema (sum, mean por eje) — invertí un minuto en visualizarla.</p><p>Casos reales del apilado: vstack para juntar batches de datos (más muestras), hstack para agregar features (más columnas a cada muestra). Detalle de costo: a diferencia de reshape, concatenar SÍ copia — los dos bloques de memoria se funden en uno nuevo. En loops largos, acumulá en una lista y concatená UNA vez al final.</p>",
      hints: ["vstack y hstack reciben una TUPLA de arrays: np.vstack((a, b)).", "concatenate(..., axis=0) apila filas (vertical); axis=1, columnas.", "Para new_row: vstack((a, [7, 8, 9])) — NumPy convierte la lista solo."]
    }
  ]
},

/* ---------------- Vectorización ---------------- */
{
  id: "np-vector",
  title: "Operaciones vectorizadas",
  intro: "El superpoder: operar arrays ENTEROS sin escribir loops — <code>a + b</code>, <code>a * 2</code>, <code>np.sqrt(a)</code> trabajan elemento a elemento en C. Pensar \"en arrays\" en vez de \"en elementos\" es EL cambio mental de este nivel.",
  socratic: [
    {
      q: "En Python puro, sumar dos listas elemento a elemento exige un loop (o zip + comprehension). En NumPy es <code>a + b</code>. ¿Dónde fue a parar el loop?",
      a: "Sigue existiendo — pero en C, dentro de NumPy, sobre memoria contigua y sin el costo por-elemento del intérprete (verificar tipos, despachar métodos, crear objetos). Tu código declara QUÉ (sumá estos arrays); la librería decide CÓMO. De paso ganás legibilidad: a + b se lee como matemática. La regla de oro de este nivel: si escribiste un for sobre un array, casi seguro hay una forma vectorizada mejor."
    },
    {
      q: "Broadcasting: <code>matriz (2,3) * vector (3,)</code> funciona y multiplica cada FILA por el vector. ¿Qué regla está aplicando NumPy para 'estirar' el chico?",
      a: "Alinea las shapes desde la DERECHA: (2,3) vs (3,) → el 3 final coincide, y la dimensión que falta se replica virtualmente (sin copiar memoria): el vector actúa como si fuera (2,3) repitiéndose por fila. Dos dimensiones son compatibles si son iguales o si una es 1. Es la generalización de array * 2: el escalar es el broadcasting más extremo."
    },
    {
      q: "En una matriz de ventas (3 productos × 4 meses), ¿qué te da sum con axis=0 y qué con axis=1? ¿Cómo lo razonás sin probar?",
      a: "El axis es el eje que se COLAPSA (desaparece de la shape). axis=0 colapsa las filas → te queda un valor por columna: total por mes. axis=1 colapsa las columnas → un valor por fila: total por producto. Truco de verificación: (3,4).sum(axis=0) → shape (4,); .sum(axis=1) → shape (3,). Si la shape resultante no es la que esperabas, leíste el eje al revés."
    },
    {
      q: "<code>temps &gt; 25</code> sobre un array no da True o False… ¿qué da, y por qué eso es una herramienta y no una rareza?",
      a: "Un ARRAY de booleanos, elemento a elemento — la comparación también está vectorizada. Y ese array es polivalente: sumalo y contás cuántos cumplen (True vale 1), usalo de máscara para filtrar (próximo tema), o alimentá np.where para reemplazos condicionales. \"Condición como dato\" es un patrón central: el if de Python piensa de a uno; la máscara piensa en todo el dataset a la vez."
    }
  ],
  exercises: [
    {
      id: "np-vec-1",
      title: "Adiós, loops",
      difficulty: 1,
      prompt: "<p>Con <code>a = np.array([1, 2, 3, 4])</code> y <code>b = np.array([10, 20, 30, 40])</code>, calculá SIN ningún loop:</p><ul><li><code>sums</code>: suma elemento a elemento → <code>[11, 22, 33, 44]</code></li><li><code>prods</code>: producto elemento a elemento → <code>[10, 40, 90, 160]</code></li><li><code>doubled</code>: el doble de a → <code>[2, 4, 6, 8]</code></li><li><code>squares</code>: a al cuadrado → <code>[1, 4, 9, 16]</code></li></ul><p>Antes de escribir: ¿qué daría <code>lista + lista</code> en Python puro con estas mismas operaciones? (Spoiler: [1,2,3,4,10,20,30,40] — concatena. NumPy redefine los operadores.)</p>",
      starter: "import numpy as np\n\na = np.array([1, 2, 3, 4])\nb = np.array([10, 20, 30, 40])\n\n# sums = ?\n# prods = ?\n# doubled = ?\n# squares = ?\n",
      tests: "assert sums.tolist() == [11, 22, 33, 44], f\"sums: {sums}\"\nassert prods.tolist() == [10, 40, 90, 160], f\"prods: {prods}\"\nassert doubled.tolist() == [2, 4, 6, 8], f\"doubled: {doubled}\"\nassert squares.tolist() == [1, 4, 9, 16], f\"squares: {squares}\"",
      solution: "import numpy as np\n\na = np.array([1, 2, 3, 4])\nb = np.array([10, 20, 30, 40])\n\nsums = a + b\nprods = a * b\ndoubled = a * 2\nsquares = a ** 2",
      explanation: "<p>Los operadores que conocés de los números, redefinidos para grillas enteras — la sobrecarga de operadores que viste con datetime y dunders, a escala industrial: <code>a + b</code> llama por debajo al <code>__add__</code> del ndarray, que despacha un loop en C.</p><p>El contraste con listas vale la pena internalizarlo: <code>[1,2] + [3,4]</code> concatena (operación de SECUENCIA), <code>np.array([1,2]) + np.array([3,4])</code> suma (operación MATEMÁTICA). Mismo símbolo, semánticas distintas, porque los tipos definen el significado. Y <code>doubled = a * 2</code> ya es broadcasting: el escalar se aplicó contra cada elemento — la versión más simple de lo que se viene.</p>",
      hints: ["Literalmente: a + b, a * b, a * 2, a ** 2. Sin loops, sin corchetes.", "Si te dio [1,2,3,4,10,...] estás operando listas de Python, no arrays: revisá los np.array."]
    },
    {
      id: "np-vec-2",
      title: "ufuncs y estadísticas: normalizar",
      difficulty: 2,
      prompt: "<p>Con <code>data = np.array([4.0, 9.0, 16.0, 25.0])</code>:</p><ul><li><code>roots</code>: la raíz cuadrada de cada elemento (<code>np.sqrt</code>) → <code>[2, 3, 4, 5]</code></li><li><code>mean_val</code> y <code>std_val</code>: media y desvío estándar (métodos <code>.mean()</code> y <code>.std()</code>)</li><li><code>normalized</code>: la <strong>estandarización</strong> — a cada elemento restale la media y dividilo por el desvío: <code>(data - media) / desvio</code> — UNA expresión, sin loop.</li></ul><p>Verificá imprimiendo: el array normalizado debe tener media ≈ 0 y desvío ≈ 1. Este cálculo exacto es el preprocesamiento más común de TODO machine learning.</p>",
      starter: "import numpy as np\n\ndata = np.array([4.0, 9.0, 16.0, 25.0])\n\n# roots = ?\n# mean_val = ?\n# std_val = ?\n# normalized = ?\n\n# print(normalized.mean(), normalized.std())\n",
      tests: "import numpy as _np\nassert _np.allclose(roots, [2, 3, 4, 5]), f\"roots: {roots}\"\nassert abs(mean_val - 13.5) < 1e-9, f\"mean_val: {mean_val}\"\nassert abs(std_val - data.std()) < 1e-9, f\"std_val: {std_val}\"\nassert _np.allclose(normalized, (data - data.mean()) / data.std()), f\"normalized: {normalized}\"\nassert abs(normalized.mean()) < 1e-9, \"la media del normalizado debe ser ~0\"\nassert abs(normalized.std() - 1) < 1e-9, \"el desvio del normalizado debe ser ~1\"",
      solution: "import numpy as np\n\ndata = np.array([4.0, 9.0, 16.0, 25.0])\n\nroots = np.sqrt(data)\nmean_val = data.mean()\nstd_val = data.std()\nnormalized = (data - mean_val) / std_val",
      explanation: "<p><code>(data - mean_val) / std_val</code> mezcla dos mundos en una expresión: <code>data - escalar</code> es broadcasting (la media se resta a CADA elemento), y la división igual. El resultado — media 0, desvío 1 — se llama <em>z-score</em> o estandarización.</p><p>¿Por qué es EL preprocesamiento de ML? Porque los algoritmos que miden distancias o descienden gradientes sufren cuando una feature va de 0 a 1 y otra de 0 a 1.000.000: la grande domina todo. Estandarizar pone todas las variables en la misma escala — \"cuántos desvíos te alejás de lo normal\" — y es, dicho sea, la base de la detección de anomalías: un z-score de 4 es un valor rarísimo, sea cual sea la unidad original.</p><p>(<code>np.sqrt</code> es una <em>ufunc</em> — función universal que opera elemento a elemento: hay decenas — exp, log, sin, abs… — todas vectorizadas.)</p>",
      hints: ["np.sqrt(data) — la función sobre el array entero.", "normalized = (data - mean_val) / std_val — broadcasting hace el resto."]
    },
    {
      id: "np-vec-3",
      title: "Broadcasting en 2D",
      difficulty: 3,
      prompt: "<p>Una cadena con 2 sucursales vende 3 productos. Precios base por sucursal:</p><pre>prices = np.array([[100, 200, 300],\n                   [150, 250, 350]])   # shape (2, 3)</pre><ul><li><code>discounted</code>: cada PRODUCTO tiene su descuento — multiplicá por el vector <code>factors = np.array([0.9, 0.8, 0.5])</code> (shape (3,)): el vector se aplica a cada fila. Predecí el resultado de la primera fila antes de correr.</li><li><code>with_fee</code>: cada SUCURSAL agrega su comisión fija — sumale <code>fees = np.array([[10], [25]])</code> (shape (2,1), columna): se aplica a cada columna.</li><li><code>ratio</code>: ¿en qué shape termina <code>factors * fees</code>? Asignale el resultado y explicate por qué da (2,3) — un vector fila por un vector columna genera la GRILLA de todos los productos.</li></ul>",
      starter: "import numpy as np\n\nprices = np.array([[100, 200, 300],\n                   [150, 250, 350]])\nfactors = np.array([0.9, 0.8, 0.5])\nfees = np.array([[10], [25]])\n\n# discounted = ?\n# with_fee = ?\n# ratio = ?\n",
      tests: "import numpy as _np\nassert _np.allclose(discounted, [[90, 160, 150], [135, 200, 175]]), f\"discounted: {discounted}\"\nassert _np.allclose(with_fee, [[110, 210, 310], [175, 275, 375]]), f\"with_fee: {with_fee}\"\nassert ratio.shape == (2, 3), f\"ratio.shape: {ratio.shape}\"\nassert _np.allclose(ratio, [[9, 8, 5], [22.5, 20, 12.5]]), f\"ratio: {ratio}\"",
      solution: "import numpy as np\n\nprices = np.array([[100, 200, 300],\n                   [150, 250, 350]])\nfactors = np.array([0.9, 0.8, 0.5])\nfees = np.array([[10], [25]])\n\ndiscounted = prices * factors\nwith_fee = prices + fees\nratio = factors * fees",
      explanation: "<p>Aplicá la regla formal a cada caso, alineando shapes desde la derecha:</p><p><code>(2,3) * (3,)</code> → el 3 coincide, la dimensión faltante se replica: el vector de descuentos se aplica fila por fila. <code>(2,3) + (2,1)</code> → el 1 se estira a 3: la columna de comisiones se aplica columna por columna. <code>(3,) * (2,1)</code> → ¡ninguno es 2D completo y AMBOS se estiran!: (1,3) y (2,1) se expanden mutuamente a (2,3) — el \"producto exterior\", la grilla de todas las combinaciones.</p><p>La orientación lo es todo: un vector (3,) broadcastea contra las FILAS; uno (2,1) contra las COLUMNAS. Cuando un broadcasting te dé un resultado absurdo o un error de shapes, el diagnóstico es siempre el mismo: imprimí las shapes y alineá desde la derecha a mano. En ML harás esto a diario — restar la media por columna a un dataset ES <code>X - X.mean(axis=0)</code>, broadcasting puro.</p>",
      hints: ["Las tres son operaciones directas: prices * factors, prices + fees, factors * fees — el broadcasting es automático.", "Para razonarlo: alineá las shapes desde la derecha; dimensión 1 o faltante = se estira."]
    },
    {
      id: "np-vec-4",
      title: "Agregaciones por eje",
      difficulty: 4,
      prompt: "<p>Ventas de 3 productos (filas) en 4 trimestres (columnas):</p><pre>sales = np.array([[10, 20, 30, 40],\n                  [5, 5, 5, 5],\n                  [100, 0, 0, 1]])</pre><ul><li><code>per_product</code>: total anual de cada producto → <code>[100, 20, 101]</code> — ¿axis=0 o axis=1? Decidilo ANTES con la regla \"el axis es el que desaparece\" y verificá con la shape.</li><li><code>per_quarter</code>: total de cada trimestre → <code>[115, 25, 35, 46]</code></li><li><code>best_product</code>: el ÍNDICE del producto que más vendió (<code>np.argmax</code> sobre per_product) → <code>2</code></li><li><code>quarterly_avg</code>: el promedio de ventas por trimestre (mean con el axis correcto) → <code>[38.33, 8.33, 11.67, 15.33]</code> aprox</li><li><code>grand_total</code>: la suma de TODO (sin axis) → <code>221</code></li></ul>",
      starter: "import numpy as np\n\nsales = np.array([[10, 20, 30, 40],\n                  [5, 5, 5, 5],\n                  [100, 0, 0, 1]])\n\n# per_product = ?\n# per_quarter = ?\n# best_product = ?\n# quarterly_avg = ?\n# grand_total = ?\n",
      tests: "import numpy as _np\nassert per_product.tolist() == [100, 20, 101], f\"per_product: {per_product} — axis incorrecto? shape esperada (3,)\"\nassert per_quarter.tolist() == [115, 25, 35, 46], f\"per_quarter: {per_quarter}\"\nassert best_product == 2, f\"best_product: {best_product}\"\nassert _np.allclose(quarterly_avg, [115/3, 25/3, 35/3, 46/3]), f\"quarterly_avg: {quarterly_avg}\"\nassert grand_total == 221, f\"grand_total: {grand_total}\"",
      solution: "import numpy as np\n\nsales = np.array([[10, 20, 30, 40],\n                  [5, 5, 5, 5],\n                  [100, 0, 0, 1]])\n\nper_product = sales.sum(axis=1)\nper_quarter = sales.sum(axis=0)\nbest_product = np.argmax(per_product)\nquarterly_avg = sales.mean(axis=0)\ngrand_total = sales.sum()",
      explanation: "<p>Confirmá la regla con las shapes: (3,4).sum(axis=1) colapsó las columnas → quedó (3,), un total POR producto. axis=0 colapsó las filas → (4,), un total POR trimestre. La trampa mental clásica es pensar \"axis=1 = columnas, entonces me da columnas\" — no: axis=1 COLAPSA las columnas, te deja las filas. El eje que nombrás es el que se sacrifica.</p><p><code>argmax</code> merece su lugar en tu caja: devuelve el ÍNDICE del máximo, no el valor — y el índice es lo útil cuando hay metadata asociada (¿QUÉ producto?, ¿QUÉ clase predijo la red?). La última capa de un clasificador de imágenes es literalmente un argmax sobre las probabilidades.</p><p>Y <code>sum()</code> sin axis: colapsa todo a un escalar. Las tres variantes — total, por eje 0, por eje 1 — son la misma función con distinta cantidad de sacrificio.</p>",
      hints: ["\"Total por producto\" = colapsar los trimestres (columnas) = axis=1.", "np.argmax(per_product) da el índice del mayor, no el valor.", "Verificá cada resultado con su shape: per_product debe ser (3,), per_quarter (4,)."]
    },
    {
      id: "np-vec-5",
      title: "Comparaciones y np.where",
      difficulty: 5,
      prompt: "<p>Lecturas de un sensor con fallas: <code>temps = np.array([22, 31, 35, 18, -3, 28, 40, -1])</code> (las negativas son errores).</p><ul><li><code>hot_mask</code>: array booleano \"mayor a 25\" — una comparación, sin loop</li><li><code>hot_count</code>: cuántas lo superan (sumá la máscara: True vale 1) → <code>4</code></li><li><code>hot_pct</code>: el PORCENTAJE de lecturas calientes (media de la máscara × 100) → <code>50.0</code></li><li><code>capped</code>: las temperaturas con techo en 30 — donde supere 30 poné 30, el resto igual: <code>np.where(condicion, si_verdadero, si_falso)</code> → <code>[22, 30, 30, 18, -3, 28, 30, -1]</code></li><li><code>cleaned</code>: los errores reemplazados por 0 → <code>[22, 31, 35, 18, 0, 28, 40, 0]</code></li></ul>",
      starter: "import numpy as np\n\ntemps = np.array([22, 31, 35, 18, -3, 28, 40, -1])\n\n# hot_mask = ?\n# hot_count = ?\n# hot_pct = ?\n# capped = ?\n# cleaned = ?\n",
      tests: "import numpy as _np\nassert hot_mask.dtype.kind == \"b\", \"hot_mask debe ser un array de booleanos (una comparacion directa)\"\nassert hot_mask.tolist() == [False, True, True, False, False, True, True, False], f\"hot_mask: {hot_mask}\"\nassert hot_count == 4, f\"hot_count: {hot_count}\"\nassert abs(hot_pct - 50.0) < 1e-9, f\"hot_pct: {hot_pct}\"\nassert capped.tolist() == [22, 30, 30, 18, -3, 28, 30, -1], f\"capped: {capped}\"\nassert cleaned.tolist() == [22, 31, 35, 18, 0, 28, 40, 0], f\"cleaned: {cleaned}\"",
      solution: "import numpy as np\n\ntemps = np.array([22, 31, 35, 18, -3, 28, 40, -1])\n\nhot_mask = temps > 25\nhot_count = hot_mask.sum()\nhot_pct = hot_mask.mean() * 100\ncapped = np.where(temps > 30, 30, temps)\ncleaned = np.where(temps < 0, 0, temps)",
      explanation: "<p>Tres usos de la \"condición como dato\":</p><p><strong>Contar</strong>: <code>mask.sum()</code> — los True son 1, sumar la máscara cuenta los que cumplen. <strong>Proporción</strong>: <code>mask.mean()</code> — la media de unos y ceros ES la fracción que cumple. Este idiom exacto calcula el <em>accuracy</em> en ML: <code>(predicciones == verdaderas).mean()</code> — lo vas a escribir en el nivel que viene, literal. <strong>Reemplazo condicional</strong>: <code>np.where(cond, a, b)</code> es el if/else vectorizado — elige elemento a elemento. Encadenarlo (where adentro de where) cubre múltiples casos, aunque para más de dos o tres hay herramientas mejores (np.select, np.clip — de hecho capped era <code>np.clip(temps, None, 30)</code> en una llamada).</p><p>Mirá lo que NO escribiste: ni un if, ni un for, y procesaste limpieza + estadística de un dataset. Eso es pensar en arrays.</p>",
      hints: ["hot_mask = temps > 25 — la comparación vectorizada YA es la máscara.", "Contar con .sum(), porcentaje con .mean() * 100 — directamente sobre la máscara.", "np.where(temps > 30, 30, temps): donde la condición es True usa 30, donde es False conserva temps."]
    }
  ]
},

/* ---------------- Indexing ---------------- */
{
  id: "np-indexing",
  title: "Indexing y máscaras",
  intro: "Seleccionar es la mitad del trabajo con datos: filas, columnas, submatrices, elementos que cumplen condiciones, los top-k… NumPy extiende el indexing de Python con coordenadas múltiples, máscaras booleanas y fancy indexing.",
  socratic: [
    {
      q: "En listas anidadas accedías con <code>m[1][2]</code>. NumPy prefiere <code>m[1, 2]</code>. ¿Es solo estética?",
      a: "No: <code>m[1][2]</code> son DOS operaciones (extraer la fila 1, luego su elemento 2 — con un array intermedio), mientras <code>m[1, 2]</code> es UNA: la coma forma una tupla de coordenadas que NumPy resuelve directo. La diferencia explota al combinar con slices: <code>m[:, 2]</code> (columna entera) es imposible de escribir con la sintaxis encadenada. Pensá en coordenadas, no en cajas dentro de cajas."
    },
    {
      q: "<code>scores[scores &gt;= 70]</code> — array adentro del corchete. ¿Qué está pasando ahí, paso a paso?",
      a: "Dos tiempos: primero <code>scores &gt;= 70</code> crea la máscara booleana (tema anterior); después, indexar CON esa máscara selecciona los elementos donde hay True. Es el WHERE de SQL, el filter de los streams, en sintaxis de corchete. Y compone: la máscara puede venir de otra columna — <code>edades[ciudades == \"BA\"]</code> — porque lo único que importa es que la máscara tenga la shape correcta."
    },
    {
      q: "Para combinar condiciones sobre arrays usás <code>&amp;</code> y <code>|</code> con paréntesis obligatorios, NO and/or. ¿Por qué los de siempre no sirven?",
      a: "Porque <code>and</code>/<code>or</code> de Python preguntan por UN valor de verdad (\"¿este objeto entero es verdadero?\") y un array de 1000 booleanos no tiene UNA respuesta — NumPy tira el famoso \"truth value is ambiguous\". <code>&amp;</code> y <code>|</code> son los operadores bit a bit, que NumPy redefinió elemento a elemento. Los paréntesis son porque <code>&amp;</code> liga más fuerte que <code>&gt;=</code>: sin ellos, <code>a &gt;= 60 &amp; b</code> se agrupa mal y explota."
    },
    {
      q: "argsort devuelve índices, no valores ordenados. ¿Para qué querrías los índices?",
      a: "Para arrastrar información asociada: si <code>scores</code> y <code>names</code> van en paralelo, <code>order = np.argsort(scores)</code> te deja reordenar AMBOS coherentemente — <code>names[order]</code> da los nombres en orden de puntaje. sort() te daría los puntajes ordenados… y huérfanos. En ML es omnipresente: rankear predicciones, elegir los top-k, ordenar features por importancia — siempre vía índices."
    }
  ],
  exercises: [
    {
      id: "np-idx-1",
      title: "1D: como Python, pero mejor",
      difficulty: 1,
      prompt: "<p>Con <code>arr = np.arange(10, 101, 10)</code> → <code>[10, 20, ..., 100]</code>:</p><ul><li><code>first</code> y <code>last</code>: primero y último (negativos para el último, como siempre)</li><li><code>middle</code>: los elementos en posiciones 3 a 5 inclusive → <code>[40, 50, 60]</code></li><li><code>alternate</code>: uno sí uno no desde el principio → <code>[10, 30, 50, 70, 90]</code></li><li><code>reversed_arr</code>: todo al revés</li></ul><p>Todo el slicing de Básico aplica intacto. La diferencia (que hoy no te muerde pero anotala): los slices de NumPy son VISTAS, no copias — modificar el slice modifica el original.</p>",
      starter: "import numpy as np\n\narr = np.arange(10, 101, 10)\n\n# first = ?\n# last = ?\n# middle = ?\n# alternate = ?\n# reversed_arr = ?\n",
      tests: "assert first == 10 and last == 100, f\"first={first}, last={last}\"\nassert middle.tolist() == [40, 50, 60], f\"middle: {middle}\"\nassert alternate.tolist() == [10, 30, 50, 70, 90], f\"alternate: {alternate}\"\nassert reversed_arr.tolist() == [100, 90, 80, 70, 60, 50, 40, 30, 20, 10], f\"reversed_arr: {reversed_arr}\"",
      solution: "import numpy as np\n\narr = np.arange(10, 101, 10)\n\nfirst = arr[0]\nlast = arr[-1]\nmiddle = arr[3:6]\nalternate = arr[::2]\nreversed_arr = arr[::-1]",
      explanation: "<p>Sintaxis idéntica a Básico — fue a propósito que la machacáramos entonces. La diferencia semántica enterrada: en listas, <code>lst[3:6]</code> COPIA; en NumPy, <code>arr[3:6]</code> es una <strong>vista</strong> — una ventana a la misma memoria. <code>middle[0] = 999</code> cambiaría el 40 del array original. ¿Por qué NumPy eligió así? Costo: copiar slices de arrays de gigabytes en cada operación sería prohibitivo. Cuando necesites independencia: <code>arr[3:6].copy()</code> — tu vieja amiga la copia explícita, otra vez decidiendo entre alias y clon.</p>",
      hints: ["Igual que en listas: arr[0], arr[-1], arr[3:6], arr[::2], arr[::-1].", "\"Posiciones 3 a 5 inclusive\" → el fin del slice es 6 (excluido, como siempre)."]
    },
    {
      id: "np-idx-2",
      title: "2D: filas, columnas, ventanas",
      difficulty: 2,
      prompt: "<p>Con <code>m = np.arange(1, 13).reshape(3, 4)</code>:</p><pre>[[ 1  2  3  4]\n [ 5  6  7  8]\n [ 9 10 11 12]]</pre><ul><li><code>row1</code>: la fila del medio → <code>[5, 6, 7, 8]</code></li><li><code>col2</code>: la TERCERA columna completa → <code>[3, 7, 11]</code> — acá necesitás la coma: <code>m[:, 2]</code> (\"todas las filas, columna 2\")</li><li><code>corner</code>: la esquina inferior derecha (un solo número, coordenadas negativas) → <code>12</code></li><li><code>window</code>: la submatriz de las primeras 2 filas y las columnas 1-2 → <code>[[2, 3], [6, 7]]</code></li><li><code>last_col</code>: la última columna → <code>[4, 8, 12]</code></li></ul>",
      starter: "import numpy as np\n\nm = np.arange(1, 13).reshape(3, 4)\nprint(m)\n\n# row1 = ?\n# col2 = ?\n# corner = ?\n# window = ?\n# last_col = ?\n",
      tests: "assert row1.tolist() == [5, 6, 7, 8], f\"row1: {row1}\"\nassert col2.tolist() == [3, 7, 11], f\"col2: {col2}\"\nassert corner == 12, f\"corner: {corner}\"\nassert window.tolist() == [[2, 3], [6, 7]], f\"window: {window}\"\nassert last_col.tolist() == [4, 8, 12], f\"last_col: {last_col}\"",
      solution: "import numpy as np\n\nm = np.arange(1, 13).reshape(3, 4)\n\nrow1 = m[1]\ncol2 = m[:, 2]\ncorner = m[-1, -1]\nwindow = m[0:2, 1:3]\nlast_col = m[:, -1]",
      explanation: "<p>La gramática completa: <code>m[filas, columnas]</code>, donde cada posición acepta lo que ya sabés — un índice, un slice, un negativo. <code>m[:, 2]</code> = \"todas las filas (el : solo), columna 2\" — la operación imposible con listas anidadas. <code>m[0:2, 1:3]</code> recorta un rectángulo: slice por eje.</p><p>La lectura ML de cada gesto: <code>m[1]</code> = una muestra del dataset; <code>m[:, 2]</code> = una feature de todas las muestras; <code>m[0:2, 1:3]</code> = un sub-dataset. Extraer \"la columna de los precios\" o \"las primeras 100 muestras\" será tu día a día — y son estas cinco líneas.</p>",
      hints: ["La coma separa ejes: m[fila, columna]. El : solo significa \"todo este eje\".", "Tercera columna = índice 2: m[:, 2]. Esquina inferior derecha: m[-1, -1].", "window: slice en ambos ejes a la vez: m[0:2, 1:3]."]
    },
    {
      id: "np-idx-3",
      title: "Máscaras booleanas",
      difficulty: 3,
      prompt: "<p>Notas de un examen: <code>scores = np.array([55, 82, 91, 40, 77, 68, 95])</code>.</p><ul><li><code>passed</code>: las notas aprobadas (≥ 70) — máscara adentro del corchete → <code>[82, 91, 77, 95]</code></li><li><code>mid_range</code>: las notas entre 60 y 89 inclusive — DOS condiciones con <code>&amp;</code> y paréntesis obligatorios → <code>[82, 77, 68]</code></li><li><code>n_failed</code>: cuántas están por debajo de 60 → <code>2</code></li><li><code>curved</code>: una copia donde los aplazos (&lt;60) reciben 10 puntos de regalo y el resto queda igual → <code>[65, 82, 91, 50, 77, 68, 95]</code> (¿where, o asignación sobre máscara? probá la que quieras — la solución muestra ambas)</li></ul>",
      starter: "import numpy as np\n\nscores = np.array([55, 82, 91, 40, 77, 68, 95])\n\n# passed = ?\n# mid_range = ?\n# n_failed = ?\n# curved = ?\n",
      tests: "assert passed.tolist() == [82, 91, 77, 95], f\"passed: {passed}\"\nassert mid_range.tolist() == [82, 77, 68], f\"mid_range: {mid_range} — necesitas (cond1) & (cond2) con parentesis\"\nassert n_failed == 2, f\"n_failed: {n_failed}\"\nassert curved.tolist() == [65, 82, 91, 50, 77, 68, 95], f\"curved: {curved}\"\nassert scores.tolist() == [55, 82, 91, 40, 77, 68, 95], \"scores original no debe modificarse (trabaja sobre una copia o con where)\"",
      solution: "import numpy as np\n\nscores = np.array([55, 82, 91, 40, 77, 68, 95])\n\npassed = scores[scores >= 70]\nmid_range = scores[(scores >= 60) & (scores <= 89)]\nn_failed = (scores < 60).sum()\n\ncurved = np.where(scores < 60, scores + 10, scores)\n# alternativa con asignacion sobre mascara:\n# curved = scores.copy()\n# curved[curved < 60] += 10",
      explanation: "<p>El filtrado booleano es EL gesto del análisis de datos — <code>scores[scores &gt;= 70]</code> se lee \"scores donde scores supera 70\", y en pandas será idéntico (<code>df[df.edad &gt; 30]</code>).</p><p>La condición compuesta junta las piezas del tema anterior: cada comparación produce su máscara, <code>&amp;</code> las combina elemento a elemento, los paréntesis protegen del orden de operadores. Memorizá el patrón completo <code>(a &gt;= 60) &amp; (a &lt;= 89)</code> porque el error (usar and, olvidar paréntesis) da mensajes crípticos.</p><p>Para curved, las dos rutas legítimas: <code>np.where</code> (funcional, sin tocar nada) o copia + <strong>asignación sobre máscara</strong> — <code>curved[curved &lt; 60] += 10</code> — que modifica solo los elementos seleccionados, in place. La segunda es idiomática para \"arreglar\" subconjuntos: imputar valores faltantes, capar outliers. El test de que scores quedó intacto te obligó a la disciplina de siempre: los datos originales no se tocan.</p>",
      hints: ["passed: la máscara va directo adentro: scores[scores >= 70].", "Dos condiciones: scores[(scores >= 60) & (scores <= 89)] — & y paréntesis, NO and.", "curved: np.where(scores < 60, scores + 10, scores), o copiá y asigná sobre la máscara."]
    },
    {
      id: "np-idx-4",
      title: "Fancy indexing y argsort",
      difficulty: 4,
      prompt: "<p>Cinco modelos compitieron: <code>accuracy = np.array([0.72, 0.91, 0.65, 0.88, 0.79])</code> y sus nombres en paralelo: <code>names = np.array([\"knn\", \"mlp\", \"tree\", \"svm\", \"forest\"])</code>.</p><ul><li><code>chosen</code>: los accuracies de los modelos 0, 2 y 4 — pasale una LISTA de índices: <code>accuracy[[0, 2, 4]]</code> (fancy indexing)</li><li><code>order_desc</code>: los índices que ordenan de mejor a peor — <code>np.argsort</code> ordena ascendente, dalo vuelta con <code>[::-1]</code> → <code>[1, 3, 4, 0, 2]</code></li><li><code>ranking</code>: los NOMBRES de mejor a peor, usando order_desc sobre names → <code>[\"mlp\", \"svm\", \"forest\", \"knn\", \"tree\"]</code></li><li><code>top2_names</code>: los nombres del podio (los 2 mejores)</li></ul>",
      starter: "import numpy as np\n\naccuracy = np.array([0.72, 0.91, 0.65, 0.88, 0.79])\nnames = np.array([\"knn\", \"mlp\", \"tree\", \"svm\", \"forest\"])\n\n# chosen = ?\n# order_desc = ?\n# ranking = ?\n# top2_names = ?\n",
      tests: "import numpy as _np\nassert _np.allclose(chosen, [0.72, 0.65, 0.79]), f\"chosen: {chosen}\"\nassert order_desc.tolist() == [1, 3, 4, 0, 2], f\"order_desc: {order_desc}\"\nassert ranking.tolist() == [\"mlp\", \"svm\", \"forest\", \"knn\", \"tree\"], f\"ranking: {ranking}\"\nassert top2_names.tolist() == [\"mlp\", \"svm\"], f\"top2_names: {top2_names}\"",
      solution: "import numpy as np\n\naccuracy = np.array([0.72, 0.91, 0.65, 0.88, 0.79])\nnames = np.array([\"knn\", \"mlp\", \"tree\", \"svm\", \"forest\"])\n\nchosen = accuracy[[0, 2, 4]]\norder_desc = np.argsort(accuracy)[::-1]\nranking = names[order_desc]\ntop2_names = names[order_desc[:2]]",
      explanation: "<p>El truco estrella es la línea <code>ranking = names[order_desc]</code>: los índices se calcularon sobre UN array (accuracy) y se aplicaron sobre OTRO (names). Como van en paralelo, el reordenamiento es coherente — argsort produjo una \"receta de orden\" reutilizable. Compará con sort(): te daría los accuracies ordenados, pero ¿de quién es cada uno? Información perdida.</p><p>El fancy indexing (indexar con lista/array de enteros) es la tercera forma de seleccionar, junto al slice y la máscara: elegís posiciones arbitrarias, en el orden que quieras, con repeticiones si querés — y siempre COPIA (a diferencia del slice-vista).</p><p>Pipeline mental para el top-k de cualquier cosa — modelos, features, productos: <code>argsort → invertir → cortar k → aplicar sobre los metadatos</code>. Lo vas a escribir tantas veces que se te va a hacer un solo gesto.</p>",
      hints: ["Fancy indexing: accuracy[[0, 2, 4]] — corchetes adentro de corchetes: una lista de posiciones.", "np.argsort(accuracy) da índices de menor a mayor; [::-1] los invierte.", "Los índices de un array sirven para indexar OTRO: names[order_desc]."]
    },
    {
      id: "np-idx-5",
      title: "Todo junto: filtrar un dataset",
      difficulty: 5,
      prompt: "<p>Notas de 4 estudiantes (filas) en 3 materias (columnas):</p><pre>grades = np.array([[8, 9, 7],\n                   [4, 5, 6],\n                   [9, 9, 10],\n                   [6, 7, 5]])</pre><ul><li><code>student_means</code>: el promedio de cada estudiante → <code>[8.0, 5.0, 9.33, 6.0]</code></li><li><code>passing</code>: las FILAS COMPLETAS de quienes promedian ≥ 7 — una máscara calculada sobre los promedios, aplicada a la matriz → shape <code>(2, 3)</code></li><li><code>n_passing</code>: cuántos aprueban → <code>2</code></li><li><code>best_student</code>: el índice del mejor promedio → <code>2</code></li><li><code>best_grades</code>: las notas de ese estudiante, extraídas USANDO best_student (no a mano) → <code>[9, 9, 10]</code></li></ul><p>El paso conceptual nuevo: la máscara se calcula en un espacio (promedios, shape (4,)) y selecciona en otro (filas de la matriz (4,3)). Funciona porque la máscara coincide con el eje 0.</p>",
      starter: "import numpy as np\n\ngrades = np.array([[8, 9, 7],\n                   [4, 5, 6],\n                   [9, 9, 10],\n                   [6, 7, 5]])\n\n# student_means = ?\n# passing = ?\n# n_passing = ?\n# best_student = ?\n# best_grades = ?\n",
      tests: "import numpy as _np\nassert _np.allclose(student_means, [8.0, 5.0, 28/3, 6.0]), f\"student_means: {student_means}\"\nassert passing.shape == (2, 3), f\"passing.shape: {passing.shape}\"\nassert passing.tolist() == [[8, 9, 7], [9, 9, 10]], f\"passing: {passing}\"\nassert n_passing == 2, f\"n_passing: {n_passing}\"\nassert best_student == 2, f\"best_student: {best_student}\"\nassert best_grades.tolist() == [9, 9, 10], f\"best_grades: {best_grades}\"",
      solution: "import numpy as np\n\ngrades = np.array([[8, 9, 7],\n                   [4, 5, 6],\n                   [9, 9, 10],\n                   [6, 7, 5]])\n\nstudent_means = grades.mean(axis=1)\nmask = student_means >= 7\npassing = grades[mask]\nn_passing = mask.sum()\nbest_student = np.argmax(student_means)\nbest_grades = grades[best_student]",
      explanation: "<p>Releé la cadena completa, porque ES el flujo de trabajo con datasets reales: agregar por eje (mean axis=1) → derivar una condición (≥ 7) → usarla para seleccionar filas enteras (<code>grades[mask]</code>: máscara de largo 4 contra el eje de las 4 filas) → contar, rankear, extraer.</p><p>Lo importante de <code>grades[mask]</code>: una máscara 1D aplicada a una matriz 2D selecciona FILAS — porque su largo coincide con el eje 0. Es la operación \"dame las muestras que cumplen X\" de todo pipeline de ML: filtrar outliers, separar clases, quedarte con los datos completos.</p><p>Y <code>grades[best_student]</code> cierra el círculo con el indexing más simple — la fila por su índice — pero el índice vino de argmax, calculado, no escrito a mano. Cero números mágicos: si las notas cambian, todo el análisis sigue siendo correcto. Estás listo para el álgebra lineal.</p>",
      hints: ["student_means: mean(axis=1) — colapsar las materias.", "La máscara sobre los PROMEDIOS filtra las FILAS: grades[student_means >= 7].", "best_grades = grades[best_student] — el resultado de argmax como índice de fila."]
    }
  ]
},

/* ---------------- Álgebra lineal ---------------- */
{
  id: "np-linalg",
  title: "Álgebra lineal básica",
  intro: "Deep learning ES álgebra lineal con marketing: una red neuronal es una cadena de multiplicaciones de matrices. Acá: producto punto, matmul (<code>@</code>), transpuesta, sistemas de ecuaciones e inversa — el vocabulario mínimo viable.",
  socratic: [
    {
      q: "El producto punto de dos vectores — multiplicar elemento a elemento y sumar — da UN número. ¿Qué está midiendo, intuitivamente?",
      a: "Cuánto \"colaboran\" dos vectores: si apuntan parecido, los productos se refuerzan y da grande; si son perpendiculares, se cancelan y da cero; si se oponen, negativo. Por eso es la base de la SIMILITUD: los buscadores semánticos comparan embeddings con producto punto. Y una neurona artificial calcula exactamente eso: dot(pesos, entradas) — \"¿cuánto se parece esta entrada al patrón que aprendí?\"."
    },
    {
      q: "<code>A * B</code> y <code>A @ B</code> son operaciones DISTINTAS sobre matrices. ¿Cuál es cuál, y por qué la confusión es tan peligrosa?",
      a: "<code>*</code> es elemento a elemento (cada casilla con su casilla — y broadcasting si las shapes difieren); <code>@</code> es la multiplicación DE MATRICES: cada celda del resultado es el producto punto de una fila de A con una columna de B. Peligrosa porque con matrices cuadradas AMBAS funcionan sin error — resultados completamente distintos, silencio total. Es de los bugs más caros de ML: el modelo \"entrena\" con la operación equivocada."
    },
    {
      q: "Para que <code>A @ B</code> exista, las dimensiones internas deben coincidir: (m,n) @ (n,p) → (m,p). ¿De dónde sale esa regla?",
      a: "De la mecánica: cada celda del resultado es fila-de-A · columna-de-B, y un producto punto exige vectores del MISMO largo — las filas de A miden n, las columnas de B miden n: ese n compartido se \"consume\". Truco de lectura: (m,n)@(n,p) — los n internos se cancelan, quedan los externos (m,p). Encadenar capas de una red es encadenar esta regla: la salida de una debe calzar con la entrada de la siguiente."
    },
    {
      q: "Para resolver Ax = b existe la inversa (x = A⁻¹b), pero la práctica universal es np.linalg.solve(A, b). ¿Por qué?",
      a: "Calcular la inversa completa es resolver el sistema para CADA columna de la identidad — trabajo de más — y amplifica errores de redondeo en matrices mal condicionadas. solve va directo (factorización), más rápido y más estable. Regla general del cómputo numérico: la fórmula matemática elegante y el algoritmo numérico correcto suelen ser cosas distintas — \"nunca inviertas una matriz si solo querés resolver un sistema\"."
    }
  ],
  exercises: [
    {
      id: "np-lin-1",
      title: "El producto punto",
      difficulty: 1,
      prompt: "<p>Con <code>u = np.array([1, 2, 3])</code> y <code>v = np.array([4, 5, 6])</code>:</p><ul><li><code>manual</code>: el producto punto A MANO con vectorización: multiplicá elemento a elemento y sumá → <code>(u * v).sum()</code> → <code>32</code></li><li><code>with_dot</code>: lo mismo con <code>np.dot(u, v)</code></li><li><code>with_at</code>: lo mismo con el operador <code>@</code></li><li><code>perpendicular</code>: el dot de <code>[1, 0]</code> con <code>[0, 5]</code> — vectores en ángulo recto → ¿qué número esperás?</li></ul>",
      starter: "import numpy as np\n\nu = np.array([1, 2, 3])\nv = np.array([4, 5, 6])\n\n# manual = ?\n# with_dot = ?\n# with_at = ?\n# perpendicular = ?\n",
      tests: "assert manual == 32, f\"manual: {manual}\"\nassert with_dot == 32, f\"with_dot: {with_dot}\"\nassert with_at == 32, f\"with_at: {with_at}\"\nassert perpendicular == 0, f\"perpendicular: {perpendicular} — los perpendiculares no colaboran nada\"",
      solution: "import numpy as np\n\nu = np.array([1, 2, 3])\nv = np.array([4, 5, 6])\n\nmanual = (u * v).sum()\nwith_dot = np.dot(u, v)\nwith_at = u @ v\nperpendicular = np.array([1, 0]) @ np.array([0, 5])",
      explanation: "<p>Tres sintaxis, una operación: 1·4 + 2·5 + 3·6 = 32. La versión manual te muestra las tripas (multiplicar y sumar — por eso en inglés también se llama \"multiply-accumulate\"); <code>@</code> es la forma moderna y preferida.</p><p>El cero de los perpendiculares no es anécdota: es la geometría del asunto. El dot mide proyección — cuánto de un vector \"cae sobre\" el otro. Perpendiculares = proyección nula = cero colaboración. Cuando en ML compares un embedding de búsqueda contra mil documentos, los puntajes serán estos dots: grandes = parecidos, cero = sin relación. Una neurona, un buscador y una recomendación de Netflix comparten esta línea de NumPy.</p>",
      hints: ["manual: (u * v).sum() — el * elemento a elemento que ya conocés, más la suma.", "Las otras dos: np.dot(u, v) y u @ v."]
    },
    {
      id: "np-lin-2",
      title: "* versus @: el bug silencioso",
      difficulty: 2,
      prompt: "<p>Con <code>A = np.array([[1, 2], [3, 4]])</code> y <code>B = np.array([[10, 20], [30, 40]])</code>:</p><ul><li><code>elementwise</code>: <code>A * B</code> → predecí las 4 celdas antes de correr</li><li><code>matmul</code>: <code>A @ B</code> → calculá A MANO la celda [0,0] antes de correr: fila <code>[1, 2]</code> punto columna <code>[10, 30]</code> = 1·10 + 2·30 = ?</li><li><code>are_equal</code>: ¿dan lo mismo? <code>(elementwise == matmul).all()</code> → guardá el booleano</li><li><code>vec_result</code>: matriz por vector — <code>A @ np.array([1, 0])</code> → ¿qué columna de A esperás recibir?</li></ul>",
      starter: "import numpy as np\n\nA = np.array([[1, 2], [3, 4]])\nB = np.array([[10, 20], [30, 40]])\n\n# elementwise = ?\n# matmul = ?\n# are_equal = ?\n# vec_result = ?\n",
      tests: "assert elementwise.tolist() == [[10, 40], [90, 160]], f\"elementwise: {elementwise}\"\nassert matmul.tolist() == [[70, 100], [150, 220]], f\"matmul: {matmul}\"\nassert bool(are_equal) is False, \"NO son iguales — y ningun error te aviso: ese es el peligro\"\nassert vec_result.tolist() == [1, 3], f\"vec_result: {vec_result} — A @ [1,0] extrae la primera columna\"",
      solution: "import numpy as np\n\nA = np.array([[1, 2], [3, 4]])\nB = np.array([[10, 20], [30, 40]])\n\nelementwise = A * B\nmatmul = A @ B\nare_equal = (elementwise == matmul).all()\nvec_result = A @ np.array([1, 0])",
      explanation: "<p>La celda que calculaste a mano: fila [1,2] · columna [10,30] = 70 — cada celda de <code>A @ B</code> es un producto punto fila×columna, por eso la matmul COMBINA información de toda una fila con toda una columna, mientras <code>*</code> nunca cruza nada: casilla con casilla.</p><p><code>A @ [1, 0]</code> revela la lectura profunda: multiplicar por un vector produce una <em>combinación lineal de las columnas</em> — [1,0] dice \"1 parte de la primera columna, 0 de la segunda\" → extrajo la columna [1,3]. Una capa de red neuronal hace exactamente <code>W @ x</code>: mezcla las features de entrada según los pesos aprendidos.</p><p>Y el test de <code>are_equal</code> documentó el peligro: dos resultados distintos, cero errores. Cuando dudes de una operación matricial, verificá UNA celda a mano — treinta segundos que salvan días.</p>",
      hints: ["elementwise: A * B. matmul: A @ B. La comparación: (x == y).all().", "Para matmul a mano: celda [i,j] = fila i de A producto punto columna j de B."]
    },
    {
      id: "np-lin-3",
      title: "Transpuesta e identidad",
      difficulty: 3,
      prompt: "<p>Con <code>A = np.array([[1, 2, 3], [4, 5, 6]])</code> (shape (2,3)):</p><ul><li><code>At</code>: la transpuesta (atributo <code>.T</code>) — ¿qué shape esperás?</li><li><code>shapes</code>: la tupla <code>(A.shape, At.shape)</code></li><li><code>gram</code>: el producto <code>At @ A</code> → shape (3,3) — verificá ANTES con la regla (3,2)@(2,3)</li><li><code>I</code>: la identidad 3×3 con <code>np.eye(3)</code></li><li><code>unchanged</code>: ¿<code>gram @ I</code> es igual a <code>gram</code>? → booleano con <code>np.allclose</code> — la identidad es el \"1\" de las matrices</li></ul>",
      starter: "import numpy as np\n\nA = np.array([[1, 2, 3], [4, 5, 6]])\n\n# At = ?\n# shapes = ?\n# gram = ?\n# I = ?\n# unchanged = ?\n",
      tests: "import numpy as _np\nassert At.tolist() == [[1, 4], [2, 5], [3, 6]], f\"At: {At}\"\nassert shapes == ((2, 3), (3, 2)), f\"shapes: {shapes}\"\nassert gram.shape == (3, 3), f\"gram.shape: {gram.shape}\"\nassert gram.tolist() == [[17, 22, 27], [22, 29, 36], [27, 36, 45]], f\"gram: {gram}\"\nassert I.tolist() == [[1, 0, 0], [0, 1, 0], [0, 0, 1]], f\"I: {I}\"\nassert bool(unchanged) is True, \"multiplicar por la identidad no cambia nada: ese es su trabajo\"",
      solution: "import numpy as np\n\nA = np.array([[1, 2, 3], [4, 5, 6]])\n\nAt = A.T\nshapes = (A.shape, At.shape)\ngram = At @ A\nI = np.eye(3)\nunchanged = np.allclose(gram @ I, gram)",
      explanation: "<p>La transpuesta voltea filas↔columnas — (2,3) → (3,2) — y su uso número uno es HACER COMPATIBLES las multiplicaciones: A @ A es ilegal ((2,3)@(2,3): los internos 3≠2), pero Aᵀ @ A funciona y produce (3,3). Esa matriz — la <em>matriz de Gram</em> — aparece en la solución exacta de la regresión lineal (la \"ecuación normal\": (XᵀX)⁻¹Xᵀy) que está a un nivel de distancia.</p><p>Notá que gram es simétrica (espejada respecto de la diagonal): celda [i,j] = columna_i·columna_j = celda [j,i]. Las simetrías no son casualidad en álgebra lineal: son estructura aprovechable.</p><p>Y la identidad con su diagonal de unos: el elemento neutro, el \"multiplicar por 1\". Hoy parece trivial; en el próximo ejercicio es la VARA con que se mide si una inversa es correcta.</p>",
      hints: ["La transpuesta es un atributo: A.T — sin paréntesis.", "gram = A.T @ A. La identidad: np.eye(3).", "unchanged: np.allclose(gram @ I, gram) — allclose compara con tolerancia de floats."]
    },
    {
      id: "np-lin-4",
      title: "Resolver un sistema de ecuaciones",
      difficulty: 4,
      prompt: "<p>Fuiste dos veces a la verdulería: 2 manzanas y 1 banana costaron $5; 1 manzana y 3 bananas, $10. ¿Cuánto cuesta cada fruta? Eso es el sistema:</p><pre>2a + 1b = 5\n1a + 3b = 10</pre><ul><li><code>A</code>: la matriz de coeficientes <code>[[2, 1], [1, 3]]</code> y <code>b</code>: el vector <code>[5, 10]</code></li><li><code>prices</code>: la solución con <code>np.linalg.solve(A, b)</code> → los precios <code>[manzana, banana]</code></li><li><code>apple</code>, <code>banana</code>: desempacá (a mano con índices o como quieras)</li><li><code>check</code>: verificá la solución — ¿<code>A @ prices</code> reconstruye <code>b</code>? → booleano con allclose. NUNCA confíes en un solver sin verificar.</li></ul>",
      starter: "import numpy as np\n\n# A = ?\n# b = ?\n# prices = ?\n# apple, banana = ?\n# check = ?\n",
      tests: "import numpy as _np\nassert A.tolist() == [[2, 1], [1, 3]], f\"A: {A}\"\nassert b.tolist() == [5, 10], f\"b: {b}\"\nassert _np.allclose(prices, [1.0, 3.0]), f\"prices: {prices} — manzana $1, banana $3\"\nassert abs(apple - 1.0) < 1e-9 and abs(banana - 3.0) < 1e-9, f\"apple={apple}, banana={banana}\"\nassert bool(check) is True, \"A @ prices debe reconstruir b\"",
      solution: "import numpy as np\n\nA = np.array([[2, 1], [1, 3]])\nb = np.array([5, 10])\n\nprices = np.linalg.solve(A, b)\napple, banana = prices\ncheck = np.allclose(A @ prices, b)",
      explanation: "<p>Traducción pura: cada ECUACIÓN es una fila de A (los coeficientes) más su celda en b (el resultado); las INCÓGNITAS son el vector x que buscás; y el sistema entero se escribe <code>A @ x = b</code>. solve lo despeja: manzana $1, banana $3 (verificá de cabeza: 2·1+3=5 , 1+3·3=10 ).</p><p>La línea de verificación — <code>allclose(A @ prices, b)</code> — es cultura de cómputo numérico: la respuesta de un solver son floats con redondeo, y la pregunta correcta nunca es \"¿es exacta?\" sino \"¿reconstruye el problema dentro de la tolerancia?\". Hábito de por vida.</p><p>¿Y esto qué tiene que ver con ML? Todo: \"encontrá los parámetros que satisfacen estos datos\" ES un sistema de ecuaciones (sobredeterminado, con ruido — por eso se resuelve minimizando error en vez de exacto, pero la maquinaria es esta). Entrenar la regresión lineal del próximo nivel será resolver un primo de este problema de frutas.</p>",
      hints: ["Cada ecuación es una fila: A = [[2, 1], [1, 3]], b = [5, 10].", "np.linalg.solve(A, b) devuelve el vector solución.", "check: np.allclose(A @ prices, b)."]
    },
    {
      id: "np-lin-5",
      title: "Inversa, norma y vectores unitarios",
      difficulty: 5,
      prompt: "<p>Las últimas piezas del kit:</p><ul><li><code>A_inv</code>: la inversa de <code>A = np.array([[4.0, 7.0], [2.0, 6.0]])</code> con <code>np.linalg.inv</code></li><li><code>is_inverse</code>: la prueba de identidad — ¿<code>A @ A_inv</code> ≈ <code>np.eye(2)</code>? (allclose; con == fallaría por redondeo — mirá el resultado crudo con print, vas a ver los casi-ceros tipo 1e-17)</li><li><code>v_norm</code>: la longitud (norma) de <code>v = np.array([3.0, 4.0])</code> con <code>np.linalg.norm</code> → el clásico <code>5.0</code></li><li><code>unit</code>: el vector unitario de v — el mismo rumbo, longitud 1: dividí v por su norma → <code>[0.6, 0.8]</code></li><li><code>unit_check</code>: la norma de unit → <code>1.0</code></li></ul>",
      starter: "import numpy as np\n\nA = np.array([[4.0, 7.0], [2.0, 6.0]])\nv = np.array([3.0, 4.0])\n\n# A_inv = ?\n# is_inverse = ?\n# v_norm = ?\n# unit = ?\n# unit_check = ?\n",
      tests: "import numpy as _np\nassert _np.allclose(A_inv, [[0.6, -0.7], [-0.2, 0.4]]), f\"A_inv: {A_inv}\"\nassert bool(is_inverse) is True, \"A @ A_inv debe dar la identidad (con allclose)\"\nassert abs(v_norm - 5.0) < 1e-9, f\"v_norm: {v_norm}\"\nassert _np.allclose(unit, [0.6, 0.8]), f\"unit: {unit}\"\nassert abs(unit_check - 1.0) < 1e-9, f\"unit_check: {unit_check}\"",
      solution: "import numpy as np\n\nA = np.array([[4.0, 7.0], [2.0, 6.0]])\nv = np.array([3.0, 4.0])\n\nA_inv = np.linalg.inv(A)\nis_inverse = np.allclose(A @ A_inv, np.eye(2))\nv_norm = np.linalg.norm(v)\nunit = v / v_norm\nunit_check = np.linalg.norm(unit)",
      explanation: "<p>La inversa es el \"dividir\" de las matrices: A⁻¹ deshace lo que A hace, y su certificado es <code>A @ A⁻¹ = I</code> — que verificaste con allclose porque los floats devuelven \"casi identidad\" (esos 1e-17 que viste impresos son el redondeo asomando; <code>==</code> habría dicho False sobre una respuesta correcta — lección permanente del mundo float, la misma del round de Básico).</p><p>La norma es Pitágoras generalizado: √(3²+4²) = 5 — la longitud del vector en cualquier dimensión. Y <code>v / norma</code> produce el vector UNITARIO: dirección pura, magnitud descartada. ¿Para qué? Para comparar direcciones sin que el tamaño contamine: la <em>similitud coseno</em> — EL método para comparar embeddings de texto en NLP — es exactamente el dot de dos vectores normalizados. La distancia entre dos puntos: <code>norm(a - b)</code> — el corazón del algoritmo kNN que vas a escribir en el próximo nivel.</p><p>Kit completo: dot, @, transpuesta, solve, inversa, norma. Es suficiente álgebra para leer el 80% del código de ML que existe. Vamos al proyecto.</p>",
      hints: ["np.linalg.inv(A), np.linalg.norm(v) — el submódulo linalg agrupa todo esto.", "is_inverse: np.allclose(A @ A_inv, np.eye(2)) — JAMÁS == con floats.", "unit = v / v_norm — broadcasting de un escalar, como siempre."]
    }
  ]
},

/* ---------------- PROYECTO NUMPY ---------------- */
{
  id: "proyecto-numpy",
  title: "Proyecto: Análisis de calificaciones",
  isProject: true,
  intro: "Sos el analista del curso: 5 estudiantes, 4 exámenes, una matriz. Promedios por eje, curva de ajuste, máscaras de aprobación y estandarización — todo el nivel NumPy aplicado a un dataset de verdad (en miniatura).",
  socratic: [
    {
      q: "Vas a calcular promedios por estudiante Y por examen sobre la misma matriz. ¿Cómo decidís el axis de cada uno sin adivinar?",
      a: "Preguntate qué dimensión debe SOBREVIVIR. Promedio por estudiante: quiero un número POR FILA (5 valores) → colapso las columnas → axis=1. Promedio por examen: un número POR COLUMNA (4 valores) → colapso las filas → axis=0. Y verificá siempre con la shape del resultado: (5,) o (4,) te dicen al instante si acertaste. Nunca adivines axis: razonalo o comprobalo."
    },
    {
      q: "La estandarización del proyecto es POR EXAMEN (por columna): cada nota se compara contra la media de SU examen. ¿Por qué tiene más sentido que estandarizar globalmente?",
      a: "Porque los exámenes tienen dificultades distintas: un 70 en el examen difícil (media 50) es excelente; en el fácil (media 85), flojo. Estandarizar por columna pone cada nota en el contexto de SU prueba: \"¿cuántos desvíos sobre la media de ESTE examen?\". En ML es la práctica estándar: cada feature se normaliza por separado, por la misma razón — escalas y distribuciones propias."
    },
    {
      q: "Para \"estudiantes que aprobaron\" vas a indexar la matriz con una máscara calculada sobre los promedios. ¿Qué tiene que coincidir para que funcione, y qué obtenés?",
      a: "El largo de la máscara (5 booleanos) con el eje 0 de la matriz (5 filas): cada booleano decide si su fila entra. Obtenés una submatriz con las filas ganadoras, (n_aprobados, 4). Es el patrón \"filtrar muestras según una condición derivada\" — el mismo gesto con que en ML separás train de outliers, clases entre sí, o datos completos de incompletos."
    }
  ],
  exercises: [
    {
      id: "np-proj-1",
      title: "Análisis de calificaciones del curso",
      difficulty: 5,
      prompt: "<p>La matriz del curso (5 estudiantes × 4 exámenes):</p><pre>grades = np.array([[55, 70, 80, 65],\n                   [90, 95, 85, 100],\n                   [40, 45, 50, 38],\n                   [70, 60, 75, 80],\n                   [88, 92, 79, 85]])</pre><p>Calculá:</p><ol><li><code>student_means</code> (por estudiante) y <code>exam_means</code> (por examen)</li><li><code>best_student</code>: índice del mejor promedio; <code>hardest_exam</code>: índice del examen con peor media → <code>0</code></li><li><code>curved</code>: la curva del profesor — 5 puntos a todos, pero con techo 100 (<code>np.clip(arr, min, max)</code>)</li><li><code>passing_mask</code>: estudiantes con promedio ≥ 60; <code>n_passing</code> → <code>4</code>; <code>passing_grades</code>: sus filas completas</li><li><code>standardized</code>: las notas estandarizadas POR EXAMEN: <code>(grades - exam_means) / grades.std(axis=0)</code> — broadcasting (5,4) contra (4,). Verificá: las medias por columna del resultado deben ser ≈ 0.</li><li><code>top_scores</code>: la mejor nota de cada estudiante → <code>[80, 100, 50, 80, 92]</code></li></ol>",
      starter: "import numpy as np\n\ngrades = np.array([[55, 70, 80, 65],\n                   [90, 95, 85, 100],\n                   [40, 45, 50, 38],\n                   [70, 60, 75, 80],\n                   [88, 92, 79, 85]])\n\n# 1. student_means, exam_means\n# 2. best_student, hardest_exam\n# 3. curved\n# 4. passing_mask, n_passing, passing_grades\n# 5. standardized\n# 6. top_scores\n",
      tests: "import numpy as _np\nassert _np.allclose(student_means, [67.5, 92.5, 43.25, 71.25, 86.0]), f\"student_means: {student_means}\"\nassert _np.allclose(exam_means, [68.6, 72.4, 73.8, 73.6]), f\"exam_means: {exam_means}\"\nassert best_student == 1, f\"best_student: {best_student}\"\nassert hardest_exam == 0, f\"hardest_exam: {hardest_exam}\"\nassert curved.max() == 100 and curved[1].tolist() == [95, 100, 90, 100], f\"curved fila 1: {curved[1]} — el 100 con +5 debe quedar en 100 (clip)\"\nassert curved[0].tolist() == [60, 75, 85, 70], f\"curved fila 0: {curved[0]}\"\nassert passing_mask.tolist() == [True, True, False, True, True], f\"passing_mask: {passing_mask}\"\nassert n_passing == 4, f\"n_passing: {n_passing}\"\nassert passing_grades.shape == (4, 4), f\"passing_grades.shape: {passing_grades.shape}\"\nassert passing_grades[0].tolist() == [55, 70, 80, 65], \"passing_grades debe contener las filas de los aprobados\"\nassert _np.allclose(standardized.mean(axis=0), [0, 0, 0, 0], atol=1e-9), \"las medias por columna del estandarizado deben ser ~0\"\nassert _np.allclose(standardized.std(axis=0), [1, 1, 1, 1], atol=1e-9), \"los desvios por columna deben ser ~1\"\nassert top_scores.tolist() == [80, 100, 50, 80, 92], f\"top_scores: {top_scores}\"",
      solution: "import numpy as np\n\ngrades = np.array([[55, 70, 80, 65],\n                   [90, 95, 85, 100],\n                   [40, 45, 50, 38],\n                   [70, 60, 75, 80],\n                   [88, 92, 79, 85]])\n\nstudent_means = grades.mean(axis=1)\nexam_means = grades.mean(axis=0)\n\nbest_student = np.argmax(student_means)\nhardest_exam = np.argmin(exam_means)\n\ncurved = np.clip(grades + 5, 0, 100)\n\npassing_mask = student_means >= 60\nn_passing = passing_mask.sum()\npassing_grades = grades[passing_mask]\n\nstandardized = (grades - exam_means) / grades.std(axis=0)\n\ntop_scores = grades.max(axis=1)",
      explanation: "<p>Diez líneas de cálculo, cero loops, y cada línea es un patrón profesional:</p><p><strong>Ejes</strong>: mean(axis=1) por estudiante, mean(axis=0) por examen — la decisión razonada, confirmable por shapes (5,) y (4,). <strong>argmax/argmin</strong>: índices, no valores, porque \"¿quién?\" importa más que \"¿cuánto?\". <strong>clip</strong>: <code>grades + 5</code> es broadcasting escalar, y clip impone los límites del dominio (las notas viven en [0,100]) — más limpio que el where anidado equivalente. <strong>La máscara puente</strong>: calculada sobre los promedios (5,), aplicada sobre la matriz (5,4) — filas enteras seleccionadas por una propiedad derivada. <strong>Estandarización por columna</strong>: (5,4) menos (4,) — broadcasting alineando desde la derecha, cada columna contra SU media y SU desvío; las medias ≈ 0 del test confirman la operación. <strong>max(axis=1)</strong>: el mejor momento de cada estudiante.</p><p>Si esta matriz tuviera 50.000 filas y 300 columnas, el código sería IDÉNTICO — esa es la promesa de NumPy y la razón por la que la IA se construye encima. El próximo nivel: usar todo esto para que la máquina APRENDA.</p>",
      hints: ["Andá variable por variable verificando con Ejecutar y print — el proyecto es secuencial, no monolítico.", "curved: np.clip(grades + 5, 0, 100) — primero la suma broadcast, después el techo.", "passing_grades: grades[passing_mask] — la máscara de promedios filtra filas de la matriz.", "standardized: restá exam_means y dividí por grades.std(axis=0) — ambos (4,) contra la matriz (5,4)."]
    }
  ]
}
]);
