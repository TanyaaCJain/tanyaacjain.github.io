// import '../assets/styles/LinkCard.scss'

export default function LinkCard(text, link) {
    return (
        <a href={link}>
            <div class='link-card'>
                <div class='link-text'>
                    {text}
                </div>
            </div>
        </a>
    )
}