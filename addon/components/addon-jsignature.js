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
    importFormat: 'native',
    exportFormat: 'native',

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
            .on('change', () => this._onChange());

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
        this._onChange();
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
        const isSupported = this._isSupportedFormat(exportFormat, 'export');

        Ember.assert(`'${exportFormat}' is not a supported format for exporting`, isSupported);

        return this.jSignature('getData', exportFormat);
    },

    setData(data, importFormat = this.get('_config').importFormat)
    {
        const isSupported = this._isSupportedFormat(importFormat, 'import');

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



    /**
     *   Private
     */


    _onChange()
    {
        const callback = this.get('changeListener');
        const exportFormat = this.get('_config.exportFormat');

        if(!Ember.isNone(callback) && typeof callback === 'function')
        {
            const data = this.getData(exportFormat);
            return callback(data);
        }
    },

    _isSupportedFormat(format, formatType)
    {
        const supportedFormats = this.listPlugins(formatType);
        const isSupported = (supportedFormats.indexOf(format) > -1);

        return isSupported;
    },

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


/**
 *
 *  Object.assign shim
 *
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 *
 */

if (typeof Object.assign !== 'function') {
    Object.assign = function(target) {
        'use strict';
        if (target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        target = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== null) {
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        }
        return target;
    };
}
