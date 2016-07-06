class BullhornHeaderController {
    constructor(configuration, $location, SearchService) {
        'ngInject';

        this.SearchService = SearchService;
        this.$location = $location;
        this.configuration = configuration;
    }

    toggleFilters() {}

    goBack() {}
}

class BullhornHeader {
    constructor() {
        'ngInject';

        let directive = {
            restrict: 'E',
            templateUrl: 'app/navigation/navigation.html',
            scope: false,
            controller: BullhornHeaderController,
            controllerAs: 'header',
            bindToController: true,
            replace: true
        };

        return directive;
    }
}

export default BullhornHeader;
