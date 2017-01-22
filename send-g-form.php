<?php

error_reporting(E_ERROR |  E_PARSE);
if (!$_POST) die('приветик'); // если глобальный массив POST не передан значит приветик
// иначе продолжаем

$response = array(); // сюда будем писать то что будем возвращать скрипту

$field1 = isset($_POST['field1']) ? $_POST['field1'] : false; // сунем каждое поле в отдельную переменную
$field2 = isset($_POST['field2']) ? $_POST['field2'] : false;
$field3 = isset($_POST['field3']) ? $_POST['field3'] : false;
$field4 = isset($_POST['field4']) ? $_POST['field4'] : false;

// сюда можно положить всякие проверки полей и капчу например
if (!$field1) { // в моем случае надо чтобы первые 2 поля не были пустыми
    $response['ok'] = 0; // пишем что все плохо
    $response['message'] = '<p class="error">Введите имя</p>'; // пишем ответ
    die(json_encode($response)); //выводим массив в json формате и умираем
}

if  (!$field2) { // в моем случае надо чтобы первые 2 поля не были пустыми
    $response['ok'] = 0; // пишем что все плохо
    $response['message'] = '<p class="error">Введите фамилию</p>'; // пишем ответ
    die(json_encode($response)); //выводим массив в json формате и умираем
}

if  (!$field3) { // в моем случае надо чтобы первые 2 поля не были пустыми
    $response['ok'] = 0; // пишем что все плохо
    $response['message'] = '<p class="error">Введите номер телефона</p>'; // пишем ответ
    die(json_encode($response)); //выводим массив в json формате и умираем
}

if (!$field4) { // в моем случае надо чтобы первые 2 поля не были пустыми
    $response['ok'] = 0; // пишем что все плохо
    $response['message'] = '<p class="error">Введите e-mail</p>'; // пишем ответ
    die(json_encode($response)); //выводим массив в json формате и умираем
}


// теперь подготовим данные для отправки в гугл форму
$url = 'https://docs.google.com/forms/d/e/1FAIpQLScB8EkRQ5FniGBHgnmC1A6Rlz5Q2QV6WMh2fecqtJikzkuAGg/formResponse'; // куда слать, это атрибут action у гугл формы 
$data = array(); // массив для отправки в гугл форм
$data['entry.305381128'] = $field1; // указываем соответствия полей, ключи массива это нэймы оригинальных полей гуглформы
$data['entry.1874678888'] = $field2;
$data['entry.322509099'] = $field3;
$data['entry.758942369'] = $field4;


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
    $response['ok'] = 0; // пишем что все плохо
    $response['message'] = '<p class="error">Что-то пошло не так, попробуйте отправить позже.</p>'; // пишем ответ
    die(json_encode($response)); //выводим массив в json формате и умираем
}

$response['ok'] = 1; // если дошло до сюда, значит все ок
$response['message'] = '<p class="">Все ок, отправилось.</p>'; // пишем ответ
die(json_encode($response)); //выводим массив в json формате и умираем

?>