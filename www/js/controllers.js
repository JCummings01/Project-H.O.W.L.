angular.module('starter.controllers', [])

.controller('AppCtrl', function (api, $scope, $state, $ionicModal, $location, $document, $timeout, $http, $ionicPlatform, $ionicLoading, $twitterApi, $cordovaAppAvailability, $ionicActionSheet, $cordovaOauth, $ionicScrollDelegate, $ionicPosition) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  // $scope.$on('$ionicView.enter', function(e) {
  // });
  var apiKey2 = '&apikey=ece3e4fd5f1ad6247f8551a0206c6c41'
  var apiKey = '&apikey=e7ef140f90ae825cd6b374b61953491a'
  var fecApi = '7Zpw72AlGPGQFDML24Xj3lSfU3GBzEwfw327ztka'
  // var candId
  var osLegUrl = 'https://www.opensecrets.org/api/?method=getLegislators&id='
  var osCandUrl = 'http://www.opensecrets.org/api/?method=candIndustry&cid='
  $scope.currentState
  $scope.states = [
    {'state': 'Alabama', 'abbrev': 'AL'},
    {'state': 'Alaska', 'abbrev': 'AK'},
    {'state': 'Arizona', 'abbrev': 'AZ'},
    {'state': 'Arkansas', 'abbrev': 'AR'},
    {'state': 'California', 'abbrev': 'CA'},
    {'state': 'Colorado', 'abbrev': 'CO'},
    {'state': 'Connecticut', 'abbrev': 'CT'},
    {'state': 'Delaware', 'abbrev': 'DE'},
    {'state': 'Florida', 'abbrev': 'FL'},
    {'state': 'Georgia', 'abbrev': 'GA'},
    {'state': 'Hawaii', 'abbrev': 'HI'},
    {'state': 'Idaho', 'abbrev': 'ID'},
    {'state': 'Illinois', 'abbrev': 'IL'},
    {'state': 'Indiana', 'abbrev': 'IN'},
    {'state': 'Iowa', 'abbrev': 'IA'},
    {'state': 'Kansas', 'abbrev': 'KS'},
    {'state': 'Kentucky', 'abbrev': 'KY'},
    {'state': 'Louisiana', 'abbrev': 'LA'},
    {'state': 'Maine', 'abbrev': 'ME'},
    {'state': 'Maryland', 'abbrev': 'MD'},
    {'state': 'Massachusetts', 'abbrev': 'MA'},
    {'state': 'Michigan', 'abbrev': 'MI'},
    {'state': 'Minnesota', 'abbrev': 'MN'},
    {'state': 'Mississippi', 'abbrev': 'MS'},
    {'state': 'Missouri', 'abbrev': 'MO'},
    {'state': 'Montana', 'abbrev': 'MT'},
    {'state': 'Nebraska', 'abbrev': 'NE'},
    {'state': 'Nevada', 'abbrev': 'NV'},
    {'state': 'New Hampshire', 'abbrev': 'NH'},
    {'state': 'New Jersey', 'abbrev': 'NJ'},
    {'state': 'New Mexico', 'abbrev': 'NM'},
    {'state': 'New York', 'abbrev': 'NY'},
    {'state': 'North Carolina', 'abbrev': 'NC'},
    {'state': 'North Dakota', 'abbrev': 'ND'},
    {'state': 'Ohio', 'abbrev': 'OH'},
    {'state': 'Oklahoma', 'abbrev': 'OK'},
    {'state': 'Oregon', 'abbrev': 'OR'},
    {'state': 'Pennsylvania', 'abbrev': 'PA'},
    {'state': 'Rhode Island', 'abbrev': 'RI'},
    {'state': 'South Carolina', 'abbrev': 'SC'},
    {'state': 'South Dakota', 'abbrev': 'SD'},
    {'state': 'Tennessee', 'abbrev': 'TN'},
    {'state': 'Texas', 'abbrev': 'TX'},
    {'state': 'Utah', 'abbrev': 'UT'},
    {'state': 'Vermont', 'abbrev': 'VT'},
    {'state': 'Virginia', 'abbrev': 'VA'},
    {'state': 'Washington', 'abbrev': 'WA'},
    {'state': 'West Virginia', 'abbrev': 'WV'},
    {'state': 'Wisconsin', 'abbrev': 'WI'},
    {'state': 'Wyoming', 'abbrev': 'WY'}
  ]

  // LOADING SPINNER
  $scope.show = function () {
    $ionicLoading.show({
      template: 'Loading...',
      duration: 3000
    }).then(function () {
      console.log('The loading indicator is now displayed')
    })
  }
  $scope.hide = function () {
    $ionicLoading.hide().then(function () {
      console.log('The loading indicator is now hidden')
    })
  }

  $scope.sendTweet = function(rep) {
    var url = 'https://twitter.com/intent/tweet/?text=%40' + rep + '%20I%E2%80%99d%20like%20to%20talk%20to%20you%20about%20restoring%20Free%20%26%20Fair%20Elections.%20Is%20this%20an%20issue%20you%20care%20about%3F%20%40wolfpachq%20%40cenkuygur'
    console.log('coming through tweet link?', rep)
    // window.open(url, '_blank', 'location=no')
    // window.open(url, '_blank')
    if (window.cordova) {
      cordova.InAppBrowser.open(url, '_blank');
    }
}

  $scope.sendFb = function(fb) {
    // var url = 'https://www.facebook.com/sharer/sharer.php?u=' + fb
    var url = 'https://www.facebook.com/' + fb
    console.log('coming through facebook link?', fb.substr(9))
    // window.open(url, '_blank')
    if (window.cordova) {
      cordova.InAppBrowser.open(url, '_blank');
    }
}

  $scope.placeCall = function(num) {
    console.log('Place Call to ' + num)
    // window.open('tel:' + num, '_system')
    if (window.cordova) {
      cordova.InAppBrowser.open('tel:' + num, '_system');
    }
  }

  $scope.openWindow = function(url) {
    if (window.cordova) {
      cordova.InAppBrowser.open(url, '_blank');
    }
  }

  $scope.sendEmail = function(addr) {
    console.log('Send Email to ' + addr)
    // if(window.plugins && window.plugins.emailComposer) {
    //     window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
    //         console.log("Response -> " + result);
    //     }, 
    //     "Free and Fair Elections", // Subject
    //     "I’d like to talk to you about restoring Free and Fair Elections in America. Is this an issue you care about?",                      // Body
    //     addr,    // To
    //     null,                    // CC
    //     null,                    // BCC
    //     true,                   // isHTML
    //     null,                    // Attachments
    //     null);                   // Attachment Data
    // }
    if (window.cordova) {
      cordova.InAppBrowser.open(addr, 'blank');
    }
}

// $rootScope.$on('$cordovaInAppBrowser:exit', function(e, event));

  // ACTION SHEET POPUP FOR SCRIPT
  $scope.showScript = function () {
    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      // buttons: [
      //  { text: '<b>Share</b> This' },
      //  { text: 'Move' }
      // ],
      // destructiveText: 'Delete',
      titleText: '<b>Hi Representative/Senator,</b> Im a citizen of your state and Id like to talk to you about an important resolution that aims to fix the corruption happening in Washington, D.C. by restoring Free and Fair Elections in America. The purpose of this Resolution is to clean up our election system so that the voices of average Americans don’t continue to be drowned out by big money and special interests. Is this an issue you care about? Thank you. This Resolution calls for an amendment to our U.S. Constitution because we need to solve this problem for the long run. Since Congress is incapable of solving any problem, let alone this one, we are working to get this amendment through our state legislatures, which is why I’m talking to you! I trust you much more than Congress. The resolution calls for an amendment convention to propose an amendment that would deal with the influence of money in our political system. A national convention is the way for us to go around Congress and get an amendment ourselves without relying on them, nor waiting around for them. Do you think there is any part of our election system that could work better for the average American?',
      cancelText: 'Cancel',
      cancel: function () {
          // add cancel code..
      },
      buttonClicked: function (index) {
        return true
      }
    })

   // For example's sake, hide the sheet after two seconds
   // TODO: REMOVE TIMEOUT AND CLOSE WHEN USER CLICKS ELSEWHERE
    // $timeout(function () {
    //   hideSheet()
    // }, 2000)
  }

  // $scope.scrollHelper = function(element) {
  //   var duration = 2000; //milliseconds
  //   var nextElement = parseInt(element + 1)
  //   console.log('element index sent via click', nextElement)
  //   // var offset = 120;
  //   // var something = .position(angular.element(document.getElementById(nextElement)))
  //   var repPosition = $ionicPosition.offset(angular.element(document.getElementById(nextElement)));
  //   console.log('repPosition data', repPosition)
  //   $ionicScrollDelegate.$getByHandle('rep-list').scrollTo(repPosition.left, repPosition.top, true);
  // }

  $scope.stateSelector = function (state) {
    angular.element(document.querySelector('.rep-wall')).css('background-size', '150%');
    var myEl = angular.element( document.querySelector( '.title' ) );
    myEl.addClass('animated');
    myEl.addClass('fadeIn');
    $state.go('app.reps')
    // SHOW LOADING SPINNER
    $scope.show($ionicLoading);
    console.log('received via stateSelector click', state)
    $scope.currentState = state.state
    $http.get(osLegUrl + state.abbrev + apiKey + '&output=json')
      .success(function (data, status, headers, config) {
        console.log('data success', data.response.legislator[0]['@attributes'])
        $scope.reps = data.response.legislator // for UI
      })
      .error(function (data, status, headers, config) {
        console.log('data error')
      })
      .then(function(result){
        // console.log('then function after get reps...this work?', result.data.response.legislator)
        // for (var i = 0; i < result.data.response.legislator.length; i++) {
        //   var candidateId = result.data.response.legislator[i]['@attributes'].cid
        // api.getIndustries(result)
        api.getCandData(result)
          .then(function(result) {
            console.log('controller.js - this should be candJSON', result)
            // console.log('results in Controller from Industry factory call', result)
            // $scope.repSectors = result
            })
      });
      $scope.hide($ionicLoading);
  }

  // $scope.labels = ["Agribusiness", "Communic/Electronics", "Construction", "New", "Old", "Telecom", "Lobbyists"];
  $scope.labels = ["", "", "", "", "", ""];
  $scope.data = [[246439,8000,27350,5000,5000,11000]];
  $scope.series = ["Campaign Contributions"];
  $scope.colours = [{fillColor:['#f53d3d','#387ef5','#32db64','#444','#222','#69BB7B'], strokeColor:['#f53d3d','#387ef5','#32db64','#444','#222','#69BB7B']}];
  $scope.options = {
  //     tooltipEvents: [],
      showTooltips: false,
  //     tooltipCaretSize: 0,
  //     onAnimationComplete: function () {
  //         this.showTooltip(this.segments, true);
  //     },
  };

  // Form data for the login modal
  $scope.loginData = {}

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal
  })

  // Triggered in the login modal to close it
  $scope.closeLogin = function () {
    $scope.modal.hide()
  }

  // Open the login modal
  $scope.login = function () {
    $scope.modal.show()
  }

  // Perform the login action when the user submits the login form
  $scope.doLogin = function () {
    console.log('Doing login', $scope.loginData)

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function () {
      $scope.closeLogin()
    }, 1000)
  }

  // $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  //   // $scope.series = ['Series A', 'Series B'];
  //   $scope.data = [
  //       [65, 59, 80, 81, 56, 55, 40]
  //       // [28, 48, 40, 19, 86, 27, 90]
  //   ];

  // Twitter integration
  var clientId = 'wldaNMRllRJ3N3LwTgnxkEjjq'
  var clientSecret = 'ScmgRGi3s94Y5RH8uU1FYpmnn78pBlAJH6BVGqEBghajespyEj'
  var myToken = ''

  $ionicPlatform.ready(function () {
    // myToken = JSON.parse(window.localStorage.getItem(twitterKey));
    // if (myToken === '' || myToken === null) {
      // $cordovaOauth.twitter(clientId, clientSecret).then(function (succ) {
      //   console.log('twitter success msg', succ)
      //   $twitterApi.configure(clientId, clientSecret, succ);
      //     }, function(error) {
      //       console.log('error from twitter auth',error);
      // });
    // } else {
    //   $twitterApi.configure(clientId, clientSecret, myToken);
    // }

    // IONIC DEVICE SCHEME
    var deviceInformation = ionic.Platform.device()

    var isWebView = ionic.Platform.isWebView()
    var isIPad = ionic.Platform.isIPad()
    var isIOS = ionic.Platform.isIOS()
    var isAndroid = ionic.Platform.isAndroid()
    var isWindowsPhone = ionic.Platform.isWindowsPhone()

    var currentPlatform = ionic.Platform.platform()
    var currentPlatformVersion = ionic.Platform.version()

    // CORDOVA DEVICE SCHEME
    // var scheme

    // Don't forget to add the cordova-plugin-device plugin for `device.platform`
    // if (device.platform === 'iOS') {
    //   scheme = 'twitter://'
    // }
    // else if (device.platform === 'Android') {
    //   scheme = 'com.twitter.android'
    // }

    // appAvailability.check(
    //   scheme,       // URI Scheme or Package Name
    //   function () {  // Success callback
    //     console.log(scheme + ' is available :)')
    //   },
    //   function () {  // Error callback
    //     console.log(scheme + ' is not available :(')
    //   }
    // )

    // $cordovaAppAvailability.check('twitter://')
    //   .then(function () {
    //     // is available
    //   }, function () {
    //     // not available
    //   })

    // $cordovaAppAvailability.check('fb://')
    //   .then(function () {
    //     // is available
    //   }, function () {
    //     // not available
    //   })
  })

})

.controller('RepsCtrl', function ($scope, $state) {
  // $scope.getReps = function () {

  // }
})

.controller('PlaylistCtrl', function ($scope, $stateParams) {
})

// //NOTE: We are including the constant `ApiEndpoint` to be used here.
// .factory('Api', function($http, ApiEndpoint) {
//   console.log('ApiEndpoint', ApiEndpoint)
//
//   var getApiData = function() {
//     return $http.get(ApiEndpoint.url + '/tasks')
//       .then(function(data) {
//         console.log('Got some data: ', data);
//         return data;
//       });
//   };
//
//   return {
//     getApiData: getApiData
//   };
// })
