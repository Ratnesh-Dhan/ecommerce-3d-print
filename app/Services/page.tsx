export default function Services() {
  const services = [
    {
      title: "3D Printing",
      desc: "High-quality FDM & resin printing with multiple materials.",
    },
    {
      title: "STL Analysis",
      desc: "Automatic model analysis with volume & dimension calculation.",
    },
    {
      title: "Custom Prototyping",
      desc: "From idea to physical prototype with precision.",
    },
    {
      title: "Bulk Production",
      desc: "Scale your production with consistent quality.",
    },
  ];

  return (
    <section className="min-h-screen bg-black text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center mb-12">
          Our <span className="text-yellow-500">Services</span>
        </h1>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-8">

          {services.map((service, index) => (
            <div
              key={index}
              className="border border-yellow-500/30 rounded-xl p-6 hover:border-yellow-500 transition shadow-[0_0_20px_rgba(234,179,8,0.1)]"
            >
              <h2 className="text-xl font-semibold text-yellow-500 mb-3">
                {service.title}
              </h2>

              <p className="text-gray-400">
                {service.desc}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}