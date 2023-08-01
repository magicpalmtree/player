<template>
    <div :style="inlineStyles" :click="handleClick" v-html="parsedText" class="centeredElement"></div>
</template>
<script>

    import useAction from '../hooks/useAction';
    import useState from '../hooks/useState';
    import useProject from '../hooks/useProject';

    export default {
        name:'TextElement',
        setup(){
            const { elementClick, modalElementClick } = useAction();
            const { project } = useProject();
            return { elementClick, modalElementClick, project };
        },
        props:{
            element:{
                required: true,
                type: Object
            },
          interaction: {},
          isModalElement: {},
          modalElement: {}
        },

        methods:{
            handleClick(){
                if(this.isModalElement) {
                    this.modalElementClick(this.modalElement)
                } else {
                    this.elementClick(this.element, this.interaction);
                }
            }
        },

        computed:{
            // ...mapGetters([
            //     'dynamicParams'
            // ]),
            dynamicParams(){
                const { dynamicParams } = useState();
                return dynamicParams;
            },
            inlineStyles(){
                return {
                    width: '100%',
                    height: '100%',
                    background: this.element.backgroundColour,
                    borderRadius: this.element.borderRadius + 'px',
                    paddingLeft:  this.element.padding + '%',
                    paddingRight:  this.element.padding + '%',
                    letterSpacing: this.element.letterSpacing + 'px',
                    borderStyle: this.element.borderType,
                    borderColor: this.element.borderColor,
                    borderWidth: this.element.borderWidth + 'px',
                    fontFamily: this.project.font
                }
            },
            parsedText(){
                let {html, dynamic, default_values} = this.element;
                if(!dynamic) return html; // return normal Text

                /** === handle Dynamic text stuff here === */
                // Start with Params provided in url .
                for ( const paramName of Object.keys(this.dynamicParams)) {
                    const paramVal = this.dynamicParams[paramName]
                    html = this.parseDynamicParams(html, paramName, paramVal)
                }
                // Parse using default values provided
                // ones that were provided in url are already changed using loop above
                // if any provided default value is matched in the html it will be replaced here
                if(Array.isArray(default_values)) default_values.forEach(param => {
                    const paramName = param.key, paramVal = param.value ;
                    html = this.parseDynamicParams(html, paramName, paramVal)
                })

                return html;
            },
        },
        methods:{
            parseDynamicParams(html, paramName, paramVal){
                // matches the param names while considering the styling html incomming from wysiwyg editor
                const re = RegExp(`{[^{}]*(${paramName})[^{}}]*}`);
                return html.replace(re, function _repalcer(match, g1) {
                    // console.log('from inside the replacer =>>>>>> ', ` match : ${match}, \n param : ${g1}` )
                    if(g1 !== paramName) return ; // edge case where only some parts of the param name are input .
                    match = match.replace(g1, paramVal);
                    return match.replace(/[{}]/g, '');
                })
            }
        }
    }
</script>
<style scoped>
    .centeredElement {
        flex-direction: column;
    }
</style>
