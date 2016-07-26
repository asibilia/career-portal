class BullhornHeaderController {
    constructor($location, $window, $scope, $element, $attrs) {
        'ngInject';

        this.$window = $window;
        this.$location = $location;
        $scope.txtOpacity = 1;
        this.scroll($scope, $element, $attrs);
    }

    scroll(scope, element, attrs) {
        Number.prototype.map = function (in_min, in_max, out_min, out_max) {
            return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
        }

        angular.element(this.$window).bind('scroll', () => {
            scope.txtOpacity = 1 - this.$window.scrollY.map(0, 210, 0, 1);
            let headerHeight = this.$window.document.getElementById('header-text').offsetHeight;

            if (this.$window.scrollY > headerHeight) {
                scope.collapse = true;
                this.$window.document.body.scrollTop = headerHeight + 1;
                // console.log(this.$window.scrollY);
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
