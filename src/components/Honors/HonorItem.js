import './HonorItem.css';

export default function HonorItem(item) {
    item = item.item;
    const id_retrieved = item.id;
    return (
        <div id={id_retrieved} className='honor-card'>
            <div className='honors-img'>
                <img src={require(`../../assets/images/honors/${item.img}`).default} alt={item.name} />
            </div>
            <div className='honors-text'>
                <div className='honors-label tangerine-bold'>{item.type}</div>
                <h2 className='honors-heading'>
                    {item.name}
                </h2>
                {/* <!-- <hr> --> */}
                <div className='honors-desc'>
                    {item.description}
                </div>
            </div>
        </div>
    )
}