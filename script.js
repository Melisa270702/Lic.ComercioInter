const materias = [
  { id: "lectura", nombre: "Lectura y escritura académica", habilita: ["macroeconomia"] },
  { id: "matematicas", nombre: "Matemáticas para economía y administración", habilita: ["macroeconomia"] },
  { id: "textos", nombre: "Textos de Economía y Administración", habilita: ["introduccion_economia"] },
  { id: "macroeconomia", nombre: "Macroeconomía", requisitos: ["lectura", "matematicas"], habilita: ["estructura", "microeconomia"] },
  { id: "microeconomia", nombre: "Microeconomía", requisitos: ["macroeconomia"], habilita: ["comercio_internacional"] },
  { id: "introduccion_economia", nombre: "Introducción a la Economía", requisitos: ["textos"], habilita: ["estadistica"] },
  { id: "estructura", nombre: "Estructura Económica Argentina y Mundial", requisitos: ["macroeconomia"], habilita: ["algebra"] },
  { id: "comercio_internacional", nombre: "Introducción al Comercio Internacional", requisitos: ["microeconomia"], habilita: ["analisis_matematico"] },
  { id: "estadistica", nombre: "Estadística básica para Economía y Administración", requisitos: ["introduccion_economia"], habilita: ["historia_argentina"] },
  { id: "algebra", nombre: "Álgebra", requisitos: ["estructura"], habilita: ["historia_social"] },
  { id: "analisis_matematico", nombre: "Análisis Matemático aplicado a la Economía", requisitos: ["comercio_internacional"], habilita: ["pensamiento_social"] },
  { id: "historia_argentina", nombre: "Historia Argentina", requisitos: ["estadistica"], habilita: ["pensamiento_economico"] },
  { id: "historia_social", nombre: "Historia Social General", requisitos: ["algebra"], habilita: ["integracion"] },
  { id: "pensamiento_social", nombre: "Introducción al Pensamiento Social", requisitos: ["analisis_matematico"], habilita: ["relaciones"] },
  { id: "pensamiento_economico", nombre: "Historia del Pensamiento Económico", requisitos: ["historia_argentina"], habilita: ["teoria_comercio"] },
  { id: "economia_laboral", nombre: "Economía Laboral (Electiva)", habilita: ["dinero"] },
  { id: "ingles1", nombre: "Inglés I", habilita: ["ingles_comercial1"] },
  { id: "integracion", nombre: "Integración Económica", requisitos: ["historia_social"], habilita: ["costos"] },
  { id: "relaciones", nombre: "Relaciones Económicas Internacionales", requisitos: ["pensamiento_social"], habilita: ["calificacion"] },
  { id: "teoria_comercio", nombre: "Teoría de Comercio Internacional", requisitos: ["pensamiento_economico"], habilita: ["operaria"] },
  { id: "costos", nombre: "Costos y Precios de Importación y Exportación", requisitos: ["integracion"], habilita: ["logica"] },
  { id: "calificacion", nombre: "Calificación Arancelaria y Valoración Aduanera", requisitos: ["relaciones"], habilita: ["marketing"] },
  { id: "operaria", nombre: "Operaria y Práctica Aduanera del Comercio Internacional", requisitos: ["teoria_comercio"], habilita: ["juridicos"] },
  { id: "logica", nombre: "Lógica Integral del Comercio Internacional", requisitos: ["costos"], habilita: ["medios"] },
  { id: "marketing", nombre: "Comercialización y Marketing Internacional", requisitos: ["calificacion"], habilita: ["negociaciones"] },
  { id: "juridicos", nombre: "Instrumentos Jurídicos del Comercio Internacional", requisitos: ["operaria"], habilita: ["seminario"] },
  { id: "medios", nombre: "Medios de Pagos Internacionales, Financieros y Normativas Argentino-Mundial", requisitos: ["logica"], habilita: ["seminario"] },
  { id: "negociaciones", nombre: "Comercio y Negociaciones Internacionales", requisitos: ["marketing"], habilita: ["seminario"] },
  { id: "seminario", nombre: "Seminario de Práctica Integral en Comercio Internacional", requisitos: ["juridicos", "medios", "negociaciones"] },
  { id: "dinero", nombre: "Dinero, Créditos y Bancos (Electivo)", requisitos: ["economia_laboral"] },
  { id: "ingles_comercial1", nombre: "Inglés Comercial I", requisitos: ["ingles1"], habilita: ["ingles_comercial2"] },
  { id: "ingles_comercial2", nombre: "Inglés Comercial II", requisitos: ["ingles_comercial1"], habilita: ["ingles_conversacion"] },
  { id: "ingles_conversacion", nombre: "Inglés Comercial Conversación", requisitos: ["ingles_comercial2"] }
];

const estadoMaterias = {};

function crearMalla() {
  const contenedor = document.getElementById("malla");
  materias.forEach(m => {
    estadoMaterias[m.id] = false;
    const div = document.createElement("div");
    div.className = "materia";
    div.id = m.id;
    const titulo = document.createElement("h3");
    titulo.innerText = m.nombre;
    const boton = document.createElement("button");
    boton.innerText = "Aprobar";
    boton.disabled = m.requisitos?.some(r => !estadoMaterias[r]);
    boton.onclick = () => aprobarMateria(m.id);
    div.appendChild(titulo);
    div.appendChild(boton);
    contenedor.appendChild(div);
  });
  actualizarBotones();
}

function aprobarMateria(id) {
  estadoMaterias[id] = true;
  document.getElementById(id).classList.add("aprobada");
  actualizarBotones();
}

function actualizarBotones() {
  materias.forEach(m => {
    const boton = document.getElementById(m.id).querySelector("button");
    if (estadoMaterias[m.id]) {
      boton.disabled = true;
      return;
    }
    const puedeAprobar = !m.requisitos || m.requisitos.every(r => estadoMaterias[r]);
    boton.disabled = !puedeAprobar;
  });
}

document.addEventListener("DOMContentLoaded", crearMalla);
