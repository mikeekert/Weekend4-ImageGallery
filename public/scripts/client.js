var App = angular.module('App', ['ngAnimate']);

App.controller('ImageController', function ($http) {
    
    var vm = this;
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
        $http({
            method: 'POST',
            url: '/images',
            data: image
        }).then(function (resp) {
            vm.getLike(image);
        });
    };

    vm.getLike = function(image) {
        $http({
            method: 'GET',
            url: '/images/'+image.name
        }).then(function(resp){
            image.likes=resp.data[0].likes;
        });
    };

    vm.commentIn = function(commentInput) {
    commentInput.comment = commentInput.newComment;
    console.log(commentInput.comment);
        $http({
            method: 'POST',
            url: '/comments/',
            data: commentInput
        }).then(function(resp){
            commentInput.newComment = '';
            vm.getComment(commentInput);
            console.log('back from server with',resp);
            vm.commentsCount = resp.length; 
            commentInput.commentsShow = false;
        });
                
    };
    vm.getComment = function(image) {
        console.log('sending off comment get:',image.name);
        $http({
            method: 'GET',
            url: '/comments/'+image.name
        }).then(function(resp){
            console.log(resp);
            image.commentsCount = resp.data.length;
        });
    };

});