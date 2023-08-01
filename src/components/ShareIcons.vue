<template>
<div>
  <div class="_wrapper"   ref="background">
    <div style="height: 100%;">
      <ul>
        <ShareIcon
            v-if="shareData.facebook && shareData.facebook.use"
            :icon="['fa-brands','fa-facebook', 'fa-2xl']"
            :text="shareData.facebook.text"
            background="#4267B2"
            @click="shareFacebook"
        />
        <ShareIcon
            v-if="shareData.linkedin && shareData.linkedin.use"
            :icon="['fa-brands','fa-linkedin', 'fa-2xl']"
            :text="shareData.linkedin.text"
            background="#0077b5"
            @click="shareLinkedin"
        />
        <ShareIcon
            v-if="shareData.twitter && shareData.twitter.use"
            :icon="['fa-brands','fa-twitter-square', 'fa-2xl']"
            :text="shareData.twitter.text"
            background="#55acee"
            @click="shareTwitter"
        />
        <ShareIcon
            v-if="shareData.pinterest && shareData.pinterest.use"
            :icon="['fa-brands','fa-pinterest', 'fa-2xl']"
            :text="shareData.pinterest.text"
            background="#CB2027"
            @click="sharePinterest"
        />
        <ShareIcon
            v-if="shareData.email && shareData.email.use"
            icon="fa-shart fa-solid fa-paper-plane fa-2xl"
            :text="shareData.email.text"
            background="#7d7d7d"
            @click="shareEmail"
        />
        <!--                <li  class="_close" @click="toggleShare">-->
        <!--                    <font-awesome-icon  icon="angle-left" size="lg" />-->
        <!--                </li>-->
      </ul>
    </div>
  </div>
</div>
</template>

<script>
    import anime from 'animejs/lib/anime.es'
    // import {mapGetters, mapMutations} from 'vuex';
    import ShareIcon from './ShareIcon.vue';
    import useControlBar from '../hooks/useControlBar';
    import useProject from '../hooks/useProject';

    export default {
        name: "ShareIcons",
        components:{
            ShareIcon
        },
        setup() {
            const { project } = useProject();
            const { toggleShare } = useControlBar();
            return {
                project, toggleShare
            };
        },
        computed:{
            // ...mapGetters([
            //     'showShareIcons',
            //     'shareData',
            //     'project'
            // ]),
            showShareIcons() {
                const { sharesOpen } = useControlBar();
                return sharesOpen.value;
            },
            shareData() {
                return this.project.share_data;
            }
        },
        watch:{
            showShareIcons(newVal){
                if(newVal){
                    this.slideIn();
                }else{
                    this.slideOut();
                }
            }
        },
        methods:{
            // ...mapMutations([
            //     'toggleShare'
            // ]),
            slideIn(){

                anime.timeline()
                    .add({
                        targets:  this.$refs.background,
                        easing: 'linear',
                        left: 0,
                        duration: 400
                    });
            },

            slideOut(){
                anime.timeline()
                    .add({
                        targets:  this.$refs.background,
                        easing: 'linear',
                        left: '-60px',
                        duration: 400
                    });
            },

            shareFacebook(){
                // https://www.facebook.com/sharer/sharer.php?u=https://app.pixelsmarter.com/api/stripe-charge-event
                let url =  "https://www.facebook.com/sharer/sharer.php?u=" + this.project.shareUrl;
                this.share(url);
            },

            sharePinterest(){
                // https://pinterest.com/pin/create/button/?url=https://app.pixelsmarter.com/api/stripe-charge-event&media=&description=
                let url =  "https://pinterest.com/pin/create/button/?url=" + this.project.shareUrl + "&media=" + this.project.image_url;
                if(this.project.description){
                    url += "&description=" + this.project.description
                }
                this.share(url);
            },

            shareLinkedin(){
                // https://www.linkedin.com/shareArticle?mini=true&url=https://app.pixelsmarter.com/api/stripe-charge-event&title=&summary=&source=
                let url = "https://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent( this.project.shareUrl );

                if(this.shareData.linkedin.title){
                    url += "&title=" + this.shareData.linkedin.title;
                }

                if(this.project.description){
                    url += "&summary=" + this.project.description;
                }

                this.share(url);
            },

            shareTwitter(){
                // https://twitter.com/home?status=https://app.pixelsmarter.com/api/stripe-charge-event
                const url = "https://twitter.com/intent/tweet?url=" + encodeURIComponent( this.project.shareUrl );
                this.share(url);
            },

          /**
           * this func replaces the {share_page_url} string with the users
           * actual share page url and opens a mailTo link
           */
            shareEmail(){
                let url =  "mailto:?subject=" + this.shareData.email.subject + "&body=";

                if(! window?.data?.sharePageUrl) {
                    return this.share( url + this.shareData.email.body)
                }

                return this.share(
                    url +  this.shareData.email.body.replaceAll("{share_page_url}", window.data.sharePageUrl )
                );
            },

            share(url){
                //console.log(url);
                // window.top.location  = url;
                window.open(url, "_blank")
            }
        }
    }
</script>

<style scoped lang="scss">
    ._wrapper {
        height: 100%;
        width: 50px;
        position: absolute;
        top: 15px;
        left: -60px;
        z-index: 4000;
    }

    ._close {
        position: absolute;
        top: 10px;
        right: 15px;
        color: white;
    }

    ul {
        padding: 0;
    }
</style>