import React from 'react';

function FormSearch(props) {
    return (
        <form className='form-search'>
            <input type='search' placeholder='Поиск по играм'/>
            <button type='submit'>
                <FiSearch />
            </button>
        </form>
    );
}

export default FormSearch;