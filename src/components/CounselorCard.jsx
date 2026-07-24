function CounselorCard({ counselor }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
      <div className="text-5xl text-center">👨‍⚕️</div>

      <h3 className="text-xl font-bold text-center text-emerald-700 mt-4">
        {counselor.name}
      </h3>

      <p className="text-gray-600 text-center mt-2">
        {counselor.specialization}
      </p>

      <p className="text-center text-sm text-gray-500 mt-2">
        Experience: {counselor.experience}
      </p>

      <a
        href={`mailto:${counselor.email}`}
        className="block mt-5 text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl font-semibold"
      >
        Contact
      </a>
    </div>
  );
}

export default CounselorCard;