// Modules
angular.module(
    'table',
  [
    'angularUtils.directives.dirPagination',
    'table.controller',
    'table.services',
    'table.filters'
  ]
);

// Controller

angular.module('table.controller', [])
.controller('TableController', function($scope, $filter, ObjectService, Persistence) {
  
  const ITEM_PER_PAGE = 5;



    $scope.types = [
    { value: 'Beers', label:'Beers' },
    { value: 'Energy Drinks', label:'Energy Drinks' }
  ];
  
  $scope.data = [];
  $scope.head = [];

  //Data Type
  $scope.changeData = function () {
  	$scope.uri = $scope.type.value;
  	$scope.data = Persistence.list($scope.type.value);
  	$scope.head = ObjectService.getPropertiesObject($scope.data[0]);
  	$scope.propertiesHead = $scope.head;
  	$scope.filter = $filter('fieldsSelectFilter')( [ObjectService.cloneObject($scope.propertiesHead), ObjectService.cloneObject($scope.head)] );
  	$scope.selectFilter = '$';
  	$scope.changeFilterTo();
  };


    //Filter
  $scope.changeFilterTo = function() {
    $scope.search = ObjectService.createParamObject({}, $scope.selectFilter, '');
  };
  
  
  //Order by
  $scope.orderBy = { pedicate: 'title', reverse: false };
  $scope.order = function(predicate) {
    $scope.orderBy.reverse = !$scope.orderBy.reverse;
    $scope.orderBy.predicate = predicate;
  };
  
  //Pagination
  $scope.limit = { per_page: ITEM_PER_PAGE };
  
  //Default
  $scope.type = $scope.types[0];
  $scope.changeData();
});


// Filters
angular.module('table.filters', [])
  .filter('fieldsSelectFilter', function() {
    return function(data){
      return data;
    };
});

