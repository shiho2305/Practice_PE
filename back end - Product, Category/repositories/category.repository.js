import Category from '../models/category.model.js';

const categoryRepository = {
    create: async ({ name , description }) => {
        return await Category.create({ name, description});
    },
    getAll: async () => {
        const categories = await Category.find(); 
        return categories;
    },
};

export default categoryRepository;