# EMX Web Studio — V2 preparada para dominio propio

**Dominio principal previsto:** https://emxwebstudio.com.mx/

Versión basada directamente en la **V2 original**. Conserva el sitio comercial, las tres demostraciones, los estilos y **el JavaScript de FormSubmit que ya funciona**.

## Lo actualizado

- Canonical, Open Graph, Twitter Card y URL en datos estructurados para el dominio comprado.
- Imagen social 1200×630 en `assets/og-emx-web-studio.png`.
- `robots.txt` con referencia a `sitemap.xml` e índice principal únicamente (las demos están marcadas `noindex`).
- Encabezados básicos compatibles con Cloudflare Pages en `_headers`.
- Se retiró del cuadro de privacidad el texto de trabajo **“Nota de lanzamiento”**. **No significa que el aviso sea legalmente completo.**
- Todos los enlaces relativos entre las demos y la portada se conservan.

## Lo que NO se cambió

- `assets/main.js`: **exactamente el mismo archivo de la V2**, sin sustituir el envío ya activado en FormSubmit.
- Teléfono WhatsApp +52 771 354 5923 y correo emxwebstudio@gmail.com.
- Diseño, precios, demos y contenido comercial.
- El aviso de privacidad V2 (salvo retirada de la nota administrativa): sigue siendo preliminar y necesita revisar/completar la información del responsable, incluida la dirección correspondiente, antes de promocionar el sitio.

## Publicación sin pagar hosting — Cloudflare Pages

1. Descomprime el ZIP. En tu repositorio de GitHub **sube los archivos y carpetas del contenido**, no la carpeta que los contiene. El archivo `index.html` debe quedar en la raíz.
2. En https://dash.cloudflare.com abre **Workers & Pages**, crea un proyecto Pages y vincula el repositorio GitHub existente.
3. Configura la rama de producción `main`, comando de compilación **`exit 0`** (o en blanco si ofrece esa opción), y directorio de salida **`.`** (punto, raíz del repositorio). No necesitas Node, npm ni instalar paquetes.
4. Comprueba el sitio en su dirección temporal `*.pages.dev`, incluida la navegación de las tres demos y el formulario.
5. En Cloudflare añade el dominio `emxwebstudio.com.mx` como sitio/zona DNS si todavía no existe. Revisa antes los registros existentes, especialmente los **MX/TXT** si más adelante utilizas correo con el dominio.
6. En Hostinger cambia los **nameservers** por los dos que te proporcione **tu propia cuenta Cloudflare**. No inventes ni utilices nameservers de ejemplo.
7. Dentro de tu proyecto Pages ve a **Custom domains** y añade `emxwebstudio.com.mx`. Deja que Cloudflare configure el registro y expida el certificado HTTPS.
8. Si quieres habilitar `www.emxwebstudio.com.mx`, añádelo también como dominio en Pages y configura una **Redirect Rule 301** de `https://www.emxwebstudio.com.mx/*` hacia `https://emxwebstudio.com.mx/${1}` con el mecanismo de reglas de Cloudflare; verifica la sintaxis en su interfaz. El sitio y el sitemap priorizan la versión **sin www**.
9. Ya con el dominio funcionando, abre `https://emxwebstudio.com.mx/robots.txt`, `https://emxwebstudio.com.mx/sitemap.xml`, la imagen social y las demos para comprobar que carguen.
10. Comprueba que FormSubmit sigue enviando correos **desde el nuevo dominio** y que el WhatsApp se abre correctamente. No cambies `main.js` si sigue funcionando.
11. En Google Search Console verifica el dominio y envía `https://emxwebstudio.com.mx/sitemap.xml`.

### Atención: los cambios de DNS pueden afectar correo

Si Hostinger ya tiene registros MX, SPF, DKIM, DMARC, redirecciones de correo u otros servicios asociados al dominio, cópialos y comprueba que existan en Cloudflare antes de cambiar nameservers. El Gmail actual (`emxwebstudio@gmail.com`) no depende de esos registros, pero un futuro correo @emxwebstudio.com.mx sí.

### Pendientes importantes antes de promocionar

- Completar y revisar legalmente el aviso de privacidad (incluido el domicilio válido del responsable) y los términos comerciales aplicables. Esta actualización **no pretende certificar cumplimiento jurídico**.
- Verificar cómo se deben mostrar los precios e impuestos al público mexicano.
- Testear envíos reales FormSubmit y la experiencia móvil ya en el dominio definitivo.

## Estructura

- `index.html`: sitio principal.
- `demos/`: Clínica Nova, Forma Estudio y Nexo Operaciones (noindex).
- `assets/`: CSS, JS, SVG y preview social.
- `robots.txt`, `sitemap.xml`: visibilidad en buscadores.
- `_headers`: seguridad básica de Cloudflare Pages.
- `.nojekyll`: compatibilidad con GitHub Pages como origen temporal.

**No subas este ZIP como un único archivo a GitHub: sube el contenido extraído.**
