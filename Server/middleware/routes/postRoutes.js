import { validatePost } from '../middleware/validators.js';
// ...
router.post('/', validatePost, createPost);
router.put('/:id', validatePost, updatePost);
