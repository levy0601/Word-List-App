import React from 'react';

const SortByTaskFilter = ({checkBoxOnchange,selectOnchange,state}) => {
    return(
        <div className={'filter-item'}>
            <input type={'checkbox'} id={'sortByTaskFilter'}
                   onChange={checkBoxOnchange} value={state.isSort}/>
            <span>Sort by Name</span>
            <select id={'sort-by-task-drop-down'} onChange={selectOnchange} value={state.order}>
                <option value={'ascending'}>Ascending</option>
                <option value={'descending'}>Descending</option>
            </select>
        </div>
    );
};


export default SortByTaskFilter;
