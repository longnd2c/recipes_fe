import Base from './Base';

class Recipe extends Base {
    getReceipeList = (params) => this.apiGet(`/recipe`, params);

    getAllCategory = (params) => this.apiGet(`/recipe/category`, params);

    getReceipeDetail = (slug) => this.apiGet(`/recipe/${slug}`);
}

export default new Recipe('');