import { Star } from "lucide-react";

const ReviewCard = ({
  name,
  date,
  rating,
  comment,
  profileImage,
}: {
  name: string;
  date: string;
  rating: number;
  comment: string;
  profileImage: string;
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div
          style={{ backgroundImage: `url(${profileImage})` }}
          className="w-10 h-10 bg-gray-300 rounded-full bg-cover bg-center"
        />
        <div>
          <h4 className="font-bold text-sm">{name}</h4>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>
      {/* RATING STARS */}
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((starIndex) => (
          <Star
            key={starIndex}
            size={14}
            className={`${
              starIndex <= rating
                ? "fill-orange-400 text-orange-400"
                : "fill-gray-200 text-gray-200" 
            }`}
          />
        ))}
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">{comment}</p>
    </div>
  );
};

export default ReviewCard;
