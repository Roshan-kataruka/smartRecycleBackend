// services/clarifaiService.js



const clarifaiService = {
  getDetailsOfImage: async (imageUrl) => {
    try {
        const { default: fetch } = await import('node-fetch');
      const PAT = '98fb8fc9ae5a4a94b7b614584df28ae7';
      const USER_ID = 'clarifai';
      const APP_ID = 'main';
      const MODEL_ID = 'general-image-recognition';
      const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';

      const raw = JSON.stringify({
        "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
        },
        "inputs": [
          {
            "data": {
              "image": {
                "url": imageUrl
              }
            }
          }
        ]
      });

      const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
        },
        body: raw
      };

      const response = await fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions);
      const result = await response.json();

      return result.outputs[0].data.concepts;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = clarifaiService;
