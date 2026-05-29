
const API = "http://localhost:8080";

let grafico = null;
let todosLosGastos = [];
let todosLosIngresos = [];

let limitesCategorias = {
    "Agua": 80000,
    "Luz": 100000,
    "Gas": 40000,
    "Internet": 60000
};

window.onload = function () {
    const usuarioId = localStorage.getItem("usuarioId");

    if (usuarioId) {
        document.getElementById("nav-botones").style.display = "flex";
        document.getElementById("top-buttons").style.display = "flex";

        cargarGastos();
        mostrarVista("gastos");
    }
};

// ===== TOAST =====
function toast(mensaje, tipo = "info") {
    const t = document.getElementById("toast");

    if (!t) return;

    t.textContent = mensaje;
    t.className = "toast show " + tipo;

    setTimeout(() => {
        t.className = "toast";
    }, 3000);
}

// ===== CONTROL DE VISTAS =====
function mostrarVista(vista) {
    document.getElementById("registro").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("gastos").style.display = "none";

    document.getElementById("lista").style.display = "none";

    document.getElementById("dashboard").style.display = "none";

    document.getElementById(vista).style.display = "block";
}

// ===== REGISTRO =====
function registrar() {
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;

    if (!nombre || !correo || !password) {
        toast("⚠️ Completa todos los campos", "warning");
        return;
    }

    fetch(API + "/usuarios/registro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre,
            correo: correo,
            password: password
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error();
        }

        return res.json();
    })
    .then(() => {
        toast("✅ Usuario registrado correctamente", "success");

        document.getElementById("nombre").value = "";
        document.getElementById("correo").value = "";
        document.getElementById("password").value = "";

        mostrarVista("login");
    })
    .catch(() => {
        toast("❌ Error al registrar usuario", "error");
    });
}

// ===== LOGIN =====
function login() {
    const correo = document.getElementById("loginCorreo").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!correo || !password) {
        toast("⚠️ Ingresa correo y contraseña", "warning");
        return;
    }

    fetch(API + "/usuarios/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            correo: correo,
            password: password
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error();
        }

        return res.json();
    })
    .then(usuario => {
        localStorage.setItem("usuarioId", usuario.id);
        localStorage.setItem("usuarioNombre", usuario.nombre);

        toast("✅ Login exitoso", "success");

        document.getElementById("nav-botones").style.display = "flex";
        document.getElementById("top-buttons").style.display = "flex";
        document.getElementById("usuarioNombre").innerText =
    "👤 " + usuario.nombre;


        cargarGastos();
        actualizarListaPresupuestos();

        mostrarVista("gastos");
    })
    .catch(() => {
        toast("❌ Credenciales incorrectas", "error");
    });
}

// ===== CERRAR SESIÓN =====
function cerrarSesion() {
    localStorage.clear();

    document.getElementById("nav-botones").style.display = "none";
    
    document.getElementById("top-buttons").style.display = "none";

    mostrarVista("login");

    toast("🚪 Sesión cerrada correctamente", "info");
}

// ===== CREAR GASTO =====
function crearGasto() {
    const categoria = document.getElementById("categoria").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const fecha = document.getElementById("fecha").value;

    const usuarioId = localStorage.getItem("usuarioId");

    if (!categoria || !valor || !fecha) {
        toast("⚠️ Completa todos los campos", "warning");
        return;
    }

    if (valor <= 0 || isNaN(valor)) {
        toast("❌ Valor inválido", "error");
        return;
    }

    fetch(API + "/gastos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            categoria: categoria,
            valor: valor,
            fecha: fecha,
            usuarioId: parseInt(usuarioId)
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error();
        }

        return res.json();
    })
    .then(() => {
        toast("✅ Gasto guardado correctamente", "success");

        document.getElementById("categoria").value = "";
        document.getElementById("valor").value = "";
        document.getElementById("fecha").value = "";

        cargarGastos();
    })
    .catch(() => {
        toast("❌ Error al guardar gasto", "error");
    });
}

