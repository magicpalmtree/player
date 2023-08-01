import { ref, computed, onMounted } from 'vue';
import useProject from './useProject';

const { project }  = useProject();

const playerWidth = ref(540);
const playerHeight = ref(405);

const projectRatio = computed(() => {
    let projectHeight = parseInt(project.value.base_height);
    let projectWidth = parseInt(project.value.base_width);
    projectWidth = !isNaN(projectWidth) ? projectWidth : 540;
    projectHeight = !isNaN(projectHeight) ? projectHeight : 405;
    return projectHeight / projectWidth;
});

const scale = computed(() => {
    return playerWidth.value / project.value.base_width;
});

const scaledStyles = computed(() => {
    return {
        transform: `scale(${scale.value + 0.01})`,
        transformOrigin: 'top left'
    };
});

export default function useProjectSize(){

    const registerResizeHandler = () => {
        window.addEventListener('resize', handleResize);
    }

    const unregisterResizeHandler = () => {
        window.removeEventListener('resize', handleResize);
    }

    const handleResize = () => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const windowRatio = windowHeight / windowWidth

        if(windowRatio > projectRatio.value) {
            playerWidth.value = windowWidth;
            playerHeight.value = getHeightFromWidth(windowWidth);
        } else {
            playerHeight.value = windowHeight;
            playerWidth.value = getWidthFromHeight(windowHeight);
        }
    }

    const scaleValue = (val) => {
        return val * scale.value;
    }

    const getHeightFromWidth = (width) => {
        return width * projectRatio.value
    }

    const getWidthFromHeight = (height) => {
        return  height / projectRatio.value;
    }

    return {
        scale,
        playerHeight,
        playerWidth,
        scaledStyles,
        registerResizeHandler,
        unregisterResizeHandler,
        scaleValue,
        handleResize
    }
}