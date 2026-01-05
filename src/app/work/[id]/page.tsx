import { realProjects } from '@/data/real_projects';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function generateStaticParams() {
    return realProjects.map((project) => ({
        id: project.id,
    }));
}

export default function ProjectDetail({ params }: { params: { id: string } }) {
    // Determine the project from the ID
    const project = realProjects.find(p => p.id === params.id);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Project not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-black text-white pt-32 pb-20">
            <div className="container mx-auto px-6">
                {/* Back Button */}
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-brand-orange mb-12 transition-colors">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Home
                </Link>

                {/* Header */}
                <div className="max-w-4xl mb-16">
                    <span className="text-brand-orange text-sm uppercase tracking-widest font-bold mb-4 block">
                        {project.category}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        {project.title}
                    </h1>
                    <p className="text-xl text-gray-300 leading-relaxed border-l-4 border-brand-orange pl-6">
                        {project.description}
                    </p>
                </div>

                {/* Video Section (if applicable) */}
                {project.videoUrl && (
                    <div className="mb-20 aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${project.videoUrl}?rel=0&showinfo=0`}
                            title={project.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        />
                    </div>
                )}

                {/* Main Image (if no video, or as supplemental?) -> Actually, main image is often the first thing seen. 
                    Let's put Main Image first if no video, or maybe just include it in gallery/below?
                    Let's show Main Image as a banner if no video? 
                    Actually, let's just dump ALL images (Main + Gallery) in a nice grid.
                */}

                <h2 className="text-2xl font-bold mb-8 text-white/80 border-b border-white/10 pb-4">Gallery</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Include Main Image in the grid if desired, or maybe it's just the cover. 
                         Let's include it first. */}
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                    {/* Gallery Images */}
                    {project.gallery?.map((img, idx) => (
                        <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                            <Image
                                src={img}
                                alt={`${project.title} gallery ${idx + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
