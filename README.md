# EMX Web Studio — sitio web V2.0 para GitHub Pages

Proyecto completo de **EMX Web Studio · by Edwin Márquez**. Diseño y desarrollo web para negocios en Pachuca, Hidalgo, y atención remota en México.

**Tecnología:** HTML5, CSS3 y JavaScript puro. **No utiliza npm, frameworks, bases de datos ni servidores propios** para funcionar. Está preparado para publicarse desde un repositorio de GitHub Pages.

## Estructura

```text
EMX_Web_Studio_GitHub_Pages/
├── .nojekyll
├── index.html                     ← Página principal
├── robots.txt
├── README.md
├── INSTRUCCIONES_GITHUB_PAGES.txt
├── assets/
│   ├── styles.css                 ← Estilos del sitio principal
│   ├── main.js                    ← Menú, WhatsApp, formulario y privacidad
│   ├── demos.css                  ← Estilos de las tres demostraciones
│   ├── demos.js                   ← Interacciones de las demostraciones
│   ├── favicon.svg
│   ├── clinic-space.svg
│   ├── clinic-abstract.svg
│   ├── architecture-scene.svg
│   └── architecture-interior.svg
└── demos/
    ├── clinica-nova.html         ← Demo salud
    ├── forma-estudio.html         ← Demo arquitectura + detalle de proyectos
    └── nexo-operaciones.html      ← Demo tecnología + dashboard interactivo
```

Las imágenes del portafolio son **ilustraciones SVG originales incluidas en el paquete**, por lo que no dependen de servidores de fotografías ni servicios de pago. Las fuentes Manrope e Inter se solicitan a Google Fonts; si falla la conexión se usan tipografías de respaldo.

## Cómo publicar en GitHub Pages

1. Entra a https://github.com/ e inicia sesión.
2. Pulsa **New repository**.
3. Nombre sugerido: `emx-web-studio`. Crea el repositorio como **Public** si utilizas GitHub Free para Pages.
4. Extrae el archivo ZIP. Abre la carpeta `EMX_Web_Studio_GitHub_Pages`.
5. En el repositorio, selecciona **Add file → Upload files** y arrastra **el contenido de la carpeta**, no la carpeta contenedora: `index.html`, `.nojekyll`, `robots.txt`, las carpetas `assets` y `demos`, etc.
6. Confirma los archivos con **Commit changes**.
7. Abre **Settings → Pages → Build and deployment**. En **Source** selecciona **Deploy from a branch**, la rama **main** y la carpeta **/(root)**. Guarda.
8. GitHub Pages ofrecerá una dirección como `https://TU-USUARIO.github.io/emx-web-studio/`. Revisa en **Settings → Pages → Visit site** una vez finalizado el despliegue.
9. Prueba en móvil los enlaces, tres demos, menú y WhatsApp, y confirma el correo del formulario según la siguiente sección.

**Muy importante:** GitHub Pages busca `index.html` en la raíz de la carpeta de publicación. Si por error subes una carpeta extra que contiene el `index.html`, verás un error 404. GitHub Pages es público; nunca subas contraseñas ni credenciales privadas al repositorio.

## Formulario de contacto — ACTIVACIÓN OBLIGATORIA

- Correo receptor: `emxwebstudio@gmail.com`.
- Endpoint: `https://formsubmit.co/ajax/emxwebstudio@gmail.com` (vía `assets/main.js`).
- Campos: nombre, negocio, email, WhatsApp, servicio, mensaje y consentimiento de privacidad.
- El formulario envía la solicitud con HTTPS al proveedor externo FormSubmit mediante JavaScript. Contiene validación y campo antispam oculto.

**IMPORTANTE:** El formulario está integrado, pero **NO** se ha realizado una prueba real de entrega ni se ha activado el receptor en FormSubmit desde este entorno. No se garantiza recepción de mensajes hasta verificarla.

Para habilitarlo:

1. Publica el sitio en GitHub Pages.
2. Envía **una solicitud de prueba** desde el formulario usando datos ficticios y tu correo propio como remitente.
3. Entra a `emxwebstudio@gmail.com`, incluyendo **Spam**, y busca el mensaje de activación de FormSubmit.
4. Confirma el enlace de activación desde Gmail (no compartas públicamente ese enlace).
5. Envía una **segunda solicitud de prueba** y confirma que llegue el mensaje con todos los datos a Gmail.
6. Prueba el formulario en un celular y revisa los botones de WhatsApp.

Si falla la recepción, el botón de WhatsApp permite contactar directamente al número **+52 771 354 5923**. Una respuesta de envío aceptado por FormSubmit **no es por sí sola** una confirmación de que recibiste el correo.

Más información del proveedor: https://formsubmit.co/documentation y https://formsubmit.co/ajax-documentation.

## Privacidad

El aviso de privacidad del sitio principal está disponible mediante un diálogo desde el formulario y el pie de página. Es un **borrador** y debe revisarse legalmente antes de empezar a captar datos de usuarios reales, en particular el domicilio del responsable, los detalles de transferencias y el ejercicio de derechos que corresponda en México. Los datos del formulario se transmiten a un proveedor externo.

## Adaptaciones futuras

- Si se contrata dominio, configurarlo en GitHub Pages y agregar `CNAME` de acuerdo con la documentación oficial; luego añadir URL canónica y sitemap real.
- Cambiar en cualquier momento las tarifas, alcances y contenidos desde `index.html`.
- Los textos de Clínica Nova, Forma Estudio y Nexo Operaciones son **demostrativos y ficticios**. Las demos tienen `noindex`, así no compiten en buscadores como negocios reales.
- El dashboard Nexo no consulta bases de datos: genera indicadores y gráficas a partir de registros simulados localmente.
- El botón de reserva de Clínica Nova es explícitamente una demostración; no procesa reservas reales.
- Los detalles del portafolio Forma abren una ventana con información conceptual; no representan obras construidas.
- Las imágenes SVG se pueden sustituir por fotografías propias o con licencia, si se desea evolucionar el portafolio.

## Verificación realizada

Se comprobó localmente con navegador automatizado que el sitio principal y las tres demos renderizan a 1440px y 390px sin desbordamientos horizontales ni errores de JavaScript; se probaron la navegación, las modales y los filtros del panel Nexo. **No equivale a una prueba en el servidor de GitHub Pages ni al envío real de correo.**
