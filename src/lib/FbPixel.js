export class FbPixel {
    constructor(pixelId, projectName){
        if(window.useFbPixel && pixelId){
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
                n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
                document,'script','https://connect.facebook.net/en_US/fbevents.js');

            this.pixel = pixelId;
            this.projectName = projectName;
            this.debug = true;
            this.init();
        }
    }

    init(){
        window.fbq('init', this.pixel);
    }

    projectView(){
        this.post('track', 'ViewContent');
    }

    nodePlay(node, video){
        this.post('trackCustom', 'videoPlay', this.nodeEvent(node, video))
    }

    nodeEnded(node, video){
        this.post('trackCustom', 'videoEnded', this.nodeEvent(node, video));
    }

    interaction(element){
        this.post('trackCustom', 'interaction', {
            name: element.name,
            action: element.action,
            actionArg: element.actionArg
        })
    }

    nodeEvent(node, video) {
        return {
            nodeId: node.id,
            nodeName: node.name,
            videoId: video.id,
            videoName: video.name
        }
    }

    post(event, label, data = {}){
        if (! this.pixel) {
            if (this.debug) console.log('no pixel');
            return false;
        }

        const microdata = Object.assign({
            projectName: this.projectName,
        }, data);
        window.fbq(event, label, microdata);

        if (this.debug) {
            console.log('FB Pixel: ' + event + ' - ' + label);
            console.log(microdata);
        }
    }
}