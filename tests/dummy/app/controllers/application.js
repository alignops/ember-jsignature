import Ember from 'ember';



export default Ember.Controller.extend({

    signatureData: null,
    command: null,

    // init()
    // {
    //     this.set('command', {command: 'listPlugins', cb: (...args) => console.log(...args)});
    // },

    actions: {
        onChange(data) {
            const signatureData = data[1];

            this.set('signatureData', signatureData);
        },

        log(...args) {
            console.log('log', ...args);
        },

        reset()
        {
            this.set('command', {command: 'reset', args: [], cb: (...args) => console.log(...args)});
        },

        clear()
        {
            this.set('command', {command: 'clear', args: [], cb: (...args) => console.log(...args)});
        },

        disable()
        {
            this.set('command', {command: 'disable', args: [], cb: (...args) => console.log(...args)});
        },

        enable()
        {
            this.set('command', {command: 'enable', args: [], cb: (...args) => console.log(...args)});
        },

        getData()
        {
            this.set('command', {command: 'getData', args: ['base30'], cb: (...args) => console.log(...args)});
        },

    },

});
