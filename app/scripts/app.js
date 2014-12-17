'use strict';

/**
 * @ngdoc overview
 * @name portalSiteApp
 * @description
 * # portalSiteApp
 *
 * Main module of the application.
 */
angular
  .module('portalSiteApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch', 
    'ui.utils',
    'toastr',
    'duScroll',
    'ngCookies',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider, toastrConfig) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/cadastro', {
        templateUrl: 'views/estudante/cadastro.html',
        controller: 'CadastroCtrl'
      })
      .when('/curriculo', {
        redirectTo: '/curriculo/identificacao'
      })
      .when('/curriculo/identificacao', {
        templateUrl: 'views/estudante/estudante.html',
        controller: 'EstudanteCtrl'
      })
      .when('/curriculo/formacao', {
        templateUrl: 'views/estudante/estudante_formacao.html',
        controller: 'EstudanteFormacaoCtrl'
      })
      .when('/curriculo/cursos', {
        templateUrl: 'views/estudante/estudante_cursos.html',
        controller: 'EstudanteCursosCtrl'
      })
      .when('/curriculo/idiomas', {
        templateUrl: 'views/estudante/estudante_idiomas.html',
        controller: 'EstudanteIdiomasCtrl'
      })
      .when('/curriculo/conhecimentos', {
        templateUrl: 'views/estudante/estudante_conhecimentos.html',
        controller: 'EstudanteConhecimentoCtrl'
      })
      .when('/curriculo/experiencias', {
        templateUrl: 'views/estudante/estudante_experiencias.html',
        controller: 'EstudanteExperienciasCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    //Configuração das notificações
    angular.extend(toastrConfig, {
      allowHtml: true,
      closeButton: true,
      closeHtml: '<button>&times;</button>',
      containerId: 'toast-container',
      extendedTimeOut: 5000,
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning'
      },
      messageClass: 'toast-message',
      positionClass: 'toast-top-right',
      tapToDismiss: true,
      timeOut: 5000,
      titleClass: 'toast-title',
      toastClass: 'toast'
    });
    
  }).run(function ($rootScope, $cookieStore, Estudante) {
    if ($cookieStore.get('estudante')) {
      $rootScope.estudante = $cookieStore.get('estudante');
      $rootScope.estudante = Estudante.get({id:$rootScope.estudante.id});
    }  
  });