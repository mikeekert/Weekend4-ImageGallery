var App = angular.module('App', ['ngAnimate','ngMaterial']);

App.controller('ImageController', function ($http, Gallery, $mdDialog) {
    
    var vm = this;
    vm.comArr = [];
    vm.imgArr = [{
            url: '../images/min/Image1-min.jpg',
            name: 'image1',
            likes: 0,
            desc: 'My two cats, Jinx and Minicat'
        },
        {
            url: '../images/min/Image2-min.jpg',
            name: 'image2',
            likes: 0,
            desc: 'Vikings Playoff game during -15 degree weather!'
            
        },
        {
            url: '../images/min/Image3-min.jpg',
            name: 'image3',
            likes: 0,
            desc: 'Metallica at US Bank Stadium'
            
        },
        {
            url: '../images/min/Image4-min.jpg',
            name: 'image4',
            likes: 0,
            desc: 'My other girlfriend'
            
        },
        {
            url: '../images/min/Image5-min.jpg',
            name: 'image5',
            likes: 0,
            desc: 'League of Legends World Championship, San Francisco 2016'
            
        },
        {
            url: '../images/min/Image6-min.jpg',
            name: 'image6',
            likes: 0,
            desc: 'Warped Tour 2014'
            
        }
    ];

    vm.addLike = function(image) {
        console.log('in add Like');
        $http({
            method: 'PUT',
            url: '/images',
            data: image
        }).then(function (resp) {
            image.likes = resp.data[0].likes;
            vm.getLike(image);
        });
    };

    vm.createLike = function (image) {
        console.log('in create Like');
        
        $http({
            method: 'POST',
            url: '/images',
            data: image
        }).then(function (resp) {
            vm.getLike(image);
        });
    };

    vm.getLike = function(image) {
        console.log('in Get Like');
        
        $http({
            method: 'GET',
            url: '/images/'+image.name
        }).then(function(resp){
            image.likes=resp.data[0].likes;
        });
    };

    vm.commentIn = function(image) {
        console.log('in comment intake');
        image.comment = image.newComment;
        $http({
            method: 'POST',
            url: '/comments/',
            data: image
        }).then(function(resp){
            image.newComment = '';
            vm.getComment(image);
            image.commentsCount = resp.length; 
            image.newcommentsShow = false;
        });      
    };

    vm.getComment = function(image) {
        console.log('in get comment');
        
        $http({
            method: 'GET',
            url: '/comments/'+image.name
        }).then(function(resp){
            image.commentsCount = resp.data.length;
            image.comArr = [];
            for (var i = 0; i < resp.data.length; i++) {
                image.comArr.push(resp.data[i].comment);
            }
            console.log('get comments array:', image);
        });
    };

    vm.getreFresh = function(image) {
        console.log('in refresh func');
        vm.commentIn(image);
    };

    vm.showAlert = function(event) {
        console.log('Clicked!');
        $mdDialog.show({
            controller: 'GalleryController',
            templateUrl: '/gallery',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose:true,
            fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
          });
    };
});