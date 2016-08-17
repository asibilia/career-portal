class BullhornHeaderController {
    constructor($location, $window, $scope, $stateParams, $rootScope) {
        'ngInject';

        this.$window = $window;
        this.$location = $location;
        $scope.headerIsHidden = !!$stateParams.id;

        setTimeout(() => {
            $scope.headerIsHidden = !!$stateParams.id;
            $scope.stopScroll = true;
        }, 200);

        $scope.txtOpacity = 1;
        this.scroll($scope);

        $rootScope.$on('$stateChangeStart', (e, t, toParams) => {
            $scope.headerIsHidden = !!toParams.id;
            if ($scope.headerIsHidden) {
                this.$window.document.getElementById('job-list').scrollTop = 0;
                this.$window.document.body.scrollTop = 0;
            }
            $scope.stopScroll = true;
        });
    }

    scroll(scope) {
        Number.prototype.map = function (inMin, inMax, outMin, outMax) {
            return (this - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
        };

        angular.element(this.$window).bind('scroll', () => {
            scope.txtOpacity = 1 - this.$window.scrollY.map(0, 210, 0, 1);
            let headerHeight = this.$window.document.getElementById('header-text').offsetHeight;

            if (scope.headerIsHidden) {
                scope.stopScroll = false;
            } else if (this.$window.scrollY > headerHeight) {
                scope.stopScroll = false;
            } else {
                scope.stopScroll = true;
                this.$window.document.getElementById('job-list').scrollTop = 0;
                this.$window.document.getElementById('filter-list').scrollTop = 0;
            }
            scope.$apply();
        });
    }
}

class BullhornHeader {
    constructor() {
        'ngInject';

        let directive = {
            restrict: 'E',
            templateUrl: 'app/navigation/navigation.html',
            scope: false,
            controller: BullhornHeaderController,
            controllerAs: 'navigation',
            bindToController: true,
            replace: true
        };

        return directive;
    }
}

export default BullhornHeader;
