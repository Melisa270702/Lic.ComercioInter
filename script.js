// Lista completa de materias con sus correlatividades
const materias = [
  { id: 'lectura', nombre: 'Lectura y escritura académica', requisitos: [] },
  { id: 'textos', nombre: 'Textos de Economía y Administración', requisitos: [] },

  { id: 'matematica_intro', nombre: 'Matemáticas para economía y administración', requisitos: [] },
  { id: 'macro', nombre: 'Macroeconomía', requisitos: ['lectura', 'textos'] },
  { id: 'micro', nombre: 'Microeconomía', requisitos: ['lectura', 'textos'] },

  { id: 'intro_economia', nombre: 'Introducción a la Economía', requisitos: ['matematica_intro'] },
  { id: 'estructura', nombre: 'Estructura Económica Argentina y Mundial', requisitos: ['macro'] },
  { id: 'intro_comercio', nombre: 'Introducción al Comercio Internacional', requisitos: ['micro'] },

  { id: 'estadistica', nombre: 'Estadística básica para Economía y Administración', requisitos: ['intro_economia'] },
  { id: 'algebra', nombre: 'Álgebra', requisitos: ['estructura'] },
  { id: 'analisis_mate', nombre: 'Análisis Matemático aplicado a la Economía', requisitos: ['intro_comercio'] },

  { id: 'historia_arg', nombre: 'Historia Argentina', requisitos: ['estadistica'] },
  { id: 'historia_social', nombre: 'Historia Social General', requisitos: ['algebra'] },
  { id: 'pensamiento_social', nombre: 'Introducción al Pensamiento Social', requisitos: ['analisis_mate'] },

  { id: 'pensamiento_economico', nombre: 'Historia del Pensamiento Económico', requisitos: ['historia_arg'] },
  { id: 'integracion_economica', nombre: 'Integración Económica', requisitos: ['historia_social'] },
  { id: 'relaciones_eco', nombre: 'Relaciones Económicas Internacionales', requisitos: ['pensamiento_social'] },

  { id: 'teoria_comercio', nombre: 'Teoría de Comercio Internacional', requisitos: ['pensamiento_economico'] },
  { id: 'economia_laboral', nombre: 'Economía Laboral Electiva', requisitos: [] },
  { id: 'ingles1', nombre: 'Inglés I', requisitos: [] },

  { id: 'informatica', nombre: 'Informática', requisitos: [] },
  { id: 'costos_precios', nombre: 'Costos y Precios de Importación y Exportación', requisitos: ['integracion_economica'] },
  { id: 'valoracion', nombre: 'Calificación Arancelaria y Valoración Aduanera', requisitos: ['relaciones_eco'] },

  { id: 'operaria', nombre: 'Operaria y Práctica Aduanera del Comercio Internacional', requisitos: ['teoria_comercio'] },
  { id: 'logica', nombre: 'Lógica Integral del Comercio Internacional', requisitos: ['costos_precios'] },
  { id: 'marketing', nombre: 'Comercialización y Marketing Internacional', requisitos: ['valoracion'] },

  { id: 'juridicos', nombre: 'Instrumentos Jurídicos del Comercio Internacional', requisitos: ['operaria'] },
  { id: 'medios_pago', nombre: 'Medios de Pagos Internacionales, Financieros y Normativas Argentino-Mundial', requisitos: ['logica'] },
  { id: 'negociaciones', nombre: 'Comercio y Negociaciones Internacionales', requisitos: ['marketing'] },

  { id: 'seminario', nombre: 'Seminario de práctica integral en Comercio Internacional', requisitos: ['juridicos', 'medios_pago', 'negociaciones'] },
  { id: 'dinero_credito', nombre: 'Dinero, créditos y bancos Electivo', requisitos: ['economia_laboral'] },
  { id: 'ingles_com1', nombre: 'Inglés Comercial I', requisitos: ['ingles1'] },

  { id: 'ingles_com2', nombre: 'Inglés Comercial II', requisitos: ['ingles_com1'] },
  { id: 'ingles_conv', nombre: 'Inglés Comercial Conversación', requisitos: ['ingles_com2'] },
  { id: 'tesis', nombre: 'Tesis Licenciatura Comercio Internacional', requisitos: ['ingles_conv'] },
];

const mallaContainer = document.getElementById('malla-container');

function crearMateria(materia) {
  const div = document.createElement('div');
  div.className = 'materia';
  div.id = materia.id;

  const titulo = document.createElement('h3');
  titulo.textContent = materia.nombre;

  const boton = document.createElement('button');
  boton.textContent = 'Aprobar';
  boton.disabled = materia.requisitos.length > 0;
  boton.onclick = () => aprobarMateria(materia.id);

  div.appendChild(titulo);
  div.appendChild(boton);
  mallaContainer.appendChild(div);
}

function aprobarMateria(id) {
  const div = document.getElementById(id);
  div.classList.add('aprobada');
  const boton = div.querySelector('button');
  boton.disabled = true;

  materias.forEach(m => {
    if (m.requisitos.includes(id)) {
      const todosAprobados = m.requisitos.every(req => {
        return document.getElementById(req).classList.contains('aprobada');
      });
      if (todosAprobados) {
        const botonHabilitar = document.getElementById(m.id).querySelector('button');
        botonHabilitar.disabled = false;
      }
    }
  });
}

materias.forEach(crearMateria);
