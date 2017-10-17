App.controller('GalleryController', function(Gallery) {
    console.log('GalleryController');

    var vm = this;

    vm.showAlert = function(event) {
        console.log('Clicked!');
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .title('Hi!!!')
            .textContent('You can say other things')
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            .targetEvent(event)
        );
    };

    vm.getComments = function () {
        
    };


});