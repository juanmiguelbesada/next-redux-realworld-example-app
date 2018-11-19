export default ({tags, onClickTag}) => {
    const isLoading = !tags;
    return (
    <div className="tag-list">
        {isLoading ? <div>Loading Tags...</div> : ''}
        {!isLoading && tags.map((tag) => {
            const handleClick = ev => {
                ev.preventDefault();
                onClickTag(tag);
            };

            return (<a key={tag} href="" className="tag-pill tag-default" onClick={handleClick}>{tag}</a>);
        })} 
    </div>
    )
};