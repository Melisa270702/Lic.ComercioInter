const materias = {
  "Lectura y escritura académica": ["Macroeconomía"],
  "Textos de Economía y Administración": ["Macroeconomía"],
  "Matemáticas para economía y administración": ["Introducción a la Economía"],
  "Macroeconomía": ["Estructura Económica Argentina y Mundial"],
  "Microeconomía": ["Introducción al Comercio Internacional"],

  "Introducción a la Economía": ["Estadística básica para Economía y Administración"],
  "Estructura Económica Argentina y Mundial": ["Álgebra"],
  "Introducción al Comercio Internacional": ["Análisis Matemático aplicado a la Economía"],

  "Estadística básica para Economía y Administración": ["Historia Argentina"],
  "Álgebra": ["Historia Social General"],
  "Análisis Matemático aplicado a la Economía": ["Introducción al Pensamiento Social"],

  "Historia Argentina": ["Historia del Pensamiento Económico"],
  "Historia Social General": ["Integración Económica"],
  "Introducción al Pensamiento Social": ["Relaciones Económicas Internacionales"],

  "Historia del Pensamiento Económico": ["Teoría de Comercio Internacional"],
  "Economía Laboral Electiva": ["Dinero, Créditos y Bancos"],
  "Ingles I": ["Ingles Comercial I"],

  "Integración Económica": ["Costos y Precios de Importación y Exportación"],
  "Relaciones Económicas Internacionales": ["Calificación Arancelaria y Valoración Aduanera"],

  "Teoría de Comercio Internacional": ["Operaria y Practica Aduanera del Comercio Internacional"],
  "Costos y Precios de Importación y Exportación": ["Lógica Integral del Comercio Internacional"],
  "Calificación Arancelaria y Valoración Aduanera": ["Comercialización y Marketing Internacional"],

  "Operaria y Practica Aduanera del Comercio Internacional": ["Instrumentos Jurídicos del Comercio Internacional"],
  "Lógica Integral del Comercio Internacional": ["Medios de Pagos Internacionales, Financieros y Normativas Argentino-Mundial"],
  "Comercialización y Marketing Internacional": ["Comercio y Negociaciones Internacionales."],

  "Instrumentos Jurídicos del Comercio Internacional": ["Seminario de practica integral en Comercio Internacional"],
  "Medios de Pagos Internacionales, Financieros y Normativas Argentino-Mundial": ["Seminario de practica integral en Comercio Internacional"],
  "Comercio y Negociaciones Internacionales.": ["Seminario de practica integral en Comercio Internacional"],

  "Ingles Comercial I": ["Ingles Comercial II"],
  "Ingles Comercial II": ["Ingles Comercial Conversación"],
  "Ingles Comercial Conversación": ["Tesis Licenciatura Comercio Internacional"],
};

const aprobadas = new Set();

function crearMalla() {
  const contenedor = document.getElementById("malla");
  Object.keys(materias).forEach((nombre) => {
    const div = document.createElement("div");
    div.className = "materia";
    div.id = nombre;

    const titulo = document.createElement("h3");
    titulo.textContent = nombre;

    const boton = document.createElement("button");
    boton.textContent = "Aprobar";
    boton.onclick = () => aprobar(nombre);
    boton.disabled = true;

    div.appendChild(titulo);
    div.appendChild(boton);
    contenedor.appendChild(div);
  });
  desbloquearIniciales();
}

function desbloquearIniciales() {
  const iniciales = [
    "Lectura y escritura académica",
    "Textos de Economía y Administración",
    "Matemáticas para economía y administración",
    "Microeconomía",
    "Informática",
    "Economía Laboral Electiva",
    "Ingles I",
    "Seminario de practica integral en Comercio Internacional.",
    "Dinero, créditos y bancos Electivo"
  ];
  iniciales.forEach(nombre => document.querySelector(`#${CSS.escape(nombre)} button`).disabled = false);
}

function aprobar(nombre) {
  if (aprobadas.has(nombre)) return;
  aprobadas.add(nombre);

  const div = document.getElementById(nombre);
  div.classList.add("aprobada");
  div.querySelector("button").disabled = true;

  for (const desbloqueada of materias[nombre] || []) {
    const boton = document.querySelector(`#${CSS.escape(desbloqueada)} button`);
    if (boton) boton.disabled = false;
  }
}

window.onload = crearMalla;

