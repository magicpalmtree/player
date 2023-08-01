<template>
    <g>
        <g>
            <path
                class="level"
                d="M63.634,44.458A15.935,15.935,0,0,1,86.175,44.4a107.835,107.835,0,0,1,31.956,76.978,108.086,108.086,0,0,1-31.847,76.95,15.942,15.942,0,0,1-22.542-22.55,76.4,76.4,0,0,0,22.507-54.4A76.192,76.192,0,0,0,63.688,67,15.936,15.936,0,0,1,63.634,44.458Z"
                transform="translate(291.647 78.62)"
            />
            <path
                class="level"
                d="M116.9,173.48a160.66,160.66,0,0,0-46.119-113.2,16.409,16.409,0,0,1,.027-22.925,15.759,15.759,0,0,1,22.546.028,193.168,193.168,0,0,1,55.428,136.1,193.168,193.168,0,0,1-55.428,136.1,15.761,15.761,0,0,1-22.546.028,16.409,16.409,0,0,1-.027-22.925A160.661,160.661,0,0,0,116.9,173.48Z"
                transform="translate(341.419 26.521)"
            />
            <path
                class="level"
                d="M148.875,225.2c0-65.2-25.087-126.442-70.645-172.456a16.267,16.267,0,0,1-.019-22.812,15.814,15.814,0,0,1,22.546-.02c51.59,52.109,80,121.461,80,195.287s-28.411,143.174-80,195.287a15.816,15.816,0,0,1-22.546-.02,16.266,16.266,0,0,1,.019-22.812C123.787,351.64,148.875,290.4,148.875,225.2Z"
                transform="translate(393.138 -25.2)"
            />
        </g>
        <path
            d="M22.233 102.696h104.884a22.044 22.044 0 0012.561-3.936L276.433 3.974c14.755-10.227 34.794.468 34.794 18.568v354.915c0 18.1-20.039 28.795-34.794 18.568l-136.755-94.786a22.045 22.045 0 00-12.561-3.936H22.233A22.369 22.369 0 01.001 274.799v-149.6a22.37 22.37 0 0122.232-22.503z"
        />
    </g>
</template>
<script>
import anime from 'animejs/lib/anime.es';
export default {
    name: 'VolumeUpIcon',
    props: {
        volume: {
            type: Number,
            default: 0.5
        }
    },
    data() {
        return { animation: {} };
    },
    computed: {
        // timeline() {
        //     return ;
        // }
    },
    watch: {
        // volume(level, prevLevel) {
        //     // if (this.muted || level === 0) this.showMute();
        //     if (prevLevel >= 0.3 && level < 0.3) this.showLowVolume();
        //     // else if (level < 0.7) this.showMediumVolume();
        //     if (prevLevel < 0.7 && level >= 0.7) this.showHighVolume();
        // }
    },
    methods: {
        // showHighVolume() {
        //     this.animation.reverse().play();
        // },
        // showLowVolume() {
        //     const targets = '.level';
        //     this.animation = anime({
        //         targets,
        //         translateX: {
        //             value: '+=250', // 100px * 2.5 = '250px'
        //             duration: 600
        //         },
        //         delay: anime.stagger(200)
        //         // offset: 100,
        //         // easing: 'linear',
        //         // duration:
        //     });
        // }
    }
};
</script>