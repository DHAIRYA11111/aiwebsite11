const generateImage = async () => {
  setLoading(true);
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const json = await response.json();
      console.error("API returned JSON error:", json);
      alert("Error: " + (json.error || "Unknown error from API"));
      setLoading(false);
      return;
    }

    // Otherwise assume it's an image
    const blob = await response.blob();
    const imageObjectURL = URL.createObjectURL(blob);
    setImage(imageObjectURL);
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Failed to generate image, please try again.");
  } finally {
    setLoading(false);
  }
};
