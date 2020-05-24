import React from 'react'

export function CategoryLinks(props) {

    const { chooseCategory } = props

    return (

        <section className="category-links flex justify-center margin0auto">
            <button onClick={() => { chooseCategory('Sports') }} className="btn-category">Sports</button>
            <button onClick={() => { chooseCategory('Live Music') }} className="btn-category">Live Music</button>
            <button onClick={() => { chooseCategory('Parties') }} className="btn-category">Parties</button>
            <button onClick={() => { chooseCategory('Stand-up Comedy') }} className="btn-category">Stand-up Comedy</button>
            <button onClick={() => { chooseCategory('Lectures') }} className="btn-category">Lectures</button>
            <button onClick={() => { chooseCategory('Workshops') }} className="btn-category">Workshops</button>
        </section>
    )
}