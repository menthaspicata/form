<?php

error_reporting(E_ERROR |  E_PARSE);
if (!$_POST) die('error'); // если глобальный массив POST не передан значит error
// иначе продолжаем

$response = array(); // сюда будем писать то что будем возвращать скрипту


$name = isset($_POST['name']) ? $_POST['name'] : false; 
$surname = isset($_POST['surname']) ? $_POST['surname'] : false;
$phone = isset($_POST['phone']) ? $_POST['phone'] : false;
$email = isset($_POST['email']) ? $_POST['email'] : false;

// проверки полей
if (!$name) { 
    $response['ok'] = 0;
    $response['message'] = '<p class="error">Введите имя</p>'; 
    die(json_encode($response)); //выводим массив в json формате и умираем
}

if  (!$surname) { 
    $response['ok'] = 0; 
    $response['message'] = '<p class="error">Введите фамилию</p>'; // пишем ответ
    die(json_encode($response)); //выводим массив в json формате и умираем
}

if  (!$phone) { 
    $response['ok'] = 0; 
    $response['message'] = '<p class="error">Введите номер телефона</p>'; // пишем ответ
    die(json_encode($response)); //выводим массив в json формате и умираем
}

if (!$email) { 
    $response['ok'] = 0; 
    $response['message'] = '<p class="error">Введите e-mail</p>'; // пишем ответ
    die(json_encode($response)); //выводим массив в json формате и умираем
}


// теперь подготовим данные для отправки в гугл форму
$url = 'https://docs.google.com/forms/d/e/1FAIpQLScB8EkRQ5FniGBHgnmC1A6Rlz5Q2QV6WMh2fecqtJikzkuAGg/formResponse';
$data = array(); // массив для отправки в гугл форм
$data['entry.305381128'] = $name; // указываем соответствия полей, ключи массива это нэймы оригинальных полей гуглформы
$data['entry.1874678888'] = $surname;
$data['entry.322509099'] = $phone;
$data['entry.758942369'] = $email;


$data = http_build_query($data); // теперь сериализуем массив данных в строку для отправки


$options = array( // задаем параметры запроса
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => $data,
    ),
);
$context  = stream_context_create($options); // создаем контекст отправки
$result = file_get_contents($url, false, $context); // отправляем

if (!$result) { // если что-то не так
    $response['ok'] = 0; 
    $response['message'] = '<p class="error">Что-то пошло не так, попробуйте отправить позже.</p>'; // пишем ответ
    die(json_encode($response)); //выводим массив в json формате и умираем
}

$response['ok'] = 1; // если дошло до сюда, значит все ок
$response['message'] = '<p class="">Даные отправлены</p>'; // пишем ответ
die(json_encode($response)); //выводим массив в json формате и умираем

?>