// Services
angular.module('table.services', [])
    .factory('ObjectService', function() {
        return {
            getPropertiesObject: function(object){
                var properties = [];
                for( var property in object){
                    properties.push(property);
                }
                return properties;
            },
            cloneObject: function (obj) {
                if (null === obj || "object" !== typeof obj) {
                    return obj;
                }
                var copy = obj.constructor();
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
                }
                return copy;
            },
            createParamObject: function(obj, parameter, value){
                return Object.defineProperty(obj, parameter, {value: value, writable : true, configurable: true, enumerable : true } );
            },
        }
    })

    .factory('Persistence', function(Call){
        return{
            add : function(type, data){
                var Obj = Call.get(type);
                Obj.push(data);
            },

            list : function(type){
                return Call.get(type);
            },

            update : function(type, index, data){
                var Obj = Call.get(type);
                return Obj[index] = data;
            },

            get : function(type, index){
                var Obj = Call.get(type);
                return Obj[index];
            },

            destroy : function(type, index){
                var Obj = Call.get(type);
                return Obj.splice(index, 1);
            }
        };
    })

    .factory('Call', function($injector){
        return {
            get : function(type){
                var service = $injector.get(type);
                return service.get();
            }
        };
    })

    .factory('Beers', function(){
        return{
            get : function(){
                var data = [
                    {
                    	"id": 1,
                      //  "images": "http://programming-challenge.arinium.fi/images/beers/original/light-beer.jpg",
                        "title": "Light Beer",
                        "description": "Kotimainen alkuperäinen kevytolut. Gluteeniton.",
                        "price-range": 30,
                        "preferability": 40
                    },
                    {
                        "id": 2,
                      //  "images": "http://programming-challenge.arinium.fi/images/beers/original/fosters.jpg",
                        "title": "Fosters",
                        "description": "Australialainen tuontiolut.",
                        "price-range": 20,
                        "preferability": 40
                    },
                    {
                        "id": 3,
                      //  "images": "http://programming-challenge.arinium.fi/images/beers/original/sandels.jpg",
                        "title": "Sandels",
                        "description": "Olvin pehmeä olut",
                        "price-range": 20,
                        "preferability": 40
                    },
                    {
                        "id": 4,
                      //  "images": "http://programming-challenge.arinium.fi/images/beers/original/miller.jpg",
                        "title": "Miller Genuine Draft",
                        "description": "Amerikkalaisen Millerin perusversio.",
                        "price-range": 30,
                        "preferability": 20
                    },
                    {
                        "id": 5,
                      //  "images": "http://programming-challenge.arinium.fi/images/beers/original/sininen-3.5.jpg",
                        "title": "Sininen",
                        "description": "Myös Lahden Sinisenä tunnettu olut. Myydään sekä miedompaa (3,5%) sekä vahvempaa (4,7%) versiota.",
                        "price-range": 20,
                        "preferability": 40
                    },
                    {
                        "id": 6,
                      //  "images": "http://programming-challenge.arinium.fi/images/beers/original/amigos.jpg",
                        "title": "Amigos",
                        "description": "Sitruunalla maustettu, hieman simamainen meksikolaistyyppinen raikas olut.",
                        "price-range": 30,
                        "preferability": 30
                    },
                    {
                        "id": 7,
                     //   "images": "http://programming-challenge.arinium.fi/images/beers/original/sol-can.jpg",
                        "title": "Sol",
                        "description": "Meksikolainen vuodesta 1899 valmistettu olut.",
                        "price-range": 30,
                        "preferability": 10
                    },
                    {
                        "id": 8,
                      //  "images": "http://programming-challenge.arinium.fi/images/beers/original/budvar.jpg",
                        "title": "Budéjovicky Budvar",
                        "description": "Tsekkiläinen alkuperäinen \"Budweiser\".",
                        "price-range": 40,
                        "preferability": 30
                    },
                    {
                        "id": 9,
                     //   "images": "http://programming-challenge.arinium.fi/images/beers/original/budweiser.jpg",
                        "title": "Budweiser",
                        "description": "Amerikkalainen \"oluiden kuningas\"",
                        "price-range": 30,
                        "preferability": 10
                    },
                    {
                        "id": 10,
                      //  "images": "http://programming-challenge.arinium.fi/images/beers/original/coors-light.jpg",
                        "title": "Coors Light",
                        "description": "Amerikkalaisen Coors-oluen kevytversio.",
                        "price-range": 30,
                        "preferability": 10
                    },
                    {
                        "id": 11,
                     //   "images": "http://programming-challenge.arinium.fi/images/beers/original/corona-extra.jpg",
                        "title": "Corona Extra",
                        "description": "Meksikolainen helpostijuotava olut.",
                        "price-range": 30,
                        "preferability": 20
                    },
                    {
                        "id": 12,
                     //   "images": "http://programming-challenge.arinium.fi/images/beers/original/dos-equis.jpg",
                        "title": "Dos Equis",
                        "description": "Vuodesta 1897 valmistettu meksikolainen olut.",
                        "price-range": 30,
                        "preferability": 20
                    },
                    {
                        "id": 13,
                     //   "images": "http://programming-challenge.arinium.fi/images/beers/original/kaiserdom-hefe-weis.jpg",
                        "title": "Kaiserdom Hefe-Weißbier",
                        "description": "Saksalainen hedelmäinen vehnäolut.",
                        "price-range": 40,
                        "preferability": 20
                    }
                ];
                return data;
            }

        }
    })

    .factory('Energy Drinks', function(){
        return{
            get : function(){
                var data = [
                    {
                        "id": 1,
                     //   "images": "http://programming-challenge.arinium.fi/energy-drinks/light-beer.jpg",
                        "title": "Monster Absolutely Zero",
                        "description": "Amerikkalaisen Monsterin kaloriton versio",
                        "price-range": 40,
                        "preferability": 30
                    },
                    {
                        "id": 2,
                     //   "images": "http://programming-challenge.arinium.fi/energy-drinks/ed-green-light.jpg",
                        "title": "ED Green Light",
                        "description": "Kotimaisen EDin hedelmäinen versio.",
                        "price-range": 50,
                        "preferability": 50
                    },
                    {
                        "id": 3,
                       // "images": "http://programming-challenge.arinium.fi/energy-drinks/ed-lemon-light.jpg",
                        "title": "ED Lemon Light",
                        "description": "Kotimaisen EDin sitrusversio.",
                        "price-range": 50,
                        "preferability": 40
                    },
                    {
                      //  "id": 4,
                        "images": "http://programming-challenge.arinium.fi/energy-drinks/battery-no-calories.jpg",
                        "title": "Battery No Calories",
                        "description": "Kotimaisen Batteryn kaloriton versio",
                        "price-range": 50,
                        "preferability": 50
                    },
                    {
                        "id": 5,
                      //  "images": "http://programming-challenge.arinium.fi/energy-drinks/mad-croc-sugarfree.jpg",
                        "title": "Mad Croc Sugarfree",
                        "description": "Hollantilaisen energiajuoman kaloriton versio. Myydään sekä pienessä (250 ml) että isommassa (500 ml) tölkeissä.",
                        "price-range": 20,
                        "preferability": 50
                    },
                    {
                        "id": 6,
                      //  "images": "http://programming-challenge.arinium.fi/energy-drinks/teho-lite-boost.jpg",
                        "title": "Teho Lite Boost",
                        "description": "Kotimaisen Olvin kaloriton versio",
                        "price-range": 30,
                        "preferability": 20
                    },
                    {
                        "id": 7,
                      //  "images": "http://programming-challenge.arinium.fi/energy-drinks/",
                        "title": "Monster Ultra",
                        "description": "Amerikkalaisen Monsterin kaloriton Ultra-variaatio",
                        "price-range": 40,
                        "preferability": 20
                    },
                    {
                        "id": 8,
                      //  "images": "http://programming-challenge.arinium.fi/energy-drinks/",
                        "title": "Red Bull Sugarfree",
                        "description": "Itävaltalaisen Red Bullin sokeriton versio",
                        "price-range": 40,
                        "preferability": 20
                    }
                ];
                return data;
            }
        }
    });
