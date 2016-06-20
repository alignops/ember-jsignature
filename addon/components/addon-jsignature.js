/**
 *
 *  https://github.com/brinley/jSignature/
 *
 */


import Ember from 'ember';
// import layout from '../templates/components/addon-jsignature';

const defaultConfig = {
    // plugins
    CompressorSVG: true,

    // data formats: default(bitmap), native, base30, svg, svgbase64, image
    importFormat: 'base30',
    exportFormat: 'base30',

    // settings
    width: 'ratio',
    height: 'ratio',
    sizeRatio: 4, // only used when height = 'ratio'
    color: '#000',
    'background-color': '#fff',
    'decor-color': '#eee',
    lineWidth: 0,
    minFatFingerCompensation: -10,
    showUndoButton: false,
    readOnly: false,
    // data: null,

};

export default Ember.Component.extend(
{
    classNames: ['addon-jsignature'],
    // layout,



    /**
     *   Addon Attributes
     */

    UndoButton: true,
    changeListener: null,


    /**
     *   Addon Lifecycle
     */

    loadComponent: Ember.on('didInsertElement', function()
    {
        this._setConfig();

        this.jSignature(this.get('_config'))
            .on('change', () => this.onChange());

        if(!Ember.isNone(this.get('data')))
        {
            this.setData(this.get('data'));
        }
    }),

    destroyComponent: Ember.on('willDestroyElement', function()
    {
        Ember.run.cancel(this.scheduledUpdate);
    }),

    onEnd: function(){},

    dataObserver: Ember.observer('data', function() {
        this.importData(this.get('data'));
    }),

    commandObserver: Ember.observer('command', function() {
        const command = this.get('command');

        const args = command.hasOwnProperty('args') ? command.args : [];
        const cb = command.hasOwnProperty('cb') ? command.cb : function(){};

        cb(this.jSignature(command.command, ...args));
    }),



    /**
     *   jSignature API
     */

    jSignature(command, ...args)
    {
        return this.$().jSignature(command, ...args);
    },

    getData(exportFormat)
    {
        const supportedFormats = this.listPlugins('export');
        const isSupported = (supportedFormats.indexOf(exportFormat) > -1);

        Ember.assert(`'${exportFormat}' is not a supported format for exporting`, isSupported);

        return this.jSignature('getData', exportFormat);
    },

    setData(data)
    {
        const importFormat = this.get('_config').importFormat;
        const supportedFormats = this.listPlugins('import');
        const isSupported = (supportedFormats.indexOf(importFormat) > -1);

        Ember.assert(`'${importFormat}' is not a supported format for importing`, isSupported);

        return this.jSignature('setData', data, this.get('_config').importFormat);
    },

    importData(...args)
    {
        return this.setData(...args);
    },

    reset()
    {
        return this.jSignature('reset');
    },

    clear()
    {
        return this.jSignature('clear');
    },

    listPlugins(...args)
    {
        return this.jSignature('listPlugins', ...args);
    },

    disable()
    {
        return this.jSignature('disable');
    },

    enable()
    {
        return this.jSignature('enable');
    },

    isModified()
    {
        return this.jSignature('isModified');
    },

    getSettings()
    {
        return this.jSignature('getSettings');
    },

    updateSetting(...args)
    {
        return this.jSignature('updateSetting', ...args);
    },


    onChange()
    {
        const callback = this.get('changeListener');

        if(!Ember.isNone(callback) && typeof callback === 'function')
        {
            return callback(this.getData(this.get('_config.exportFormat')));
        }
    },



    /**
     *   Private
     */

    _setConfig: function ()
    {
        const defaultKeys = Object.keys(defaultConfig);


        const config = defaultKeys.reduce((result, key) =>
        {
            return Object.assign(
                result,
                { [key]: this.getWithDefault(key, defaultConfig[key]) }
            );
        }, {});

        config.UndoButton = config.showUndoButton;
        config.dataFormat = config.importFormat;

        this.set('_config', config);

        return config;
    }
});
