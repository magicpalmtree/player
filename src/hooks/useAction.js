import useNode from './useNode'
import usePlayer from './usePlayer';
import useModal from './useModal';
import useAnalytics from './useAnalytics';

const { startTransition, getActiveNode } = useNode(); 
const { setPlaying, setMuted, setPlayed, setAutoplay } = usePlayer();
const { activeModalId, setActiveModal, closeModal } = useModal();
const { analytics } = useAnalytics();

export default function useAction() {
    const nodeComplete = (node) => {
        // TODO fire analytics here
        analytics.value.nodeViewDuration('100%', node.id);
        handleAction({
            action: node.completeAction,
            actionArg: node.completeActionArg
        });
    };

    const elementClick = (element, interaction) => {
        // TODO fire analytics here
        const activeNode = getActiveNode();
        analytics.value.elementClick(activeNode, interaction);
        handleAction({
            openUrlInNewTab: element.open_in_new_tab,
            actionArg: element.actionArg,
            action: element.action
        });
    };

    const elementView = (interaction) => {
        // TODO fire analytics here
        const activeNode = getActiveNode();
        analytics.value.elementView(activeNode, interaction);
    }

    const modalElementClick = (modalElement) => {
        // TODO fire analytics here
        const activeNode = getActiveNode();
        analytics.value.modalElementClick(activeNode, modalElement);
        
        handleAction({
            openUrlInNewTab: modalElement.element.open_in_new_tab,
            actionArg: modalElement.element.actionArg,
            action: modalElement.element.action
        });
    };

    const modalElementView = (modalElement) => {
        // TODO fire analytics here
        const activeNode = getActiveNode();
        analytics.value.modalElementView(activeNode, modalElement);
    }

    const handleAction = ({action, actionArg, openUrlInNewTab}) => {
        switch(action){
            case('playNode') :
                handlePlayNode(actionArg);
                break;
            case('openUrl') :
                handleOpenUrl(actionArg, openUrlInNewTab);
                break;
            case('openModal') :
                handleOpenModal(actionArg);
                break;
            case('skipToTime') : 
                handleSkipToTime(actionArg);
                break;
            case('closeModal') :
                handleCloseModal();
                break;
            case('play') :
                handlePlay();
                break;
            default:
                setPlaying(false);         
        }
    }

    const handlePlayNode = (nodeId) => {
        analytics.value.interaction(nodeId);
        startTransition(nodeId);
        setActiveModal(false);
    }

    const handleOpenUrl = (arg, openUrlInNewTab) => {
        setPlaying(false);
        if (!arg.startsWith('http')) {
            arg = 'http://' + arg;
        }

        if (openUrlInNewTab) {
            let win = window.open(arg, 'rel=noopener');
            win.focus();
        } else window.top.location = arg;
    }

    const handleOpenModal = (arg) => {
        setActiveModal(arg);
        setPlaying(false);
    }

    const handleSkipToTime = (arg) => {
        setTimeout(() => {
            setPlaying(true);
            if(activeModalId) closeModal();
        }, 500);
    }

    const handleCloseModal = () => {
        closeModal();
    }

    const handlePlay = () => {
        setPlaying(true);
        if(activeModalId) closeModal();
    }

    // autoplay unmute stuff
    const unMuteAutoplay = () => {
        setMuted(false);
        setPlayed(true);
        setAutoplay(false);
    }

    return {
        nodeComplete, elementClick, handleAction, unMuteAutoplay, modalElementClick, modalElementView, elementView, handlePlayNode
    }
}
