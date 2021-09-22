import PopupMessage from "./PopupMessage"

export default accessDenied = (title, desc) => {
    // const message = desc? `Login to ${desc}` :  `Login to access ${title} page`
    PopupMessage(
        desc? 'Action denied':'Access denied',
        desc? `Login to ${desc}` :  `Login to access ${title} page`,
        'danger',
        1500,
        {top:30},
        {},
        {}
    )
}

