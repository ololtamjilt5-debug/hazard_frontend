import defaultProfile from "../../assets/profile.jpg";

const UserAccount = ({ profile }) => {
  // Хэрэв backend-ээс зураг ирээгүй бол assets-дах зургийг ашиглана
  const userImg = profile?.user_image ? profile.user_image : defaultProfile;

  return (
    <div className="flex flex-col w-42 items-center text-center gap-2">
      <img
        className="w-20 h-20 rounded-full shadow-lg object-cover"
        src={userImg}
        alt="Profile"
      />

      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold font-condensed">
          {profile
            ? `${profile.first_name} ${profile.last_name}`
            : "Ачаалж байна..."}
        </h2>
        <p className="text-lg font-condensed text-gray-700 leading-tight">
          {profile?.job || "Албан тушаал"}
        </p>
        <p className="mt-2 text-sm bg-ololt-rgbgreen px-3 py-1 rounded-full text-white">
          ID: {profile?.user_id || "------"}
        </p>
      </div>
    </div>
  );
};

export default UserAccount;
