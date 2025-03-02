// import axios from "axios";
// import { Camera, Loader2, LogOut } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Navbar from "../components/NavBar";

// const Profile = () => {
//   const [profile, setProfile] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [image, setImage] = useState(null);
//   const [newImage, setNewImage] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [updating, setUpdating] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const customerId = localStorage.getItem("customerId");

//         if (!token || !customerId) {
//           toast.error("Unauthorized! Please log in.");
//           navigate("/login");
//           return;
//         }

//         const res = await axios.get(
//           `http://localhost:4011/api/customer/${customerId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         setProfile(res.data);
//         setImage(res.data.image);
//       } catch (error) {
//         toast.error("Failed to load profile");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleUpdate = async () => {
//     try {
//       setUpdating(true);
//       const token = localStorage.getItem("token");
//       await axios.put(
//         "http://localhost:4011/api/customer/profile/update",
//         profile,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Profile updated successfully!");
//     } catch {
//       toast.error("Failed to update profile");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleImageUpload = async () => {
//     if (!newImage) return toast.error("Please select an image!");

//     const formData = new FormData();
//     formData.append("image", newImage);

//     try {
//       setUploading(true);
//       const token = localStorage.getItem("token");
//       const customerId = localStorage.getItem("customerId");

//       const res = await axios.post(
//         `http://localhost:4011/api/customer/${customerId}/upload`,
//         formData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setImage(res.data.imageUrl);
//       localStorage.setItem("profileImage", res.data.imageUrl); // ✅ Save updated image in localStorage
//       window.dispatchEvent(new Event("profileImageUpdated")); // ✅ Dispatch event to update navbar

//       toast.success("Profile image updated!");
//     } catch {
//       toast.error("Failed to upload image");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("customerId");
//       localStorage.removeItem("profileImage");
//       toast.success("Logout successful!", { autoClose: 2000 });
//       setTimeout(() => navigate("/login"), 2000);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-neutral-900">
//         <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <ToastContainer position="top-right" theme="dark" />
//       <div className="min-h-screen flex justify-center items-center bg-neutral-900 px-6 mt-6">
//         <div className="w-full max-w-md bg-neutral-800 rounded-xl shadow-lg p-6">
//           {/* Header */}
//           <div className="text-center">
//             <h2 className="text-2xl font-bold text-white">My Profile</h2>
//             <p className="text-gray-400 text-sm">Update your details below</p>
//           </div>

//           {/* Profile Image Section */}
//           <div className="flex flex-col items-center mt-6">
//             <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-orange-500 shadow-lg">
//               <img
//                 src={
//                   newImage
//                     ? URL.createObjectURL(newImage)
//                     : image
//                     ? `http://localhost:4011${image}`
//                     : "/images/default-user.png"
//                 }
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//               {/* Upload Icon */}
//               <label
//                 htmlFor="profile-image-input"
//                 className="absolute bottom-0 right-0 bg-orange-500 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
//               >
//                 <Camera className="text-white w-5 h-5" />
//               </label>
//             </div>
//             {/* Hidden File Input */}
//             <input
//               id="profile-image-input"
//               type="file"
//               accept="image/*"
//               onChange={(e) => setNewImage(e.target.files[0])}
//               className="hidden"
//             />
//             <button
//               onClick={handleImageUpload}
//               disabled={uploading || !newImage}
//               className={`mt-3 px-4 py-2 rounded-md text-white text-sm font-medium transition ${
//                 !newImage || uploading
//                   ? "bg-gray-600 cursor-not-allowed"
//                   : "bg-orange-500 hover:bg-orange-600"
//               }`}
//             >
//               {uploading ? "Uploading..." : "Update Photo"}
//             </button>
//           </div>

//           {/* Profile Form */}
//           <div className="mt-6 space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="username">
//                 Username
//               </label>
//               <input
//                 id="username"
//                 type="text"
//                 value={profile.username || ""}
//                 onChange={(e) => setProfile({ ...profile, username: e.target.value })}
//                 className="w-full bg-neutral-700 border border-neutral-600 p-3 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
//                 placeholder="Enter your username"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="email">
//                 Email Address
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 value={profile.email || ""}
//                 onChange={(e) => setProfile({ ...profile, email: e.target.value })}
//                 className="w-full bg-neutral-700 border border-neutral-600 p-3 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
//                 placeholder="Enter your email"
//               />
//             </div>
//           </div>

//           {/* Update & Logout Buttons */}
//           <div className="mt-6 flex flex-col space-y-3">
//             <button
//               onClick={handleUpdate}
//               disabled={updating}
//               className={`w-full py-3 px-4 rounded-lg text-white font-medium transition ${
//                 updating
//                   ? "bg-neutral-600 cursor-not-allowed"
//                   : "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
//               }`}
//             >
//               {updating ? "Updating..." : "Save Changes"}
//             </button>

