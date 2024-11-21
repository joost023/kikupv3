import { blogPosts } from '@/data/blogs';

export function SanityTest() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Blog Posts</h2>
      <div className="space-y-4">
        {blogPosts.map((post, index) => (
          <div key={index} className="p-4 bg-gray-800 rounded-lg">
            <h4 className="font-bold">{post.title}</h4>
            <p className="text-sm text-gray-400">{post.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}