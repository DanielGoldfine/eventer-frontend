import React from 'react'

export function CategoryLinks(props) {

    const { chooseCategory, currCtg , homePage } = props


    console.log('currCtg', currCtg);
    console.log('is Home Page?', homePage);

    return (
        <section className="category-links flex justify-center margin0auto">
            <button onClick={() => { chooseCategory('Sports') }}
                className="btn-category"
                className={currCtg === 'Sports' ? 'active' : ''}
            >Sports</button>
            <button
                onClick={() => { chooseCategory('Live Music') }}
                className="btn-category"
                className={currCtg === 'Live Music' ? 'active' : ''}
            >Live Music</button>
            <button
                onClick={() => { chooseCategory('Parties') }}
                className="btn-category"
                className={currCtg === 'Parties' ? 'active' : ''}
            >Parties</button>
            <button
                onClick={() => { chooseCategory('Stand-up Comedy') }}
                className="btn-category"
                className={currCtg === 'Stand-up Comedy' ? 'active' : ''}
            >Stand-up Comedy</button>
            <button
                onClick={() => { chooseCategory('Lectures') }}
                className="btn-category"
                className={currCtg === 'Lectures' ? 'active' : ''}
            >Lectures</button>
            <button
                onClick={() => { chooseCategory('Workshops') }}
                className="btn-category"
                className={currCtg === 'Workshops' ? 'active' : ''}
            >Workshops</button>
        </section>
    )
}