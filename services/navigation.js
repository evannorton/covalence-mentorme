import React from 'react'
import HeaderImage from '../components/headerImage';
const DEFAULT_HEADER_STYLE = {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0

}

const DEFAULT_NAVIGATION_OPTIONS = {
    headerStyle: DEFAULT_HEADER_STYLE,

};

const DEFAULT_NAVIGATION_NO_ARROW = {
    headerLeft: null,
    headerStyle: DEFAULT_HEADER_STYLE,

}

export { DEFAULT_NAVIGATION_OPTIONS, DEFAULT_NAVIGATION_NO_ARROW };