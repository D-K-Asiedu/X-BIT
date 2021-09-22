import PopupMessage from "./PopupMessage"

export default info = (title, desc) => {
    PopupMessage(
        title,
        desc,
        'warning',
        2000,
        {top:30},
        {},
        {backgroundColor: '#696969'}
    )
}

