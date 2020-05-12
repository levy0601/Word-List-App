import React from 'react';
import './ThemeSetter.css'
import {themeSet} from "../../utility/themeSet";

const ThemeSetter = ({onThemeChange,state}) => {

    return (
        <div className={'theme-setter'}>
            <span>Theme</span>
            <select id={'sort-by-task-drop-down'} onChange={onThemeChange} value={state.theme}>
                <option value={themeSet.LIGHT}>{themeSet.LIGHT}</option>
                <option value={themeSet.DARK}>{themeSet.DARK}</option>
                <option value={themeSet.COLORFUL}>{themeSet.COLORFUL}</option>
            </select>
        </div>
    )
};


export default ThemeSetter;
