// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

Catpow.Output = (props)=>{
    const { conf , value  } = props;
    const { createElemnt: el  } = wp.element;
    if (!value) return '';
    switch(conf.output_type){
        case 'group':
            return wp.element.createElement("ul", {
                className: "OutputGroup"
            }, Object.keys(value).map((key)=>{
                const row = value[key];
                console.log(conf);
                return wp.element.createElement("li", {
                    className: "item",
                    key: key
                }, Object.keys(conf.meta).map((name)=>wp.element.createElement("dl", {
                        key: name
                    }, wp.element.createElement("dt", null, conf.meta[name].label), wp.element.createElement("dd", null, wp.element.createElement(Catpow.Output, {
                        conf: conf.meta[name],
                        value: row[name]
                    })))));
            }));
        case 'select':
        case 'radio':
        case 'checkbox':
            {
                const labels = (Array.isArray(value) ? value : [
                    value
                ]).filter((val)=>!!val).map((val)=>conf.dict ? conf.dict[val] : val);
                if (!labels.length) {
                    return false;
                }
                return wp.element.createElement("ul", {
                    clasName: "OutputLabels"
                }, labels.map((label)=>wp.element.createElement("li", {
                        className: "item"
                    }, label)));
            }
        case 'image':
            return wp.element.createElement("ul", {
                className: "OutputImages"
            }, wp.element.createElement("li", {
                className: "item"
            }, props.images.map((image)=>wp.element.createElement("img", {
                    className: "image",
                    src: image.url
                }))));
        default:
            return value.join(',');
    }
};
