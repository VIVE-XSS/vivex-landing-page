function doPost(e) {
  try {
    // 1. Obtener parámetros de la solicitud
    var params = e.parameter;
    
    var nombre = params.nombre || params.name || "Usuario Anónimo";
    var email = params.email || "No especificado";
    var mensaje = params.mensaje || params.message || "Sin mensaje";
    var asunto = params.asunto || params.subject || ("Nueva consulta de " + nombre + " [VIVE-X]");
    var destino = params.para || "info@vive-x.net";
    
    // 2. Construir el cuerpo del correo
    var cuerpoHtml = "<div style='font-family: sans-serif; max-width: 600px; margin: 0 auto;'>" +
                     "<h2 style='color: #0ea5e9;'>Nuevo mensaje de contacto - VIVE-X</h2>" +
                     "<p><strong>Nombre:</strong> " + nombre + "</p>" +
                     "<p><strong>Email:</strong> " + email + "</p>" +
                     "<div style='background-color: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 20px;'>" +
                     "<p style='margin-top: 0;'><strong>Mensaje:</strong></p>" +
                     "<p>" + mensaje.replace(/\n/g, '<br>') + "</p>" +
                     "</div>" +
                     "<hr style='border: none; border-top: 1px solid #e2e8f0; margin-top: 30px;'/>" +
                     "<p style='color: #64748b; font-size: 12px;'>Este mensaje ha sido enviado desde el formulario de contacto vía Google Apps Script.</p>" +
                     "</div>";
                     
    var cuerpoTexto = "Nuevo mensaje de contacto - VIVE-X\n\n" +
                      "Nombre: " + nombre + "\n" +
                      "Email: " + email + "\n\n" +
                      "Mensaje:\n" + mensaje + "\n\n" +
                      "---\nEste mensaje ha sido enviado desde el formulario de contacto.";
    
    // 3. Enviar el correo usando GmailApp
    GmailApp.sendEmail(destino, asunto, cuerpoTexto, {
      replyTo: email,
      htmlBody: cuerpoHtml,
      name: "Contacto VIVE-X"
    });
    
    // 4. Devolver una respuesta exitosa en formato JSON (como espera el backend/frontend)
    var response = {
      success: true,
      message: "Correo enviado correctamente."
    };
    
    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Manejo de errores
    var errorResponse = {
      success: false,
      error: error.toString()
    };
    
    return ContentService.createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
