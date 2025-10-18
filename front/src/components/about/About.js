
const About = () => {
  return (
    <section className="w-full py-16 bg-gray-50 text-gray-800">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">About Us</h2>

        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          We are a passionate team dedicated to creating meaningful and reliable
          digital experiences. Our goal is to combine creativity and technology
          to make everyday life simpler and more connected.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
            <p className="text-gray-600">
              To empower people through technology that inspires creativity,
              collaboration, and progress.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Our Team</h3>
            <p className="text-gray-600">
              We’re a group of developers, designers, and thinkers who believe
              in the power of simple ideas executed with passion.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Our Values</h3>
            <p className="text-gray-600">
              Integrity, innovation, and inclusivity guide every decision we
              make as a team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default About