// ===== CARGAR GASTOS =====
function cargarGastos() {
    const usuarioId = localStorage.getItem("usuarioId");

    if (!usuarioId) return;

    fetch(API + "/gastos/usuario/" + usuarioId)
    .then(res => {
        if (!res.ok) {
            throw new Error();
        }

        return res.json();
    })
    .then(data => {
        todosLosGastos = data;

        filtrarYMostrarGastos();
    })
    .catch(() => {
        toast("❌ Error al cargar gastos", "error");
    });
}

// ===== CREAR INGRESO =====
function crearIngreso() {
    const fuente = document.getElementById("ingresoFuente").value.trim();
    const valor = parseFloat(document.getElementById("ingresoValor").value);

    const usuarioId = localStorage.getItem("usuarioId");

    if (!fuente || !valor) {
        toast("⚠️ Completa los campos del ingreso", "warning");
        return;
    }

    if (valor <= 0 || isNaN(valor)) {
        toast("❌ Valor inválido", "error");
        return;
    }

    todosLosIngresos.push({
        fuente: fuente,
        valor: valor,
        fecha: new Date().toISOString().split("T")[0],
        usuarioId: parseInt(usuarioId)
    });

    toast("✅ Ingreso registrado correctamente", "success");

    document.getElementById("ingresoFuente").value = "";
    document.getElementById("ingresoValor").value = "";

    filtrarYMostrarGastos();
}

// ===== PRESUPUESTOS =====
function guardarPresupuesto() {
    const categoria = document.getElementById("limiteCategoria").value.trim();
    const valor = parseFloat(document.getElementById("limiteValor").value);

    if (!categoria || isNaN(valor) || valor <= 0) {
        toast("⚠️ Ingresa una categoría válida", "warning");
        return;
    }

    const existe = limitesCategorias[categoria] !== undefined;

    limitesCategorias[categoria] = valor;

    if (existe) {
        toast("🔄 Presupuesto modificado para " + categoria, "success");
    } else {
        toast("✅ Presupuesto guardado para " + categoria, "success");
    }

    document.getElementById("limiteCategoria").value = "";
    document.getElementById("limiteValor").value = "";

    actualizarListaPresupuestos();

    filtrarYMostrarGastos();
}

// ===== MOSTRAR PRESUPUESTOS =====
function actualizarListaPresupuestos() {
    const lista = document.getElementById("listaPresupuestos");

    if (!lista) return;

    lista.innerHTML = "";

    Object.keys(limitesCategorias).forEach(cat => {
        const li = document.createElement("li");

        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";

        li.innerHTML =
            "<span><strong>" + cat + ":</strong> $" + limitesCategorias[cat] + "</span>" +
            "<button onclick=\"cargarPresupuestoParaModificar('" + cat + "', " + limitesCategorias[cat] + ")\">✏️ Modificar</button>";

        lista.appendChild(li);
    });
}

function cargarPresupuestoParaModificar(categoria, valor) {

    document.getElementById("limiteCategoria").value = categoria;
    document.getElementById("limiteValor").value = valor;

    toast("✏️ Modificando presupuesto de " + categoria, "info");

    const elemento = document.getElementById("formPresupuesto");

    if (!elemento) return;

    window.scrollTo({
        top: elemento.offsetTop - 150, // 🔥 ajusta qué tan arriba quieres
        behavior: "smooth"
    });
}

