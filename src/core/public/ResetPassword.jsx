import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Track loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic password validation
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    setLoading(true); // Start loading

    try {
      const res = await axios.post(
        `http://localhost:4011/api/auth/reset-password/${token}`,
        { password },
        {
          headers: { "Content-Type": "application/json" }, // ✅ Fix: Ensure JSON format
        }
      );

      setMessage(res.data.message); // Show success message
    } catch (error) {
      // ✅ Fix: Show detailed error messages
      setMessage(error.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
