import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { blogPosts } from '@/data/blogs';
import type { Post } from '@/types/blog';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';
import { nl } from 'date-fns/locale';

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      const foundPost = blogPosts.find(p => p.id === id);
      setPost(foundPost || null);
    }
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4">Blog niet gevonden</h1>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Terug naar blog overzicht
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="h-[60vh] relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-black/40"></div>
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-16">
            <Link 
              to="/blog"
              className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Terug naar blog overzicht
            </Link>
            <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-sm text-gray-400">{post.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                {format(parseISO(post.date), 'd MMMM yyyy', { locale: nl })}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-invert prose-lg">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-12">
              {post.tags.map(tag => (
                <Link
                  key={tag}
                  to={`/blog?tag=${tag}`}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-[#1C1C1E] text-white hover:bg-[#2C2C2E] transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}