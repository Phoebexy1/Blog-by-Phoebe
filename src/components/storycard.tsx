interface StoryCardContent {
    id: number;
    genre: string;
    heading: string;
    date: string;
    readTime: string;
    title: string;
    preview: string;
    onClick?: () => void;
}

function StoryCard({
    id,
    genre,
    heading,
    date,
    readTime,
    title,
    preview,
    onClick
}: StoryCardContent) {
    return (
        <div 
            className={`story-card card-${id}`} 
            // onClick={(e) => {
            //                 e.stopPropagation(); // Prevents double-firing with the parent card
            //             }}
            style={{ cursor: "pointer" }}
        >
            <div className="story-top">
                <span className="genre">{genre}</span>
                <h3>{heading}</h3>
            </div>

            <div className="story-bottom">
                <p className="story-info">
                    {date} &nbsp; • &nbsp; {readTime}
                </p>

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