function filtrarYMostrarGastos() {
    const lista = document.getElementById("listaGastos");
    if (!lista) return;

    lista.innerHTML = "";

    let total = 0;
    let categorias = {};

    // ✅ DEFINIR VARIABLES QUE FALTABAN
    let gastosProcesados = [...todosLosGastos];
    const filtro = document.getElementById("filtroPeriodo")?.value || "todos";

    const hoy = new Date();
    const mesActual = hoy.getMonth();
    const anioActual = hoy.getFullYear();

    let totalMesActual = 0;
    let totalMesAnterior = 0;

    // ✅ FILTROS
    if (filtro !== "todos") {
        gastosProcesados = gastosProcesados.filter(g => {
    if (!g.fecha) return false;

    // ✅ Parseo manual SIEMPRE
    const [a, m, d] = g.fecha.split("-");
    const fecha = new Date(a, m - 1, d);

    const hoy = new Date();
    const hoyFecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

    const gastoFecha = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());

    const diffDias = (hoyFecha - gastoFecha) / (1000 * 60 * 60 * 24);

    if (filtro === "diario") {
        return gastoFecha.getTime() === hoyFecha.getTime();
    }

    if (filtro === "semanal") {
        return diffDias <= 7 && diffDias >= 0;
    }

    if (filtro === "mensual") {
        return gastoFecha.getMonth() === hoyFecha.getMonth() &&
               gastoFecha.getFullYear() === hoyFecha.getFullYear();
    }

    return true;
});
    }

    // ✅ PROCESAR GASTOS
    gastosProcesados.forEach(g => {
        total += g.valor;

        const fecha = new Date(g.fecha);

        if (fecha.getFullYear() === anioActual) {
            if (fecha.getMonth() === mesActual) {
                totalMesActual += g.valor;
            } else if (fecha.getMonth() === mesActual - 1) {
                totalMesAnterior += g.valor;
            }
        }

        const li = document.createElement("li");
        li.textContent = `${g.fecha} - ${g.categoria} - $${g.valor}`;
        lista.appendChild(li);

        categorias[g.categoria] = (categorias[g.categoria] || 0) + g.valor;
    });

    document.getElementById("total").innerText = total;

    // ✅ BALANCE
    let totalIngresos = 0;
    todosLosIngresos.forEach(i => totalIngresos += i.valor);

    let balance = totalIngresos - total;

    document.getElementById("totalIngresos").innerText = totalIngresos;
    document.getElementById("balanceNeto").innerText = balance;

    // ✅ ALERTA
    if (totalMesAnterior > 0) {
        const aumento = ((totalMesActual - totalMesAnterior) / totalMesAnterior) * 100;

        if (aumento >= 30) {
            toast(`⚠️ Gastaste ${aumento.toFixed(1)}% más que el mes pasado`, "warning");
        }
    }

    // ✅ CATEGORÍAS
    Object.keys(categorias).forEach(cat => {
        const limite = limitesCategorias[cat];

        if (limite && categorias[cat] > limite) {
            toast(`❌ Límite superado en ${cat}`, "error");
        }
    });

    actualizarGrafico(categorias);
    generarRecomendaciones(categorias, totalMesActual);
    mostrarComparativaMensual(totalMesActual, totalMesAnterior);
}


