import Ember from 'ember';

export default Ember.Controller.extend({

    svg: null,

    actions: {
        onChange(data) {
            this.set('svg', data[1]);
        }
    },

});
