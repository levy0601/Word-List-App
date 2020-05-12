import React from 'react';
import './NavigationBar.css';
import ThemeSetter from "./ThemeSetter";

const NavigationBar = ({ userProfileState,selectWordListState,isLoggedIn, error, onLogout,onThemeChange,onBack }) => {

    return (
        <div className='nav'>
            { error && <span className={'error-message'}> {error} </span>}

            { isLoggedIn && <button className = "logout action button" onClick={onLogout}>Logout</button>}
            { selectWordListState.isSelected && <button className = "back action button" onClick={onBack}>Back</button>}

            <ThemeSetter onThemeChange = {onThemeChange} state = {userProfileState}/>
        </div>
    );
};

export default NavigationBar;