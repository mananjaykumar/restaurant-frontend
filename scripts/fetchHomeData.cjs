const fs = require("fs");
const path = require("path");
const axios = require("axios");

async function fetchHomeData() {
  const dataDir = path.resolve(__dirname, "../src/data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  try {
    const bannerRes = await axios.get(
      `https://restaurant-backend-7086.onrender.com/api/home/banner`
    );
    const mostLovedRes = await axios.get(
      `https://restaurant-backend-7086.onrender.com/api/home/most-loved`
    );

    // Reverse banner data
    const reversedBanner = Array.isArray(bannerRes.data.data)
      ? [...bannerRes.data.data].reverse()
      : bannerRes.data.data;

    fs.writeFileSync(
      path.join(dataDir, "banner.json"),
      JSON.stringify(reversedBanner, null, 2)
    );
    fs.writeFileSync(
      path.join(dataDir, "mostLoved.json"),
      JSON.stringify(mostLovedRes.data.data, null, 2)
    );

    console.log("✅ Home data fetched successfully");
  } catch (err) {
    console.error("❌ Failed to fetch home data:", err);
  }
}

fetchHomeData();
