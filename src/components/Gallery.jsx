// src/components/Gallery.jsx
import MemoryImage from "../assets/gallery/memory-image.png";
import Gallery1 from "../assets/gallery/marota1.jpg";
import Gallery2 from "../assets/gallery/marota2.jpg";
import Gallery3 from "../assets/gallery/marota3.jpg";
import Gallery4 from "../assets/gallery/marota4.jpg";
import Gallery5 from "../assets/gallery/marota5.jpg";
import Gallery6 from "../assets/gallery/marota6.jpg";
import Gallery7 from "../assets/gallery/marota7.jpg";
import Gallery8 from "../assets/gallery/marota8.jpg";

export default function Gallery() {
  const images = [
    MemoryImage,
    Gallery1,
    Gallery2,
    Gallery3,
    Gallery4,
    Gallery5, 
    Gallery6,
    Gallery7,
    Gallery8
  ];

  return (
    <section id="gallery" className="py-24 bg-[#112240] text-white">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 className="text-4xl font-bold text-[var(--accent-orange)]">Gallery</h2>
        <p className="text-gray-200 mt-2">Moments from our classes and events</p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl mx-auto px-6">
        {images.map((img, idx) => (
          <div key={idx} className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={img}
              alt={`Gallery ${idx + 1}`}
              className="w-full h-64 object-cover hover:scale-110 transition duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
