class BullhornHeaderController {
    constructor($location, $window, $scope) {
        'ngInject';

        this.$window = $window;
        this.$location = $location;
        $scope.txtOpacity = 1;
        this.scroll($scope);
    }

    scroll(scope) {
        Number.prototype.map = function (inMin, inMax, outMin, outMax) {
            return (this - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
        };

        angular.element(this.$window).bind('scroll', () => {
            scope.txtOpacity = 1 - this.$window.scrollY.map(0, 210, 0, 1);
            let headerHeight = this.$window.document.getElementById('header-text').offsetHeight;

            if (this.$window.scrollY > headerHeight) {
                scope.collapse = true;
                this.$window.document.body.scrollTop = headerHeight + 1;
            } else {
                scope.collapse = false;
                // console.log(this.$window.scrollY);
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
