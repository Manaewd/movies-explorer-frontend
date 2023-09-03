import React from 'react'
import './Preloader.css'

function Preloader({ isLoader }) {
    return (
        (isLoader &&
        <section className='preloader'>
            <div className='preloader__container'>
                <span className="preloader__round"></span>
            </div>
        </section>
        )
    )
}

export default Preloader