//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
//             >
//               <LogOut className="mr-2" size={20} /> Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;
import axios from "axios";
import {
  Camera,
  ChevronLeft,
  Loader2,
  LogOut,
  Mail,
  Save,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/NavBar";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const customerId = localStorage.getItem("customerId");

        if (!token || !customerId) {
          toast.error("Unauthorized! Please log in.");
          navigate("/login");
          return;
        }

        const res = await axios.get(
          `http://localhost:4011/api/customer/${customerId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setProfile(res.data);
        setImage(res.data.image);
      } catch (error) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:4011/api/customer/profile/update",
        profile,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const handleImageUpload = async () => {
    if (!newImage) return toast.error("Please select an image!");

    const formData = new FormData();
    formData.append("image", newImage);

    try {
      setUploading(true);
      const token = localStorage.getItem("token");
      const customerId = localStorage.getItem("customerId");

      const res = await axios.post(
        `http://localhost:4011/api/customer/${customerId}/upload`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setImage(res.data.imageUrl);
      localStorage.setItem("profileImage", res.data.imageUrl);
      window.dispatchEvent(new Event("profileImageUpdated"));

      toast.success("Profile image updated!");
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("customerId");
      localStorage.removeItem("profileImage");
      toast.success("Logout successful!", { autoClose: 2000 });
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800">
        <div className="bg-neutral-800 p-8 rounded-xl shadow-2xl flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
          <p className="text-white mt-4 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" theme="dark" />

      <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 pt-6 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-orange-400 hover:text-orange-300 transition mb-6 group"
          >
            <ChevronLeft className="w-5 h-5 mr-1 group-hover:transform group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Profile Image Column */}
            <div className="md:col-span-1">
              <div className="bg-neutral-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-red-600 h-24 relative flex items-center justify-center">
                  <div className="absolute -bottom-16 w-32 h-32">
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-neutral-800 shadow-lg">
                      <img
                        src={
                          newImage
                            ? URL.createObjectURL(newImage)
                            : image
                            ? `http://localhost:4011${image}`
                            : "/images/default-user.png"
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                      <label
                        htmlFor="profile-image-input"
                        className="absolute bottom-1 right-1 bg-orange-500 hover:bg-orange-600 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors shadow-md"
                      >
                        <Camera className="text-white w-4 h-4" />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-20 pb-6 px-6">
                  <h3 className="text-white text-xl font-bold text-center">
                    {profile.username || "Username"}
                  </h3>
                  <p className="text-gray-400 text-sm text-center mb-6">
                    {profile.email || "email@example.com"}
                  </p>

                  <input
                    id="profile-image-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewImage(e.target.files[0])}
                    className="hidden"
                  />

                  <button
                    onClick={handleImageUpload}
                    disabled={uploading || !newImage}
                    className={`w-full py-2.5 px-4 rounded-lg text-white text-sm font-medium transition flex items-center justify-center ${
                      !newImage || uploading
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600"
                    }`}
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      "Update Photo"
                    )}
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full mt-4 flex items-center justify-center py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
                  >
                    <LogOut className="mr-2" size={16} /> Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Details Column */}
            <div className="md:col-span-2">
              <div className="bg-neutral-800 rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-1">
                  My Profile
                </h2>
                <p className="text-gray-400 text-sm mb-6">
                  Manage your personal information
                </p>

                <div className="space-y-5">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-300 mb-2"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="username"
                        type="text"
                        value={profile.username || ""}
                        onChange={(e) =>
                          setProfile({ ...profile, username: e.target.value })
                        }
                        className="w-full bg-neutral-700 border border-neutral-600 p-3 pl-10 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                        placeholder="Enter your username"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-300 mb-2"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={profile.email || ""}
                        onChange={(e) =>
                          setProfile({ ...profile, email: e.target.value })
                        }
                        className="w-full bg-neutral-700 border border-neutral-600 p-3 pl-10 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-300 mb-2"
                      htmlFor="email"
                    >
                      Contact No.
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="contact_no "
                        type="contact_no "
                        value={profile.contact_no || ""}
                        onChange={(e) =>
                          setProfile({ ...profile, contact_no: e.target.value })
                        }
                        className="w-full bg-neutral-700 border border-neutral-600 p-3 pl-10 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                        placeholder="Enter your contact no. "
                      />
                    </div>
                  </div>
                  {/* Additional fields could go here */}

                  <div className="pt-4">
                    <button
                      onClick={handleUpdate}
                      disabled={updating}
                      className={`w-full py-3 px-4 rounded-lg text-white font-medium transition flex items-center justify-center ${
                        updating
                          ? "bg-neutral-600 cursor-not-allowed"
                          : "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                      }`}
                    >
                      {updating ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5 mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Additional card for more content */}
              <div className="bg-neutral-800 rounded-2xl shadow-xl p-6 mt-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Account Activity
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-neutral-700 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Last Login</p>
                      <p className="text-gray-400 text-sm">Today, 10:30 AM</p>
                    </div>
                    <div className="h-10 w-10 bg-green-500/20 rounded-full flex items-center justify-center">
                      <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-neutral-700 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Active Devices</p>
                      <p className="text-gray-400 text-sm">2 devices</p>
                    </div>
                    <button className="text-orange-400 hover:text-orange-300 text-sm font-medium">
                      Manage
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
