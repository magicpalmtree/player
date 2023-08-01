<template>
    <p>
<!--        <strong>{{ formatCurrentTime || '&#45;&#45;:&#45;&#45;' }} / {{ formatDuration || '&#45;&#45;:&#45;&#45;' }}</strong>-->
        {{ formatCurrentTime || '--:--' }}
    </p>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "Duration",
        computed:{
            ...mapGetters([
                'videoDuration', 'currentTime'
            ]),
            formatCurrentTime(){
                return this.currentTime ? this.format( this.currentTime ) : false;
            },
            formatDuration(){
                return this.videoDuration ? this.format( this.videoDuration ) : false;
            }
        },
        methods:{
            format(duration) {
                var hrs = Math.floor(duration / 3600);
                var min = Math.floor((duration - (hrs * 3600)) / 60);
                var seconds = duration - (hrs * 3600) - (min * 60);
                seconds = Math.round(seconds);

                var result = '';

                if(hrs){
                    result += (hrs < 10 ? "0" + hrs : hrs) +  ":" ;
                }

                result += (min < 10 ? "0" + min : min);
                result += ":" + (seconds < 10 ? "0" + seconds : seconds);
                return result;
            }
        }
    }
</script>

<style scoped>
    p {
        font-size: inherit;
        text-align: center;
        font-family: 'Lato', sans-serif;
        padding: 0;
        margin:0
    }
</style>