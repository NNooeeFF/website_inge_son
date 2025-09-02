<?php

// Vérifier si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Récupérer et nettoyer les données du formulaire
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // Vérifier que les données ne sont pas vides
    if (empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Veuillez remplir le formulaire correctement et réessayer.";
        exit;
    }

    // Paramètres de l'email
    $recipient = "mclynt.49@gmail.com"; // <-- REMPLACEZ PAR VOTRE ADRESSE
    $subject = "Nouveau message de contact de $name";
    
    // Contenu de l'email
    $email_content = "Nom: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // Entêtes de l'email
    $email_headers = "From: $name <$email>";

    // Envoyer l'email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo "Merci ! Votre message a bien été envoyé.";
    } else {
        http_response_code(500);
        echo "Oops! Une erreur est survenue et nous n'avons pas pu envoyer votre message.";
    }

} else {
    http_response_code(403);
    echo "Il y a un problème avec l'envoi du formulaire. Veuillez réessayer.";
}

?>