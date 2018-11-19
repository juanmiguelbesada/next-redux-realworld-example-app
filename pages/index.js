import React from 'react';
import { connect } from 'react-redux';
import Layout from "../components/Layout";
import TagsList from "../components/TagsList";
import { fetchTags, selectTag, applyTagFilter } from '../actions/tags';
import { fetchArticles } from '../actions/articles';
import ArticlePreview from '../components/ArticlePreview';
import counduit from '../lib/counduit';

class Index extends React.Component {
    static async getInitialProps({ store }) {
        await store.dispatch(fetchTags());
        await store.dispatch(fetchArticles());

        return {}
    }

    render() {
        return (
            <Layout>
                <div className="home-page">
                    <div className="banner">
                        <div className="container">
                            <h1 className="logo-font">conduit</h1>
                            <p>A place to share your knowledge.</p>
                        </div>
                    </div>
                    <div className="container page">
                        <div className="row">
                            <div className="col-md-9">
                                <div className="feed-toggle">
                                    <ul className="nav nav-pills outline-active">
                                        <li className="nav-item">
                                            <a className="nav-link disabled" href="">Your Feed</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link active" href="">Global Feed</a>
                                        </li>
                                    </ul>
                                </div>
                                {this.props.articles.map(article => (
                                    <ArticlePreview key={article.slug} article={article} />
                                ))}
                            </div>
                            <div className="col-md-3">
                                <div className="sidebar">
                                    <p>Popular Tags</p>
                                    <TagsList tags={this.props.tags} onClickTag={this.props.onClickTag}></TagsList>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.home
});

const mapDispatchToProps = (dispatch) => {
    return {
      onClickTag: (tag) => {
          dispatch(selectTag(tag));
          dispatch(applyTagFilter(tag, counduit.Articles.byTag(tag).then(response => response.data)));
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Index)