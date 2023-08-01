import { mapGetters } from 'vuex';

export default {
    mounted() {
        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },
    data() {
        return {
            playerWidth: window.innerWidth,
            playerHeight: window.innerHeight
        };
    },
    methods: {
        handleResize() {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const windowRatio = windowHeight / windowWidth

            if(windowRatio > this.projectRatio) {
                this.playerWidth = windowWidth;
                this.playerHeight = this.getHeightFromWidth(windowWidth)
            }else {
                this.playerHeight = windowHeight;
                this.playerWidth = this.getWidthFromHeight(windowHeight)
            }
        },
        scaleValue(val) {
            return val * this.scale;
        },
        getHeightFromWidth(width){
            return width * this.projectRatio
        },
        getWidthFromHeight(height){
            return  height / this.projectRatio;
        }
    },
    computed: {
        ...mapGetters(['project']),
        scaledStyles() {
            return {
                //...this.projectDimensions,
                transform: `scale(${this.scale})`,
                transformOrigin: 'top left'
            };
        },

        scale() {
            return this.playerWidth / this.project.base_width;
        },
        projectRatio() {
            let projectHeight = parseInt(this.project.base_height);
            let projectWidth = parseInt(this.project.base_width);
            projectWidth = !isNaN(projectWidth) ? projectWidth : 720;
            projectHeight = !isNaN(projectHeight) ? projectHeight : 405;
            return projectHeight / projectWidth;
        }
    }
};
