import React from 'react'

export function CategoryLinks(props) {

    const { chooseCategory, currCtg , homePage } = props


    // console.log('currCtg', currCtg);
    // console.log('is Home Page?', homePage);

    return (
        <section className="category-links flex justify-center margin0auto">
            <button onClick={() => { chooseCategory('Sports') }}
                className={currCtg === 'Sports' ? 'active' : ''}
            >Sports</button>
            <button
                onClick={() => { chooseCategory('Live Music') }}
                className={currCtg === 'Live Music' ? 'active' : ''}
            >Live Music</button>
            <button
                onClick={() => { chooseCategory('Parties') }}
                className={currCtg === 'Parties' ? 'active' : ''}
            >Parties</button>
            <button
                onClick={() => { chooseCategory('Stand-up Comedy') }}
                className={currCtg === 'Stand-up Comedy' ? 'active' : ''}
            >Stand-up Comedy</button>
            <button
                onClick={() => { chooseCategory('Lectures') }}
                className={currCtg === 'Lectures' ? 'active' : ''}
            >Lectures</button>
            <button
                onClick={() => { chooseCategory('Workshops') }}
                className={currCtg === 'Workshops' ? 'active' : ''}
            >Workshops</button>
        </section>
    )
}