// ===== RECOMENDACIONES INTELIGENTES POTENCIADAS (HU009) =====
function generarRecomendaciones(categorias, totalMesActual) {
    const lista = document.getElementById("listaRecomendaciones");
    if (!lista) return;

    lista.innerHTML = "";
    let recomendaciones = [];

    // 1. Análisis de volumen general con cálculo de impacto
    if (totalMesActual > 200000) {
        const excesoBase = totalMesActual - 200000;
        recomendaciones.push(
            "📉 <strong>Gastos elevados detectados:</strong> Has superado el umbral base mensual por <strong>$" + excesoBase + "</strong>. Te sugerimos revisar las facturas de servicios y desconectar electrodomésticos en modo espera (consumo vampiro)."
        );
    }

    // 2. Escaneo de categorías con cálculo matemático del dinero disponible
    Object.keys(categorias).forEach(cat => {
        const gasto = categorias[cat];
        const limite = limitesCategorias[cat];

        if (limite) {
            const porcentajeConsumido = (gasto / limite) * 100;

            if (gasto > limite) {
                const deficit = gasto - limite;
                recomendaciones.push(
                    "🚨 <strong>¡Presupuesto Excedido en " + cat + "!</strong> Has sobrepasado el límite por <strong>$" + deficit + "</strong>. Es crítico restringir el uso de este recurso de inmediato para equilibrar el balance financiero."
                );
            } else if (porcentajeConsumido >= 80) {
                const disponible = limite - gasto;
                recomendaciones.push(
                    "⚠️ <strong>Zona de riesgo en " + cat + ":</strong> Has consumido el <strong>" + porcentajeConsumido.toFixed(0) + "%</strong> de tu presupuesto. Solo te quedan <strong>$" + disponible + "</strong> disponibles para el resto del período."
                );
            }
        }

        // 3. Consejos tácticos y específicos basados en datos reales de consumo doméstico
        if (cat.toLowerCase() === "luz" && gasto > 50000) {
            recomendaciones.push("💡 <strong>Tip de Ahorro Energético:</strong> Tu consumo de luz es alto ($" + gasto + "). Utilizar la lavadora con carga completa y agua fría reduce hasta un 11% el costo de este servicio.");
        }
        if (cat.toLowerCase() === "agua" && gasto > 40000) {
            recomendaciones.push("💧 <strong>Tip de Control Hídrico:</strong> El gasto en agua ($" + gasto + ") superó el promedio ideal. Reducir el tiempo de la ducha a 5 minutos puede ahorrar hasta 3.500 litros de agua al mes por persona.");
        }
        if (cat.toLowerCase() === "gas" && gasto > 25000) {
            recomendaciones.push("🔥 <strong>Tip de Eficiencia Térmica:</strong> Al cocinar, asegúrate de usar ollas que cubran completamente la llama de la estufa y tápalas. Así aprovechas al máximo el calor y reduces el uso de gas.");
        }
    });

    // 4. Estado de éxito si el usuario mantiene un control perfecto
    if (recomendaciones.length === 0) {
        recomendaciones.push(
            "🌟 <strong>¡Hábitos Financieros Excelentes!</strong> No se detectan anomalías, excesos ni presupuestos en peligro. Tu comportamiento actual asegura la estabilidad económica de tu hogar."
        );
    }

    // 5. Renderizado en pantalla con estilos consistentes a styles.css
    recomendaciones.forEach(r => {
        const li = document.createElement("li");
        
        // Estilos en línea para asegurar que se vean modernos y limpios
        li.style.background = "#ffffff";
        li.style.border = "1px solid #e2e8f0";
        li.style.borderLeft = "5px solid #3b82f6"; // Línea azul de sugerencia informativa
        li.style.padding = "14px 18px";
        li.style.borderRadius = "10px";
        li.style.marginBottom = "10px";
        li.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)";
        
        // Corrección: Usamos innerHTML para procesar las etiquetas <strong> correctamente
        li.innerHTML = r; 
        
        lista.appendChild(li);
    });
}

// ===== DASHBOARD =====
function verDashboard() {
    mostrarVista("dashboard");

    filtrarYMostrarGastos();
}

// ===== COMPARATIVA =====
function mostrarComparativaMensual(totalMesActual, totalMesAnterior) {
    const contenedor = document.getElementById("cuadroComparativo");

    if (!contenedor) return;

    if (totalMesAnterior === 0) {
        contenedor.innerHTML =
            "<p>Faltan datos del mes anterior.</p>";

        return;
    }

    const diferencia =
        totalMesActual - totalMesAnterior;

    const porcentaje =
        (diferencia / totalMesAnterior) * 100;

    let mensaje = "";

    if (diferencia > 0) {
        mensaje =
            "🔺 Este mes gastaste $" +
            diferencia +
            " más (+" +
            porcentaje.toFixed(1) +
            "%)";
    } else {
        mensaje =
            "📉 Este mes gastaste $" +
            Math.abs(diferencia) +
            " menos (" +
            porcentaje.toFixed(1) +
            "%)";
    }

    contenedor.innerHTML =
        "<p style='font-size:15px; font-weight:600;'>" +
        mensaje +
        "</p>";
}

// ===== EXPORTAR PDF =====
function exportarPDF() {
    window.print();

    toast(
        "📄 Preparando PDF...",
        "success"
    );
}

// ===== GRÁFICO =====
function actualizarGrafico(categorias) {
    const ctx = document.getElementById("grafico");

    if (!ctx) return;

    const labels = Object.keys(categorias);
    const valores = Object.values(categorias);

    if (grafico) {
        grafico.destroy();
    }

    grafico = new Chart(ctx, {
        type: "pie",

        data: {
            labels: labels,

            datasets: [{
                data: valores,

                backgroundColor: [
                    "#10b981",
                    "#3b82f6",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6",
                    "#ec4899"
                ]
            }]
        },

        options: {
            responsive: true
        }
    });
}








