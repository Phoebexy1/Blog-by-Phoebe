interface StoryCardContent {
    id: number;
    genre: string;
    heading: string;
    date: string;
    readTime: string;
    title: string;
    preview: string;
    image?: string;
    onClick?: () => void;
}

function StoryCard({
    id,
    genre,
    title,
    preview,
    image,
    onClick
}: StoryCardContent) {
    return (
        <div 
            className={`story-card card-${id}`} 
            // onClick={(e) => {
            //                 e.stopPropagation(); // Prevents double-firing with the parent card
            //             }}
        >
            {image && <img className="story-image" src={image} alt={title} />}

            <div className="story-bottom">
                <span className="genre">{genre}</span>

                <h4>{title}</h4>

                <p className="story-preview">
                    {preview}
                </p>

                <div className="story-footer">
                    <button 
                        className="read-btn" 
                        onClick={onClick}
                    >
                        Read Story
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StoryCard;