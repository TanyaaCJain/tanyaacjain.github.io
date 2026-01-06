import './styles.css'

export default function ShowcaseBlock({ featureListData }) {
    return (
    <div className="project-container">
    { featureListData.documents && featureListData.documents.map((feature,index) => (
        <div className="project-element" key={index}>
             <a href={feature.link} key={feature.title} target="_blank" rel="noreferrer">
                 <div className="vignette">
                    { feature.featuredImage && 
                        <img src={require(`${feature.featuredImage}`).default} alt="Docusaurus Asset Example Banner" />
                    }
                 </div>
                 <div className="project-info">
                     <h3>{ feature.title }</h3>
                 </div>
             </a>
         </div>
     ))
    }
    </div>
)}
