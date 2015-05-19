import Ember from 'ember';
import objectValues from '../utils/object-values';

export default Ember.Mixin.create({

  filters: {},

  _filtersManager: Ember.inject.service('filters-manager'),

  _qpValidationErrors: Ember.A([]),

  _initMixin: Ember.on('init', function() {
    this._validateQueryParams();
    this.get('_filtersManager').setContext(this);
  }),

  _validateQueryParams() {
    var filtersQP = this._getFiltersQP();
    var qp = this.get('queryParams');

    var validationErrors = this.get('_qpValidationErrors');
    filtersQP.forEach((item) => {
      if(qp.indexOf(item) === -1) {
        validationErrors.push(item);
      }
    });

    if(!Ember.isEmpty(validationErrors)) {
      throw new Error(
        `The following filters are not included into the \`queryParams\` array: ${this._getQPValidationErrors()}`
      );
    }
  },

  _getFiltersQP() {
    var filtersHash = this.get('filters');

    return objectValues(filtersHash);
  },

  _getQPValidationErrors() {
    var errors = this.get('_qpValidationErrors').map((item) => {
      return `\`${item}\``;
    });

    return errors.join(', ');
  }
});
