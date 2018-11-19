import Link from "next/link";

export default ({article}) => {
    const favoriteButtonClass = article.favorited ? "btn btn-sm btn-primary" : "btn btn-sm btn-outline-primary";
    return (
        <div className="article-preview">
            <div className="article-meta">
                <Link href={`/profile/${article.author.username}`}>
                    <a><img src={article.author.image} /></a>
                </Link>
                <div className="info">
                    <Link href={`/profile/${article.author.username}`}>
                        <a className="author">{article.author.username}</a>
                    </Link>
                    <span className="date">{new Date(article.createdAt).toDateString()}</span>
                </div>
                <button className={favoriteButtonClass}>
                    <i className="ion-heart"></i> {article.favoritesCount}
                </button>
            </div>
            <Link href={`/article/${article.slug}`}>
                <a className="preview-link">
                    <h1>{article.title}</h1>
                    <p>{article.description}</p>
                    <span>Read more...</span>
                    <ul className="tag-list">
                        {article.tagList.map(tag => {
                            return (<li className="tag-default tag-pill tag-outline" key={tag}>{tag}</li>)
                        })}
                    </ul>
                </a>
            </Link>
        </div>
    );
};