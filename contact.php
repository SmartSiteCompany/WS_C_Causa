<?php
$first_name = htmlspecialchars($_POST['first_name']); 
$last_name = htmlspecialchars($_POST['last_name']);
$email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
$subject = htmlspecialchars($_POST['subject']);
$message = htmlspecialchars($_POST['message']);

$to = 'joseventolero82@gmail.com'; 
$from = 'eduac@template.com';

if ($first_name && $last_name && $email && $message) {
    $headers = "From: $from\r\n";
    $headers .= "Reply-To: $first_name <$email>\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=utf-8\r\n";

    $email_body = "<h2>Nuevo mensaje de contacto</h2>
                   <p><strong>Nombre:</strong> $first_name $last_name</p>
                   <p><strong>Email:</strong> $email</p>
                   <p><strong>Asunto:</strong> $subject</p>
                   <p><strong>Mensaje:</strong></p>
                   <p>$message</p>

    $res = mail($to, $subject, $email_body, $headers);

    if ($res) {
        echo '¡Tu mensaje ha sido enviado con éxito!';
    } else {
        echo 'Algo salió mal, por favor intenta de nuevo.';
    }
} else {
    echo 'Todos los campos son obligatorios.';
}
?>
