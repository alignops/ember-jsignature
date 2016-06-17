import Ember from 'ember';
// import layout from '../templates/components/addon-jsignature';

const defaultConfig = {
    // plugins
    UndoButton: true,
    CompressorSVG: true,

    // data formats: default(bitmap), native, base30, svg, svgbase64, image
    dataFormat: 'svg',

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
    data: [],

};

export default Ember.Component.extend(
{
    classNames: ['addon-jsignature'],
    // layout,



    /**
     *   Addon Attributes
     */

    changeListener: null,


    /**
     *   Addon Lifecycle
     */

    loadComponent: Ember.on('didInsertElement', function()
    {
        this._setConfig();
        return this.jSignature(this.get('_config'))
            .on('change', () => this.onChange());
    }),

    destroyComponent: Ember.on('willDestroyElement', function()
    {
        Ember.run.cancel(this.scheduledUpdate);
    }),

    onEnd: function(){},



    /**
     *   jSignature API
     */

    jSignature(command, ...args)
    {
        return this.$().jSignature(command, ...args);
    },

    getData()
    {
        const dataFormat = this.get('_config').dataFormat;
        const supportedFormats = this.listPlugins('export');
        const isSupported = (supportedFormats.indexOf(dataFormat) > -1);

        Ember.assert(`'${dataFormat}' is not a supported format for exporting`, isSupported);

        return this.jSignature('getData', dataFormat);
    },

    setData(data)
    {
        const dataFormat = this.get('_config').dataFormat;
        const supportedFormats = this.listPlugins('import');
        const isSupported = (supportedFormats.indexOf(dataFormat) > -1);

        Ember.assert(`'${dataFormat}' is not a supported format for importing`, isSupported);

        return this.jSignature('setData', data, this.get('_config').dataFormat);
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
            return callback(this.getData());
        }
    },



    /**
     *   Private
     */

    _setConfig: function ()
    {
        const defaultKeys = Object.keys(defaultConfig);

        let config = defaultKeys.reduce((acc, key) =>
        {
            return Object.assign(
                acc,
                { [key]: this.getWithDefault(key, defaultConfig[key]) }
            );
        },
        {});

        this.set('_config', config);

        return config;
    }
});
