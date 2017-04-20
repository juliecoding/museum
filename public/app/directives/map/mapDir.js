angular.module('app')
.directive('mapDir', function(){
    return{
        restrict: 'E',
        template: '<div></div>',
        link: function(scope, element, attrs) {
            var myLatLng = new google.maps.LatLng(42.3386, -71.0941);
            var mapOptions = {
                center: myLatLng,
                zoom: 14,
                mapTypeId: 'roadmap'
            };
            var map = new google.maps.Map(document.getElementById(attrs.id), mapOptions);

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: 'Museum of Eastern Art'
            });
            marker.setMap(map);
        }
    };
});

//
//             var map = new google.maps.Map(document.getElementById(attrs.id), mapOptions);
//
//             var marker = new google.maps.Marker({
//                 position: myLatLng,
//                 map: map,
//                 title: 'You Are Here'
//             });
//             marker.setMap(map);
//         }
//     };
// });
