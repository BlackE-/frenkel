<?php
    /*
        CAPACITACION FORM
    */
    header('Content-Type: application/json');
    require_once('_email.php');

    const SUCCESS_CODE = 200;
    const SUCCESS_MESSAGE = 'Hemos guardado tu datos, te enviaremos lo antes posible la información del curso.';
    const ERROR_CODE = 400;
    const ERROR_MESSAGE = 'Por favor, llena todos los campos';

    include($_SERVER['DOCUMENT_ROOT']."/include/Mailchimp.php");   
    $MailChimp = new MailChimp('4bd57d973c0e84a37a1c20d730ad1e18-us1');    
    
    if (!isset($_POST['name']) || empty($_POST['name'])) {
      $error = ['message' => "Sin name"];
      $json = json_encode($error);
      http_response_code(ERROR_CODE);
      die($json);
    }
    if (!isset($_POST['email']) || empty($_POST['email'])) {
      $error = ['message' => "No email"];
      $json = json_encode($error);
      http_response_code(ERROR_CODE);
      die($json);
    }
    if (!isset($_POST['phone']) || empty($_POST['phone'])) {
      $error = ['message' => "No teléfono"];
      $json = json_encode($error);
      http_response_code(ERROR_CODE);
      die($json);
    }
    if (!isset($_POST['curse']) || empty($_POST['curse'])) {
      $error = ['message' => "No sucursal"];
      $json = json_encode($error);
      http_response_code(ERROR_CODE);
      die($json);
    }
    
    $name = $_POST['name'];
    $mail = $_POST['email'];
    $phone = $_POST['phone'];
    $curse = $_POST['curse'];
    $today = $_POST['today'];
    
    $result = $MailChimp->get('lists');
    $list_id = 'baf294fde4';
    $result = $MailChimp->post("lists/$list_id/members", [
				'email_address' => $mail,
			 	'status'        => 'subscribed',
			 	'merge_fields' => [
			 	    'FNAME' => $name,
			 	    'PHONE' => $phone,
			 	    'CURSE' => $curse,
            'MMERGE7' => 'capacitacionForm'
			 	]
			]);	

    
    $subject = 'frenkel.com.mx - Nuevo registro Capacitación';
    // // // Message
    $msg = '<html>
                <head>
                  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                    <title>Nuevo registro Capacitación</title>
                </head>
                <body style="background: rgba(150,150,150,0.1);padding: 50px 0;">
                    <div style="border:1px solid;padding:20px;max-width:360px;margin:0 auto;">
                        <table>
                            <tr>
                              <td colspan="2"><p>Información registro</p></td>
                            </tr>
                            <tr>
                              <td>Nombre:</td><td><p><b>'.$name.'</b></p></td>
                            </tr>
                            <tr>
                              <td>Correo:</td><td><p><b>'.$mail.'</b></p></td>
                            </tr>
                            <tr>
                              <td>Teléfono:</td><td><p><b>'.$phone.'</b></p></td>
                            </tr>
                            <tr>
                              <td>Curso:</td><td><p>'.$curse.'</p></td>
                            </tr>
                            <tr>
                              <td>Fecha:</td><td><p>'.$today.'</p></td>
                            </tr>
                        </table>
                    </div>
                </body>
            </html>';

    $to = 'elizabeth@studio-sub.com';
    $cc = 'elizabeth.ramescamilla@gmail.com';

    $email = new Email();
    $email->setTo($to);
    $email->setCC($cc);
    $email->setFrom('noreplay@frenkel.com.mx');
    $email->setFromName($name);
    $email->setSubject($subject);
    $email->setMessage($msg);
  
    $sendEmail = $email->sendEmail();
    $message = $email->error_message; //si es TRUE el mensaje es 'EMAIL ENVIADO'
    
    $returnValue['return'] = $sendEmail;
    $returnValue['message'] = $message;
    echo json_encode($returnValue);
    exit();
?>