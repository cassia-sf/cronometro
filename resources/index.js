(function () {
  'use strict';

  angular
    .module('app', [])
    .controller('controller', function ($scope, $interval) {

      // Estado do cronômetro
      var running = false;

      // Controle de incremento
      var lastTimestamp;

      // Handler do $interval
      var intervalHandler;

      // Contagem total de milisegundos do cronômetro
      var milliseconds = 0;

      // Bind dos valores do cronômetro
      $scope.minutos = '00';
      $scope.segundos = '00';
      $scope.startStopBtnText = 'Start';

      // Função chamada ao clicar no botão "Start / Stop"
      $scope.startStopAction = function () {
        running = !running;

        if(running){
          lastTimestamp = moment();
          intervalHandler = $interval(updateTime, 200);
          $scope.startStopBtnText = 'Stop';
        }else{
          $interval.cancel(intervalHandler);
          $scope.startStopBtnText = 'Start';
          updateTime();
        }
      }

      // Função chamada ao clicar no botão "Reset"
      $scope.resetAction = function () {
        milliseconds = 0;
        updateDisplay();
      }

      // Atualiza valor interno do cronômetro
      function updateTime() {
        var now = moment();
        milliseconds += now.diff(lastTimestamp);
        lastTimestamp = now;

        updateDisplay();
      }

      // Atualiza display do cronômetro
      function updateDisplay() {

        var seconds = String(moment.duration(milliseconds).seconds());
        var minutes = String(moment.duration(milliseconds).minutes());

        $scope.segundos = seconds.length == 1? '0'+seconds : seconds;
        $scope.minutos  = minutes.length == 1? '0'+minutes : minutes;
      }

    });
})();
