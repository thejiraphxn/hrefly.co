module.exports = {
  experimental: {
    cookies: {
      httpOnly: true,
      secure: true, // ✅ ใช้ HTTPS เท่านั้น
      sameSite: "Strict", // ✅ ป้องกัน CSRF Attack
    },
  },
};
