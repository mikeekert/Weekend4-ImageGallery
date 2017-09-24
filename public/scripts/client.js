var App = angular.module('App', ['ngAnimate']);

App.controller('ImageController', function ($http) {
    var vm = this;
    vm.toggles = [{ state: true }, { state: false }, { state: true }];
    vm.imgArr = [{
            url: '../images/min/Image1-min.jpg',
            name: 'image1',
            likes: 0
        },
        {
            url: '../images/min/Image2-min.jpg',
            name: 'image2',
            likes: 0
            
        },
        {
            url: '../images/min/Image3-min.jpg',
            name: 'image3',
            likes: 0
            
        },
        {
            url: '../images/min/Image4-min.jpg',
            name: 'image4',
            likes: 0
            
        },
        {
            url: '../images/min/Image5-min.jpg',
            name: 'image5',
            likes: 0
            
        },
        {
            url: '../images/min/Image6-min.jpg',
            name: 'image6',
            likes: 0
            
        }
    ];
    vm.addLike = function(image) {
        image.likes += 1;
        $http({
            method: 'PUT',
            url: '/images'
        }).then(function () {
            vm.getVisits();
        
        console.log(image.likes);
        console.log(image);
        });
    };
});