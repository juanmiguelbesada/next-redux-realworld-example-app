import axios from 'axios'

const BASE_URL = "https://conduit.productionready.io/api";

const client = axios.create({
    baseURL: BASE_URL
});

let token = null;
client.interceptors.request.use(function(config) {
    if (token) {
        config.headers.authorization = `Token ${token}`;
    }

    return config;
});

const Auth = {
    current: () => client.get('/user'),
    login: (email, password) => client.post('/users/login', {user: {email, password}}),
    register: (username, email, password) => client.post('/users', {user: {username, email, password}}),
    save: (user) => client.put('/user', {user})
};

const Tags = {
    getAll: () => client.get('/tags')
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, { slug: undefined })
const Articles = {
    all: (page) => client.get(`/articles?${limit(10, page)}`),
    byAuthor: (author, page) => client.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
    byTag: (tag, page) => client.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
    del: (slug) => client.del(`/articles/${slug}`),
    favorite: (slug) => client.post(`/articles/${slug}/favorite`),
    favoritedBy: (author, page) => client.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
    feed: () => client.get('/articles/feed?limit=10&offset=0'),
    get: (slug) => client.get(`/articles/${slug}`),
    unfavorite: (slug) => client.del(`/articles/${slug}/favorite`),
    update: (article) => client.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
    create: (article) => client.post('/articles', { article })
};

const Comments = {
    create: (slug, comment) => client.post(`/articles/${slug}/comments`, { comment }),
    delete: (slug, commentId) => client.del(`/articles/${slug}/comments/${commentId}`),
    forArticle: (slug) => client.get(`/articles/${slug}/comments`)
};
  
const Profile = {
    follow: (username) => client.post(`/profiles/${username}/follow`),
    get: (username) => client.get(`/profiles/${username}`),
    unfollow: (username) => client.del(`/profiles/${username}/follow`)
};

export default {Auth, Tags, Articles, Comments, Profile, setToken: _token => { token = _token; }}