const getCategory = require('../../controllers/Category_Controllers/categoryControllers');
const getSubCategory = require('../../controllers/SubCategory_Controllers/subCategoryControllers');
const {Router} = require('express');
const router = Router();

router.get('/', async (req, res) => {
    try {
        const result = await getCategory()
        res.status(200).send(result)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
});

module.exports = router;