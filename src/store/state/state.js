import isMobile from 'ismobilejs';
import player from "./player";
import video from './video';
import modal from './modal';
import node from './node';

const state =  {
    project: false,
    dynamicParams: {},
    isMobile: isMobile().phone,
    editingMode: false,
    editingStatus: 'initial',
};

export default {...state, ...player, ...video, ...modal, ...node}