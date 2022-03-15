# Проект Яндекс Практикума "Место"

## Описание

Это репозиторий, в котором представлена моя четвертая практическая проектная работа на курсе [Яндекс Практикума по веб-разработке](https://practicum.yandex.ru/web/).
## Используемые технологии

Чтобы сделать макет «резиновым», я использовала `@media`, таким образом, сайт адаптируется под основные размеры экранов: 1280px, 1024px, 768px, 320px. Так же, на сайте есть всплывающие окна попап, которые открываются и закрываются по клику. Поля формы заполняются теми значениями, которые имеются на странице. Я использовала JS, (в частности, addEventListener), который редактирует поля формы, меняя значения на странице сайта. Все изображения на сайте загружаются через JavaScript из готового массива. Так же пользователь может самостоятельно добавлять изображения на сайт, удалять их по кнопке "trash bin". Реализованы динамичные кнопки лайка. Использовано свойство visibility, что обеспечивает плавное открытие и закрытие попапа.
Реализовано закрытие попапа по клавише «escape» и на любую другую область страницы.
Написана универсальная валидация всех форм.
Код реорганизован по принципам ООП и теперь состоит из функционального программирования и объектного. Созданы классы Card и FormValidator, файлы  js  импортированы друг в друга и подключены как модуль.
## Страница на гитхабе

Вы можете посмотреть, как выглядит этот веб-сайт, перейдя по [ссылке](https://vybegalo.github.io/mesto/)



# Project Yandex Praktikum "Место"

## Description

This is a repository which contains my fourth practical project work at [Yandex Praktikum "Frontend Developer"](https://practicum.yandex.ru/web/) course.
## Technologies used

In order to make the layout "rubber" I used `@media` queries and put down a set of break points for different screen widths: 1280px, 1024px, 768px, 320px. The site has a popup which opens and closes on click. The form fields are filled with the values that are on the page. I used JS that edit form fields and change values on a website page. All images on the site are loaded through a ready-made array. Also, a user can add images to the site, delete them using the "trash bin" button. Implemented dynamic like buttons. I use visibility property, which ensures smooth opening and closing of the popup.
The code reorganized by OOP and now consists of functional programming and object programming. The Card and FormValidator classes are created, the js files are imported into each other and connected as a module.
## Github pages

You can check out how this web site looks like following this [link](https://vybegalo.github.io/mesto/)

## In the plans

Closing the popup with the escape key and another place on the page.


