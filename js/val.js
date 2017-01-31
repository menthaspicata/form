 $(document).ready(function(){

     // Устанавливаем обработчик потери фокуса для всех полей ввода текста
     $('input#name, input#surname, input#phone, input#email').unbind().blur( function(){

        // Для удобства записываем обращения к атрибуту и значению каждого поля в переменные
         var id = $(this).attr('id');
         var val = $(this).val();
         console.log($(this));

       // После того, как поле потеряло фокус, перебираем значения id, совпадающие с id данного поля
       switch(id)
       {
             // Проверка поля "Имя"
                 case 'name':
                    var rv_name = /^[a-zA-Zа-яА-Я]+$/; // используем регулярное выражение

                    // Eсли длина имени больше 2ух символов, оно не пустое и удовлетворяет рег. выражению,
                    // то добавляем этому полю класс .not_error,
                    // и ниже в контейнер для ошибок выводим слово "Принято", т.е. валидация для этого поля пройдена успешно

                    if(val.length > 2 && val != '' && rv_name.test(val))
                    {
                       $(this).addClass('not_error');
                       $(this).prev('.error-box').text('Принято')
                                                 .css('color','green')
                                                 .animate({'paddingLeft':'10px'},400)
                                                 .animate({'paddingLeft':'5px'},400);
                        $(this).css({'backgroundColor' : '#A0FF9B'});

                    }

                  // Иначе, мы удаляем класс not-error, и заменяем его на класс error, говоря о том что поле содержит ошибку валидации,
                  // и ниже в наш контейнер выводим сообщение об ошибке и параметры для верной валидации

                    else
                    {
                       $(this).removeClass('not_error').addClass('error');
                       $(this).prev('.error-box').html('Введите имя')
                                                  .css('color','red')
                                                  .animate({'paddingLeft':'10px'},400)
                                                  .animate({'paddingLeft':'5px'},400);
                      $(this).css({'backgroundColor' : '#FFBEB9'});
                    }
                break;

            //Проверка фамилии
            case 'surname':
                var rv_surname = /^[a-zA-Zа-яА-Я]+$/; // используем регулярное выражение

                // Eсли длина фамилии больше 2 символов, оно не пустое и удовлетворяет рег. выражению,
                // то добавляем этому полю класс .not_error,
                // и ниже в контейнер для ошибок выводим слово " Принято", т.е. валидация для этого поля пройдена успешно

                if(val.length > 2 && val != '' && rv_surname.test(val))
                {
                   $(this).addClass('not_error');
                   $(this).prev('.error-box').text('Принято')
                                             .css('color','green')
                                             .animate({'paddingLeft':'10px'},400)
                                             .animate({'paddingLeft':'5px'},400);
                    $(this).css({'backgroundColor' : '#A0FF9B'});
                }

              // Иначе, мы удаляем класс not-error и заменяем его на класс error, говоря о том что поле содержит ошибку валидации,
              // и ниже в наш контейнер выводим сообщение об ошибке и параметры для верной валидации

                else
                {
                   $(this).removeClass('not_error').addClass('error');
                   $(this).prev('.error-box').html('Введите фамилию')
                                              .css('color','red')
                                              .animate({'paddingLeft':'10px'},400)
                                              .animate({'paddingLeft':'5px'},400);
                  $(this).css({'backgroundColor' : '#FFBEB9'});
                }
            break;
          
          // Проверка поля "Телефон"
           case 'phone':
               var rv_phone = /^\d[\d\(\)\ -]{4,14}\d$/;
                if(val != '' && rv_phone.test(val))
               {
                  $(this).addClass('not_error');
                  $(this).prev('.error-box').text('Принято')
                                            .css('color','green')
                                            .animate({'paddingLeft':'10px'},400)
                                            .animate({'paddingLeft':'5px'},400);
                  $(this).css({'backgroundColor' : '#A0FF9B'});

               }
               else
               {
                  $(this).removeClass('not_error').addClass('error');
                  $(this).prev('.error-box').html('Введите номер телефона')
                                             .css('color','red')
                                             .animate({'paddingLeft':'10px'},400)
                                             .animate({'paddingLeft':'5px'},400);
                  $(this).css({'backgroundColor' : '#FFBEB9'});
               }
           break;

           // Проверка email
           case 'email':
                var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
               if(val != '' && rv_email.test(val))
               {
                  $(this).addClass('not_error');
                  $(this).prev('.error-box').text('Принято')
                                            .css('color','green')
                                            .animate({'paddingLeft':'10px'},400)
                                            .animate({'paddingLeft':'5px'},400);
                  $(this).css({'backgroundColor' : '#A0FF9B'});

               }
               else
               {
                  $(this).removeClass('not_error').addClass('error');
                  $(this).prev('.error-box').html('Введите e-mail')
                                             .css('color','red')
                                             .animate({'paddingLeft':'10px'},400)
                                             .animate({'paddingLeft':'5px'},400);
                  $(this).css({'backgroundColor' : '#FFBEB9'});
               }
           break;

       } // end switch(...)

     }); // end blur()

     // Теперь отправим наше письмо с помощью AJAX
     $('form#gform-jquery-php').submit(function(e){
         // выполняем наш Ajax сценарий и отправляем письмо адресату

              e.preventDefault(); // выключаем стандартное действие отправки
              var form = $(this); // запомним форму в переменной
              var data = form.serialize(); // сериализуем данные формы в строку для отправки

          $.ajax({ // инициализируем аякс
            url: "send-g-form.php", // путь до нашего php обработчика
            data: data, // данные  которые мы сериализовали
            type: "POST", // постом
            dataType: "json", // ответ ждем в формате json
            beforeSend: function(){ // перед отправкой
              $('form#gform-jquery-php :input').attr('disabled','disabled');
            },
            success: function(data) { // соединение прошло и получен ответ от обработчика
              $('#response').html(data.message); // покажем сообщение от сервера
              $('form#gform-jquery-php :input').removeAttr('disabled');
              $('form#gform-jquery-php :text').val('').removeClass().prev('.error-box').text('');
            },
            error: function(xhr, ajaxOptions, thrownError) { // если ошибка
              console.log(arguments); // убрать после дебага

            }, 
            complete: function() { // в конце любого исхода
              form.find('button').prop('disabled', false); // снова включим кнопку
            }
          });
   }); // end submit()
});
  