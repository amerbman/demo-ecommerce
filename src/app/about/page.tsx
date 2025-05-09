export default function AboutPage() {
    return (
      <main className="container mx-auto py-16 space-y-12">
        <h1 className="text-4xl font-bold">About Flora</h1>
  
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-lg leading-relaxed">
            Flora specializes in high-quality cleaning products designed to make
            your home sparkle. Founded in 2020, our mission has always been to
            blend innovation with eco-friendly materials.
          </p>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            We believe a clean home is a happy home—and that caring for the planet
            means using products that last longer and waste less.
          </p>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Replace these with real team cards */}
            <div className="border rounded p-4 text-center">
              <img src="/assets/team/jane.jpg" alt="Jane Doe" className="mx-auto mb-2 h-24 w-24 rounded-full object-cover" />
              <h3 className="font-medium">Jane Doe</h3>
              <p>Co-Founder & CEO</p>
            </div>
            <div className="border rounded p-4 text-center">
              <img src="/assets/team/john.jpg" alt="John Smith" className="mx-auto mb-2 h-24 w-24 rounded-full object-cover" />
              <h3 className="font-medium">John Smith</h3>
              <p>Head of Product</p>
            </div>
            {/* …more */}
          </div>
        </section>
      </main>
  )
  }
  