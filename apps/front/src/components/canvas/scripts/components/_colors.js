class Colors {
    constructor(colors = {}) {
        this.red          = (('red' in colors)        ? colors.red         : "#be4b15");
        this.blue         = (('blue' in colors)       ? colors.blue        : "#6ea5f8");
        this.pink         = (('pink' in colors)       ? colors.pink        : "#faadc1");
        this.green        = (('green' in colors)      ? colors.green       : "#52ce60");
        this.orange       = (('orange' in colors)     ? colors.orange      : "#fdb400");
        this.purple       = (('purple' in colors)     ? colors.purple      : "#d689ff");
        this.lightred     = (('lightred' in colors)   ? colors.lightred    : "#fd8852");
        this.lightblue    = (('lightblue' in colors)  ? colors.lightblue   : "#afd4fe");
        this.lightgreen   = (('lightgreen' in colors) ? colors.lightgreen  : "#b9e986");
    }
}

export default Colors;