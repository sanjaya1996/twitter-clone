import Post from '../../models/schemas/PostSchema';
// -------- UTILS FUNCTIONS

export async function getPostsFromDB(filter: {}) {
  let results = await Post.find(filter)
    .populate('postedBy')
    .populate('retweetData')
    .populate('replyTo')
    .sort({ createdAt: -1 });

  results = await Post.populate(results, {
    path: 'replyTo.postedBy',
    model: 'User',
  });

  return await Post.populate(results, {
    path: 'retweetData.postedBy',
    model: 'User',
  });
}
